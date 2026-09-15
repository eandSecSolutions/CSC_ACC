/** SLIDE 09 — implementation roadmap.

* Focus: government implementation benefit, controlled adoption and readiness gates.

* All proof points below are proposed delivery controls, not achieved results.

*/

window.ACCSlides.roadmap = {

  id: "roadmap",

  section: 3,

  status: "ready",

  navLabel: {

    en: "Roadmap",

    ar: "خارطة الطريق",

  },

  eyebrow: {

    en: "HOW GOVERNMENT IMPLEMENTS",

    ar: "مسار التنفيذ الحكومي",

  },

  title: {

    en: "From Mandate to National Operations",

    ar: "من تحديد الصلاحيات إلى التشغيل على المستوى الوطني",

  },

  summary: {

    en: "A phased government-led path that controls risk, proves operational value, then expands only through agreed readiness gates.",

    ar: "مسار مرحلي تقوده الحكومة لضبط المخاطر وإثبات القيمة التشغيلية، ثم التوسّع وفق معايير جاهزية متفق عليها.",

  },

  ui: {

    automaticJourney: {

      en: "Automatic implementation journey",

      ar: "استعراض تلقائي لمراحل التنفيذ",

    },

    pause: {

      en: "Pause roadmap",

      ar: "إيقاف استعراض خارطة الطريق",

    },

    play: {

      en: "Resume roadmap",

      ar: "استئناف استعراض خارطة الطريق",

    },

    select: {

      en: "Select phase",

      ar: "اختيار المرحلة",

    },

    phase: {

      en: "Phase",

      ar: "المرحلة",

    },

    governmentOutcome: {

      en: "GOVERNMENT OUTCOME",

      ar: "النتيجة المستهدفة للحكومة",

    },

    readinessGate: {

      en: "READINESS GATE",

      ar: "متطلبات الانتقال للمرحلة التالية",

    },

    implementationControls: {

      en: "IMPLEMENTATION CONTROLS",

      ar: "ضوابط التنفيذ",

    },

  },

  phases: [

    {

      id: "mandate",

      icon: "clipboard-check",

      tag: { en: "GOVERN", ar: "الحوكمة" },

      title: { en: "Mandate & Governance", ar: "تحديد الصلاحيات والحوكمة" },

      outcome: {

        en: "Create a single accountable program structure before technology rollout.",

        ar: "إنشاء هيكل موحّد للبرنامج يحدد المسؤوليات بوضوح قبل البدء بتطبيق التقنية.",

      },

      body: {

        en: "Government defines ownership, human command authority, safety policy, data boundaries and participating-entity roles before any operational deployment.",

        ar: "تحدد الحكومة مسؤوليات الملكية وصلاحيات اتخاذ القرار وسياسات السلامة وحدود استخدام البيانات وأدوار الجهات المشاركة قبل بدء أي تشغيل فعلي.",

      },

      gate: {

        en: "Approved charter, operating model and security-by-design baseline.",

        ar: "اعتماد ميثاق البرنامج ونموذج التشغيل والمتطلبات الأمنية الأساسية المضمنة في التصميم.",

      },

      controls: [

        { en: "National mandate", ar: "صلاحيات وطنية محددة" },

        { en: "Human authority", ar: "صلاحيات اتخاذ القرار" },

        { en: "Data boundaries", ar: "ضوابط استخدام البيانات" },

      ],

      overlay: [

        { en: "Charter approved", ar: "اعتماد ميثاق البرنامج" },

        { en: "Policy guardrails", ar: "ضوابط السياسات" },

        { en: "Decision authority", ar: "صلاحيات اتخاذ القرار" },

      ],

    },

    {

      id: "pilot",

      icon: "scan-line",

      tag: { en: "PROVE", ar: "الاختبار" },

      title: { en: "Controlled Pilot & Evidence", ar: "مرحلة تجريبية مضبوطة وقياس النتائج" },

      outcome: {

        en: "Prove safety, integration and operational value in a limited environment.",

        ar: "إثبات السلامة وفعالية الربط بين الأنظمة والقيمة التشغيلية ضمن نطاق محدود.",

      },

      body: {

        en: "A focused pilot validates autonomous dispatch, communications, incident workflow and operator supervision using agreed scenarios and measured baselines.",

        ar: "تختبر المرحلة التجريبية إرسال المهام ذاتياً والاتصالات وآلية التعامل مع الحوادث وإشراف المشغّل، وفق سيناريوهات متفق عليها وقياسات أساسية محددة.",

      },

      gate: {

        en: "Safety case, integration test and baseline evidence accepted.",

        ar: "اعتماد تقييم السلامة ونتائج اختبار الربط بين الأنظمة والقياسات الأساسية.",

      },

      controls: [

        { en: "Limited operating area", ar: "نطاق تشغيل محدود" },

        { en: "Measured baselines", ar: "قياسات أساسية محددة" },

        { en: "Operator supervision", ar: "إشراف المشغّل" },

      ],

      overlay: [

        { en: "Pilot area", ar: "نطاق المرحلة التجريبية" },

        { en: "Autonomous dispatch", ar: "إرسال المهام ذاتياً" },

        { en: "Evidence dashboard", ar: "لوحة متابعة النتائج" },

      ],

    },

    {

      id: "expansion",

      icon: "layers-3",

      tag: { en: "CONNECT", ar: "الربط" },

      title: { en: "Cross-Entity Expansion", ar: "التوسّع والربط بين الجهات" },

      outcome: {

        en: "Scale from one pilot to coordinated multi-entity operations.",

        ar: "الانتقال من تجربة محدودة إلى عمليات منسّقة تشمل عدة جهات.",

      },

      body: {

        en: "Participating entities connect through common procedures, shared tasking, integration standards and joint exercises that verify command handover.",

        ar: "يتم ربط الجهات المشاركة من خلال إجراءات تشغيل مشتركة وإسناد منسّق للمهام ومعايير موحّدة للربط بين الأنظمة وتمارين مشتركة للتحقّق من آلية نقل مسؤولية القيادة.",

      },

      gate: {

        en: "Common SOPs, interoperable interfaces and joint exercise sign-off.",

        ar: "اعتماد إجراءات التشغيل المشتركة، والتأكد من قدرة الأنظمة على الاتصال وتبادل المعلومات، واعتماد نتائج التمارين المشتركة.",

      },

      controls: [

        { en: "Common SOPs", ar: "إجراءات تشغيل مشتركة" },

        { en: "Shared tasking", ar: "إسناد مشترك للمهام" },

        { en: "Joint exercises", ar: "تمارين مشتركة" },

      ],

      overlay: [

        { en: "Entity A", ar: "الجهة أ" },

        { en: "Shared tasking", ar: "إسناد مشترك للمهام" },

        { en: "Entity B", ar: "الجهة ب" },

      ],

    },

    {

      id: "national",

      icon: "radio-tower",

      tag: { en: "OPERATE", ar: "التشغيل" },

      title: { en: "National Operations", ar: "التشغيل على المستوى الوطني" },

      outcome: {

        en: "Operate a resilient, audited and continuously improving national command capability.",

        ar: "تشغيل قدرات قيادة وطنية تضمن استمرارية العمل وقابلية التدقيق والتحسين المستمر.",

      },

      body: {

        en: "The center moves into 24/7 operations with alternate command arrangements, audit trails, training cycles and controlled onboarding of new domains.",

        ar: "ينتقل المركز إلى التشغيل على مدار الساعة، مع ترتيبات بديلة للقيادة، وسجلات قابلة للتدقيق، وبرامج تدريب دورية، وإضافة مجالات تشغيل جديدة بشكل منضبط.",

      },

      gate: {

        en: "Operational readiness, continuity assurance and continuous-improvement cadence.",

        ar: "تحقيق الجاهزية التشغيلية وضمان استمرارية العمل وتطبيق آلية دورية للتحسين المستمر.",

      },

      controls: [

        { en: "24/7 operations", ar: "تشغيل على مدار الساعة" },

        { en: "Continuity paths", ar: "مسارات بديلة لاستمرارية التشغيل" },

        { en: "Audit & improvement", ar: "التدقيق والتحسين المستمر" },

      ],

      overlay: [

        { en: "National picture", ar: "صورة تشغيلية وطنية" },

        { en: "Continuity path", ar: "مسار بديل لاستمرارية التشغيل" },

        { en: "Continuous improvement", ar: "تحسين مستمر" },

      ],

    },

  ],

  footer: {

    en: "Implementation gates are proposed controls for discussion. Baselines, targets and authority remain subject to government approval.",

    ar: "متطلبات الانتقال بين مراحل التنفيذ مقترحة للنقاش، وتبقى القياسات الأساسية والمستهدفات والصلاحيات خاضعة لاعتماد الحكومة.",

  },

};
 