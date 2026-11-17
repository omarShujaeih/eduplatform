// =========================================================
// charts.js — رسومات بيانية بدون مكتبات (SVG + CSS)
//
// كانت دالة الرسم جوّا dashboard.js. لما صفحة التسويق احتاجت
// نفس الرسم، نقلناها لهون عشان الصفحتين يستعملوها (Refactoring).
//
// الدوال:
//   lineChartSvg(points, labels, options)  ← بترجع كود SVG لخط بياني
//   donutGradient(segments)                ← بترجع conic-gradient لدائرة
// =========================================================


// ---------------------------------------------------------
// خط بياني
// points = [18, 25, 20, ...]   الأرقام
// labels = ['يناير', ...]      العناوين تحت كل نقطة
// options.id = اسم فريد للتدرج اللوني (لو في أكثر من رسم بنفس الصفحة)
// options.label = وصف الرسم لقارئ الشاشة
// ---------------------------------------------------------
function lineChartSvg(points, labels, options = {}) {
  const gradientId = options.id || 'chartFade';

  // أبعاد منطقة الرسم
  const width = 690;     // العرض
  const bottom = 184;    // خط الصفر (من فوق)
  const plotHeight = 154;

  // أعلى قيمة = أكبر رقم + 15% مسافة فوقه (وأقل شي 1 عشان ما نقسم على صفر)
  const maxValue = Math.max(1, ...points) * 1.15;

  // المسافة الأفقية بين كل نقطتين
  const step = width / (points.length - 1);

  // نحوّل كل رقم لإحداثيات (x, y)
  // بالـ SVG محور y بيزيد لتحت، فبنطرح من bottom
  const coords = points.map((value, i) => [
    i * step,
    bottom - (value / maxValue) * plotHeight,
  ]);

  // نقاط الخط: "x1,y1 x2,y2 ..."
  const linePoints = coords.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

  // المساحة المعبّاة تحت الخط: النقاط + نرجع لخط الصفر ونسكّر الشكل (Z)
  const areaPath = `M ${coords.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ')} L ${width} ${bottom} L 0 ${bottom} Z`;

  // خطوط الشبكة الأفقية المنقطة
  const gridLines = [30, 74, 118, 162]
    .map((y) => `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="#eaf1f2" stroke-dasharray="4 5" />`)
    .join('');

  // دائرة صغيرة على كل نقطة
  const dots = coords
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#fff" stroke="var(--brand)" stroke-width="2" />`)
    .join('');

  // العناوين تحت النقاط
  const labelTexts = labels
    .map((text, i) => `<text x="${i * step}" y="217" font-family="Cairo, Tahoma" font-size="10" fill="#94a6ad" text-anchor="middle">${escapeHtml(text)}</text>`)
    .join('');

  // viewBox = نظام إحداثيات داخلي، فالرسم بيتمدد مع أي عرض
  // <g transform="translate(30,6)"> = بنزيح الرسم شوي عشان العناوين على الأطراف ما تنقص
  return `
    <svg class="sales-chart" viewBox="0 0 740 240" role="img" aria-label="${escapeHtml(options.label || 'رسم بياني')}">
      <defs>
        <linearGradient id="${gradientId}" x1="0" x2="0" y1="0" y2="1">
          <stop stop-color="#27a9b5" stop-opacity=".24" />
          <stop offset="1" stop-color="#27a9b5" stop-opacity=".015" />
        </linearGradient>
      </defs>
      <g transform="translate(30,6)">
        ${gridLines}
        <path d="${areaPath}" fill="url(#${gradientId})" />
        <polyline points="${linePoints}" fill="none" stroke="var(--brand)" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" />
        ${dots}
        ${labelTexts}
      </g>
    </svg>`;
}


// ---------------------------------------------------------
// دائرة (Donut) من أرقام
// segments = [{ value: 8, color: '#0b7186' }, { value: 9, color: '#ffcf24' }, ...]
// بترجع: conic-gradient(#0b7186 0% 47%, #ffcf24 47% 100%)
//
// الفكرة: كل جزء بيبدأ من حيث خلص اللي قبله.
// بنحوّل كل قيمة لنسبة مئوية من المجموع، وبنجمعهم واحد ورا الثاني.
// ---------------------------------------------------------
function donutGradient(segments) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  let start = 0;

  const stops = segments.map((segment) => {
    const end = start + (segment.value / total) * 100;
    const stop = `${segment.color} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
    start = end;
    return stop;
  });

  return `conic-gradient(${stops.join(', ')})`;
}
