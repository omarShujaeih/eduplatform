// =========================================================
// config/crm.js — إعدادات صفحات قسم CRM
// (الدعم، التعليقات، البلاغات، رسائل الاتصال، الإشعارات)
// =========================================================

const CRM = 'CRM';

// ---------- تذاكر الدعم ----------
PAGES['supports'] = {
  kind: 'list', section: CRM, title: 'تذاكر الدعم', sub: 'محادثات الدعم مع المستخدمين',
  noun: 'التذكرة', addLabel: 'تذكرة دعم جديدة',
  stats: [['إجمالي المحادثات', 'count'], ['ردود معلقة', { status: 'awaiting_reply' }], ['تم الرد', { status: 'replied' }], ['المغلقة', { status: 'closed' }]],
  statuses: ['awaiting_reply', 'replied', 'closed'],
  selects: [['department', 'القسم']],
  columns: [['title', 'العنوان', 'title'], ['user', 'مستخدم', 'person'], ['role', 'الدور', 'pill', { options: ['طالب', 'معلم', 'بوابة'] }], ['department', 'القسم', 'pill', { options: ['الدعم الفني', 'المالية', 'المحتوى'] }], ['updated', 'آخر تحديث', 'date', { ro: true }], ['status', 'الحالة', 'status']],
  newDefaults: { updated: '2026-11-16' },
  rows: [
    { id: 1, title: 'مشكلة في الاختبار', user: 'محمد خالد', role: 'طالب', department: 'الدعم الفني', updated: '2026-11-16', status: 'awaiting_reply' },
    { id: 2, title: 'طلب استرداد #64237', user: 'محمد خالد', role: 'طالب', department: 'المالية', updated: '2026-11-15', status: 'closed' },
    { id: 3, title: 'تأخير موعد الفصل', user: 'أكاديمية النور', role: 'بوابة', department: 'المحتوى', updated: '2026-11-14', status: 'replied' },
    { id: 4, title: 'نسبة العمولة', user: 'أحمد مصطفى', role: 'معلم', department: 'المالية', updated: '2026-11-12', status: 'replied' },
    { id: 5, title: 'دفعة أوفلاين معلّقة', user: 'نور محمد', role: 'طالب', department: 'المالية', updated: '2026-11-11', status: 'awaiting_reply' },
  ],
};

PAGES['support-departments'] = {
  kind: 'list', section: CRM, title: 'أقسام الدعم', sub: 'لتوجيه كل تذكرة للفريق المناسب',
  noun: 'القسم', addLabel: 'قسم جديد',
  columns: [['title', 'القسم', 'title'], ['conversations', 'المحادثات', 'number', { ro: true }]],
  newDefaults: { conversations: 0 },
  rows: [
    { id: 1, title: 'الدعم الفني', conversations: 2 },
    { id: 2, title: 'المالية', conversations: 3 },
    { id: 3, title: 'المحتوى', conversations: 1 },
    { id: 4, title: 'الحسابات', conversations: 0 },
  ],
};

PAGES['course-support'] = {
  kind: 'list', section: CRM, title: 'دعم الفصول', sub: 'أسئلة الطلاب للمعلم داخل الدورة',
  noun: 'المحادثة', actions: ['view', 'edit', 'delete'], add: false,
  stats: [['إجمالي المحادثات', 'count'], ['المفتوحة', { status: 'open' }], ['المغلقة', { status: 'closed' }]],
  statuses: ['open', 'closed'],
  columns: [['title', 'العنوان', 'title'], ['course', 'الفصل', 'text'], ['tutor', 'معلم', 'text'], ['student', 'طالب', 'person'], ['updated', 'آخر تحديث', 'date'], ['status', 'الحالة', 'status']],
  rows: [
    { id: 1, title: 'سؤال عن الواجب', course: 'مايكروسوفت إكسل', tutor: 'نرمين أحمد', student: 'سارة أحمد', updated: '2026-11-15', status: 'open' },
    { id: 2, title: 'الفيديو ما بشتغل', course: 'مستقبل الطاقة', tutor: 'ريهام محمد', student: 'ليلى حسن', updated: '2026-11-12', status: 'closed' },
    { id: 3, title: 'طلب ملف إضافي', course: 'تصميم المواقع للمبتدئين', tutor: 'آية محمد', student: 'محمد خالد', updated: '2026-11-09', status: 'open' },
  ],
};

// ---------- التعليقات (صفحتين بنفس الشكل) ----------
const commentsPage = (title, whereLabel, rows) => ({
  kind: 'list', section: CRM, title, sub: 'مراجعة التعليقات قبل نشرها',
  noun: 'التعليق', actions: ['view', 'edit', 'delete'], add: false,
  stats: [['كل التعليقات', 'count'], ['المنشورة', { status: 'published' }], ['المعلقة', { status: 'pending' }]],
  statuses: ['published', 'pending'],
  columns: [['comment', 'التعليق', 'long'], ['user', 'مستخدم', 'person'], ['where', whereLabel, 'title'], ['created', 'التاريخ', 'date'], ['status', 'الحالة', 'status']],
  rows,
});

