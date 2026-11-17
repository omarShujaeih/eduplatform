// =========================================================
// data.js — البيانات التجريبية للمنصة (بدل قاعدة البيانات)
// بنحفظها في localStorage عشان التعديلات تضل بعد تحديث الصفحة.
// لازم يتحمّل هذا الملف قبل main.js وقبل ملفات الصفحات.
// =========================================================

const STORE_KEY = 'eduplatform-db-v1';

const initialData = {
  courses: [
    { id: 2010, title: 'New Update Features', category: 'لغة', tutor: 'ريهام محمد', price: 0, students: 3, lessons: 12, status: 'published', date: '2026-11-10' },
    { id: 2008, title: 'صفحة تعلم جديدة', category: 'أسلوب الحياة', tutor: 'نرمين أحمد', price: 0, students: 5, lessons: 8, status: 'published', date: '2026-11-08' },
    { id: 2007, title: 'Travel Management Course', category: 'أسلوب الحياة', tutor: 'نرمين أحمد', price: 0, students: 1, lessons: 16, status: 'published', date: '2026-11-07' },
    { id: 2005, title: 'تصميم المواقع للمبتدئين', category: 'تصميم', tutor: 'آية محمد', price: 10, students: 1, lessons: 14, status: 'published', date: '2026-11-05' },
    { id: 2004, title: 'مستقبل الطاقة', category: 'علم', tutor: 'ريهام محمد', price: 60, students: 2, lessons: 22, status: 'published', date: '2026-11-04' },
    { id: 1999, title: 'كيفية إدارة والتأثير على فريقك الافتراضي', category: 'مجال الاتصالات', tutor: 'ريهام محمد', price: 50, students: 1, lessons: 10, status: 'published', date: '2026-10-29' },
    { id: 1995, title: 'كن مدير منتج', category: 'استراتيجية العمل', tutor: 'حنان محمود', price: 0, students: 4, lessons: 15, status: 'published', date: '2026-10-22' },
  ],

  quizzes: [
    { id: 401, title: 'Entrance Quiz', course: 'صفحة تعلم جديدة', tutor: 'نرمين أحمد', questions: 6, students: 1, score: 80, status: 'active', certificate: true },
    { id: 402, title: 'Final Quiz', course: 'تعلم الإنجليزية في خمسة أيام', tutor: 'نرمين أحمد', questions: 5, students: 2, score: 85, status: 'active', certificate: true },
    { id: 403, title: 'Midterm Quiz', course: 'مايكروسوفت إكسل من المبتدئين إلى المتقدمين', tutor: 'نرمين أحمد', questions: 5, students: 2, score: 60, status: 'active', certificate: false },
    { id: 404, title: 'Midterm Quiz', course: 'الاستماع النشط: يمكنك أن تكون مستمعاً جيداً', tutor: 'سامي أحمد', questions: 5, students: 0, score: 0, status: 'active', certificate: false },
    { id: 405, title: 'Placement Quiz', course: 'تعلم AngularJS', tutor: 'سامي أحمد', questions: 5, students: 1, score: 40, status: 'active', certificate: false },
    { id: 406, title: 'First Quiz', course: 'كيفية إدارة والتأثير على فريقك الافتراضي', tutor: 'ريهام محمد', questions: 5, students: 1, score: 80, status: 'active', certificate: true },
    { id: 407, title: 'Elementary Quiz', course: 'كن مدير منتج', tutor: 'حنان محمود', questions: 5, students: 1, score: 80, status: 'active', certificate: true },
  ],

  students: [
    { id: 71, name: 'محمد خالد', email: 'm.khaled@example.test', courses: 3, joined: '2026-11-15', status: 'active' },
    { id: 72, name: 'سارة أحمد', email: 's.ahmad@example.test', courses: 2, joined: '2026-11-12', status: 'active' },
    { id: 73, name: 'ليلى حسن', email: 'l.hassan@example.test', courses: 4, joined: '2026-11-09', status: 'active' },
    { id: 74, name: 'أحمد مصطفى', email: 'a.mostafa@example.test', courses: 1, joined: '2026-11-05', status: 'pending' },
    { id: 75, name: 'نور محمد', email: 'n.mohammad@example.test', courses: 2, joined: '2026-10-29', status: 'active' },
    { id: 76, name: 'عمر علي', email: 'o.ali@example.test', courses: 1, joined: '2026-10-21', status: 'inactive' },
  ],

  tutors: [
    { id: 11, name: 'نرمين أحمد', specialty: 'إدارة الأعمال واللغات', courses: 4, rating: '4.9', status: 'active' },
    { id: 12, name: 'ريهام محمد', specialty: 'المهارات الرقمية', courses: 3, rating: '4.8', status: 'active' },
    { id: 13, name: 'سامي أحمد', specialty: 'البرمجة وتطوير الويب', courses: 2, rating: '4.7', status: 'active' },
    { id: 14, name: 'حنان محمود', specialty: 'القيادة والإدارة', courses: 1, rating: '4.9', status: 'pending' },
    { id: 15, name: 'آية محمد', specialty: 'التصميم الإبداعي', courses: 1, rating: '4.6', status: 'active' },
  ],

  orders: [
    { id: 9112, student: 'سارة أحمد', item: 'مستقبل الطاقة', amount: 60, status: 'paid', date: '2026-11-15' },
    { id: 9111, student: 'محمد خالد', item: 'تصميم المواقع للمبتدئين', amount: 10, status: 'paid', date: '2026-11-14' },
    { id: 9110, student: 'ليلى حسن', item: 'دورة تعليمية', amount: 50, status: 'pending', date: '2026-11-12' },
    { id: 9109, student: 'نور محمد', item: 'استشارة تعليمية', amount: 35, status: 'paid', date: '2026-11-10' },
    { id: 9108, student: 'أحمد مصطفى', item: 'دورة متقدمة', amount: 75, status: 'refunded', date: '2026-11-08' },
  ],

  bookings: [
    { id: 511, student: 'محمد خالد', tutor: 'نرمين أحمد', date: '2026-11-18', time: '16:30', status: 'confirmed' },
    { id: 512, student: 'سارة أحمد', tutor: 'ريهام محمد', date: '2026-11-19', time: '13:00', status: 'confirmed' },
    { id: 513, student: 'نور محمد', tutor: 'سامي أحمد', date: '2026-11-20', time: '18:00', status: 'pending' },
    { id: 514, student: 'ليلى حسن', tutor: 'حنان محمود', date: '2026-11-22', time: '15:30', status: 'canceled' },
  ],

  // إعدادات صفحة "مظهر الموقع" (كائن مش مصفوفة)
  appearance: {
    primary: '#0b7186',
    headline: 'تعلم اليوم. اصنع مستقبلك.',
    subtitle: 'دورات وخبراء وجلسات تفاعلية في مكان واحد.',
    hero: true,
    categories: true,
    tutors: true,
    testimonials: true,
    newsletter: false,
  },

  // أرقام لوحة التحكم الرئيسية (للعرض فقط) — نفس أقسام itutor24.com/admin
  dashboard: {
    // كرت "مبيعات اليوم" مقسّمة حسب نوع الفصل
    todayByType: [
      { label: 'فصل مباشر', value: 3 },
      { label: 'فصل مسجّل', value: 2 },
      { label: 'جلسة', value: 1 },
    ],
    // كرت "إجمالي الدخل" (دولار) وكرت "إجمالي المبيعات" (عدد)
    income: { today: 42.9, month: 1015.17, year: 4225.5, total: 6380.4 },
    sales: { today: 6, month: 18, year: 62, total: 214 },

    // الكروت الأربعة الصغيرة
    counts: { newSales: 8, newComments: 2, newTickets: 1, pendingClasses: 0 },

    // صناديق "إحصائيات المبيعات" تحت الرسم (عدد المبيعات + التغيّر %)
    salesBoxes: [
      { label: 'مبيعات اليوم', value: 6, change: 20 },
      { label: 'مبيعات الأسبوع', value: 14, change: -5 },
      { label: 'مبيعات الشهر', value: 18, change: 12 },
      { label: 'مبيعات السنة', value: 62, change: null },
    ],

    latestComments: [
      { user: 'نرمين أحمد', date: '16 نوفمبر · 11:46', text: 'شكراً على هذا المقال الممتاز، كان مفيداً جداً.' },
      { user: 'أكاديمية همم', date: '16 نوفمبر · 11:26', text: 'سعداء جداً إن الدورة نالت رضاك.' },
      { user: 'سارة أحمد', date: '16 نوفمبر · 11:26', text: 'دورة رائعة بتعطيك أساسيات قوية بالموضوع.' },
      { user: 'ليلى حسن', date: '15 نوفمبر · 18:02', text: 'الشرح واضح، بتمنى تضيفوا تمارين أكثر.' },
      { user: 'محمد خالد', date: '15 نوفمبر · 09:40', text: 'استفدت كثير من الجلسة المباشرة.' },
    ],

    // status: awaiting_reply / replied / closed
    latestTickets: [
      { title: 'مشكلة في الاختبار', user: 'محمد خالد', status: 'awaiting_reply' },
      { title: 'طلب استرداد #64237', user: 'محمد خالد', status: 'closed' },
      { title: 'تأخير موعد الفصل', user: 'أكاديمية النور', status: 'replied' },
      { title: 'نسبة العمولة', user: 'أحمد مصطفى', status: 'replied' },
      { title: 'دفعة أوفلاين معلّقة', user: 'نور محمد', status: 'awaiting_reply' },
    ],

    latestLiveClasses: [
      { title: 'نظام مباشر جديد داخل التطبيق', tutor: 'نرمين أحمد', status: 'published' },
      { title: 'كيف تسافر حول العالم', tutor: 'أحمد مصطفى', status: 'published' },
      { title: 'الاستماع النشط: يمكنك أن تكون مستمعاً جيداً', tutor: 'سامي أحمد', status: 'published' },
      { title: 'دروس متقدمة في الصحة واللياقة البدنية', tutor: 'ريهام محمد', status: 'published' },
      { title: 'تعلم وافهم AngularJS', tutor: 'سامي أحمد', status: 'published' },
    ],

    // تسجيل المستخدمين لكل يوم بالشهر (31 يوم)
    registrations: [2, 0, 3, 1, 0, 4, 2, 1, 0, 5, 3, 2, 6, 1, 0, 2, 4, 3, 1, 0, 2, 5, 3, 1, 2, 0, 4, 6, 3, 2, 1],
  },

  // أرقام صفحة "لوحة التسويق" (للعرض فقط، ما بتتعدّل من الواجهة)
  marketing: {
    // الكروت الأربعة فوق
    cards: {
      studentsWithoutPurchase: 59,
      tutorsWithoutClasses: 0,
      trendingClasses: 2,
      activeDiscounts: 0,
    },

    // صافي الربح بدون ضريبة: الشهر (أيام) والسنة (شهور)
    profit: {
      month: {
        points: [0, 12, 0, 35, 22, 0, 48, 30, 15, 64, 41, 58, 20, 73, 39],
        labels: ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19', '21', '23', '25', '27', '29'],
      },
      year: {
        points: [120, 180, 95, 240, 310, 205, 380, 290, 420, 515, 460, 610],
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
      },
    },

    // الصناديق الأربعة تحت الرسم. change = نسبة التغيّر عن الفترة السابقة (null = ما في قيمة سابقة)
    earnings: [
      { label: 'أرباح اليوم', value: 42.9, change: 12 },
      { label: 'أرباح الأسبوع', value: 264, change: -8 },
      { label: 'أرباح الشهر', value: 1015.17, change: 23 },
      { label: 'أرباح السنة', value: 4225.5, change: null },
    ],

    // أنواع الفصول (للدائرة)
    classTypes: [
      { label: 'جلسة / ويبينار مباشر', value: 8, color: '#0b7186' },
      { label: 'دورة مسجلة', value: 7, color: '#ffcf24' },
      { label: 'دورة نصية', value: 1, color: '#a3d4d0' },
    ],

    topClasses: [
      { id: 1998, title: 'مايكروسوفت إكسل من المبتدئين إلى المتقدمين', type: 'جلسة / ويبينار مباشر', sales: 4, income: 264 },
      { id: 2000, title: 'إدارة الوقت بفاعلية', type: 'جلسة / ويبينار مباشر', sales: 4, income: 128.7 },
      { id: 2009, title: 'نظام مباشر جديد داخل التطبيق', type: 'جلسة / ويبينار مباشر', sales: 4, income: 42.9 },
      { id: 2003, title: 'الاستماع النشط: يمكنك أن تكون مستمعاً جيداً', type: 'جلسة / ويبينار مباشر', sales: 3, income: 105.6 },
      { id: 2002, title: 'دروس متقدمة في الصحة واللياقة البدنية', type: 'جلسة / ويبينار مباشر', sales: 2, income: 39.6 },
      { id: 2004, title: 'مستقبل الطاقة', type: 'دورة مسجلة', sales: 2, income: 120 },
      { id: 2005, title: 'تصميم المواقع للمبتدئين', type: 'دورة مسجلة', sales: 1, income: 10 },
      { id: 1999, title: 'كيفية إدارة والتأثير على فريقك الافتراضي', type: 'دورة نصية', sales: 1, income: 50 },
    ],

    topSessions: [
      { id: 1015, consultant: 'نرمين أحمد', sales: 3, income: 1127.5 },
      { id: 934, consultant: 'آية محمد', sales: 1, income: 110 },
    ],

    topTutors: [
      { id: 1015, name: 'نرمين أحمد', duration: '16:10', sales: 16, income: 1677.65 },
      { id: 934, name: 'آية محمد', duration: '2:20', sales: 3, income: 433.3 },
      { id: 929, name: 'ريهام محمد', duration: '4:10', sales: 3, income: 148.5 },
      { id: 3, name: 'سامي أحمد', duration: '2:15', sales: 1, income: 17.6 },
      { id: 1016, name: 'حنان محمود', duration: '2:30', sales: 1, income: 5.25 },
      { id: 1020, name: 'محمود علي', duration: '1:45', sales: 1, income: 11 },
    ],

    topOrganizations: [
      { id: 867, name: 'أكاديمية النور', duration: '5:00', sales: 5, income: 153.45 },
      { id: 864, name: 'مركز الرحاب التعليمي', duration: '1:15', sales: 3, income: 105.6 },
      { id: 863, name: 'أكاديمية همم', duration: '1:00', sales: 2, income: 39.6 },
      { id: 870, name: 'معهد المستقبل', duration: '0:45', sales: 1, income: 11 },
    ],

    activeStudents: [
      { id: 71, name: 'محمد خالد', classes: 5, sessions: 3, total: 1318.6 },
      { id: 72, name: 'سارة أحمد', classes: 5, sessions: 1, total: 391.7 },
      { id: 73, name: 'ليلى حسن', classes: 4, sessions: 0, total: 168.3 },
      { id: 75, name: 'نور محمد', classes: 3, sessions: 0, total: 202 },
      { id: 74, name: 'أحمد مصطفى', classes: 1, sessions: 0, total: 643.4 },
      { id: 76, name: 'عمر علي', classes: 1, sessions: 2, total: 96 },
      { id: 77, name: 'رنا يوسف', classes: 2, sessions: 1, total: 74.5 },
    ],
  },

  // إعدادات صفحة "الإعدادات العامة"
  settings: {
    siteName: 'Emicrolearn Live Sessions',
    supportEmail: 'support@example.test',
    language: 'ar',
    maintenance: false,
    notifications: true,
  },
};

// قراءة البيانات: إذا في نسخة محفوظة بنستخدمها، وإلا بنرجع للبيانات الأولية
function loadDb() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    if (saved && typeof saved === 'object') {
      return { ...structuredClone(initialData), ...saved };
    }
  } catch {
    // localStorage ممكن يكون مقفول (وضع التصفح الخفي مثلاً)
  }
  return structuredClone(initialData);
}

function saveDb() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(db));
  } catch {
    // ما في مشكلة، بس التعديلات ما رح تنحفظ
  }
}

// المتغير db متاح لكل ملفات الـ JS اللي بعد هذا الملف
let db = loadDb();
