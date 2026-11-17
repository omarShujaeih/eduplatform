// =========================================================
// config/users.js — إعدادات صفحات "اجتماع" و"المستخدمين" و"المنتدى"
// (الطلاب والمعلمون والجلسات صفحات موجودة من قبل: students / tutors / bookings)
// =========================================================

const USERS = 'المستخدمين';

// ---------- المستشارون (اجتماع) ----------
PAGES['consultants'] = {
  kind: 'list', section: 'اجتماع', title: 'المستشارون', sub: 'معلمون متاحون لحجز جلسات خاصة',
  noun: 'المستشار', actions: ['view', 'edit'], add: false,
  stats: [['الإجمالي', 'count'], ['المتاحون', { where: ['available', true] }], ['غير المتاحين', { where: ['available', false] }]],
  statuses: ['active', 'inactive'],
  columns: [['id', 'ID', 'id'], ['name', 'الاسم', 'person'], ['sessions', 'مبيعات الجلسات', 'number'], ['pending', 'اجتماعات معلقة', 'number'], ['balance', 'رصيد الحساب', 'money'], ['available', 'متاح للحجز', 'bool'], ['status', 'الحالة', 'status']],
  rows: [
    { id: 1015, name: 'نرمين أحمد', sessions: 3, pending: 1, balance: 1127.5, available: true, status: 'active' },
    { id: 934, name: 'آية محمد', sessions: 1, pending: 0, balance: 110, available: true, status: 'active' },
    { id: 929, name: 'ريهام محمد', sessions: 0, pending: 0, balance: 0, available: false, status: 'active' },
    { id: 3, name: 'سامي أحمد', sessions: 0, pending: 0, balance: 17.6, available: false, status: 'inactive' },
  ],
};

// ---------- طاقم العمل (و"مستخدم جديد" بيفتح نموذج الإضافة هون) ----------
PAGES['staff'] = {
  kind: 'list', section: USERS, title: 'طاقم العمل', sub: 'حسابات الإدارة والموظفين',
  noun: 'المستخدم', addLabel: 'مستخدم جديد',
  statuses: ['active', 'inactive'],
  selects: [['role', 'الدور']],
  columns: [['id', 'ID', 'id'], ['name', 'الاسم', 'person'], ['email', 'البريد', 'ltr', { email: true }], ['role', 'دور المستخدم', 'pill', { options: ['مدير', 'مشرف محتوى', 'دعم فني', 'محاسب'] }], ['joined', 'تاريخ التسجيل', 'date', { ro: true }], ['status', 'الحالة', 'status']],
  newDefaults: { joined: '2026-11-16' },
  rows: [
    { id: 1, name: 'مدير النظام', email: 'admin@example.test', role: 'مدير', joined: '2025-01-10', status: 'active' },
    { id: 2, name: 'هبة يوسف', email: 'heba@example.test', role: 'دعم فني', joined: '2026-03-02', status: 'active' },
  ],
};

// ---------- البوابات (المؤسسات التعليمية) ----------
PAGES['organizations'] = {
  kind: 'list', section: USERS, title: 'البوابات', sub: 'أكاديميات ومراكز تعليمية على المنصة',
  noun: 'البوابة', addLabel: 'بوابة جديدة',
  stats: [['إجمالي البوابات', 'count'], ['الموثّقة', { status: 'verified' }], ['معلمو البوابات', { sum: 'tutors' }], ['طلاب البوابات', { sum: 'students' }]],
  statuses: ['verified', 'active', 'inactive'],
  columns: [['id', 'ID', 'id'], ['name', 'الاسم', 'person'], ['classSales', 'مبيعات الفصول', 'number'], ['tutors', 'المعلمون', 'number'], ['students', 'الطلاب', 'number'], ['joined', 'تاريخ التسجيل', 'date', { ro: true }], ['status', 'الحالة', 'status']],
  newDefaults: { joined: '2026-11-16' },
  rows: [
    { id: 867, name: 'أكاديمية النور', classSales: 5, tutors: 3, students: 22, joined: '2025-06-11', status: 'verified' },
    { id: 864, name: 'مركز الرحاب التعليمي', classSales: 3, tutors: 2, students: 14, joined: '2025-08-02', status: 'verified' },
    { id: 863, name: 'أكاديمية همم', classSales: 2, tutors: 1, students: 9, joined: '2025-09-20', status: 'active' },
    { id: 870, name: 'معهد المستقبل', classSales: 1, tutors: 1, students: 3, joined: '2026-02-14', status: 'active' },
    { id: 875, name: 'مركز الإبداع', classSales: 0, tutors: 0, students: 0, joined: '2026-10-01', status: 'inactive' },
  ],
};

