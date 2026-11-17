// =========================================================
// config/education.js — إعدادات صفحات قسم "التعليم"
// نفس صفحات itutor24.com/admin (الفصول، الحزمات، الصفحة الرئيسية،
// التذييل، الشهادات، الإشعارات، التسجيل، الأقسام، الفرز، المراجعات)
//
// كيف تقرأ إعدادات صفحة قائمة:
//   columns: [المفتاح, العنوان, النوع, {خيارات}]
//            الأنواع: text, id, title, person, money, number, percent, date,
//                    ltr, code, status, pill, bool, rating, color, icon, long
//   stats:   الأرقام فوق ['العنوان', 'count' | {status} | {sum} | {where}]
//   statuses: الحالات المسموحة (بتصير فلتر + قائمة بالنموذج)
//   selects:  فلاتر إضافية [المفتاح, العنوان]، خياراتها من البيانات
//   rows:     البيانات النموذجية
// =========================================================

const EDU = 'التعليم';

// ---------- الفصول المباشرة ----------
PAGES['live-classes'] = {
  kind: 'list', section: EDU, title: 'الفصول المباشرة',
  sub: 'جلسات وويبينارات مباشرة مع المعلمين',
  noun: 'الفصل', addLabel: 'فصل مباشر جديد',
  stats: [['الإجمالي', 'count'], ['في انتظار المراجعة', { status: 'pending' }], ['الجارية حالياً', { where: ['live', true] }], ['إجمالي المبيعات', { sum: 'sales' }]],
  statuses: ['published', 'pending', 'draft'],
  selects: [['tutor', 'المعلم']],
  columns: [
    ['id', 'ID', 'id'], ['title', 'العنوان', 'title'], ['tutor', 'معلم', 'person'],
    ['price', 'السعر', 'money'], ['sales', 'مبيعات', 'number'], ['students', 'الطلاب', 'number'],
    ['start', 'تاريخ البدء', 'date'], ['live', 'جارية الآن', 'bool'], ['status', 'الحالة', 'status'],
  ],
  newDefaults: { sales: 0, students: 0 },
  rows: [
    { id: 2009, title: 'نظام مباشر جديد داخل التطبيق', tutor: 'نرمين أحمد', price: 10, sales: 4, students: 4, start: '2026-11-20', live: true, status: 'published' },
    { id: 2000, title: 'إدارة الوقت بفاعلية', tutor: 'آية محمد', price: 30, sales: 4, students: 4, start: '2026-11-22', live: false, status: 'published' },
    { id: 2003, title: 'الاستماع النشط: يمكنك أن تكون مستمعاً جيداً', tutor: 'سامي أحمد', price: 35, sales: 3, students: 3, start: '2026-11-25', live: false, status: 'published' },
    { id: 2002, title: 'دروس متقدمة في الصحة واللياقة البدنية', tutor: 'ريهام محمد', price: 18, sales: 2, students: 2, start: '2026-11-28', live: false, status: 'published' },
    { id: 1998, title: 'مايكروسوفت إكسل من المبتدئين إلى المتقدمين', tutor: 'نرمين أحمد', price: 60, sales: 4, students: 5, start: '2026-12-01', live: false, status: 'published' },
    { id: 1996, title: 'كيف تسافر حول العالم', tutor: 'أحمد مصطفى', price: 0, sales: 0, students: 1, start: '2026-12-03', live: false, status: 'pending' },
    { id: 1990, title: 'تعلم وافهم AngularJS', tutor: 'سامي أحمد', price: 25, sales: 1, students: 1, start: '2026-12-06', live: false, status: 'draft' },
  ],
};