PAGES['course-comments'] = commentsPage('تعليقات الفصول', 'الفصل', [
  { id: 1, comment: 'شكراً على هذا الشرح الممتاز.', user: 'سارة أحمد', where: 'مستقبل الطاقة', created: '2026-11-16', status: 'published' },
  { id: 2, comment: 'متى الجلسة الجاية؟', user: 'محمد خالد', where: 'مايكروسوفت إكسل', created: '2026-11-16', status: 'pending' },
  { id: 3, comment: 'دورة رائعة بتعطيك أساسيات قوية.', user: 'ليلى حسن', where: 'كن مدير منتج', created: '2026-11-15', status: 'published' },
  { id: 4, comment: 'لو في ترجمة للفيديوهات بكون أحسن.', user: 'نور محمد', where: 'New Update Features', created: '2026-11-13', status: 'pending' },
]);

PAGES['blog-comments'] = commentsPage('تعليقات المدونة', 'المقال', [
  { id: 1, comment: 'مقال مفيد جداً، شكراً.', user: 'نرمين أحمد', where: '5 نصائح للتعلم عن بعد', created: '2026-11-16', status: 'published' },
  { id: 2, comment: 'بتمنى تكتبوا عن البرمجة أكثر.', user: 'عمر علي', where: 'مستقبل التعليم الرقمي', created: '2026-11-12', status: 'pending' },
]);

// ---------- البلاغات ----------
const reportPage = (title, whatLabel, rows) => ({
  kind: 'list', section: CRM, title, sub: 'بلاغات المستخدمين عن محتوى غير مناسب',
  noun: 'البلاغ', actions: ['view', 'delete'], add: false,
  columns: [['user', 'مستخدم', 'person'], ['what', whatLabel, 'title'], ['reason', 'السبب / الرسالة', 'long'], ['date', 'التاريخ', 'date']],
  rows,
});

PAGES['course-reports'] = reportPage('بلاغات الفصول', 'الفصل', [
  { id: 1, user: 'عمر علي', what: 'كيف تسافر حول العالم', reason: 'محتوى مضلل', date: '2026-11-13' },
  { id: 2, user: 'ليلى حسن', what: 'تعلم AngularJS', reason: 'المحتوى قديم', date: '2026-11-07' },
  { id: 3, user: 'نور محمد', what: 'New Update Features', reason: 'صوت غير واضح', date: '2026-11-02' },
]);
PAGES['comment-reports'] = reportPage('بلاغات تعليقات الفصول', 'الصفحة', [
  { id: 1, user: 'سارة أحمد', what: 'مايكروسوفت إكسل', reason: 'تعليق مسيء', date: '2026-11-14' },
  { id: 2, user: 'محمد خالد', what: 'مستقبل الطاقة', reason: 'إعلان غير مرغوب', date: '2026-11-10' },
]);
PAGES['blog-comment-reports'] = reportPage('بلاغات تعليقات المدونة', 'المقال', [
  { id: 1, user: 'ليلى حسن', what: 'مستقبل التعليم الرقمي', reason: 'رابط مشبوه', date: '2026-11-08' },
]);
PAGES['forum-reports'] = reportPage('بلاغات المنتدى', 'الموضوع', [
  { id: 1, user: 'نور محمد', what: 'نقاش عام: أفضل لغة برمجة', reason: 'خارج الموضوع', date: '2026-11-12' },
  { id: 2, user: 'عمر علي', what: 'أسئلة تقنية: مشكلة تسجيل', reason: 'مكرر', date: '2026-11-04' },
]);

PAGES['report-reasons'] = {
  kind: 'list', section: CRM, title: 'أسباب الإبلاغ', sub: 'الخيارات اللي بتظهر للمستخدم لما يبلّغ',
  noun: 'السبب', addLabel: 'سبب جديد',
  columns: [['title', 'السبب', 'title']],
  rows: [
    { id: 1, title: 'محتوى مسيء' }, { id: 2, title: 'محتوى مضلل' }, { id: 3, title: 'إعلان أو سبام' },
    { id: 4, title: 'انتهاك حقوق النشر' }, { id: 5, title: 'أخرى' },
  ],
};

// ---------- رسائل الاتصال ----------
PAGES['contacts'] = {
  kind: 'list', section: CRM, title: 'رسائل التواصل', sub: 'رسائل نموذج "اتصل بنا" بالموقع',
  noun: 'الرسالة', actions: ['view', 'edit', 'delete'], add: false,
  statuses: ['unread', 'replied'],
  columns: [['name', 'الاسم', 'person'], ['email', 'البريد', 'ltr'], ['phone', 'الهاتف', 'ltr'], ['subject', 'الموضوع', 'title'], ['message', 'الرسالة', 'long'], ['created', 'التاريخ', 'date'], ['status', 'الحالة', 'status']],
  rows: [
    { id: 1, name: 'رنا يوسف', email: 'rana@example.test', phone: '0590000001', subject: 'استفسار عن الأسعار', message: 'هل في خصم للطلاب؟', created: '2026-11-16', status: 'unread' },
    { id: 2, name: 'سامر عادل', email: 'samer@example.test', phone: '0590000002', subject: 'شراكة', message: 'بدنا نتعاون معكم كمؤسسة.', created: '2026-11-14', status: 'replied' },
    { id: 3, name: 'هالة ناصر', email: 'hala@example.test', phone: '0590000003', subject: 'مشكلة دفع', message: 'البطاقة انرفضت مرتين.', created: '2026-11-11', status: 'unread' },
  ],
};