// ---------- إدارة الوصول ----------
PAGES['restricted-users'] = {
  kind: 'list', section: USERS, title: 'إدارة الوصول', sub: 'مستخدمون ممنوعون من الدخول للمحتوى',
  noun: 'المستخدم', addLabel: 'تقييد مستخدم',
  statuses: ['restricted', 'active'],
  columns: [['id', 'ID', 'id'], ['name', 'الاسم', 'person'], ['joined', 'تاريخ التسجيل', 'date'], ['reason', 'السبب', 'long'], ['status', 'إمكانية الوصول', 'status']],
  rows: [
    { id: 76, name: 'عمر علي', joined: '2026-10-21', reason: 'مشاركة الحساب مع أكثر من شخص', status: 'restricted' },
    { id: 90, name: 'زيد حسن', joined: '2026-09-02', reason: 'دفعة مستردة', status: 'restricted' },
  ],
};

// ---------- طلبات حذف الحساب ----------
PAGES['delete-requests'] = {
  kind: 'list', section: USERS, title: 'طلبات حذف الحساب', sub: 'مستخدمون طلبوا حذف حساباتهم',
  noun: 'الطلب', actions: ['view', 'edit', 'delete'], add: false,
  statuses: ['pending', 'approved', 'rejected'],
  columns: [['id', 'ID', 'id'], ['name', 'الاسم', 'person'], ['joined', 'تاريخ التسجيل', 'date'], ['requested', 'تاريخ الطلب', 'date'], ['status', 'الحالة', 'status']],
  rows: [
    { id: 88, name: 'رامي سعيد', joined: '2026-01-14', requested: '2026-11-11', status: 'pending' },
    { id: 61, name: 'منى خليل', joined: '2025-12-03', requested: '2026-11-02', status: 'approved' },
  ],
};

// ---------- الأدوار ----------
PAGES['roles'] = {
  kind: 'list', section: USERS, title: 'أدوار المستخدمين', sub: 'الصلاحيات لكل نوع مستخدم',
  noun: 'الدور', addLabel: 'دور جديد',
  columns: [['id', '#', 'id'], ['title', 'العنوان', 'title'], ['users', 'عدد المستخدمين', 'number', { ro: true }], ['adminAccess', 'دخول لوحة الأدمن', 'bool'], ['created', 'تاريخ الإنشاء', 'date', { ro: true }]],
  newDefaults: { users: 0, created: '2026-11-16' },
  rows: [
    { id: 1, title: 'مدير', users: 1, adminAccess: true, created: '2025-01-01' },
    { id: 2, title: 'طالب', users: 59, adminAccess: false, created: '2025-01-01' },
    { id: 3, title: 'معلم', users: 6, adminAccess: false, created: '2025-01-01' },
    { id: 4, title: 'بوابة', users: 5, adminAccess: false, created: '2025-01-01' },
    { id: 5, title: 'دعم فني', users: 1, adminAccess: true, created: '2026-03-01' },
    { id: 6, title: 'محاسب', users: 0, adminAccess: true, created: '2026-05-10' },
  ],
};

// ---------- المجموعات ----------
PAGES['user-groups'] = {
  kind: 'list', section: USERS, title: 'مجموعات المستخدمين', sub: 'عمولة وخصم خاص لكل مجموعة',
  noun: 'المجموعة', addLabel: 'مجموعة جديدة',
  statuses: ['active', 'inactive'],
  columns: [['id', '#', 'id'], ['name', 'الاسم', 'title'], ['users', 'المستخدمين', 'number', { ro: true }], ['commission', 'العمولة', 'percent'], ['discount', 'الخصم', 'percent'], ['status', 'الحالة', 'status']],
  newDefaults: { users: 0 },
  rows: [
    { id: 1, name: 'معلمون مميزون', users: 3, commission: 15, discount: 0, status: 'active' },
    { id: 2, name: 'طلاب الجامعات', users: 24, commission: 0, discount: 10, status: 'active' },
    { id: 3, name: 'شركاء قدامى', users: 2, commission: 10, discount: 5, status: 'inactive' },
  ],
};

// ---------- الشارات ----------
// باللوحة الحقيقية في 9 تبويبات حسب الشرط. هون فلتر "الشرط" بيعمل نفس الشي
PAGES['badges'] = {
  kind: 'list', section: USERS, title: 'الشارات', sub: 'شارات بيحصل عليها المستخدم لما يحقق شرط',
  noun: 'الشارة', addLabel: 'شارة جديدة',
  selects: [['condition', 'الشرط']],
  columns: [['title', 'العنوان', 'title'], ['condition', 'الشرط', 'pill', { options: ['تاريخ التسجيل', 'عدد الدورات', 'تقييم الدورة', 'عدد المبيعات', 'تقييم الدعم', 'مبيعات المتجر', 'مواضيع المنتدى', 'منشورات المنتدى', 'المقالات'] }], ['value', 'القيمة', 'number'], ['points', 'نقاط مكافأة', 'number'], ['description', 'الوصف', 'long']],
  rows: [
    { id: 1, title: 'عضو منذ سنة', condition: 'تاريخ التسجيل', value: 365, points: 50, description: 'مرّت سنة على تسجيلك' },
    { id: 2, title: 'معلم نشيط', condition: 'عدد الدورات', value: 5, points: 100, description: 'نشرت 5 دورات' },
    { id: 3, title: 'تقييم ممتاز', condition: 'تقييم الدورة', value: 4.5, points: 80, description: 'متوسط تقييم 4.5 أو أكثر' },
    { id: 4, title: 'بائع محترف', condition: 'عدد المبيعات', value: 50, points: 150, description: '50 مبيعة' },
    { id: 5, title: 'مشارك فعّال', condition: 'مواضيع المنتدى', value: 10, points: 30, description: '10 مواضيع بالمنتدى' },
  ],
};