// ---------- الدورات الكتابية ----------
PAGES['text-courses'] = {
  kind: 'list', section: EDU, title: 'الدورات الكتابية',
  sub: 'دروس نصية يقرأها الطالب بوتيرته',
  noun: 'الدورة', addLabel: 'دورة كتابية جديدة',
  stats: [['الإجمالي', 'count'], ['في انتظار المراجعة', { status: 'pending' }], ['إجمالي المبيعات', { sum: 'sales' }]],
  statuses: ['published', 'pending', 'draft'],
  columns: [
    ['id', 'ID', 'id'], ['title', 'العنوان', 'title'], ['tutor', 'معلم', 'person'],
    ['price', 'السعر', 'money'], ['sales', 'مبيعات', 'number'], ['lessons', 'الدروس', 'number'], ['status', 'الحالة', 'status'],
  ],
  newDefaults: { sales: 0 },
  rows: [
    { id: 1999, title: 'كيفية إدارة والتأثير على فريقك الافتراضي', tutor: 'ريهام محمد', price: 50, sales: 1, lessons: 10, status: 'published' },
    { id: 1993, title: 'أساسيات كتابة المحتوى', tutor: 'آية محمد', price: 0, sales: 0, lessons: 6, status: 'pending' },
  ],
};

// ---------- سجل البث المباشر ----------
PAGES['live-history'] = {
  kind: 'list', section: EDU, title: 'سجل البث المباشر', readOnly: true,
  sub: 'كل جلسات البث اللي صارت داخل التطبيق',
  noun: 'الجلسة',
  stats: [['عدد الجلسات', 'count'], ['إجمالي الدقائق', { sum: 'minutes' }]],
  columns: [
    ['course', 'الفصل', 'title'], ['session', 'الجلسة', 'text'], ['minutes', 'المدة (دقيقة)', 'number'],
    ['start', 'البداية', 'ltr'], ['end', 'النهاية', 'ltr'],
  ],
  rows: [
    { id: 1, course: 'نظام مباشر جديد داخل التطبيق', session: 'الجلسة الأولى', minutes: 60, start: '2026-11-10 16:00', end: '2026-11-10 17:00' },
    { id: 2, course: 'إدارة الوقت بفاعلية', session: 'مقدمة', minutes: 45, start: '2026-11-11 18:00', end: '2026-11-11 18:45' },
    { id: 3, course: 'مايكروسوفت إكسل', session: 'الدوال المتقدمة', minutes: 90, start: '2026-11-13 15:30', end: '2026-11-13 17:00' },
  ],
};

// ---------- حزمات الدورات ----------
PAGES['bundles'] = {
  kind: 'list', section: EDU, title: 'حزمات الدورات',
  sub: 'مجموعة دورات بسعر واحد',
  noun: 'الحزمة', addLabel: 'حزمة جديدة',
  stats: [['مجموع الحزمات', 'count'], ['في انتظار المراجعة', { status: 'pending' }], ['إجمالي المبيعات', { sum: 'sales' }]],
  statuses: ['published', 'pending', 'draft'],
  columns: [
    ['id', 'ID', 'id'], ['title', 'العنوان', 'title'], ['tutor', 'معلم', 'person'], ['price', 'السعر', 'money'],
    ['sales', 'مبيعات', 'number'], ['courses', 'عدد الدورات', 'number'], ['created', 'تاريخ الإنشاء', 'date'], ['status', 'الحالة', 'status'],
  ],
  newDefaults: { sales: 0 },
  rows: [
    { id: 31, title: 'حزمة المهارات الرقمية', tutor: 'ريهام محمد', price: 90, sales: 3, courses: 3, created: '2026-10-02', status: 'published' },
    { id: 32, title: 'حزمة القيادة والإدارة', tutor: 'حنان محمود', price: 75, sales: 1, courses: 2, created: '2026-10-15', status: 'published' },
    { id: 33, title: 'حزمة اللغات', tutor: 'نرمين أحمد', price: 40, sales: 0, courses: 4, created: '2026-11-01', status: 'pending' },
  ],
};

// ---------- أقسام الصفحة الرئيسية للموقع ----------
PAGES['home-slider'] = {
  kind: 'form', section: EDU, title: 'السلايدر', sub: 'الشريحة الرئيسية بأعلى الصفحة الرئيسية',
  sections: [{ title: 'محتوى السلايدر', fields: [
    { name: 'title', label: 'العنوان', value: 'تعلم اليوم. اصنع مستقبلك.', wide: true },
    { name: 'title2', label: 'العنوان الثاني', value: 'دورات مباشرة' },
    { name: 'title3', label: 'العنوان الثالث', value: 'مع أفضل المدرّبين' },
    { name: 'description', label: 'الوصف', type: 'textarea', value: 'دورات وخبراء وجلسات تفاعلية في مكان واحد.' },
    { name: 'image', label: 'الصورة', type: 'file', wide: true },
  ] }],
};

