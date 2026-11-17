// =========================================================
// dashboard.js — كود صفحة لوحة التحكم (index.html) فقط
// الأقسام نفس لوحة itutor24.com/admin الحقيقية + أقسامنا:
//
// 1) الأرقام (data-stat)
// 2) كروت الملخص الثلاثة
// 3) رسم المبيعات + صناديق اليوم/الأسبوع/الشهر/السنة
// 4) القوائم: التعليقات، التذاكر، الفصول المباشرة، الفصول الأخيرة
// 5) رسم تسجيل المستخدمين
// 6) جدول أحدث الدورات
// 7) الأزرار (تصدير، مسح الكاش)
//
// بيعتمد على: data.js، main.js، charts.js
// =========================================================

// أرقام الداشبورد للعرض فقط، فبناخدها من البيانات الأصلية
const dash = initialData.dashboard;


// =========================================================
// 1) الأرقام: أي عنصر عليه data-stat بياخد قيمته من هون
// =========================================================
const statValues = {
  ...dash.counts, // newSales, newComments, newTickets, pendingClasses
  courses: db.courses.length,
  published: db.courses.filter((c) => c.status === 'published').length,
  drafts: db.courses.filter((c) => c.status === 'draft').length,
  quizzes: db.quizzes.length,
  awaitingTickets: dash.latestTickets.filter((t) => t.status === 'awaiting_reply').length,
  registrations: dash.registrations.reduce((sum, n) => sum + n, 0),
};

$$('[data-stat]').forEach((el) => {
  el.textContent = statValues[el.dataset.stat];
});


// =========================================================
// 2) كروت الملخص الثلاثة
// summaryCard بتبني كرت: أيقونة + عنوان، أسطر، ومجموع تحت
// =========================================================
function summaryCard({ title, iconName, tint = '', lines, totalLabel, total }) {
  const linesHtml = lines
    .map(([label, value]) => `<div class="summary-line"><span>${escapeHtml(label)}</span><b>${value}</b></div>`)
    .join('');
  return `
    <section class="paper panel summary-card">
      <div class="summary-head">
        <span class="stat-icon ${tint}">${icon(iconName, 'i-lg')}</span>
        <h2 class="panel-title">${escapeHtml(title)}</h2>
      </div>
      ${linesHtml}
      <div class="summary-total">
        <small>${escapeHtml(totalLabel)}</small>
        <strong class="ltr">${total}</strong>
      </div>
    </section>`;
}

const todayTotal = dash.todayByType.reduce((sum, t) => sum + t.value, 0);

$('#summary-cards').innerHTML = [
  summaryCard({
    title: 'مبيعات اليوم',
    iconName: 'wallet',
    lines: dash.todayByType.map((t) => [t.label, t.value]),
    totalLabel: 'مبيعات اليوم',
    total: todayTotal,
  }),
  summaryCard({
    title: 'إجمالي الدخل',
    iconName: 'chart',
    tint: 'gold',
    lines: [
      ['اليوم', formatMoney(dash.income.today)],
      ['الشهر', formatMoney(dash.income.month)],
      ['السنة', formatMoney(dash.income.year)],
    ],
    totalLabel: 'إجمالي الدخل',
    total: formatMoney(dash.income.total),
  }),
  summaryCard({
    title: 'إجمالي المبيعات',
    iconName: 'trend',
    tint: 'purple',
    lines: [
      ['اليوم', dash.sales.today],
      ['الشهر', dash.sales.month],
      ['السنة', dash.sales.year],
    ],
    totalLabel: 'إجمالي المبيعات',
    total: dash.sales.total,
  }),
].join('');


// =========================================================
// 3) رسم المبيعات + الصناديق تحته
// =========================================================
const chartData = {
  week: {
    points: [20, 25, 22, 37, 35, 44, 53],
    labels: ['سبت', 'أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة'],
  },
  month: {
    points: [18, 24, 22, 35, 40, 30, 47, 42, 38, 57, 48, 69],
    labels: ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19', '21', '23'],
  },
  year: {
    points: [18, 25, 20, 39, 33, 49, 43, 57, 51, 64, 59, 78],
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  },
};

