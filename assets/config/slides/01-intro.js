/** SLIDE 01 — INTRO
 * All intro wording, buttons and drone labels are editable here.
 * Keep paired English and Arabic fields. Save as UTF-8 and refresh index.html.
 * HUD templates support {altitude} and {speed}; keep these placeholders.
 */
window.ACCSlides.cover = {
  id: "cover",
  section: 0,
  title: {
    en: "UAE Autonomous Command Center",
    ar: "مركز الإمارات لقيادة الأنظمة ذاتية التشغيل",
  },
  navLabel: {
    en: "Intro",
    ar: "المقدمة",
  },
  status: "ready",
  country: {
    en: "UNITED ARAB EMIRATES",
    ar: "الإمارات العربية المتحدة",
  },
  titleLines: {
    en: ["Autonomous", "Command Center"],
    ar: ["مركز قيادة الأنظمة", "ذاتية التشغيل"],
  },
  subtitle: {
    en: "One intelligent command capability.\nAcross air, land and sea.",
    ar: "قيادة ذكية تجمع العمليات الجوية والبرية والبحرية.",
  },
  eyebrow: {
    en: "EXECUTIVE PROPOSAL",
    ar: "مقترح استراتيجي",
  },
  ui: {
    begin: {
      en: "Begin presentation",
      ar: "ابدأ العرض",
    },
    simulatedAirTraffic: {
      en: "SIMULATED AIR TRAFFIC",
      ar: "حركة جوية محاكاة",
    },
    pauseScene: {
      en: "Pause scene",
      ar: "إيقاف المشهد مؤقتاً",
    },
    playScene: {
      en: "Play scene",
      ar: "تشغيل المشهد",
    },
    exploreScene: {
      en: "Explore scene",
      ar: "استكشاف المشهد",
    },
    exploreTheScene: {
      en: "Explore the scene",
      ar: "استكشف المشهد",
    },
    returnToIntroduction: {
      en: "Return to introduction",
      ar: "العودة إلى المقدّمة",
    },
    scenePausedSelectPlaySceneToAnimate: {
      en: "Scene paused — select Play scene to animate",
      ar: "المشهد متوقف — اختر تشغيل المشهد للتحريك",
    },
  },
  hud: {
    aircraftIds: ["UAV-021", "UAV-027"],
    simulated: {
      en: "SIMULATED",
      ar: "محاكاة",
    },
    stats: {
      en: "ALT {altitude} m · {speed} m/s",
      ar: "الارتفاع {altitude} م · السرعة {speed} م/ث",
    },
    pathClear: {
      en: "PATH CLEAR",
      ar: "المسار آمن",
    },
    altitudeSeparation: {
      en: "ALTITUDE SEPARATION",
      ar: "فصل الارتفاعات",
    },
  },
};
