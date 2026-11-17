// =========================================================
// page-builder.js — "باني الصفحات" من الإعدادات
//
// معظم صفحات اللوحة (حوالي 80 صفحة) من 3 أنواع بس:
//   'list'  صفحة جدول: عنوان + أرقام + فلاتر + جدول + إضافة/تعديل/حذف
//   'form'  صفحة نموذج: حقول + زر حفظ (أو إرسال)
//   'soon'  صفحة "قريباً" (زي اللوحة الحقيقية)
//
// كل صفحة إلها "إعدادات" بملف القسم تبعها (js/config/*.js):
//   PAGES['supports'] = { kind: 'list', title: 'التذاكر', columns: [...], rows: [...] }
//
// والـ HTML تبع الصفحة صغير، فيه:
//   <body data-page="supports">  و  <main class="content" id="page-root">
// هذا الملف بيقرأ data-page، بيلاقي الإعدادات، وبيبني الصفحة.
//
// بيعتمد على: data.js، main.js، list-page.js
// =========================================================

// كل ملف إعدادات بيضيف صفحاته لهون
const PAGES = {};


// =========================================================
// 1) أدوات مشتركة
// =========================================================

// صف العنوان (نفس شكل كل صفحاتنا)
function pageTitleRow(cfg, actionsHtml = '') {
  return `
    <div class="page-title-row">
      <div>
        <div class="breadcrumb">
          <span>${escapeHtml(cfg.section || 'الرئيسية')}</span>
          ${icon('chevron', 'i-sm')}
          <span class="active">${escapeHtml(cfg.title)}</span>
        </div>
        <h1 class="page-title">${escapeHtml(cfg.title)}</h1>
        <p class="page-sub">${escapeHtml(cfg.sub || '')}</p>
      </div>
      <div class="actions">${actionsHtml}</div>
    </div>`;
}

const NOTICE = `
  <div class="notice-banner">
    ${icon('help', 'i-sm')}
    <span>بيانات تجريبية للتعلّم بنفس هيكل اللوحة الحقيقية. التعديلات بتنحفظ بمتصفحك فقط.</span>
  </div>`;


// =========================================================
// 2) أنواع الأعمدة: كيف بتنعرض كل قيمة بالجدول
// العمود بيتكتب هيك: ['المفتاح', 'العنوان', 'النوع', { خيارات }]
// =========================================================
const CELL = {
  text:    (v) => escapeHtml(v),
  id:      (v) => `<b class="rank">#${escapeHtml(v)}</b>`,
  title:   (v, row, opt) => `<div class="cell-title">${escapeHtml(v)}${opt.sub ? `<small>${escapeHtml(row[opt.sub] ?? '')}</small>` : ''}</div>`,
  person:  (v, row, opt, i) => personCell(String(v || '—'), i),
  money:   (v) => `<b>${money(v)}</b>`,
  number:  (v) => escapeHtml(v),
  percent: (v) => `<b>${escapeHtml(v)}%</b>`,
  date:    (v) => `<span class="ltr">${escapeHtml(v)}</span>`,
  ltr:     (v) => `<span class="ltr" dir="ltr">${escapeHtml(v)}</span>`,
  code:    (v) => `<code class="code-chip">${escapeHtml(v)}</code>`,
  status:  (v) => statusBadge(v),
  pill:    (v) => `<span class="pill gray">${escapeHtml(v)}</span>`,
  bool:    (v) => (v === true || v === 'true' ? icon('check', 'i-sm') : '—'),
  rating:  (v) => `<b class="rating">★ ${escapeHtml(v)}</b>`,
  color:   (v) => `<span class="color-dot" style="background: ${escapeHtml(v)}"></span> <span class="ltr">${escapeHtml(v)}</span>`,
  icon:    (v) => `<span class="feed-icon">${icon(v || 'grid', 'i-sm')}</span>`,
  long:    (v) => `<span class="cell-long">${escapeHtml(v)}</span>`,
};

// نوع العمود ← نوع حقل النموذج
const FIELD_TYPE = {
  money: 'number', number: 'number', percent: 'number', rating: 'number',
  date: 'date', long: 'textarea', color: 'color',
};


