/** Deck order and category icons. Icons apply to categories, not individual slides. */
window.ACCSlides = Object.create(null);
window.ACCSlideViews = Object.create(null);
window.ACCSlideMounts = Object.create(null);
window.ACCConfig = {
  version: "0.16.0",
  sections: [
    {
      en: "Vision",
      ar: "الرؤية",
      icon: "eye",
    },
    {
      en: "Capabilities",
      ar: "القدرات",
      icon: "layers-3",
    },
    {
      en: "Intelligence & control",
      ar: "الذكاء والتحكم",
      icon: "brain-circuit",
    },
    {
      en: "Strategic value",
      ar: "القيمة الاستراتيجية",
      icon: "chart-no-axes-combined",
    },
    {
      en: "Demo",
      ar: "العرض التجريبي",
      icon: "clapperboard",
    },
  ],
  order: [
    "cover",
    "vision",
    "domains",
    "center",
    "intelligence",
    "response",
    "governance",
    "value",
    "roadmap",
    "demo",
  ],
  minimumLoadingMs: 3000,
  motionOptions: [
    ["system", "System", "حسب الجهاز"],
    ["full", "Full", "كاملة"],
    ["reduced", "Reduced", "هادئة"],
    ["paused", "Paused", "متوقفة"],
  ],
};
