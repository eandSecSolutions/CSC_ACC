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
    ar: "كيف تطبّق الحكومة",
  },
  title: {
    en: "From Mandate to National Operations",
    ar: "من التفويض إلى العمليات الوطنية",
  },
  summary: {
    en: "A phased government-led path that controls risk, proves operational value, then expands only through agreed readiness gates.",
    ar: "مسار حكومي مرحلي يضبط المخاطر، ويثبت القيمة التشغيلية، ثم يتوسّع فقط عبر بوابات جاهزية متّفق عليها.",
  },
  ui: {
    automaticJourney: {
      en: "Automatic implementation journey",
      ar: "رحلة تنفيذ تلقائية",
    },
    pause: {
      en: "Pause roadmap",
      ar: "إيقاف خارطة الطريق",
    },
    play: {
      en: "Resume roadmap",
      ar: "استئناف خارطة الطريق",
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
      ar: "المخرج الحكومي",
    },
    readinessGate: {
      en: "READINESS GATE",
      ar: "بوابة الجاهزية",
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
      title: { en: "Mandate & Governance", ar: "التفويض والحوكمة" },
      outcome: {
        en: "Create a single accountable program structure before technology rollout.",
        ar: "إنشاء هيكل برنامج مسؤول وموحد قبل طرح التقنية.",
      },
      body: {
        en: "Government defines ownership, human command authority, safety policy, data boundaries and participating-entity roles before any operational deployment.",
        ar: "تحدد الحكومة الملكية، وسلطة القرار البشري، وسياسة السلامة، وحدود البيانات، وأدوار الجهات المشاركة قبل أي نشر تشغيلي.",
      },
      gate: {
        en: "Approved charter, operating model and security-by-design baseline.",
        ar: "اعتماد الميثاق ونموذج التشغيل وخط أساس الأمن حسب التصميم.",
      },
      controls: [
        { en: "National mandate", ar: "تفويض وطني" },
        { en: "Human authority", ar: "سلطة بشرية" },
        { en: "Data boundaries", ar: "حدود البيانات" },
      ],
      overlay: [
        { en: "Charter approved", ar: "اعتماد الميثاق" },
        { en: "Policy guardrails", ar: "ضوابط السياسات" },
        { en: "Decision authority", ar: "سلطة القرار" },
      ],
    },
    {
      id: "pilot",
      icon: "scan-line",
      tag: { en: "PROVE", ar: "الإثبات" },
      title: { en: "Controlled Pilot & Evidence", ar: "تجربة مضبوطة وأدلة" },
      outcome: {
        en: "Prove safety, integration and operational value in a limited environment.",
        ar: "إثبات السلامة والتكامل والقيمة التشغيلية في بيئة محدودة.",
      },
      body: {
        en: "A focused pilot validates autonomous dispatch, communications, incident workflow and operator supervision using agreed scenarios and measured baselines.",
        ar: "تتحقق تجربة مركّزة من الإرسال الذاتي والاتصالات وسير عمل الحوادث وإشراف المشغّل وفق سيناريوهات وخطوط أساس متفق عليها.",
      },
      gate: {
        en: "Safety case, integration test and baseline evidence accepted.",
        ar: "قبول حالة السلامة واختبار التكامل وأدلة خط الأساس.",
      },
      controls: [
        { en: "Limited operating area", ar: "نطاق تشغيل محدود" },
        { en: "Measured baselines", ar: "خطوط أساس مقاسة" },
        { en: "Operator supervision", ar: "إشراف المشغّل" },
      ],
      overlay: [
        { en: "Pilot area", ar: "نطاق التجربة" },
        { en: "Autonomous dispatch", ar: "إرسال ذاتي" },
        { en: "Evidence dashboard", ar: "لوحة الأدلة" },
      ],
    },
    {
      id: "expansion",
      icon: "layers-3",
      tag: { en: "CONNECT", ar: "الربط" },
      title: { en: "Cross-Entity Expansion", ar: "التوسّع بين الجهات" },
      outcome: {
        en: "Scale from one pilot to coordinated multi-entity operations.",
        ar: "التوسّع من تجربة واحدة إلى عمليات منسّقة بين عدة جهات.",
      },
      body: {
        en: "Participating entities connect through common procedures, shared tasking, integration standards and joint exercises that verify command handover.",
        ar: "ترتبط الجهات المشاركة عبر إجراءات مشتركة، وإسناد موحّد، ومعايير تكامل، وتمارين مشتركة تتحقق من تسليم القيادة.",
      },
      gate: {
        en: "Common SOPs, interoperable interfaces and joint exercise sign-off.",
        ar: "اعتماد إجراءات التشغيل المشتركة والواجهات المتوافقة ونتائج التمرين المشترك.",
      },
      controls: [
        { en: "Common SOPs", ar: "إجراءات مشتركة" },
        { en: "Shared tasking", ar: "إسناد مشترك" },
        { en: "Joint exercises", ar: "تمارين مشتركة" },
      ],
      overlay: [
        { en: "Entity A", ar: "الجهة أ" },
        { en: "Shared tasking", ar: "إسناد مشترك" },
        { en: "Entity B", ar: "الجهة ب" },
      ],
    },
    {
      id: "national",
      icon: "radio-tower",
      tag: { en: "OPERATE", ar: "التشغيل" },
      title: { en: "National Operations", ar: "العمليات الوطنية" },
      outcome: {
        en: "Operate a resilient, audited and continuously improving national command capability.",
        ar: "تشغيل قدرة قيادة وطنية مرنة ومدققة وقابلة للتحسين المستمر.",
      },
      body: {
        en: "The center moves into 24/7 operations with alternate command arrangements, audit trails, training cycles and controlled onboarding of new domains.",
        ar: "ينتقل المركز إلى عمليات على مدار الساعة مع ترتيبات قيادة بديلة، وسجلات تدقيق، ودورات تدريبية، وانضمام منضبط لمجالات جديدة.",
      },
      gate: {
        en: "Operational readiness, continuity assurance and continuous-improvement cadence.",
        ar: "جاهزية تشغيلية وضمان الاستمرارية وإيقاع للتحسين المستمر.",
      },
      controls: [
        { en: "24/7 operations", ar: "تشغيل 24/7" },
        { en: "Continuity paths", ar: "مسارات الاستمرارية" },
        { en: "Audit & improvement", ar: "تدقيق وتحسين" },
      ],
      overlay: [
        { en: "National picture", ar: "صورة وطنية" },
        { en: "Continuity path", ar: "مسار استمرارية" },
        { en: "Continuous improvement", ar: "تحسين مستمر" },
      ],
    },
  ],
  footer: {
    en: "Implementation gates are proposed controls for discussion. Baselines, targets and authority remain subject to government approval.",
    ar: "بوابات التنفيذ ضوابط مقترحة للنقاش. تبقى خطوط الأساس والمستهدفات والصلاحيات خاضعة لاعتماد الحكومة.",
  },
};