// =========================================================
// 3) صفحة القائمة (list)
// =========================================================
function buildListPage(id, cfg) {
  const collection = cfg.collection || id;

  // أول مرة: بنحط البيانات النموذجية بـ db (بعدين بتنحفظ بـ localStorage)
  if (!db[collection]) {
    db[collection] = structuredClone(cfg.rows || []);
  }
  const rows = () => db[collection];

  // الأعمدة: [key, label, type, options] ← كائنات أوضح
  const columns = cfg.columns.map(([key, label, type = 'text', opt = {}]) => ({ key, label, type, opt }));
  const actions = cfg.actions || (cfg.readOnly ? ['view'] : ['view', 'edit', 'delete']);
  const canAdd = !cfg.readOnly && cfg.add !== false;

  // ----- الأرقام فوق الفلاتر -----
  // ['العنوان', 'count'] أو ['العنوان', {status: 'x'}] أو ['العنوان', {sum: 'field'}] أو ['العنوان', 42]
  const stats = cfg.stats || [['إجمالي السجلات', 'count']];
  function statValue(rule) {
    const list = rows();
    if (rule === 'count') return list.length;
    if (typeof rule === 'number' || typeof rule === 'string') return rule;
    if (rule.status) return list.filter((r) => r.status === rule.status).length;
    if (rule.where) return list.filter((r) => String(r[rule.where[0]]) === String(rule.where[1])).length;
    if (rule.sum) {
      const total = list.reduce((s, r) => s + (Number(r[rule.sum]) || 0), 0);
      const col = columns.find((c) => c.key === rule.sum);
      return col && col.type === 'money' ? formatMoney(total) : total;
    }
    return '—';
  }

  // ----- الفلاتر -----
  // الحالة: من cfg.statuses. والقوائم الإضافية: خياراتها من القيم الموجودة بالبيانات
  const selects = (cfg.selects || []).map(([field, label]) => ({ field, label }));
  const distinct = (field) => [...new Set(rows().map((r) => r[field]).filter(Boolean))];

  const statusSelect = cfg.statuses
    ? `<select id="status-filter" class="filter-select" aria-label="تصفية حسب الحالة">
         <option value="all">كل الحالات</option>
         ${cfg.statuses.map((s) => `<option value="${s}">${escapeHtml(STATUS_BADGES[s]?.[1] || s)}</option>`).join('')}
       </select>`
    : '';

  const extraSelects = selects
    .map((s, i) => `
      <select id="extra-filter-${i}" class="filter-select" aria-label="${escapeHtml(s.label)}">
        <option value="all">${escapeHtml(s.label)}: الكل</option>
        ${distinct(s.field).map((v) => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join('')}
      </select>`)
    .join('');

  // ----- الأزرار -----
  const addLabel = cfg.addLabel || 'إضافة جديد';
  const topActions = `
    ${canAdd ? `<button type="button" class="btn btn-primary" data-add>${icon('plus', 'i-sm')} ${escapeHtml(addLabel)}</button>` : ''}
    <button type="button" class="btn btn-outline" data-export>${icon('download', 'i-sm')} تصدير البيانات</button>`;

  const headers = columns.map((c) => `<th scope="col">${escapeHtml(c.label)}</th>`).join('') +
    (actions.length ? '<th scope="col">الإجراءات</th>' : '');

  // ----- نبني الصفحة -----
  $('#page-root').innerHTML = `
    ${pageTitleRow(cfg, topActions)}
    ${NOTICE}
    <div class="insights-strip">
      ${stats.map(([label], i) => `<div class="insight-pill">${escapeHtml(label)} <b data-stat="s${i}">0</b></div>`).join('')}
    </div>
    <div class="paper filter-bar">
      <label class="field-with-icon search-field">
        ${icon('search', 'i-sm')}
        <input id="list-search" type="search" placeholder="ابحث..." aria-label="البحث في الجدول" />
      </label>
      ${statusSelect}
      ${extraSelects}
      <button type="button" class="btn btn-outline btn-sm" id="reset-filters">${icon('refresh', 'i-sm')} إعادة تعيين</button>
    </div>
    <section class="paper table-panel">
      <div class="table-header">
        <div>
          <h2 class="panel-title">${escapeHtml(cfg.tableTitle || cfg.title)}</h2>
          <span class="counter-badge" id="list-counter">0 عنصر</span>
        </div>
        <div class="table-actions">
          <button type="button" class="btn btn-outline btn-sm" data-export>${icon('download', 'i-sm')} تصدير CSV</button>
          ${canAdd ? `<button type="button" class="btn btn-primary btn-sm" data-add>${icon('plus', 'i-sm')} ${escapeHtml(addLabel)}</button>` : ''}
        </div>
      </div>
      <div class="table-scroll">
        <table class="data-table">
          <thead><tr>${headers}</tr></thead>
          <tbody id="list-body"></tbody>
        </table>
      </div>
      <div class="pagination">
        <span class="panel-note" id="list-range"></span>
        <div class="page-buttons" id="list-pagination"></div>
      </div>
    </section>`;

  // ----- حقول النموذج: من الأعمدة (إلا لو الصفحة حددت حقولها) -----
  const fields = cfg.fields || columns
    .filter((c) => c.type !== 'id' && !c.opt.ro)
    .map((c, i) => {
      if (c.type === 'status') {
        return { name: c.key, label: c.label, type: 'select', options: cfg.statuses.map((s) => [s, STATUS_BADGES[s]?.[1] || s]) };
      }
      if (c.type === 'bool') {
        return { name: c.key, label: c.label, type: 'select', options: [['true', 'نعم'], ['false', 'لا']] };
      }
      if (c.opt.options) {
        return { name: c.key, label: c.label, type: 'select', options: c.opt.options.map((o) => [o, o]) };
      }
      return {
        name: c.key,
        label: c.label,
        type: FIELD_TYPE[c.type] || (c.opt.email ? 'email' : 'text'),
        required: i === 0,                     // أول حقل إجباري
        attrs: ['money', 'number', 'percent'].includes(c.type) ? 'min="0" step="any"' : '',
      };
    });

  // ----- نسلّم الباقي لمحرّك القوائم (list-page.js) -----
  setupListPage({
    collection,
    filters: [
      ...(cfg.statuses ? [{ id: 'status-filter', field: 'status' }] : []),
      ...selects.map((s, i) => ({ id: `extra-filter-${i}`, field: s.field })),
    ],
    labels: {
      add: cfg.addLabel || 'إضافة جديد',
      edit: `تعديل: ${cfg.noun || 'السجل'}`,
    },
    renderRow: (row, i) => `
      <tr>
        ${columns.map((c) => `<td>${CELL[c.type](row[c.key] ?? '', row, c.opt, i)}</td>`).join('')}
        ${actions.length ? `<td>${rowActions(row.id, actions, cfg.noun || 'السجل')}</td>` : ''}
      </tr>`,
    fields,
    formDefaults: () => ({ ...(cfg.statuses ? { status: cfg.statuses[0] } : {}), ...(cfg.defaults || {}) }),
    newDefaults: () => ({ ...(cfg.newDefaults || {}) }),
    // قيم نعم/لا بتوصل من النموذج كنص، فبنرجعها true/false
    beforeSave(values) {
      columns.filter((c) => c.type === 'bool').forEach((c) => (values[c.key] = values[c.key] === 'true'));
    },
    fieldLabels: Object.fromEntries([['id', 'الرقم'], ...columns.map((c) => [c.key, c.label])]),
    updateStats() {
      stats.forEach(([, rule], i) => {
        const el = $(`[data-stat="s${i}"]`);
        if (el) el.textContent = statValue(rule);
      });
    },
  });
}


