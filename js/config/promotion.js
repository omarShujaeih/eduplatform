// =========================================================
// config/promotion.js — إعدادات صفحات قسم "التسويق"
// (أكواد الخصم، خصومات الفصول، الفصول الرائجة، الترويج، البانرات،
//  القائمة البريدية، التسويق بالعمولة، نموذج الإعلان)
// اسم الملف promotion.js عشان ما يتلخبط مع js/pages/marketing.js (لوحة التسويق)
// =========================================================

const MKT = 'التسويق';

PAGES['discount-codes'] = {
  kind: 'list', section: MKT, title: 'أكواد الخصم', sub: 'أكواد بيكتبها الطالب وقت الدفع',
  noun: 'الكود', addLabel: 'كود جديد',
  stats: [['عدد الأكواد', 'count'], ['النشطة', { status: 'active' }], ['مرات الاستخدام', { sum: 'uses' }]],
  statuses: ['active', 'expired'],
  selects: [['type', 'النوع']],
  columns: [['title', 'العنوان', 'title'], ['code', 'الكود', 'code'], ['type', 'النوع', 'pill', { options: ['نسبة مئوية', 'مبلغ ثابت'] }], ['percent', 'النسبة', 'percent'], ['maxAmount', 'أعلى قيمة', 'money'], ['minOrder', 'أقل طلب', 'money'], ['uses', 'مرات الاستخدام', 'number', { ro: true }], ['expires', 'تاريخ الانتهاء', 'date'], ['status', 'الحالة', 'status']],
  newDefaults: { uses: 0 },
  rows: [
    { id: 1, title: 'خصم الجمعة', code: 'FRIDAY20', type: 'نسبة مئوية', percent: 20, maxAmount: 30, minOrder: 10, uses: 14, expires: '2026-11-30', status: 'active' },
    { id: 2, title: 'ترحيب بالطلاب الجدد', code: 'WELCOME10', type: 'نسبة مئوية', percent: 10, maxAmount: 15, minOrder: 0, uses: 41, expires: '2026-12-31', status: 'active' },
    { id: 3, title: 'عرض الصيف', code: 'SUMMER5', type: 'مبلغ ثابت', percent: 0, maxAmount: 5, minOrder: 20, uses: 9, expires: '2026-08-31', status: 'expired' },
  ],
};

PAGES['special-offers'] = {
  kind: 'list', section: MKT, title: 'خصومات الفصول', sub: 'خصم تلقائي على فصل معين لفترة',
  noun: 'الخصم', addLabel: 'خصم جديد',
  statuses: ['active', 'expired'],
  columns: [['title', 'العنوان', 'title'], ['course', 'الفصل', 'text'], ['percent', 'النسبة', 'percent'], ['from', 'من تاريخ', 'date'], ['to', 'إلى تاريخ', 'date'], ['status', 'الحالة', 'status']],
  rows: [
    { id: 1, title: 'خصم إكسل', course: 'مايكروسوفت إكسل', percent: 25, from: '2026-11-15', to: '2026-11-25', status: 'active' },
    { id: 2, title: 'عرض الطاقة', course: 'مستقبل الطاقة', percent: 15, from: '2026-11-01', to: '2026-12-01', status: 'active' },
    { id: 3, title: 'خصم قديم', course: 'تعلم AngularJS', percent: 40, from: '2026-06-01', to: '2026-06-30', status: 'expired' },
    { id: 4, title: 'عرض المبتدئين', course: 'تصميم المواقع للمبتدئين', percent: 10, from: '2026-11-10', to: '2026-11-20', status: 'active' },
  ],
};

PAGES['featured-classes'] = {
  kind: 'list', section: MKT, title: 'الفصول الرائجة', sub: 'فصول بتظهر مميزة بأماكن معينة بالموقع',
  noun: 'الفصل', addLabel: 'فصل رائج جديد',
  statuses: ['published', 'pending'],
  selects: [['page', 'الصفحة']],
  columns: [['course', 'عنوان الفصل', 'title'], ['tutor', 'معلم', 'person'], ['category', 'الفئة', 'pill'], ['page', 'الصفحة', 'pill', { options: ['الرئيسية', 'الدورات', 'الرئيسية والدورات'] }], ['date', 'التاريخ', 'date', { ro: true }], ['status', 'الحالة', 'status']],
  newDefaults: { date: '2026-11-16' },
  rows: [
    { id: 1, course: 'مايكروسوفت إكسل', tutor: 'نرمين أحمد', category: 'استراتيجية العمل', page: 'الرئيسية', date: '2026-11-10', status: 'published' },
    { id: 2, course: 'مستقبل الطاقة', tutor: 'ريهام محمد', category: 'علم', page: 'الرئيسية والدورات', date: '2026-11-08', status: 'published' },
    { id: 3, course: 'كن مدير منتج', tutor: 'حنان محمود', category: 'استراتيجية العمل', page: 'الدورات', date: '2026-11-02', status: 'pending' },
  ],
};

