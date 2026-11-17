// =========================================================
// list-page.js — "محرّك" صفحات القوائم
//
// الدورات، الاختبارات، الطلاب، المدرّبون، الطلبات، الحجوزات:
// كلها نفس الفكرة: جدول + بحث + فلاتر + ترقيم + إضافة/تعديل/حذف.
// فبدل ما نكتب نفس الكود 6 مرات، كتبناه مرة وحدة هون كدالة:
//
//     setupListPage(config)
//
// وكل صفحة بتبعتلها "إعدادات" (config) خاصة فيها:
// اسم البيانات، شكل الصف، حقول النموذج... (شوف js/pages/courses.js)
//
// الـ HTML اللي بيتوقعه هذا الملف بالصفحة (بالـ id):
//   #list-search      حقل البحث
//   #reset-filters    زر إعادة التعيين
//   #list-counter     "7 عنصر"
//   #list-body        <tbody> الجدول
//   #list-range       "عرض 1–6 من 7"
//   #list-pagination  أزرار الصفحات
//   [data-add]        أي زر إضافة
//   [data-export]     أي زر تصدير
//
// بيعتمد على: db (data.js) والدوال المساعدة (main.js)
// =========================================================


// ---------------------------------------------------------
// أزرار الإجراءات بآخر كل صف (عرض / تعديل / حذف)
// actions = ['view', 'edit', 'delete'] أو جزء منها
// noun = اسم العنصر للوصف، مثلاً "الدورة"
// ---------------------------------------------------------
const ROW_ACTIONS = {
  view: ['eye', 'تفاصيل'],
  edit: ['edit', 'تعديل'],
  delete: ['trash', 'حذف'],
};

function rowActions(id, actions, noun) {
  const buttons = actions.map((action) => {
    const [iconName, verb] = ROW_ACTIONS[action];
    const label = `${verb} ${noun}`;
    // data-action و data-id: لما ينضغط الزر بنعرف شو العملية وعلى أي سجل
    return `<button type="button" class="icon-btn" data-action="${action}" data-id="${escapeHtml(id)}" title="${label}" aria-label="${label}">${icon(iconName, 'i-sm')}</button>`;
  });
  return `<div class="row-actions">${buttons.join('')}</div>`;
}


// ---------------------------------------------------------
// بناء حقل نموذج واحد من وصفه
// field = { name, label, type, required, options, attrs }
// ---------------------------------------------------------
function fieldHtml(field, value) {
  const star = field.required ? ' *' : '';

  // قائمة منسدلة
  if (field.type === 'select') {
    const options = field.options
      .map(([optValue, optText]) => {
        const selected = String(optValue) === String(value) ? 'selected' : '';
        return `<option value="${escapeHtml(optValue)}" ${selected}>${escapeHtml(optText)}</option>`;
      })
      .join('');
    return `
      <label class="form-field">
        <span>${field.label}${star}</span>
        <select class="form-control" name="${field.name}">${options}</select>
      </label>`;
  }

  // نص طويل (وصف، رسالة...): بياخد عرض النموذج كامل
  if (field.type === 'textarea') {
    return `
      <label class="form-field form-wide">
        <span>${field.label}${star}</span>
        <textarea class="form-control" name="${field.name}" ${field.required ? 'required' : ''}>${escapeHtml(value ?? '')}</textarea>
      </label>`;
  }

  // حقل عادي (text / number / email / date ...)
  return `
    <label class="form-field">
      <span>${field.label}${star}</span>
      <input class="form-control" type="${field.type || 'text'}" name="${field.name}"
             value="${escapeHtml(value ?? '')}" ${field.required ? 'required' : ''} ${field.attrs || ''} />
    </label>`;
}