// =========================================================
// 4) صفحة النموذج (form)
// sections: [{ title, fields: [{ name, label, type, value, options, wide }] }]
// القيم بتنحفظ بـ db.forms[اسم الصفحة]
// =========================================================
function formFieldHtml(f, value) {
  const wide = f.wide || f.type === 'textarea' ? 'form-wide' : '';
  const val = value ?? f.value ?? '';

  if (f.type === 'switch') {
    // مفتاح تشغيل: نفس شكل صفحة الإعدادات، و bindToggles بتربطه
    return `
      <div class="settings-row form-wide">
        <div><strong>${escapeHtml(f.label)}</strong>${f.help ? `<p>${escapeHtml(f.help)}</p>` : ''}</div>
        <button type="button" class="toggle" role="switch" aria-checked="false" aria-label="${escapeHtml(f.label)}" data-key="${f.name}"></button>
      </div>`;
  }
  if (f.type === 'select') {
    const opts = f.options.map((o) => {
      const [v, t] = Array.isArray(o) ? o : [o, o];
      return `<option value="${escapeHtml(v)}" ${String(v) === String(val) ? 'selected' : ''}>${escapeHtml(t)}</option>`;
    }).join('');
    return `<label class="form-field ${wide}"><span>${escapeHtml(f.label)}</span><select class="form-control" name="${f.name}">${opts}</select></label>`;
  }
  if (f.type === 'textarea') {
    return `<label class="form-field ${wide}"><span>${escapeHtml(f.label)}</span><textarea class="form-control" name="${f.name}">${escapeHtml(val)}</textarea></label>`;
  }
  if (f.type === 'file') {
    // ملف: للعرض بس (ما بنحفظ ملفات بنسخة الـ Front-end)
    return `<label class="form-field ${wide}"><span>${escapeHtml(f.label)}</span><input class="form-control" type="file" name="${f.name}" accept="${f.accept || 'image/*'}" /></label>`;
  }
  return `
    <label class="form-field ${wide}">
      <span>${escapeHtml(f.label)}${f.required ? ' *' : ''}</span>
      <input class="form-control" type="${f.type || 'text'}" name="${f.name}" value="${escapeHtml(val)}"
             ${f.required ? 'required' : ''} ${f.placeholder ? `placeholder="${escapeHtml(f.placeholder)}"` : ''} />
    </label>`;
}

