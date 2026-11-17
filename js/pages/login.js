// =========================================================
// login.js — تفاعل صفحة تسجيل الدخول
//
// الفكرة العامة لأي تفاعل بالـ JS:
//   1) نلاقي العنصر:      document.querySelector('#id')
//   2) نستنى حدث عليه:     element.addEventListener('click', ...)
//   3) نغيّر شي:           نغيّر خاصية، class، أو نص
// =========================================================


// ---------------------------------------------------------
// 1) زر العين: إظهار / إخفاء كلمة المرور
// ---------------------------------------------------------

// querySelector بياخد CSS selector وبيرجع أول عنصر مطابق
const passInput = document.querySelector('#login-pass');
const toggleBtn = document.querySelector('#toggle-pass');

toggleBtn.addEventListener('click', () => {
  // إذا الحقل حالياً مخفي (password) بنخليه text، والعكس
  const isHidden = passInput.type === 'password';
  passInput.type = isHidden ? 'text' : 'password';

  // بنحدّث الوصف لقارئ الشاشة عشان يعرف شو رح يعمل الزر
  toggleBtn.setAttribute('aria-label', isHidden ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور');
});


// ---------------------------------------------------------
// 2) إرسال النموذج
// هاي نسخة تجريبية (Front-end فقط)، فما في فحص حقيقي.
// بنمنع الإرسال وبنروح مباشرة على لوحة التحكم.
// ---------------------------------------------------------
const form = document.querySelector('#login-form');

// حدث "submit" بيصير لما نضغط زر الإرسال أو Enter جوّا الحقل
form.addEventListener('submit', (event) => {
  event.preventDefault();               // بيمنع المتصفح من إعادة تحميل الصفحة
  window.location.href = 'index.html';  // بينقلنا لصفحة ثانية
});
