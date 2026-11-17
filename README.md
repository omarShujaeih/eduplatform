# Micro Learn Admin: إعادة بناء للتعلّم

إعادة بناء **كاملة** للوحة تحكم itutor24.com/admin (Front-end فقط) بـ **HTML + CSS + JavaScript** عادي، بدون مكتبات ولا build.
كل أقسام اللوحة الحقيقية موجودة: **117 صفحة** بنفس ترتيب القائمة، بالتصميم الجديد.

## التشغيل

افتح `login.html` بدبل كليك وبتشتغل. أو استعمل سيرفر محلي (أفضل):

```bash
python -m http.server 8000
```

بعدها افتح `http://localhost:8000/login.html` (أو استعمل Live Server بـ VS Code).

## نوعين من الصفحات

### 1) صفحات مكتوبة يدوي (11 صفحة)
صفحات إلها شكل خاص، فكل وحدة إلها HTML كامل + ملف JS:

| الصفحة | الملف | الـ JS |
|---|---|---|
| تسجيل الدخول | `login.html` | `js/pages/login.js` |
| لوحة التحكم | `index.html` | `js/pages/dashboard.js` |
| لوحة التسويق | `marketing.html` | `js/pages/marketing.js` |
| الفصول المسجلة | `courses.html` | `js/pages/courses.js` |
| الاختبارات | `quizzes.html` | `js/pages/quizzes.js` |
| الطلاب | `students.html` | `js/pages/students.js` |
| المعلمون | `tutors.html` | `js/pages/tutors.js` |
| قائمة المبيعات | `orders.html` | `js/pages/orders.js` |
| الجلسات | `bookings.html` | `js/pages/bookings.js` |
| التخصيص والمظهر | `appearance.html` | `js/pages/appearance.js` |
| الإعدادات العامة | `settings.html` | `js/pages/settings.js` |

### 2) صفحات مبنية من الإعدادات (106 صفحات)
باقي اللوحة (تذاكر، متجر، مدونة، ماليات، تسويق...) كلها جداول أو نماذج بنفس الشكل.
فكل صفحة إلها **HTML صغير** + **إعدادات** بملف القسم تبعها:

| القسم | ملف الإعدادات |
|---|---|
| التعليم | `js/config/education.js` |
| اجتماع + المستخدمين + المنتدى | `js/config/users.js` |
| CRM | `js/config/crm.js` |
| المحتوى | `js/config/content.js` |
| الماليات | `js/config/financial.js` |
| التسويق | `js/config/promotion.js` |
| الإعدادات | `js/config/settings-pages.js` |

## هيكل الملفات

```
css/
  base.css          المتغيرات (الألوان، الخط) + reset
  components.css    أزرار، كروت، جداول، نوافذ، مفاتيح
  layout.css        القائمة الجانبية (مع القوائم الفرعية) + الشريط العلوي
  theme-dark.css    الوضع الداكن (آخر ملف دايماً)
  pages/            CSS خاص (login, dashboard, marketing, appearance)
js/
  icons.js          كل الأيقونات (SVG Sprite) — أول سكربت بكل صفحة
  data.js           البيانات + الحفظ بـ localStorage
  layout.js         القائمة الجانبية الكاملة (NAV) + الشريط العلوي
  main.js           دوال مساعدة + النوافذ + الوضع الداكن
  list-page.js      محرّك القوائم: بحث، فلاتر، ترقيم، إضافة/تعديل/حذف
  page-builder.js   باني الصفحات من الإعدادات (list / form / soon)
  charts.js         رسم بياني SVG + دائرة
  config/           إعدادات صفحات كل قسم
  pages/            كود الصفحات المكتوبة يدوي
assets/images/      الشعار
docs/               خريطة اللوحة الحقيقية
```

## القواعد اللي مشينا عليها

1. **كل شي بيتكرر بيروح على ملف مشترك.**
2. **ترتيب CSS:** `base` ← `components` ← `layout` ← صفحة ← `theme-dark`.
3. **ترتيب JS:** `icons` (بدون defer) ← `data` ← `layout` ← `main` ← باقي الملفات (`defer`).
4. **الـ HTML للهيكل، والـ JS للبيانات والتفاعل.**
5. **أي نص بيدخل `innerHTML` بيمر على `escapeHtml()`.**
6. **متغيرات ملف JS عام بتتشارك مع باقي الملفات.** لو اسمين تشابهوا ← خطأ. الحل: `{ }` حول الكود.

## صفحة جديدة؟

1. ضيف إعداداتها بملف القسم:
   ```js
   PAGES['my-page'] = {
     kind: 'list', section: 'التسويق', title: 'صفحتي', noun: 'العنصر',
     statuses: ['active', 'inactive'],
     columns: [['title', 'العنوان', 'title'], ['price', 'السعر', 'money'], ['status', 'الحالة', 'status']],
     rows: [{ id: 1, title: 'مثال', price: 10, status: 'active' }],
   };
   ```
2. انسخ أي صفحة من النوع الثاني (مثلاً `bundles.html`)، وغيّر `<title>` و `data-page="my-page"` وملف الإعدادات.
3. ضيف رابطها بـ `NAV` جوّا `js/layout.js`.

> كل البيانات تجريبية وبتنحفظ بالمتصفح بس. "إعادة ضبط البيانات" بصفحة الإعدادات بترجّعها للأصل.