function buildFormPage(id, cfg) {
  db.forms = db.forms || {};
  // القيم المحفوظة، وإذا ما في: القيم الافتراضية من الإعدادات
  if (!db.forms[id]) {
    db.forms[id] = {};
    cfg.sections.forEach((s) => s.fields.forEach((f) => {
      if (f.type === 'switch') db.forms[id][f.name] = Boolean(f.value);
    }));
  }
  const store = db.forms[id];
  const isSend = cfg.mode === 'send'; // نماذج إرسال (رسالة، إضافة طالب) بتفضى بعد الإرسال
  const submitLabel = cfg.submitLabel || (isSend ? 'إرسال' : 'حفظ التغييرات');

  const sectionsHtml = cfg.sections.map((s) => `
    <section class="paper panel">
      <div class="panel-head"><h2 class="panel-title">${escapeHtml(s.title)}</h2></div>
      <div class="form-row">
        ${s.fields.map((f) => formFieldHtml(f, isSend ? undefined : store[f.name])).join('')}
      </div>
    </section>`).join('');

  $('#page-root').innerHTML = `
    ${pageTitleRow(cfg, `<button type="submit" form="page-form" class="btn btn-primary">${icon(isSend ? 'arrow' : 'check', 'i-sm')} ${escapeHtml(submitLabel)}</button>`)}
    ${NOTICE}
    <div class="settings-main">
      <form id="page-form" class="stack">${sectionsHtml}</form>
      <aside class="paper panel">
        <div class="panel-head"><h2 class="panel-title">ملاحظة</h2></div>
        <div class="notice-inline">${icon('lock')} <span>${escapeHtml(cfg.note || 'هذه الحقول تجريبية. الحفظ بيغيّر بيانات المتصفح فقط ولا يعدّل أي خادم.')}</span></div>
      </aside>
    </div>`;

  bindToggles(store);

  $('#page-form').addEventListener('submit', (event) => {
    event.preventDefault();               // المتصفح فحص الحقول المطلوبة قبل ما يوصل هون
    const values = Object.fromEntries(new FormData(event.target));
    delete values[''];
    // الملفات ما بتنحفظ (Front-end فقط)
    cfg.sections.forEach((s) => s.fields.filter((f) => f.type === 'file').forEach((f) => delete values[f.name]));

    if (isSend) {
      event.target.reset();
      toast(cfg.doneMessage || 'تم الإرسال (تجريبي)');
    } else {
      Object.assign(store, values);
      saveDb();
      toast('تم حفظ التغييرات');
    }
  });
}


// =========================================================
// 5) صفحة "قريباً" (soon)
// =========================================================
function buildSoonPage(id, cfg) {
  $('#page-root').innerHTML = `
    ${pageTitleRow(cfg)}
    <section class="paper panel">
      <div class="empty-state">
        ${icon('clock')}
        <h3>قريباً</h3>
        <p>${escapeHtml(cfg.message || 'هذه الصفحة قيد التطوير في اللوحة الحقيقية أيضاً.')}</p>
      </div>
    </section>`;
}


// =========================================================
// 6) البداية
// DOMContentLoaded بيصير بعد ما كل ملفات defer تشتغل،
// يعني ملفات الإعدادات (js/config/*.js) بتكون عبّت PAGES
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  const id = document.body.dataset.page;
  const cfg = PAGES[id];
  if (!cfg) {
    $('#page-root').innerHTML = `<div class="empty-state"><h3>ما في إعدادات للصفحة "${escapeHtml(id)}"</h3></div>`;
    return;
  }
  if (cfg.kind === 'list') buildListPage(id, cfg);
  else if (cfg.kind === 'form') buildFormPage(id, cfg);
  else buildSoonPage(id, cfg);
});
