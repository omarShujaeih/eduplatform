// =========================================================
// courses.js — إعدادات صفحة الدورات
//
// كل "الشغل الثقيل" (بحث، فلترة، ترقيم، نوافذ، حفظ، حذف)
// موجود بـ list-page.js. هون بس بنحكيله:
//   - شو اسم البيانات         collection
//   - شو الفلاتر               filters
//   - كيف يرسم الصف            renderRow
//   - شو حقول النموذج          fields
//   - شو القيم الافتراضية      formDefaults / newDefaults
// =========================================================


// التصنيفات: مصدر واحد للفلتر وللنموذج
const COURSE_CATEGORIES = ['لغة', 'أسلوب الحياة', 'تصميم', 'علم', 'مجال الاتصالات', 'استراتيجية العمل'];

// نعبّي قائمة فلتر التصنيف
// insertAdjacentHTML('beforeend') = أضف بآخر العنصر بدون ما تمسح اللي فيه
$('#category-filter').insertAdjacentHTML(
  'beforeend',
  COURSE_CATEGORIES.map((c) => `<option value="${c}">${c}</option>`).join('')
);


setupListPage({

  // اسم المصفوفة بـ data.js  ←  db.courses
  collection: 'courses',

  // كل فلتر: id القائمة بالـ HTML + اسم الحقل بالبيانات
  filters: [
    { id: 'status-filter', field: 'status' },
    { id: 'category-filter', field: 'category' },
  ],

  // عناوين النوافذ
  labels: {
    add: 'إضافة دورة جديدة',
    edit: 'تعديل الدورة',
  },

  // شكل الصف الواحد بالجدول (نفس ترتيب أعمدة <thead>)
  renderRow: (course, index) => `
    <tr>
      <td>
        <div class="cell-title">
          ${escapeHtml(course.title)}
          <small>#${course.id} • ${course.lessons} درس</small>
        </div>
      </td>
      <td>${personCell(course.tutor, index)}</td>
      <td><span class="pill gray">${escapeHtml(course.category)}</span></td>
      <td><b>${money(course.price)}</b></td>
      <td>${course.students}</td>
      <td>${statusBadge(course.status)}</td>
      <td>${rowActions(course.id, ['view', 'edit', 'delete'], 'الدورة')}</td>
    </tr>`,

  // حقول نموذج الإضافة/التعديل
  // attrs = خصائص HTML إضافية (المتصفح بيفحصها قبل الحفظ)
  fields: [
    { name: 'title', label: 'عنوان الدورة', required: true, attrs: 'maxlength="140"' },
    { name: 'category', label: 'التصنيف', type: 'select', options: COURSE_CATEGORIES.map((c) => [c, c]) },
    { name: 'tutor', label: 'اسم المدرّب', required: true },
    { name: 'price', label: 'السعر بالدولار', type: 'number', attrs: 'min="0" step="0.01"' },
    { name: 'lessons', label: 'عدد الدروس', type: 'number', attrs: 'min="1" max="999"' },
    { name: 'status', label: 'الحالة', type: 'select', options: [['draft', 'مسودة'], ['published', 'منشور']] },
  ],

  // القيم اللي بتظهر بالنموذج الفاضي
  formDefaults: () => ({ category: 'لغة', price: 0, lessons: 1, status: 'draft' }),

  // قيم بتنضاف للدورة الجديدة بس مش موجودة بالنموذج
  newDefaults: () => ({ students: 0, date: today() }),

  // أسماء الحقول بالعربي لنافذة "التفاصيل"
  fieldLabels: {
    id: 'الرقم',
    title: 'العنوان',
    category: 'التصنيف',
    tutor: 'المدرّب',
    price: 'السعر',
    students: 'الطلاب',
    lessons: 'الدروس',
    status: 'الحالة',
    date: 'التاريخ',
  },

  // الأرقام فوق الفلاتر (بتنحسب من جديد بعد كل تغيير)
  updateStats() {
    const courses = db.courses;
    const stats = {
      total: courses.length,
      published: courses.filter((c) => c.status === 'published').length,
      drafts: courses.filter((c) => c.status === 'draft').length,
      // reduce بتجمع كل الأرقام: 0 + 3 + 5 + 1 ...
      students: courses.reduce((sum, c) => sum + Number(c.students), 0),
    };
    $$('[data-stat]').forEach((el) => (el.textContent = stats[el.dataset.stat]));
  },
});