PAGES['home-about'] = {
  kind: 'form', section: EDU, title: 'قسم من نحن', sub: 'التعريف بالمنصة على الصفحة الرئيسية',
  sections: [
    { title: 'القسم الأول', fields: [
      { name: 's1Title', label: 'العنوان', value: 'من نحن' },
      { name: 's1Desc', label: 'الوصف', type: 'textarea', value: 'منصة تعليمية تجمع الطلاب بأفضل المعلمين.' },
    ] },
    { title: 'الأرقام', fields: [
      { name: 'num1', label: 'الرقم الأول', type: 'number', value: 1200 },
      { name: 'num1Title', label: 'عنوانه', value: 'طالب' },
      { name: 'num2', label: 'الرقم الثاني', type: 'number', value: 85 },
      { name: 'num2Title', label: 'عنوانه', value: 'دورة' },
      { name: 'num3', label: 'الرقم الثالث', type: 'number', value: 40 },
      { name: 'num3Title', label: 'عنوانه', value: 'معلم' },
    ] },
    { title: 'زر الدعوة', fields: [
      { name: 'linkName', label: 'نص الزر', value: 'ابدأ الآن' },
      { name: 'link', label: 'الرابط', type: 'url', value: 'https://example.test/register' },
    ] },
  ],
};

PAGES['home-navbar'] = {
  kind: 'list', section: EDU, title: 'روابط شريط التنقل', sub: 'الروابط بأعلى الموقع',
  noun: 'الرابط', addLabel: 'رابط جديد',
  columns: [['order', '#', 'number'], ['name', 'اسم الرابط', 'title'], ['link', 'الرابط', 'ltr']],
  rows: [
    { id: 1, order: 1, name: 'الرئيسية', link: '/' },
    { id: 2, order: 2, name: 'الدورات', link: '/classes' },
    { id: 3, order: 3, name: 'المعلمون', link: '/instructors' },
    { id: 4, order: 4, name: 'المدونة', link: '/blog' },
    { id: 5, order: 5, name: 'المتجر', link: '/products' },
    { id: 6, order: 6, name: 'من نحن', link: '/pages/about' },
    { id: 7, order: 7, name: 'اتصل بنا', link: '/contact' },
  ],
};

PAGES['home-info-sections'] = {
  kind: 'list', section: EDU, title: 'أقسام المعلومات', sub: 'كروت تعريفية بالصفحة الرئيسية',
  noun: 'القسم', addLabel: 'قسم جديد',
  columns: [['title', 'العنوان', 'title'], ['description', 'الوصف', 'long'], ['type', 'النوع', 'pill', { options: ['ميزة', 'خطوة', 'إحصائية'] }]],
  rows: [
    { id: 1, title: 'تعلّم من أي مكان', description: 'كل الدورات متاحة على الجوال والكمبيوتر.', type: 'ميزة' },
    { id: 2, title: 'شهادات معتمدة', description: 'احصل على شهادة بعد إتمام كل دورة.', type: 'ميزة' },
    { id: 3, title: 'جلسات مباشرة', description: 'تفاعل مع المعلم بشكل مباشر.', type: 'ميزة' },
    { id: 4, title: 'سجّل حسابك', description: 'أنشئ حساباً مجانياً خلال دقيقة.', type: 'خطوة' },
    { id: 5, title: 'اختر دورتك', description: 'تصفح مئات الدورات بالتصنيفات.', type: 'خطوة' },
  ],
};

PAGES['home-video'] = {
  kind: 'form', section: EDU, title: 'قسم الفيديو', sub: 'فيديو تعريفي على الصفحة الرئيسية',
  sections: [{ title: 'الفيديو', fields: [
    { name: 'title', label: 'العنوان', value: 'شاهد كيف تعمل المنصة' },
    { name: 'link', label: 'رابط الفيديو', type: 'url', value: 'https://example.test/intro.mp4' },
    { name: 'description', label: 'الوصف', type: 'textarea', value: 'جولة سريعة على أهم الميزات.' },
  ] }],
};

