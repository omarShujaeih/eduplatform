// =========================================================
// config/content.js — إعدادات صفحات قسم "المحتوى"
// (المتجر، المدونة، الصفحات، الصفحات الإضافية، التوصيات، المواقع الجغرافية)
// =========================================================

const CONTENT = 'المحتوى';

// ---------- المتجر: المنتجات (صفحتين بنفس الشكل) ----------
const productsPage = (title, rows) => ({
  kind: 'list', section: CONTENT, title, sub: 'منتجات مادية (كتب، أدوات) وافتراضية (ملفات)',
  noun: 'المنتج', addLabel: 'منتج جديد',
  stats: [['المنتجات', 'count'], ['المادية', { where: ['type', 'مادي'] }], ['الافتراضية', { where: ['type', 'افتراضي'] }], ['إجمالي المبيعات', { sum: 'sales' }]],
  statuses: ['active', 'pending', 'inactive'],
  selects: [['type', 'النوع']],
  columns: [['id', 'ID', 'id'], ['title', 'العنوان', 'title'], ['creator', 'البائع', 'person'], ['type', 'النوع', 'pill', { options: ['مادي', 'افتراضي'] }], ['stock', 'المخزون', 'number'], ['price', 'السعر', 'money'], ['freeShipping', 'توصيل مجاني', 'bool'], ['sales', 'مبيعات', 'number', { ro: true }], ['status', 'الحالة', 'status']],
  newDefaults: { sales: 0 },
  rows,
});

PAGES['store-products'] = productsPage('منتجات المتجر', [
  { id: 101, title: 'كتاب أساسيات البرمجة', creator: 'سامي أحمد', type: 'مادي', stock: 25, price: 18, freeShipping: false, sales: 7, status: 'active' },
  { id: 102, title: 'قوالب تصميم جاهزة', creator: 'آية محمد', type: 'افتراضي', stock: 999, price: 12, freeShipping: true, sales: 15, status: 'active' },
  { id: 103, title: 'دفتر تمارين الإنجليزي', creator: 'نرمين أحمد', type: 'مادي', stock: 0, price: 9, freeShipping: false, sales: 22, status: 'inactive' },
  { id: 104, title: 'ملف تلخيص الإدارة', creator: 'حنان محمود', type: 'افتراضي', stock: 999, price: 5, freeShipping: true, sales: 3, status: 'pending' },
]);
PAGES['store-inhouse-products'] = productsPage('المنتجات الداخلية', [
  { id: 201, title: 'حقيبة المنصة', creator: 'مدير النظام', type: 'مادي', stock: 40, price: 15, freeShipping: false, sales: 6, status: 'active' },
  { id: 202, title: 'دليل الطالب PDF', creator: 'مدير النظام', type: 'افتراضي', stock: 999, price: 0, freeShipping: true, sales: 31, status: 'active' },
]);

// ---------- المتجر: الطلبات ----------
const storeOrders = (title, rows) => ({
  kind: 'list', section: CONTENT, title, sub: 'طلبات الشراء من المتجر',
  noun: 'الطلب', actions: ['view', 'edit'], add: false,
  stats: [['مجموع الطلبات', 'count'], ['المكتملة', { status: 'completed' }], ['المنتظرة', { status: 'pending' }], ['الملغية', { status: 'canceled' }]],
  statuses: ['pending', 'shipped', 'completed', 'canceled'],
  columns: [['id', '#', 'id'], ['customer', 'الزبون', 'person'], ['seller', 'البائع', 'text'], ['quantity', 'الكمية', 'number'], ['amount', 'المبلغ', 'money'], ['discount', 'الخصم', 'money'], ['date', 'التاريخ', 'date'], ['status', 'الحالة', 'status']],
  rows,
});
PAGES['store-orders'] = storeOrders('طلبات المتجر', [
  { id: 3001, customer: 'محمد خالد', seller: 'سامي أحمد', quantity: 1, amount: 18, discount: 0, date: '2026-11-15', status: 'shipped' },
  { id: 3002, customer: 'سارة أحمد', seller: 'آية محمد', quantity: 2, amount: 24, discount: 4, date: '2026-11-14', status: 'completed' },
  { id: 3003, customer: 'ليلى حسن', seller: 'نرمين أحمد', quantity: 1, amount: 9, discount: 0, date: '2026-11-12', status: 'pending' },
  { id: 3004, customer: 'عمر علي', seller: 'سامي أحمد', quantity: 1, amount: 18, discount: 0, date: '2026-11-06', status: 'canceled' },
]);
PAGES['store-inhouse-orders'] = storeOrders('الطلبات الداخلية', [
  { id: 4001, customer: 'نور محمد', seller: 'المنصة', quantity: 1, amount: 15, discount: 0, date: '2026-11-13', status: 'completed' },
  { id: 4002, customer: 'أحمد مصطفى', seller: 'المنصة', quantity: 3, amount: 45, discount: 5, date: '2026-11-09', status: 'pending' },
]);

