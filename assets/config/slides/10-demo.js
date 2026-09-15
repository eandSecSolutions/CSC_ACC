/** SLIDE 10: INTERACTIVE COMMAND CENTER DEMO
 * Edit English and Arabic text here. Save as UTF-8, then refresh index.html.
 * The packaged dashboard is loaded only after the user selects View or Launch.
 */
window.ACCSlides.demo = {
  id: "demo",
  section: 4,
  title: {
    en: "UAE Autonomous Command Center",
    ar: "مركز القيادة للأنظمة الذاتية في دولة الإمارات",
  },
  summary: {
    en: "A working command environment combining national 2D and 3D awareness with governed, role-based operational control.",
    ar: "بيئة قيادة عملية تجمع بين الوعي الوطني ثنائي وثلاثي الأبعاد والتحكم التشغيلي المحكوم حسب الدور.",
  },
  kicker: {
    en: "INTERACTIVE COMMAND EXPERIENCE",
    ar: "تجربة قيادة تفاعلية",
  },
  ready: {
    en: "DASHBOARD v0.2.9 READY",
    ar: "لوحة القيادة v0.2.9 جاهزة",
  },
  note: {
    en: "Illustrative operational data",
    ar: "بيانات تشغيلية توضيحية",
  },
  capabilities: [
    {
      icon: "layers-3",
      title: { en: "Real UAE 2D / 3D scenes", ar: "مشاهد فعلية ثنائية وثلاثية الأبعاد لدولة الإمارات" },
    },
    {
      icon: "drone",
      title: { en: "Air, land and sea operations", ar: "عمليات الجو والبر والبحر" },
    },
    {
      icon: "user-round-check",
      title: { en: "16 governed role views", ar: "16 واجهة محكومة حسب الدور" },
    },
    {
      icon: "sun",
      title: { en: "English / Arabic and dark / light", ar: "العربية والإنجليزية والوضع الداكن والفاتح" },
    },
  ],
  actions: {
    view: {
      title: { en: "View Dashboard", ar: "عرض لوحة القيادة" },
      detail: { en: "Open over this presentation", ar: "فتح فوق هذا العرض" },
    },
    launch: {
      title: { en: "Launch Dashboard", ar: "تشغيل لوحة القيادة" },
      detail: { en: "Open in a new window", ar: "فتح في نافذة جديدة" },
    },
  },
  screens: [
    {
      image: "assets/images/demo/national-command.webp",
      label: { en: "National operating picture", ar: "الصورة التشغيلية الوطنية" },
      detail: { en: "All domains and active incidents", ar: "جميع المجالات والحوادث النشطة" },
    },
    {
      image: "assets/images/demo/drone-operations.webp",
      label: { en: "Drone operations", ar: "عمليات الطائرات بدون طيار" },
      detail: { en: "Fleet, mission and live evidence", ar: "الأسطول والمهام والأدلة الحية" },
    },
    {
      image: "assets/images/demo/digital-twin.webp",
      label: { en: "Federated digital twin", ar: "التوأم الرقمي الاتحادي" },
      detail: { en: "Real buildings, terrain and infrastructure", ar: "مبانٍ وتضاريس وبنية تحتية فعلية" },
    },
  ],
  overlay: {
    title: { en: "Interactive Command Center", ar: "مركز القيادة التفاعلي" },
    subtitle: { en: "Dashboard v0.2.9", ar: "لوحة القيادة v0.2.9" },
    close: { en: "Close dashboard", ar: "إغلاق لوحة القيادة" },
    popout: { en: "Open in new window", ar: "فتح في نافذة جديدة" },
    loading: { en: "Loading the command environment", ar: "جارٍ تحميل بيئة القيادة" },
    popupBlocked: {
      en: "The browser blocked the new window. Allow pop-ups for this local presentation and try again.",
      ar: "حظر المتصفح النافذة الجديدة. اسمح بالنوافذ المنبثقة لهذا العرض المحلي ثم حاول مرة أخرى.",
    },
  },
  navLabel: {
    en: "Interactive demo",
    ar: "العرض التفاعلي",
  },
  status: "ready",
};
