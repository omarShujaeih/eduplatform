// =========================================================
// icons.js — كل أيقونات المنصة (SVG Sprite)
//
// ليش بملف JS ومش ملف icons.svg؟
// لما تفتح الصفحة بدبل كليك (file://)، المتصفح بيمنع
// <use href="assets/icons.svg#book"> يقرأ من ملف ثاني لأسباب أمان،
// فالأيقونات بتطلع فاضية. الحل: نحط الأيقونات جوّا الصفحة نفسها.
//
// كيف بيشتغل؟
// 1) هذا الملف بيتحمّل أول شي بعد <body> (بدون defer)
// 2) بيضيف <svg> مخفي فيه كل الـ <symbol> لأول الصفحة
// 3) أي أيقونة بالصفحة بتستدعي الرمز بالـ id:
//      <svg class="i"><use href="#book"></use></svg>
//
// أيقونة جديدة؟ ضيف <symbol id="الاسم" viewBox="0 0 24 24">...</symbol> هون
// =========================================================

const ICON_SPRITE = `
<svg xmlns="http://www.w3.org/2000/svg" style="display: none" aria-hidden="true">
  <symbol id="grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></symbol>
  <symbol id="book" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></symbol>
  <symbol id="quiz" viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4.5V2h6v2.5M9 10h6M9 14h6M9 18h3"/></symbol>
  <symbol id="users" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></symbol>
  <symbol id="tutor" viewBox="0 0 24 24"><path d="M3 9l9-5 9 5-9 5-9-5zM7 12v5c3.3 2.8 6.7 2.8 10 0v-5M21 10v7"/></symbol>
  <symbol id="wallet" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 9h18M16 15h2"/></symbol>
  <symbol id="calendar" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/></symbol>
  <symbol id="palette" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="7" cy="11" r="1"/><circle cx="11" cy="7" r="1"/><circle cx="16" cy="9" r="1"/><path d="M14 18c-2 0-3-2-2-3.4 1-1.7 2.8-2.3 4-1.5 2.4 1.6 1 4.9-2 4.9z"/></symbol>
  <symbol id="settings" viewBox="0 0 24 24"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.12 2.12-.06-.06a1.7 1.7 0 0 0-1.88-.34l-.05.02a1.7 1.7 0 0 0-1.02 1.55V21h-3v-.77a1.7 1.7 0 0 0-1.02-1.55l-.05-.02a1.7 1.7 0 0 0-1.88.34l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 0 0 6.94 15a1.7 1.7 0 0 0-1.55-1.02H4v-3h1.39A1.7 1.7 0 0 0 6.94 9.9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.12-2.12.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.02-1.55V4h3v.69a1.7 1.7 0 0 0 1.02 1.55 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.12 2.12-.06.06A1.7 1.7 0 0 0 19.4 9.9a1.7 1.7 0 0 0 1.55 1.02H22v3h-1.05A1.7 1.7 0 0 0 19.4 15z"/></symbol>
  <symbol id="search" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="7"/><path d="m16 16 5 5"/></symbol>
  <symbol id="bell" viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></symbol>
  <symbol id="chevron" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></symbol>
  <symbol id="down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
  <symbol id="plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
  <symbol id="download" viewBox="0 0 24 24"><path d="M12 3v12m-4-4 4 4 4-4M4 17v4h16v-4"/></symbol>
  <symbol id="upload" viewBox="0 0 24 24"><path d="M12 16V3m-5 5 5-5 5 5M4 17v4h16v-4"/></symbol>
  <symbol id="filter" viewBox="0 0 24 24"><path d="M4 7h16M7 12h10M10 17h4"/></symbol>
  <symbol id="dots" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></symbol>
  <symbol id="more" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></symbol>
  <symbol id="edit" viewBox="0 0 24 24"><path d="M12 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-6"/><path d="m16 5 3 3M10 14l9-9 2 2-9 9-4 1z"/></symbol>
  <symbol id="trash" viewBox="0 0 24 24"><path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15M10 10v7M14 10v7"/></symbol>
  <symbol id="eye" viewBox="0 0 24 24"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></symbol>
  <symbol id="arrow" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></symbol>
  <symbol id="check" viewBox="0 0 24 24"><path d="m5 12 4 4 10-10"/></symbol>
  <symbol id="close" viewBox="0 0 24 24"><path d="m5 5 14 14M19 5 5 19"/></symbol>
  <symbol id="clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
  <symbol id="chart" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="m7 16 4-5 3 2 5-7"/></symbol>
  <symbol id="globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a16 16 0 0 1 0 18M12 3a16 16 0 0 0 0 18"/></symbol>
  <symbol id="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></symbol>
  <symbol id="moon" viewBox="0 0 24 24"><path d="M20 14a8 8 0 0 1-10-10 8 8 0 1 0 10 10z"/></symbol>
  <symbol id="menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>
  <symbol id="logout" viewBox="0 0 24 24"><path d="M10 17l5-5-5-5M15 12H3M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7"/></symbol>
  <symbol id="sparkles" viewBox="0 0 24 24"><path d="m12 2 2 7 7 3-7 2-2 8-2-8-7-2 7-3 2-7z"/></symbol>
  <symbol id="message" viewBox="0 0 24 24"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 1 1 16.1-4z"/></symbol>
  <symbol id="refresh" viewBox="0 0 24 24"><path d="M21 3v6h-6M3 21v-6h6M5 9a8 8 0 0 1 13.6-3.6L21 9M3 15l2.4 3.6A8 8 0 0 0 19 15"/></symbol>
  <symbol id="help" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4M12 17h.01"/></symbol>
  <symbol id="star" viewBox="0 0 24 24"><path d="m12 2 3.1 6.3 7 1-5 4.9 1.2 7-6.3-3.3L5.7 21l1.2-7-5-4.9 7-1L12 2z"/></symbol>
  <symbol id="lock" viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="12" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></symbol>
  <symbol id="mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></symbol>
  <symbol id="megaphone" viewBox="0 0 24 24"><path d="M3 11v3a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M17 8.5a5 5 0 0 1 0 7M8 15v4a1 1 0 0 0 1 1h1.5"/></symbol>
  <symbol id="tag" viewBox="0 0 24 24"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></symbol>
  <symbol id="trend" viewBox="0 0 24 24"><path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/></symbol>
  <symbol id="sliders" viewBox="0 0 24 24"><path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2" fill="currentColor" stroke="none"/><circle cx="16" cy="17" r="2" fill="currentColor" stroke="none"/></symbol>
  <symbol id="home" viewBox="0 0 24 24"><path d="M3 11 12 3l9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/></symbol>
  <symbol id="award" viewBox="0 0 24 24"><circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/></symbol>
  <symbol id="bag" viewBox="0 0 24 24"><path d="M5 8h14l-1 13H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></symbol>
  <symbol id="file" viewBox="0 0 24 24"><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></symbol>
  <symbol id="pin" viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></symbol>
  <symbol id="shield" viewBox="0 0 24 24"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z"/><path d="m9 12 2 2 4-4"/></symbol>
  <symbol id="layers" viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5"/></symbol>
  <symbol id="flag" viewBox="0 0 24 24"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></symbol>
  <symbol id="video" viewBox="0 0 24 24"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/></symbol>
  <symbol id="gift" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v8h14v-8M12 8v13M12 8S10 3 7.5 4.5 9 8 12 8zm0 0s2-5 4.5-3.5S15 8 12 8z"/></symbol>
  <symbol id="percent" viewBox="0 0 24 24"><path d="M19 5 5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/></symbol>
  <symbol id="link" viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1"/><path d="M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/></symbol>
  <symbol id="image" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/></symbol>
  <symbol id="clipboard" viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 11l2 2 4-4"/></symbol>
</svg>`;

// afterbegin = بأول <body>، قبل كل المحتوى
document.body.insertAdjacentHTML('afterbegin', ICON_SPRITE);
