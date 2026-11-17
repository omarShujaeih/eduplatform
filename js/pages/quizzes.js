// =========================================================
// quizzes.js — إعدادات صفحة الاختبارات
// نفس فكرة courses.js بالضبط: بنعطي list-page.js الإعدادات وهو بيكمّل.
// الجديد هون: حقل "الشهادة" (true/false) و beforeSave
// =========================================================

setupListPage({
  collection: 'quizzes',

  // فلتر واحد بس: الحالة
  filters: [{ id: 'status-filter', field: 'status' }],

  labels: {
    add: 'إنشاء اختبار جديد',
    edit: 'تعديل الاختبار',
  },

  renderRow: (quiz, index) => `
    <tr>
      <td>
        <div class="cell-title">
          ${escapeHtml(quiz.title)}
          <small>اختبار #${quiz.id}</small>
        </div>
      </td>
      <td>${escapeHtml(quiz.course)}</td>
      <td>${personCell(quiz.tutor, index)}</td>
      <td>${quiz.questions}</td>
      <td>${quiz.students}</td>
      <td><b>${quiz.score}%</b></td>
      <!-- الشهادة: ✓ أو شرطة -->
      <td>${quiz.certificate ? icon('check', 'i-sm') : '—'}</td>
      <td>${statusBadge(quiz.status)}</td>
      <td>${rowActions(quiz.id, ['view', 'edit', 'delete'], 'الاختبار')}</td>
    </tr>`,

  fields: [
    { name: 'title', label: 'اسم الاختبار', required: true },
    { name: 'course', label: 'الدورة المرتبطة', required: true },
    { name: 'tutor', label: 'المدرّب', required: true },
    { name: 'questions', label: 'عدد الأسئلة', type: 'number', attrs: 'min="1" max="1000"' },
    { name: 'score', label: 'متوسط الدرجة (%)', type: 'number', attrs: 'min="0" max="100"' },
    { name: 'status', label: 'الحالة', type: 'select', options: [['active', 'نشط'], ['inactive', 'غير نشط']] },
    // قيم الـ select دايماً نصوص، فبنستعمل 'true' و 'false' كنص
    { name: 'certificate', label: 'تفعيل شهادة', type: 'select', options: [['true', 'نعم'], ['false', 'لا']] },
  ],

  formDefaults: () => ({ questions: 5, score: 0, status: 'active', certificate: false }),
  newDefaults: () => ({ students: 0 }),

  // قبل الحفظ: نحوّل النص 'true' لقيمة منطقية true (Boolean)
  beforeSave(values) {
    values.certificate = values.certificate === 'true';
  },

  fieldLabels: {
    id: 'الرقم',
    title: 'العنوان',
    course: 'الدورة',
    tutor: 'المدرّب',
    questions: 'الأسئلة',
    students: 'الطلاب',
    score: 'متوسط الدرجات',
    status: 'الحالة',
    certificate: 'الشهادة',
  },

  updateStats() {
    const quizzes = db.quizzes;
    const stats = {
      total: quizzes.length,
      active: quizzes.filter((q) => q.status === 'active').length,
      certificates: quizzes.filter((q) => q.certificate).length,
      attempts: quizzes.reduce((sum, q) => sum + Number(q.students), 0),
    };
    $$('[data-stat]').forEach((el) => (el.textContent = stats[el.dataset.stat]));
  },
});