PAGES['home-find-instructor'] = {
  kind: 'form', section: EDU, title: 'قسم ابحث عن مدرّب', sub: 'دعوة الزوار لإيجاد المعلم المناسب',
  sections: [{ title: 'المحتوى', fields: [
    { name: 'title', label: 'العنوان', value: 'ابحث عن المدرّب المناسب لك' },
    { name: 'link', label: 'رابط الدرس', type: 'url', value: 'https://example.test/instructors' },
    { name: 'description', label: 'الوصف', type: 'textarea', value: 'معلمون خبراء بكل المجالات.' },
    { name: 'image', label: 'الصورة', type: 'file', wide: true },
  ] }],
};

PAGES['home-subjects'] = {
  kind: 'list', section: EDU, title: 'المواد الدراسية', sub: 'المواد المعروضة بالصفحة الرئيسية',
  noun: 'المادة', addLabel: 'مادة جديدة',
  columns: [['name', 'اسم المادة', 'title'], ['description', 'الوصف', 'long']],
  rows: [
    { id: 1, name: 'الرياضيات', description: 'جبر وهندسة وتفاضل.' },
    { id: 2, name: 'اللغة الإنجليزية', description: 'محادثة وقواعد وكتابة.' },
    { id: 3, name: 'البرمجة', description: 'تطوير الويب والتطبيقات.' },
    { id: 4, name: 'التصميم', description: 'تصميم الجرافيك وواجهات المستخدم.' },
  ],
};

PAGES['home-services'] = {
  kind: 'list', section: EDU, title: 'الخدمات', sub: 'خدمات المنصة بالصفحة الرئيسية',
  noun: 'الخدمة', addLabel: 'خدمة جديدة',
  columns: [['name', 'اسم الخدمة', 'title'], ['description', 'الوصف', 'long'], ['button', 'نص الزر', 'text'], ['link', 'الرابط', 'ltr']],
  rows: [
    { id: 1, name: 'دورات مسجلة', description: 'تعلّم بالوقت اللي بناسبك.', button: 'تصفح', link: '/classes' },
    { id: 2, name: 'جلسات خاصة', description: 'احجز جلسة مع مستشار.', button: 'احجز', link: '/consultants' },
    { id: 3, name: 'اختبارات وشهادات', description: 'قيّم مستواك واحصل على شهادة.', button: 'ابدأ', link: '/quizzes' },
    { id: 4, name: 'متجر تعليمي', description: 'كتب ومواد تعليمية.', button: 'تسوّق', link: '/products' },
  ],
};

// ---------- أعمدة التذييل (3 صفحات بنفس الشكل) ----------
const footerColumn = (n, title, rows) => ({
  kind: 'list', section: EDU, title: `التذييل: ${title}`, sub: `روابط العمود ${n} بأسفل الموقع`,
  noun: 'الرابط', addLabel: 'رابط جديد',
  columns: [['name', 'اسم الرابط', 'title'], ['link', 'الرابط', 'ltr']],
  rows,
});
PAGES['footer-column-1'] = footerColumn(1, 'العمود الأول', [
  { id: 1, name: 'من نحن', link: '/pages/about' }, { id: 2, name: 'الشروط والأحكام', link: '/pages/terms' },
  { id: 3, name: 'سياسة الخصوصية', link: '/pages/privacy' }, { id: 4, name: 'الأسئلة الشائعة', link: '/pages/faq' },
]);
PAGES['footer-column-2'] = footerColumn(2, 'العمود الثاني', [
  { id: 1, name: 'الدورات', link: '/classes' }, { id: 2, name: 'المعلمون', link: '/instructors' },
  { id: 3, name: 'المدونة', link: '/blog' },
]);
PAGES['footer-column-3'] = footerColumn(3, 'العمود الثالث', [
  { id: 1, name: 'اتصل بنا', link: '/contact' }, { id: 2, name: 'كن معلماً', link: '/become-instructor' },
  { id: 3, name: 'المتجر', link: '/products' }, { id: 4, name: 'الدعم', link: '/panel/support' },
]);

