// =========================================================
// settings.js — صفحة الإعدادات العامة
//
// 1) تعبئة الحقول من البيانات
// 2) مفاتيح خيارات الإدارة
// 3) زر الحفظ (مع فحص الإيميل)
// 4) استعادة البيانات الأصلية
// =========================================================

const settings = db.settings;

// ---------- 1) تعبئة الحقول ----------
const siteName = $('#site-name');
const supportEmail = $('#support-email');
const siteLang = $('#site-lang');

siteName.value = settings.siteName;
supportEmail.value = settings.supportEmail;
siteLang.value = settings.language; // بيختار الـ <option> اللي قيمته نفس القيمة


// ---------- 2) المفاتيح ----------
bindToggles(settings);


// ---------- 3) الحفظ ----------
$('#save-settings').addEventListener('click', () => {
  // checkValidity بيفحص type="email" و required
  // reportValidity بيطلع رسالة المتصفح جنب الحقل
  if (!supportEmail.checkValidity()) {
    supportEmail.reportValidity();
    return;
  }

  settings.siteName = siteName.value.trim();
  settings.supportEmail = supportEmail.value.trim();
  settings.language = siteLang.value;
  saveDb();
  toast('حُفظت الإعدادات');
});


// ---------- 4) استعادة البيانات الأصلية ----------
// بترجّع كل شي (الدورات، الاختبارات، المظهر...) زي أول مرة
$('#reset-data').addEventListener('click', () => {
  const dialog = openModal({
    title: 'استعادة البيانات النموذجية',
    body: `<p class="section-intro">سيتم حذف كل تعديلاتك (إضافة، تعديل، حذف، ألوان) واستعادة البيانات الأولية.</p>`,
    footer: `
      <button type="button" class="btn btn-outline" data-close>${icon('close', 'i-sm')} إلغاء</button>
      <button type="button" class="btn btn-danger" data-confirm>${icon('refresh', 'i-sm')} استعادة البيانات</button>`,
  });

  $('[data-confirm]', dialog).addEventListener('click', () => {
    // structuredClone بيعمل نسخة جديدة كاملة من البيانات الأولية
    db = structuredClone(initialData);
    saveDb();
    closeModal(dialog);
    // أسهل طريقة نحدّث كل شي بالصفحة: نعيد تحميلها
    window.location.reload();
  });
});
