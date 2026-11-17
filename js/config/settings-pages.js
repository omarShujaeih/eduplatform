// =========================================================
// config/settings-pages.js — صفحات الإعدادات الإضافية
// باللوحة الحقيقية: General, Financial, Personalization, Notifications, SEO, Customization
// - General         ← settings.html (موجودة من قبل)
// - Personalization ← appearance.html (موجودة من قبل)
// - والأربعة الباقيين هون
// =========================================================

const SET = 'الإعدادات';

PAGES['settings-financial'] = {
  kind: 'form', section: SET, title: 'الإعدادات المالية', sub: 'العمولات والضرائب وطرق الدفع',
  sections: [
    { title: 'العمولات', fields: [
      { name: 'commission', label: 'عمولة المنصة من المعلم (%)', type: 'number', value: 10 },
      { name: 'tax', label: 'الضريبة (%)', type: 'number', value: 16 },
      { name: 'minPayout', label: 'أقل مبلغ للسحب ($)', type: 'number', value: 50 },
      { name: 'currency', label: 'العملة', type: 'select', options: ['USD', 'ILS', 'JOD', 'EUR'], value: 'USD' },
    ] },
    { title: 'طرق الدفع', fields: [
      { name: 'online', label: 'الدفع الإلكتروني (بطاقات)', type: 'switch', value: true },
      { name: 'offline', label: 'التحويل البنكي (أوفلاين)', type: 'switch', value: true },
      { name: 'wallet', label: 'الدفع من رصيد الحساب', type: 'switch', value: true },
    ] },
  ],
};

PAGES['settings-notifications'] = {
  kind: 'form', section: SET, title: 'إعدادات الإشعارات', sub: 'أي أحداث بتبعت إشعار أو إيميل',
  sections: [
    { title: 'إشعارات المستخدمين', fields: [
      { name: 'newSale', label: 'مبيعة جديدة (للمعلم)', type: 'switch', value: true },
      { name: 'newComment', label: 'تعليق جديد على الفصل', type: 'switch', value: true },
      { name: 'courseApproved', label: 'قبول أو رفض الدورة', type: 'switch', value: true },
      { name: 'sessionReminder', label: 'تذكير قبل الجلسة', type: 'switch', value: true },
    ] },
    { title: 'إشعارات المدير', fields: [
      { name: 'newTicket', label: 'تذكرة دعم جديدة', type: 'switch', value: true },
      { name: 'newPayout', label: 'طلب سحب جديد', type: 'switch', value: true },
      { name: 'newReport', label: 'بلاغ جديد', type: 'switch', value: false },
      { name: 'adminEmail', label: 'إيميل المدير', type: 'email', value: 'admin@example.test' },
    ] },
  ],
};

PAGES['settings-seo'] = {
  kind: 'form', section: SET, title: 'تحسين محركات البحث (SEO)', sub: 'عناوين ووصف الصفحات بنتائج جوجل',
  sections: [
    { title: 'الصفحة الرئيسية', fields: [
      { name: 'homeTitle', label: 'عنوان الصفحة', value: 'Micro Learn — منصة تعليمية', wide: true },
      { name: 'homeDescription', label: 'الوصف', type: 'textarea', value: 'دورات وجلسات مباشرة مع أفضل المعلمين.' },
    ] },
    { title: 'صفحة الدورات', fields: [
      { name: 'classesTitle', label: 'عنوان الصفحة', value: 'كل الدورات — Micro Learn', wide: true },
      { name: 'classesDescription', label: 'الوصف', type: 'textarea', value: 'تصفّح الدورات حسب القسم والمستوى.' },
    ] },
    { title: 'الفهرسة', fields: [
      { name: 'robots', label: 'السماح لمحركات البحث بالفهرسة', type: 'switch', value: true },
    ] },
  ],
};

PAGES['settings-customization'] = {
  kind: 'form', section: SET, title: 'التخصيص المتقدم', sub: 'كود CSS وJS إضافي للموقع',
  sections: [
    { title: 'كود مخصص', fields: [
      { name: 'customCss', label: 'CSS مخصص', type: 'textarea', value: '/* مثال: */\n.header { }' },
      { name: 'customJs', label: 'JavaScript مخصص (بالـ head)', type: 'textarea', value: '' },
    ] },
  ],
  note: 'الكود المخصص بالنسخة الحقيقية بينضاف لكل صفحات الموقع. هون بينحفظ بس.',
};