// ---------- الشهادات ----------
PAGES['certificates'] = {
  kind: 'list', section: EDU, title: 'شهادات الاختبار', readOnly: true,
  sub: 'شهادات حصل عليها الطلاب بعد النجاح بالاختبارات', noun: 'الشهادة',
  stats: [['عدد الشهادات', 'count']],
  selects: [['tutor', 'المعلم']],
  columns: [['id', '#', 'id'], ['quiz', 'العنوان', 'title'], ['student', 'طالب', 'person'], ['tutor', 'معلم', 'text'], ['grade', 'الدرجة', 'percent'], ['date', 'التاريخ', 'date']],
  rows: [
    { id: 501, quiz: 'Entrance Quiz', student: 'محمد خالد', tutor: 'نرمين أحمد', grade: 90, date: '2026-11-12' },
    { id: 502, quiz: 'Final Quiz', student: 'سارة أحمد', tutor: 'نرمين أحمد', grade: 85, date: '2026-11-10' },
    { id: 503, quiz: 'First Quiz', student: 'ليلى حسن', tutor: 'ريهام محمد', grade: 80, date: '2026-11-06' },
    { id: 504, quiz: 'Elementary Quiz', student: 'نور محمد', tutor: 'حنان محمود', grade: 95, date: '2026-11-02' },
  ],
};

PAGES['certificates-completion'] = {
  kind: 'list', section: EDU, title: 'شهادات الإنجاز', readOnly: true,
  sub: 'شهادات إتمام الدورات', noun: 'الشهادة',
  columns: [['id', '#', 'id'], ['course', 'الفصل', 'title'], ['student', 'طالب', 'person'], ['tutor', 'معلم', 'text'], ['date', 'التاريخ', 'date']],
  rows: [
    { id: 601, course: 'مستقبل الطاقة', student: 'سارة أحمد', tutor: 'ريهام محمد', date: '2026-11-14' },
    { id: 602, course: 'تصميم المواقع للمبتدئين', student: 'محمد خالد', tutor: 'آية محمد', date: '2026-11-09' },
  ],
};

PAGES['certificate-templates'] = {
  kind: 'list', section: EDU, title: 'قوالب الشهادات', sub: 'تصميم الشهادات اللي بتنطبع للطلاب',
  noun: 'القالب', addLabel: 'قالب جديد',
  statuses: ['active', 'inactive'],
  columns: [['title', 'العنوان', 'title'], ['type', 'النوع', 'pill', { options: ['اختبار', 'إتمام دورة'] }], ['fontSize', 'حجم الخط', 'number'], ['color', 'لون النص', 'color'], ['status', 'الحالة', 'status']],
  rows: [
    { id: 1, title: 'قالب شهادة الاختبار', type: 'اختبار', fontSize: 24, color: '#073747', status: 'active' },
    { id: 2, title: 'قالب إتمام الدورة', type: 'إتمام دورة', fontSize: 28, color: '#0b7186', status: 'active' },
    { id: 3, title: 'قالب قديم', type: 'اختبار', fontSize: 20, color: '#333333', status: 'inactive' },
  ],
};

// ---------- الواجبات (قريباً، زي اللوحة الحقيقية) ----------
PAGES['assignments'] = { kind: 'soon', section: EDU, title: 'الواجبات', sub: 'واجبات الطلاب وتصحيحها' };

// ---------- منتدى الدورة ----------
PAGES['course-forums'] = {
  kind: 'list', section: EDU, title: 'منتدى الدورة', readOnly: true,
  sub: 'أسئلة الطلاب داخل كل دورة', noun: 'المنتدى',
  stats: [['عدد المنتديات', 'count'], ['مجموع الأسئلة', { sum: 'questions' }]],
  columns: [['id', 'ID', 'id'], ['course', 'الفصل', 'title'], ['tutor', 'معلم', 'person'], ['questions', 'الأسئلة', 'number']],
  rows: [
    { id: 2010, course: 'New Update Features', tutor: 'ريهام محمد', questions: 4 },
    { id: 2008, course: 'صفحة تعلم جديدة', tutor: 'نرمين أحمد', questions: 2 },
    { id: 1998, course: 'مايكروسوفت إكسل', tutor: 'نرمين أحمد', questions: 7 },
  ],
};

