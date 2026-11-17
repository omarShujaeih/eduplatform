// =========================================================
// main.js — كود مشترك لكل صفحات لوحة التحكم
//
// الأقسام:
// 1) دوال مساعدة صغيرة (helpers) بنستخدمها بكل الصفحات
// 2) إشعار سفلي (toast)
// 3) نافذة منبثقة (modal)
// 4) تفاعل القائمة الجانبية والشريط العلوي
//
// ملاحظة: الدوال اللي هون "عامة"، يعني أي ملف JS بعد هذا الملف
// (زي dashboard.js) بيقدر يستدعيها مباشرة.
// =========================================================


// =========================================================
// 1) دوال مساعدة (Helpers)
// =========================================================

// اختصار لـ document.querySelector
const $ = (selector, root = document) => root.querySelector(selector);
// نفس الشي بس بيرجع كل العناصر كمصفوفة (Array)
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

// حماية من XSS: أي نص بدنا نحطه جوّا innerHTML
// لازم نحوّل فيه الرموز الخاصة (< > & " ') لرموز آمنة
function escapeHtml(value) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(value ?? '').replace(/[&<>"']/g, (ch) => map[ch]);
}

// بترجع كود أيقونة من ملف الـ sprite
// مثال: icon('book', 'i-sm')
function icon(name, extraClass = '') {
  return `<svg class="i ${extraClass}" aria-hidden="true"><use href="#${name}"></use></svg>`;
}

// الصورة الرمزية: أول حرف من أول كلمتين بالاسم
// index بيحدد اللون عشان كل صف ياخد لون مختلف
const AVATAR_COLORS = ['', 'yellow', 'pink', 'blue', 'lilac', 'green'];

function avatar(name, index = 0) {
  const initials = name
    .trim()
    .split(/\s+/)           // قسّم الاسم على المسافات
    .map((word) => word[0]) // خذ أول حرف من كل كلمة
    .slice(0, 2)            // أول حرفين بس
    .join('');
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return `<span class="avatar sm ${color}">${escapeHtml(initials)}</span>`;
}

// خلية جدول فيها صورة رمزية + اسم
function personCell(name, index = 0) {
  return `
    <div class="cell-person">
      ${avatar(name, index)}
      <div>
        <strong>${escapeHtml(name)}</strong>
        <small>حساب تعليمي</small>
      </div>
    </div>`;
}

// السعر: 0 = "مجاني"، غير هيك $10.00
function money(amount) {
  return amount ? `<span class="ltr">$${Number(amount).toFixed(2)}</span>` : 'مجاني';
}

// شارة الحالة: بنحوّل الكلمة الإنجليزية (من البيانات) لشارة عربية ملونة
const STATUS_BADGES = {
  published: ['live', 'منشور'],
  draft: ['draft', 'مسودة'],
  active: ['live', 'نشط'],
  inactive: ['canceled', 'غير نشط'],
  paid: ['live', 'مدفوع'],
  pending: ['pending', 'بانتظار المراجعة'],
  confirmed: ['live', 'مؤكد'],
  canceled: ['canceled', 'ملغي'],
  refunded: ['draft', 'مسترد'],
  // حالات تذاكر الدعم
  awaiting_reply: ['pending', 'ردود معلقة'],
  replied: ['live', 'تم الرد'],
  closed: ['draft', 'مغلق'],
  // حالات عامة لباقي صفحات اللوحة
  open: ['live', 'مفتوح'],
  approved: ['live', 'مقبول'],
  rejected: ['canceled', 'مرفوض'],
  banned: ['canceled', 'محظور'],
  verified: ['live', 'موثّق'],
  sent: ['live', 'تم الإرسال'],
  failed: ['canceled', 'فشل'],
  completed: ['live', 'مكتمل'],
  processing: ['pending', 'قيد المعالجة'],
  shipped: ['live', 'تم الشحن'],
  hidden: ['draft', 'مخفي'],
  expired: ['draft', 'منتهي'],
  read: ['draft', 'مقروء'],
  unread: ['pending', 'غير مقروء'],
  restricted: ['canceled', 'مقيّد'],
};

// مبلغ بفواصل الآلاف: 4225.5 ← $4,225.50
function formatMoney(amount) {
  return '$' + Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// نسبة التغيّر عن الفترة السابقة: ▲ أخضر للزيادة، ▼ أحمر للنقص
// null = ما في قيمة سابقة نقارن فيها
function changeBadge(change) {
  if (change === null) return `<span class="change">لا توجد قيمة سابقة</span>`;
  const up = change >= 0;
  return `<span class="change ${up ? 'up' : 'down'}">${up ? '▲' : '▼'} ${Math.abs(change)}%</span>`;
}

function statusBadge(status) {
  const [cls, label] = STATUS_BADGES[status] || ['', status];
  return `<span class="status ${cls}">${escapeHtml(label)}</span>`;
}


// تنزيل مصفوفة سجلات كملف CSV (بيفتح بالـ Excel)
// مثال: downloadCsv(db.courses, 'courses.csv')
function downloadCsv(rows, filename) {
  if (!rows.length) {
    toast('لا توجد سجلات لتصديرها');
    return;
  }

  const columns = Object.keys(rows[0]); // أسماء الأعمدة: id, title, ...

  // كل قيمة بين "" عشان الفواصل جوّا النص ما تخرب الملف
  // و "" جوّا القيمة بتصير """" (هيك قاعدة CSV)
  const lines = [
    columns.join(','),
    ...rows.map((row) => columns.map((key) => `"${String(row[key] ?? '').replace(/"/g, '""')}"`).join(',')),
  ];

  // ﻿ (BOM) بيخلّي Excel يقرأ العربي صح
  const csv = '﻿' + lines.join('\r\n');

  // Blob = ملف بالذاكرة، و createObjectURL بيعطيه رابط مؤقت
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();                                    // بنضغط الرابط بالكود
  setTimeout(() => URL.revokeObjectURL(url), 3000); // بنمسح الرابط المؤقت
}

// مفاتيح التشغيل/الإيقاف (Toggle) بصفحتي المظهر والإعدادات
// كل زر عليه data-key مربوط بخاصية بالكائن store
// مثال: <button class="toggle" data-key="hero"> ←→ db.appearance.hero
function bindToggles(store) {
  $$('.toggle[data-key]').forEach((button) => {
    const key = button.dataset.key;

    // بنرسم الزر حسب القيمة الحالية (on / off)
    const paint = () => {
      button.classList.toggle('on', Boolean(store[key]));
      button.setAttribute('aria-checked', String(Boolean(store[key])));
    };

    paint();
    button.addEventListener('click', () => {
      store[key] = !store[key]; // ! بيقلب القيمة: true ↔ false
      saveDb();
      paint();
      toast('تم تعديل الخيار');
    });
  });
}

// تاريخ اليوم بصيغة 2026-11-16
function today() {
  return new Date().toISOString().slice(0, 10);
}


// =========================================================
// 2) الإشعار السفلي (Toast)
// مثال: toast('تم الحفظ')
// =========================================================
function toast(message) {
  const root = $('#toast-root');
  if (!root) return;

  const node = document.createElement('div');
  node.className = 'toast';
  node.innerHTML = `${icon('check', 'i-sm')}<span>${escapeHtml(message)}</span>`;
  root.appendChild(node);

  // بعد 3.4 ثانية بنشيله
  setTimeout(() => node.remove(), 3400);
}


// =========================================================
// 3) النافذة المنبثقة (Modal)
// بنبني عنصر <dialog> وبنفتحه بـ showModal()
// مثال: openModal({ title: 'عنوان', body: '<p>محتوى</p>' })
// =========================================================
function openModal({ title, body, footer = '' }) {
  const dialog = document.createElement('dialog');
  dialog.className = 'modal';
  dialog.innerHTML = `
    <div class="modal-header">
      <h3>${escapeHtml(title)}</h3>
      <button type="button" class="icon-btn" data-close aria-label="إغلاق">${icon('close')}</button>
    </div>
    <div class="modal-body">${body}</div>
    <div class="modal-footer">
      ${footer || `<button type="button" class="btn btn-outline" data-close>${icon('close', 'i-sm')} إغلاق</button>`}
    </div>`;

  // أي زر عليه data-close بيسكّر النافذة
  dialog.addEventListener('click', (event) => {
    if (event.target.closest('[data-close]')) closeModal(dialog);
    // الضغط على الخلفية المعتمة (برّا الصندوق) بيسكّرها كمان
    if (event.target === dialog) closeModal(dialog);
  });

  // زر Esc: المتصفح بيبعت حدث "cancel"، فبنسكّر بطريقتنا
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeModal(dialog);
  });

  document.body.appendChild(dialog);
  dialog.showModal();
  return dialog;
}