// lineChartSvg موجودة بـ js/charts.js
function drawChart(range) {
  const { points, labels } = chartData[range];
  $('#sales-chart').innerHTML = lineChartSvg(points, labels, {
    id: 'salesFade',
    label: 'رسم توضيحي لاتجاه المبيعات',
  });
}

const rangeButtons = $$('#range-switch button');
rangeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    rangeButtons.forEach((b) => b.classList.remove('selected'));
    button.classList.add('selected');
    drawChart(button.dataset.range);
  });
});

drawChart('year');

// صناديق المبيعات (changeBadge من main.js)
$('#sales-boxes').innerHTML = dash.salesBoxes
  .map((box) => `
    <div class="earning-box">
      <small>${escapeHtml(box.label)}</small>
      <strong>${box.value}</strong>
      ${changeBadge(box.change)}
    </div>`)
  .join('');


// =========================================================
// 4) القوائم
// feedItem بتبني عنصر واحد: (أيقونة أو صورة) + نص + شارة اختيارية
// =========================================================
function feedItem({ lead, title, sub, text = '', badge = '' }) {
  return `
    <div class="feed-item">
      ${lead}
      <div class="feed-body">
        <strong>${escapeHtml(title)}</strong>
        <small>${escapeHtml(sub)}</small>
        ${text ? `<p>${escapeHtml(text)}</p>` : ''}
      </div>
      ${badge}
    </div>`;
}

// آخر التعليقات: صورة رمزية + اسم + تاريخ + نص التعليق
$('#comments-feed').innerHTML = dash.latestComments
  .map((c, i) => feedItem({ lead: avatar(c.user, i), title: c.user, sub: c.date, text: c.text }))
  .join('');

// آخر التذاكر: أيقونة + عنوان + صاحب التذكرة + حالتها
$('#tickets-feed').innerHTML = dash.latestTickets
  .map((t) => feedItem({
    lead: `<span class="feed-icon">${icon('mail', 'i-sm')}</span>`,
    title: t.title,
    sub: t.user,
    badge: statusBadge(t.status),
  }))
  .join('');

// آخر الفصول المباشرة
$('#live-feed').innerHTML = dash.latestLiveClasses
  .map((c) => feedItem({
    lead: `<span class="feed-icon">${icon('users', 'i-sm')}</span>`,
    title: c.title,
    sub: c.tutor,
    badge: statusBadge(c.status),
  }))
  .join('');

// الفصول الأخيرة: من بيانات الدورات الحقيقية (بتتحدّث لما تضيف دورة)
$('#classes-feed').innerHTML = db.courses
  .slice(0, 5)
  .map((c) => feedItem({
    lead: `<span class="feed-icon">${icon('book', 'i-sm')}</span>`,
    title: c.title,
    sub: c.tutor,
    badge: statusBadge(c.status),
  }))
  .join('');


// =========================================================
// 5) رسم تسجيل المستخدمين (يوم 01 لـ 31)
// padStart(2, '0') بتحوّل 1 لـ "01"
// =========================================================
$('#users-chart').innerHTML = lineChartSvg(
  dash.registrations,
  dash.registrations.map((_, i) => String(i + 1).padStart(2, '0')),
  { id: 'usersFade', label: 'إحصائيات تسجيل المستخدمين' }
);


// =========================================================
// 6) جدول أحدث الدورات (أول 4)
// =========================================================
$('#recent-courses').innerHTML = db.courses
  .slice(0, 4)
  .map((course, index) => `
    <tr>
      <td>${personCell(course.tutor, index)}</td>
      <td><a class="cell-title" href="courses.html">${escapeHtml(course.title)}</a></td>
      <td>${course.students}</td>
      <td>${money(course.price)}</td>
      <td>${statusBadge(course.status)}</td>
    </tr>`)
  .join('');


// =========================================================
// 7) الأزرار
// =========================================================
$('#export-summary').addEventListener('click', () => {
  downloadCsv(db.courses, `courses-summary-${today()}.csv`);
  toast('تم تصدير ملخص الدورات CSV');
});

// باللوحة الحقيقية الزر بيمسح كاش السيرفر. هون ما في سيرفر، فبس رسالة
$('#clear-cache').addEventListener('click', () => {
  toast('تم مسح ذاكرة التخزين المؤقت (تجريبي)');
});
