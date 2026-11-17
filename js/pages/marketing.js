// =========================================================
// marketing.js — صفحة لوحة التسويق
//
// 1) الكروت الأربعة
// 2) رسم صافي الربح + أزرار الشهر/السنة + صناديق الأرباح
// 3) دائرة أنواع الفصول
// 4) الجداول الخمسة + زر "إظهار المزيد"
//
// بيعتمد على: data.js، main.js، charts.js
// =========================================================

// أرقام التسويق للعرض فقط، فبناخدها دايماً من البيانات الأصلية
const mk = initialData.marketing;

// كم صف بيظهر بكل جدول قبل "إظهار المزيد"
const VISIBLE_ROWS = 5;


// =========================================================
// 1) الكروت
// كل عنصر عليه data-card="..." بياخد الرقم المقابل من mk.cards
// =========================================================
$$('[data-card]').forEach((el) => {
  el.textContent = mk.cards[el.dataset.card];
});


// =========================================================
// 2) رسم صافي الربح
// =========================================================
function drawProfit(range) {
  const { points, labels } = mk.profit[range];
  $('#profit-chart').innerHTML = lineChartSvg(points, labels, {
    id: 'profitFade',
    label: 'إحصائيات صافي الربح بدون ضريبة',
  });
}

// أزرار الشهر / السنة (نفس فكرة الداشبورد)
const profitButtons = $$('#profit-range button');
profitButtons.forEach((button) => {
  button.addEventListener('click', () => {
    profitButtons.forEach((b) => b.classList.remove('selected'));
    button.classList.add('selected');
    drawProfit(button.dataset.range);
  });
});

drawProfit('year');

// صناديق الأرباح الأربعة
// formatMoney و changeBadge صاروا بـ main.js لأن الداشبورد بيستعملهم كمان
$('#earnings').innerHTML = mk.earnings
  .map((e) => `
    <div class="earning-box">
      <small>${escapeHtml(e.label)}</small>
      <strong class="ltr">${formatMoney(e.value)}</strong>
      ${changeBadge(e.change)}
    </div>`)
  .join('');


// =========================================================
// 3) دائرة أنواع الفصول
// بالداشبورد الدائرة كانت ثابتة بالـ CSS. هون بنحسبها من البيانات:
// donutGradient (من charts.js) بتحوّل الأرقام لـ conic-gradient
// =========================================================
const totalClasses = mk.classTypes.reduce((sum, t) => sum + t.value, 0);

$('#types-donut').style.background = donutGradient(mk.classTypes);
$('#types-total').textContent = totalClasses;

$('#types-legend').innerHTML = mk.classTypes
  .map((t) => {
    const percent = Math.round((t.value / totalClasses) * 100);
    return `
      <div>
        <span><i class="legend-marker" style="background: ${t.color}"></i> ${escapeHtml(t.label)}</span>
        <b>${percent}%</b>
      </div>`;
  })
  .join('');


// =========================================================
// 4) الجداول
// fillTable بتعبّي <tbody> من مصفوفة، وأي صف بعد الخامس
// بياخد class="extra-row" (مخفي لحد ما نضغط "إظهار المزيد")
// =========================================================
function fillTable(tbodyId, rows, renderRow) {
  const tbody = $(`#${tbodyId}`);
  tbody.innerHTML = rows
    .map((row, index) => {
      const html = renderRow(row, index);
      // بنضيف الـ class على <tr> للصفوف الزيادة
      return index >= VISIBLE_ROWS ? html.replace('<tr>', '<tr class="extra-row">') : html;
    })
    .join('');

  // إذا الصفوف 5 أو أقل، ما في داعي لزر "إظهار المزيد"
  const card = tbody.closest('.paper');
  const moreBtn = $('[data-more]', card);
  if (rows.length <= VISIBLE_ROWS) moreBtn.hidden = true;
}

// --- الفصول الأكثر مبيعاً ---
fillTable('top-classes', mk.topClasses, (c) => `
  <tr>
    <td><span class="rank">${c.id}</span></td>
    <td>
      <div class="cell-title">
        ${escapeHtml(c.title)}
        <small>${escapeHtml(c.type)}</small>
      </div>
    </td>
    <td>${c.sales}</td>
    <td><span class="income ltr">${formatMoney(c.income)}</span></td>
  </tr>`);

// --- الجلسات الأكثر مبيعاً ---
fillTable('top-sessions', mk.topSessions, (s, i) => `
  <tr>
    <td><span class="rank">${s.id}</span></td>
    <td>${personCell(s.consultant, i)}</td>
    <td>${s.sales}</td>
    <td><span class="income ltr">${formatMoney(s.income)}</span></td>
  </tr>`);

// --- المعلمون والبوابات: نفس الأعمدة، فبنستعمل نفس الدالة ---
const durationRow = (p, i) => `
  <tr>
    <td><span class="rank">${p.id}</span></td>
    <td>${personCell(p.name, i)}</td>
    <td><span class="ltr">${escapeHtml(p.duration)}</span> ساعة</td>
    <td>${p.sales}</td>
    <td><span class="income ltr">${formatMoney(p.income)}</span></td>
  </tr>`;

fillTable('top-tutors', mk.topTutors, durationRow);
fillTable('top-organizations', mk.topOrganizations, durationRow);

// --- الطلاب الأكثر نشاطاً ---
fillTable('active-students', mk.activeStudents, (s, i) => `
  <tr>
    <td><span class="rank">${s.id}</span></td>
    <td>${personCell(s.name, i)}</td>
    <td>${s.classes}</td>
    <td>${s.sessions}</td>
    <td><span class="income ltr">${formatMoney(s.total)}</span></td>
  </tr>`);


// --- زر "إظهار المزيد / إظهار أقل" ---
// classList.toggle بيضيف "expanded" على الكرت أو بيشيلها
$$('[data-more]').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.paper');
    const expanded = card.classList.toggle('expanded');
    button.lastChild.textContent = expanded ? ' إظهار أقل' : ' إظهار المزيد';
    button.setAttribute('aria-expanded', String(expanded));
  });
});


// =========================================================
// 5) زر "تصدير": بينزّل جدول الفصول الأكثر مبيعاً كملف CSV
// =========================================================
$('#export-marketing').addEventListener('click', () => {
  downloadCsv(mk.topClasses, `marketing-top-classes-${today()}.csv`);
  toast('تم تصدير الفصول الأكثر مبيعاً CSV');
});
