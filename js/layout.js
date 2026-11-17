// =========================================================
// layout.js — القائمة الجانبية + الشريط العلوي لكل صفحات اللوحة
//
// ليش صارت بالـ JS؟
// القائمة صار فيها حوالي 100 رابط (نفس لوحة itutor24 الحقيقية).
// لو نسخناها بكل صفحة، أي تعديل لازم ينعمل بـ 90 ملف.
// هيك: القائمة مكتوبة مرة وحدة هون (NAV)، وكل صفحة بتبنيها.
//
// كل صفحة HTML لازم يكون فيها:
//   <div class="main"> ... <main class="content"> ... </main> </div>
// وهذا الملف بيضيف القائمة قبل .main والشريط العلوي أول .main
//
// الترتيب: data.js ← layout.js ← main.js (main.js بيربط الأزرار اللي هون)
// =========================================================


// =========================================================
// 1) القائمة (NAV)
// header = عنوان مجموعة
// item بدون children = رابط مباشر
// item مع children = قائمة فرعية بتنفتح وتتسكّر (<details>)
// count = اسم بيانات بـ db، main.js بيحط عددها جنب الرابط
// =========================================================
const NAV = [
  { header: 'الرئيسية' },
  { label: 'لوحة التحكم', icon: 'grid', href: 'index.html' },
  { label: 'لوحة التسويق', icon: 'megaphone', href: 'marketing.html' },

  { header: 'التعليم' },
  { label: 'الفصول', icon: 'book', count: 'courses', children: [
    ['الفصول المسجلة', 'courses.html'],
    ['الفصول المباشرة', 'live-classes.html'],
    ['الدورات الكتابية', 'text-courses.html'],
    ['فصل جديد', 'courses.html?new=1'],
    ['سجل البث المباشر', 'live-history.html'],
  ] },
  { label: 'حزمات الدورات', icon: 'layers', children: [
    ['قائمة الحزمات', 'bundles.html'],
    ['حزمة جديدة', 'bundles.html?new=1'],
  ] },
  { label: 'الاختبارات', icon: 'quiz', href: 'quizzes.html', count: 'quizzes' },
  { label: 'الصفحة الرئيسية للموقع', icon: 'home', children: [
    ['السلايدر', 'home-slider.html'],
    ['قسم من نحن', 'home-about.html'],
    ['روابط شريط التنقل', 'home-navbar.html'],
    ['أقسام المعلومات', 'home-info-sections.html'],
    ['قسم الفيديو', 'home-video.html'],
    ['قسم ابحث عن مدرّب', 'home-find-instructor.html'],
    ['المواد الدراسية', 'home-subjects.html'],
    ['الخدمات', 'home-services.html'],
  ] },
  { label: 'التذييل', icon: 'menu', children: [
    ['العمود الأول', 'footer-column-1.html'],
    ['العمود الثاني', 'footer-column-2.html'],
    ['العمود الثالث', 'footer-column-3.html'],
  ] },
  { label: 'الشهادات', icon: 'award', children: [
    ['شهادات الاختبار', 'certificates.html'],
    ['شهادات الإنجاز', 'certificates-completion.html'],
    ['قوالب الشهادات', 'certificate-templates.html'],
    ['قالب جديد', 'certificate-templates.html?new=1'],
  ] },
  { label: 'الواجبات', icon: 'clipboard', href: 'assignments.html' },
  { label: 'منتدى الدورة', icon: 'message', href: 'course-forums.html' },
  { label: 'إشعارات الدورة', icon: 'bell', children: [
    ['القائمة', 'course-noticeboards.html'],
    ['إشعار جديد', 'course-noticeboards.html?new=1'],
  ] },
  { label: 'التسجيل', icon: 'check', children: [
    ['سجل التسجيل', 'enrollments.html'],
    ['أضف طالباً إلى مقرر', 'enrollment-add.html'],
  ] },
  { label: 'الأقسام', icon: 'grid', children: [
    ['القائمة', 'categories.html'],
    ['قسم جديد', 'categories.html?new=1'],
    ['الأقسام الرائجة', 'categories-trending.html'],
  ] },
  { label: 'خيارات الفرز', icon: 'filter', children: [
    ['القائمة', 'filters.html'],
    ['خيار جديد', 'filters.html?new=1'],
  ] },
  { label: 'المراجعات', icon: 'star', href: 'reviews.html' },

  { header: 'اجتماع' },
  { label: 'المستشارون', icon: 'tutor', href: 'consultants.html' },
  { label: 'الجلسات', icon: 'calendar', href: 'bookings.html' },

  { header: 'المستخدمين' },
  { label: 'المستخدمين', icon: 'users', children: [
    ['طاقم العمل', 'staff.html'],
    ['الطلاب', 'students.html'],
    ['المعلمون', 'tutors.html'],
    ['البوابات', 'organizations.html'],
    ['مستخدم جديد', 'staff.html?new=1'],
  ] },
  { label: 'إدارة الوصول', icon: 'lock', href: 'restricted-users.html' },
  { label: 'طلبات حذف الحساب', icon: 'trash', href: 'delete-requests.html' },
  { label: 'أدوار المستخدمين', icon: 'shield', children: [
    ['القائمة', 'roles.html'],
    ['دور جديد', 'roles.html?new=1'],
  ] },
  { label: 'المجموعات', icon: 'users', children: [
    ['القائمة', 'user-groups.html'],
    ['مجموعة جديدة', 'user-groups.html?new=1'],
  ] },
  { label: 'الشارات', icon: 'award', href: 'badges.html' },
  { label: 'طلبات المعلمين', icon: 'tutor', children: [
    ['المعلمون', 'instructor-requests.html'],
    ['البوابات', 'organization-requests.html'],
  ] },

  { header: 'المنتدى' },
  { label: 'المنتديات', icon: 'message', children: [
    ['القائمة', 'forums.html'],
    ['منتدى جديد', 'forums.html?new=1'],
  ] },
  { label: 'مواضيع مميزة', icon: 'star', children: [
    ['القائمة', 'featured-topics.html'],
    ['موضوع جديد', 'featured-topics.html?new=1'],
  ] },
  { label: 'مواضيع مقترحة', icon: 'sparkles', children: [
    ['القائمة', 'recommended-topics.html'],
    ['موضوع جديد', 'recommended-topics.html?new=1'],
  ] },

  { header: 'CRM' },
  { label: 'الدعم', icon: 'mail', children: [
    ['التذاكر', 'supports.html'],
    ['تذكرة دعم جديدة', 'supports.html?new=1'],
    ['أقسام الدعم', 'support-departments.html'],
  ] },
  { label: 'دعم الفصول', icon: 'help', href: 'course-support.html' },
  { label: 'التعليقات', icon: 'message', children: [
    ['تعليقات الفصول', 'course-comments.html'],
    ['تعليقات المدونة', 'blog-comments.html'],
  ] },
  { label: 'البلاغات', icon: 'flag', children: [
    ['بلاغات الفصول', 'course-reports.html'],
    ['بلاغات تعليقات الفصول', 'comment-reports.html'],
    ['بلاغات تعليقات المدونة', 'blog-comment-reports.html'],
    ['أسباب الإبلاغ', 'report-reasons.html'],
    ['بلاغات المنتدى', 'forum-reports.html'],
  ] },
  { label: 'رسائل الاتصال', icon: 'mail', href: 'contacts.html' },
  { label: 'لوحة الإشعارات', icon: 'clipboard', children: [
    ['القائمة', 'noticeboards.html'],
    ['إشعار جديد', 'noticeboards.html?new=1'],
  ] },
  { label: 'الإشعارات', icon: 'bell', children: [
    ['السجل', 'notifications.html'],
    ['المرسلة', 'notifications-posted.html'],
    ['إشعار جديد', 'notifications.html?new=1'],
    ['القوالب', 'notification-templates.html'],
    ['قالب جديد', 'notification-templates.html?new=1'],
  ] },

  { header: 'المحتوى' },
  { label: 'المتجر', icon: 'bag', children: [
    ['منتج جديد', 'store-products.html?new=1'],
    ['المنتجات', 'store-products.html'],
    ['المنتجات الداخلية', 'store-inhouse-products.html'],
    ['الطلبات', 'store-orders.html'],
    ['الطلبات الداخلية', 'store-inhouse-orders.html'],
    ['البائعون', 'store-sellers.html'],
    ['الأقسام', 'store-categories.html'],
    ['الفلاتر', 'store-filters.html'],
    ['الخصائص', 'store-specifications.html'],
    ['التخفيضات', 'store-discounts.html'],
    ['المراجعات', 'store-reviews.html'],
    ['الإعدادات', 'store-settings.html'],
  ] },
  { label: 'المدونة', icon: 'edit', children: [
    ['المنشورات', 'blog.html'],
    ['منشور جديد', 'blog.html?new=1'],
    ['الأقسام', 'blog-categories.html'],
  ] },
  { label: 'الصفحات', icon: 'file', children: [
    ['القائمة', 'pages.html'],
    ['صفحة جديدة', 'pages.html?new=1'],
  ] },
  { label: 'صفحات إضافية', icon: 'file', children: [
    ['صفحة 404', 'page-404.html'],
    ['صفحة الاتصال', 'page-contact.html'],
    ['التذييل', 'page-footer.html'],
    ['روابط أعلى الشريط', 'page-navbar-links.html'],
  ] },
  { label: 'التوصيات', icon: 'message', children: [
    ['القائمة', 'testimonials.html'],
    ['توصية جديدة', 'testimonials.html?new=1'],
  ] },
  { label: 'المواقع الجغرافية', icon: 'pin', children: [
    ['الدول', 'countries.html'],
    ['الأقاليم', 'provinces.html'],
    ['المدن', 'cities.html'],
    ['المناطق', 'districts.html'],
  ] },

  { header: 'الماليات' },
  { label: 'الأرصدة', icon: 'wallet', children: [
    ['المستندات', 'documents.html'],
    ['مستند جديد', 'documents.html?new=1'],
  ] },
  { label: 'قائمة المبيعات', icon: 'chart', href: 'orders.html' },
  { label: 'الدفع للمعلمين', icon: 'upload', children: [
    ['طلبات السحب', 'payout-requests.html'],
    ['سجل السحب', 'payout-history.html'],
  ] },
  { label: 'المدفوعات الأوفلاين', icon: 'download', children: [
    ['الطلبات', 'offline-payment-requests.html'],
    ['السجل', 'offline-payment-history.html'],
  ] },
  { label: 'الاشتراكات', icon: 'refresh', children: [
    ['الخطط', 'subscriptions.html'],
    ['خطة جديدة', 'subscriptions.html?new=1'],
  ] },
  { label: 'نقاط المكافأة', icon: 'gift', children: [
    ['السجل', 'rewards.html'],
    ['الشروط', 'reward-conditions.html'],
    ['الإعدادات', 'reward-settings.html'],
  ] },
  { label: 'باقات SaaS', icon: 'layers', children: [
    ['الخطط', 'saas-plans.html'],
    ['خطة جديدة', 'saas-plans.html?new=1'],
    ['التقارير', 'saas-reports.html'],
    ['الإعدادات', 'saas-settings.html'],
  ] },

  { header: 'التسويق' },
  { label: 'أكواد الخصم', icon: 'tag', children: [
    ['القائمة', 'discount-codes.html'],
    ['كود جديد', 'discount-codes.html?new=1'],
  ] },
  { label: 'خصومات الفصول', icon: 'percent', children: [
    ['القائمة', 'special-offers.html'],
    ['خصم جديد', 'special-offers.html?new=1'],
  ] },
  { label: 'الفصول الرائجة', icon: 'trend', children: [
    ['القائمة', 'featured-classes.html'],
    ['فصل رائج جديد', 'featured-classes.html?new=1'],
  ] },
  { label: 'ترويج المحتوى', icon: 'megaphone', children: [
    ['الخطط', 'promotions.html'],
    ['مبيعات الترويج', 'promotion-sales.html'],
    ['خطة جديدة', 'promotions.html?new=1'],
  ] },
  { label: 'بانرات الإعلان', icon: 'image', children: [
    ['القائمة', 'ad-banners.html'],
    ['بانر جديد', 'ad-banners.html?new=1'],
  ] },
  { label: 'القائمة البريدية', icon: 'mail', children: [
    ['المشتركون', 'newsletters.html'],
    ['إرسال رسالة', 'newsletter-send.html'],
    ['سجل الإرسال', 'newsletter-history.html'],
  ] },
  { label: 'التسويق بالعمولة', icon: 'link', children: [
    ['السجل', 'referrals.html'],
    ['المسوّقون', 'affiliate-users.html'],
  ] },
  { label: 'نموذج الإعلان', icon: 'sparkles', href: 'ad-modal.html' },

  { header: 'الإعدادات' },
  { label: 'الإعدادات', icon: 'settings', children: [
    ['الإعدادات العامة', 'settings.html'],
    ['الإعدادات المالية', 'settings-financial.html'],
    ['التخصيص والمظهر', 'appearance.html'],
    ['إعدادات الإشعارات', 'settings-notifications.html'],
    ['تحسين محركات البحث', 'settings-seo.html'],
    ['التخصيص المتقدم', 'settings-customization.html'],
  ] },
];


