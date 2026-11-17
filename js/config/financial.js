// =========================================================
// config/financial.js — إعدادات صفحات قسم "الماليات"
// (قائمة المبيعات صفحة موجودة من قبل: orders.html)
// =========================================================

const FIN = 'الماليات';

// ---------- المستندات (حركات الرصيد) ----------
PAGES['documents'] = {
  kind: 'list', section: FIN, title: 'المستندات المالية', sub: 'كل حركة على أرصدة المستخدمين',
  noun: 'المستند', addLabel: 'مستند جديد',
  selects: [['type', 'النوع']],
  stats: [['عدد المستندات', 'count'], ['إجمالي المبالغ', { sum: 'amount' }]],
  columns: [['title', 'العنوان', 'title'], ['user', 'مستخدم', 'person'], ['amount', 'المبلغ', 'money'], ['tax', 'الضريبة', 'money'], ['type', 'النوع', 'pill', { options: ['إضافة', 'خصم'] }], ['creator', 'المنشئ', 'pill', { options: ['النظام', 'المدير'] }], ['date', 'التاريخ', 'date', { ro: true }]],
  newDefaults: { date: '2026-11-16', creator: 'المدير' },
  rows: [
    { id: 1, title: 'بيع دورة مايكروسوفت إكسل', user: 'نرمين أحمد', amount: 54, tax: 6, type: 'إضافة', creator: 'النظام', date: '2026-11-15' },
    { id: 2, title: 'عمولة المنصة', user: 'نرمين أحمد', amount: 6, tax: 0, type: 'خصم', creator: 'النظام', date: '2026-11-15' },
    { id: 3, title: 'سحب رصيد', user: 'آية محمد', amount: 100, tax: 0, type: 'خصم', creator: 'المدير', date: '2026-11-10' },
    { id: 4, title: 'مكافأة مسابقة', user: 'سارة أحمد', amount: 10, tax: 0, type: 'إضافة', creator: 'المدير', date: '2026-11-03' },
  ],
};

// ---------- طلبات السحب وسجلها ----------
// أرقام الحسابات مخفية جزئياً (****) زي ما لازم تكون بأي واجهة
const payoutColumns = [
  ['user', 'مستخدم', 'person'], ['role', 'الدور', 'pill'], ['amount', 'مبلغ الدفع', 'money'],
  ['bank', 'البنك', 'text'], ['iban', 'IBAN', 'ltr'], ['date', 'تاريخ الطلب', 'date'],
];
PAGES['payout-requests'] = {
  kind: 'list', section: FIN, title: 'طلبات السحب', sub: 'معلمون وبوابات طالبين سحب أرصدتهم',
  noun: 'الطلب', actions: ['view', 'edit'], add: false,
  stats: [['عدد الطلبات', 'count'], ['إجمالي المبالغ', { sum: 'amount' }]],
  statuses: ['pending', 'approved', 'rejected'],
  columns: [...payoutColumns, ['status', 'الحالة', 'status']],
  rows: [
    { id: 1, user: 'نرمين أحمد', role: 'معلم', amount: 500, bank: 'بنك فلسطين', iban: 'PS** **** **** 4821', date: '2026-11-14', status: 'pending' },
    { id: 2, user: 'أكاديمية النور', role: 'بوابة', amount: 150, bank: 'البنك العربي', iban: 'PS** **** **** 1190', date: '2026-11-12', status: 'pending' },
  ],
};
PAGES['payout-history'] = {
  kind: 'list', section: FIN, title: 'سجل السحب', readOnly: true, sub: 'كل عمليات السحب السابقة',
  noun: 'العملية',
  statuses: ['approved', 'rejected'],
  columns: [...payoutColumns, ['status', 'الحالة', 'status']],
  rows: [
    { id: 1, user: 'آية محمد', role: 'معلم', amount: 100, bank: 'بنك القدس', iban: 'PS** **** **** 7730', date: '2026-11-10', status: 'approved' },
    { id: 2, user: 'ريهام محمد', role: 'معلم', amount: 80, bank: 'بنك فلسطين', iban: 'PS** **** **** 3311', date: '2026-10-28', status: 'approved' },
    { id: 3, user: 'سامي أحمد', role: 'معلم', amount: 20, bank: 'البنك العربي', iban: 'PS** **** **** 0042', date: '2026-10-15', status: 'rejected' },
  ],
};

