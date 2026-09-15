/** SLIDE 10: INTERACTIVE COMMAND CENTER DEMO

* Edit English and Arabic text here. Save as UTF-8, then refresh index.html.

* The packaged dashboard is loaded only after the user selects View or Launch.

*/

window.ACCSlides.demo = {

  id: "demo",

  section: 4,

  title: {

    en: "UAE Autonomous Command Center",

    ar: "مركز الإمارات لقيادة الأنظمة ذاتية التشغيل",

  },

  summary: {

    en: "A working command environment combining national 2D and 3D awareness with governed, role-based operational control.",

    ar: "بيئة قيادة تشغيلية توفر رؤية وطنية ثنائية وثلاثية الأبعاد، مع تحكم تشغيلي منضبط وفق صلاحيات كل دور.",

  },

  kicker: {

    en: "INTERACTIVE COMMAND EXPERIENCE",

    ar: "تجربة تفاعلية لمركز القيادة",

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

      title: { en: "Real UAE 2D / 3D scenes", ar: "مشاهد واقعية ثنائية وثلاثية الأبعاد لدولة الإمارات" },

    },

    {

      icon: "drone",

      title: { en: "Air, land and sea operations", ar: "العمليات الجوية والبرية والبحرية" },

    },

    {

      icon: "user-round-check",

      title: { en: "16 governed role views", ar: "16 واجهة تشغيل وفق الأدوار والصلاحيات" },

    },

    {

      icon: "sun",

      title: { en: "English / Arabic and dark / light", ar: "دعم اللغتين العربية والإنجليزية والوضعين الداكن والفاتح" },

    },

  ],

  actions: {

    view: {

      title: { en: "View Dashboard", ar: "عرض لوحة القيادة" },

      detail: { en: "Open over this presentation", ar: "فتح لوحة القيادة ضمن العرض الحالي" },

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

      detail: { en: "All domains and active incidents", ar: "جميع مجالات التشغيل والحوادث النشطة" },

    },

    {

      image: "assets/images/demo/drone-operations.webp",

      label: { en: "Drone operations", ar: "عمليات الطائرات بدون طيار" },

      detail: { en: "Fleet, mission and live evidence", ar: "الأسطول والمهام والأدلة المباشرة" },

    },

    {

      image: "assets/images/demo/digital-twin.webp",

      label: { en: "Federated digital twin", ar: "التوأم الرقمي الموحّد" },

      detail: { en: "Real buildings, terrain and infrastructure", ar: "مبانٍ وتضاريس وبنية تحتية واقعية" },

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

      ar: "حظر المتصفح فتح النافذة الجديدة. اسمح بالنوافذ المنبثقة لهذا العرض ثم حاول مرة أخرى.",

    },

  },

  navLabel: {

    en: "Interactive demo",

    ar: "العرض التفاعلي",

  },

  status: "ready",

};
 