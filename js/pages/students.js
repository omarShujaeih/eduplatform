// =========================================================
// students.js — إعدادات صفحة الطلاب
// =========================================================

setupListPage({
  collection: 'students',
  filters: [{ id: 'status-filter', field: 'status' }],

  labels: {
    add: 'إضافة طالب جديد',
    edit: 'تعديل بيانات الطالب',
  },

  renderRow: (student, index) => `
    <tr>
      <td>${personCell(student.name, index)}</td>
      <!-- الإيميل إنجليزي، فبنخلّيه يتقرأ من اليسار -->
      <td><span class="ltr" dir="ltr">${escapeHtml(student.email)}</span></td>
      <td>${student.courses}</td>
      <td>${student.joined}</td>
      <td>${statusBadge(student.status)}</td>
      <td>${rowActions(student.id, ['view', 'edit'], 'الطالب')}</td>
    </tr>`,

  fields: [
    { name: 'name', label: 'اسم الطالب', required: true },
    // type="email" = المتصفح بيفحص صيغة الإيميل
    { name: 'email', label: 'البريد الإلكتروني', type: 'email', required: true },
    { name: 'status', label: 'الحالة', type: 'select', options: [['active', 'نشط'], ['pending', 'قيد المراجعة'], ['inactive', 'غير نشط']] },
  ],

  formDefaults: () => ({ status: 'active' }),
  newDefaults: () => ({ courses: 0, joined: today() }),

  fieldLabels: {
    id: 'الرقم',
    name: 'الاسم',
    email: 'البريد',
    courses: 'الدورات المسجلة',
    joined: 'تاريخ الانضمام',
    status: 'الحالة',
  },

  // pendingStats موجودة بـ list-page.js (المجموع + كم واحد بانتظار المراجعة)
  updateStats: pendingStats('students'),
});