// ---------- طلبات المعلمين ----------
const becomeRequests = (title, rows) => ({
  kind: 'list', section: USERS, title, sub: 'طلبات الانضمام للمنصة كمعلم أو بوابة',
  noun: 'الطلب', actions: ['view', 'edit', 'delete'], add: false,
  statuses: ['pending', 'approved', 'rejected'],
  columns: [['user', 'مستخدم', 'person'], ['package', 'باقة التسجيل', 'pill'], ['created', 'تاريخ الإنشاء', 'date'], ['status', 'الحالة', 'status']],
  rows,
});
PAGES['instructor-requests'] = becomeRequests('طلبات المعلمين', [
  { id: 1, user: 'خالد منصور', package: 'باقة المعلم الأساسية', created: '2026-11-14', status: 'pending' },
  { id: 2, user: 'دانا عيسى', package: 'باقة المعلم المميزة', created: '2026-11-10', status: 'approved' },
  { id: 3, user: 'فادي نصر', package: 'بدون باقة', created: '2026-11-03', status: 'rejected' },
]);
PAGES['organization-requests'] = becomeRequests('طلبات البوابات', [
  { id: 1, user: 'مركز الإبداع', package: 'باقة المؤسسة', created: '2026-10-01', status: 'approved' },
  { id: 2, user: 'أكاديمية الغد', package: 'باقة المؤسسة', created: '2026-11-12', status: 'pending' },
]);

// ---------- المنتدى ----------
PAGES['forums'] = {
  kind: 'list', section: 'المنتدى', title: 'المنتديات', sub: 'أقسام النقاش العامة',
  noun: 'المنتدى', addLabel: 'منتدى جديد',
  stats: [['مجموع المنتديات', 'count'], ['مجموع المواضيع', { sum: 'topics' }], ['مجموع المنشورات', { sum: 'posts' }]],
  statuses: ['active', 'inactive'],
  columns: [['icon', 'الأيقونة', 'icon', { ro: true }], ['title', 'العنوان', 'title'], ['topics', 'المواضيع', 'number', { ro: true }], ['posts', 'المنشورات', 'number', { ro: true }], ['closed', 'مغلق', 'bool'], ['status', 'الحالة', 'status']],
  newDefaults: { icon: 'message', topics: 0, posts: 0 },
  rows: [
    { id: 1, icon: 'message', title: 'نقاش عام', topics: 12, posts: 48, closed: false, status: 'active' },
    { id: 2, icon: 'help', title: 'أسئلة تقنية', topics: 7, posts: 30, closed: false, status: 'active' },
    { id: 3, icon: 'sparkles', title: 'اقتراحات', topics: 4, posts: 9, closed: false, status: 'active' },
    { id: 4, icon: 'lock', title: 'أرشيف 2025', topics: 20, posts: 110, closed: true, status: 'inactive' },
  ],
};

PAGES['featured-topics'] = {
  kind: 'list', section: 'المنتدى', title: 'مواضيع مميزة', sub: 'مواضيع مثبتة بأعلى المنتدى',
  noun: 'الموضوع', addLabel: 'موضوع مميز',
  columns: [['icon', 'الأيقونة', 'icon', { ro: true }], ['topic', 'الموضوع', 'title'], ['date', 'التاريخ', 'date', { ro: true }]],
  newDefaults: { icon: 'star', date: '2026-11-16' },
  rows: [
    { id: 1, icon: 'star', topic: 'كيف تختار دورتك الأولى؟', date: '2026-11-01' },
    { id: 2, icon: 'star', topic: 'نصائح للنجاح بالاختبارات', date: '2026-10-20' },
    { id: 3, icon: 'star', topic: 'قواعد المنتدى', date: '2026-09-05' },
  ],
};

PAGES['recommended-topics'] = {
  kind: 'list', section: 'المنتدى', title: 'مواضيع مقترحة', sub: 'مجموعات مواضيع بننصح فيها',
  noun: 'المجموعة', addLabel: 'مجموعة جديدة',
  columns: [['icon', 'الأيقونة', 'icon', { ro: true }], ['title', 'العنوان', 'title'], ['topics', 'عدد المواضيع', 'number'], ['date', 'التاريخ', 'date', { ro: true }]],
  newDefaults: { icon: 'sparkles', date: '2026-11-16' },
  rows: [
    { id: 1, icon: 'sparkles', title: 'للمبتدئين', topics: 5, date: '2026-11-03' },
    { id: 2, icon: 'sparkles', title: 'تطوير المهارات', topics: 8, date: '2026-10-11' },
  ],
};
