// =========================================================
// orders.js — إعدادات صفحة الطلبات والمدفوعات
// =========================================================

setupListPage({
  collection: 'orders',
  filters: [{ id: 'status-filter', field: 'status' }],

  labels: {
    add: 'تسجيل طلب جديد',
    edit: 'تعديل الطلب',
  },

  renderRow: (order, index) => `
    <tr>
      <td><b>#${order.id}</b></td>
      <td>${personCell(order.student, index)}</td>
      <td>${escapeHtml(order.item)}</td>
      <td><b>${money(order.amount)}</b></td>
      <td>${order.date}</td>
      <td>${statusBadge(order.status)}</td>
      <td>${rowActions(order.id, ['view', 'edit'], 'الطلب')}</td>
    </tr>`,

  fields: [
    { name: 'student', label: 'اسم الطالب', required: true },
    { name: 'item', label: 'الخدمة أو الدورة', required: true },
    { name: 'amount', label: 'المبلغ بالدولار', type: 'number', attrs: 'min="0" step="0.01"' },
    { name: 'status', label: 'الحالة', type: 'select', options: [['paid', 'مدفوع'], ['pending', 'بانتظار الدفع'], ['refunded', 'مسترد']] },
  ],

  formDefaults: () => ({ amount: 0, status: 'pending' }),
  newDefaults: () => ({ date: today() }),

  fieldLabels: {
    id: 'رقم الطلب',
    student: 'الطالب',
    item: 'الخدمة / الدورة',
    amount: 'المبلغ',
    status: 'الحالة',
    date: 'التاريخ',
  },

  updateStats: pendingStats('orders'),
});
