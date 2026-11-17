// =========================================================
// tutors.js — إعدادات صفحة المدرّبين
// =========================================================

setupListPage({
  collection: 'tutors',
  filters: [{ id: 'status-filter', field: 'status' }],

  labels: {
    add: 'إضافة مدرّب جديد',
    edit: 'تعديل بيانات المدرّب',
  },

  renderRow: (tutor, index) => `
    <tr>
      <td>${personCell(tutor.name, index)}</td>
      <td>${escapeHtml(tutor.specialty)}</td>
      <td>${tutor.courses}</td>
      <td><b class="rating">★ ${escapeHtml(tutor.rating)}</b></td>
      <td>${statusBadge(tutor.status)}</td>
      <td>${rowActions(tutor.id, ['view', 'edit'], 'المدرّب')}</td>
    </tr>`,

  fields: [
    { name: 'name', label: 'اسم المدرّب', required: true },
    { name: 'specialty', label: 'التخصص', required: true },
    { name: 'status', label: 'الحالة', type: 'select', options: [['active', 'نشط'], ['pending', 'قيد المراجعة'], ['inactive', 'غير نشط']] },
  ],

  formDefaults: () => ({ status: 'active' }),
  // مدرّب جديد: ما عنده دورات ولا تقييم لسا
  newDefaults: () => ({ courses: 0, rating: '—' }),

  fieldLabels: {
    id: 'الرقم',
    name: 'الاسم',
    specialty: 'التخصص',
    courses: 'عدد الدورات',
    rating: 'التقييم',
    status: 'الحالة',
  },

  updateStats: pendingStats('tutors'),
});
