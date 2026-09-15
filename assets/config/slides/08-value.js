/** SLIDE 08 — government value of a unified autonomous control center.
 * KPIs below are proposed pilot measures, not achieved results or approved targets.
 */
window.ACCSlides.value = {
  id: "value",
  section: 3,
  status: "ready",
  navLabel: {
    en: "Strategic Value",
    ar: "القيمة الاستراتيجية",
  },
  eyebrow: {
    en: "WHY GOVERNMENT INVESTS",
    ar: "لماذا تستثمر الحكومة",
  },
  title: {
    en: "Strategic Value",
    ar: "القيمة الاستراتيجية",
  },
  summary: {
    en: "A unified control center gives participating government entities one operating picture, coordinated command, continuity through disruption and sovereign control of critical capabilities.",
    ar: "يوفر مركز التحكم الموحد للجهات الحكومية المشاركة صورة تشغيلية مشتركة، وقيادة منسقة، واستمرارية عند التعطل، وسيطرة وطنية على القدرات الحرجة.",
  },
  core: {
    label: {
      en: "UNIFIED GOVERNMENT CONTROL",
      ar: "تحكم حكومي موحد",
    },
    title: {
      en: "One national operating picture",
      ar: "صورة تشغيلية وطنية موحّدة",
    },
    alt: {
      en: "A three-dimensional command core receiving air, land, sea and infrastructure inputs.",
      ar: "نواة قيادة ثلاثية الأبعاد تستقبل مدخلات الجو والبر والبحر والبنية التحتية.",
    },
  },
  ui: {
    governmentBenefit: {
      en: "GOVERNMENT BENEFIT",
      ar: "منفعة حكومية",
    },
    proposedKpis: {
      en: "PROPOSED PILOT KPIs",
      ar: "مؤشرات مقترحة للمرحلة التجريبية",
    },
    automaticSequence: {
      en: "Automatic sequence",
      ar: "تسلسل تلقائي",
    },
    pause: {
      en: "Pause autoplay",
      ar: "إيقاف التشغيل التلقائي",
    },
    play: {
      en: "Resume autoplay",
      ar: "استئناف التشغيل التلقائي",
    },
    select: {
      en: "Select government benefit",
      ar: "اختيار المنفعة الحكومية",
    },
  },
  pillars: [
    {
      id: "safety",
      icon: "shield-check",
      title: { en: "Safety", ar: "السلامة" },
      outcome: {
        en: "Protect people and national infrastructure",
        ar: "حماية الأفراد والبنية التحتية الوطنية",
      },
      body: {
        en: "Government gains earlier awareness across public areas, critical infrastructure and major events. Participating entities coordinate action while critical decisions remain under human authority.",
        ar: "تحصل الحكومة على وعي مبكر عبر المناطق العامة والبنية التحتية الحرجة والفعاليات الكبرى. تنسّق الجهات المشاركة إجراءاتها مع بقاء القرارات الحرجة تحت سلطة بشرية.",
      },
      overlay: [
        { en: "Early awareness", ar: "وعي مبكر" },
        { en: "Verified event", ar: "حادث موثّق" },
        { en: "Human authority", ar: "سلطة بشرية" },
        { en: "Coordinated action", ar: "استجابة منسقة" },
      ],
      kpis: [
        {
          en: "Verified incident-to-coordinated-response time",
          ar: "زمن الانتقال من حادث موثّق إلى استجابة منسّقة",
        },
        { en: "Safety exceptions per mission", ar: "استثناءات السلامة لكل مهمة" },
      ],
    },
    {
      id: "efficiency",
      icon: "chart-no-axes-combined",
      title: { en: "Efficiency", ar: "الكفاءة" },
      outcome: {
        en: "Coordinate entities and assets as one operation",
        ar: "تنسيق الجهات والأنظمة ضمن عملية واحدة",
      },
      body: {
        en: "A shared operating picture lets participating entities assign missions once, use available autonomous assets across mandates and avoid duplicate or conflicting deployments.",
        ar: "تمكّن الصورة التشغيلية المشتركة الجهات المشاركة من إسناد المهام مرة واحدة، والاستفادة من الأنظمة الذاتية المتاحة عبر الاختصاصات، وتجنب عمليات النشر المكررة أو المتعارضة.",
      },
      overlay: [
        { en: "Participating entities", ar: "الجهات المشاركة" },
        { en: "Shared picture", ar: "صورة مشتركة" },
        { en: "Coordinated tasking", ar: "إسناد منسق" },
      ],
      kpis: [
        { en: "Cross-entity tasking time", ar: "زمن إسناد المهمة بين الجهات" },
        { en: "Shared asset utilisation", ar: "الاستفادة من الأنظمة المشتركة" },
      ],
    },
    {
      id: "resilience",
      icon: "repeat-2",
      title: { en: "Resilience", ar: "المرونة" },
      outcome: {
        en: "Keep priority operations running through disruption",
        ar: "استمرار العمليات ذات الأولوية أثناء التعطل",
      },
      body: {
        en: "Alternate command locations, communications paths and assets keep priority missions visible and transferable when part of the operating environment becomes unavailable.",
        ar: "تحافظ مواقع القيادة البديلة ومسارات الاتصالات والأنظمة الاحتياطية على وضوح المهام ذات الأولوية وإمكانية نقلها عند تعطل جزء من بيئة التشغيل.",
      },
      overlay: [
        { en: "Primary path unavailable", ar: "المسار الأساسي غير متاح" },
        { en: "Alternate command path", ar: "مسار قيادة بديل" },
        { en: "Mission continues", ar: "استمرار المهمة" },
      ],
      kpis: [
        { en: "Command service availability", ar: "توافر خدمة القيادة" },
        { en: "Failover recovery time", ar: "زمن استعادة التشغيل بعد التحويل" },
      ],
    },
    {
      id: "capability",
      icon: "user-round-check",
      title: { en: "National Capability", ar: "القدرات الوطنية" },
      outcome: {
        en: "Retain sovereign control and local expertise",
        ar: "الاحتفاظ بالسيطرة السيادية والخبرة المحلية",
      },
      body: {
        en: "Government retains command authority, operational data and integration knowledge inside the UAE while building Emirati operators and local technical support.",
        ar: "تحتفظ الحكومة بسلطة القيادة والبيانات التشغيلية ومعرفة التكامل داخل دولة الإمارات، مع تطوير مشغّلين إماراتيين ودعم تقني محلي.",
      },
      overlay: [
        { en: "UAE operators", ar: "مشغّلون إماراتيون" },
        { en: "Local integration", ar: "تكامل محلي" },
        { en: "National know-how", ar: "معرفة وطنية" },
      ],
      kpis: [
        { en: "UAE-trained operators", ar: "المشغّلون الإماراتيون المدرّبون" },
        { en: "Locally managed integrations", ar: "التكاملات المُدارة محلياً" },
      ],
    },
  ],
  footer: {
    en: "Proposed KPIs only. Pilot governance defines baselines and targets before any performance claim.",
    ar: "المؤشرات مقترحة فقط. تحدد حوكمة المرحلة التجريبية خطوط الأساس والمستهدفات قبل إعلان أي نتائج.",
  },
};