// ---------- لوحة الإشعارات ----------
PAGES['noticeboards'] = {
  kind: 'list', section: CRM, title: 'لوحة الإشعارات', sub: 'إعلانات عامة لكل المستخدمين أو فئة منهم',
  noun: 'الإشعار', addLabel: 'إشعار جديد',
  selects: [['type', 'الفئة']],
  columns: [['title', 'العنوان', 'title'], ['sender', 'المرسل', 'person', { ro: true }], ['message', 'الرسالة', 'long'], ['type', 'الفئة', 'pill', { options: ['الكل', 'الطلاب', 'المعلمون', 'البوابات'] }], ['created', 'التاريخ', 'date', { ro: true }]],
  newDefaults: { sender: 'مدير النظام', created: '2026-11-16' },
  rows: [
    { id: 1, title: 'صيانة مجدولة', sender: 'مدير النظام', message: 'المنصة رح تتوقف ساعة يوم الجمعة.', type: 'الكل', created: '2026-11-15' },
    { id: 2, title: 'دورات جديدة', sender: 'مدير النظام', message: 'انضافت 3 دورات بقسم التصميم.', type: 'الطلاب', created: '2026-11-10' },
    { id: 3, title: 'تحديث العمولات', sender: 'مدير النظام', message: 'نسب عمولة جديدة من الشهر الجاي.', type: 'المعلمون', created: '2026-11-03' },
  ],
};

// ---------- الإشعارات ----------
PAGES['notifications'] = {
  kind: 'list', section: CRM, title: 'الإشعارات', sub: 'سجل الإشعارات المرسلة للمستخدمين',
  noun: 'الإشعار', addLabel: 'إرسال إشعار',
  statuses: ['unread', 'read'],
  selects: [['type', 'النوع']],
  columns: [['title', 'العنوان', 'title'], ['receiver', 'المستلم', 'person'], ['message', 'الرسالة', 'long'], ['type', 'النوع', 'pill', { options: ['فردي', 'مجموعة', 'الكل'] }], ['created', 'التاريخ', 'date', { ro: true }], ['status', 'الحالة', 'status']],
  newDefaults: { created: '2026-11-16' },
  rows: [
    { id: 1, title: 'تعليق جديد على فصلك', receiver: 'نرمين أحمد', message: 'في تعليق جديد على مايكروسوفت إكسل.', type: 'فردي', created: '2026-11-16', status: 'unread' },
    { id: 2, title: 'تم قبول دورتك', receiver: 'ريهام محمد', message: 'دورة New Update Features صارت منشورة.', type: 'فردي', created: '2026-11-15', status: 'read' },
    { id: 3, title: 'خصم الجمعة', receiver: 'كل الطلاب', message: 'خصم 20% على كل الدورات.', type: 'الكل', created: '2026-11-12', status: 'read' },
  ],
};

PAGES['notifications-posted'] = {
  kind: 'list', section: CRM, title: 'الإشعارات المرسلة', readOnly: true, sub: 'الإشعارات اللي بعتها المدير',
  noun: 'الإشعار',
  columns: [['title', 'العنوان', 'title'], ['receiver', 'المستلم', 'text'], ['message', 'الرسالة', 'long'], ['created', 'التاريخ', 'date']],
  rows: [
    { id: 1, title: 'خصم الجمعة', receiver: 'كل الطلاب', message: 'خصم 20% على كل الدورات.', created: '2026-11-12' },
    { id: 2, title: 'تذكير بالجلسة', receiver: 'طلاب إدارة الوقت', message: 'الجلسة بكرا الساعة 6.', created: '2026-11-09' },
  ],
};

PAGES['notification-templates'] = {
  kind: 'list', section: CRM, title: 'قوالب الإشعارات', sub: 'نصوص جاهزة للإشعارات التلقائية',
  noun: 'القالب', addLabel: 'قالب جديد',
  columns: [['title', 'العنوان', 'title'], ['body', 'النص', 'long']],
  rows: [
    { id: 1, title: 'تسجيل جديد', body: 'أهلاً [name]، تم إنشاء حسابك بنجاح.' },
    { id: 2, title: 'شراء دورة', body: 'شكراً لشرائك [course].' },
    { id: 3, title: 'قبول الدورة', body: 'تم قبول دورتك [course] ونشرها.' },
    { id: 4, title: 'رفض الدورة', body: 'للأسف تم رفض دورتك [course].' },
    { id: 5, title: 'تعليق جديد', body: 'في تعليق جديد على [course].' },
    { id: 6, title: 'تذكرة دعم جديدة', body: 'وصلتك تذكرة دعم: [title].' },
  ],
};