PAGES['store-sellers'] = {
  kind: 'list', section: CONTENT, title: 'البائعون', readOnly: true, sub: 'المعلمون والبوابات اللي بيبيعوا بالمتجر',
  noun: 'البائع',
  columns: [['id', 'ID', 'id'], ['name', 'الاسم', 'person'], ['physical', 'منتجات مادية', 'number'], ['virtual', 'منتجات افتراضية', 'number'], ['sales', 'إجمالي المبيعات', 'money'], ['pendingOrders', 'طلبات منتظرة', 'number']],
  rows: [
    { id: 3, name: 'سامي أحمد', physical: 1, virtual: 0, sales: 126, pendingOrders: 0 },
    { id: 934, name: 'آية محمد', physical: 0, virtual: 1, sales: 180, pendingOrders: 0 },
    { id: 1015, name: 'نرمين أحمد', physical: 1, virtual: 0, sales: 198, pendingOrders: 1 },
  ],
};

PAGES['store-categories'] = {
  kind: 'list', section: CONTENT, title: 'أقسام المتجر', sub: 'تصنيفات المنتجات',
  noun: 'القسم', addLabel: 'قسم جديد',
  columns: [['icon', 'الأيقونة', 'icon', { ro: true }], ['title', 'العنوان', 'title'], ['physical', 'منتجات مادية', 'number', { ro: true }], ['virtual', 'منتجات افتراضية', 'number', { ro: true }]],
  newDefaults: { icon: 'bag', physical: 0, virtual: 0 },
  rows: [
    { id: 1, icon: 'book', title: 'كتب', physical: 2, virtual: 0 },
    { id: 2, icon: 'file', title: 'ملفات وقوالب', physical: 0, virtual: 2 },
    { id: 3, icon: 'bag', title: 'أدوات', physical: 1, virtual: 0 },
    { id: 4, icon: 'gift', title: 'هدايا', physical: 0, virtual: 0 },
  ],
};

PAGES['store-filters'] = {
  kind: 'list', section: CONTENT, title: 'فلاتر المتجر', sub: 'خيارات تصفية المنتجات',
  noun: 'الفلتر', addLabel: 'فلتر جديد',
  columns: [['title', 'العنوان', 'title'], ['category', 'القسم', 'pill']],
  rows: [{ id: 1, title: 'اللغة', category: 'كتب' }, { id: 2, title: 'الصيغة', category: 'ملفات وقوالب' }, { id: 3, title: 'المقاس', category: 'أدوات' }],
};

PAGES['store-specifications'] = {
  kind: 'list', section: CONTENT, title: 'خصائص المنتجات', sub: 'مواصفات بتظهر بصفحة المنتج',
  noun: 'الخاصية', addLabel: 'خاصية جديدة',
  columns: [['title', 'العنوان', 'title'], ['type', 'النوع', 'pill', { options: ['نص', 'خيارات متعددة'] }], ['categories', 'الأقسام', 'text']],
  rows: [
    { id: 1, title: 'عدد الصفحات', type: 'نص', categories: 'كتب' },
    { id: 2, title: 'الوزن', type: 'نص', categories: 'كتب، أدوات' },
    { id: 3, title: 'اللون', type: 'خيارات متعددة', categories: 'أدوات' },
    { id: 4, title: 'حجم الملف', type: 'نص', categories: 'ملفات وقوالب' },
  ],
};

PAGES['store-discounts'] = {
  kind: 'list', section: CONTENT, title: 'تخفيضات المتجر', sub: 'خصم لفترة على منتج معين',
  noun: 'التخفيض', addLabel: 'تخفيض جديد',
  statuses: ['active', 'expired'],
  columns: [['title', 'العنوان', 'title'], ['product', 'المنتج', 'text'], ['percent', 'النسبة', 'percent'], ['from', 'من', 'date'], ['to', 'إلى', 'date'], ['uses', 'مرات الاستخدام', 'number', { ro: true }], ['status', 'الحالة', 'status']],
  newDefaults: { uses: 0 },
  rows: [
    { id: 1, title: 'خصم الكتب', product: 'كتاب أساسيات البرمجة', percent: 15, from: '2026-11-10', to: '2026-11-30', uses: 3, status: 'active' },
    { id: 2, title: 'عرض الصيف', product: 'قوالب تصميم جاهزة', percent: 30, from: '2026-07-01', to: '2026-08-31', uses: 11, status: 'expired' },
  ],
};