// ---------- إشعارات الدورة ----------
PAGES['course-noticeboards'] = {
  kind: 'list', section: EDU, title: 'إشعارات الدورة', sub: 'رسائل للطلاب المسجلين بدورة معينة',
  noun: 'الإشعار', addLabel: 'إشعار جديد',
  columns: [['title', 'العنوان', 'title'], ['course', 'الفصل', 'text'], ['sender', 'المرسل', 'person', { ro: true }], ['message', 'الرسالة', 'long'], ['color', 'اللون', 'pill', { options: ['أزرق', 'أخضر', 'أصفر', 'أحمر'] }], ['created', 'التاريخ', 'date', { ro: true }]],
  newDefaults: { sender: 'مدير النظام', created: '2026-11-16' },
  rows: [
    { id: 1, title: 'تغيير موعد الجلسة', course: 'إدارة الوقت بفاعلية', sender: 'آية محمد', message: 'تم نقل جلسة الأحد للساعة 6 مساءً.', color: 'أصفر', created: '2026-11-15' },
    { id: 2, title: 'ملفات جديدة', course: 'مايكروسوفت إكسل', sender: 'نرمين أحمد', message: 'تم رفع ملفات التمارين للدرس الخامس.', color: 'أزرق', created: '2026-11-13' },
    { id: 3, title: 'تهنئة', course: 'مستقبل الطاقة', sender: 'ريهام محمد', message: 'مبروك لكل من أنهى الدورة!', color: 'أخضر', created: '2026-11-10' },
  ],
};

// ---------- التسجيل ----------
PAGES['enrollments'] = {
  kind: 'list', section: EDU, title: 'سجل التسجيل', sub: 'كل عمليات تسجيل الطلاب بالدورات',
  noun: 'التسجيل', actions: ['view', 'delete'], add: false,
  stats: [['عدد التسجيلات', 'count'], ['النشطة', { status: 'active' }]],
  statuses: ['active', 'inactive'],
  selects: [['type', 'النوع']],
  columns: [['id', '#', 'id'], ['student', 'طالب', 'person'], ['tutor', 'معلم', 'text'], ['item', 'العنصر', 'title'], ['type', 'النوع', 'pill'], ['date', 'التاريخ', 'date'], ['status', 'الحالة', 'status']],
  rows: [
    { id: 801, student: 'محمد خالد', tutor: 'نرمين أحمد', item: 'مايكروسوفت إكسل', type: 'فصل مباشر', date: '2026-11-15', status: 'active' },
    { id: 802, student: 'سارة أحمد', tutor: 'ريهام محمد', item: 'مستقبل الطاقة', type: 'فصل مسجل', date: '2026-11-14', status: 'active' },
    { id: 803, student: 'ليلى حسن', tutor: 'آية محمد', item: 'تصميم المواقع للمبتدئين', type: 'فصل مسجل', date: '2026-11-12', status: 'active' },
    { id: 804, student: 'نور محمد', tutor: 'سامي أحمد', item: 'تعلم AngularJS', type: 'فصل مباشر', date: '2026-11-08', status: 'inactive' },
    { id: 805, student: 'أحمد مصطفى', tutor: 'حنان محمود', item: 'حزمة القيادة والإدارة', type: 'حزمة', date: '2026-11-05', status: 'active' },
  ],
};

PAGES['enrollment-add'] = {
  kind: 'form', mode: 'send', section: EDU, title: 'أضف طالباً إلى مقرر',
  sub: 'تسجيل طالب يدوياً بدورة بدون دفع', submitLabel: 'إضافة الطالب', doneMessage: 'تمت إضافة الطالب إلى المقرر (تجريبي)',
  sections: [{ title: 'بيانات التسجيل', fields: [
    { name: 'course', label: 'الفصل', type: 'select', options: ['مايكروسوفت إكسل', 'مستقبل الطاقة', 'تصميم المواقع للمبتدئين', 'كن مدير منتج'] },
    { name: 'user', label: 'المستخدم', type: 'select', options: ['محمد خالد', 'سارة أحمد', 'ليلى حسن', 'أحمد مصطفى', 'نور محمد', 'عمر علي'] },
  ] }],
};

