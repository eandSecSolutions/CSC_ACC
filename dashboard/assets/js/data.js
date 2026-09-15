(function(){
  "use strict";

  const T = {
    en: {
      appTitle:"UAE Autonomous Command Center", appSubtitle:"AI-powered command, monitoring and control for autonomous mobility",
      demoMode:"Demo mode", operationalQueue:"Operational queue", liveIncidents:"Live incidents", viewAll:"View all",
      machineAssessment:"Machine assessment", recentAiAlerts:"Recent AI alerts", live:"Live", nationalPicture:"National operating picture",
      uaeOperationalMap:"UAE Operational Map", searchMap:"Search asset, incident or location", footerTitle:"UAE Autonomous Command Center",
      footerNote:"Illustrative concept · Simulated operational data", pause:"Pause", resume:"Resume", reset:"Reset",
      globalSearch:"Search assets, incidents and missions", identitySimulation:"Identity simulation", switchOperator:"Switch operator",
      roleIntro:"Change the demo identity to see how navigation, data, map detail and command authority respond to role and scope.",
      accessMatrix:"Access matrix", auditTrail:"Audit trail", scope:"Operational scope", domains:"Domains", regions:"Regions",
      clearance:"Clearance", commandAuthority:"Command authority", national:"National", allDomains:"All domains", allEmirates:"All emirates",
      readOnly:"Read only", approve:"Approve", requestApproval:"Request approval", permitted:"Permitted", restricted:"Restricted",
      masked:"Masked", aggregated:"Aggregated", exact:"Exact", demoIdentity:"Demo identity", activeSession:"Active session",
      totalAssets:"Total assets", activeMissions:"Active missions", activeDrones:"Active drones", activeRobots:"Active robots",
      marineAssets:"Marine assets", autonomousVehicles:"Autonomous vehicles", activeIncidents:"Active incidents", aiAlerts:"AI alerts",
      avgResponse:"Average response", fleetAvailability:"Fleet availability", fromPrevious:"from previous period", withinScope:"within your scope",
      selectedAsset:"Selected asset", missionProgress:"Mission progress", quickActions:"Quick actions", track:"Track", follow:"Follow",
      view:"View", command:"Command", more:"More", dispatch:"Dispatch", returnHome:"Return home", hold:"Hold", viewCamera:"View camera",
      battery:"Battery", speed:"Speed", altitude:"Altitude", mission:"Mission", operator:"Operator", connectivity:"Connectivity",
      lastUpdate:"Last update", location:"Location", status:"Status", model:"Model", active:"Active", online:"Online",
      created:"Created", enRoute:"En route", onSite:"On site", analysis:"Analysis", complete:"Complete",
      infrastructureInspection:"Infrastructure inspection", fleetDistribution:"Fleet distribution", assetStatus:"Asset status",
      missionVolume:"Mission volume", incidentsSeverity:"Incidents by severity", systemStatus:"System status", operational:"Operational",
      maintenance:"Maintenance", offline:"Offline", critical:"Critical", high:"High", medium:"Medium", low:"Low",
      drones:"Drones", robots:"Robots", vehicles:"Vehicles", maritime:"Maritime", air:"Air", land:"Land", sea:"Sea",
      incidents:"Incidents", zones:"Operational zones", corridors:"Mission corridors", weather:"Weather", cameras:"Live cameras",
      tactical:"Tactical", mode2d:"2D Map", satellite:"Aerial", terrain:"Terrain", mode3d:"3D Map", layers:"Layers", basemap:"Basemap",
      mapOffline:"Offline operational fallback", mapLive:"Live basemap", mappedAssets:"Mapped assets", filteredByRole:"Filtered by role and scope",
      accessDenied:"Access denied", permissionReason:"This action is outside the current role or operational scope.",
      commandRecorded:"Command recorded", requestRecorded:"Approval request submitted", identityChanged:"Demo identity changed",
      rolePermissions:"Role permissions", capability:"Capability", dataVisibility:"Data visibility", authorizedActions:"Authorized actions",
      exactLocations:"Exact asset locations", operatorIdentity:"Operator identity", cameraAccess:"Live camera access",
      dispatchAssets:"Dispatch assets", emergencyOverride:"Emergency override", highRiskApproval:"High-risk approval",
      missionControl:"Change mission", auditAccess:"Audit and evidence access", exportAccess:"Export operational data",
      securityAccess:"Security administration", event:"Event", actor:"Actor", result:"Result", time:"Time", reason:"Reason",
      roleChange:"Role switch", assetOpened:"Asset record opened", incidentOpened:"Incident command view opened",
      mapLayerChanged:"Map layer changed", commandIssued:"Operational command issued", exportRequested:"Export requested",
      incidentCommand:"Incident command", currentAssessment:"Current assessment", affectedAssets:"Affected assets", responseTimeline:"Response timeline",
      recommendedActions:"Recommended actions", evidence:"Evidence", confidence:"Confidence", severity:"Severity", detected:"Detected",
      assignedUnits:"Assigned units", acknowledge:"Acknowledge", assignMission:"Assign mission", escalate:"Escalate", closeIncident:"Close incident",
      assetDossier:"Asset dossier", telemetry:"Telemetry", missionHistory:"Mission history", health:"Health", sensors:"Sensors",
      cameraFeed:"Camera feed", thermal:"Thermal", normal:"Normal", night:"Night", privacyMasked:"Restricted by role policy",
      kpiAnalysis:"KPI analysis", sevenDayTrend:"Seven-day trend", emirateBreakdown:"Emirate breakdown", domainBreakdown:"Domain breakdown",
      operationalImpact:"Operational impact", alertsPrioritized:"Alerts prioritized by severity, confidence and affected critical services.",
      noResults:"No records match the current role, scope and search.", pendingModule:"Module scheduled for a later iteration",
      pendingModuleDetail:"The navigation is already permission-aware. This operational module will be developed and validated in its dedicated iteration.",
      close:"Close", simulationRunning:"Simulation running", simulationPaused:"Simulation paused", demoData:"Demo data",
      roleBasedView:"Role-based view", limitedScope:"Limited scope", fullAuthority:"Full authority", approvalRequired:"Approval required",
      approximateLocation:"Approximate location", confidential:"Confidential", restrictedData:"Restricted operational data",
      lastSevenDays:"Last 7 days", responseTarget:"Response target", minutes:"min", available:"Available", notAvailable:"Not available",
      userSwitching:"User switching", userSwitchingNote:"Identity switching is available only because this is an illustrative demo.",
      showRoleDrawer:"Show role and scope", notifications:"Notifications", incidentQueue:"Incident queue", allClear:"No new critical alerts",
      autonomous:"Autonomous", remote:"Remote", standby:"Standby", inMission:"In mission", demoClock:"Scenario time",
      approvalWorkflow:"Approval workflow", submittedBy:"Submitted by", approver:"Approver", decision:"Decision", pending:"Pending",
      grantTemporary:"Grant temporary authority", expiresIn:"Expires in 30 minutes", deny:"Deny", approveCommand:"Approve command",
      reasonRequired:"Operational reason required", enterReason:"Enter a reason for the command", cancel:"Cancel", confirm:"Confirm",
      fullMap:"Expanded operational map", returnDashboard:"Return to dashboard", mapUnavailable:"Live tiles unavailable. Local operational layer remains active.",
      scenarioName:"Scenario 03 · Infrastructure anomaly", exportQueued:"CSV and PDF evidence package queued", results:"results",
      liveEvidence:"Simulated live evidence", rolePolicyMask:"Masked by role policy", localMap:"Local UAE map",
      localCartography:"Local operational cartography · no network required", pitch:"Pitch", bearing:"Bearing",
      rotateLeft:"Rotate left", rotateRight:"Rotate right", tiltUp:"Increase tilt", tiltDown:"Reduce tilt", resetNorth:"Reset north",
      orbitHint:"Left-drag to pan · Right-drag to orbit · Wheel to zoom", panHint:"Drag to pan · Wheel to zoom",
      mapConnecting:"Connecting 3D services", mapLive3d:"Live 3D", mapFallback:"Local fallback", mapConsole:"Map control console", liveScene:"Live geospatial scene",
      operationalLayers:"Operational layers", sceneLayers:"Cartography and 3D", streetLabels:"Street and place names", terrainElevation:"Terrain elevation", sunShadows:"Sun and building shadows",
      buildingAppearance:"Building appearance", buildingOpacity:"Building opacity", naturalBuildings:"Natural", graphite:"Graphite", commandCyan:"Command cyan", alertAmber:"Alert amber", incidentRed:"Incident red",
      translucent:"Translucent", solid:"Solid", autoOrbit:"Continuous 360° orbit", orbit:"Orbit", topDown:"Top", oblique:"Oblique",
      panUp:"Pan north", panDown:"Pan south", panLeft:"Pan west", panRight:"Pan east", uaeOverview:"UAE", abuDhabi:"Abu Dhabi", yasIsland:"Yas Island", dubai:"Dubai",
      enterFullscreen:"Full screen", exitFullscreen:"Exit full screen", assetSymbology:"Asset symbology", automatic:"Automatic", silhouettes2d:"2D silhouettes", models3d:"3D models",
      assetSymbologyNote:"Automatic uses clear silhouettes nationally, physical 3D models at city scale and persistent identification beacons in every view.", airIsrFeed:"Air ISR", landMobilityFeed:"Land mobility", maritimePatrolFeed:"Maritime patrol", robotInspectionFeed:"Robotics inspection",
      multiDomainFeed:"Multi-domain live feed", networkLatency:"Network latency", missionRange:"Mission range", sensorHealth:"Sensor health", operationalContext:"Operational context", sensorFusion:"Sensor fusion", aiEngine:"AI engine", secure:"Secure", openAsset:"Open asset",
      droneOperationsCenter:"Drone Operations Center", airDomainPicture:"Air-domain operating picture", droneFleet:"Drone fleet", searchDrone:"Search drone, model or location", allStatus:"All status", attention:"Attention", totalDrones:"Total drones", inMissionCount:"In mission", onStandby:"On standby", inMaintenance:"In maintenance", totalFlightTime:"Total flight time", totalDistance:"Total distance", missionSuccessRate:"Mission success rate", averageBattery:"Average battery",
      selectedDrone:"Selected drone", liveCameraFeed:"Live camera feed", wide:"Wide", zoomView:"Zoom", controlActions:"Control actions", changeMission:"Change mission", emergency:"Emergency", flightOperationsMap:"Drone operations map", flightPicture:"Live flight picture", missionDetails:"Mission details", missionType:"Mission type", priority:"Priority", area:"Area", startTime:"Start time", endTime:"End time", objective:"Objective", inspectTowers:"Inspect towers and equipment", inProgress:"In progress", routeCompliance:"Route compliance", waypoints:"Waypoints", eta:"ETA", flightMode:"Flight mode", gpsSatellites:"GPS satellites", signalStrength:"Signal strength", homeDistance:"Home distance", payload:"Payload", eoIrCamera:"EO / IR camera", lidarScanner:"LiDAR scanner", obstacleAvoidance:"Obstacle avoidance", sensorsOnline:"Sensors online",
      recentMissionEvents:"Recent mission events", preflightComplete:"Pre-flight checks completed", arrivedWaypoint:"Arrived at waypoint 3", capturedImages:"Captured thermal image set", departedBase:"Departed from base", missionAuthorized:"Mission authorized", routeCalculated:"Secure route calculated", aiFlightInsights:"AI flight insights", noAnomalies:"No flight anomalies detected", imageQualityGood:"Image quality suitable for analysis", batteryNormal:"Battery consumption within plan", restrictedZoneClear:"Restricted-airspace separation maintained", additionalCapture:"Capture additional imagery of the north tower", flightCorridors:"Flight corridors", noFlyZones:"No-fly zones", landingPads:"Landing pads", batteryReserve:"Battery reserve", airspaceClearance:"Airspace clearance", weatherEnvelope:"Weather envelope", commandLink:"Command link", encrypted:"Encrypted", currentMission:"Current mission", flightTelemetry:"Flight telemetry", recentMissions:"Recent missions", maintenanceDue:"Maintenance due", flightHours:"Flight hours", completedToday:"Completed today", activeNow:"Active now", fleetSearchResults:"Fleet records", lastContact:"Last contact", assignedPilot:"Assigned operator", autonomousControl:"Autonomous control", missionPackage:"Mission package", viewMission:"View mission", openTelemetry:"Open telemetry", cameraModeChanged:"Camera mode changed", hoursShort:"hrs", kilometresShort:"km",
      readiness:"Readiness", payloadSystems:"Payload systems", airframeHours:"Airframe hours", batteryCycles:"Battery cycles", nextService:"Next service", firmware:"Firmware", motorHealth:"Motor health", propellerHealth:"Propeller health", storageRemaining:"Storage remaining", opticalZoom:"Optical zoom", radiometric:"Radiometric", gimbal:"Gimbal", aiDetector:"AI detector", maintenanceRecord:"Maintenance record", preflightChecklist:"Pre-flight checklist",
      evidenceWorkbench:"Evidence workbench", captureFrame:"Capture frame", compareEvidence:"Compare evidence", aiInspect:"AI inspect", fullEvidence:"Open evidence", imageType:"Image type", rgbVisual:"RGB visual", thermalRadiometric:"Radiometric thermal", launchSite:"Launch site", referenceFrame:"Reference frame", anomalyHotspot:"Anomaly hotspot", hotspotTemperature:"Hotspot temperature", baselineTemperature:"Baseline temperature", temperatureDelta:"Temperature delta", linkedIncident:"Linked incident", evidenceIntegrity:"Evidence integrity", hashed:"Hash verified", classification:"Classification", operationalUse:"Operational use", evidenceCount:"Evidence count", dataVolume:"Data volume", checksumVerified:"Checksum verified", exportEvidence:"Export evidence", markForReview:"Mark for review", createIncident:"Create incident", compareFrames:"Compare frames", thermalAnomaly:"Thermal anomaly", towerConnector:"Tower connector",
      airspaceIntelligence:"Airspace intelligence", weatherIntelligence:"Weather intelligence", networkIntelligence:"Command network", baseNetwork:"Base network", openAirspace:"Open airspace", openWeather:"Open weather", openNetwork:"Open network", openBases:"Open bases", controlledSectors:"Controlled sectors", activeRestrictions:"Active restrictions", openNotams:"Open NOTAMs", corridorCapacity:"Corridor capacity", routeConflicts:"Route conflicts", deconflicted:"Deconflicted", flightAuthorization:"Flight authorization", riskScore:"Risk score", lowRisk:"Low risk", flightPlan:"Flight plan", waypointRegister:"Waypoint register", coordinates:"Coordinates", targetAltitude:"Target altitude", action:"Action", completed:"Completed", current:"Current", upcoming:"Upcoming", corridor:"Corridor", verticalProfile:"Vertical profile", geofenceClearance:"Geofence clearance", remoteId:"Remote ID", adsb:"ADS-B", notam:"NOTAM", authority:"Authority", validUntil:"Valid until", environmentalEnvelope:"Environmental envelope", windAtAltitude:"Wind at altitude", visibilityRange:"Visibility", precipitation:"Precipitation", crosswind:"Crosswind", humidity:"Humidity", cloudBase:"Cloud base", gpsQuality:"GNSS quality", satellitesCount:"Satellites", latency:"Latency", packetLoss:"Packet loss", failover:"Failover", operationalBases:"Operational bases", availablePads:"Available pads", chargingSlots:"Charging slots", turnaroundTime:"Turnaround time", missionControlRoom:"Mission control room", evidenceReview:"Evidence review", renderingQuality:"Rendering quality", balanced:"Balanced", highFidelity:"High fidelity", balancedRenderingNote:"Balanced keeps every 3D function while reducing GPU memory and redraw work."
    },
    ar: {
      appTitle:"مركز القيادة الوطني للأنظمة الذاتية", appSubtitle:"القيادة والمراقبة والتحكم المدعومة بالذكاء الاصطناعي للتنقل الذاتي",
      demoMode:"الوضع التجريبي", operationalQueue:"قائمة العمليات", liveIncidents:"الحوادث النشطة", viewAll:"عرض الكل",
      machineAssessment:"التقييم الآلي", recentAiAlerts:"تنبيهات الذكاء الاصطناعي", live:"مباشر", nationalPicture:"الصورة التشغيلية الوطنية",
      uaeOperationalMap:"الخريطة التشغيلية لدولة الإمارات", searchMap:"البحث عن أصل أو حادث أو موقع", footerTitle:"مركز القيادة الوطني للأنظمة الذاتية",
      footerNote:"تصور توضيحي · بيانات تشغيلية محاكاة", pause:"إيقاف", resume:"استئناف", reset:"إعادة ضبط",
      globalSearch:"البحث في الأصول والحوادث والمهام", identitySimulation:"محاكاة الهوية", switchOperator:"تبديل المستخدم",
      roleIntro:"غيّر الهوية التجريبية لمشاهدة استجابة التنقل والبيانات وتفاصيل الخريطة وصلاحيات القيادة للدور والنطاق.",
      accessMatrix:"مصفوفة الصلاحيات", auditTrail:"سجل التدقيق", scope:"النطاق التشغيلي", domains:"المجالات", regions:"المناطق",
      clearance:"التصريح", commandAuthority:"صلاحية القيادة", national:"وطني", allDomains:"جميع المجالات", allEmirates:"جميع الإمارات",
      readOnly:"للقراءة فقط", approve:"اعتماد", requestApproval:"طلب اعتماد", permitted:"مسموح", restricted:"مقيد",
      masked:"محجوب", aggregated:"مجمّع", exact:"دقيق", demoIdentity:"هوية تجريبية", activeSession:"الجلسة النشطة",
      totalAssets:"إجمالي الأصول", activeMissions:"المهام النشطة", activeDrones:"الطائرات النشطة", activeRobots:"الروبوتات النشطة",
      marineAssets:"الأصول البحرية", autonomousVehicles:"المركبات الذاتية", activeIncidents:"الحوادث النشطة", aiAlerts:"تنبيهات الذكاء الاصطناعي",
      avgResponse:"متوسط الاستجابة", fleetAvailability:"جاهزية الأسطول", fromPrevious:"مقارنة بالفترة السابقة", withinScope:"ضمن نطاقك",
      selectedAsset:"الأصل المحدد", missionProgress:"تقدم المهمة", quickActions:"إجراءات سريعة", track:"تتبع", follow:"متابعة",
      view:"عرض", command:"تحكم", more:"المزيد", dispatch:"إرسال", returnHome:"العودة للقاعدة", hold:"إيقاف مؤقت", viewCamera:"عرض الكاميرا",
      battery:"البطارية", speed:"السرعة", altitude:"الارتفاع", mission:"المهمة", operator:"المشغّل", connectivity:"الاتصال",
      lastUpdate:"آخر تحديث", location:"الموقع", status:"الحالة", model:"الطراز", active:"نشط", online:"متصل",
      created:"تم الإنشاء", enRoute:"في الطريق", onSite:"في الموقع", analysis:"التحليل", complete:"مكتملة",
      infrastructureInspection:"فحص البنية التحتية", fleetDistribution:"توزيع الأسطول", assetStatus:"حالة الأصول",
      missionVolume:"حجم المهام", incidentsSeverity:"الحوادث حسب الخطورة", systemStatus:"حالة الأنظمة", operational:"يعمل",
      maintenance:"صيانة", offline:"غير متصل", critical:"حرج", high:"عالٍ", medium:"متوسط", low:"منخفض",
      drones:"الطائرات بدون طيار", robots:"الروبوتات", vehicles:"المركبات", maritime:"البحرية", air:"الجو", land:"البر", sea:"البحر",
      incidents:"الحوادث", zones:"المناطق التشغيلية", corridors:"مسارات المهام", weather:"الطقس", cameras:"الكاميرات المباشرة",
      tactical:"تكتيكية", mode2d:"خريطة ثنائية الأبعاد", satellite:"جوية", terrain:"تضاريس", mode3d:"خريطة ثلاثية الأبعاد", layers:"الطبقات", basemap:"الخريطة الأساسية",
      mapOffline:"خريطة تشغيلية احتياطية", mapLive:"خريطة أساسية حية", mappedAssets:"الأصول المعروضة", filteredByRole:"مفلترة حسب الدور والنطاق",
      accessDenied:"تم رفض الوصول", permissionReason:"هذا الإجراء خارج صلاحيات الدور الحالي أو نطاقه التشغيلي.",
      commandRecorded:"تم تسجيل الأمر", requestRecorded:"تم إرسال طلب الاعتماد", identityChanged:"تم تغيير الهوية التجريبية",
      rolePermissions:"صلاحيات الدور", capability:"الصلاحية", dataVisibility:"إتاحة البيانات", authorizedActions:"الإجراءات المصرح بها",
      exactLocations:"المواقع الدقيقة للأصول", operatorIdentity:"هوية المشغّل", cameraAccess:"الوصول إلى الكاميرات المباشرة",
      dispatchAssets:"إرسال الأصول", emergencyOverride:"التجاوز في الطوارئ", highRiskApproval:"اعتماد المخاطر العالية",
      missionControl:"تغيير المهمة", auditAccess:"الوصول إلى التدقيق والأدلة", exportAccess:"تصدير البيانات التشغيلية",
      securityAccess:"إدارة الأمن", event:"الحدث", actor:"المنفذ", result:"النتيجة", time:"الوقت", reason:"السبب",
      roleChange:"تبديل الدور", assetOpened:"فتح سجل الأصل", incidentOpened:"فتح مشهد قيادة الحادث",
      mapLayerChanged:"تغيير طبقة الخريطة", commandIssued:"إصدار أمر تشغيلي", exportRequested:"طلب تصدير",
      incidentCommand:"قيادة الحادث", currentAssessment:"التقييم الحالي", affectedAssets:"الأصول المتأثرة", responseTimeline:"الخط الزمني للاستجابة",
      recommendedActions:"الإجراءات الموصى بها", evidence:"الأدلة", confidence:"درجة الثقة", severity:"الخطورة", detected:"تم الرصد",
      assignedUnits:"الوحدات المكلفة", acknowledge:"تأكيد الاستلام", assignMission:"تعيين مهمة", escalate:"تصعيد", closeIncident:"إغلاق الحادث",
      assetDossier:"ملف الأصل", telemetry:"القياسات", missionHistory:"سجل المهام", health:"الحالة الفنية", sensors:"المستشعرات",
      cameraFeed:"بث الكاميرا", thermal:"حراري", normal:"عادي", night:"ليلي", privacyMasked:"محجوب وفق سياسة الدور",
      kpiAnalysis:"تحليل المؤشر", sevenDayTrend:"اتجاه سبعة أيام", emirateBreakdown:"التوزيع حسب الإمارة", domainBreakdown:"التوزيع حسب المجال",
      operationalImpact:"الأثر التشغيلي", alertsPrioritized:"تم ترتيب التنبيهات حسب الخطورة ودرجة الثقة وتأثيرها في الخدمات الحيوية.",
      noResults:"لا توجد سجلات تطابق الدور والنطاق والبحث الحالي.", pendingModule:"وحدة مخطط تطويرها في مرحلة لاحقة",
      pendingModuleDetail:"التنقل يطبق الصلاحيات بالفعل. سيتم تطوير هذه الوحدة التشغيلية والتحقق منها في مرحلتها المخصصة.",
      close:"إغلاق", simulationRunning:"المحاكاة تعمل", simulationPaused:"المحاكاة متوقفة", demoData:"بيانات تجريبية",
      roleBasedView:"عرض حسب الدور", limitedScope:"نطاق محدود", fullAuthority:"صلاحية كاملة", approvalRequired:"يتطلب اعتماداً",
      approximateLocation:"موقع تقريبي", confidential:"سري", restrictedData:"بيانات تشغيلية مقيدة",
      lastSevenDays:"آخر 7 أيام", responseTarget:"هدف الاستجابة", minutes:"دقيقة", available:"متاح", notAvailable:"غير متاح",
      userSwitching:"تبديل المستخدم", userSwitchingNote:"تبديل الهوية متاح فقط لأن هذا عرض توضيحي.",
      showRoleDrawer:"عرض الدور والنطاق", notifications:"الإشعارات", incidentQueue:"قائمة الحوادث", allClear:"لا توجد تنبيهات حرجة جديدة",
      autonomous:"ذاتي", remote:"عن بُعد", standby:"احتياط", inMission:"في مهمة", demoClock:"وقت السيناريو",
      approvalWorkflow:"مسار الاعتماد", submittedBy:"مقدم الطلب", approver:"المعتمد", decision:"القرار", pending:"قيد الانتظار",
      grantTemporary:"منح صلاحية مؤقتة", expiresIn:"تنتهي خلال 30 دقيقة", deny:"رفض", approveCommand:"اعتماد الأمر",
      reasonRequired:"يلزم إدخال سبب تشغيلي", enterReason:"أدخل سبب تنفيذ الأمر", cancel:"إلغاء", confirm:"تأكيد",
      fullMap:"الخريطة التشغيلية الموسعة", returnDashboard:"العودة إلى لوحة القيادة", mapUnavailable:"تعذر تحميل الخريطة الحية. الطبقة التشغيلية المحلية ما زالت فعالة.",
      scenarioName:"السيناريو 03 · خلل في البنية التحتية", exportQueued:"تم تجهيز حزمة الأدلة بصيغتي CSV وPDF", results:"نتيجة",
      liveEvidence:"دليل مباشر تجريبي", rolePolicyMask:"محجوب وفق سياسة الدور", localMap:"خريطة محلية لدولة الإمارات",
      localCartography:"خرائط تشغيلية محلية · لا تحتاج إلى اتصال", pitch:"الميل", bearing:"الاتجاه",
      rotateLeft:"تدوير إلى اليسار", rotateRight:"تدوير إلى اليمين", tiltUp:"زيادة الميل", tiltDown:"تقليل الميل", resetNorth:"إعادة اتجاه الشمال",
      orbitHint:"اسحب بالزر الأيسر للتحريك · بالزر الأيمن للدوران · العجلة للتقريب", panHint:"اسحب للتحريك · استخدم العجلة للتقريب",
      mapConnecting:"جارٍ الاتصال بخدمات العرض ثلاثي الأبعاد", mapLive3d:"ثلاثي الأبعاد مباشر", mapFallback:"الخريطة المحلية الاحتياطية", mapConsole:"لوحة التحكم بالخريطة", liveScene:"مشهد جغرافي مكاني مباشر",
      operationalLayers:"الطبقات التشغيلية", sceneLayers:"الخرائط والعرض ثلاثي الأبعاد", streetLabels:"أسماء الشوارع والأماكن", terrainElevation:"ارتفاعات التضاريس", sunShadows:"ظلال الشمس والمباني",
      buildingAppearance:"مظهر المباني", buildingOpacity:"شفافية المباني", naturalBuildings:"طبيعي", graphite:"جرافيتي", commandCyan:"سماوي قيادي", alertAmber:"كهرماني تنبيهي", incidentRed:"أحمر الحوادث",
      translucent:"شفاف", solid:"مصمت", autoOrbit:"دوران مستمر بزاوية 360°", orbit:"دوران", topDown:"علوي", oblique:"مائل",
      panUp:"تحريك شمالاً", panDown:"تحريك جنوباً", panLeft:"تحريك غرباً", panRight:"تحريك شرقاً", uaeOverview:"الإمارات", abuDhabi:"أبوظبي", yasIsland:"جزيرة ياس", dubai:"دبي",
      enterFullscreen:"ملء الشاشة", exitFullscreen:"الخروج من ملء الشاشة", assetSymbology:"تمثيل الأصول", automatic:"تلقائي", silhouettes2d:"رموز ثنائية الأبعاد", models3d:"نماذج ثلاثية الأبعاد",
      assetSymbologyNote:"يعرض الوضع التلقائي رموزاً واضحة على مستوى الدولة ونماذج ثلاثية الأبعاد داخل المدن، مع منارات تعريف دائمة في جميع المشاهد.", airIsrFeed:"الاستطلاع الجوي", landMobilityFeed:"التنقل البري", maritimePatrolFeed:"الدورية البحرية", robotInspectionFeed:"الفحص الروبوتي",
      multiDomainFeed:"بث مباشر متعدد المجالات", networkLatency:"زمن استجابة الشبكة", missionRange:"نطاق المهمة", sensorHealth:"سلامة المستشعرات", operationalContext:"السياق التشغيلي", sensorFusion:"دمج المستشعرات", aiEngine:"محرك الذكاء الاصطناعي", secure:"آمن", openAsset:"فتح الأصل",
      droneOperationsCenter:"مركز عمليات الطائرات بدون طيار", airDomainPicture:"الصورة التشغيلية للمجال الجوي", droneFleet:"أسطول الطائرات بدون طيار", searchDrone:"البحث عن طائرة أو طراز أو موقع", allStatus:"جميع الحالات", attention:"يتطلب الانتباه", totalDrones:"إجمالي الطائرات", inMissionCount:"في مهمة", onStandby:"في وضع الاستعداد", inMaintenance:"قيد الصيانة", totalFlightTime:"إجمالي زمن الطيران", totalDistance:"إجمالي المسافة", missionSuccessRate:"معدل نجاح المهام", averageBattery:"متوسط البطارية",
      selectedDrone:"الطائرة المحددة", liveCameraFeed:"البث المباشر للكاميرا", wide:"زاوية واسعة", zoomView:"تقريب", controlActions:"إجراءات التحكم", changeMission:"تغيير المهمة", emergency:"طوارئ", flightOperationsMap:"خريطة عمليات الطائرات", flightPicture:"صورة الطيران المباشرة", missionDetails:"تفاصيل المهمة", missionType:"نوع المهمة", priority:"الأولوية", area:"المنطقة", startTime:"وقت البدء", endTime:"وقت الانتهاء", objective:"الهدف", inspectTowers:"فحص الأبراج والمعدات", inProgress:"قيد التنفيذ", routeCompliance:"الالتزام بالمسار", waypoints:"نقاط المسار", eta:"الوقت المتوقع", flightMode:"نمط الطيران", gpsSatellites:"أقمار GPS", signalStrength:"قوة الإشارة", homeDistance:"المسافة إلى القاعدة", payload:"الحمولة", eoIrCamera:"كاميرا كهروضوئية وحرارية", lidarScanner:"ماسح ليدار", obstacleAvoidance:"تجنب العوائق", sensorsOnline:"المستشعرات المتصلة",
      recentMissionEvents:"أحداث المهمة الأخيرة", preflightComplete:"اكتملت فحوصات ما قبل الطيران", arrivedWaypoint:"الوصول إلى نقطة المسار 3", capturedImages:"التقاط مجموعة الصور الحرارية", departedBase:"المغادرة من القاعدة", missionAuthorized:"تم اعتماد المهمة", routeCalculated:"تم احتساب المسار الآمن", aiFlightInsights:"رؤى الطيران بالذكاء الاصطناعي", noAnomalies:"لم يتم رصد أي خلل في الطيران", imageQualityGood:"جودة الصور مناسبة للتحليل", batteryNormal:"استهلاك البطارية ضمن الخطة", restrictedZoneClear:"تم الحفاظ على الفصل عن المجال الجوي المقيد", additionalCapture:"التقاط صور إضافية للبرج الشمالي", flightCorridors:"مسارات الطيران", noFlyZones:"مناطق حظر الطيران", landingPads:"منصات الهبوط", batteryReserve:"احتياطي البطارية", airspaceClearance:"تصريح المجال الجوي", weatherEnvelope:"نطاق الطقس المسموح", commandLink:"رابط القيادة", encrypted:"مشفّر", currentMission:"المهمة الحالية", flightTelemetry:"قياسات الطيران", recentMissions:"المهام الأخيرة", maintenanceDue:"موعد الصيانة", flightHours:"ساعات الطيران", completedToday:"المكتملة اليوم", activeNow:"نشطة الآن", fleetSearchResults:"سجلات الأسطول", lastContact:"آخر اتصال", assignedPilot:"المشغّل المكلّف", autonomousControl:"تحكم ذاتي", missionPackage:"حزمة المهمة", viewMission:"عرض المهمة", openTelemetry:"فتح القياسات", cameraModeChanged:"تم تغيير وضع الكاميرا", hoursShort:"ساعة", kilometresShort:"كم",
      readiness:"الجاهزية", payloadSystems:"أنظمة الحمولة", airframeHours:"ساعات هيكل الطائرة", batteryCycles:"دورات البطارية", nextService:"الصيانة التالية", firmware:"البرنامج الثابت", motorHealth:"سلامة المحركات", propellerHealth:"سلامة المراوح", storageRemaining:"مساحة التخزين المتبقية", opticalZoom:"التقريب البصري", radiometric:"إشعاعي حراري", gimbal:"مثبت الكاميرا", aiDetector:"كاشف الذكاء الاصطناعي", maintenanceRecord:"سجل الصيانة", preflightChecklist:"قائمة ما قبل الطيران",
      evidenceWorkbench:"منصة مراجعة الأدلة", captureFrame:"التقاط إطار", compareEvidence:"مقارنة الأدلة", aiInspect:"فحص بالذكاء الاصطناعي", fullEvidence:"فتح الأدلة", imageType:"نوع الصورة", rgbVisual:"صورة مرئية", thermalRadiometric:"تصوير حراري إشعاعي", launchSite:"موقع الإطلاق", referenceFrame:"إطار مرجعي", anomalyHotspot:"نقطة حرارة غير طبيعية", hotspotTemperature:"حرارة النقطة الساخنة", baselineTemperature:"درجة الحرارة المرجعية", temperatureDelta:"فارق الحرارة", linkedIncident:"الحادث المرتبط", evidenceIntegrity:"سلامة الدليل", hashed:"تم التحقق من البصمة", classification:"التصنيف", operationalUse:"الاستخدام التشغيلي", evidenceCount:"عدد الأدلة", dataVolume:"حجم البيانات", checksumVerified:"تم التحقق من البصمة", exportEvidence:"تصدير الأدلة", markForReview:"وضع علامة للمراجعة", createIncident:"إنشاء حادث", compareFrames:"مقارنة الإطارات", thermalAnomaly:"خلل حراري", towerConnector:"موصل البرج",
      airspaceIntelligence:"معلومات المجال الجوي", weatherIntelligence:"معلومات الطقس", networkIntelligence:"شبكة القيادة", baseNetwork:"شبكة القواعد", openAirspace:"فتح المجال الجوي", openWeather:"فتح الطقس", openNetwork:"فتح الشبكة", openBases:"فتح القواعد", controlledSectors:"القطاعات المراقبة", activeRestrictions:"القيود النشطة", openNotams:"إشعارات الطيران المفتوحة", corridorCapacity:"سعة المسارات", routeConflicts:"تعارضات المسار", deconflicted:"تم منع التعارض", flightAuthorization:"اعتماد الطيران", riskScore:"درجة المخاطر", lowRisk:"مخاطر منخفضة", flightPlan:"خطة الطيران", waypointRegister:"سجل نقاط المسار", coordinates:"الإحداثيات", targetAltitude:"الارتفاع المستهدف", action:"الإجراء", completed:"مكتملة", current:"حالية", upcoming:"قادمة", corridor:"المسار", verticalProfile:"المسار الرأسي", geofenceClearance:"الابتعاد عن الحدود الجغرافية", remoteId:"الهوية عن بعد", adsb:"نظام ADS-B", notam:"إشعار طيران", authority:"الجهة المخولة", validUntil:"صالح حتى", environmentalEnvelope:"النطاق البيئي", windAtAltitude:"الرياح عند الارتفاع", visibilityRange:"مدى الرؤية", precipitation:"الهطول", crosswind:"الرياح الجانبية", humidity:"الرطوبة", cloudBase:"قاعدة السحب", gpsQuality:"جودة الملاحة", satellitesCount:"الأقمار", latency:"زمن الاستجابة", packetLoss:"فقدان الحزم", failover:"التحويل الاحتياطي", operationalBases:"القواعد التشغيلية", availablePads:"المنصات المتاحة", chargingSlots:"مواقع الشحن", turnaroundTime:"زمن التجهيز", missionControlRoom:"غرفة التحكم بالمهمة", evidenceReview:"مراجعة الأدلة", renderingQuality:"جودة العرض", balanced:"متوازن", highFidelity:"دقة عالية", balancedRenderingNote:"يحافظ الوضع المتوازن على جميع وظائف العرض ثلاثي الأبعاد مع خفض استهلاك ذاكرة الرسوم وإعادة الرسم."
    }
  };

  Object.assign(T.en,{landDomainPicture:"Land-domain operating picture",roboticsCommandCenter:"Robotics Command Center",groundFleetRegister:"Ground fleet register",robotFleet:"Robot fleet",searchRobot:"Search robot, type or location",type:"Type",mission:"Mission",health:"Health",robotFleetMap:"Robot Fleet Map",robotOperationsPicture:"Robot operating picture",remoteControlAccess:"Remote robot control"});
  Object.assign(T.ar,{landDomainPicture:"صورة العمليات الأرضية",roboticsCommandCenter:"مركز قيادة الروبوتات",groundFleetRegister:"سجل الأسطول الأرضي",robotFleet:"أسطول الروبوتات",searchRobot:"ابحث عن روبوت أو نوع أو موقع",type:"النوع",mission:"المهمة",health:"السلامة",robotFleetMap:"خريطة أسطول الروبوتات",robotOperationsPicture:"صورة عمليات الروبوتات",remoteControlAccess:"التحكم عن بعد بالروبوتات"});
  Object.assign(T.en,{seaDomainPicture:"Sea-domain operating picture",maritimeOperationsCenter:"Maritime Operations Center",maritimeFleet:"Maritime fleet",searchVessel:"Search vessel, port or mission",maritimeOperationalMap:"Maritime Operational Map",maritimePicture:"Live coastal operating picture",remoteHelmAccess:"Remote vessel helm",navigationZones:"Navigation zones",shippingLanes:"Shipping lanes",portsBases:"Ports and bases",aisContacts:"AIS contacts"});
  Object.assign(T.en,{presentationMode:"Presentation mode",demoGuide:"Demo guide",guidedWalkthrough:"Guided walkthrough",guidedWalkthroughIntro:"A concise route through the strongest operational, geospatial and governance moments in the demo.",presentationReady:"Presentation ready",presentationControls:"Presentation controls",presentationControlsNote:"Use a guided stop, switch identity to demonstrate granular access, or restore the approved opening state.",openSection:"Open section",switchIdentity:"Switch identity",restartDemo:"Restart full demo",restartDemoConfirm:"Restore the National Commander, dark theme, English language and Command Center opening view?",restartNow:"Restart now",integrationReady:"View and Launch integration ready",keyboardHelp:"Keyboard: G opens this guide · Alt + ←/→ moves between authorized modules · Esc closes overlays.",scenePerformance:"The real ArcGIS 3D scene is cached once and suspended whenever a map-free module or browser tab is inactive.",recommendedSequence:"Recommended presentation sequence",guideCommand:"National operating picture",guideMap:"Real UAE 3D scene",guideTwin:"Federated digital twin",guideRoles:"Granular role control",guideIncident:"Incident command",guideAnalytics:"Executive outcomes",guideReports:"Governed evidence",openingState:"Approved opening state",fontSize:"Text size",fontSmall:"Small text",fontMedium:"Medium text",fontLarge:"Large text"});
  Object.assign(T.ar,{seaDomainPicture:"صورة العمليات البحرية",maritimeOperationsCenter:"مركز العمليات البحرية",maritimeFleet:"الأسطول البحري",searchVessel:"البحث عن سفينة أو ميناء أو مهمة",maritimeOperationalMap:"الخريطة التشغيلية البحرية",maritimePicture:"صورة العمليات الساحلية الحية",remoteHelmAccess:"التحكم عن بعد بدفة السفينة",navigationZones:"مناطق الملاحة",shippingLanes:"ممرات الشحن",portsBases:"الموانئ والقواعد",aisContacts:"أهداف نظام التعرف الآلي"});
  Object.assign(T.ar,{presentationMode:"وضع العرض",demoGuide:"دليل العرض",guidedWalkthrough:"جولة عرض موجهة",guidedWalkthroughIntro:"مسار موجز لأقوى لحظات التشغيل والخرائط والحوكمة في العرض التجريبي.",presentationReady:"جاهز للعرض",presentationControls:"عناصر تحكم العرض",presentationControlsNote:"انتقل إلى محطة موجهة أو بدّل الهوية لعرض دقة الصلاحيات أو استعد حالة الافتتاح المعتمدة.",openSection:"فتح القسم",switchIdentity:"تبديل الهوية",restartDemo:"إعادة تشغيل العرض بالكامل",restartDemoConfirm:"هل تريد استعادة القائد الوطني والوضع الداكن واللغة الإنجليزية وشاشة مركز القيادة؟",restartNow:"إعادة التشغيل الآن",integrationReady:"تكامل العرض والإطلاق جاهز",keyboardHelp:"لوحة المفاتيح: يفتح G هذا الدليل · ينتقل Alt + ←/→ بين الوحدات المصرح بها · يغلق Esc النوافذ.",scenePerformance:"يتم تخزين مشهد ArcGIS ثلاثي الأبعاد الحقيقي مرة واحدة وإيقافه مؤقتاً عند فتح وحدة بلا خريطة أو إخفاء نافذة المتصفح.",recommendedSequence:"تسلسل العرض الموصى به",guideCommand:"الصورة التشغيلية الوطنية",guideMap:"مشهد الإمارات الحقيقي ثلاثي الأبعاد",guideTwin:"التوأم الرقمي الاتحادي",guideRoles:"التحكم الدقيق حسب الدور",guideIncident:"قيادة الحوادث",guideAnalytics:"النتائج التنفيذية",guideReports:"الأدلة المحكومة",openingState:"حالة الافتتاح المعتمدة",fontSize:"حجم النص",fontSmall:"نص صغير",fontMedium:"نص متوسط",fontLarge:"نص كبير"});

  const nav = [
    ["command","home","Command Center","مركز القيادة"],["live-map","pin","Live Map","الخريطة الحية"],
    ["drone-ops","drone","Drone Operations","عمليات الطائرات بدون طيار"],["robotics","bot","Robotics","الروبوتات"],
    ["maritime","ship","Maritime","العمليات البحرية"],["mobility","car","Autonomous Mobility","التنقل الذاتي"],
    ["ai","brain","AI Intelligence","الذكاء الاصطناعي"],["incidents","alert","Incidents","الحوادث"],
    ["fleet","fleet","Fleet","الأسطول"],["digital-twin","twin","Digital Twin","التوأم الرقمي"],
    ["analytics","chart","Analytics","التحليلات"],["security","shield","Security","الأمن"],
    ["missions","target","Missions","المهام"],["reports","report","Reports","التقارير"],["settings","settings","Settings","الإعدادات"]
  ].map(x=>({id:x[0],icon:x[1],label:{en:x[2],ar:x[3]}}));

  const permissionLabels = {
    exactLocation:"exactLocations", operatorIdentity:"operatorIdentity", camera:"cameraAccess", dispatch:"dispatchAssets",
    emergency:"emergencyOverride", approveHighRisk:"highRiskApproval", changeMission:"missionControl", audit:"auditAccess",
    export:"exportAccess", securityAdmin:"securityAccess", manageSecurity:"securityResponseAccess", approveRestore:"securityRestoreAccess", manageMissions:"missionPlanningAccess", approveMission:"missionApprovalAccess", manageReports:"reportPublishingAccess", manageSettings:"systemAdministrationAccess", remoteControl:"remoteControlAccess", remoteHelm:"remoteHelmAccess", teleoperate:"teleoperateAccess", manageModels:"modelActionsAccess", approveAI:"aiApprovalAccess", manageIncidents:"incidentCommandAccess", approveClosure:"incidentClosureAccess", publicWarning:"publicWarningAccess", manageTwin:"manageTwinAccess", runSimulation:"simulationAccess", isolateInfrastructure:"infrastructureIsolationAccess", manageFleet:"manageFleetAccess", approveMaintenance:"maintenanceApprovalAccess", manageConfiguration:"configurationControlAccess"
  };

  Object.assign(T.en,{mobilityPicture:"Road-network operating picture",mobilityOperationalMap:"Autonomous Mobility Operations Map",searchVehicle:"Search vehicle, route or service",roadNetwork:"Road network",intersections:"Smart intersections",depots:"Mobility hubs",v2xNodes:"V2X nodes",mobilityZones:"Mobility zones",teleoperateAccess:"Autonomous vehicle teleoperation",aiOperationsPicture:"National AI inference picture",aiOperationalMap:"AI Detection & Decision Map",searchAi:"Search model, detection or location",aiDetectionsLabel:"AI detections",edgeNodes:"Edge AI nodes",modelActionsAccess:"AI model operations",aiApprovalAccess:"AI decision approval"});
  Object.assign(T.ar,{mobilityPicture:"صورة تشغيل شبكة الطرق",mobilityOperationalMap:"خريطة عمليات التنقل الذاتي",searchVehicle:"ابحث عن مركبة أو مسار أو خدمة",roadNetwork:"شبكة الطرق",intersections:"التقاطعات الذكية",depots:"مراكز التنقل",v2xNodes:"عُقد الاتصال V2X",mobilityZones:"مناطق التنقل",teleoperateAccess:"التشغيل عن بُعد للمركبة الذاتية",aiOperationsPicture:"صورة الاستدلال الوطني للذكاء الاصطناعي",aiOperationalMap:"خريطة اكتشافات وقرارات الذكاء الاصطناعي",searchAi:"ابحث عن نموذج أو اكتشاف أو موقع",aiDetectionsLabel:"اكتشافات الذكاء الاصطناعي",edgeNodes:"عُقد الذكاء الاصطناعي الطرفية",modelActionsAccess:"عمليات نماذج الذكاء الاصطناعي",aiApprovalAccess:"اعتماد قرارات الذكاء الاصطناعي"});
  Object.assign(T.en,{incidentOperationsPicture:"National incident operating picture",incidentOperationalMap:"Incident Response & Coordination Map",searchIncident:"Search incident, location or responding unit",incidentCommandAccess:"Incident command and orchestration",incidentClosureAccess:"Incident closure approval",publicWarningAccess:"Public warning authorization",responseZones:"Response zones",respondingUnits:"Responding units",incidentPosts:"Incident command posts"});
  Object.assign(T.ar,{incidentOperationsPicture:"صورة العمليات الوطنية للحوادث",incidentOperationalMap:"خريطة الاستجابة للحوادث والتنسيق",searchIncident:"ابحث عن حادث أو موقع أو وحدة استجابة",incidentCommandAccess:"قيادة الحوادث وتنسيق الاستجابة",incidentClosureAccess:"اعتماد إغلاق الحوادث",publicWarningAccess:"اعتماد التحذير العام",responseZones:"مناطق الاستجابة",respondingUnits:"وحدات الاستجابة",incidentPosts:"مراكز قيادة الحوادث"});

  Object.assign(T.en,{twinOperationsPicture:"National digital-twin operating picture",twinOperationalMap:"UAE Live Digital Twin",searchTwin:"Search city, district, facility or sensor",twinRegistry:"Live federated model",digitalTwinLayers:"Digital Twin Layers",manageTwinAccess:"Digital-twin configuration",simulationAccess:"Scenario simulation authority",infrastructureIsolationAccess:"Critical infrastructure isolation",twinObjects:"Twin objects",criticalSites:"Critical sites",modelFreshness:"Model freshness",infrastructureHealth:"Infrastructure health",simulationReady:"Simulation ready",utilityNetworks:"Utility networks",sensorMesh:"Sensor mesh",scenarioZones:"Scenario impact zones"});
  Object.assign(T.ar,{twinOperationsPicture:"صورة العمليات الوطنية للتوأم الرقمي",twinOperationalMap:"التوأم الرقمي الحي لدولة الإمارات",searchTwin:"ابحث عن مدينة أو منطقة أو منشأة أو مستشعر",twinRegistry:"النموذج الاتحادي الحي",digitalTwinLayers:"طبقات التوأم الرقمي",manageTwinAccess:"إعدادات التوأم الرقمي",simulationAccess:"صلاحية محاكاة السيناريو",infrastructureIsolationAccess:"عزل البنية التحتية الحيوية",twinObjects:"كائنات التوأم",criticalSites:"المواقع الحيوية",modelFreshness:"حداثة النموذج",infrastructureHealth:"سلامة البنية التحتية",simulationReady:"المحاكاة جاهزة",utilityNetworks:"شبكات المرافق",sensorMesh:"شبكة المستشعرات",scenarioZones:"مناطق تأثير السيناريو"});

  Object.assign(T.en,{liveMapOperationsPicture:"National multi-domain common operating picture",liveNationalMap:"UAE Live Multi-Domain Map",searchNationalMap:"Search contact, event, zone or location",commonOperatingPicture:"Common operating picture",domainIntelligenceLayers:"Domain & Intelligence Layers",fleetOperationsPicture:"National fleet readiness picture",fleetDeploymentMap:"Fleet Deployment & Readiness Map",searchFleet:"Search asset, depot or work order",nationalAssetRegister:"National asset register",unifiedFleet:"Unified Fleet",manageFleetAccess:"Fleet lifecycle control",maintenanceApprovalAccess:"Maintenance release approval",configurationControlAccess:"Configuration baseline authority"});
  Object.assign(T.ar,{liveMapOperationsPicture:"الصورة التشغيلية الوطنية المشتركة متعددة المجالات",liveNationalMap:"الخريطة الوطنية الحية متعددة المجالات",searchNationalMap:"ابحث عن هدف أو حدث أو منطقة أو موقع",commonOperatingPicture:"الصورة التشغيلية المشتركة",domainIntelligenceLayers:"طبقات المجالات والاستخبارات",fleetOperationsPicture:"صورة جاهزية الأسطول الوطني",fleetDeploymentMap:"خريطة انتشار وجاهزية الأسطول",searchFleet:"ابحث عن أصل أو مستودع أو أمر عمل",nationalAssetRegister:"سجل الأصول الوطني",unifiedFleet:"الأسطول الموحد",manageFleetAccess:"إدارة دورة حياة الأسطول",maintenanceApprovalAccess:"اعتماد الإفراج بعد الصيانة",configurationControlAccess:"صلاحية خط الأساس للإعدادات"});
  Object.assign(T.en,{securityResponseAccess:"Cyber-security containment authority",securityRestoreAccess:"Security restoration approval"});
  Object.assign(T.ar,{securityResponseAccess:"صلاحية الاحتواء السيبراني",securityRestoreAccess:"اعتماد الاستعادة الأمنية"});
  Object.assign(T.en,{missionPlanningAccess:"Joint-mission planning and control",missionApprovalAccess:"High-risk mission approval",reportPublishingAccess:"Governed report publication",systemAdministrationAccess:"Platform configuration administration"});
  Object.assign(T.ar,{missionPlanningAccess:"تخطيط وقيادة المهام المشتركة",missionApprovalAccess:"اعتماد المهام عالية المخاطر",reportPublishingAccess:"نشر التقارير المحكومة",systemAdministrationAccess:"إدارة إعدادات المنصة"});

  const users = [
    {id:"aisha",initials:"AM",name:{en:"Dr. Aisha Al Mansoori",ar:"د. عائشة المنصوري"},role:{en:"National Commander",ar:"قائد العمليات الوطني"},roleCode:"NAT-CMD",clearance:"Level 5",domains:"all",regions:"all",visibility:"exact",authority:"full",permissions:["exactLocation","operatorIdentity","camera","dispatch","emergency","approveHighRisk","changeMission","remoteControl","remoteHelm","teleoperate","manageModels","approveAI","manageIncidents","approveClosure","publicWarning","manageTwin","runSimulation","isolateInfrastructure","audit","export","securityAdmin"],nav:nav.map(n=>n.id),accent:"red"},
    {id:"mariam",initials:"MS",name:{en:"Mariam Al Suwaidi",ar:"مريم السويدي"},role:{en:"Robotics Operations Commander",ar:"قائدة عمليات الروبوتات"},roleCode:"ROB-CMD",clearance:"Level 4",domains:["robot"],regions:"all",visibility:"exact",authority:"domain",permissions:["exactLocation","operatorIdentity","camera","dispatch","emergency","changeMission","remoteControl","export"],nav:["command","live-map","robotics","ai","incidents","fleet","digital-twin","analytics","missions","reports"],accent:"green"},
    {id:"omar",initials:"ON",name:{en:"Omar Al Nuaimi",ar:"عمر النعيمي"},role:{en:"Air Domain Commander",ar:"قائد المجال الجوي"},roleCode:"AIR-CMD",clearance:"Level 4",domains:["drone"],regions:"all",visibility:"exact",authority:"domain",permissions:["exactLocation","operatorIdentity","camera","dispatch","approveHighRisk","changeMission","export"],nav:["command","live-map","drone-ops","ai","incidents","fleet","digital-twin","analytics","missions","reports"],accent:"cyan"},
    {id:"sherif",initials:"SK",name:{en:"Sherif Kamal",ar:"شريف كمال"},role:{en:"Incident Manager",ar:"مدير الحوادث"},roleCode:"INC-MGR",clearance:"Level 4",domains:"all",regions:["Abu Dhabi","Dubai"],visibility:"exact",authority:"incident",permissions:["exactLocation","operatorIdentity","camera","dispatch","changeMission","manageIncidents","approveClosure","publicWarning","audit","export"],nav:["command","live-map","drone-ops","robotics","maritime","mobility","ai","incidents","fleet","analytics","missions","reports"],accent:"amber"},
    {id:"khalid",initials:"KM",name:{en:"Khalid Al Mazrouei",ar:"خالد المزروعي"},role:{en:"Maritime Operations Lead",ar:"مسؤول العمليات البحرية"},roleCode:"SEA-OPS",clearance:"Level 3",domains:["marine"],regions:["Abu Dhabi","Fujairah"],visibility:"exact",authority:"domain",permissions:["exactLocation","operatorIdentity","camera","dispatch","changeMission","remoteHelm"],nav:["command","live-map","maritime","ai","incidents","fleet","analytics","missions","reports"],accent:"blue"},
    {id:"sara",initials:"SK",name:{en:"Sara Al Kaabi",ar:"سارة الكعبي"},role:{en:"Autonomous Mobility Commander",ar:"قائدة عمليات التنقل الذاتي"},roleCode:"MOB-CMD",clearance:"Level 4",domains:["vehicle"],regions:"all",visibility:"exact",authority:"domain",permissions:["exactLocation","operatorIdentity","camera","dispatch","emergency","approveHighRisk","changeMission","teleoperate","export"],nav:["command","live-map","mobility","ai","incidents","fleet","digital-twin","analytics","missions","reports"],accent:"cyan"},
    {id:"hamad",initials:"HS",name:{en:"Hamad Al Shamsi",ar:"حمد الشامسي"},role:{en:"AI Operations & Assurance Director",ar:"مدير عمليات وضمان الذكاء الاصطناعي"},roleCode:"AI-CMD",clearance:"Level 4",domains:"all",regions:"all",visibility:"exact",authority:"domain",permissions:["exactLocation","operatorIdentity","camera","manageModels","approveAI","audit","export"],nav:["command","live-map","ai","incidents","fleet","digital-twin","analytics","security","missions","reports"],accent:"violet"},
    {id:"noor",initials:"NK",name:{en:"Noor Al Ketbi",ar:"نور الكتبي"},role:{en:"Intelligence Analyst",ar:"محلل استخبارات"},roleCode:"AI-ANL",clearance:"Level 3",domains:"all",regions:"all",visibility:"masked",authority:"read",permissions:["camera","export"],nav:["command","live-map","ai","incidents","analytics","reports"],accent:"violet"},
    {id:"faisal",initials:"FH",name:{en:"Faisal Al Hammadi",ar:"فيصل الحمادي"},role:{en:"Field Operator",ar:"مشغّل ميداني"},roleCode:"FLD-OPS",clearance:"Level 2",domains:["drone","robot"],regions:["Abu Dhabi"],visibility:"exact",authority:"assigned",permissions:["exactLocation","camera","dispatch","remoteControl"],nav:["command","live-map","drone-ops","robotics","incidents","missions"],assigned:["UAV-017","UAV-010","R-008","R-003"],accent:"green"},
    {id:"leila",initials:"LQ",name:{en:"Leila Al Qasimi",ar:"ليلى القاسمي"},role:{en:"Security Auditor",ar:"مدقق أمني"},roleCode:"SEC-AUD",clearance:"Level 5",domains:"all",regions:"all",visibility:"masked",authority:"audit",permissions:["audit","export","securityAdmin"],nav:["command","drone-ops","robotics","maritime","mobility","ai","incidents","digital-twin","analytics","security","reports","settings"],accent:"steel"},
    {id:"noura",initials:"NM",name:{en:"Eng. Noura Al Marri",ar:"م. نورة المري"},role:{en:"Digital Twin & Infrastructure Director",ar:"مديرة التوأم الرقمي والبنية التحتية"},roleCode:"TWIN-CMD",clearance:"Level 4",domains:"all",regions:"all",visibility:"exact",authority:"domain",permissions:["exactLocation","operatorIdentity","camera","manageTwin","runSimulation","isolateInfrastructure","audit","export"],nav:["command","live-map","digital-twin","incidents","fleet","analytics","security","missions","reports"],accent:"cyan"},
    {id:"executive",initials:"EX",name:{en:"Executive Demonstration",ar:"العرض التنفيذي"},role:{en:"Executive Viewer",ar:"مستخدم تنفيذي"},roleCode:"EXEC-VIEW",clearance:"Level 1",domains:"all",regions:"all",visibility:"aggregated",authority:"read",permissions:["export"],nav:["command","analytics","reports"],accent:"gold"}
  ];

  users[0].permissions.push("manageFleet","approveMaintenance","manageConfiguration","manageSecurity","approveRestore","manageMissions","approveMission","manageReports","manageSettings");
  const securityAuditor=users.find(u=>u.id==="leila");
  if(securityAuditor){securityAuditor.nav.splice(1,0,"live-map");securityAuditor.nav.splice(securityAuditor.nav.indexOf("digital-twin"),0,"fleet")}
  users.splice(users.length-1,0,{id:"saeed",initials:"SD",name:{en:"Maj. Saeed Al Dhaheri",ar:"الرائد سعيد الظاهري"},role:{en:"Fleet Readiness Director",ar:"مدير جاهزية الأسطول"},roleCode:"FLT-CMD",clearance:"Level 4",domains:"all",regions:"all",visibility:"exact",authority:"domain",permissions:["exactLocation","operatorIdentity","camera","dispatch","changeMission","manageFleet","approveMaintenance","manageConfiguration","audit","export"],nav:["command","live-map","fleet","digital-twin","analytics","security","missions","reports","settings"],accent:"green"});
  users.splice(users.length-1,0,{id:"fatima",initials:"FA",name:{en:"Fatima Al Ameri",ar:"فاطمة العامري"},role:{en:"National Cyber-Physical Security Commander",ar:"قائدة الأمن السيبراني المادي الوطني"},roleCode:"SOC-CMD",clearance:"Level 5",domains:"all",regions:"all",visibility:"exact",authority:"security",permissions:["exactLocation","operatorIdentity","camera","audit","export","securityAdmin","manageSecurity","approveRestore"],nav:["command","live-map","ai","incidents","fleet","digital-twin","analytics","security","missions","reports","settings"],accent:"violet"});
  users.splice(users.length-1,0,{id:"rashid",initials:"RA",name:{en:"Col. Rashid Al Marzouqi",ar:"العقيد راشد المرزوقي"},role:{en:"Joint Mission Director",ar:"مدير المهام المشتركة"},roleCode:"JOC-CMD",clearance:"Level 5",domains:"all",regions:"all",visibility:"exact",authority:"mission",permissions:["exactLocation","operatorIdentity","camera","dispatch","changeMission","manageMissions","approveMission","audit","export"],nav:["command","live-map","drone-ops","robotics","maritime","mobility","ai","incidents","fleet","digital-twin","analytics","security","missions","reports"],accent:"red"});
  users.splice(users.length-1,0,{id:"salem",initials:"SA",name:{en:"Salem Al Mansoor",ar:"سالم المنصور"},role:{en:"Platform Systems Administrator",ar:"مسؤول أنظمة المنصة"},roleCode:"SYS-ADMIN",clearance:"Level 5",domains:"all",regions:"all",visibility:"masked",authority:"administration",permissions:["audit","export","securityAdmin","manageSettings"],nav:["command","analytics","security","reports","settings"],accent:"steel"});

  const locations = [
    {name:"Abu Dhabi",ar:"أبوظبي",lat:24.4764,lon:54.3705},{name:"Yas Island",ar:"جزيرة ياس",lat:24.488,lon:54.607},
    {name:"Al Ain",ar:"العين",lat:24.1302,lon:55.8023},{name:"Dubai",ar:"دبي",lat:25.2048,lon:55.2708},
    {name:"Jebel Ali",ar:"جبل علي",lat:24.9857,lon:55.0272},{name:"Sharjah",ar:"الشارقة",lat:25.3463,lon:55.4209},
    {name:"Ajman",ar:"عجمان",lat:25.4052,lon:55.5136},{name:"Ras Al Khaimah",ar:"رأس الخيمة",lat:25.7895,lon:55.9432},
    {name:"Fujairah",ar:"الفجيرة",lat:25.1288,lon:56.3265},{name:"Khalifa Port",ar:"ميناء خليفة",lat:24.817,lon:54.652},
    {name:"Port Zayed",ar:"ميناء زايد",lat:24.526,lon:54.389},{name:"Saadiyat Island",ar:"جزيرة السعديات",lat:24.539,lon:54.435}
  ];

  // Deliberately concentrated operational hubs. These points keep the national
  // picture credible while ensuring that a city-scale 3D camera always contains
  // useful air, land, robotics or maritime activity. Marine sites sit offshore.
  const operationalSites = {
    drone:[
      {name:"Abu Dhabi Corniche",ar:"كورنيش أبوظبي",region:"Abu Dhabi",lat:24.4788,lon:54.3547},
      {name:"Al Maryah Island",ar:"جزيرة المارية",region:"Abu Dhabi",lat:24.5018,lon:54.3886},
      {name:"Yas Island",ar:"جزيرة ياس",region:"Abu Dhabi",lat:24.4880,lon:54.6070},
      {name:"Khalifa City",ar:"مدينة خليفة",region:"Abu Dhabi",lat:24.4258,lon:54.5842},
      {name:"Dubai Downtown",ar:"وسط مدينة دبي",region:"Dubai",lat:25.1972,lon:55.2744},
      {name:"Jumeirah Coast",ar:"ساحل جميرا",region:"Dubai",lat:25.2055,lon:55.2410},
      {name:"Sharjah City",ar:"مدينة الشارقة",region:"Sharjah",lat:25.3463,lon:55.4209},
      {name:"Al Ain Central",ar:"وسط مدينة العين",region:"Abu Dhabi",lat:24.1302,lon:55.8023},
      {name:"Ras Al Khaimah City",ar:"مدينة رأس الخيمة",region:"Ras Al Khaimah",lat:25.7895,lon:55.9432},
      {name:"Fujairah City",ar:"مدينة الفجيرة",region:"Fujairah",lat:25.1288,lon:56.3265}
    ],
    robot:[
      {name:"Abu Dhabi Central District",ar:"المنطقة المركزية في أبوظبي",region:"Abu Dhabi",lat:24.4690,lon:54.3940},
      {name:"Al Maryah Island",ar:"جزيرة المارية",region:"Abu Dhabi",lat:24.4996,lon:54.3876},
      {name:"Masdar City",ar:"مدينة مصدر",region:"Abu Dhabi",lat:24.4282,lon:54.6184},
      {name:"Yas Island",ar:"جزيرة ياس",region:"Abu Dhabi",lat:24.4898,lon:54.6051},
      {name:"Dubai Downtown",ar:"وسط مدينة دبي",region:"Dubai",lat:25.1964,lon:55.2760},
      {name:"Jebel Ali Logistics Zone",ar:"منطقة جبل علي اللوجستية",region:"Dubai",lat:24.9857,lon:55.0272},
      {name:"Sharjah Industrial Area",ar:"المنطقة الصناعية في الشارقة",region:"Sharjah",lat:25.3318,lon:55.4140},
      {name:"Al Ain Central",ar:"وسط مدينة العين",region:"Abu Dhabi",lat:24.1302,lon:55.8023},
      {name:"Ras Al Khaimah Utility Zone",ar:"منطقة خدمات رأس الخيمة",region:"Ras Al Khaimah",lat:25.7680,lon:55.9340},
      {name:"Fujairah Port District",ar:"منطقة ميناء الفجيرة",region:"Fujairah",lat:25.1575,lon:56.3543}
    ],
    marine:[
      {name:"Abu Dhabi Corniche Offshore",ar:"قبالة كورنيش أبوظبي",region:"Abu Dhabi",lat:24.5100,lon:54.3420},
      {name:"Port Zayed Channel",ar:"قناة ميناء زايد",region:"Abu Dhabi",lat:24.5305,lon:54.3730},
      {name:"Yas Channel",ar:"قناة ياس",region:"Abu Dhabi",lat:24.5230,lon:54.6180},
      {name:"Khalifa Port Anchorage",ar:"مرسى ميناء خليفة",region:"Abu Dhabi",lat:24.8330,lon:54.6400},
      {name:"Jebel Ali Anchorage",ar:"مرسى جبل علي",region:"Dubai",lat:24.9720,lon:54.9670},
      {name:"Dubai Harbour",ar:"دبي هاربر",region:"Dubai",lat:25.0940,lon:55.1270},
      {name:"Ras Al Khaimah Coast",ar:"ساحل رأس الخيمة",region:"Ras Al Khaimah",lat:25.8060,lon:55.9520},
      {name:"Fujairah Anchorage",ar:"مرسى الفجيرة",region:"Fujairah",lat:25.1830,lon:56.3760}
    ],
    vehicle:[
      {name:"Abu Dhabi Corniche",ar:"كورنيش أبوظبي",region:"Abu Dhabi",lat:24.4764,lon:54.3705},
      {name:"Al Maryah Island",ar:"جزيرة المارية",region:"Abu Dhabi",lat:24.5004,lon:54.3896},
      {name:"Yas Island",ar:"جزيرة ياس",region:"Abu Dhabi",lat:24.4865,lon:54.6062},
      {name:"Masdar City",ar:"مدينة مصدر",region:"Abu Dhabi",lat:24.4287,lon:54.6165},
      {name:"Dubai Downtown",ar:"وسط مدينة دبي",region:"Dubai",lat:25.1956,lon:55.2747},
      {name:"Jebel Ali",ar:"جبل علي",region:"Dubai",lat:24.9857,lon:55.0272},
      {name:"Sharjah City",ar:"مدينة الشارقة",region:"Sharjah",lat:25.3463,lon:55.4209},
      {name:"Al Ain Central",ar:"وسط مدينة العين",region:"Abu Dhabi",lat:24.1302,lon:55.8023},
      {name:"Ras Al Khaimah City",ar:"مدينة رأس الخيمة",region:"Ras Al Khaimah",lat:25.7895,lon:55.9432},
      {name:"Fujairah City",ar:"مدينة الفجيرة",region:"Fujairah",lat:25.1288,lon:56.3265}
    ]
  };

  const typeConfig = {
    drone:{count:20,prefix:"UAV",icon:"drone",model:["DJI M350 RTK","Autel EVO Max","WingtraOne GEN II"],mission:["Infrastructure inspection","Route monitoring","Perimeter surveillance","Thermal survey"],speed:[42,78],battery:[43,94]},
    robot:{count:15,prefix:"R",icon:"bot",model:["IRX-200","Sentinel S4","UGV Ranger"],mission:["Facility inspection","Security patrol","Hazard sampling","Equipment delivery"],speed:[5,18],battery:[28,91]},
    marine:{count:8,prefix:"MV",icon:"ship",model:["USV Mariner 12","Harbour Sentinel","Coast Surveyor"],mission:["Port surveillance","Marine inspection","Coastal patrol","Water quality survey"],speed:[12,44],battery:[49,89]},
    vehicle:{count:10,prefix:"AV",icon:"car",model:["L4 Patrol EV","Autonomous Shuttle","Rapid Response EV"],mission:["Route monitoring","Passenger shuttle","Emergency logistics","Road inspection"],speed:[31,72],battery:[44,92]}
  };
  function seeded(n){return ((n*9301+49297)%233280)/233280;}
  const assets=[];
  let globalIndex=0;
  Object.keys(typeConfig).forEach((type,typeIndex)=>{
    const cfg=typeConfig[type];
    for(let i=1;i<=cfg.count;i++){
      globalIndex++;
      const sites=operationalSites[type],loc=sites[(i-1+typeIndex*2)%sites.length];
      const radial=type==="marine"?.0032:.0024,angle=seeded(globalIndex+71)*Math.PI*2,distance=(.35+seeded(globalIndex+19)*.65)*radial;
      const latOffset=Math.sin(angle)*distance,lonOffset=Math.cos(angle)*distance/Math.max(.72,Math.cos(loc.lat*Math.PI/180));
      const status=i%17===0?"offline":i%11===0?"maintenance":i%4===0?"inMission":i%5===0?"standby":"active";
      const id=cfg.prefix+"-"+String(i).padStart(3,"0");
      assets.push({id,type,icon:cfg.icon,model:cfg.model[i%cfg.model.length],status,location:loc.name,locationAr:loc.ar,region:loc.region,lat:loc.lat+latOffset,lon:loc.lon+lonOffset,battery:Math.round(cfg.battery[0]+seeded(globalIndex+21)*(cfg.battery[1]-cfg.battery[0])),speed:Math.round(cfg.speed[0]+seeded(globalIndex+41)*(cfg.speed[1]-cfg.speed[0])),altitude:type==="drone"?Math.round(95+seeded(globalIndex+12)*135):0,mission:cfg.mission[i%cfg.mission.length],operator:i%3===0?"AI Autonomous":"ACC Operator "+String((i%8)+1).padStart(2,"0"),health:Math.round(78+seeded(globalIndex+51)*21),missionProgress:Math.round(18+seeded(globalIndex+81)*72),heading:Math.round(seeded(globalIndex+9)*360)});
    }
  });
  const u17=assets.find(a=>a.id==="UAV-017");
  Object.assign(u17,{location:"Yas Island",locationAr:"جزيرة ياس",region:"Abu Dhabi",lat:24.4877,lon:54.6083,battery:78,speed:62,altitude:120,status:"active",mission:"Infrastructure inspection",operator:"AI Autonomous",health:96,missionProgress:65,model:"DJI M350 RTK"});
  const r8=assets.find(a=>a.id==="R-008");
  Object.assign(r8,{location:"Abu Dhabi",locationAr:"أبوظبي",region:"Abu Dhabi",lat:24.469,lon:54.394,battery:18,speed:12,status:"inMission",mission:"Facility inspection",health:86,missionProgress:68,model:"IRX-200"});
  const mv3=assets.find(a=>a.id==="MV-003");
  Object.assign(mv3,{location:"Khalifa Port Anchorage",locationAr:"مرسى ميناء خليفة",region:"Abu Dhabi",lat:24.8332,lon:54.6408,battery:74,speed:18,status:"inMission",mission:"Port surveillance",operator:"AI Autonomous / SEA-OPS",health:96,missionProgress:62,heading:247,model:"USV Mariner 12"});
  const av5=assets.find(a=>a.id==="AV-005");
  Object.assign(av5,{location:"Yas Island",locationAr:"جزيرة ياس",region:"Abu Dhabi",lat:24.4871,lon:54.6058,battery:82,speed:48,status:"inMission",mission:"Passenger shuttle",operator:"Mobility AI / MOB-CMD",health:97,missionProgress:71,heading:286,model:"Autonomous Shuttle"});

  const incidents = [
    {id:"INC-023",severity:"high",title:{en:"Suspicious aerial activity detected",ar:"رُصد نشاط جوي مريب"},location:{en:"Dubai · Jumeirah",ar:"دبي · جميرا"},region:"Dubai",domain:"drone",lat:25.203,lon:55.229,age:2,confidence:94,status:"Investigating",affected:["UAV-004","UAV-011"],image:"assets/images/feeds/air-isr-yas.jpg"},
    {id:"INC-022",severity:"medium",title:{en:"Marine vessel route deviation",ar:"انحراف سفينة بحرية عن المسار"},location:{en:"Abu Dhabi coast",ar:"ساحل أبوظبي"},region:"Abu Dhabi",domain:"marine",lat:24.574,lon:54.171,age:12,confidence:87,status:"Assigned",affected:["MV-003","MV-007"],image:"assets/images/feeds/sea-usv-khalifa-port.jpg"},
    {id:"INC-021",severity:"high",title:{en:"Drone route deviation",ar:"انحراف طائرة بدون طيار عن المسار"},location:{en:"Sharjah industrial area",ar:"المنطقة الصناعية في الشارقة"},region:"Sharjah",domain:"drone",lat:25.332,lon:55.414,age:18,confidence:91,status:"Responding",affected:["UAV-013","UAV-016"],image:"assets/images/feeds/air-isr-yas.jpg"},
    {id:"INC-020",severity:"low",title:{en:"Autonomous vehicle stopped unexpectedly",ar:"توقفت مركبة ذاتية بشكل غير متوقع"},location:{en:"Al Ain central district",ar:"وسط مدينة العين"},region:"Abu Dhabi",domain:"vehicle",lat:24.131,lon:55.785,age:32,confidence:82,status:"Monitoring",affected:["AV-006"],image:"assets/images/feeds/land-ugv-substation.jpg"},
    {id:"INC-019",severity:"medium",title:{en:"Transformer thermal anomaly",ar:"ارتفاع حرارة محول كهربائي"},location:{en:"Ras Al Khaimah utility corridor",ar:"ممر خدمات رأس الخيمة"},region:"Ras Al Khaimah",domain:"robot",lat:25.768,lon:55.934,age:47,confidence:96,status:"Assigned",affected:["R-008","UAV-017"],image:"assets/images/feeds/land-ugv-substation.jpg"}
  ];

  const droneMissions = [
    {id:"MSN-1047",assetId:"UAV-017",type:{en:"Infrastructure inspection",ar:"فحص البنية التحتية"},area:{en:"Yas Island · North utilities",ar:"جزيرة ياس · مرافق المنطقة الشمالية"},priority:"high",status:"inProgress",progress:65,waypoint:5,totalWaypoints:8,created:"18:43",started:"19:00",eta:"12 min",end:"22:00",clearance:"UAE-ACC-AIR-4471",routeCompliance:98},
    {id:"MSN-1048",assetId:"UAV-004",type:{en:"Perimeter surveillance",ar:"مراقبة المحيط"},area:{en:"Khalifa City · Sector C",ar:"مدينة خليفة · القطاع ج"},priority:"medium",status:"inProgress",progress:48,waypoint:4,totalWaypoints:11,created:"19:05",started:"19:22",eta:"19 min",end:"21:35",clearance:"UAE-ACC-AIR-4478",routeCompliance:96},
    {id:"MSN-1049",assetId:"UAV-008",type:{en:"Infrastructure inspection",ar:"فحص البنية التحتية"},area:{en:"Al Ain · Grid corridor",ar:"العين · ممر الشبكة"},priority:"medium",status:"inProgress",progress:72,waypoint:7,totalWaypoints:9,created:"18:12",started:"18:40",eta:"8 min",end:"20:55",clearance:"UAE-ACC-AIR-4459",routeCompliance:99},
    {id:"MSN-1050",assetId:"UAV-012",type:{en:"Thermal façade survey",ar:"مسح حراري للواجهات"},area:{en:"Al Maryah Island",ar:"جزيرة المارية"},priority:"high",status:"inProgress",progress:39,waypoint:3,totalWaypoints:10,created:"19:34",started:"19:51",eta:"24 min",end:"21:20",clearance:"UAE-ACC-AIR-4483",routeCompliance:97},
    {id:"MSN-1051",assetId:"UAV-016",type:{en:"Coastal route monitoring",ar:"مراقبة المسار الساحلي"},area:{en:"Jumeirah coast",ar:"ساحل جميرا"},priority:"low",status:"inProgress",progress:81,waypoint:9,totalWaypoints:11,created:"17:55",started:"18:10",eta:"6 min",end:"20:48",clearance:"UAE-ACC-AIR-4438",routeCompliance:100},
    {id:"MSN-1052",assetId:"UAV-020",type:{en:"Port approach inspection",ar:"فحص ممر الاقتراب من الميناء"},area:{en:"Fujairah port district",ar:"منطقة ميناء الفجيرة"},priority:"medium",status:"inProgress",progress:54,waypoint:6,totalWaypoints:12,created:"19:18",started:"19:40",eta:"17 min",end:"21:42",clearance:"UAE-ACC-AIR-4481",routeCompliance:95}
  ];

  const droneMissionEvents = [
    {time:"20:41",key:"capturedImages",tone:"green",detail:{en:"12 radiometric frames linked to the mission package",ar:"تم ربط 12 إطاراً إشعاعياً بحزمة المهمة"}},
    {time:"20:37",key:"arrivedWaypoint",tone:"cyan",detail:{en:"Hover stabilized at 121 m AGL",ar:"تم تثبيت التحويم على ارتفاع 121 متراً فوق سطح الأرض"}},
    {time:"20:31",key:"departedBase",tone:"green",detail:{en:"Yas operations pad YS-04",ar:"منصة عمليات ياس YS-04"}},
    {time:"20:25",key:"missionAuthorized",tone:"blue",detail:{en:"Approved by AIR-CMD under clearance UAE-ACC-AIR-4471",ar:"اعتمدها قائد المجال الجوي بموجب التصريح UAE-ACC-AIR-4471"}},
    {time:"20:22",key:"routeCalculated",tone:"cyan",detail:{en:"8-waypoint route cleared against active restrictions",ar:"تمت مطابقة مسار من 8 نقاط مع القيود النشطة"}},
    {time:"20:18",key:"preflightComplete",tone:"green",detail:{en:"Propulsion, GNSS, payload and command-link checks passed",ar:"نجحت فحوصات الدفع والملاحة والحمولة ورابط القيادة"}}
  ];

  const droneInsights = [
    {key:"noAnomalies",tone:"green",confidence:99,age:2},
    {key:"imageQualityGood",tone:"green",confidence:96,age:4},
    {key:"batteryNormal",tone:"green",confidence:94,age:6},
    {key:"restrictedZoneClear",tone:"cyan",confidence:100,age:9},
    {key:"additionalCapture",tone:"amber",confidence:86,age:12}
  ];

  const droneNoFlyZones = [
    {id:"NFZ-AD-01",name:{en:"Presidential airspace",ar:"المجال الجوي الرئاسي"},lat:24.4633,lon:54.3190,radiusKm:2.6,severity:"critical"},
    {id:"NFZ-AUH-02",name:{en:"Airport protected approach",ar:"مسار الاقتراب المحمي للمطار"},lat:24.4380,lon:54.6470,radiusKm:3.4,severity:"high"},
    {id:"NFZ-DXB-01",name:{en:"DXB controlled airspace",ar:"المجال الجوي المراقب لمطار دبي"},lat:25.2528,lon:55.3644,radiusKm:4.2,severity:"high"},
    {id:"NFZ-SHJ-01",name:{en:"Sharjah airport control zone",ar:"منطقة مراقبة مطار الشارقة"},lat:25.3292,lon:55.5162,radiusKm:3.5,severity:"high"},
    {id:"NFZ-FJR-01",name:{en:"Fujairah airport control zone",ar:"منطقة مراقبة مطار الفجيرة"},lat:25.1122,lon:56.3239,radiusKm:2.8,severity:"high"}
  ];

  const droneAirspaceSectors = [
    {id:"AD-S01",name:{en:"Abu Dhabi Central",ar:"وسط أبوظبي"},status:"open",capacity:18,active:7,ceiling:120,corridors:4,authority:"GCAA / UAE ACC",validUntil:"23:59"},
    {id:"YS-S04",name:{en:"Yas Island Utilities",ar:"مرافق جزيرة ياس"},status:"controlled",capacity:12,active:5,ceiling:150,corridors:3,authority:"AIR-CMD",validUntil:"22:30"},
    {id:"DX-S07",name:{en:"Dubai Coastal",ar:"ساحل دبي"},status:"open",capacity:16,active:6,ceiling:120,corridors:4,authority:"GCAA / DXB OPS",validUntil:"23:45"},
    {id:"SH-S03",name:{en:"Sharjah Industrial",ar:"الشارقة الصناعية"},status:"restricted",capacity:8,active:2,ceiling:90,corridors:2,authority:"SHJ ATC",validUntil:"21:40"},
    {id:"FJ-S02",name:{en:"Fujairah Port",ar:"ميناء الفجيرة"},status:"controlled",capacity:10,active:4,ceiling:110,corridors:3,authority:"FJR PORT / GCAA",validUntil:"22:15"}
  ];

  const droneBases = [
    {id:"YS-04",name:{en:"Yas Operations Pad",ar:"منصة عمليات ياس"},region:"Abu Dhabi",lat:24.4858,lon:54.6048,status:"available",pads:4,available:2,chargers:3,turnaround:6,wind:12,link:"5G SA"},
    {id:"AD-12",name:{en:"Abu Dhabi Central Base",ar:"قاعدة وسط أبوظبي"},region:"Abu Dhabi",lat:24.4992,lon:54.3888,status:"available",pads:6,available:4,chargers:5,turnaround:5,wind:10,link:"5G SA"},
    {id:"AUH-08",name:{en:"Khalifa City Response Base",ar:"قاعدة الاستجابة بمدينة خليفة"},region:"Abu Dhabi",lat:24.4248,lon:54.5828,status:"busy",pads:4,available:1,chargers:4,turnaround:11,wind:15,link:"5G / RF"},
    {id:"DX-07",name:{en:"Dubai Coastal Base",ar:"قاعدة دبي الساحلية"},region:"Dubai",lat:25.1960,lon:55.2740,status:"available",pads:5,available:3,chargers:4,turnaround:7,wind:14,link:"5G SA"},
    {id:"RAK-05",name:{en:"Ras Al Khaimah Base",ar:"قاعدة رأس الخيمة"},region:"Ras Al Khaimah",lat:25.7890,lon:55.9405,status:"available",pads:3,available:2,chargers:2,turnaround:8,wind:17,link:"5G / SAT"},
    {id:"FJ-03",name:{en:"Fujairah Port Pad",ar:"منصة ميناء الفجيرة"},region:"Fujairah",lat:25.1280,lon:56.3260,status:"weatherHold",pads:3,available:1,chargers:3,turnaround:14,wind:24,link:"5G / SAT"}
  ];

  const droneWeatherStations = [
    {id:"WX-YS",name:{en:"Yas Island",ar:"جزيرة ياس"},temperature:31,wind:12,gust:17,direction:"NW",visibility:10,humidity:48,cloudBase:1800,status:"good"},
    {id:"WX-AD",name:{en:"Abu Dhabi Central",ar:"وسط أبوظبي"},temperature:32,wind:10,gust:14,direction:"WNW",visibility:12,humidity:44,cloudBase:2100,status:"good"},
    {id:"WX-DX",name:{en:"Dubai Coastal",ar:"ساحل دبي"},temperature:31,wind:14,gust:20,direction:"N",visibility:9,humidity:53,cloudBase:1650,status:"watch"},
    {id:"WX-FJ",name:{en:"Fujairah Port",ar:"ميناء الفجيرة"},temperature:29,wind:24,gust:31,direction:"E",visibility:7,humidity:61,cloudBase:1200,status:"hold"}
  ];

  const droneEvidence = [
    {id:"EV-781",missionId:"MSN-1047",type:"rgb",title:{en:"North tower connector — visual",ar:"موصل البرج الشمالي — مرئي"},image:"assets/images/drone-ops/tower-inspection-evidence.webp",time:"20:41:18",confidence:96,size:"18.4 MB",temperature:43.2,classification:"RESTRICTED",integrity:"SHA-256"},
    {id:"EV-782",missionId:"MSN-1047",type:"thermal",title:{en:"North tower connector — radiometric",ar:"موصل البرج الشمالي — إشعاعي حراري"},image:"assets/images/drone-ops/tower-inspection-thermal.webp",time:"20:41:22",confidence:93,size:"22.7 MB",temperature:71.8,baseline:39.4,classification:"RESTRICTED",integrity:"SHA-256"},
    {id:"EV-783",missionId:"MSN-1047",type:"launch",title:{en:"Launch-pad readiness reference",ar:"مرجع جاهزية منصة الإطلاق"},image:"assets/images/drone-ops/launch-pad-blue-hour.webp",time:"20:18:04",confidence:99,size:"14.1 MB",classification:"INTERNAL",integrity:"SHA-256"},
    {id:"EV-784",missionId:"MSN-1047",type:"wide",title:{en:"Yas mission-area wide frame",ar:"لقطة واسعة لمنطقة مهمة ياس"},image:"assets/images/feeds/air-isr-yas.jpg",time:"20:37:56",confidence:97,size:"16.8 MB",classification:"RESTRICTED",integrity:"SHA-256"}
  ];

  const robotMissions = [
    {id:"GRD-2088",assetId:"R-008",type:{en:"Critical infrastructure inspection",ar:"فحص البنية التحتية الحيوية"},site:{en:"Abu Dhabi · Central utility corridor",ar:"أبوظبي · ممر الخدمات المركزي"},priority:"high",progress:68,waypoint:5,totalWaypoints:8,eta:"12 min",risk:18},
    {id:"GRD-2031",assetId:"R-003",type:{en:"Autonomous security patrol",ar:"دورية أمنية ذاتية"},site:{en:"Masdar City · Sector C",ar:"مدينة مصدر · القطاع ج"},priority:"medium",progress:74,waypoint:7,totalWaypoints:10,eta:"9 min",risk:9},
    {id:"GRD-2055",assetId:"R-005",type:{en:"Hazard sampling",ar:"أخذ عينات خطرة"},site:{en:"Jebel Ali logistics zone",ar:"منطقة جبل علي اللوجستية"},priority:"high",progress:42,waypoint:3,totalWaypoints:7,eta:"21 min",risk:32},
    {id:"GRD-2112",assetId:"R-012",type:{en:"Thermal equipment survey",ar:"مسح حراري للمعدات"},site:{en:"Fujairah port district",ar:"منطقة ميناء الفجيرة"},priority:"medium",progress:57,waypoint:4,totalWaypoints:9,eta:"17 min",risk:14}
  ];

  const robotEvents = [
    {time:"20:45",assetId:"R-008",tone:"red",actor:"VISION-EDGE-12",detail:{en:"Localized connector heat anomaly detected",ar:"تم رصد خلل حراري موضعي في الموصل"}},
    {time:"20:42",assetId:"R-008",tone:"amber",actor:"SAFETY-PLC",detail:{en:"Battery reserve crossed 20% advisory threshold",ar:"تجاوز احتياطي البطارية حد التنبيه 20٪"}},
    {time:"20:38",assetId:"R-007",tone:"green",actor:"ROB-CMD",detail:{en:"Inspection route completed and evidence sealed",ar:"اكتمل مسار الفحص وتم ختم الأدلة"}},
    {time:"20:34",assetId:"R-012",tone:"cyan",actor:"FLEET-AI",detail:{en:"Mission GRD-2112 started autonomously",ar:"بدأت المهمة GRD-2112 بشكل ذاتي"}},
    {time:"20:28",assetId:"R-015",tone:"green",actor:"LOGISTICS",detail:{en:"Equipment delivery confirmed at bay 04",ar:"تم تأكيد تسليم المعدات في المنصة 04"}},
    {time:"20:21",assetId:"R-003",tone:"cyan",actor:"SECURITY",detail:{en:"Returned to base over validated safe route",ar:"عاد إلى القاعدة عبر مسار آمن معتمد"}},
    {time:"20:16",assetId:"R-005",tone:"violet",actor:"GAS-AI",detail:{en:"Atmospheric sample classified normal",ar:"تم تصنيف عينة الغلاف الجوي على أنها طبيعية"}}
  ];

  const robotBases = [
    {id:"AD-RB-01",name:{en:"Abu Dhabi Robotics Base",ar:"قاعدة روبوتات أبوظبي"},region:"Abu Dhabi",lat:24.4694,lon:54.3934,bays:6,available:4,turnaround:7,link:"5G SA / RF"},
    {id:"MS-RB-02",name:{en:"Masdar Autonomous Systems Hub",ar:"مركز مصدر للأنظمة الذاتية"},region:"Abu Dhabi",lat:24.4282,lon:54.6184,bays:5,available:3,turnaround:6,link:"5G SA"},
    {id:"DX-RB-03",name:{en:"Dubai Ground Operations Base",ar:"قاعدة دبي للعمليات الأرضية"},region:"Dubai",lat:25.1964,lon:55.2760,bays:5,available:2,turnaround:9,link:"5G SA / Wi-Fi 6E"},
    {id:"FJ-RB-04",name:{en:"Fujairah Port Robotics Bay",ar:"منصة روبوتات ميناء الفجيرة"},region:"Fujairah",lat:25.1575,lon:56.3543,bays:3,available:2,turnaround:11,link:"5G / SAT"}
  ];

  const robotZones = [
    {id:"GRD-Z04",name:{en:"Abu Dhabi central utility zone",ar:"منطقة خدمات أبوظبي المركزية"},lat:24.4690,lon:54.3940,radiusKm:.65,severity:"controlled"},
    {id:"GRD-Z11",name:{en:"Masdar pedestrian safety zone",ar:"منطقة سلامة المشاة في مصدر"},lat:24.4282,lon:54.6184,radiusKm:.5,severity:"controlled"},
    {id:"GRD-Z18",name:{en:"Jebel Ali logistics geofence",ar:"السياج الجغرافي لجبل علي اللوجستية"},lat:24.9857,lon:55.0272,radiusKm:.85,severity:"high"}
  ];

  const maritimeMissions = [
    {id:"SEA-4107",assetId:"MV-003",type:{en:"Protected-channel surveillance",ar:"مراقبة القناة الملاحية المحمية"},area:{en:"Khalifa Port · Approach Channel A",ar:"ميناء خليفة · قناة الاقتراب أ"},priority:"high",status:"inProgress",progress:62,waypoint:7,totalWaypoints:11,eta:"18 min",routeCompliance:97,authority:"AD Ports / UAE ACC",colregs:"Compliant",seaState:2},
    {id:"SEA-4112",assetId:"MV-004",type:{en:"Anchorage perimeter patrol",ar:"دورية محيط منطقة الرسو"},area:{en:"Fujairah Anchorage · Sector F3",ar:"مرسى الفجيرة · القطاع F3"},priority:"medium",status:"inProgress",progress:48,waypoint:5,totalWaypoints:12,eta:"27 min",routeCompliance:99,authority:"Fujairah Port / UAE ACC",colregs:"Compliant",seaState:3},
    {id:"SEA-4098",assetId:"MV-007",type:{en:"Coastal safety patrol",ar:"دورية السلامة الساحلية"},area:{en:"Yas Channel · Eastern reach",ar:"قناة ياس · القطاع الشرقي"},priority:"medium",status:"inProgress",progress:81,waypoint:9,totalWaypoints:10,eta:"8 min",routeCompliance:100,authority:"Abu Dhabi Maritime",colregs:"Compliant",seaState:2},
    {id:"SEA-4121",assetId:"MV-008",type:{en:"Water-quality transect",ar:"مسار قياس جودة المياه"},area:{en:"Khalifa Port · Berth basin",ar:"ميناء خليفة · حوض الأرصفة"},priority:"low",status:"inProgress",progress:35,waypoint:3,totalWaypoints:9,eta:"34 min",routeCompliance:98,authority:"Environment Agency / AD Ports",colregs:"Compliant",seaState:2}
  ];

  const maritimeContacts = [
    {id:"AIS-78124",name:"AL DHAFRA STAR",mmsi:"470912000",class:"Cargo",range:1.7,bearing:42,sog:8.4,cog:228,cpa:.42,tcpa:11,risk:"high",lat:24.8462,lon:54.6615},
    {id:"AIS-31908",name:"SEA PEARL 07",mmsi:"470338120",class:"Tug",range:2.3,bearing:116,sog:5.2,cog:301,cpa:1.16,tcpa:24,risk:"low",lat:24.8214,lon:54.6610},
    {id:"AIS-44277",name:"GULF FEEDER",mmsi:"636021884",class:"Container",range:4.8,bearing:287,sog:12.8,cog:84,cpa:.78,tcpa:19,risk:"medium",lat:24.8510,lon:54.6020},
    {id:"AIS-00914",name:"PORT PILOT 3",mmsi:"470041900",class:"Pilot",range:.8,bearing:196,sog:14.1,cog:31,cpa:1.84,tcpa:7,risk:"low",lat:24.8268,lon:54.6344},
    {id:"VIS-029",name:"UNKNOWN SMALL CRAFT",mmsi:"—",class:"Unclassified",range:3.1,bearing:74,sog:19.6,cog:242,cpa:.31,tcpa:9,risk:"high",lat:24.8420,lon:54.6715},
    {id:"AIS-70261",name:"EMIRATES SUPPLIER",mmsi:"470771600",class:"Service",range:5.4,bearing:332,sog:7.0,cog:166,cpa:2.41,tcpa:32,risk:"low",lat:24.8760,lon:54.6200}
  ];

  const maritimePorts = [
    {id:"KP-01",name:{en:"Khalifa Port Maritime Base",ar:"قاعدة ميناء خليفة البحرية"},region:"Abu Dhabi",lat:24.8195,lon:54.6505,status:"operational",berths:12,available:4,chargers:5,link:"5G SA / SATCOM",authority:"AD Ports"},
    {id:"PZ-02",name:{en:"Port Zayed Response Base",ar:"قاعدة الاستجابة في ميناء زايد"},region:"Abu Dhabi",lat:24.5260,lon:54.3890,status:"operational",berths:6,available:3,chargers:3,link:"5G / VHF",authority:"Abu Dhabi Maritime"},
    {id:"JA-03",name:{en:"Jebel Ali Autonomous Berth",ar:"رصيف جبل علي للأنظمة الذاتية"},region:"Dubai",lat:24.9857,lon:55.0272,status:"busy",berths:10,available:2,chargers:4,link:"5G SA / SATCOM",authority:"DP World"},
    {id:"FJ-04",name:{en:"Fujairah Coastal Operations Base",ar:"قاعدة الفجيرة للعمليات الساحلية"},region:"Fujairah",lat:25.1575,lon:56.3543,status:"weatherWatch",berths:7,available:3,chargers:3,link:"5G / SATCOM",authority:"Port of Fujairah"},
    {id:"RAK-05",name:{en:"Mina Saqr Patrol Berth",ar:"رصيف دوريات ميناء صقر"},region:"Ras Al Khaimah",lat:25.9790,lon:56.0490,status:"operational",berths:4,available:2,chargers:2,link:"5G / VHF",authority:"RAK Ports"}
  ];

  const maritimeZones = [
    {id:"NAV-KP-A",name:{en:"Khalifa Port inbound channel",ar:"قناة الدخول إلى ميناء خليفة"},lat:24.8410,lon:54.6500,radiusKm:1.25,severity:"controlled",kind:"channel"},
    {id:"SEC-KP-4",name:{en:"Khalifa restricted waters",ar:"المياه المقيدة في ميناء خليفة"},lat:24.8145,lon:54.6680,radiusKm:.85,severity:"high",kind:"restricted"},
    {id:"ANC-AD-2",name:{en:"Abu Dhabi anchorage sector 2",ar:"قطاع رسو أبوظبي 2"},lat:24.8660,lon:54.6100,radiusKm:1.4,severity:"controlled",kind:"anchorage"},
    {id:"PAT-KP-E",name:{en:"Eastern autonomous patrol sector",ar:"قطاع الدورية الذاتية الشرقي"},lat:24.8420,lon:54.6840,radiusKm:1.1,severity:"watch",kind:"patrol"}
  ];

  const maritimeWeather = [
    {id:"OC-KP",name:{en:"Khalifa Port buoy",ar:"عوامة ميناء خليفة"},lat:24.8520,lon:54.6480,temperature:31,wind:14,gust:19,direction:"NW",visibility:9,wave:.7,current:.8,tide:"Rising",seaState:2,status:"good"},
    {id:"OC-PZ",name:{en:"Port Zayed buoy",ar:"عوامة ميناء زايد"},lat:24.5550,lon:54.3650,temperature:32,wind:12,gust:17,direction:"WNW",visibility:10,wave:.5,current:.6,tide:"Rising",seaState:2,status:"good"},
    {id:"OC-JA",name:{en:"Jebel Ali offshore buoy",ar:"عوامة جبل علي البحرية"},lat:25.0050,lon:54.9750,temperature:31,wind:17,gust:23,direction:"N",visibility:8,wave:1.1,current:1.0,tide:"High",seaState:3,status:"watch"},
    {id:"OC-FJ",name:{en:"Fujairah offshore buoy",ar:"عوامة الفجيرة البحرية"},lat:25.1850,lon:56.3900,temperature:29,wind:22,gust:30,direction:"E",visibility:7,wave:1.6,current:1.3,tide:"Falling",seaState:4,status:"watch"}
  ];

  const maritimeEvents = [
    {time:"20:46",assetId:"MV-003",tone:"red",actor:"COLLISION-AI",detail:{en:"Unknown small craft entered the predicted closest-point envelope",ar:"دخل قارب صغير مجهول نطاق أقرب نقطة متوقعة"}},
    {time:"20:44",assetId:"MV-003",tone:"amber",actor:"AIS-FUSION",detail:{en:"CPA reduced to 0.31 nautical miles; operator advisory issued",ar:"انخفضت أقرب نقطة اقتراب إلى 0.31 ميل بحري وصدر تنبيه للمشغل"}},
    {time:"20:41",assetId:"MV-008",tone:"cyan",actor:"ENV-SENSOR",detail:{en:"Water-quality sample transect three completed",ar:"اكتمل المسار الثالث لأخذ عينات جودة المياه"}},
    {time:"20:38",assetId:"MV-003",tone:"green",actor:"AD PORTS",detail:{en:"Inbound channel clearance validated",ar:"تم التحقق من تصريح قناة الدخول"}},
    {time:"20:33",assetId:"MV-004",tone:"cyan",actor:"SEA-OPS",detail:{en:"Fujairah anchorage patrol handover accepted",ar:"تم قبول تسليم دورية مرسى الفجيرة"}},
    {time:"20:27",assetId:"MV-007",tone:"green",actor:"AUTONOMY",detail:{en:"COLREGS crossing manoeuvre completed",ar:"اكتملت مناورة التقاطع وفق قواعد منع التصادم"}},
    {time:"20:18",assetId:"MV-003",tone:"blue",actor:"SEA-OPS",detail:{en:"Mission SEA-4107 authorized and evidence chain opened",ar:"تم اعتماد المهمة SEA-4107 وفتح سلسلة الأدلة"}}
  ];

  const maritimeEvidence = [
    {id:"EV-S-901",type:"eo",title:{en:"Khalifa inbound channel — EO",ar:"قناة الدخول إلى ميناء خليفة — كهروضوئية"},image:"assets/images/maritime/port-channel-eo.webp",time:"20:46:12",confidence:97,classification:"RESTRICTED",integrity:"SHA-256"},
    {id:"EV-S-902",type:"thermal",title:{en:"Unknown small craft — LWIR",ar:"قارب صغير مجهول — تصوير حراري"},image:"assets/images/maritime/unknown-vessel-thermal.webp",time:"20:46:18",confidence:93,classification:"RESTRICTED",integrity:"SHA-256"},
    {id:"EV-S-903",type:"vessel",title:{en:"USV mission readiness reference",ar:"مرجع جاهزية المركبة البحرية الذاتية"},image:"assets/images/maritime/usv-khalifa-port.webp",time:"20:18:06",confidence:99,classification:"INTERNAL",integrity:"SHA-256"}
  ];

  const mobilityMissions = [
    {id:"MOB-6205",assetId:"AV-005",type:{en:"Yas public-service shuttle",ar:"خدمة نقل عامة في ياس"},route:{en:"Yas Central → Etihad Arena → Waterfront",ar:"ياس سنترال ← الاتحاد أرينا ← الواجهة البحرية"},priority:"high",status:"inProgress",progress:71,waypoint:8,totalWaypoints:11,eta:"7 min",routeCompliance:99,odd:"Urban L4 · Clear",passengers:6,capacity:12,nextStop:{en:"Etihad Arena",ar:"الاتحاد أرينا"},authority:"ITC / UAE ACC"},
    {id:"MOB-6211",assetId:"AV-004",type:{en:"Medical logistics transfer",ar:"نقل لوجستي طبي"},route:{en:"Al Maryah Island → Cleveland Clinic",ar:"جزيرة المارية ← كليفلاند كلينك"},priority:"high",status:"inProgress",progress:53,waypoint:4,totalWaypoints:8,eta:"9 min",routeCompliance:98,odd:"Urban L4 · Clear",passengers:0,capacity:4,nextStop:{en:"Clinical receiving bay",ar:"منصة الاستلام السريري"},authority:"DoH / UAE ACC"},
    {id:"MOB-6214",assetId:"AV-008",type:{en:"Road condition inspection",ar:"فحص حالة الطريق"},route:{en:"Al Ain central mobility loop",ar:"حلقة التنقل المركزية في العين"},priority:"medium",status:"inProgress",progress:46,waypoint:5,totalWaypoints:12,eta:"18 min",routeCompliance:96,odd:"Urban L4 · Dust watch",passengers:1,capacity:4,nextStop:{en:"Sector A-17",ar:"القطاع A-17"},authority:"Municipality / UAE ACC"},
    {id:"MOB-6220",assetId:"AV-010",type:{en:"Airport feeder service",ar:"خدمة الربط بالمطار"},route:{en:"Dubai Downtown → DXB Terminal 3",ar:"وسط دبي ← مبنى 3 بمطار دبي"},priority:"medium",status:"inProgress",progress:64,waypoint:7,totalWaypoints:10,eta:"14 min",routeCompliance:100,odd:"Urban L4 · Dense traffic",passengers:8,capacity:10,nextStop:{en:"DXB Terminal 3",ar:"مبنى 3 بمطار دبي"},authority:"RTA / UAE ACC"}
  ];
  const mobilityHubs = [
    {id:"YAS-MH-01",name:{en:"Yas Autonomous Mobility Hub",ar:"مركز ياس للتنقل الذاتي"},region:"Abu Dhabi",lat:24.4878,lon:54.6052,status:"operational",bays:18,available:7,chargers:14,queue:2,turnaround:8,link:"5G SA / C-V2X",authority:"ITC"},
    {id:"AD-MH-02",name:{en:"Al Maryah Service Hub",ar:"مركز خدمة المارية"},region:"Abu Dhabi",lat:24.5003,lon:54.3890,status:"operational",bays:12,available:5,chargers:10,queue:1,turnaround:7,link:"5G SA / C-V2X",authority:"ITC"},
    {id:"MS-MH-03",name:{en:"Masdar Mobility Depot",ar:"مستودع مصدر للتنقل"},region:"Abu Dhabi",lat:24.4288,lon:54.6167,status:"operational",bays:16,available:8,chargers:16,queue:0,turnaround:6,link:"5G SA / Wi-Fi 6E",authority:"ITC"},
    {id:"DX-MH-04",name:{en:"Dubai Autonomous Fleet Hub",ar:"مركز دبي للأسطول الذاتي"},region:"Dubai",lat:25.1960,lon:55.2752,status:"busy",bays:24,available:6,chargers:20,queue:5,turnaround:12,link:"5G SA / C-V2X",authority:"RTA"},
    {id:"AA-MH-05",name:{en:"Al Ain Mobility Depot",ar:"مستودع العين للتنقل"},region:"Abu Dhabi",lat:24.1310,lon:55.8010,status:"operational",bays:10,available:4,chargers:8,queue:1,turnaround:9,link:"5G / C-V2X",authority:"ITC"}
  ];
  const mobilityZones = [
    {id:"ODD-YAS-4",name:{en:"Yas L4 operating design domain",ar:"نطاق التشغيل L4 في ياس"},lat:24.4875,lon:54.6060,radiusKm:1.15,severity:"controlled",kind:"odd"},
    {id:"PRIO-AD-2",name:{en:"Emergency priority corridor",ar:"ممر أولوية الطوارئ"},lat:24.5004,lon:54.3896,radiusKm:.62,severity:"watch",kind:"priority"},
    {id:"SAFE-MS-7",name:{en:"Masdar low-speed pedestrian zone",ar:"منطقة مشاة منخفضة السرعة في مصدر"},lat:24.4287,lon:54.6165,radiusKm:.72,severity:"controlled",kind:"pedestrian"},
    {id:"HAZ-AA-17",name:{en:"Al Ain degraded-road segment",ar:"مقطع طريق متدهور في العين"},lat:24.1310,lon:55.7850,radiusKm:.48,severity:"high",kind:"hazard"}
  ];
  const mobilityNodes = [
    {id:"V2X-YS-14",name:{en:"Yas Central junction",ar:"تقاطع ياس المركزي"},lat:24.4874,lon:54.6046,signal:"green",latency:9,spat:99,queue:7,flow:82,risk:"low"},
    {id:"V2X-YS-18",name:{en:"Arena boulevard junction",ar:"تقاطع شارع أرينا"},lat:24.4865,lon:54.6100,signal:"amber",latency:11,spat:98,queue:14,flow:68,risk:"medium"},
    {id:"V2X-AD-22",name:{en:"Al Maryah access junction",ar:"تقاطع مدخل المارية"},lat:24.5000,lon:54.3882,signal:"green",latency:8,spat:100,queue:5,flow:87,risk:"low"},
    {id:"V2X-MS-07",name:{en:"Masdar mobility gate",ar:"بوابة تنقل مصدر"},lat:24.4283,lon:54.6180,signal:"green",latency:12,spat:99,queue:3,flow:91,risk:"low"},
    {id:"V2X-DX-41",name:{en:"Downtown Dubai junction",ar:"تقاطع وسط دبي"},lat:25.1968,lon:55.2750,signal:"red",latency:16,spat:97,queue:28,flow:54,risk:"medium"}
  ];
  const mobilityEvents = [
    {time:"20:47",assetId:"AV-005",tone:"amber",actor:"PERCEPTION-AI",detail:{en:"Cyclist trajectory predicted near lane boundary; defensive offset applied",ar:"تم توقع مسار دراجة قرب حد المسار وتطبيق انحراف وقائي"}},
    {time:"20:44",assetId:"AV-005",tone:"green",actor:"V2X-YS-14",detail:{en:"Signal phase and timing authenticated; green-wave slot reserved",ar:"تم توثيق توقيت الإشارة وحجز نافذة الموجة الخضراء"}},
    {time:"20:41",assetId:"AV-005",tone:"cyan",actor:"CABIN-SAFETY",detail:{en:"Passenger restraint and accessibility checks completed",ar:"اكتملت فحوص أحزمة الركاب وإمكانية الوصول"}},
    {time:"20:38",assetId:"AV-004",tone:"blue",actor:"MOB-CMD",detail:{en:"Medical logistics route elevated to priority class",ar:"تم رفع مسار الخدمات الطبية إلى فئة الأولوية"}},
    {time:"20:33",assetId:"AV-008",tone:"red",actor:"ROAD-AI",detail:{en:"Pavement degradation detected in Al Ain segment A-17",ar:"تم رصد تدهور في سطح الطريق ضمن مقطع العين A-17"}},
    {time:"20:28",assetId:"AV-010",tone:"green",actor:"RTA-GATEWAY",detail:{en:"Airport feeder service corridor clearance validated",ar:"تم التحقق من تصريح ممر خدمة الربط بالمطار"}},
    {time:"20:21",assetId:"AV-005",tone:"cyan",actor:"AUTONOMY",detail:{en:"Mission MOB-6205 initiated under supervised L4 mode",ar:"بدأت المهمة MOB-6205 تحت وضع L4 الخاضع للإشراف"}}
  ];
  const mobilityEvidence = [
    {id:"EV-M-301",type:"road",title:{en:"Yas forward road camera",ar:"كاميرا الطريق الأمامية في ياس"},image:"assets/images/mobility/yas-road-camera.webp",time:"20:47:12",confidence:97,classification:"RESTRICTED",integrity:"SHA-256"},
    {id:"EV-M-302",type:"vehicle",title:{en:"AV-005 live platform reference",ar:"مرجع منصة AV-005 الحية"},image:"assets/images/mobility/av-yas-hero.webp",time:"20:46:54",confidence:99,classification:"INTERNAL",integrity:"SHA-256"}
  ];

  const aiModels = [
    {id:"CV-AIR-04",name:{en:"Aerial anomaly detection",ar:"اكتشاف الشذوذ الجوي"},domain:"drone",version:"4.8.2",status:"healthy",precision:96.8,recall:94.2,latency:38,drift:1.2,inferences:18420,deployments:12,owner:"AIR-AI"},
    {id:"CV-ROAD-07",name:{en:"Road-scene perception",ar:"إدراك مشهد الطريق"},domain:"vehicle",version:"7.3.1",status:"healthy",precision:98.4,recall:97.1,latency:31,drift:.8,inferences:42980,deployments:18,owner:"MOB-AI"},
    {id:"CV-GRD-12",name:{en:"Infrastructure visual inspection",ar:"الفحص البصري للبنية التحتية"},domain:"robot",version:"3.9.6",status:"watch",precision:94.7,recall:92.9,latency:44,drift:3.8,inferences:12744,deployments:9,owner:"ROB-AI"},
    {id:"FUS-SEA-03",name:{en:"Maritime contact fusion",ar:"دمج الأهداف البحرية"},domain:"marine",version:"5.2.0",status:"healthy",precision:97.3,recall:95.6,latency:52,drift:1.6,inferences:9870,deployments:7,owner:"SEA-AI"},
    {id:"PRED-INC-09",name:{en:"Incident propagation predictor",ar:"متنبئ انتشار الحوادث"},domain:"all",version:"2.6.4",status:"healthy",precision:93.9,recall:91.4,latency:86,drift:2.1,inferences:6421,deployments:5,owner:"NAT-AI"},
    {id:"OPT-MSN-05",name:{en:"Mission allocation optimizer",ar:"محسن توزيع المهام"},domain:"all",version:"6.1.3",status:"healthy",precision:96.1,recall:95.3,latency:64,drift:1.4,inferences:11308,deployments:6,owner:"NAT-AI"},
    {id:"CYB-BEH-08",name:{en:"Autonomous behavior assurance",ar:"ضمان سلوك الأنظمة الذاتية"},domain:"all",version:"4.0.7",status:"watch",precision:95.2,recall:90.8,latency:71,drift:4.2,inferences:7814,deployments:11,owner:"SEC-AI"}
  ];
  const aiDetections = [
    {id:"AI-DET-1907",modelId:"CV-GRD-12",domain:"robot",assetId:"R-008",incidentId:"INC-019",class:{en:"Transformer connector thermal anomaly",ar:"خلل حراري في موصل المحول"},location:{en:"Ras Al Khaimah utility corridor",ar:"ممر خدمات رأس الخيمة"},region:"Ras Al Khaimah",lat:25.768,lon:55.934,confidence:96,severity:"high",age:2,image:"assets/images/robotics/thermal-anomaly.webp",explanation:[{key:"thermalGradient",value:42},{key:"baselineDeviation",value:31},{key:"temporalPersistence",value:18},{key:"visualCorrelation",value:9}]},
    {id:"AI-DET-1906",modelId:"CV-ROAD-07",domain:"vehicle",assetId:"AV-005",incidentId:null,class:{en:"Cyclist near predicted lane boundary",ar:"دراجة قرب حد المسار المتوقع"},location:{en:"Yas Island boulevard",ar:"شارع جزيرة ياس"},region:"Abu Dhabi",lat:24.4871,lon:54.6058,confidence:91,severity:"medium",age:3,image:"assets/images/mobility/yas-road-camera.webp",explanation:[{key:"trajectoryOverlap",value:37},{key:"lateralVelocity",value:26},{key:"laneProximity",value:24},{key:"signalPhase",value:13}]},
    {id:"AI-DET-1905",modelId:"FUS-SEA-03",domain:"marine",assetId:"MV-003",incidentId:"INC-022",class:{en:"Uncorrelated small craft crossing",ar:"تقاطع قارب صغير غير مرتبط"},location:{en:"Khalifa Port approach",ar:"مدخل ميناء خليفة"},region:"Abu Dhabi",lat:24.8420,lon:54.6715,confidence:93,severity:"high",age:4,image:"assets/images/maritime/unknown-vessel-thermal.webp",explanation:[{key:"cpaRisk",value:39},{key:"aisAbsence",value:28},{key:"speedVector",value:21},{key:"visualClass",value:12}]},
    {id:"AI-DET-1904",modelId:"CV-AIR-04",domain:"drone",assetId:"UAV-017",incidentId:null,class:{en:"Localized equipment hotspot",ar:"نقطة حرارة موضعية في المعدات"},location:{en:"Yas Island north utilities",ar:"مرافق شمال جزيرة ياس"},region:"Abu Dhabi",lat:24.4877,lon:54.6083,confidence:93,severity:"medium",age:6,image:"assets/images/drone-ops/tower-inspection-thermal.webp",explanation:[{key:"radiometricPeak",value:44},{key:"shapeConsistency",value:25},{key:"baselineDeviation",value:19},{key:"contextMatch",value:12}]},
    {id:"AI-DET-1903",modelId:"CV-AIR-04",domain:"drone",assetId:"UAV-004",incidentId:"INC-023",class:{en:"Restricted-airspace movement pattern",ar:"نمط حركة في مجال جوي مقيد"},location:{en:"Dubai · Jumeirah",ar:"دبي · جميرا"},region:"Dubai",lat:25.203,lon:55.229,confidence:94,severity:"high",age:8,image:"assets/images/feeds/air-isr-yas.jpg",explanation:[{key:"routeDeviation",value:36},{key:"zoneIntrusion",value:31},{key:"identityGap",value:20},{key:"speedChange",value:13}]},
    {id:"AI-DET-1902",modelId:"PRED-INC-09",domain:"vehicle",assetId:"AV-006",incidentId:"INC-020",class:{en:"Unexpected autonomous stop",ar:"توقف ذاتي غير متوقع"},location:{en:"Al Ain central district",ar:"وسط مدينة العين"},region:"Abu Dhabi",lat:24.131,lon:55.785,confidence:82,severity:"low",age:12,image:"assets/images/feeds/land-ugv-substation.jpg",explanation:[{key:"speedCollapse",value:34},{key:"routeBlockage",value:29},{key:"systemHealth",value:22},{key:"trafficContext",value:15}]}
  ];
  const aiDecisions = [
    {id:"DEC-8041",detectionId:"AI-DET-1907",title:{en:"Dispatch visual confirmation before isolation",ar:"إرسال تحقق بصري قبل العزل"},confidence:94,risk:"medium",state:"pending",authority:"NAT-CMD / AI-CMD",impact:{en:"Protects power-service continuity while confirming the thermal defect",ar:"يحمي استمرارية خدمة الطاقة أثناء التحقق من العطل الحراري"},actions:["Dispatch UAV-017","Hold R-008 at safe point","Open utility isolation standby"]},
    {id:"DEC-8040",detectionId:"AI-DET-1905",title:{en:"Maintain separation and notify port control",ar:"الحفاظ على المسافة وإخطار مراقبة الميناء"},confidence:93,risk:"high",state:"approved",authority:"SEA-OPS / NAT-CMD",impact:{en:"Reduces collision exposure without leaving the protected channel",ar:"يقلل خطر التصادم دون مغادرة القناة المحمية"},actions:["Alter course 12° starboard","Reduce speed to 8 kn","Correlate EO track"]},
    {id:"DEC-8039",detectionId:"AI-DET-1906",title:{en:"Accept defensive lateral offset",ar:"اعتماد الانحراف الجانبي الوقائي"},confidence:97,risk:"low",state:"auto",authority:"MOB-AI policy",impact:{en:"Maintains cyclist clearance and passenger comfort",ar:"يحافظ على مسافة أمان للدراجة وراحة الركاب"},actions:["Offset 0.6 m","Hold 42 km/h","Reserve SPaT window"]},
    {id:"DEC-8038",detectionId:"AI-DET-1903",title:{en:"Raise airspace verification mission",ar:"رفع مهمة تحقق من المجال الجوي"},confidence:89,risk:"high",state:"pending",authority:"AIR-CMD / NAT-CMD",impact:{en:"Establishes identity and intent before escalation",ar:"يحدد الهوية والنية قبل التصعيد"},actions:["Track UAV-004","Query GCAA identity","Prepare intercept corridor"]}
  ];
  const aiEdgeNodes = [
    {id:"EDGE-AD-01",name:{en:"Abu Dhabi National Edge",ar:"الحافة الوطنية في أبوظبي"},lat:24.4764,lon:54.3705,status:"healthy",models:7,gpu:64,latency:12,throughput:1840,temp:54},
    {id:"EDGE-YS-04",name:{en:"Yas Mobility Edge",ar:"حافة التنقل في ياس"},lat:24.488,lon:54.607,status:"healthy",models:5,gpu:71,latency:9,throughput:2260,temp:57},
    {id:"EDGE-DX-02",name:{en:"Dubai Operations Edge",ar:"حافة عمليات دبي"},lat:25.2048,lon:55.2708,status:"healthy",models:6,gpu:78,latency:14,throughput:1910,temp:59},
    {id:"EDGE-AA-03",name:{en:"Al Ain Regional Edge",ar:"الحافة الإقليمية في العين"},lat:24.1302,lon:55.8023,status:"watch",models:4,gpu:82,latency:22,throughput:980,temp:63},
    {id:"EDGE-FJ-05",name:{en:"Fujairah Maritime Edge",ar:"الحافة البحرية في الفجيرة"},lat:25.1288,lon:56.3265,status:"healthy",models:4,gpu:58,latency:18,throughput:1210,temp:52},
    {id:"EDGE-RAK-06",name:{en:"Ras Al Khaimah Utility Edge",ar:"حافة خدمات رأس الخيمة"},lat:25.7895,lon:55.9432,status:"healthy",models:3,gpu:69,latency:19,throughput:1080,temp:55}
  ];
  const aiEvents = [
    {time:"20:48",tone:"violet",actor:"AI-ORCHESTRATOR",detail:{en:"Decision DEC-8041 submitted for human approval",ar:"تم إرسال القرار DEC-8041 للاعتماد البشري"}},
    {time:"20:47",tone:"red",actor:"CV-GRD-12",detail:{en:"Thermal anomaly AI-DET-1907 crossed high-confidence threshold",ar:"تجاوز الخلل الحراري AI-DET-1907 حد الثقة المرتفع"}},
    {time:"20:45",tone:"green",actor:"CV-ROAD-07",detail:{en:"Defensive trajectory completed inside the L4 safety envelope",ar:"اكتمل المسار الوقائي ضمن نطاق سلامة L4"}},
    {time:"20:43",tone:"amber",actor:"MODEL-GOV",detail:{en:"CV-GRD-12 drift watch opened at 3.8 percent",ar:"تم فتح مراقبة انحراف CV-GRD-12 عند 3.8 بالمئة"}},
    {time:"20:40",tone:"cyan",actor:"EDGE-YS-04",detail:{en:"Inference latency returned below 10 milliseconds",ar:"عاد زمن الاستدلال إلى أقل من 10 مللي ثانية"}},
    {time:"20:36",tone:"blue",actor:"FUS-SEA-03",detail:{en:"Radar, EO and AIS tracks fused for VIS-029",ar:"تم دمج مسارات الرادار والتصوير وAIS للهدف VIS-029"}},
    {time:"20:31",tone:"green",actor:"MODEL-REGISTRY",detail:{en:"Safety-signature verification completed for seven production models",ar:"اكتمل التحقق من توقيع السلامة لسبعة نماذج إنتاجية"}},
    {time:"20:24",tone:"violet",actor:"NAT-AI",detail:{en:"National inference policy synchronized to all edge nodes",ar:"تمت مزامنة سياسة الاستدلال الوطنية مع جميع عقد الحافة"}}
  ];

  const incidentCases = [
    {id:"INC-023",level:"L3",phase:"investigating",priority:1,commander:"Sherif Kamal",commandPost:"Dubai Mobile ICP-02",declared:"20:43",sla:9,progress:38,category:{en:"Airspace security",ar:"أمن المجال الجوي"},objective:{en:"Identify the aerial track, protect public airspace and preserve evidence",ar:"تحديد المسار الجوي وحماية المجال العام وحفظ الأدلة"},hypothesis:{en:"Unregistered commercial UAV operating beyond approved geofence",ar:"طائرة تجارية غير مسجلة تعمل خارج النطاق الجغرافي المعتمد"},agencies:["UAE ACC","Dubai Police","GCAA"],responders:["UAV-004","UAV-011","R-004"],impact:{people:0,services:0,sites:2},confidence:94,image:"assets/images/feeds/air-isr-yas.jpg"},
    {id:"INC-022",level:"L2",phase:"contained",priority:3,commander:"Khalid Al Mazrouei",commandPost:"Maritime Desk AD-01",declared:"20:33",sla:18,progress:72,category:{en:"Maritime navigation",ar:"الملاحة البحرية"},objective:{en:"Restore the approved route and maintain safe channel separation",ar:"استعادة المسار المعتمد والحفاظ على الفصل الآمن في القناة"},hypothesis:{en:"GNSS quality degradation during channel transit",ar:"تدهور جودة الملاحة عبر الأقمار أثناء عبور القناة"},agencies:["UAE ACC","Port Authority","Coast Guard"],responders:["MV-003","MV-007","UAV-017"],impact:{people:0,services:1,sites:1},confidence:87,image:"assets/images/maritime/port-channel-eo.webp"},
    {id:"INC-021",level:"L3",phase:"responding",priority:2,commander:"Omar Al Nuaimi",commandPost:"Sharjah Air Cell",declared:"20:27",sla:6,progress:54,category:{en:"Flight-path deviation",ar:"انحراف مسار الطيران"},objective:{en:"Recover the aircraft to a protected corridor without service interruption",ar:"إعادة الطائرة إلى ممر محمي دون انقطاع الخدمة"},hypothesis:{en:"Temporary command-link multipath near industrial structures",ar:"تعدد مسارات مؤقت في رابط القيادة قرب المنشآت الصناعية"},agencies:["UAE ACC","GCAA","Sharjah Civil Defence"],responders:["UAV-013","UAV-016"],impact:{people:0,services:1,sites:3},confidence:91,image:"assets/images/drone-ops/tower-inspection-evidence.webp"},
    {id:"INC-020",level:"L1",phase:"monitoring",priority:5,commander:"Sara Al Kaabi",commandPost:"Al Ain Mobility Cell",declared:"20:13",sla:24,progress:81,category:{en:"Mobility service interruption",ar:"تعطل خدمة التنقل"},objective:{en:"Verify passenger safety and return the vehicle to service",ar:"التحقق من سلامة الركاب وإعادة المركبة إلى الخدمة"},hypothesis:{en:"Protective stop triggered by transient roadside obstruction",ar:"توقف وقائي بسبب عائق مؤقت على جانب الطريق"},agencies:["UAE ACC","ITC Abu Dhabi"],responders:["AV-006","AV-004"],impact:{people:4,services:1,sites:0},confidence:82,image:"assets/images/mobility/yas-road-camera.webp"},
    {id:"INC-019",level:"L2",phase:"assigned",priority:4,commander:"Mariam Al Suwaidi",commandPost:"RAK Utility ICP-01",declared:"19:58",sla:13,progress:61,category:{en:"Critical infrastructure anomaly",ar:"خلل في البنية التحتية الحيوية"},objective:{en:"Confirm transformer condition before controlled isolation",ar:"تأكيد حالة المحول قبل العزل المنضبط"},hypothesis:{en:"Localized connector resistance producing abnormal heat",ar:"مقاومة موضعية في الموصل تسبب حرارة غير طبيعية"},agencies:["UAE ACC","Utility Operator","RAK Civil Defence"],responders:["R-008","UAV-017","R-003"],impact:{people:0,services:2,sites:1},confidence:96,image:"assets/images/robotics/thermal-anomaly.webp"},
    {id:"INC-018",level:"L2",phase:"resolved",priority:6,commander:"Sherif Kamal",commandPost:"Abu Dhabi ICP-04",declared:"18:42",sla:0,progress:100,category:{en:"Perimeter sensor alarm",ar:"إنذار مستشعر المحيط"},objective:{en:"Validate access event and restore perimeter assurance",ar:"التحقق من حدث الدخول واستعادة ضمان المحيط"},hypothesis:{en:"Maintenance team access correlated with approved work order",ar:"دخول فريق الصيانة مرتبط بأمر عمل معتمد"},agencies:["UAE ACC","Site Security"],responders:["R-004","UAV-010"],impact:{people:0,services:0,sites:1},confidence:99,image:"assets/images/robotics/substation-robot-live.webp"},
    {id:"INC-017",level:"L1",phase:"closed",priority:7,commander:"Khalid Al Mazrouei",commandPost:"Fujairah Maritime Cell",declared:"17:55",sla:0,progress:100,category:{en:"Unknown maritime contact",ar:"هدف بحري غير معروف"},objective:{en:"Classify contact and clear the protected approach",ar:"تصنيف الهدف وتأمين مسار الاقتراب المحمي"},hypothesis:{en:"Small service craft with delayed AIS registration",ar:"قارب خدمة صغير مع تأخر تسجيل نظام AIS"},agencies:["UAE ACC","Port Authority"],responders:["MV-005","UAV-020"],impact:{people:0,services:0,sites:1},confidence:98,image:"assets/images/maritime/unknown-vessel-thermal.webp"}
  ];
  const incidentTimeline = [
    {incidentId:"INC-023",time:"20:48:24",tone:"red",actor:"AI-ORCHESTRATOR",event:{en:"Track confidence crossed escalation threshold",ar:"تجاوزت ثقة المسار حد التصعيد"}},
    {incidentId:"INC-023",time:"20:47:52",tone:"cyan",actor:"GCAA-LINK",event:{en:"Remote-ID query returned no authorized match",ar:"لم يُرجع استعلام الهوية عن بُعد تطابقاً معتمداً"}},
    {incidentId:"INC-023",time:"20:46:31",tone:"green",actor:"INC-MGR",event:{en:"UAV-004 assigned to visual confirmation orbit",ar:"تم تكليف UAV-004 بمدار التحقق البصري"}},
    {incidentId:"INC-023",time:"20:45:06",tone:"amber",actor:"DUBAI-ICP",event:{en:"Public-airspace containment zone established",ar:"تم إنشاء منطقة احتواء في المجال الجوي العام"}},
    {incidentId:"INC-023",time:"20:43:18",tone:"violet",actor:"SYSTEM",event:{en:"L3 incident declared and command record sealed",ar:"تم إعلان حادث مستوى L3 وختم سجل القيادة"}},
    {incidentId:"INC-019",time:"20:42:11",tone:"amber",actor:"R-008",event:{en:"Radiometric peak confirmed at transformer connector",ar:"تم تأكيد الذروة الإشعاعية عند موصل المحول"}},
    {incidentId:"INC-022",time:"20:39:42",tone:"green",actor:"SEA-OPS",event:{en:"Vessel returned inside protected channel",ar:"عادت السفينة إلى القناة المحمية"}},
    {incidentId:"INC-020",time:"20:34:17",tone:"green",actor:"MOB-CMD",event:{en:"Passenger welfare check completed",ar:"اكتمل التحقق من سلامة الركاب"}}
  ];
  const incidentResources = [
    {id:"UAV-004",type:"drone",role:{en:"Visual identification",ar:"التعريف البصري"},eta:"ON SCENE",status:"active"},{id:"UAV-011",type:"drone",role:{en:"Outer perimeter",ar:"المحيط الخارجي"},eta:"03:20",status:"active"},{id:"R-004",type:"robot",role:{en:"Ground evidence",ar:"أدلة أرضية"},eta:"07:40",status:"enroute"},{id:"AV-009",type:"vehicle",role:{en:"Mobile command post",ar:"مركز قيادة متنقل"},eta:"05:10",status:"enroute"},{id:"MV-003",type:"marine",role:{en:"Coastal exclusion",ar:"العزل الساحلي"},eta:"STANDBY",status:"standby"},{id:"EDGE-DX-02",type:"network",role:{en:"Local inference",ar:"الاستدلال المحلي"},eta:"ONLINE",status:"active"}
  ];
  const incidentTasks = [
    {id:"ACT-91",incidentId:"INC-023",owner:"AIR-CMD",task:{en:"Maintain visual track and preserve separation",ar:"الحفاظ على التتبع البصري ومسافة الفصل"},state:"active",due:"20:52"},{id:"ACT-92",incidentId:"INC-023",owner:"GCAA",task:{en:"Resolve aircraft identity against national registry",ar:"مطابقة هوية الطائرة مع السجل الوطني"},state:"active",due:"20:50"},{id:"ACT-93",incidentId:"INC-023",owner:"INC-MGR",task:{en:"Approve containment perimeter",ar:"اعتماد محيط الاحتواء"},state:"done",due:"20:47"},{id:"ACT-94",incidentId:"INC-023",owner:"DUBAI-ICP",task:{en:"Prepare public warning without release",ar:"إعداد تحذير عام دون نشره"},state:"review",due:"20:55"},{id:"ACT-95",incidentId:"INC-023",owner:"SEC-AUD",task:{en:"Seal evidence chain and access record",ar:"ختم سلسلة الأدلة وسجل الوصول"},state:"done",due:"20:48"},{id:"ACT-84",incidentId:"INC-019",owner:"ROB-CMD",task:{en:"Complete thermal confirmation scan",ar:"إكمال مسح التحقق الحراري"},state:"active",due:"21:02"}
  ];
  const incidentComms = [
    {time:"20:48",channel:"INC-023 COMMAND",from:"INC-MGR",message:{en:"Maintain observation; no intercept authorization at this stage.",ar:"استمروا في المراقبة؛ لا يوجد اعتماد للاعتراض في هذه المرحلة."}},
    {time:"20:47",channel:"AIR CELL",from:"UAV-004",message:{en:"Target acquired, stable track, separation 240 metres.",ar:"تم رصد الهدف، المسار مستقر، مسافة الفصل 240 متراً."}},
    {time:"20:46",channel:"GCAA-LINK",from:"REGISTRY",message:{en:"No valid Remote-ID match. Secondary lookup in progress.",ar:"لا يوجد تطابق صالح للهوية عن بُعد. البحث الثانوي جارٍ."}},
    {time:"20:44",channel:"DUBAI-ICP",from:"POLICE-LIAISON",message:{en:"Ground observation team moving to sector D-14.",ar:"فريق المراقبة الأرضية يتحرك إلى القطاع D-14."}},
    {time:"20:42",channel:"NATIONAL",from:"SYSTEM",message:{en:"Cross-domain incident bridge established and recorded.",ar:"تم إنشاء جسر الحادث متعدد المجالات وتسجيله."}}
  ];

  const twinCities = [
    {id:"abudhabi",name:{en:"Abu Dhabi",ar:"أبوظبي"},lat:24.4886,lon:54.3777,zoom:15.05,tilt:68,heading:326,objects:42864,buildings:12438,roads:1245,sites:18,sensors:3862,health:96,freshness:98},
    {id:"dubai",name:{en:"Dubai",ar:"دبي"},lat:25.1972,lon:55.2744,zoom:15.25,tilt:70,heading:331,objects:51972,buildings:16784,roads:1682,sites:22,sensors:4540,health:95,freshness:98},
    {id:"alain",name:{en:"Al Ain",ar:"العين"},lat:24.1302,lon:55.8023,zoom:14.8,tilt:66,heading:310,objects:18304,buildings:6280,roads:742,sites:9,sensors:1688,health:97,freshness:99},
    {id:"sharjah",name:{en:"Sharjah",ar:"الشارقة"},lat:25.3463,lon:55.4209,zoom:15.1,tilt:67,heading:318,objects:29416,buildings:9341,roads:938,sites:13,sensors:2254,health:94,freshness:97},
    {id:"rak",name:{en:"Ras Al Khaimah",ar:"رأس الخيمة"},lat:25.7895,lon:55.9432,zoom:14.9,tilt:65,heading:304,objects:12188,buildings:4195,roads:526,sites:7,sensors:984,health:95,freshness:98},
    {id:"fujairah",name:{en:"Fujairah",ar:"الفجيرة"},lat:25.1288,lon:56.3265,zoom:15.0,tilt:69,heading:292,objects:10642,buildings:3658,roads:482,sites:11,sensors:1180,health:96,freshness:98}
  ];
  const twinDistricts = [
    {id:"AD-CBD",city:"abudhabi",name:{en:"Abu Dhabi Central District",ar:"منطقة أبوظبي المركزية"},lat:24.4768,lon:54.3695,zoom:16.45,tilt:72,heading:334,health:96,load:78,objects:8240,alerts:1},
    {id:"AD-MRY",city:"abudhabi",name:{en:"Al Maryah & Reem Islands",ar:"جزيرتا المارية والريم"},lat:24.5017,lon:54.3975,zoom:16.15,tilt:71,heading:322,health:97,load:83,objects:7320,alerts:0},
    {id:"AD-YAS",city:"abudhabi",name:{en:"Yas Smart Mobility District",ar:"منطقة ياس للتنقل الذكي"},lat:24.4905,lon:54.6068,zoom:16.15,tilt:69,heading:314,health:98,load:71,objects:6845,alerts:0},
    {id:"DX-DTN",city:"dubai",name:{en:"Downtown Dubai",ar:"وسط مدينة دبي"},lat:25.1972,lon:55.2744,zoom:16.5,tilt:73,heading:332,health:95,load:88,objects:10124,alerts:1},
    {id:"DX-JAL",city:"dubai",name:{en:"Jebel Ali Logistics District",ar:"منطقة جبل علي اللوجستية"},lat:24.9857,lon:55.0272,zoom:15.7,tilt:66,heading:300,health:94,load:91,objects:8670,alerts:2},
    {id:"AA-CEN",city:"alain",name:{en:"Al Ain Central District",ar:"منطقة العين المركزية"},lat:24.1302,lon:55.8023,zoom:16.0,tilt:67,heading:310,health:97,load:62,objects:5212,alerts:0},
    {id:"SH-IND",city:"sharjah",name:{en:"Sharjah Industrial District",ar:"المنطقة الصناعية بالشارقة"},lat:25.3227,lon:55.4296,zoom:15.8,tilt:68,heading:315,health:93,load:84,objects:6940,alerts:2},
    {id:"RAK-CEN",city:"rak",name:{en:"RAK Central & Utility Zone",ar:"وسط رأس الخيمة ومنطقة المرافق"},lat:25.7895,lon:55.9432,zoom:15.8,tilt:66,heading:304,health:95,load:66,objects:4088,alerts:1},
    {id:"FJ-PRT",city:"fujairah",name:{en:"Fujairah Port District",ar:"منطقة ميناء الفجيرة"},lat:25.1748,lon:56.3627,zoom:15.55,tilt:69,heading:292,health:96,load:79,objects:4650,alerts:0}
  ];
  const twinFacilities = [
    {id:"INF-AD-001",district:"AD-CBD",region:"Abu Dhabi",type:"control",name:{en:"National Autonomous Systems Control Centre",ar:"المركز الوطني للتحكم بالأنظمة الذاتية"},lat:24.4761,lon:54.3711,status:"operational",health:99,load:64,risk:"low",dependencies:["TEL-CORE-01","PWR-AD-07","EDGE-AD-01"],sensors:186,lastSync:"0.8 s",image:"assets/images/feeds/air-isr-yas.jpg"},
    {id:"PWR-AD-007",district:"AD-CBD",region:"Abu Dhabi",type:"power",name:{en:"Central Grid Substation 07",ar:"محطة الشبكة المركزية 07"},lat:24.4686,lon:54.3628,status:"watch",health:88,load:82,risk:"medium",dependencies:["GRID-132KV","CTRL-AD-04","R-008"],sensors:74,lastSync:"1.2 s",image:"assets/images/robotics/substation-robot-live.webp"},
    {id:"TEL-MRY-012",district:"AD-MRY",region:"Abu Dhabi",type:"telecom",name:{en:"Al Maryah Secure Edge Exchange",ar:"مقسم الحافة الآمن في المارية"},lat:24.5011,lon:54.3889,status:"operational",health:98,load:71,risk:"low",dependencies:["5G-CORE-A","FIBRE-RING-2","EDGE-AD-01"],sensors:116,lastSync:"0.4 s",image:"assets/images/robotics/utility-corridor-wide.webp"},
    {id:"MOB-YAS-021",district:"AD-YAS",region:"Abu Dhabi",type:"mobility",name:{en:"Yas Autonomous Mobility Hub",ar:"مركز ياس للتنقل الذاتي"},lat:24.4874,lon:54.6078,status:"operational",health:97,load:76,risk:"low",dependencies:["V2X-YS-18","CHG-YAS-04","AV-FLEET"],sensors:142,lastSync:"0.6 s",image:"assets/images/mobility/av-yas-hero.webp"},
    {id:"BLD-DX-101",district:"DX-DTN",region:"Dubai",type:"building",name:{en:"Downtown High-Rise Cluster",ar:"مجموعة الأبراج في وسط دبي"},lat:25.1975,lon:55.2754,status:"watch",health:93,load:88,risk:"medium",dependencies:["PWR-DX-11","WTR-DX-06","EVAC-DX-2"],sensors:238,lastSync:"0.9 s",image:"assets/images/drone-ops/tower-inspection-evidence.webp"},
    {id:"PRT-JAL-003",district:"DX-JAL",region:"Dubai",type:"port",name:{en:"Jebel Ali Autonomous Logistics Gate",ar:"بوابة جبل علي اللوجستية الذاتية"},lat:24.9852,lon:55.0285,status:"degraded",health:84,load:94,risk:"high",dependencies:["PORT-OPS","5G-JAL","UGV-FLEET"],sensors:204,lastSync:"1.8 s",image:"assets/images/maritime/port-channel-eo.webp"},
    {id:"WTR-AA-004",district:"AA-CEN",region:"Abu Dhabi",type:"water",name:{en:"Al Ain Water Distribution Node",ar:"عقدة توزيع المياه في العين"},lat:24.1321,lon:55.7987,status:"operational",health:97,load:61,risk:"low",dependencies:["RES-AA-2","PMP-AA-14","CTRL-AA-01"],sensors:68,lastSync:"0.7 s",image:"assets/images/robotics/utility-corridor-wide.webp"},
    {id:"IND-SH-014",district:"SH-IND",region:"Sharjah",type:"industrial",name:{en:"Sharjah Industrial Safety Cluster",ar:"مجموعة السلامة الصناعية في الشارقة"},lat:25.3231,lon:55.4302,status:"watch",health:90,load:86,risk:"medium",dependencies:["GAS-SH-3","PWR-SH-9","CIVDEF-SH"],sensors:164,lastSync:"1.4 s",image:"assets/images/robotics/thermal-anomaly.webp"},
    {id:"PWR-RAK-009",district:"RAK-CEN",region:"Ras Al Khaimah",type:"power",name:{en:"RAK Utility Coordination Node",ar:"عقدة تنسيق المرافق في رأس الخيمة"},lat:25.7889,lon:55.9447,status:"watch",health:89,load:79,risk:"medium",dependencies:["GRID-RAK","R-003","EDGE-RAK-06"],sensors:82,lastSync:"1.1 s",image:"assets/images/robotics/thermal-anomaly.webp"},
    {id:"PRT-FJ-002",district:"FJ-PRT",region:"Fujairah",type:"port",name:{en:"Fujairah Maritime Operations Node",ar:"عقدة العمليات البحرية في الفجيرة"},lat:25.1745,lon:56.3621,status:"operational",health:96,load:81,risk:"low",dependencies:["AIS-FJ","RADAR-FJ-2","MV-FLEET"],sensors:128,lastSync:"0.8 s",image:"assets/images/maritime/usv-khalifa-port.webp"}
  ];
  const twinSensors = [
    {id:"SNS-TH-782",facility:"PWR-AD-007",type:"Thermal",value:64.8,unit:"°C",status:"watch",battery:86,latency:18,lat:24.4687,lon:54.3629,trend:"+4.6"},
    {id:"SNS-VIB-214",facility:"PWR-AD-007",type:"Vibration",value:2.1,unit:"mm/s",status:"healthy",battery:92,latency:22,lat:24.4685,lon:54.3627,trend:"−0.2"},
    {id:"SNS-AQ-110",facility:"BLD-DX-101",type:"Air quality",value:41,unit:"AQI",status:"healthy",battery:79,latency:35,lat:25.1976,lon:55.2756,trend:"−3"},
    {id:"SNS-STR-091",facility:"BLD-DX-101",type:"Structural",value:0.7,unit:"mm",status:"healthy",battery:96,latency:14,lat:25.1974,lon:55.2752,trend:"0.0"},
    {id:"SNS-FLW-511",facility:"WTR-AA-004",type:"Water flow",value:182,unit:"L/s",status:"healthy",battery:89,latency:29,lat:24.1322,lon:55.7986,trend:"+7"},
    {id:"SNS-V2X-018",facility:"MOB-YAS-021",type:"V2X latency",value:11,unit:"ms",status:"healthy",battery:100,latency:11,lat:24.4875,lon:54.6079,trend:"−2"},
    {id:"SNS-GAS-044",facility:"IND-SH-014",type:"Gas detector",value:18,unit:"ppm",status:"watch",battery:72,latency:42,lat:25.3232,lon:55.4304,trend:"+5"},
    {id:"SNS-TDE-039",facility:"PRT-JAL-003",type:"Gate throughput",value:82,unit:"%",status:"degraded",battery:100,latency:61,lat:24.9853,lon:55.0284,trend:"+12"},
    {id:"SNS-WAV-302",facility:"PRT-FJ-002",type:"Wave height",value:0.6,unit:"m",status:"healthy",battery:91,latency:36,lat:25.1747,lon:56.3624,trend:"+0.1"},
    {id:"SNS-SEC-017",facility:"INF-AD-001",type:"Perimeter",value:100,unit:"%",status:"healthy",battery:94,latency:9,lat:24.4762,lon:54.3712,trend:"0"}
  ];
  const twinLinks = [
    {id:"UTL-PWR-01",type:"power",from:"PWR-AD-007",to:"INF-AD-001",capacity:132,load:82,status:"healthy"},{id:"UTL-TEL-02",type:"telecom",from:"TEL-MRY-012",to:"INF-AD-001",capacity:100,load:64,status:"healthy"},{id:"UTL-MOB-03",type:"mobility",from:"TEL-MRY-012",to:"MOB-YAS-021",capacity:40,load:71,status:"healthy"},{id:"UTL-DX-04",type:"power",from:"BLD-DX-101",to:"PRT-JAL-003",capacity:220,load:91,status:"watch"},{id:"UTL-AA-05",type:"water",from:"WTR-AA-004",to:"PWR-AD-007",capacity:240,load:61,status:"healthy"},{id:"UTL-SH-06",type:"industrial",from:"IND-SH-014",to:"BLD-DX-101",capacity:60,load:86,status:"watch"},{id:"UTL-RAK-07",type:"power",from:"PWR-RAK-009",to:"IND-SH-014",capacity:132,load:79,status:"healthy"},{id:"UTL-FJ-08",type:"maritime",from:"PRT-FJ-002",to:"PRT-JAL-003",capacity:24,load:74,status:"healthy"}
  ];
  const twinScenarios = [
    {id:"SCN-FLD-04",type:"flood",name:{en:"Coastal flood & access loss",ar:"فيضان ساحلي وفقدان الوصول"},district:"AD-CBD",lat:24.4745,lon:54.3538,severity:"high",radiusKm:1.4,duration:42,probability:18,impacted:4,assets:7,serviceLoss:12,recovery:38,color:"cyan"},
    {id:"SCN-GRD-07",type:"outage",name:{en:"132 kV substation isolation",ar:"عزل محطة 132 كيلوفولت"},district:"AD-CBD",lat:24.4686,lon:54.3628,severity:"high",radiusKm:.85,duration:28,probability:11,impacted:3,assets:5,serviceLoss:8,recovery:24,color:"red"},
    {id:"SCN-TRF-12",type:"traffic",name:{en:"Event traffic surge",ar:"ارتفاع حركة المرور بسبب فعالية"},district:"AD-YAS",lat:24.4905,lon:54.6068,severity:"medium",radiusKm:1.8,duration:55,probability:62,impacted:2,assets:12,serviceLoss:4,recovery:18,color:"amber"},
    {id:"SCN-PRT-03",type:"port",name:{en:"Autonomous gate obstruction",ar:"عائق في البوابة الذاتية"},district:"DX-JAL",lat:24.9852,lon:55.0285,severity:"medium",radiusKm:1.2,duration:36,probability:27,impacted:3,assets:9,serviceLoss:7,recovery:31,color:"violet"},
    {id:"SCN-HT-09",type:"heat",name:{en:"Extreme heat load envelope",ar:"نطاق حمل الحرارة الشديدة"},district:"AA-CEN",lat:24.1302,lon:55.8023,severity:"medium",radiusKm:2.2,duration:90,probability:44,impacted:2,assets:14,serviceLoss:3,recovery:12,color:"amber"}
  ];
  const twinEvents = [
    {time:"20:49:12",tone:"green",actor:"TWIN-ORCH",event:{en:"National object graph synchronized",ar:"تمت مزامنة مخطط الكائنات الوطني"}},{time:"20:48:46",tone:"cyan",actor:"EDGE-AD-01",event:{en:"186 control-centre sensor states reconciled",ar:"تمت مطابقة حالات 186 مستشعراً في مركز التحكم"}},{time:"20:47:31",tone:"amber",actor:"PWR-AD-007",event:{en:"Transformer thermal trend entered watch band",ar:"دخل اتجاه حرارة المحول نطاق المراقبة"}},{time:"20:46:58",tone:"green",actor:"V2X-YS-18",event:{en:"Mobility graph latency returned below 12 ms",ar:"عاد زمن استجابة مخطط التنقل إلى أقل من 12 مللي ثانية"}},{time:"20:45:24",tone:"violet",actor:"SIM-ENGINE",event:{en:"Coastal flood scenario baseline validated",ar:"تم التحقق من خط أساس سيناريو الفيضان الساحلي"}},{time:"20:44:09",tone:"cyan",actor:"BIM-FED",event:{en:"Building geometry delta ingested for Al Maryah",ar:"تم استيعاب تغير هندسة المباني في المارية"}},{time:"20:42:17",tone:"green",actor:"SEC-GATE",event:{en:"Twin command policy synchronized to role service",ar:"تمت مزامنة سياسة أوامر التوأم مع خدمة الأدوار"}},{time:"20:39:52",tone:"blue",actor:"PRT-FJ-002",event:{en:"Maritime environment feed revalidated",ar:"تمت إعادة التحقق من تغذية البيئة البحرية"}}
  ];

  const aiAlerts = [
    {time:"20:44",severity:"high",title:{en:"Unusual movement pattern detected",ar:"رُصد نمط حركة غير اعتيادي"},place:{en:"Al Maryah Island",ar:"جزيرة المارية"},confidence:93},
    {time:"20:41",severity:"medium",title:{en:"Possible restricted-zone intrusion",ar:"احتمال دخول منطقة مقيدة"},place:{en:"Dubai Industrial Area",ar:"منطقة دبي الصناعية"},confidence:88},
    {time:"20:38",severity:"medium",title:{en:"Low battery predicted before return",ar:"توقع انخفاض البطارية قبل العودة"},place:{en:"UAV-014",ar:"UAV-014"},confidence:91},
    {time:"20:35",severity:"low",title:{en:"Maritime anomaly cleared",ar:"تمت معالجة الشذوذ البحري"},place:{en:"Offshore Abu Dhabi",ar:"البحر المقابل لأبوظبي"},confidence:84}
  ];

  const systems = [
    {key:"system",label:{en:"System",ar:"النظام"},value:{en:"Operational",ar:"يعمل"},status:"ok"},
    {key:"ai",label:{en:"AI engine",ar:"محرك الذكاء"},value:{en:"Online",ar:"متصل"},status:"ok"},
    {key:"network",label:{en:"Network",ar:"الشبكة"},value:{en:"Secure",ar:"آمنة"},status:"ok"},
    {key:"cyber",label:{en:"Cyber",ar:"الأمن"},value:{en:"Secure",ar:"آمن"},status:"ok"}
  ];

  const scenarioEvents = [
    {at:0,label:{en:"AI model detects thermal anomaly",ar:"رصد نموذج الذكاء ارتفاعاً حرارياً"},tone:"red"},
    {at:7,label:{en:"Incident INC-019 created",ar:"تم إنشاء الحادث INC-019"},tone:"amber"},
    {at:15,label:{en:"UAV-017 assigned for verification",ar:"تم تكليف UAV-017 للتحقق"},tone:"cyan"},
    {at:24,label:{en:"R-008 routed to safe inspection point",ar:"تم توجيه R-008 إلى نقطة الفحص الآمنة"},tone:"green"},
    {at:38,label:{en:"Live evidence linked to command record",ar:"تم ربط الدليل المباشر بسجل القيادة"},tone:"blue"},
    {at:52,label:{en:"Human authorization requested",ar:"تم طلب الاعتماد البشري"},tone:"violet"}
  ];

  const liveMapSectors = [
    {id:"NAT-AD",name:{en:"Abu Dhabi metropolitan sector",ar:"قطاع أبوظبي الحضري"},region:"Abu Dhabi",lat:24.4764,lon:54.3705,readiness:97,contacts:17,events:2,latency:11,weather:"CLEAR",lead:"AD-JOC"},
    {id:"NAT-YS",name:{en:"Yas–Khalifa autonomous corridor",ar:"ممر ياس–خليفة الذاتي"},region:"Abu Dhabi",lat:24.4880,lon:54.6070,readiness:96,contacts:9,events:1,latency:9,weather:"CLEAR",lead:"MOB-CMD"},
    {id:"NAT-DX",name:{en:"Dubai metropolitan sector",ar:"قطاع دبي الحضري"},region:"Dubai",lat:25.1972,lon:55.2744,readiness:94,contacts:11,events:1,latency:14,weather:"CLEAR",lead:"DX-JOC"},
    {id:"NAT-JA",name:{en:"Jebel Ali logistics corridor",ar:"ممر جبل علي اللوجستي"},region:"Dubai",lat:24.9857,lon:55.0272,readiness:91,contacts:7,events:1,latency:16,weather:"WATCH",lead:"LOG-CELL"},
    {id:"NAT-NR",name:{en:"Northern Emirates urban cluster",ar:"التجمع الحضري للإمارات الشمالية"},region:"Sharjah",lat:25.4052,lon:55.5136,readiness:93,contacts:8,events:1,latency:18,weather:"CLEAR",lead:"NE-JOC"},
    {id:"NAT-FJ",name:{en:"Fujairah east-coast sector",ar:"قطاع الساحل الشرقي بالفجيرة"},region:"Fujairah",lat:25.1288,lon:56.3265,readiness:88,contacts:6,events:1,latency:22,weather:"WIND",lead:"SEA-OPS"}
  ];
  const liveMapEvents = [
    {id:"GEO-901",time:"20:50",tone:"red",domain:"drone",region:"Dubai",title:{en:"Unregistered aerial track correlated with restricted-zone edge",ar:"ربط مسار جوي غير مسجل بحافة منطقة مقيدة"},confidence:94,source:"AIR-FUSION",assetId:"UAV-004"},
    {id:"GEO-900",time:"20:48",tone:"amber",domain:"marine",region:"Abu Dhabi",title:{en:"Small craft projected inside protected approach separation",ar:"توقع دخول قارب صغير ضمن فصل مسار الاقتراب المحمي"},confidence:93,source:"SEA-FUSION",assetId:"MV-003"},
    {id:"GEO-899",time:"20:47",tone:"amber",domain:"robot",region:"Ras Al Khaimah",title:{en:"Thermal signature persists above utility baseline",ar:"استمرار البصمة الحرارية فوق خط أساس المرافق"},confidence:96,source:"EDGE-CV",assetId:"R-008"},
    {id:"GEO-898",time:"20:45",tone:"cyan",domain:"vehicle",region:"Abu Dhabi",title:{en:"V2X priority corridor reserved for emergency logistics",ar:"حجز ممر أولوية V2X للخدمات اللوجستية الطارئة"},confidence:99,source:"MOB-ORCH",assetId:"AV-004"},
    {id:"GEO-897",time:"20:42",tone:"green",domain:"drone",region:"Fujairah",title:{en:"Coastal surveillance route deconflicted from port approach",ar:"منع تعارض مسار المراقبة الساحلية مع مدخل الميناء"},confidence:98,source:"AIR-SEA",assetId:"UAV-020"},
    {id:"GEO-896",time:"20:39",tone:"violet",domain:"robot",region:"Dubai",title:{en:"Hazard-sampling unit entered controlled logistics geofence",ar:"دخول وحدة أخذ عينات المخاطر إلى السياج اللوجستي المراقب"},confidence:97,source:"GEO-RULE",assetId:"R-005"},
    {id:"GEO-895",time:"20:36",tone:"green",domain:"marine",region:"Fujairah",title:{en:"AIS and EO tracks reconciled across east-coast sector",ar:"مطابقة مسارات AIS والتصوير في قطاع الساحل الشرقي"},confidence:99,source:"SEA-EDGE",assetId:"MV-004"},
    {id:"GEO-894",time:"20:31",tone:"cyan",domain:"vehicle",region:"Abu Dhabi",title:{en:"Yas autonomous corridor latency returned below 12 ms",ar:"عودة زمن استجابة ممر ياس الذاتي إلى أقل من 12 مللي ثانية"},confidence:100,source:"V2X-MESH",assetId:"AV-005"}
  ];
  const liveMapCoverage = [
    {id:"COV-5G",name:{en:"Secure 5G command coverage",ar:"تغطية قيادة 5G الآمنة"},value:98.7,unit:"%",tone:"green"},
    {id:"COV-GNSS",name:{en:"GNSS / RTK integrity",ar:"سلامة GNSS / RTK"},value:99.2,unit:"%",tone:"cyan"},
    {id:"COV-AIS",name:{en:"Coastal AIS fusion",ar:"دمج AIS الساحلي"},value:96.4,unit:"%",tone:"blue"},
    {id:"COV-V2X",name:{en:"Urban V2X visibility",ar:"رؤية V2X الحضرية"},value:97.1,unit:"%",tone:"violet"}
  ];

  const fleetWorkOrders = [
    {id:"WO-2741",assetId:"UAV-014",type:{en:"Battery module replacement",ar:"استبدال وحدة البطارية"},priority:"high",status:"inProgress",depot:"AD-12",due:"21:30",progress:72,technician:"TECH-17",parts:["BAT-HV-44"],downtime:3.2},
    {id:"WO-2740",assetId:"R-006",type:{en:"Drive actuator inspection",ar:"فحص مشغل الحركة"},priority:"medium",status:"queued",depot:"DX-RB-03",due:"22:15",progress:12,technician:"TECH-08",parts:["ACT-UGV-11"],downtime:5.5},
    {id:"WO-2739",assetId:"MV-006",type:{en:"Hull sensor calibration",ar:"معايرة مستشعرات الهيكل"},priority:"medium",status:"awaitingParts",depot:"KP-01",due:"15 SEP",progress:38,technician:"SEA-MNT-04",parts:["SON-22","SEAL-09"],downtime:8.4},
    {id:"WO-2738",assetId:"AV-009",type:{en:"Lidar cleaning and alignment",ar:"تنظيف ومحاذاة الليدار"},priority:"low",status:"qualityGate",depot:"YAS-MH-01",due:"20:55",progress:91,technician:"MOB-MNT-12",parts:[],downtime:1.1},
    {id:"WO-2737",assetId:"R-011",type:{en:"Manipulator firmware validation",ar:"التحقق من برنامج الذراع الآلية"},priority:"medium",status:"scheduled",depot:"MS-RB-02",due:"16 SEP",progress:0,technician:"TECH-21",parts:[],downtime:2.8},
    {id:"WO-2736",assetId:"UAV-006",type:{en:"Propulsion vibration check",ar:"فحص اهتزاز نظام الدفع"},priority:"high",status:"engineeringReview",depot:"DX-07",due:"21:10",progress:64,technician:"AIR-MNT-03",parts:["MTR-350-02"],downtime:4.6},
    {id:"WO-2735",assetId:"AV-002",type:{en:"Brake-by-wire certification",ar:"اعتماد نظام المكابح الإلكتروني"},priority:"medium",status:"released",depot:"AD-MH-02",due:"COMPLETE",progress:100,technician:"MOB-MNT-07",parts:[],downtime:.9},
    {id:"WO-2734",assetId:"MV-002",type:{en:"Communications failover test",ar:"اختبار التحويل الاحتياطي للاتصالات"},priority:"low",status:"scheduled",depot:"FJ-04",due:"17 SEP",progress:0,technician:"SEA-MNT-09",parts:[],downtime:1.7}
  ];
  const fleetCertificates = [
    {id:"CERT-AIR-114",domain:"drone",name:{en:"Airworthiness release",ar:"إفراج صلاحية الطيران"},valid:19,expiring:1,owner:"AIR-QA"},
    {id:"CERT-GRD-208",domain:"robot",name:{en:"Ground autonomy safety case",ar:"ملف سلامة الأنظمة الذاتية الأرضية"},valid:14,expiring:1,owner:"ROB-QA"},
    {id:"CERT-SEA-071",domain:"marine",name:{en:"Remote-vessel operating permit",ar:"تصريح تشغيل السفن عن بُعد"},valid:7,expiring:1,owner:"SEA-QA"},
    {id:"CERT-MOB-330",domain:"vehicle",name:{en:"L4 operational design-domain release",ar:"إفراج نطاق التصميم التشغيلي L4"},valid:9,expiring:1,owner:"MOB-QA"},
    {id:"CERT-CYB-901",domain:"all",name:{en:"Secure command-link baseline",ar:"خط أساس رابط القيادة الآمن"},valid:52,expiring:1,owner:"SEC-AUD"}
  ];
  const fleetSpares = [
    {id:"BAT-HV-44",name:{en:"High-density battery module",ar:"وحدة بطارية عالية الكثافة"},stock:7,min:6,eta:"ON HAND",risk:"watch"},
    {id:"MTR-350-02",name:{en:"M350 propulsion motor",ar:"محرك دفع M350"},stock:3,min:4,eta:"6 HRS",risk:"high"},
    {id:"SON-22",name:{en:"Marine sonar transducer",ar:"محول سونار بحري"},stock:2,min:3,eta:"18 HRS",risk:"high"},
    {id:"ACT-UGV-11",name:{en:"UGV sealed drive actuator",ar:"مشغل حركة محكم لمركبة أرضية"},stock:8,min:5,eta:"ON HAND",risk:"low"},
    {id:"LID-128",name:{en:"128-channel lidar head",ar:"رأس ليدار 128 قناة"},stock:5,min:3,eta:"ON HAND",risk:"low"}
  ];
  const fleetEvents = [
    {time:"20:50",tone:"green",actor:"FLT-ORCH",event:{en:"National readiness forecast recomputed at 96.2%",ar:"أعيد احتساب توقع الجاهزية الوطنية عند 96.2٪"}},
    {time:"20:47",tone:"amber",actor:"AIR-MNT-03",event:{en:"UAV-006 propulsion vibration evidence attached to WO-2736",ar:"أرفقت أدلة اهتزاز دفع UAV-006 بأمر العمل WO-2736"}},
    {time:"20:44",tone:"cyan",actor:"MOB-QA",event:{en:"AV-009 entered automated lidar quality gate",ar:"دخلت AV-009 بوابة جودة الليدار الآلية"}},
    {time:"20:41",tone:"red",actor:"SUPPLY-AI",event:{en:"M350 motor stock projected below minimum threshold",ar:"توقع انخفاض مخزون محركات M350 دون الحد الأدنى"}},
    {time:"20:37",tone:"green",actor:"SEA-MNT-04",event:{en:"MV-006 dry-bay inspection passed structural check",ar:"اجتازت MV-006 فحص الهيكل في الحوض الجاف"}},
    {time:"20:31",tone:"violet",actor:"CONFIG-CMDB",event:{en:"Autonomy baseline 7.3.1 sealed for nine road vehicles",ar:"تم ختم خط أساس الاستقلالية 7.3.1 لتسع مركبات برية"}}
  ];

  window.ACC_DEMO={version:"0.2.9",T,nav,users,permissionLabels,locations,operationalSites,assets,incidents,droneMissions,droneMissionEvents,droneInsights,droneNoFlyZones,droneAirspaceSectors,droneBases,droneWeatherStations,droneEvidence,robotMissions,robotEvents,robotBases,robotZones,maritimeMissions,maritimeContacts,maritimePorts,maritimeZones,maritimeWeather,maritimeEvents,maritimeEvidence,mobilityMissions,mobilityHubs,mobilityZones,mobilityNodes,mobilityEvents,mobilityEvidence,aiModels,aiDetections,aiDecisions,aiEdgeNodes,aiEvents,incidentCases,incidentTimeline,incidentResources,incidentTasks,incidentComms,twinCities,twinDistricts,twinFacilities,twinSensors,twinLinks,twinScenarios,twinEvents,liveMapSectors,liveMapEvents,liveMapCoverage,fleetWorkOrders,fleetCertificates,fleetSpares,fleetEvents,aiAlerts,systems,scenarioEvents};
})();