PAGES['store-reviews'] = {
  kind: 'list', section: CONTENT, title: 'مراجعات المنتجات', sub: 'تقييمات الزبائن للمنتجات',
  noun: 'المراجعة', actions: ['view', 'edit', 'delete'], add: false,
  stats: [['كل المراجعات', 'count'], ['المنشورة', { status: 'published' }]],
  statuses: ['published', 'pending'],
  columns: [['product', 'المنتج', 'title'], ['customer', 'الزبون', 'person'], ['comment', 'تعليق', 'long'], ['rate', 'التقييم (5)', 'rating'], ['created', 'التاريخ', 'date'], ['status', 'الحالة', 'status']],
  rows: [
    { id: 1, product: 'قوالب تصميم جاهزة', customer: 'سارة أحمد', comment: 'قوالب مرتبة وسهلة التعديل.', rate: 5, created: '2026-11-14', status: 'published' },
    { id: 2, product: 'كتاب أساسيات البرمجة', customer: 'محمد خالد', comment: 'الكتاب وصل متأخر بس ممتاز.', rate: 4, created: '2026-11-11', status: 'pending' },
  ],
};

PAGES['store-settings'] = {
  kind: 'form', section: CONTENT, title: 'إعدادات المتجر', sub: 'عمولات وضرائب وخيارات المتجر',
  sections: [
    { title: 'التفعيل', fields: [
      { name: 'active', label: 'تفعيل المتجر', type: 'switch', value: true },
      { name: 'virtualProducts', label: 'السماح بمنتجات افتراضية', type: 'switch', value: true },
      { name: 'physicalProducts', label: 'السماح بمنتجات مادية', type: 'switch', value: true },
      { name: 'comments', label: 'تفعيل التعليقات على المنتجات', type: 'switch', value: true },
    ] },
    { title: 'العمولات والضرائب', fields: [
      { name: 'virtualCommission', label: 'عمولة المنتجات الافتراضية (%)', type: 'number', value: 10 },
      { name: 'physicalCommission', label: 'عمولة المنتجات المادية (%)', type: 'number', value: 8 },
      { name: 'tax', label: 'الضريبة (%)', type: 'number', value: 16 },
      { name: 'trackingUrl', label: 'رابط تتبع الشحن', type: 'url', value: 'https://example.test/track' },
    ] },
  ],
};

// ---------- المدونة ----------
PAGES['blog'] = {
  kind: 'list', section: CONTENT, title: 'منشورات المدونة', sub: 'مقالات تعليمية وأخبار المنصة',
  noun: 'المنشور', addLabel: 'منشور جديد',
  statuses: ['published', 'draft'],
  selects: [['category', 'القسم']],
  columns: [['title', 'العنوان', 'title'], ['category', 'القسم', 'pill', { options: ['نصائح', 'أخبار', 'تقنية'] }], ['author', 'الناشر', 'person'], ['comments', 'التعليقات', 'number', { ro: true }], ['date', 'التاريخ', 'date', { ro: true }], ['status', 'الحالة', 'status']],
  newDefaults: { comments: 0, date: '2026-11-16' },
  rows: [
    { id: 1, title: '5 نصائح للتعلم عن بعد', category: 'نصائح', author: 'نرمين أحمد', comments: 3, date: '2026-11-12', status: 'published' },
    { id: 2, title: 'مستقبل التعليم الرقمي', category: 'تقنية', author: 'ريهام محمد', comments: 1, date: '2026-11-05', status: 'published' },
    { id: 3, title: 'إطلاق ميزة البث المباشر', category: 'أخبار', author: 'مدير النظام', comments: 0, date: '2026-10-28', status: 'published' },
    { id: 4, title: 'كيف تكتب سيرة ذاتية قوية', category: 'نصائح', author: 'حنان محمود', comments: 0, date: '2026-11-15', status: 'draft' },
  ],
};

PAGES['blog-categories'] = {
  kind: 'list', section: CONTENT, title: 'أقسام المدونة', sub: 'تصنيفات المقالات',
  noun: 'القسم', addLabel: 'قسم جديد',
  columns: [['title', 'العنوان', 'title'], ['posts', 'المنشورات', 'number', { ro: true }]],
  newDefaults: { posts: 0 },
  rows: [{ id: 1, title: 'نصائح', posts: 2 }, { id: 2, title: 'أخبار', posts: 1 }, { id: 3, title: 'تقنية', posts: 1 }],
};