PAGES['promotions'] = {
  kind: 'list', section: MKT, title: 'خطط الترويج', sub: 'خطط بيشتريها المعلم ليظهر فصله أول',
  noun: 'الخطة', addLabel: 'خطة جديدة',
  columns: [['title', 'العنوان', 'title'], ['price', 'السعر', 'money'], ['days', 'أيام', 'number'], ['sales', 'المبيعات', 'number', { ro: true }], ['popular', 'شارة رائجة', 'bool'], ['description', 'الوصف', 'long']],
  newDefaults: { sales: 0 },
  rows: [
    { id: 1, title: 'ترويج أسبوعي', price: 10, days: 7, sales: 5, popular: false, description: 'ظهور بأعلى صفحة الدورات لمدة أسبوع.' },
    { id: 2, title: 'ترويج شهري', price: 30, days: 30, sales: 3, popular: true, description: 'ظهور بالرئيسية وصفحة الدورات.' },
    { id: 3, title: 'ترويج مميز', price: 75, days: 90, sales: 1, popular: false, description: 'أفضل مكان بالموقع لثلاث شهور.' },
  ],
};

PAGES['promotion-sales'] = {
  kind: 'list', section: MKT, title: 'مبيعات الترويج', readOnly: true, sub: 'مين اشترى خطة ترويج ولأي فصل',
  noun: 'العملية',
  columns: [['plan', 'الخطة', 'title'], ['user', 'المعلم', 'person'], ['course', 'الفصل', 'text'], ['date', 'التاريخ', 'date']],
  rows: [
    { id: 1, plan: 'ترويج شهري', user: 'نرمين أحمد', course: 'مايكروسوفت إكسل', date: '2026-11-10' },
    { id: 2, plan: 'ترويج أسبوعي', user: 'ريهام محمد', course: 'مستقبل الطاقة', date: '2026-11-08' },
  ],
};

PAGES['ad-banners'] = {
  kind: 'list', section: MKT, title: 'بانرات الإعلان', sub: 'صور إعلانية بأماكن مختلفة بالموقع',
  noun: 'البانر', addLabel: 'بانر جديد',
  selects: [['position', 'الموضع']],
  columns: [['title', 'العنوان', 'title'], ['position', 'الموضع', 'pill', { options: ['الرئيسية - أعلى', 'الرئيسية - وسط', 'صفحة الدورة', 'المدونة'] }], ['size', 'الحجم', 'pill', { options: ['كامل', 'نصف', 'ثلث'] }], ['link', 'الرابط', 'ltr'], ['published', 'منشور', 'bool'], ['created', 'التاريخ', 'date', { ro: true }]],
  newDefaults: { created: '2026-11-16' },
  rows: [
    { id: 1, title: 'عرض الجمعة البيضاء', position: 'الرئيسية - أعلى', size: 'كامل', link: '/classes?sale=1', published: true, created: '2026-11-14' },
    { id: 2, title: 'كن معلماً', position: 'الرئيسية - وسط', size: 'نصف', link: '/become-instructor', published: true, created: '2026-10-30' },
    { id: 3, title: 'تطبيق الجوال', position: 'صفحة الدورة', size: 'ثلث', link: '/app', published: false, created: '2026-10-12' },
  ],
};

PAGES['newsletters'] = {
  kind: 'list', section: MKT, title: 'مشتركو القائمة البريدية', sub: 'إيميلات الزوار المشتركين بالأخبار',
  noun: 'المشترك', addLabel: 'مشترك جديد',
  stats: [['عدد المشتركين', 'count']],
  columns: [['email', 'الإيميل', 'ltr', { email: true }], ['created', 'تاريخ الاشتراك', 'date', { ro: true }]],
  newDefaults: { created: '2026-11-16' },
  rows: [
    { id: 1, email: 'reader1@example.test', created: '2026-11-15' }, { id: 2, email: 'reader2@example.test', created: '2026-11-11' },
    { id: 3, email: 'reader3@example.test', created: '2026-11-04' }, { id: 4, email: 'reader4@example.test', created: '2026-10-29' },
  ],
};