// =========================================================
// 2) معرفة الصفحة الحالية
// location.pathname = "/eduplatform/courses.html" ← بناخد آخر جزء
// =========================================================
const currentFile = window.location.pathname.split('/').pop() || 'index.html';

// الرابط "نشط" إذا اسم ملفه نفس الصفحة الحالية، وما فيه ?new=1
const isActive = (href) => href === currentFile;


// =========================================================
// 3) بناء القائمة الجانبية
// =========================================================
function navIcon(name) {
  return `<svg class="i" aria-hidden="true"><use href="#${name}"></use></svg>`;
}

function countBadge(item) {
  // main.js (refreshSidebarCounts) بيعبّي الرقم
  return item.count ? `<span class="count" data-count="${item.count}"></span>` : '';
}

function renderNavItem(item) {
  // عنوان مجموعة
  if (item.header) return `<div class="side-caption">${item.header}</div>`;

  // رابط مباشر
  if (!item.children) {
    const active = isActive(item.href);
    return `
      <a href="${item.href}" class="nav-link ${active ? 'active' : ''}" ${active ? 'aria-current="page"' : ''}>
        ${navIcon(item.icon)}<span>${item.label}</span>${countBadge(item)}
      </a>`;
  }

  // قائمة فرعية: <details> عنصر HTML جاهز بيفتح ويسكّر لحاله بدون JS
  // open = مفتوحة إذا الصفحة الحالية جوّاها
  const hasActive = item.children.some(([, href]) => isActive(href));
  const links = item.children
    .map(([label, href]) => {
      const active = isActive(href);
      return `<a href="${href}" class="nav-sublink ${active ? 'active' : ''}" ${active ? 'aria-current="page"' : ''}>${label}</a>`;
    })
    .join('');

  return `
    <details class="nav-group" ${hasActive ? 'open' : ''}>
      <summary class="nav-link ${hasActive ? 'has-active' : ''}">
        ${navIcon(item.icon)}<span>${item.label}</span>${countBadge(item)}
        <svg class="i i-sm nav-caret" aria-hidden="true"><use href="#down"></use></svg>
      </summary>
      <div class="nav-sub">${links}</div>
    </details>`;
}

