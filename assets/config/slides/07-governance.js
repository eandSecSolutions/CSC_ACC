/** SLIDE 07 — editable bilingual authority and policy exercise. */

window.ACCSlides.governance = {

  id: "governance",

  section: 2,

  status: "ready",

  navLabel: {

    en: "Governance",

    ar: "الحوكمة",

  },

  eyebrow: {

    en: "SECURE, GOVERNED AUTONOMY",

    ar: "تشغيل ذاتي آمن وخاضع للحوكمة",

  },

  title: {

    en: "Authority is designed into every action.",

    ar: "تُحدَّد صلاحيات التنفيذ ضمن كل إجراء.",

  },

  summary: {

    en: "Verify identity. Enforce mission boundaries. Retain human control.",

    ar: "التحقّق من الهوية والالتزام بحدود المهمة وإبقاء التحكم بيد المشغّل.",

  },

  footer: {

    en: "Illustrative policy exercise · local decision record, no live authorization service.",

    ar: "تمرين توضيحي للسياسات · سجل قرارات محلي، دون اتصال بخدمة اعتماد فعلية.",

  },

  ui: {

    demo: {

      en: "MISSION AUTHORIZATION EXERCISE",

      ar: "تمرين اعتماد صلاحيات تنفيذ المهمة",

    },

    pause: {

      en: "Pause animation",

      ar: "إيقاف الحركة",

    },

    play: {

      en: "Resume animation",

      ar: "استئناف الحركة",

    },

    reset: {

      en: "Restart example",

      ar: "إعادة المثال",

    },

    chain: {

      en: "From request to authorized action",

      ar: "من تقديم الطلب إلى تنفيذ الإجراء المعتمد",

    },

    chainHint: {

      en: "Select a checkpoint to inspect its purpose.",

      ar: "اختر نقطة تحقّق للاطلاع على دورها.",

    },

    identity: {

      en: "Identity",

      ar: "الهوية",

    },

    scope: {

      en: "Mission scope",

      ar: "نطاق المهمة",

    },

    authority: {

      en: "Authority",

      ar: "صلاحية التنفيذ",

    },

    action: {

      en: "Action",

      ar: "الإجراء",

    },

    idle: {

      en: "Ready to test the policy",

      ar: "جاهز لاختبار السياسة",

    },

    checking: {

      en: "Checking authorization conditions",

      ar: "جارٍ التحقّق من شروط السماح بالتنفيذ",

    },

    blocked: {

      en: "Blocked · required condition missing",

      ar: "تعذّر التنفيذ · أحد الشروط المطلوبة غير مستوفى",

    },

    approval: {

      en: "Held · human decision required",

      ar: "معلّق · بانتظار اعتماد المشغّل",

    },

    executing: {

      en: "Authorized action in progress",

      ar: "الإجراء المعتمد قيد التنفيذ",

    },

    complete: {

      en: "Action completed and recorded",

      ar: "اكتمل الإجراء وتم تسجيله",

    },

    revoked: {

      en: "Authority withdrawn · action stopped",

      ar: "تم سحب صلاحية التنفيذ · توقف الإجراء",

    },

    evaluate: {

      en: "Evaluate the request",

      ar: "تقييم الطلب",

    },

    acknowledge: {

      en: "Accept supervision & continue",

      ar: "قبول مسؤولية الإشراف والمتابعة",

    },

    approve: {

      en: "Approve the critical action",

      ar: "اعتماد الإجراء الحرج",

    },

    running: {

      en: "Processing the example",

      ar: "جارٍ تشغيل المثال",

    },

    retest: {

      en: "Run a fresh evaluation",

      ar: "إجراء تقييم جديد",

    },

    revoke: {

      en: "Withdraw authority",

      ar: "سحب صلاحية التنفيذ",

    },

    valid: {

      en: "Identity verified",

      ar: "تم التحقّق من الهوية",

    },

    invalid: {

      en: "Identity not verified",

      ar: "لم يتم التحقّق من الهوية",

    },

    inside: {

      en: "Within approved scope",

      ar: "ضمن النطاق المعتمد",

    },

    outside: {

      en: "Outside approved scope",

      ar: "خارج النطاق المعتمد",

    },

    identityHint: {

      en: "Toggle the identity check",

      ar: "تغيير حالة التحقّق من الهوية",

    },

    scopeHint: {

      en: "Toggle the mission boundary",

      ar: "تغيير حالة حدود المهمة",

    },

    noIdentity: {

      en: "Verify the requesting identity before evaluating any action.",

      ar: "تحقّق من هوية مقدم الطلب قبل تقييم أي إجراء.",

    },

    noScope: {

      en: "The request is outside the approved mission boundary. Correct the scope and run a fresh evaluation.",

      ar: "يقع الطلب خارج حدود المهمة المعتمدة. صحّح النطاق وأعد التقييم.",

    },

    startHint: {

      en: "Change the test inputs, then evaluate. Each operating mode applies a different authority requirement.",

      ar: "غيّر معطيات الاختبار ثم قيّم الطلب. لكل نمط تشغيل متطلبات مختلفة لاعتماد التنفيذ.",

    },

    reviewHint: {

      en: "Identity and scope passed. A human decision is still required at this gate.",

      ar: "تم التحقّق من الهوية والنطاق، ولا يمكن المتابعة من هذه النقطة قبل اعتماد المشغّل.",

    },

    executeHint: {

      en: "The action remains within this example’s approved boundary. Authority can still be withdrawn.",

      ar: "يبقى الإجراء ضمن الحدود المعتمدة في هذا المثال، ويمكن للمشغّل سحب صلاحية التنفيذ.",

    },

    doneHint: {

      en: "Review the local record. A new action requires a fresh evaluation.",

      ar: "راجع السجل المحلي. يتطلب أي إجراء جديد إجراء تقييم جديد.",

    },

    revokeHint: {

      en: "Restoring inputs does not restart the action. A fresh evaluation is required.",

      ar: "لا تؤدي استعادة المعطيات إلى استئناف الإجراء. يلزم إجراء تقييم جديد.",

    },

    ledger: {

      en: "Decision record",

      ar: "سجل القرارات",

    },

    empty: {

      en: "Run an example to create its local record.",

      ar: "شغّل المثال لإنشاء سجله المحلي.",

    },

    requested: {

      en: "Request evaluated",

      ar: "تم تقييم الطلب",

    },

    checksPassed: {

      en: "Identity and scope accepted",

      ar: "تم التحقّق من الهوية والنطاق",

    },

    policyGranted: {

      en: "Action permitted by the example policy",

      ar: "الإجراء مسموح به وفق سياسة المثال",

    },

    humanGranted: {

      en: "Human authorization recorded",

      ar: "تم تسجيل اعتماد المشغّل",

    },

    inputChanged: {

      en: "Input changed · prior authority invalidated",

      ar: "تغيّرت المعطيات · لم تعد صلاحية التنفيذ السابقة سارية",

    },

    modeHint: {

      en: "Changing operating mode starts a new example.",

      ar: "يبدأ مثال جديد عند تغيير نمط التشغيل.",

    },

    checkpoint: {

      en: "Checkpoint purpose",

      ar: "دور نقطة التحقّق",

    },

    tests: {

      en: "Test the boundary",

      ar: "اختبار حدود الصلاحيات",

    },

    recordNote: {

      en: "Illustrative sequence numbers; this is not a persistent audit system.",

      ar: "أرقام تسلسلية توضيحية؛ ولا يمثل هذا المثال منصة تدقيق دائمة.",

    },

    human: {

      en: "Authority can be withdrawn in every mode.",

      ar: "يمكن سحب صلاحية التنفيذ في جميع أنماط التشغيل.",

    },

  },

  views: [

    {

      label: {

        en: "Policy-based",

        ar: "وفق سياسة معتمدة",

      },

      icon: "clipboard-check",

      title: {

        en: "Delegate only within a defined boundary.",

        ar: "السماح بالتنفيذ فقط ضمن حدود محددة مسبقاً.",

      },

      lead: {

        en: "A routine camera sweep may proceed under a pre-approved example policy once identity and mission scope pass. No new human approval is requested for this bounded action.",

        ar: "يمكن تنفيذ مسح اعتيادي بالكاميرا وفق سياسة معتمدة مسبقاً بعد التحقّق من الهوية ونطاق المهمة، دون الحاجة إلى اعتماد جديد من المشغّل لهذا الإجراء المحدد.",

      },

      task: {

        en: "Routine camera sweep in the assigned inspection zone",

        ar: "مسح اعتيادي بالكاميرا في منطقة الفحص المحددة",

      },

      rule: {

        en: "Pre-approved policy · bounded routine action",

        ar: "سياسة معتمدة مسبقاً · إجراء اعتيادي ضمن حدود محددة",

      },

    },

    {

      label: {

        en: "Supervised",

        ar: "تحت الإشراف",

      },

      icon: "eye",

      title: {

        en: "Make supervision an explicit responsibility.",

        ar: "تحديد مسؤولية الإشراف بوضوح.",

      },

      lead: {

        en: "The example requires an operator to accept supervision before an assisted inspection begins. The operator can withdraw authority while the action is running.",

        ar: "يتطلب المثال أن يتولى المشغّل مسؤولية الإشراف قبل بدء الفحص المساند، ويمكنه إيقاف صلاحية التنفيذ أثناء سير الإجراء.",

      },

      task: {

        en: "Assisted inspection with an assigned supervisor",

        ar: "فحص مساند تحت إشراف مشغّل محدد",

      },

      rule: {

        en: "Supervisor accepts responsibility before execution",

        ar: "يتولى المشرف المسؤولية قبل بدء التنفيذ",

      },

    },

    {

      label: {

        en: "Approval-based",

        ar: "يتطلب الاعتماد",

      },

      icon: "user-round-check",

      title: {

        en: "Hold critical actions for a human decision.",

        ar: "عدم تنفيذ الإجراءات الحرجة قبل اعتماد المشغّل.",

      },

      lead: {

        en: "A critical inspection request waits for explicit approval after identity and scope checks. Time passing or opening another checkpoint cannot grant authority.",

        ar: "يبقى طلب الفحص الحرج معلّقاً بعد التحقّق من الهوية والنطاق إلى أن يعتمد المشغّل الإجراء بشكل صريح. ولا يُسمح بالتنفيذ تلقائياً بمرور الوقت أو بالانتقال إلى نقطة تحقّق أخرى.",

      },

      task: {

        en: "Critical inspection step requiring operator approval",

        ar: "خطوة فحص حرجة تتطلب اعتماد المشغّل",

      },

      rule: {

        en: "Explicit approval for this individual action",

        ar: "اعتماد صريح لهذا الإجراء تحديداً",

      },

    },

  ],

  checks: [

    {

      icon: "user-round-check",

      label: {

        en: "Identity",

        ar: "الهوية",

      },

      title: {

        en: "Who is requesting the action?",

        ar: "من يطلب تنفيذ الإجراء؟",

      },

      body: {

        en: "Establish a verified requesting identity. An unverified request never reaches the execution gate. The switch below is a test input, not an authentication connection.",

        ar: "يجب التحقّق من هوية مقدم الطلب قبل السماح بانتقال الطلب إلى مرحلة التنفيذ. والمفتاح أدناه مخصص للاختبار فقط، ولا يمثل اتصالاً فعلياً بخدمة التحقّق من الهوية.",

      },

    },

    {

      icon: "crosshair",

      label: {

        en: "Scope",

        ar: "النطاق",

      },

      title: {

        en: "Is the request inside its mandate?",

        ar: "هل الإجراء المطلوب ضمن النطاق المسموح به؟",

      },

      body: {

        en: "Limit the requested action to the assigned mission boundary. A valid identity does not make an out-of-scope action permissible.",

        ar: "يجب أن يبقى الإجراء المطلوب ضمن حدود المهمة المحددة. والتحقّق من الهوية لا يسمح بتنفيذ إجراء يقع خارج النطاق المعتمد.",

      },

    },

    {

      icon: "shield-check",

      label: {

        en: "Authority",

        ar: "صلاحية التنفيذ",

      },

      title: {

        en: "Which decision is required?",

        ar: "ما الاعتماد المطلوب قبل التنفيذ؟",

      },

      body: {

        en: "Apply the selected mode: pre-approved policy, accepted supervision or explicit action approval. These are illustrative operating choices, not a statement of regulatory compliance.",

        ar: "يُطبّق نمط التشغيل المحدد: التنفيذ وفق سياسة معتمدة مسبقاً، أو تحت إشراف مسؤول، أو بعد اعتماد الإجراء بشكل صريح. وهذه نماذج تشغيلية توضيحية ولا تعني بحد ذاتها الامتثال للمتطلبات التنظيمية.",

      },

    },

    {

      icon: "clipboard-check",

      label: {

        en: "Record",

        ar: "السجل",

      },

      title: {

        en: "Can the decision be traced?",

        ar: "هل يمكن تتبّع القرار؟",

      },

      body: {

        en: "Keep the request, checks, human decision and result visible together. This example keeps the record only while the slide remains open.",

        ar: "يُعرض الطلب ونتائج التحقّق واعتماد المشغّل والنتيجة معاً لإتاحة تتبّع القرار. ويحتفظ هذا المثال بالسجل فقط أثناء بقاء الشريحة مفتوحة.",

      },

    },

  ],

  atmosphere: {

    lights: [

      [0.493, 0.1],

      [0.564, 0.45],

      [0.834, 0.24],

      [0.166, 0.14],

    ],

    screens: [

      [0.093, 0.18, 0.255, 0.28],

      [0.38, 0.56, 0.23, 0.1],

    ],

  },

};
 