// ---------- المدفوعات الأوفلاين (تحويل بنكي) ----------
const offlineColumns = [
  ['user', 'مستخدم', 'person'], ['amount', 'المبلغ', 'money'], ['bank', 'البنك', 'text'],
  ['reference', 'رقم المرجع', 'code'], ['date', 'وقت المعاملة', 'date'],
];
PAGES['offline-payment-requests'] = {
  kind: 'list', section: FIN, title: 'طلبات الدفع الأوفلاين', sub: 'تحويلات بنكية بانتظار التأكيد',
  noun: 'الطلب', actions: ['view', 'edit'], add: false,
  statuses: ['pending', 'approved', 'rejected'],
  columns: [...offlineColumns, ['status', 'الحالة', 'status']],
  rows: [
    { id: 1, user: 'نور محمد', amount: 35, bank: 'بنك فلسطين', reference: 'TRX-88213', date: '2026-11-15', status: 'pending' },
    { id: 2, user: 'ليلى حسن', amount: 50, bank: 'البنك العربي', reference: 'TRX-88177', date: '2026-11-13', status: 'pending' },
  ],
};
PAGES['offline-payment-history'] = {
  kind: 'list', section: FIN, title: 'سجل الدفع الأوفلاين', readOnly: true, sub: 'التحويلات اللي انقبلت أو انرفضت',
  noun: 'العملية',
  statuses: ['approved', 'rejected'],
  columns: [...offlineColumns, ['status', 'الحالة', 'status']],
  rows: [
    { id: 1, user: 'محمد خالد', amount: 60, bank: 'بنك القدس', reference: 'TRX-87001', date: '2026-11-02', status: 'approved' },
    { id: 2, user: 'عمر علي', amount: 75, bank: 'بنك فلسطين', reference: 'TRX-86950', date: '2026-10-25', status: 'rejected' },
    { id: 3, user: 'سارة أحمد', amount: 10, bank: 'البنك العربي', reference: 'TRX-86811', date: '2026-10-12', status: 'approved' },
  ],
};

// ---------- خطط الاشتراك ----------
PAGES['subscriptions'] = {
  kind: 'list', section: FIN, title: 'خطط الاشتراك', sub: 'اشتراك شهري أو سنوي بيفتح عدد من الدورات',
  noun: 'الخطة', addLabel: 'خطة جديدة',
  columns: [['title', 'العنوان', 'title'], ['price', 'السعر', 'money'], ['usableCount', 'عدد الدورات', 'number'], ['days', 'أيام', 'number'], ['sales', 'المبيعات', 'number', { ro: true }], ['popular', 'شارة رائجة', 'bool'], ['infinite', 'استخدام لانهائي', 'bool']],
  newDefaults: { sales: 0 },
  rows: [
    { id: 1, title: 'الخطة الشهرية', price: 15, usableCount: 3, days: 30, sales: 12, popular: false, infinite: false },
    { id: 2, title: 'الخطة الفصلية', price: 39, usableCount: 10, days: 90, sales: 7, popular: true, infinite: false },
    { id: 3, title: 'الخطة السنوية', price: 120, usableCount: 0, days: 365, sales: 4, popular: false, infinite: true },
  ],
};

// ---------- نقاط المكافأة ----------
PAGES['rewards'] = {
  kind: 'list', section: FIN, title: 'نقاط المكافأة', readOnly: true, sub: 'رصيد النقاط لكل مستخدم',
  noun: 'المستخدم',
  stats: [['المستخدمون', 'count'], ['إجمالي النقاط', { sum: 'total' }]],
  columns: [['user', 'مستخدم', 'person'], ['total', 'النقاط الكلية', 'number'], ['spent', 'المستخدمة', 'number'], ['available', 'المتبقية', 'number']],
  rows: [
    { id: 1, user: 'محمد خالد', total: 320, spent: 100, available: 220 },
    { id: 2, user: 'سارة أحمد', total: 250, spent: 0, available: 250 },
    { id: 3, user: 'ليلى حسن', total: 140, spent: 40, available: 100 },
    { id: 4, user: 'نور محمد', total: 90, spent: 90, available: 0 },
  ],
};