// ---------- الصفحات ----------
PAGES['pages'] = {
  kind: 'list', section: CONTENT, title: 'الصفحات', sub: 'صفحات ثابتة (من نحن، الشروط...)',
  noun: 'الصفحة', addLabel: 'صفحة جديدة',
  statuses: ['published', 'draft'],
  columns: [['name', 'الاسم', 'title'], ['link', 'الرابط', 'ltr'], ['robot', 'فهرسة محركات البحث', 'bool'], ['created', 'التاريخ', 'date', { ro: true }], ['status', 'الحالة', 'status']],
  newDefaults: { created: '2026-11-16' },
  rows: [
    { id: 1, name: 'من نحن', link: '/pages/about', robot: true, created: '2025-01-05', status: 'published' },
    { id: 2, name: 'الشروط والأحكام', link: '/pages/terms', robot: true, created: '2025-01-05', status: 'published' },
    { id: 3, name: 'سياسة الخصوصية', link: '/pages/privacy', robot: true, created: '2025-01-05', status: 'published' },
    { id: 4, name: 'الأسئلة الشائعة', link: '/pages/faq', robot: true, created: '2025-03-12', status: 'published' },
    { id: 5, name: 'صفحة الوظائف', link: '/pages/careers', robot: false, created: '2026-11-01', status: 'draft' },
  ],
};

// ---------- صفحات إضافية ----------
PAGES['page-404'] = {
  kind: 'form', section: CONTENT, title: 'صفحة 404', sub: 'الصفحة اللي بتظهر لما الرابط غلط',
  sections: [{ title: 'المحتوى', fields: [
    { name: 'title', label: 'عنوان الخطأ', value: 'الصفحة غير موجودة' },
    { name: 'image', label: 'الصورة', type: 'file' },
    { name: 'description', label: 'وصف الخطأ', type: 'textarea', value: 'يبدو أن الرابط غير صحيح أو أن الصفحة انحذفت.' },
  ] }],
};

PAGES['page-contact'] = {
  kind: 'form', section: CONTENT, title: 'صفحة الاتصال', sub: 'معلومات التواصل والخريطة',
  sections: [
    { title: 'معلومات التواصل', fields: [
      { name: 'phones', label: 'أرقام الموبايل', value: '0590000000' },
      { name: 'emails', label: 'الإيميلات', type: 'email', value: 'support@example.test' },
      { name: 'address', label: 'العنوان', type: 'textarea', value: 'رام الله، فلسطين' },
    ] },
    { title: 'الخريطة', fields: [
      { name: 'map', label: 'الموقع (خط العرض، خط الطول)', value: '31.9038, 35.2034' },
      { name: 'zoom', label: 'مستوى التكبير (15 - 19)', type: 'number', value: 16 },
      { name: 'background', label: 'خلفية الصفحة', type: 'file' },
    ] },
  ],
};

// باللوحة الحقيقية 4 تبويبات (عمود لكل تبويب). هون 4 كروت تحت بعض
PAGES['page-footer'] = {
  kind: 'form', section: CONTENT, title: 'التذييل', sub: 'محتوى أعمدة أسفل الموقع',
  sections: [1, 2, 3, 4].map((n) => ({
    title: `العمود ${['الأول', 'الثاني', 'الثالث', 'الرابع'][n - 1]}`,
    fields: [
      { name: `col${n}Title`, label: 'العنوان', value: ['عن المنصة', 'روابط سريعة', 'المساعدة', 'تواصل معنا'][n - 1] },
      { name: `col${n}Content`, label: 'المحتوى', type: 'textarea', value: '' },
    ],
  })),
};

PAGES['page-navbar-links'] = {
  kind: 'list', section: CONTENT, title: 'روابط أعلى الشريط', sub: 'روابط صغيرة فوق شريط التنقل',
  noun: 'الرابط', addLabel: 'رابط جديد',
  columns: [['title', 'العنوان', 'title'], ['link', 'الرابط', 'ltr'], ['order', 'الترتيب', 'number']],
  rows: [
    { id: 1, title: 'كن معلماً', link: '/become-instructor', order: 1 },
    { id: 2, title: 'المساعدة', link: '/pages/faq', order: 2 },
    { id: 3, title: 'المتجر', link: '/products', order: 3 },
  ],
};