// ---------------------------------------------------------
// أرقام جاهزة لصفحات الطلاب والمدرّبين والطلبات والحجوزات:
// المجموع (data-stat="total") + كم واحد حالته pending (data-stat="pending")
// بترجع دالة، فبنستعملها هيك:  updateStats: pendingStats('students')
// ---------------------------------------------------------
function pendingStats(collection) {
  return () => {
    const rows = db[collection];
    const stats = {
      total: rows.length,
      pending: rows.filter((r) => r.status === 'pending').length,
    };
    $$('[data-stat]').forEach((el) => (el.textContent = stats[el.dataset.stat]));
  };
}


// =========================================================
// الدالة الرئيسية
// =========================================================
function setupListPage(config) {

  // ---------- الحالة (State) ----------
  // كل شي بيأثر على شو بيظهر بالجدول محفوظ هون.
  // أي تغيير ← نعدّل الحالة ← نستدعي render() ← الجدول بيتحدّث
  const params = new URLSearchParams(window.location.search); // قراءة ?q=...&new=1
  const state = {
    query: params.get('q') || '',
    filters: {},          // مثلاً { status: 'all', category: 'all' }
    page: 1,
    perPage: 6,           // كم صف بكل صفحة
  };
  config.filters.forEach((f) => (state.filters[f.field] = 'all'));

  // ---------- العناصر ----------
  const searchInput = $('#list-search');
  const tbody = $('#list-body');
  const columnsCount = $$('thead th', tbody.closest('table')).length;

  searchInput.value = state.query;

  // السجلات الحالية من البيانات (مثلاً db.courses)
  const allRows = () => db[config.collection];


  // ---------- الفلترة ----------
  function filteredRows() {
    let rows = [...allRows()];

    // 1) البحث: السجل بيضل إذا أي قيمة فيه بتحتوي كلمة البحث
    const q = state.query.trim().toLowerCase();
    if (q) {
      rows = rows.filter((row) =>
        Object.values(row).some((value) => String(value).toLowerCase().includes(q))
      );
    }

    // 2) الفلاتر: كل فلتر مش "all" بيشيل السجلات اللي ما بتطابقه
    for (const [field, value] of Object.entries(state.filters)) {
      if (value !== 'all') {
        rows = rows.filter((row) => String(row[field]) === value);
      }
    }

    return rows;
  }


  // ---------- الرسم (Render) ----------
  // بتبني الجدول والترقيم من جديد حسب الحالة
  function render() {
    const rows = filteredRows();

    // حساب الصفحات
    const totalPages = Math.max(1, Math.ceil(rows.length / state.perPage));
    state.page = Math.min(Math.max(1, state.page), totalPages); // نتأكد إنها ضمن الحدود
    const start = (state.page - 1) * state.perPage;
    const visible = rows.slice(start, start + state.perPage);

    // العدّاد
    $('#list-counter').textContent = `${rows.length} عنصر`;

    // الصفوف (أو رسالة "لا نتائج")
    tbody.innerHTML = visible.length
      ? visible.map(config.renderRow).join('')
      : `<tr><td colspan="${columnsCount}">
           <div class="empty-state">
             ${icon('search')}
             <h3>لم يتم العثور على نتائج</h3>
             <p>جرّب تعديل عبارة البحث أو إزالة المرشحات.</p>
           </div>
         </td></tr>`;

    // "عرض 1–6 من 7"
    const from = rows.length ? start + 1 : 0;
    const to = Math.min(start + state.perPage, rows.length);
    $('#list-range').textContent = `عرض ${from}–${to} من ${rows.length}`;

    // أزرار الترقيم: ‹ 1 2 3 ›
    let pageButtons = `<button type="button" class="page-btn" data-page="prev" ${state.page === 1 ? 'disabled' : ''} aria-label="الصفحة السابقة">‹</button>`;
    for (let n = 1; n <= totalPages; n++) {
      pageButtons += `<button type="button" class="page-btn ${n === state.page ? 'current' : ''}" data-page="${n}" aria-label="صفحة ${n}">${n}</button>`;
    }
    pageButtons += `<button type="button" class="page-btn" data-page="next" ${state.page === totalPages ? 'disabled' : ''} aria-label="الصفحة التالية">›</button>`;
    $('#list-pagination').innerHTML = pageButtons;

    // أرقام فوق الصفحة + أرقام القائمة الجانبية
    if (config.updateStats) config.updateStats();
    refreshSidebarCounts();
  }


  // ---------- نموذج الإضافة / التعديل ----------
  // record موجود = تعديل، مش موجود = إضافة
  function openForm(record) {
    const isEdit = Boolean(record);
    const values = record || config.formDefaults();

    const dialog = openModal({
      title: isEdit ? config.labels.edit : config.labels.add,
      body: `
        <p class="form-help">املأ البيانات التجريبية. لن يتم إرسالها إلى أي خادم.</p>
        <form id="row-form" class="form-row">
          ${config.fields.map((field) => fieldHtml(field, values[field.name])).join('')}
        </form>`,
      // form="row-form" بيربط الزر بالنموذج حتى لو هو برّاه
      footer: `
        <button type="button" class="btn btn-outline" data-close>${icon('close', 'i-sm')} إلغاء</button>
        <button type="submit" class="btn btn-primary" form="row-form">${icon('check', 'i-sm')} ${isEdit ? 'حفظ التغييرات' : 'حفظ البيانات'}</button>`,
    });

    // المؤشر بأول حقل
    $('input, select', dialog)?.focus();

    // المتصفح بيفحص required و min/max قبل ما يوصل الحدث هون
    $('#row-form', dialog).addEventListener('submit', (event) => {
      event.preventDefault();
      saveRecord(new FormData(event.target), record);
      closeModal(dialog);
    });
  }

  // ---------- الحفظ ----------
  function saveRecord(formData, existing) {
    // FormData ← كائن عادي: { title: '...', price: '10', ... }
    const values = Object.fromEntries(formData);

    // الحقول الرقمية بتوصل كنص، فبنحوّلها لأرقام (وما بنسمح بالسالب)
    config.fields
      .filter((f) => f.type === 'number')
      .forEach((f) => (values[f.name] = Math.max(0, Number(values[f.name]) || 0)));

    // تعديل خاص بكل صفحة (اختياري)
    if (config.beforeSave) config.beforeSave(values);

    if (existing) {
      Object.assign(existing, values); // بنعدّل نفس الكائن
    } else {
      const rows = allRows();
      const newId = Math.max(0, ...rows.map((r) => Number(r.id) || 0)) + 1;
      // ... (spread) بيدمج الكائنات: القيم الافتراضية ← قيم النموذج
      rows.unshift({ id: newId, ...config.newDefaults(), ...values }); // unshift = بأول المصفوفة
      state.page = 1;
    }

    saveDb();
    render();
    toast(existing ? 'تم حفظ التغييرات' : 'تمت الإضافة بنجاح');
  }

  // ---------- عرض التفاصيل ----------
  function viewRecord(record) {
    const rowsHtml = Object.entries(record)
      .map(([key, value]) => {
        const label = config.fieldLabels[key] || key;
        let shown = value;
        if (typeof value === 'boolean') shown = value ? 'نعم' : 'لا';
        if (key === 'status') shown = STATUS_BADGES[value]?.[1] || value;
        return `<div class="details-row"><span>${escapeHtml(label)}</span><b>${escapeHtml(shown)}</b></div>`;
      })
      .join('');

    const dialog = openModal({
      title: 'تفاصيل السجل',
      body: `<div>${rowsHtml}</div>`,
      footer: `
        <button type="button" class="btn btn-outline" data-close>${icon('close', 'i-sm')} إغلاق</button>
        <button type="button" class="btn btn-primary" data-edit>${icon('edit', 'i-sm')} تعديل السجل</button>`,
    });

    // زر "تعديل" جوّا نافذة التفاصيل: بنسكّرها ونفتح النموذج
    $('[data-edit]', dialog).addEventListener('click', () => {
      closeModal(dialog);
      openForm(record);
    });
  }

  // ---------- تأكيد الحذف ----------
  function confirmDelete(record) {
    const name = record.title || record.name || record.student || `#${record.id}`;
    const dialog = openModal({
      title: 'تأكيد الحذف',
      body: `
        <div class="danger-note">
          ${icon('trash')}
          <span>هل تريد حذف <strong>${escapeHtml(name)}</strong>؟ يمكن استعادة البيانات الأصلية من صفحة الإعدادات.</span>
        </div>`,
      footer: `
        <button type="button" class="btn btn-outline" data-close>${icon('close', 'i-sm')} إلغاء</button>
        <button type="button" class="btn btn-danger" data-confirm>${icon('trash', 'i-sm')} تأكيد الحذف</button>`,
    });

    $('[data-confirm]', dialog).addEventListener('click', () => {
      // filter بيرجع مصفوفة جديدة بدون السجل المحذوف
      db[config.collection] = allRows().filter((r) => r !== record);
      saveDb();
      render();
      closeModal(dialog);
      toast('تم حذف السجل');
    });
  }


  // =========================================================
  // الأحداث (Events)
  // =========================================================

  // البحث: كل حرف بنكتبه بيحدّث الجدول فوراً
  searchInput.addEventListener('input', () => {
    state.query = searchInput.value;
    state.page = 1;
    render();
  });

  // الفلاتر (القوائم المنسدلة)
  config.filters.forEach((filter) => {
    $(`#${filter.id}`).addEventListener('change', (event) => {
      state.filters[filter.field] = event.target.value;
      state.page = 1;
      render();
    });
  });

  // إعادة تعيين: نرجّع كل شي للبداية
  $('#reset-filters').addEventListener('click', () => {
    state.query = '';
    searchInput.value = '';
    config.filters.forEach((filter) => {
      state.filters[filter.field] = 'all';
      $(`#${filter.id}`).value = 'all';
    });
    state.page = 1;
    render();
  });

  // الترقيم: "Event Delegation"
  // بدل listener لكل زر (والأزرار بتنبني من جديد كل render)،
  // بنحط listener واحد على الأب، وبنشوف مين انضغط
  $('#list-pagination').addEventListener('click', (event) => {
    const button = event.target.closest('[data-page]');
    if (!button) return;
    const target = button.dataset.page;
    if (target === 'prev') state.page--;
    else if (target === 'next') state.page++;
    else state.page = Number(target);
    render();
  });

  // أزرار الصفوف (عرض / تعديل / حذف): نفس الفكرة، listener واحد على <tbody>
  tbody.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const record = allRows().find((r) => String(r.id) === button.dataset.id);
    if (!record) return;

    if (button.dataset.action === 'view') viewRecord(record);
    if (button.dataset.action === 'edit') openForm(record);
    if (button.dataset.action === 'delete') confirmDelete(record);
  });

  // أزرار الإضافة (ممكن يكون في أكثر من زر)
  $$('[data-add]').forEach((btn) => btn.addEventListener('click', () => openForm()));

  // أزرار التصدير: بنصدّر السجلات الظاهرة بعد الفلترة
  $$('[data-export]').forEach((btn) =>
    btn.addEventListener('click', () => {
      downloadCsv(filteredRows(), `${config.collection}-${today()}.csv`);
      toast('تم تصدير البيانات CSV');
    })
  );


  // =========================================================
  // البداية
  // =========================================================
  render();

  // إذا الرابط فيه ?new=1 (جاي من زر "إضافة دورة" بالداشبورد)
  if (params.get('new') === '1') {
    openForm();
    // بنشيل ?new=1 من الرابط عشان التحديث ما يفتح النافذة مرة ثانية
    history.replaceState(null, '', window.location.pathname);
  }
}