PAGES['newsletter-send'] = {
  kind: 'form', mode: 'send', section: MKT, title: 'إرسال رسالة إخبارية', sub: 'رسالة لكل المشتركين بالقائمة البريدية',
  submitLabel: 'إرسال الرسالة', doneMessage: 'تم إرسال الرسالة (تجريبي، ما انبعث شي فعلياً)',
  sections: [{ title: 'الرسالة', fields: [
    { name: 'title', label: 'العنوان', required: true, wide: true },
    { name: 'method', label: 'طريقة الإرسال', type: 'select', options: ['كل المشتركين', 'إيميلات محددة (BCC)', 'ملف Excel'] },
    { name: 'bcc', label: 'الإيميلات (BCC)', placeholder: 'a@example.test, b@example.test' },
    { name: 'description', label: 'نص الرسالة', type: 'textarea' },
  ] }],
  note: 'نسخة Front-end: زر الإرسال ما بيبعت إيميلات حقيقية.',
};

PAGES['newsletter-history'] = {
  kind: 'list', section: MKT, title: 'سجل الرسائل الإخبارية', readOnly: true, sub: 'الرسائل اللي انبعتت قبل',
  noun: 'الرسالة',
  columns: [['title', 'العنوان', 'title'], ['method', 'طريقة الإرسال', 'pill'], ['recipients', 'عدد المستلمين', 'number'], ['created', 'التاريخ', 'date']],
  rows: [
    { id: 1, title: 'دورات نوفمبر الجديدة', method: 'كل المشتركين', recipients: 4, created: '2026-11-02' },
    { id: 2, title: 'خصم العودة للدراسة', method: 'كل المشتركين', recipients: 3, created: '2026-09-01' },
  ],
};

PAGES['referrals'] = {
  kind: 'list', section: MKT, title: 'سجل التسويق بالعمولة', readOnly: true, sub: 'مين دعا مين، وكم أخذ عمولة',
  noun: 'العملية',
  stats: [['المستخدمون المدعوون', 'count'], ['إجمالي العمولات', { sum: 'commission' }]],
  columns: [['affiliate', 'المسوّق', 'person'], ['referred', 'المستخدم المدعو', 'text'], ['bonus', 'مكافأة التسجيل', 'money'], ['commission', 'العمولة', 'money'], ['date', 'التاريخ', 'date']],
  rows: [
    { id: 1, affiliate: 'سارة أحمد', referred: 'رنا يوسف', bonus: 2, commission: 3.5, date: '2026-11-12' },
    { id: 2, affiliate: 'محمد خالد', referred: 'سامر عادل', bonus: 2, commission: 6, date: '2026-11-05' },
    { id: 3, affiliate: 'سارة أحمد', referred: 'هالة ناصر', bonus: 2, commission: 0, date: '2026-10-28' },
  ],
};

PAGES['affiliate-users'] = {
  kind: 'list', section: MKT, title: 'المسوّقون بالعمولة', sub: 'مستخدمون عندهم كود دعوة',
  noun: 'المسوّق', actions: ['view', 'edit'], add: false,
  statuses: ['active', 'inactive'],
  columns: [['user', 'مستخدم', 'person'], ['role', 'الدور', 'pill'], ['code', 'كود الدعوة', 'code'], ['income', 'دخل التسجيل', 'money'], ['commission', 'عمولة المبيعات', 'money'], ['status', 'الحالة', 'status']],
  rows: [
    { id: 1, user: 'سارة أحمد', role: 'طالب', code: 'SARA-8821', income: 4, commission: 3.5, status: 'active' },
    { id: 2, user: 'محمد خالد', role: 'طالب', code: 'MK-1190', income: 2, commission: 6, status: 'active' },
    { id: 3, user: 'نرمين أحمد', role: 'معلم', code: 'NRM-0042', income: 0, commission: 0, status: 'inactive' },
  ],
};

PAGES['ad-modal'] = {
  kind: 'form', section: MKT, title: 'نموذج الإعلان', sub: 'نافذة إعلانية بتظهر للزوار أول ما يفتحوا الموقع',
  sections: [
    { title: 'المحتوى', fields: [
      { name: 'active', label: 'تفعيل النافذة', type: 'switch', value: false },
      { name: 'title', label: 'العنوان', value: 'خصم 20% لفترة محدودة!' },
      { name: 'image', label: 'الصورة', type: 'file' },
      { name: 'description', label: 'الوصف', type: 'textarea', value: 'استعمل كود FRIDAY20 على أي دورة.' },
    ] },
    { title: 'الأزرار', fields: [
      { name: 'button1', label: 'نص الزر الأول', value: 'تصفح الدورات' },
      { name: 'link1', label: 'رابط الزر الأول', type: 'url', value: 'https://example.test/classes' },
      { name: 'button2', label: 'نص الزر الثاني', value: 'لاحقاً' },
      { name: 'link2', label: 'رابط الزر الثاني', type: 'url', value: '' },
    ] },
  ],
};