// ---------- التوصيات ----------
PAGES['testimonials'] = {
  kind: 'list', section: CONTENT, title: 'التوصيات', sub: 'آراء الطلاب على الصفحة الرئيسية',
  noun: 'التوصية', addLabel: 'توصية جديدة',
  statuses: ['active', 'inactive'],
  columns: [['user', 'اسم المستخدم', 'person'], ['job', 'الوظيفة', 'text'], ['rate', 'التقييم', 'rating'], ['comment', 'التعليق', 'long'], ['created', 'التاريخ', 'date', { ro: true }], ['status', 'الحالة', 'status']],
  newDefaults: { created: '2026-11-16' },
  rows: [
    { id: 1, user: 'سارة أحمد', job: 'طالبة جامعية', rate: 5, comment: 'غيّرت طريقة دراستي بالكامل.', created: '2026-10-02', status: 'active' },
    { id: 2, user: 'محمد خالد', job: 'مطوّر ويب', rate: 5, comment: 'أفضل منصة لتعلم البرمجة بالعربي.', created: '2026-09-15', status: 'active' },
    { id: 3, user: 'ليلى حسن', job: 'مصممة', rate: 4, comment: 'الجلسات المباشرة مفيدة جداً.', created: '2026-08-21', status: 'active' },
    { id: 4, user: 'عمر علي', job: 'موظف', rate: 4, comment: 'دورات قصيرة ومركزة.', created: '2026-07-30', status: 'inactive' },
  ],
};

// ---------- المواقع الجغرافية ----------
PAGES['countries'] = {
  kind: 'list', section: CONTENT, title: 'الدول', sub: 'لتحديد موقع المعلمين والطلاب',
  noun: 'الدولة', addLabel: 'دولة جديدة',
  columns: [['title', 'العنوان', 'title'], ['provinces', 'الأقاليم', 'number', { ro: true }], ['tutors', 'المعلمون', 'number', { ro: true }]],
  newDefaults: { provinces: 0, tutors: 0 },
  rows: [{ id: 1, title: 'فلسطين', provinces: 3, tutors: 5 }, { id: 2, title: 'الأردن', provinces: 2, tutors: 1 }],
};

PAGES['provinces'] = {
  kind: 'list', section: CONTENT, title: 'الأقاليم', sub: 'المحافظات داخل كل دولة',
  noun: 'الإقليم', addLabel: 'إقليم جديد',
  selects: [['country', 'الدولة']],
  columns: [['title', 'العنوان', 'title'], ['country', 'الدولة', 'pill'], ['cities', 'المدن', 'number', { ro: true }]],
  newDefaults: { cities: 0 },
  rows: [
    { id: 1, title: 'الضفة الغربية', country: 'فلسطين', cities: 6 }, { id: 2, title: 'قطاع غزة', country: 'فلسطين', cities: 3 },
    { id: 3, title: 'القدس', country: 'فلسطين', cities: 1 }, { id: 4, title: 'عمّان', country: 'الأردن', cities: 2 },
  ],
};

PAGES['cities'] = {
  kind: 'list', section: CONTENT, title: 'المدن', sub: 'المدن داخل كل إقليم',
  noun: 'المدينة', addLabel: 'مدينة جديدة',
  selects: [['province', 'الإقليم']],
  columns: [['title', 'العنوان', 'title'], ['country', 'الدولة', 'pill'], ['province', 'الإقليم', 'text']],
  rows: [
    { id: 1, title: 'رام الله', country: 'فلسطين', province: 'الضفة الغربية' }, { id: 2, title: 'نابلس', country: 'فلسطين', province: 'الضفة الغربية' },
    { id: 3, title: 'الخليل', country: 'فلسطين', province: 'الضفة الغربية' }, { id: 4, title: 'بيت لحم', country: 'فلسطين', province: 'الضفة الغربية' },
    { id: 5, title: 'جنين', country: 'فلسطين', province: 'الضفة الغربية' }, { id: 6, title: 'طولكرم', country: 'فلسطين', province: 'الضفة الغربية' },
    { id: 7, title: 'غزة', country: 'فلسطين', province: 'قطاع غزة' }, { id: 8, title: 'القدس', country: 'فلسطين', province: 'القدس' },
  ],
};

PAGES['districts'] = {
  kind: 'list', section: CONTENT, title: 'المناطق', sub: 'الأحياء والمناطق داخل كل مدينة',
  noun: 'المنطقة', addLabel: 'منطقة جديدة',
  selects: [['city', 'المدينة']],
  columns: [['title', 'العنوان', 'title'], ['country', 'الدولة', 'pill'], ['city', 'المدينة', 'text']],
  rows: [
    { id: 1, title: 'الماصيون', country: 'فلسطين', city: 'رام الله' }, { id: 2, title: 'الطيرة', country: 'فلسطين', city: 'رام الله' },
    { id: 3, title: 'رفيديا', country: 'فلسطين', city: 'نابلس' }, { id: 4, title: 'عين سارة', country: 'فلسطين', city: 'الخليل' },
  ],
};