// إغلاق النافذة وشيلها من الصفحة نهائياً.
// مهم نشيلها: إذا ضلّت مخفية بالصفحة، العناصر اللي جوّاها
// (زي <form id="row-form">) بتتعارض مع النافذة الجاية اللي إلها نفس الـ id
function closeModal(dialog) {
  if (dialog.open) dialog.close();
  dialog.remove();
}


// =========================================================
// 4) تفاعل القائمة والشريط العلوي
// =========================================================

// --- 4.1 أرقام القائمة الجانبية (عدد الدورات والاختبارات) ---
// عملناها دالة عشان صفحات القوائم تستدعيها بعد الإضافة أو الحذف
function refreshSidebarCounts() {
  $$('[data-count]').forEach((el) => {
    const collection = db[el.dataset.count]; // مثلاً db.courses
    el.textContent = collection ? collection.length : '';
  });
}

refreshSidebarCounts();

// --- 4.2 فتح وإغلاق القائمة على الموبايل ---
const sidebarEl = $('#sidebar');
const overlayEl = $('#mobile-overlay');

function toggleSidebar() {
  sidebarEl.classList.toggle('open');  // CSS بيحرّك القائمة لجوّا
  overlayEl.classList.toggle('open');  // وبيظهر الطبقة المعتمة
}

