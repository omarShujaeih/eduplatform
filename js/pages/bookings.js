// =========================================================
// bookings.js — إعدادات صفحة الجلسات والحجوزات
// الجديد هون: حقول type="date" و type="time"
// (المتصفح بيعرض تقويم وساعة جاهزين)
// =========================================================

setupListPage({
  collection: 'bookings',
  filters: [{ id: 'status-filter', field: 'status' }],

  labels: {
    add: 'حجز جلسة جديدة',
    edit: 'تعديل الحجز',
  },

  renderRow: (booking, index) => `
    <tr>
      <td><b>#${booking.id}</b></td>
      <td>${personCell(booking.student, index)}</td>
      <td>${escapeHtml(booking.tutor)}</td>
      <td>${booking.date}</td>
      <td><span class="ltr">${escapeHtml(booking.time)}</span></td>
      <td>${statusBadge(booking.status)}</td>
      <td>${rowActions(booking.id, ['view', 'edit'], 'الجلسة')}</td>
    </tr>`,

  fields: [
    { name: 'student', label: 'الطالب', required: true },
    { name: 'tutor', label: 'المدرّب', required: true },
    { name: 'date', label: 'الموعد', type: 'date', required: true },
    { name: 'time', label: 'الساعة', type: 'time', required: true },
    { name: 'status', label: 'الحالة', type: 'select', options: [['confirmed', 'مؤكد'], ['pending', 'بانتظار التأكيد'], ['canceled', 'ملغي']] },
  ],

  formDefaults: () => ({ date: today(), time: '16:00', status: 'pending' }),
  newDefaults: () => ({}),

  fieldLabels: {
    id: 'رقم الجلسة',
    student: 'الطالب',
    tutor: 'المدرّب',
    date: 'الموعد',
    time: 'الساعة',
    status: 'الحالة',
  },

  updateStats: pendingStats('bookings'),
});