function renderSidebar() {
  return `
    <aside class="sidebar" id="sidebar">
      <a class="side-brand" href="index.html">
        <img src="assets/images/brand-mark.svg" alt="Micro Learn" />
        <div class="brand-label">
          <b>MICRO LEARN</b>
          <span>ADMIN WORKSPACE</span>
        </div>
      </a>
      <nav class="side-nav" aria-label="القائمة الرئيسية">
        ${NAV.map(renderNavItem).join('')}
      </nav>
      <div class="sidebar-bottom">
        <div class="side-help">
          ${navIcon('sparkles')}
          <strong>تجربة إدارة أكثر بساطة</strong>
          <p>تصميم جديد لواجهة المدير مع إجراءات سريعة وتنظيم أوضح.</p>
          <a href="appearance.html">تخصيص المظهر ←</a>
        </div>
      </div>
    </aside>
    <div class="mobile-overlay" id="mobile-overlay"></div>`;
}


// =========================================================
// 4) الشريط العلوي
// اسم الصفحة (للموبايل) بناخده من <title>: "الطلاب · Micro Learn Admin" ← "الطلاب"
// =========================================================
function renderTopbar() {
  const pageName = document.title.split('·')[0].trim();
  return `
    <header class="topbar">
      <div class="top-right">
        <button type="button" class="icon-btn mobile-toggle" id="sidebar-toggle" aria-label="فتح القائمة">${navIcon('menu')}</button>
        <strong class="top-context">${pageName}</strong>
        <label class="top-search">
          <svg class="i i-sm" aria-hidden="true"><use href="#search"></use></svg>
          <input id="global-search" type="search" placeholder="ابحث عن دورة أو اختبار..." aria-label="البحث الشامل" />
          <span class="search-shortcut">↵</span>
        </label>
      </div>
      <div class="top-left">
        <span class="preview-pill"><svg class="i i-sm" aria-hidden="true"><use href="#eye"></use></svg> وضع المعاينة</span>
        <button type="button" class="icon-btn" id="theme-toggle" title="تبديل النمط الفاتح والداكن" aria-label="تبديل النمط">${navIcon('moon')}</button>
        <button type="button" class="icon-btn has-dot" id="notifications-btn" title="الإشعارات" aria-label="الإشعارات">${navIcon('bell')}</button>
        <div class="profile-mini">
          <span class="avatar">AD</span>
          <div><strong>مدير النظام</strong><small>مسؤول المنصة</small></div>
        </div>
        <a class="icon-btn" href="login.html" title="تسجيل الخروج" aria-label="تسجيل الخروج">${navIcon('logout')}</a>
      </div>
    </header>`;
}


// =========================================================
// 5) نضيفهم للصفحة
//
// ملاحظة مهمة: كل ملفات الـ JS العادية بتتشارك نفس "المساحة العامة".
// لو عرّفنا const sidebarEl هون، وmain.js معرّف واحد بنفس الاسم ← خطأ
// ("Identifier has already been declared") وبيوقف الملف كله.
// الحل: نحط الكود جوّا { } ، فالمتغيرات بتضل محلية جوّا البلوك.
// =========================================================
{
  const mainEl = document.querySelector('.main');
  mainEl.insertAdjacentHTML('beforebegin', renderSidebar());  // قبل .main
  mainEl.insertAdjacentHTML('afterbegin', renderTopbar());    // أول شي جوّا .main

  // القائمة طويلة: بنعمل سكرول للقائمة بس (مش للصفحة) لحد ما يبيّن الرابط النشط بالنص
  const sidebar = document.querySelector('#sidebar');
  const activeLink = sidebar.querySelector('.active');
  if (activeLink) {
    sidebar.scrollTop = activeLink.offsetTop - sidebar.clientHeight / 2;
  }
}