$('#sidebar-toggle')?.addEventListener('click', toggleSidebar);
overlayEl?.addEventListener('click', toggleSidebar);

// --- 4.3 البحث العام: Enter بيوديك على صفحة الدورات مع كلمة البحث ---
$('#global-search')?.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;
  event.preventDefault();
  // encodeURIComponent بيحوّل العربي والمسافات لشكل آمن بالرابط
  window.location.href = 'courses.html?q=' + encodeURIComponent(event.target.value);
});

// --- 4.4 زر الإشعارات ---
$('#notifications-btn')?.addEventListener('click', () => {
  openModal({
    title: 'الإشعارات',
    body: `
      <p class="section-intro">هنا ستظهر آخر التنبيهات والرسائل بعد ربط لوحة المدير بالخادم.</p>
      <div class="notice-inline">${icon('bell')} لم يتم توصيل نظام الإشعارات بعد.</div>`,
  });
});

// --- 4.5 الوضع الداكن ---
// كود صغير بـ <head> كل صفحة بيضيف class="dark-mode" قبل ما تنرسم الصفحة
// (عشان ما تومض أبيض). هون بس بنتعامل مع الزر.
const themeBtn = $('#theme-toggle');

// أيقونة الزر: 🌙 بالوضع الفاتح، ☀️ بالوضع الداكن
function syncThemeIcon() {
  if (!themeBtn) return;
  const isDark = document.documentElement.classList.contains('dark-mode');
  $('use', themeBtn).setAttribute('href', `#${isDark ? 'sun' : 'moon'}`);
}

themeBtn?.addEventListener('click', () => {
  // toggle بترجع true إذا أضافت الـ class، و false إذا شالته
  const isDark = document.documentElement.classList.toggle('dark-mode');
  try {
    localStorage.setItem('eduplatform-theme', isDark ? 'dark' : 'light');
  } catch {}
  syncThemeIcon();
});

syncThemeIcon();

// --- 4.6 اللون الأساسي (بيتغيّر من صفحة "مظهر الموقع") ---
// setProperty بيغيّر قيمة متغير CSS من الـ JS، فكل شي بيستعمل var(--brand) بيتلون
function applyBrandColor() {
  document.documentElement.style.setProperty('--brand', db.appearance.primary);
}

applyBrandColor();
