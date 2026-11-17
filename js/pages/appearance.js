// =========================================================
// appearance.js — صفحة مظهر الموقع
//
// 1) اختيار اللون الأساسي (المربعات الملونة)
// 2) نص العنوان والوصف + المعاينة الفورية
// 3) مفاتيح أقسام الموقع (toggles)
// 4) زر الحفظ
//
// كل الإعدادات محفوظة بكائن db.appearance (من data.js)
// =========================================================

const look = db.appearance; // اختصار


// =========================================================
// 1) الألوان
// المربعات مكتوبة بالـ HTML وعليها data-color.
// هون بس بنعلّم المختار، وبنسمع للضغط.
// =========================================================
const swatches = $$('.swatch');

function paintSwatches() {
  swatches.forEach((swatch) => {
    const isSelected = swatch.dataset.color === look.primary;
    swatch.classList.toggle('selected', isSelected);
    swatch.setAttribute('aria-pressed', String(isSelected));
    // علامة ✓ على المربع المختار بس
    swatch.innerHTML = isSelected ? icon('check') : '';
  });
}

swatches.forEach((swatch) => {
  swatch.addEventListener('click', () => {
    look.primary = swatch.dataset.color;
    saveDb();
    applyBrandColor(); // من main.js: بيغيّر --brand للصفحة كلها فوراً
    paintSwatches();
    toast('تم تطبيق اللون');
  });
});

paintSwatches();


// =========================================================
// 2) النصوص + المعاينة الفورية
// حدث "input" بيصير مع كل حرف، فالمعاينة بتتحدّث وانت بتكتب
// =========================================================
const titleInput = $('#hero-title');
const subtitleInput = $('#hero-subtitle');
const previewTitle = $('#preview-title');

titleInput.value = look.headline;
subtitleInput.value = look.subtitle;
previewTitle.textContent = look.headline; // textContent آمن (ما بيقرأ HTML)

titleInput.addEventListener('input', () => {
  previewTitle.textContent = titleInput.value;
});


// =========================================================
// 3) مفاتيح الأقسام
// bindToggles من main.js بتربط كل زر data-key بـ db.appearance
// =========================================================
bindToggles(look);


// =========================================================
// 4) الحفظ
// =========================================================
$('#save-appearance').addEventListener('click', () => {
  look.headline = titleInput.value.trim();
  look.subtitle = subtitleInput.value.trim();
  saveDb();
  toast('حُفظت إعدادات المظهر');
});

// الموقع العام مش جزء من هاي النسخة
$('#open-site').addEventListener('click', () => {
  toast('الموقع العام غير مربوط بهاي النسخة التجريبية');
});