PAGES['reward-conditions'] = {
  kind: 'list', section: FIN, title: 'شروط المكافأة', sub: 'كم نقطة بياخد المستخدم على كل عمل',
  noun: 'الشرط', addLabel: 'شرط جديد',
  statuses: ['active', 'inactive'],
  columns: [['title', 'العنوان', 'title'], ['points', 'النقاط', 'number'], ['status', 'الحالة', 'status']],
  rows: [
    { id: 1, title: 'التسجيل بالمنصة', points: 20, status: 'active' }, { id: 2, title: 'شراء دورة', points: 10, status: 'active' },
    { id: 3, title: 'إنهاء دورة', points: 30, status: 'active' }, { id: 4, title: 'كتابة مراجعة', points: 5, status: 'active' },
    { id: 5, title: 'دعوة صديق', points: 25, status: 'active' }, { id: 6, title: 'النجاح باختبار', points: 15, status: 'active' },
    { id: 7, title: 'تعليق بالمدونة', points: 2, status: 'inactive' },
  ],
};

PAGES['reward-settings'] = { kind: 'soon', section: FIN, title: 'إعدادات نقاط المكافأة', sub: 'قيمة النقطة وطرق استبدالها' };

// ---------- باقات SaaS ----------
PAGES['saas-plans'] = {
  kind: 'list', section: FIN, title: 'باقات SaaS', sub: 'باقات تسجيل للمعلمين والمؤسسات',
  noun: 'الباقة', addLabel: 'باقة جديدة',
  statuses: ['active', 'inactive'],
  selects: [['role', 'الدور']],
  columns: [['title', 'العنوان', 'title'], ['role', 'الدور', 'pill', { options: ['معلم', 'مؤسسة'] }], ['price', 'السعر', 'money'], ['days', 'أيام', 'number'], ['sales', 'المبيعات', 'number', { ro: true }], ['status', 'الحالة', 'status']],
  newDefaults: { sales: 0 },
  rows: [
    { id: 1, title: 'باقة المعلم الأساسية', role: 'معلم', price: 0, days: 365, sales: 4, status: 'active' },
    { id: 2, title: 'باقة المعلم المميزة', role: 'معلم', price: 49, days: 365, sales: 2, status: 'active' },
    { id: 3, title: 'باقة المؤسسة', role: 'مؤسسة', price: 199, days: 365, sales: 3, status: 'active' },
  ],
};

PAGES['saas-reports'] = {
  kind: 'list', section: FIN, title: 'تقارير باقات SaaS', readOnly: true, sub: 'مين اشترى أي باقة ومتى بتخلص',
  noun: 'الاشتراك',
  stats: [['عدد المبيعات', 'count'], ['المبلغ الإجمالي', { sum: 'price' }]],
  columns: [['user', 'مستخدم', 'person'], ['userType', 'نوع المستخدم', 'pill'], ['plan', 'الباقة', 'title'], ['price', 'السعر', 'money'], ['activated', 'تاريخ التفعيل', 'date'], ['expires', 'تاريخ الانتهاء', 'date']],
  rows: [
    { id: 1, user: 'أكاديمية النور', userType: 'مؤسسة', plan: 'باقة المؤسسة', price: 199, activated: '2026-01-10', expires: '2027-01-10' },
    { id: 2, user: 'دانا عيسى', userType: 'معلم', plan: 'باقة المعلم المميزة', price: 49, activated: '2026-11-10', expires: '2027-11-10' },
    { id: 3, user: 'مركز الرحاب التعليمي', userType: 'مؤسسة', plan: 'باقة المؤسسة', price: 199, activated: '2026-03-02', expires: '2027-03-02' },
  ],
};

PAGES['saas-settings'] = { kind: 'soon', section: FIN, title: 'إعدادات باقات SaaS', sub: 'خيارات تسجيل المعلمين والمؤسسات' };