// ---------- الأقسام والفرز ----------
PAGES['categories'] = {
  kind: 'list', section: EDU, title: 'الأقسام', sub: 'تصنيفات الدورات',
  noun: 'القسم', addLabel: 'قسم جديد',
  stats: [['عدد الأقسام', 'count'], ['مجموع الفصول', { sum: 'classes' }]],
  columns: [['icon', 'الأيقونة', 'icon', { ro: true }], ['title', 'العنوان', 'title'], ['classes', 'الفصول', 'number'], ['tutors', 'المعلمين', 'number']],
  newDefaults: { icon: 'grid', classes: 0, tutors: 0 },
  rows: [
    { id: 1, icon: 'globe', title: 'لغة', classes: 3, tutors: 2 },
    { id: 2, icon: 'sparkles', title: 'أسلوب الحياة', classes: 2, tutors: 1 },
    { id: 3, icon: 'palette', title: 'تصميم', classes: 1, tutors: 1 },
    { id: 4, icon: 'sun', title: 'علم', classes: 1, tutors: 1 },
    { id: 5, icon: 'message', title: 'مجال الاتصالات', classes: 1, tutors: 1 },
    { id: 6, icon: 'chart', title: 'استراتيجية العمل', classes: 1, tutors: 1 },
  ],
};

PAGES['categories-trending'] = {
  kind: 'list', section: EDU, title: 'الأقسام الرائجة', sub: 'أقسام بتظهر مميزة على الصفحة الرئيسية',
  noun: 'القسم', addLabel: 'قسم رائج',
  columns: [['title', 'العنوان', 'title'], ['color', 'لون الخلفية', 'color']],
  rows: [
    { id: 1, title: 'لغة', color: '#0b7186' }, { id: 2, title: 'تصميم', color: '#ffcf24' },
    { id: 3, title: 'علم', color: '#a3d4d0' }, { id: 4, title: 'استراتيجية العمل', color: '#7760c8' },
  ],
};

PAGES['filters'] = {
  kind: 'list', section: EDU, title: 'خيارات الفرز', sub: 'فلاتر بيستعملها الطالب لتصفية الدورات',
  noun: 'الخيار', addLabel: 'خيار جديد',
  selects: [['category', 'القسم']],
  columns: [['title', 'العنوان', 'title'], ['category', 'القسم', 'pill']],
  rows: [
    { id: 1, title: 'المستوى', category: 'لغة' }, { id: 2, title: 'اللهجة', category: 'لغة' },
    { id: 3, title: 'الأداة المستخدمة', category: 'تصميم' }, { id: 4, title: 'المدة', category: 'أسلوب الحياة' },
    { id: 5, title: 'نوع المحتوى', category: 'علم' },
  ],
};

PAGES['reviews'] = {
  kind: 'list', section: EDU, title: 'المراجعات', sub: 'تقييمات الطلاب للدورات',
  noun: 'المراجعة', actions: ['view', 'edit', 'delete'], add: false,
  stats: [['كل المراجعات', 'count'], ['المنشورة', { status: 'published' }], ['بانتظار المراجعة', { status: 'pending' }]],
  statuses: ['published', 'pending'],
  columns: [['course', 'العنوان', 'title'], ['student', 'طالب', 'person'], ['comment', 'تعليق', 'long'], ['rate', 'التقييم (5)', 'rating'], ['created', 'التاريخ', 'date'], ['status', 'الحالة', 'status']],
  rows: [
    { id: 1, course: 'مستقبل الطاقة', student: 'سارة أحمد', comment: 'دورة ممتازة وشرح واضح.', rate: 5, created: '2026-11-14', status: 'published' },
    { id: 2, course: 'تصميم المواقع للمبتدئين', student: 'محمد خالد', comment: 'مفيدة جداً للمبتدئين.', rate: 4, created: '2026-11-12', status: 'published' },
    { id: 3, course: 'كن مدير منتج', student: 'ليلى حسن', comment: 'بتمنى أمثلة عملية أكثر.', rate: 3, created: '2026-11-10', status: 'pending' },
    { id: 4, course: 'New Update Features', student: 'نور محمد', comment: 'محتوى حديث ومنظم.', rate: 5, created: '2026-11-08', status: 'published' },
  ],
};
