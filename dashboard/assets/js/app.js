(function(){
  "use strict";
  const D=window.ACC_DEMO,MAP=window.ACC_LOCAL_MAP;
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const esc=(v)=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
  const icon=(name)=>`<svg aria-hidden="true"><use href="#i-${name}"></use></svg>`;
  const saved=(key,fallback)=>{try{return localStorage.getItem("acc."+key)||fallback}catch(e){return fallback}};
  const persist=(key,value)=>{try{localStorage.setItem("acc."+key,value)}catch(e){}}
  const launchParams=(()=>{try{return new URLSearchParams(window.location.search)}catch(e){return new URLSearchParams()}})();
  const launchValue=(key,allowed)=>{const value=launchParams.get(key);return allowed.includes(value)?value:null};
  const presentationMode=launchParams.get("presentation")==="1";

  const state={
    lang:launchValue("lang",["en","ar"])||saved("lang","en"),theme:launchValue("theme",["dark","light"])||saved("theme","dark"),fontSize:launchValue("font",["small","medium","large"])||saved("fontSizeV029","large"),userId:launchParams.get("user")||saved("user","aisha"),module:launchParams.get("module")||saved("moduleV029",saved("moduleV028",saved("moduleV027",saved("moduleV026",saved("moduleV025",saved("moduleV024",saved("moduleV023",saved("moduleV022",saved("moduleV021",saved("moduleV020",saved("moduleV019",saved("moduleV018",saved("moduleV017",saved("moduleV016","command")))))))))))))),selectedAssetId:"UAV-017",
    selectedIncidentId:null,mapMode:saved("mapModeV017",saved("mapModeV016",saved("mapModeV015",saved("mapModeV014",saved("mapModeV013",saved("mapModeV012","3d")))))),search:"",playing:true,scenarioSecond:0,notified:new Set(),
    map:{lat:24.4800,lon:54.3810,zoom:14.65,pitch:67,bearing:338,dragging:false,
      layers:{assets:true,incidents:true,zones:true,corridors:true,buildings:true,weather:false,cameras:false,air:true,land:true,sea:true},
      cartography:{labels:true,elevation:true,shadows:true,buildingOpacity:.82,buildingStyle:"natural",assetStyle:saved("assetStyleV017",saved("assetStyleV016",saved("assetStyleV015",saved("assetStyleV014",saved("assetStyleV013","auto"))))),quality:saved("mapQualityV017","balanced")}},
    drone:{selectedId:"UAV-017",search:"",filter:"all",cameraMode:"normal",detailTab:"overview",evidenceId:"EV-782",mapLayers:{assets:true,incidents:false,zones:true,corridors:true,buildings:true,weather:false,cameras:true,air:true,land:false,sea:false}},
    robotics:{selectedId:"R-008",search:"",filter:"all",category:"all",cameraMode:"normal",detailTab:"overview",mapLayers:{assets:true,incidents:true,zones:true,corridors:true,buildings:true,weather:false,cameras:true,air:false,land:true,sea:false}},
    maritime:{selectedId:"MV-003",contactId:"VIS-029",search:"",type:"all",cameraMode:"eo",detailTab:"overview",mapLayers:{assets:true,incidents:true,zones:true,corridors:true,buildings:true,weather:true,cameras:true,air:false,land:false,sea:true}},
    mobility:{selectedId:"AV-005",nodeId:"V2X-YS-18",search:"",type:"all",cameraMode:"road",detailTab:"overview",mapLayers:{assets:true,incidents:true,zones:true,corridors:true,buildings:true,weather:false,cameras:true,air:false,land:true,sea:false}},
    ai:{detectionId:"AI-DET-1907",modelId:"CV-GRD-12",search:"",domain:"all",evidenceMode:"source",mapLayers:{assets:true,incidents:true,zones:true,corridors:true,buildings:true,weather:false,cameras:true,air:true,land:true,sea:true}},
    incident:{caseId:"INC-023",search:"",filter:"active",mapLayers:{assets:true,incidents:true,zones:true,corridors:true,buildings:true,weather:false,cameras:true,air:true,land:true,sea:true}},
    liveMap:{objectType:"asset",objectId:"UAV-017",region:"all",domain:"all",eventFilter:"all",timeline:84,frozen:false,mapLayers:{assets:true,incidents:true,zones:true,corridors:true,buildings:true,weather:true,cameras:true,air:true,land:true,sea:true}},
    fleet:{selectedId:"UAV-017",search:"",domain:"all",status:"all",tab:"condition",forecastDay:3,mapLayers:{assets:true,incidents:false,zones:false,corridors:false,buildings:true,weather:false,cameras:false,air:true,land:true,sea:true}},
    analytics:{range:"7d",domain:"all",region:"all",metric:"readiness",selected:"readiness"},
    security:{caseId:"SEC-219",filter:"all",tab:"overview"},
    missions:{id:"MSN-2609",filter:"all",mapLayers:{assets:true,incidents:true,zones:true,corridors:true,buildings:true,weather:false,cameras:true,air:true,land:true,sea:true}},
    reports:{id:"RPT-EX-001",category:"all",period:"7d",region:"all"},
    settings:{tab:"general",dirty:false,values:{telemetry:true,arabic:true,highRisk:true,sovereign:true,autoArchive:true}},
    commandMapLayers:null,
    pendingApprovals:[{id:"APR-1842",assetId:"MV-003",action:"Emergency route override",reason:"Restricted maritime corridor congestion",submittedBy:"Khalid Al Mazrouei",approver:"NAT-CMD",status:"pending",time:"20:42:18"}],
    audit:[
      {time:"20:45:12",actor:"System",event:"Session initialized",result:"Allowed"},
      {time:"20:44:58",actor:"AI Orchestrator",event:"INC-019 evidence linked",result:"Recorded"},
      {time:"20:43:20",actor:"Incident Manager",event:"UAV-017 assigned",result:"Approved"},
      {time:"20:41:06",actor:"Security Service",event:"Role policy synchronized",result:"Passed"}
    ]
  };
  if(!D.users.some(u=>u.id===state.userId)) state.userId="aisha";
  const user=()=>D.users.find(u=>u.id===state.userId)||D.users[0];
  if(!["command","live-map","drone-ops","robotics","maritime","mobility","ai","incidents","fleet","digital-twin","analytics","security","missions","reports","settings"].includes(state.module)||!user().nav.includes(state.module))state.module="command";
  const t=(key)=>D.T[state.lang][key]||D.T.en[key]||key;
  const local=(obj)=>obj&&typeof obj==="object"?(obj[state.lang]||obj.en):obj;
  const has=(permission)=>user().permissions.includes(permission);
  const domainLabel=(type)=>t(type==="drone"?"air":type==="marine"?"sea":type==="robot"?"robots":"land");
  const statusText=(s)=>t({active:"active",inMission:"inMission",standby:"standby",maintenance:"maintenance",offline:"offline"}[s]||s);
  const locationText=(a)=>state.lang==="ar"?(a.locationAr||a.location):a.location;
  const missionText=(m)=>{
    const ar={"Infrastructure inspection":"فحص البنية التحتية","Route monitoring":"مراقبة المسار","Perimeter surveillance":"مراقبة المحيط","Thermal survey":"مسح حراري","Facility inspection":"فحص المنشأة","Security patrol":"دورية أمنية","Hazard sampling":"أخذ عينات خطرة","Equipment delivery":"توصيل المعدات","Port surveillance":"مراقبة الميناء","Marine inspection":"فحص بحري","Coastal patrol":"دورية ساحلية","Water quality survey":"مسح جودة المياه","Passenger shuttle":"نقل الركاب","Emergency logistics":"إمداد الطوارئ","Road inspection":"فحص الطرق"};
    return state.lang==="ar"?(ar[m]||m):m;
  };
  document.body.classList.toggle("presentation-mode",presentationMode);
  document.body.dataset.version=D.version;
  const domainFeeds={
    drone:{icon:"drone",image:"assets/images/feeds/air-isr-yas.jpg",title:"airIsrFeed",location:"Yas Island · Abu Dhabi",metric:"94%",metricLabel:"confidence"},
    vehicle:{icon:"car",image:"assets/images/feeds/land-ugv-substation.jpg",title:"landMobilityFeed",location:"Abu Dhabi utility corridor",metric:"11 ms",metricLabel:"networkLatency"},
    marine:{icon:"ship",image:"assets/images/feeds/sea-usv-khalifa-port.jpg",title:"maritimePatrolFeed",location:"Khalifa Port · Abu Dhabi",metric:"8.4 nm",metricLabel:"missionRange"},
    robot:{icon:"bot",image:"assets/images/feeds/land-ugv-substation.jpg",title:"robotInspectionFeed",location:"Critical infrastructure zone",metric:"97%",metricLabel:"sensorHealth"}
  };
  const feedForType=(type)=>domainFeeds[type]||domainFeeds.vehicle;
  const regionAllowed=(region)=>user().regions==="all"||user().regions.includes(region);
  const domainAllowed=(domain)=>user().domains==="all"||user().domains.includes(domain);
  function scopedAssets(){
    let rows=D.assets.filter(a=>regionAllowed(a.region)&&domainAllowed(a.type));
    if(user().authority==="assigned") rows=rows.filter(a=>user().assigned.includes(a.id));
    return rows;
  }
  function visibleAssets(){
    let rows=scopedAssets();
    if(state.search){const q=state.search.toLowerCase();rows=rows.filter(a=>(a.id+" "+a.location+" "+a.model+" "+a.mission).toLowerCase().includes(q))}
    return rows;
  }
  function visibleIncidents(){
    let rows=D.incidents.filter(i=>regionAllowed(i.region)&&domainAllowed(i.domain));
    if(user().authority==="assigned") rows=rows.filter(i=>i.affected.some(id=>user().assigned.includes(id)));
    if(state.search){const q=state.search.toLowerCase();rows=rows.filter(i=>(i.id+" "+local(i.title)+" "+local(i.location)).toLowerCase().includes(q))}
    return rows;
  }
  function selectedAsset(){return visibleAssets().find(a=>a.id===state.selectedAssetId)||visibleAssets()[0]||null}
  function logAudit(event,result="Allowed"){
    const d=new Date();state.audit.unshift({time:d.toISOString().slice(11,19),actor:local(user().name),event,result});
    state.audit=state.audit.slice(0,30);
  }

  function applyLanguage(){
    document.documentElement.lang=state.lang;document.documentElement.dir=state.lang==="ar"?"rtl":"ltr";
    $$('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
    $$('[data-i18n-placeholder]').forEach(el=>el.placeholder=t(el.dataset.i18nPlaceholder));
    $$('[data-i18n-title]').forEach(el=>el.title=t(el.dataset.i18nTitle));
    $$('[data-i18n-aria-label]').forEach(el=>el.setAttribute('aria-label',t(el.dataset.i18nAriaLabel)));
    $("#langBtn").textContent=state.lang==="en"?"عربي":"EN";
    $("#scenarioLabel").textContent=t("scenarioName");
    document.title=state.lang==="ar"?"مركز القيادة الإماراتي للأنظمة الذاتية — عرض تجريبي":"UAE Autonomous Command Center — Demo";
    updateFullscreenControl(isMapFullscreen());
  }
  function applyTheme(){
    document.body.dataset.theme=state.theme;
    $("#themeBtn use").setAttribute("href",state.theme==="dark"?"#i-sun":"#i-moon");
  }
  function applyFontSize(){
    if(!["small","medium","large"].includes(state.fontSize))state.fontSize="large";
    document.body.dataset.fontSize=state.fontSize;
    $$("[data-font-size]").forEach(button=>{const active=button.dataset.fontSize===state.fontSize;button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active))});
  }
  function renderHealth(){
    $("#healthStrip").innerHTML=D.systems.map(s=>`<div class="health-item"><i></i><span><small>${esc(local(s.label))}</small><b>${esc(local(s.value))}</b></span></div>`).join("");
  }
  function renderNav(){
    const u=user();$("#moduleNav").innerHTML=D.nav.map(n=>{const allowed=u.nav.includes(n.id);return `<button type="button" class="${n.id===state.module?"active":""} ${allowed?"":"locked"}" data-module="${n.id}" aria-disabled="${!allowed}">${icon(n.icon)}<span>${esc(local(n.label))}</span></button>`}).join("");
  }
  function describeScope(u=user()){
    const domains=u.domains==="all"?t("allDomains"):u.domains.map(domainLabel).join(" · ");
    const regions=u.regions==="all"?t("allEmirates"):u.regions.map(r=>state.lang==="ar"?(D.locations.find(l=>l.name===r)?.ar||r):r).join(" · ");
    const authority={full:t("fullAuthority"),domain:t("commandAuthority"),incident:t("incidentCommand"),assigned:t("limitedScope"),read:t("readOnly"),audit:t("auditTrail")}[u.authority]||u.authority;
    return {domains,regions,authority};
  }
  function renderScope(){
    const u=user(),s=describeScope(u);
    $("#scopeBar").innerHTML=`<div class="scope-id">${icon("shield")}<b>${t("roleBasedView")}</b></div><span class="scope-tag">${t("clearance")}: <strong>${esc(u.clearance)}</strong></span><span class="scope-tag">${t("domains")}: <strong>${esc(s.domains)}</strong></span><span class="scope-tag">${t("regions")}: <strong>${esc(s.regions)}</strong></span><span class="scope-tag">${t("commandAuthority")}: <strong>${esc(s.authority)}</strong></span><span class="scope-note"><i></i>${t("filteredByRole")}</span>`;
  }
  function spark(points,color="currentColor"){
    const max=Math.max(...points),min=Math.min(...points),xy=points.map((v,i)=>`${i*40/(points.length-1)},${14-(v-min)/(max-min||1)*11}`).join(" ");
    return `<svg class="sparkline" viewBox="0 0 40 15"><polyline points="${xy}" style="color:${color}"/></svg>`;
  }
  function renderKpis(){
    const assets=visibleAssets(),inc=visibleIncidents();
    const by=(type)=>assets.filter(a=>a.type===type).length;
    const active=assets.filter(a=>["active","inMission"].includes(a.status)).length;
    const mission=assets.filter(a=>a.status==="inMission").length;
    const availability=assets.length?Math.round(100*assets.filter(a=>a.status!=="offline"&&a.status!=="maintenance").length/assets.length):0;
    const cards=[
      ["totalAssets",assets.length,"", "fleet","+5%",[39,42,41,46,44,50,53]],
      ["activeMissions",mission,"", "target","+12%",[10,13,12,15,14,16,18]],
      ["activeDrones",by("drone"),"", "drone","+11%",[12,14,15,13,17,18,20]],
      ["activeRobots",by("robot"),"", "bot","+7%",[9,10,11,11,13,14,15]],
      ["marineAssets",by("marine"),"", "ship","0%",[8,8,8,8,8,8,8]],
      ["autonomousVehicles",by("vehicle"),"", "car","+11%",[7,8,9,8,9,9,10]],
      ["activeIncidents",inc.length,"", "alert","-50%",[7,5,6,4,5,3,3],"alert-kpi"],
      ["aiAlerts",Math.max(1,Math.min(D.aiAlerts.length*2,Math.ceil(assets.length/7))),"", "brain","+40%",[3,5,4,6,5,7,7]],
      ["avgResponse",assets.length?4.2:0,t("minutes"), "route","-22%",[6.4,5.8,5.4,4.8,4.9,4.5,4.2]],
      ["fleetAvailability",availability,"%", "check","+3%",[87,89,88,90,91,91,92]]
    ];
    $("#kpiStrip").innerHTML=cards.map((c,i)=>`<article class="kpi-card ${c[7]||""}" data-kpi="${i}" tabindex="0"><div class="kpi-top">${icon(c[3])}<span>${t(c[0])}</span></div><div class="kpi-value"><b data-count="${c[1]}">0</b><span>${c[2]}</span></div><div class="kpi-foot"><span>${c[4]}</span>${spark(c[5])}</div></article>`).join("");
    requestAnimationFrame(animateMetricCounts);
  }
  function animateMetricCounts(){
    const duration=720,start=performance.now();
    $$('[data-count]').forEach(el=>{const target=Number(el.dataset.count),decimals=String(target).includes('.')?1:0;const step=now=>{const p=Math.min(1,(now-start)/duration),eased=1-Math.pow(1-p,3);el.textContent=(target*eased).toFixed(decimals);if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)});
  }
  function renderIncidents(){
    const rows=visibleIncidents();
    $("#incidentList").innerHTML=rows.length?rows.map(i=>`<article class="incident-row ${state.selectedIncidentId===i.id?"selected":""}" data-incident="${i.id}" tabindex="0"><i class="severity-rail ${i.severity}"></i><span class="incident-domain ${i.domain}">${icon(feedForType(i.domain).icon)}</span><div class="incident-main"><div class="incident-id-line"><b>${i.id}</b><span class="severity-badge ${i.severity}">${t(i.severity)}</span></div><p>${user().visibility==="aggregated"?t("restrictedData"):esc(local(i.title))}</p><small>${esc(local(i.location))}</small></div><span class="incident-age">${i.age} ${t("minutes")}</span></article>`).join(""):`<div class="empty-state"><div>${icon("check")}<span>${t("noResults")}</span></div></div>`;
    const alerts=D.aiAlerts.slice(0,user().authority==="assigned"?2:4);
    $("#aiAlertList").innerHTML=alerts.map(a=>`<div class="ai-alert-row"><time>${a.time}</time><i class="${a.severity}"></i><span><b>${esc(local(a.title))}</b><small>${esc(local(a.place))}</small></span><em class="confidence">${a.confidence}%</em></div>`).join("");
  }
  function assetFields(a){
    const operator=has("operatorIdentity")?a.operator:t("confidential");
    const location=user().visibility==="aggregated"?a.region:user().visibility==="masked"?`${a.region} · ${t("approximateLocation")}`:locationText(a);
    return `
      <div class="asset-field">${icon("pin")}<span>${t("location")}</span><b>${esc(location)}</b></div>
      <div class="asset-field">${icon("fleet")}<span>${t("battery")}</span><b class="battery-bar">${a.battery}%<i style="--value:${a.battery}%"></i></b></div>
      <div class="asset-field">${icon("route")}<span>${t("speed")}</span><b>${a.speed} km/h</b></div>
      ${a.type==="drone"?`<div class="asset-field">${icon("twin")}<span>${t("altitude")}</span><b>${a.altitude} m</b></div>`:""}
      <div class="asset-field">${icon("target")}<span>${t("mission")}</span><b>${esc(missionText(a.mission))}</b></div>
      <div class="asset-field">${icon("user")}<span>${t("operator")}</span><b>${esc(operator)}</b></div>
      <div class="asset-field">${icon("network")}<span>${t("connectivity")}</span><b style="color:var(--green)">${t("online")}</b></div>`;
  }
  function renderSelectedAsset(){
    const a=selectedAsset(),panel=$("#selectedAssetPanel");
    if(!a){panel.innerHTML=`<div class="section-minihead"><h2>${t("selectedAsset")}</h2></div><div class="empty-state">${t("noResults")}</div>`;return}
    state.selectedAssetId=a.id;
    if(user().visibility==="aggregated"){
      panel.innerHTML=`<div class="section-minihead"><h2>${t("selectedAsset")}</h2><span class="status-badge">${t("aggregated")}</span></div><div class="asset-summary"><div class="asset-visual">${icon("fleet")}</div><div><h3>${visibleAssets().length} ${t("mappedAssets")}</h3><p>${t("filteredByRole")}</p><span class="status-badge">${t("readOnly")}</span></div></div><div class="asset-fields"><div class="asset-field">${icon("shield")}<span>${t("dataVisibility")}</span><b>${t("aggregated")}</b></div><div class="asset-field">${icon("map")}<span>${t("regions")}</span><b>${t("allEmirates")}</b></div><div class="asset-field">${icon("check")}<span>${t("fleetAvailability")}</span><b>92%</b></div></div>`;return;
    }
    const feed=feedForType(a.type);
    panel.innerHTML=`<div class="section-minihead"><h2>${t("selectedAsset")}</h2><span class="status-badge">${t("demoData")}</span></div><div class="asset-summary"><div class="asset-visual rich domain-${a.type}"><img src="${feed.image}" alt="" decoding="async"><span>${icon(a.icon)}</span><i></i></div><div><h3>${a.id}</h3><p>${esc(a.model)}<br>${esc(missionText(a.mission))}</p><span class="status-badge">${statusText(a.status)}</span></div></div><div class="asset-fields">${assetFields(a)}</div><div class="asset-actions"><button data-asset-action="follow">${icon("pin")}<span>${t("follow")}</span></button><button data-asset-action="view">${icon("eye")}<span>${t("view")}</span></button><button class="${has("changeMission")?"":"disabled"}" data-asset-action="command">${icon("target")}<span>${t("command")}</span></button><button data-asset-action="more">${icon("settings")}<span>${t("more")}</span></button></div>`;
  }
  function renderMission(){
    const a=selectedAsset(),p=$("#missionPanel");
    if(!a||user().visibility==="aggregated"){p.innerHTML=`<div class="section-minihead"><h2>${t("missionProgress")}</h2></div><div class="mission-body"><div class="mission-line"><span>${t("activeMissions")}</span><b>${visibleAssets().filter(x=>x.status==="inMission").length}</b></div><div class="progress-track"><i style="--progress:78%"></i></div></div>`;return}
    const labels=["created","enRoute","onSite","analysis","complete"],stage=Math.min(4,Math.floor(a.missionProgress/20));
    p.innerHTML=`<div class="section-minihead"><h2>${t("missionProgress")}</h2><b>${a.missionProgress}%</b></div><div class="mission-body"><div class="mission-line"><span>${esc(missionText(a.mission))}</span><b>${a.missionProgress}%</b></div><div class="progress-track"><i style="--progress:${a.missionProgress}%"></i></div><div class="mission-stages">${labels.map((l,i)=>`<div class="mission-stage ${i<stage?"done":i===stage?"current":""}"><i></i>${t(l)}</div>`).join("")}</div></div>`;
  }
  function renderQuickActions(){
    const a=selectedAsset(),actions=[["dispatch","route","dispatch"],["returnHome","home","return"],["hold","pause","hold"],["viewCamera","camera","camera"]];
    $("#quickActionsPanel").innerHTML=`<div class="section-minihead"><h2>${t("quickActions")}</h2>${a?`<small>${a.id}</small>`:""}</div><div class="quick-action-grid">${actions.map(x=>{const permission=x[2]==="camera"?"camera":x[2]==="dispatch"?"dispatch":"changeMission";return `<button class="${has(permission)&&a?"":"disabled"}" data-command="${x[2]}">${icon(x[1])}<span>${t(x[0])}</span></button>`}).join("")}</div>`;
  }
  function donutLegend(items){return `<div class="mini-legend">${items.map(x=>`<div><i style="background:${x[2]}"></i><span>${x[0]}</span><b>${x[1]}</b></div>`).join("")}</div>`}
  function renderAnalytics(){
    const assets=visibleAssets(),count=(type)=>assets.filter(a=>a.type===type).length,online=assets.filter(a=>!['offline','maintenance'].includes(a.status)).length,maint=assets.filter(a=>a.status==='maintenance').length,off=assets.filter(a=>a.status==='offline').length;
    const inc=visibleIncidents(),sev=(s)=>inc.filter(i=>i.severity===s).length;
    $("#analyticsStrip").innerHTML=`
      <article class="analytics-card" data-kpi="0"><div class="analytics-title"><h3>${t("fleetDistribution")}</h3><small>${assets.length} ${t("totalAssets")}</small></div><div class="donut-wrap"><div class="donut" style="--p:${assets.length?Math.round(count('drone')/assets.length*100):0};--c:var(--red)"><span><b>${assets.length}</b><small>${t("totalAssets")}</small></span></div>${donutLegend([[t("drones"),count('drone'),'var(--red)'],[t("robots"),count('robot'),'var(--amber)'],[t("vehicles"),count('vehicle'),'var(--green)'],[t("maritime"),count('marine'),'var(--cyan)']])}</div></article>
      <article class="analytics-card" data-kpi="9"><div class="analytics-title"><h3>${t("assetStatus")}</h3><small>${t("withinScope")}</small></div><div class="status-bars"><div class="status-col"><i style="--h:${assets.length?Math.round(online/assets.length*48):3}px"></i><b>${online}</b><br>${t("online")}</div><div class="status-col"><i style="--h:${Math.max(3,maint*8)}px"></i><b>${maint}</b><br>${t("maintenance")}</div><div class="status-col"><i style="--h:${Math.max(3,off*8)}px"></i><b>${off}</b><br>${t("offline")}</div></div></article>
      <article class="analytics-card" data-kpi="1"><div class="analytics-title"><h3>${t("missionVolume")}</h3><small>${t("lastSevenDays")}</small></div>${largeMiniChart()}</article>
      <article class="analytics-card" data-kpi="6"><div class="analytics-title"><h3>${t("incidentsSeverity")}</h3><small>${inc.length}</small></div><div class="donut-wrap"><div class="donut" style="--p:${inc.length?Math.round((sev('critical')+sev('high'))/inc.length*100):0};--c:var(--amber)"><span><b>${inc.length}</b><small>${t("incidents")}</small></span></div>${donutLegend([[t('critical'),sev('critical'),'var(--red)'],[t('high'),sev('high'),'#ff5c65'],[t('medium'),sev('medium'),'var(--amber)'],[t('low'),sev('low'),'var(--green)']])}</div></article>
      <article class="analytics-card" data-kpi="8"><div class="analytics-title"><h3>${t("systemStatus")}</h3><small>99.99%</small></div><div class="system-list">${D.systems.map(s=>`<div>${icon('check')}<span>${esc(local(s.label))}</span><b>${esc(local(s.value))}</b></div>`).join('')}<div>${icon('shield')}<span>${t('dataVisibility')}</span><b>${esc(user().clearance)}</b></div><div>${icon('audit')}<span>${t('auditTrail')}</span><b>${t('online')}</b></div></div></article>`;
  }
  function largeMiniChart(){return `<svg class="line-chart" viewBox="0 0 240 65" preserveAspectRatio="none"><defs><linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#21d4f4"/><stop offset="1" stop-color="#21d4f4" stop-opacity="0"/></linearGradient></defs><g class="grid"><line x1="0" y1="15" x2="240" y2="15"/><line x1="0" y1="35" x2="240" y2="35"/><line x1="0" y1="55" x2="240" y2="55"/></g><path class="area" d="M2 54 L40 39 L79 45 L119 22 L158 44 L199 19 L238 8 L238 63 L2 63Z"/><polyline class="series" points="2,54 40,39 79,45 119,22 158,44 199,19 238,8"/>${[[2,54],[40,39],[79,45],[119,22],[158,44],[199,19],[238,8]].map(p=>`<circle class="dot" cx="${p[0]}" cy="${p[1]}" r="3"/>`).join('')}</svg>`}

  const world=(lat,lon,z)=>{const s=256*Math.pow(2,z),x=(lon+180)/360*s,rad=lat*Math.PI/180,y=(1-Math.log(Math.tan(rad)+1/Math.cos(rad))/Math.PI)/2*s;return{x,y}};
  const unworld=(x,y,z)=>{const s=256*Math.pow(2,z),lon=x/s*360-180,n=Math.PI-2*Math.PI*y/s,lat=180/Math.PI*Math.atan(.5*(Math.exp(n)-Math.exp(-n)));return{lat,lon}};
  function project(lat,lon){
    const vp=$("#mapViewport"),w=vp.clientWidth||700,h=vp.clientHeight||400,z=state.map.zoom,c=world(state.map.lat,state.map.lon,z),p=world(lat,lon,z);
    return{x:w/2+p.x-c.x,y:h/2+p.y-c.y};
  }
  const mapPath=(points,close=false)=>points.map((v,i)=>{const p=project(v[1],v[0]);return`${i?'L':'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`}).join(' ')+(close?' Z':'');
  const mapCentroid=(points)=>{const sum=points.reduce((a,p)=>[a[0]+p[0],a[1]+p[1]],[0,0]);return project(sum[1]/points.length,sum[0]/points.length)};
  function applyMapCamera(){
    const vp=$("#mapViewport"),is3d=state.mapMode==='3d',pitch=is3d?state.map.pitch:0,bearing=is3d?state.map.bearing:0;
    vp.style.setProperty('--camera-pitch',pitch+'deg');vp.style.setProperty('--camera-bearing',bearing+'deg');vp.style.setProperty('--camera-pitch-inverse',(-pitch)+'deg');vp.style.setProperty('--camera-bearing-inverse',(-bearing)+'deg');vp.style.setProperty('--compass-bearing',(-bearing)+'deg');vp.style.setProperty('--camera-scale',is3d?'1.24':'1');
    $("#mapCameraReadout").textContent=`${t('pitch')} ${Math.round(pitch)}° · ${t('bearing')} ${Math.round((bearing+360)%360)}°`;
    $("#mapGestureHint").textContent=t(is3d?'orbitHint':'panHint');
  }
  function renderMapModes(){
    $("#mapModes").innerHTML=[["tactical","mode2d"],["satellite","satellite"],["terrain","terrain"],["3d","mode3d"]].map(x=>`<button type="button" class="${state.mapMode===x[0]?"active":""}" data-map-mode="${x[0]}">${t(x[1])}</button>`).join("");
    $("#mapViewport").dataset.mapMode=state.mapMode;
    applyMapCamera();
  }
  function renderLocalMap(){
    const vp=$("#mapViewport"),svg=$("#localVectorMap"),layer=$("#localMapBase"),w=vp.clientWidth||700,h=vp.clientHeight||400;if(!MAP||!svg||!layer)return;
    svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
    const country=mapPath(MAP.boundary,true),inside=(p)=>p.x>-120&&p.x<w+120&&p.y>-120&&p.y<h+120;
    let html=`<path class="local-country-glow" d="${country}"/><path class="local-country" d="${country}"/><path class="local-country-texture" d="${country}"/>`;
    MAP.islands.forEach(i=>{const c=project(i.center[1],i.center[0]),x=project(i.center[1],i.center[0]+i.rx),y=project(i.center[1]+i.ry,i.center[0]);if(inside(c))html+=`<ellipse class="local-island" cx="${c.x}" cy="${c.y}" rx="${Math.abs(x.x-c.x)}" ry="${Math.abs(y.y-c.y)}"/>`});
    MAP.operationalSectors.forEach(s=>{const c=mapCentroid(s.points);html+=`<path class="local-sector" d="${mapPath(s.points,true)}"/>${inside(c)?`<text class="local-sector-label" x="${c.x}" y="${c.y}">${esc(local(s.label))}</text>`:''}`});
    MAP.primaryRoads.forEach(r=>{const d=mapPath(r.points),m=project(r.points[Math.floor(r.points.length/2)][1],r.points[Math.floor(r.points.length/2)][0]);html+=`<path class="local-road-halo" d="${d}"/><path class="local-road" d="${d}"/>${inside(m)?`<text class="local-road-label" x="${m.x+4}" y="${m.y-4}">${r.id}</text>`:''}`});
    MAP.secondaryRoads.forEach(r=>html+=`<path class="local-road-secondary" d="${mapPath(r)}"/>`);
    MAP.seaLanes.forEach(r=>html+=`<path class="local-sea-lane" d="${mapPath(r)}"/>`);
    MAP.mountainRidges.forEach(r=>html+=`<path class="local-ridge" d="${mapPath(r)}"/>`);
    MAP.hubs.forEach(hub=>{const p=project(hub.lat,hub.lon);if(inside(p))html+=`<circle class="local-hub-ring" cx="${p.x}" cy="${p.y}" r="12"/><circle class="local-hub-ring" cx="${p.x}" cy="${p.y}" r="22"/><circle class="local-hub-core" cx="${p.x}" cy="${p.y}" r="2.4"/>`});
    const gulf=project(25.55,53.45),oman=project(23.75,56.20);if(inside(gulf))html+=`<text class="local-water-label" x="${gulf.x}" y="${gulf.y}">${state.lang==='ar'?'الخليج العربي':'ARABIAN GULF'}</text>`;if(inside(oman))html+=`<text class="local-water-label" x="${oman.x}" y="${oman.y}">${state.lang==='ar'?'بحر عُمان':'GULF OF OMAN'}</text>`;
    layer.innerHTML=html;$("#tileLayer").innerHTML='';$("#mapAttribution").textContent=`${t('localCartography')} · Natural Earth`;
  }
  function displayPoint(a,index=0){
    if(user().visibility==="exact")return{lat:a.lat+Math.sin(state.scenarioSecond/11+index)*.003,lon:a.lon+Math.cos(state.scenarioSecond/13+index)*.003};
    if(user().visibility==="masked")return{lat:Math.round(a.lat*20)/20,lon:Math.round(a.lon*20)/20};
    return{lat:Math.round(a.lat*4)/4,lon:Math.round(a.lon*4)/4};
  }
  function layerDomainAllowed(type){return type==="drone"?state.map.layers.air:type==="marine"?state.map.layers.sea:state.map.layers.land}
  const mapSeed=(n)=>((n*9301+49297)%233280)/233280;
  function buildingPrism(p,width,depth,height,tone,index){
    return `<span class="map-building ${tone||''}" style="left:${p.x.toFixed(1)}px;top:${p.y.toFixed(1)}px;--bw:${width.toFixed(1)}px;--bd:${depth.toFixed(1)}px;--bh:${height.toFixed(1)}px;--delay:${Math.min(index*4,520)}ms"><i class="south"></i><i class="east"></i><i class="roof"></i></span>`;
  }
  function renderBuildings(w,h){
    if(!state.map.layers.buildings||!MAP)return'';let html='',index=0;
    MAP.hubs.forEach((hub,hubIndex)=>{const density=state.map.zoom<7.5?.62:state.map.zoom<8.5?.82:1,count=Math.round(hub.count*density);for(let i=0;i<count;i++){index++;const angle=mapSeed(index+hubIndex*101)*Math.PI*2,radius=Math.sqrt(mapSeed(index+77))*hub.radius,lat=hub.lat+Math.sin(angle)*radius,lon=hub.lon+Math.cos(angle)*radius/Math.max(.55,Math.cos(hub.lat*Math.PI/180)),p=project(lat,lon);if(p.x<-35||p.x>w+35||p.y<-35||p.y>h+35)continue;const width=3.5+mapSeed(index+18)*5.2,depth=3.4+mapSeed(index+28)*4.8,height=(7+mapSeed(index+38)*25)*hub.height;html+=buildingPrism(p,width,depth,height,hub.color==='amber'?'terrain-building':'',index)}});
    MAP.landmarks.forEach(l=>{const p=project(l.lat,l.lon);if(p.x>-45&&p.x<w+45&&p.y>-45&&p.y<h+45)html+=buildingPrism(p,l.width,l.depth,l.height,l.tone,index++)});return html;
  }
  function renderMapOverlays(){
    const marker=$("#markerLayer"),zones=$("#zoneLayer"),routes=$("#routeLayer"),buildings=$("#buildingLayer"),all=visibleAssets(),assets=state.module==="live-map"?all.filter(a=>(state.liveMap.region==="all"||a.region===state.liveMap.region)&&(state.liveMap.domain==="all"||a.type===state.liveMap.domain)):state.module==="fleet"?all.filter(a=>(state.fleet.domain==="all"||a.type===state.fleet.domain)&&(state.fleet.status==="all"||state.fleet.status==="available"&&["active","standby"].includes(a.status)||state.fleet.status==="attention"&&["maintenance","offline"].includes(a.status)||a.status===state.fleet.status)):state.module==="missions"?all.filter(a=>(missionOps?.selected()?.assets||[]).includes(a.id)):state.module==="drone-ops"?all.filter(a=>a.type==="drone"):state.module==="robotics"?all.filter(a=>a.type==="robot"):state.module==="maritime"?all.filter(a=>a.type==="marine"):state.module==="mobility"?all.filter(a=>a.type==="vehicle"):all,incidents=state.module==="live-map"?visibleIncidents().filter(i=>(state.liveMap.region==="all"||i.region===state.liveMap.region)&&(state.liveMap.domain==="all"||i.domain===state.liveMap.domain)):state.module==="fleet"||state.module==="missions"?[]:state.module==="robotics"?visibleIncidents().filter(i=>i.domain==="robot"):state.module==="maritime"?visibleIncidents().filter(i=>i.domain==="marine"):state.module==="mobility"?visibleIncidents().filter(i=>i.domain==="vehicle"):visibleIncidents();
    if(window.ACC_ARCGIS_MAP&&window.ACC_ARCGIS_MAP.isActive()){
      marker.innerHTML="";zones.innerHTML="";routes.innerHTML="";buildings.innerHTML="";
      const twinMode=state.module==="digital-twin",twinAllowed=twinMode?D.twinFacilities.filter(f=>user().regions==="all"||user().regions.includes(f.region)):[],twinFacilities=user().visibility==="exact"?twinAllowed:user().visibility==="masked"?twinAllowed.map((f,index)=>{const d=D.twinDistricts.find(x=>x.id===f.district);return{...f,lat:(d?.lat||f.lat)+((index%3)-1)*.007,lon:(d?.lon||f.lon)+((index%4)-1.5)*.006}}):[],twinIds=new Set(twinFacilities.map(f=>f.id)),twinSensors=twinMode?D.twinSensors.filter(s=>twinIds.has(s.facility)).map((s,index)=>{if(user().visibility==="exact")return s;const f=twinFacilities.find(x=>x.id===s.facility);return{...s,lat:(f?.lat||s.lat)+((index%3)-1)*.0025,lon:(f?.lon||s.lon)+((index%2)-.5)*.003}}):[],twinLinks=twinMode?D.twinLinks.filter(x=>twinIds.has(x.from)&&twinIds.has(x.to)):[];
      window.ACC_ARCGIS_MAP.sync({
        assets,incidents,
        noFlyZones:(state.module==="drone-ops"||state.module==="live-map"&&["all","drone"].includes(state.liveMap.domain))?D.droneNoFlyZones:[],bases:(state.module==="drone-ops"||state.module==="live-map"&&["all","drone"].includes(state.liveMap.domain))?D.droneBases:[],robotZones:(state.module==="robotics"||state.module==="live-map"&&["all","robot"].includes(state.liveMap.domain))?D.robotZones:[],robotBases:(state.module==="robotics"||state.module==="live-map"&&["all","robot"].includes(state.liveMap.domain))?D.robotBases:[],
        maritimeZones:(state.module==="maritime"||state.module==="live-map"&&["all","marine"].includes(state.liveMap.domain))?D.maritimeZones:[],maritimePorts:(state.module==="maritime"||state.module==="live-map"&&["all","marine"].includes(state.liveMap.domain))?D.maritimePorts:[],maritimeContacts:(state.module==="maritime"||state.module==="live-map"&&["all","marine"].includes(state.liveMap.domain))?D.maritimeContacts:[],
        mobilityZones:(state.module==="mobility"||state.module==="live-map"&&["all","vehicle"].includes(state.liveMap.domain))?D.mobilityZones:[],mobilityHubs:(state.module==="mobility"||state.module==="live-map"&&["all","vehicle"].includes(state.liveMap.domain))?D.mobilityHubs:[],mobilityNodes:(state.module==="mobility"||state.module==="live-map"&&["all","vehicle"].includes(state.liveMap.domain))?D.mobilityNodes:[],
        aiDetections:state.module==="ai"?D.aiDetections.filter(d=>assets.some(a=>a.id===d.assetId)):[],aiEdgeNodes:state.module==="ai"?D.aiEdgeNodes:[],
        incidentCases:state.module==="incidents"?D.incidentCases.filter(c=>incidents.some(i=>i.id===c.id)):[],incidentResources:state.module==="incidents"?D.incidentResources:[],
        twinFacilities,twinSensors,twinLinks,twinScenarios:twinMode&&user().visibility!=="aggregated"?D.twinScenarios:[],twinFocus:twinMode?state.twin?.focus:null,twinScenarioActive:!!state.twin?.scenarioActive,selectedTwinFacilityId:state.twin?.facilityId,selectedTwinSensorId:state.twin?.sensorId,selectedTwinScenarioId:state.twin?.scenarioId,
        weatherStations:state.module==="drone-ops"?D.droneWeatherStations:state.module==="maritime"?D.maritimeWeather:state.module==="live-map"?[...D.droneWeatherStations,...D.maritimeWeather]:[],
        liveMapMode:state.module==="live-map",fleetMode:state.module==="fleet",missionMode:state.module==="missions",droneMode:state.module==="drone-ops",robotMode:state.module==="robotics",maritimeMode:state.module==="maritime",mobilityMode:state.module==="mobility",aiMode:state.module==="ai",incidentMode:state.module==="incidents",twinMode,
        visibility:user().visibility,selectedAssetId:state.selectedAssetId,selectedIncidentId:state.selectedIncidentId,selectedDetectionId:state.ai.detectionId,selectedCaseId:state.incident.caseId,scenarioSecond:state.scenarioSecond,layers:state.map.layers,cartography:state.map.cartography,lang:state.lang
      });
      $("#mapLegend").innerHTML=mapLegendHtml();
      return;
    }
    const vp=$("#mapViewport"),w=vp.clientWidth||700,h=vp.clientHeight||400;routes.setAttribute("viewBox",`0 0 ${w} ${h}`);
    let mh="";
    const cityNames=["Abu Dhabi","Dubai","Al Ain","Fujairah","Ras Al Khaimah"];
    D.locations.filter(l=>cityNames.includes(l.name)).forEach(l=>{const p=project(l.lat,l.lon);if(p.x>-30&&p.x<w+30&&p.y>-20&&p.y<h+20)mh+=`<span class="city-label" style="left:${p.x}px;top:${p.y}px">${esc(state.lang==='ar'?l.ar:l.name)}</span>`});
    if(state.map.layers.assets){
      if(user().visibility==="aggregated"){
        const groups={};assets.forEach(a=>(groups[a.region]||(groups[a.region]=[])).push(a));Object.entries(groups).forEach(([region,list])=>{const lat=list.reduce((s,a)=>s+a.lat,0)/list.length,lon=list.reduce((s,a)=>s+a.lon,0)/list.length,p=project(lat,lon);mh+=`<button class="aggregate-marker" style="left:${p.x}px;top:${p.y}px" data-region="${esc(region)}"><b>${list.length}</b><small>${esc(region)}</small></button>`});
      }else assets.forEach((a,index)=>{if(!layerDomainAllowed(a.type))return;const pt=displayPoint(a,index),p=project(pt.lat,pt.lon);if(p.x<-35||p.x>w+35||p.y<-35||p.y>h+35)return;const heading=a.type==='drone'?a.heading:0;mh+=`<button type="button" class="asset-marker ${a.type} ${a.status} ${a.id===state.selectedAssetId?'selected':''}" data-asset-marker="${a.id}" style="left:${p.x}px;top:${p.y}px;--heading:${heading}deg;--heading-inverse:${-heading}deg;animation-delay:${Math.min(index*12,420)}ms">${icon(a.icon)}<span class="marker-label">${a.id} · ${esc(locationText(a))}</span></button>`});
      if(state.module==='maritime')D.maritimeContacts.forEach((a,index)=>{const p=project(a.lat,a.lon);if(p.x<-30||p.x>w+30||p.y<-30||p.y>h+30)return;mh+=`<button class="aggregate-marker maritime-contact-marker ${a.risk}" style="left:${p.x}px;top:${p.y}px" data-maritime-contact="${a.id}">${icon(a.mmsi==='—'?'alert':'ship')}<small>${a.id}</small></button>`});
      if(state.module==='mobility')D.mobilityNodes.forEach(a=>{const p=project(a.lat,a.lon);if(p.x<-30||p.x>w+30||p.y<-30||p.y>h+30)return;mh+=`<button class="aggregate-marker mobility-node-marker" style="left:${p.x}px;top:${p.y}px" data-mobility-node="${a.id}">${icon('network')}<small>${a.id}</small></button>`});
      if(state.module==='ai')D.aiDetections.filter(d=>assets.some(a=>a.id===d.assetId)).forEach(d=>{const p=project(d.lat,d.lon);if(p.x<-30||p.x>w+30||p.y<-30||p.y>h+30)return;mh+=`<button class="aggregate-marker ai-detection-map ${d.severity} ${d.id===state.ai.detectionId?'selected':''}" style="left:${p.x}px;top:${p.y}px" data-ai-detection="${d.id}">${icon('brain')}<small>${d.confidence}%</small></button>`});
      if(state.module==='incidents'){const s=D.incidents.find(i=>i.id===state.incident.caseId);if(s){const p=project(s.lat,s.lon);mh+=`<button class="aggregate-marker incident-post-map" style="left:${p.x}px;top:${p.y}px" data-incident-case="${s.id}">${icon('shield')}<small>ICP</small></button>`}}
      if(state.module==='digital-twin')D.twinFacilities.forEach((f,index)=>{if(user().regions!=="all"&&!user().regions.includes(f.region))return;const d=D.twinDistricts.find(x=>x.id===f.district),lat=user().visibility==="exact"?f.lat:(d?.lat||f.lat)+((index%3)-1)*.007,lon=user().visibility==="exact"?f.lon:(d?.lon||f.lon)+((index%4)-1.5)*.006,p=project(lat,lon);if(p.x<-30||p.x>w+30||p.y<-30||p.y>h+30)return;mh+=`<button class="aggregate-marker twin-facility-marker ${f.status}" style="left:${p.x}px;top:${p.y}px" data-twin-facility="${f.id}">${icon('twin')}<small>${f.id}</small></button>`});
    }
    if(state.map.layers.incidents) incidents.forEach(i=>{const p=project(i.lat,i.lon);mh+=`<button type="button" class="incident-marker" data-incident-marker="${i.id}" style="left:${p.x}px;top:${p.y}px" aria-label="${i.id}">${icon('alert')}</button>`});
    if(state.map.layers.weather){const weather=state.module==='drone-ops'?D.droneWeatherStations.map((x,i)=>[[24.4858,24.4992,25.1960,25.1280][i],[54.6048,54.3888,55.2740,56.3260][i],`${x.temperature}°C`,x.id]):state.module==='maritime'?D.maritimeWeather.map(x=>[x.lat,x.lon,`${x.temperature}°C`,x.id]):[[24.45,54.37,"32°C"],[25.2,55.27,"31°C"],[25.13,56.33,"29°C"]];weather.forEach(x=>{const p=project(x[0],x[1]);mh+=`<button class="aggregate-marker weather-marker" style="left:${p.x}px;top:${p.y}px" ${state.module==='drone-ops'?`data-drone-map-intel="weather"`:state.module==='maritime'?`data-maritime-open="environment"`:''}>${icon('sun')}<small>${x[2]}</small></button>`})}
    if(state.map.layers.cameras){if(state.module==='drone-ops')D.droneBases.forEach(b=>{const p=project(b.lat,b.lon);mh+=`<button class="asset-marker landing-pad-marker" style="left:${p.x}px;top:${p.y}px" data-drone-base="${b.id}"><b>H</b><span class="marker-label">${b.id}</span></button>`});else if(state.module==='robotics')D.robotBases.forEach(b=>{const p=project(b.lat,b.lon);mh+=`<button class="asset-marker robot-base-marker" style="left:${p.x}px;top:${p.y}px" data-robot-intel="bases">${icon('home')}<span class="marker-label">${b.id}</span></button>`});else if(state.module==='maritime')D.maritimePorts.forEach(b=>{const p=project(b.lat,b.lon);mh+=`<button class="asset-marker maritime-port-marker" style="left:${p.x}px;top:${p.y}px" data-maritime-port="${b.id}">${icon('home')}<span class="marker-label">${b.id}</span></button>`});else if(state.module==='mobility')D.mobilityHubs.forEach(b=>{const p=project(b.lat,b.lon);mh+=`<button class="asset-marker mobility-hub-marker" style="left:${p.x}px;top:${p.y}px" data-mobility-hub="${b.id}">${icon('home')}<span class="marker-label">${b.id}</span></button>`});else if(state.module==='ai')D.aiEdgeNodes.forEach(b=>{const p=project(b.lat,b.lon);mh+=`<button class="asset-marker ai-edge-map" style="left:${p.x}px;top:${p.y}px" data-ai-edge="${b.id}">${icon('brain')}<span class="marker-label">${b.id} · ${b.latency}ms</span></button>`});else D.locations.slice(0,6).forEach(l=>{const p=project(l.lat+.025,l.lon-.02);mh+=`<button class="asset-marker marine" style="left:${p.x}px;top:${p.y}px" data-camera-marker>${icon('camera')}</button>`})}
    if(state.module==='digital-twin'&&state.twin?.focus==='sensors')D.twinSensors.forEach((s,index)=>{const f=D.twinFacilities.find(x=>x.id===s.facility);if(!f||(user().regions!=="all"&&!user().regions.includes(f.region)))return;const d=D.twinDistricts.find(x=>x.id===f.district),lat=user().visibility==="exact"?s.lat:(d?.lat||s.lat)+((index%3)-1)*.004,lon=user().visibility==="exact"?s.lon:(d?.lon||s.lon)+((index%2)-.5)*.004,p=project(lat,lon);if(p.x<-25||p.x>w+25||p.y<-25||p.y>h+25)return;mh+=`<button class="aggregate-marker twin-sensor-marker ${s.status}" style="left:${p.x}px;top:${p.y}px" data-twin-sensor="${s.id}">${icon('target')}<small>${s.id}</small></button>`});
    marker.innerHTML=mh;
    const incidentZones=state.map.layers.zones?visibleIncidents().slice(0,3).map((i,n)=>{const p=project(i.lat,i.lon);return `<span class="zone" style="left:${p.x}px;top:${p.y}px;width:${70+n*18}px;height:${70+n*18}px"></span>`}).join(""):"";
    const liveDomain=state.module==="live-map",droneZones=(state.module==="drone-ops"||liveDomain)&&state.map.layers.zones?D.droneNoFlyZones.map(z=>{const p=project(z.lat,z.lon);return `<span class="zone no-fly-zone" style="left:${p.x}px;top:${p.y}px;width:${Math.max(48,z.radiusKm*25)}px;height:${Math.max(48,z.radiusKm*25)}px"><b>NFZ</b></span>`}).join(""):"";const robotZones=(state.module==="robotics"||liveDomain)&&state.map.layers.zones?D.robotZones.map(z=>{const p=project(z.lat,z.lon);return `<span class="zone robot-ground-zone" style="left:${p.x}px;top:${p.y}px;width:${Math.max(72,z.radiusKm*90)}px;height:${Math.max(72,z.radiusKm*90)}px"><b>${z.id}</b></span>`}).join(""):"";const maritimeZones=(state.module==="maritime"||liveDomain)&&state.map.layers.zones?D.maritimeZones.map(z=>{const p=project(z.lat,z.lon);return `<span class="zone maritime-zone-local ${z.severity}" style="left:${p.x}px;top:${p.y}px;width:${Math.max(64,z.radiusKm*72)}px;height:${Math.max(64,z.radiusKm*72)}px"><b>${z.id}</b></span>`}).join(""):"";const mobilityZones=(state.module==="mobility"||liveDomain)&&state.map.layers.zones?D.mobilityZones.map(z=>{const p=project(z.lat,z.lon);return `<span class="zone robot-ground-zone ${z.severity}" style="left:${p.x}px;top:${p.y}px;width:${Math.max(70,z.radiusKm*85)}px;height:${Math.max(70,z.radiusKm*85)}px"><b>${z.id}</b></span>`}).join(""):"";const aiZones=state.module==="ai"&&state.map.layers.zones?D.aiDetections.filter(d=>assets.some(a=>a.id===d.assetId)).map(d=>{const p=project(d.lat,d.lon),s=d.severity==='high'?110:d.severity==='medium'?82:62;return `<span class="zone ai-correlation-zone ${d.severity}" style="left:${p.x}px;top:${p.y}px;width:${s}px;height:${s}px"><b>${d.confidence}%</b></span>`}).join(""):"";const responseZones=state.module==="incidents"&&state.map.layers.zones?D.incidents.filter(i=>i.id===state.incident.caseId).map(i=>{const p=project(i.lat,i.lon);return `<span class="zone incident-response-zone" style="left:${p.x}px;top:${p.y}px;width:145px;height:145px"><b>${i.id}</b></span>`}).join(""):"";zones.innerHTML=incidentZones+droneZones+robotZones+maritimeZones+mobilityZones+aiZones+responseZones;
    if(state.module==='digital-twin'&&state.twin?.scenarioActive){const sc=D.twinScenarios.find(x=>x.id===state.twin.scenarioId);if(sc){const p=project(sc.lat,sc.lon),size=Math.max(110,sc.radiusKm*82);zones.insertAdjacentHTML('beforeend',`<span class="zone twin-impact-zone" style="left:${p.x}px;top:${p.y}px;width:${size}px;height:${size}px"><b>${sc.id} · SIM</b></span>`)}}
    let paths="";if(state.map.layers.corridors&&assets.length){const selectedCase=state.module==='incidents'?D.incidentCases.find(x=>x.id===state.incident.caseId):null,routeAssets=selectedCase?assets.filter(a=>selectedCase.responders.includes(a.id)):assets.filter((a,i)=>i%6===0&&layerDomainAllowed(a.type));routeAssets.slice(0,8).forEach((a,i)=>{const p=project(a.lat,a.lon),target=state.module==='incidents'?D.incidents.find(x=>x.id===state.incident.caseId):null,dest=target?project(target.lat,target.lon):project(24.48+(i%3)*.08,54.48+(i%4)*.17),cx=(p.x+dest.x)/2+(i%2?35:-35),cy=(p.y+dest.y)/2-35;paths+=`<path class="route-line ${state.module==='incidents'?'incident-responder-route':a.type==='marine'?'marine':''}" d="M${p.x},${p.y} Q${cx},${cy} ${dest.x},${dest.y}"/>`});visibleIncidents().slice(0,2).forEach(i=>{const p=project(i.lat,i.lon),c=project(24.45,54.37);paths+=`<path class="route-line incident" d="M${c.x},${c.y} Q${(c.x+p.x)/2},${Math.min(c.y,p.y)-45} ${p.x},${p.y}"/>`})}routes.innerHTML=paths;
    buildings.innerHTML=renderBuildings(w,h);
    $("#mapLegend").innerHTML=mapLegendHtml();
  }
  function mapLegendHtml(){const rows=state.module==="live-map"?[["drone","drone","air"],["vehicle","car","land"],["robot","bot","robots"],["marine","ship","sea"],["incident","alert","incidents"]]:state.module==="fleet"?[["drone","drone","drones"],["robot","bot","robots"],["vehicle","car","vehicles"],["marine","ship","maritime"]]:state.module==="drone-ops"?[["drone","drone","drones"],["incident","alert","noFlyZones"],["marine","route","flightCorridors"],["vehicle","pin","landingPads"]]:state.module==="robotics"?[["robot","bot","robots"],["vehicle","route","corridors"],["marine","shield","zones"],["incident","alert","incidents"]]:state.module==="maritime"?[["marine","ship","maritimeFleet"],["vehicle","route","shippingLanes"],["drone","network","aisContacts"],["incident","alert","incidents"],["robot","home","portsBases"]]:state.module==="mobility"?[["vehicle","car","vehicles"],["marine","route","roadNetwork"],["drone","network","intersections"],["robot","home","depots"],["incident","alert","incidents"]]:state.module==="ai"?[["drone","brain","aiDetectionsLabel"],["robot","network","edgeNodes"],["vehicle","fleet","totalAssets"],["incident","alert","incidents"]]:state.module==="incidents"?[["incident","alert","incidents"],["drone","fleet","respondingUnits"],["vehicle","target","responseZones"],["robot","shield","incidentPosts"]]:state.module==="digital-twin"?[["drone","twin","criticalSites"],["robot","network","utilityNetworks"],["vehicle","target","sensorMesh"],["incident","alert","scenarioZones"]]:[["drone","drone","drones"],["robot","bot","robots"],["vehicle","car","vehicles"],["marine","ship","maritime"],["incident","alert","incidents"]];return rows.map(x=>`<span class="legend-item"><i class="legend-symbol ${x[0]}">${icon(x[1])}</i>${t(x[2])}</span>`).join('')}
  function renderDomainFeeds(){
    const rail=$("#domainFeedRail");if(!isMapFullscreen()){rail.replaceChildren();return}
    rail.innerHTML=["drone","vehicle","marine","robot"].map(type=>{const f=domainFeeds[type];return `<button type="button" class="domain-feed ${type}" data-feed-domain="${type}"><img src="${f.image}" alt="" loading="lazy" decoding="async"><span class="feed-live"><i></i>${t('live')}</span><span class="feed-copy"><b>${icon(f.icon)}${t(f.title)}</b><small>${esc(f.location)}</small></span></button>`}).join('');
  }
  function updateLiveMarkerPositions(){
    if(window.ACC_ARCGIS_MAP&&window.ACC_ARCGIS_MAP.isActive()){renderMapOverlays();return}
    if(!state.map.layers.assets||user().visibility!=="exact")return;
    visibleAssets().forEach((a,index)=>{const el=document.querySelector(`[data-asset-marker="${a.id}"]`);if(!el)return;const p=displayPoint(a,index);const xy=project(p.lat,p.lon);el.style.left=xy.x+'px';el.style.top=xy.y+'px'});
  }
  function renderLayerPanel(){
    const ops=state.module==="drone-ops"?[["drones","drone","air"],["noFlyZones","alert","zones"],["flightCorridors","route","corridors"],["weather","sun","weather"],["landingPads","pin","cameras"]]:state.module==="robotics"?[["robots","bot","land"],["zones","shield","zones"],["corridors","route","corridors"],["incidents","alert","incidents"],["operationalBases","home","cameras"]]:state.module==="maritime"?[["maritimeFleet","ship","sea"],["navigationZones","shield","zones"],["shippingLanes","route","corridors"],["incidents","alert","incidents"],["weather","sun","weather"],["portsBases","home","cameras"]]:state.module==="mobility"?[["vehicles","car","land"],["mobilityZones","shield","zones"],["roadNetwork","route","corridors"],["incidents","alert","incidents"],["v2xNodes","network","cameras"],["buildings","twin","buildings"]]:state.module==="ai"?[["air","drone","air"],["land","car","land"],["sea","ship","sea"],["aiDetectionsLabel","brain","zones"],["corridors","route","corridors"],["incidents","alert","incidents"],["edgeNodes","network","cameras"]]:state.module==="incidents"?[["air","drone","air"],["land","car","land"],["sea","ship","sea"],["incidents","alert","incidents"],["responseZones","target","zones"],["respondingUnits","fleet","corridors"],["incidentPosts","shield","cameras"]]:[["air","drone","air"],["land","car","land"],["sea","ship","sea"],["incidents","alert","incidents"],["zones","target","zones"],["corridors","route","corridors"],["weather","sun","weather"],["cameras","camera","cameras"]];
    const scene=[["buildings","twin","buildings","layer"],["streetLabels","map","labels","setting"],["terrainElevation","layers","elevation","setting"],["sunShadows","sun","shadows","setting"]];
    const swatches=[["natural","naturalBuildings","linear-gradient(135deg,#78939e,#d9e2e4)"],["graphite","graphite","#243d49"],["cyan","commandCyan","#10aeca"],["amber","alertAmber","#d4902f"],["red","incidentRed","#c31c36"]];
    $("#mapLayerPanel").innerHTML=`
      <div class="layer-panel-head"><div><span>${t('mapConsole')}</span><b>${t('liveScene')}</b></div><button type="button" data-close-layers>×</button></div>
      <div class="layer-section-title">${t('operationalLayers')}</div>
      ${ops.map(r=>`<div class="layer-row">${icon(r[1])}<span>${t(r[0])}</span><button type="button" class="switch ${state.map.layers[r[2]]?'on':''}" data-layer="${r[2]}" aria-pressed="${state.map.layers[r[2]]}"></button></div>`).join('')}
      <div class="layer-section-title">${t('sceneLayers')}</div>
      ${scene.map(r=>{const on=r[3]==='layer'?state.map.layers[r[2]]:state.map.cartography[r[2]];return `<div class="layer-row">${icon(r[1])}<span>${t(r[0])}</span><button type="button" class="switch ${on?'on':''}" ${r[3]==='layer'?`data-layer="${r[2]}"`:`data-map-setting="${r[2]}"`} aria-pressed="${on}"></button></div>`}).join('')}
      <div class="asset-symbol-controls">
        <div class="layer-section-title">${t('assetSymbology')}</div>
        <div class="asset-style-switch">${[["auto","automatic"],["2d","silhouettes2d"],["3d","models3d"]].map(x=>`<button type="button" class="${state.map.cartography.assetStyle===x[0]?'active':''}" data-asset-style="${x[0]}">${t(x[1])}</button>`).join('')}</div>
        <p>${t('assetSymbologyNote')}</p>
      </div>
      <div class="render-quality-controls">
        <div class="layer-section-title">${t('renderingQuality')}</div>
        <div class="render-quality-switch">${[["balanced","balanced"],["high","highFidelity"]].map(x=>`<button type="button" class="${state.map.cartography.quality===x[0]?'active':''}" data-map-quality="${x[0]}">${t(x[1])}</button>`).join('')}</div>
        <p>${t('balancedRenderingNote')}</p>
      </div>
      <div class="building-controls ${state.map.layers.buildings?'':'disabled'}">
        <div class="layer-section-title">${t('buildingAppearance')}</div>
        <div class="building-swatches">${swatches.map(s=>`<button type="button" class="${state.map.cartography.buildingStyle===s[0]?'active':''}" data-building-style="${s[0]}" title="${t(s[1])}"><i style="background:${s[2]}"></i><span>${t(s[1])}</span></button>`).join('')}</div>
        <label class="opacity-control"><span>${t('buildingOpacity')} <b>${Math.round(state.map.cartography.buildingOpacity*100)}%</b></span><input type="range" min="12" max="100" value="${Math.round(state.map.cartography.buildingOpacity*100)}" data-building-opacity></label>
        <div class="opacity-scale"><span>${t('translucent')}</span><span>${t('solid')}</span></div>
      </div>`;
  }
  function renderMap(){renderMapModes();renderLayerPanel();renderDomainFeeds();if(!(window.ACC_ARCGIS_MAP&&window.ACC_ARCGIS_MAP.isActive()))renderLocalMap();renderMapOverlays()}

  function setMapEngineStatus(kind,message){
    const badge=$("#mapEngineBadge"),monitor=$("#mapLoadMonitor");if(!badge||!monitor)return;
    badge.className=`map-engine-badge ${kind}`;monitor.className=`map-load-monitor ${kind}`;
    const text=kind==='ready'?t('mapLive3d'):kind==='failed'?t('mapFallback'):(message||t('mapConnecting'));
    badge.querySelector('b').textContent=text;monitor.querySelector('span').textContent=text;
    if(kind==='ready')setTimeout(()=>monitor.classList.add('dismissed'),1800);
  }
  function initializeLiveMap(){
    if(!window.ACC_ARCGIS_MAP){setMapEngineStatus('failed');return}
    window.ACC_ARCGIS_MAP.init({
      onStatus:s=>{
        setMapEngineStatus(s.state,s.message);
        if(s.state==='ready'){
          $("#mapViewport").classList.add('arcgis-ready');
          window.ACC_ARCGIS_MAP.setMode(state.mapMode,false);
          renderMap();
        }
      },
      onFailure:error=>{
        $("#mapViewport").classList.remove('arcgis-ready');$("#mapViewport").classList.add('arcgis-failed');setMapEngineStatus('failed');
        toast(t('mapFallback'),error&&error.message?error.message:t('mapUnavailable'),'amber');renderMap();
      },
      onAsset:id=>state.module==="live-map"&&liveMapOps?liveMapOps.chooseAsset(id,false):state.module==="fleet"&&fleetOps?fleetOps.choose(id,false):state.module==="drone-ops"&&droneOps?droneOps.choose(id,false):state.module==="robotics"&&roboticsOps?roboticsOps.choose(id,false):state.module==="maritime"&&maritimeOps?maritimeOps.choose(id,false):state.module==="mobility"&&mobilityOps?mobilityOps.choose(id,false):state.module==="ai"&&aiOps?(D.aiDetections.find(d=>d.assetId===id)?aiOps.chooseDetection(D.aiDetections.find(d=>d.assetId===id).id,false):openAsset(id)):state.module==="incidents"&&incidentOps?(D.incidentCases.find(x=>x.responders.includes(id))?incidentOps.choose(D.incidentCases.find(x=>x.responders.includes(id)).id,false):openAsset(id)):openAsset(id),onIncident:id=>state.module==="incidents"&&incidentOps?incidentOps.choose(id,false):openIncident(id),onRegion:region=>{if(state.module==="live-map")liveMapOps?.chooseSector(D.liveMapSectors.find(x=>x.region===region)?.id||D.liveMapSectors[0].id,false);else{state.search=region;renderAll()}},
      onMapContext:item=>state.module==="live-map"?liveMapOps?.openMapContext(item):state.module==="fleet"?fleetOps?.openMapContext(item):state.module==="drone-ops"?droneOps?.openMapContext(item):state.module==="robotics"?roboticsOps?.openMapContext(item):state.module==="maritime"?maritimeOps?.openMapContext(item):state.module==="mobility"?mobilityOps?.openMapContext(item):state.module==="ai"?aiOps?.openMapContext(item):state.module==="incidents"?incidentOps?.openMapContext(item):state.module==="digital-twin"?twinOps?.openMapContext(item):null,
      onCamera:c=>{
        state.map.pitch=c.pitch;state.map.bearing=c.bearing;if(Number.isFinite(c.lat))state.map.lat=c.lat;if(Number.isFinite(c.lon))state.map.lon=c.lon;
        $("#mapCameraReadout").textContent=`${t('pitch')} ${c.pitch}° · ${t('bearing')} ${c.bearing}° · Z ${c.zoom}`;
        const orbit=$("[data-map-camera='orbit']");if(orbit)orbit.classList.toggle('active',!!c.orbiting);
        $("#mapViewport").style.setProperty('--compass-bearing',(-c.bearing)+'deg');
      }
    });
  }

  function renderRoleDrawer(){
    const u=user(),s=describeScope(u);
    $("#activeScopeCard").innerHTML=`<div class="active-id"><span class="user-avatar">${esc(u.initials)}</span><div><h3>${esc(local(u.name))}</h3><p>${esc(local(u.role))} · ${u.roleCode}</p></div></div><div class="scope-grid"><div><small>${t('domains')}</small><b>${esc(s.domains)}</b></div><div><small>${t('regions')}</small><b>${esc(s.regions)}</b></div><div><small>${t('commandAuthority')}</small><b>${esc(s.authority)}</b></div></div>`;
    $("#userList").innerHTML=D.users.map(x=>`<button type="button" class="user-card ${x.id===u.id?'active':''}" data-user="${x.id}"><span class="user-avatar">${esc(x.initials)}</span><span class="user-card-copy"><strong>${esc(local(x.name))}</strong><small>${esc(local(x.role))} · ${esc(describeScope(x).regions)}</small></span><span class="role-code">${x.roleCode}</span></button>`).join('');
    $("#userAvatar").textContent=u.initials;$("#userName").textContent=local(u.name);$("#userRole").textContent=local(u.role);$("#notificationCount").textContent=String(5+state.pendingApprovals.filter(a=>a.status==='pending').length);
  }
  let droneOps=null,roboticsOps=null,maritimeOps=null,mobilityOps=null,aiOps=null,incidentOps=null,twinOps=null,liveMapOps=null,fleetOps=null,analyticsOps=null,securityOps=null,missionOps=null,reportsOps=null,settingsOps=null;
  function applyModuleLayout(){
    const flags={live:state.module==="live-map",drone:state.module==="drone-ops",robot:state.module==="robotics",maritime:state.module==="maritime",mobility:state.module==="mobility",ai:state.module==="ai",incident:state.module==="incidents",fleet:state.module==="fleet",twin:state.module==="digital-twin",analytics:state.module==="analytics",security:state.module==="security",mission:state.module==="missions",reports:state.module==="reports",settings:state.module==="settings"},panel=$("#mapPanel"),home=$("#commandMapHome"),viewport=$("#mapViewport");
    const mounts={live:$("#liveMapMount"),drone:$("#droneMapMount"),robot:$("#robotMapMount"),maritime:$("#maritimeMapMount"),mobility:$("#mobilityMapMount"),ai:$("#aiMapMount"),incident:$("#incidentMapMount"),fleet:$("#fleetMapMount"),twin:$("#twinMapMount"),mission:$("#missionMapMount")};
    const intel={live:$("#liveMapIntel"),drone:$("#droneMapIntel"),robot:$("#robotMapIntel"),maritime:$("#maritimeMapIntel"),mobility:$("#mobilityMapIntel"),ai:$("#aiMapIntel"),incident:$("#incidentMapIntel"),fleet:$("#fleetMapIntel"),twin:$("#twinMapIntel"),mission:$("#missionMapIntel")};
    const any=Object.values(flags).some(Boolean);$("#commandCenterPage").hidden=any;$("#liveMapPage").hidden=!flags.live;$("#droneOpsPage").hidden=!flags.drone;$("#roboticsPage").hidden=!flags.robot;$("#maritimePage").hidden=!flags.maritime;$("#mobilityPage").hidden=!flags.mobility;$("#aiPage").hidden=!flags.ai;$("#incidentsPage").hidden=!flags.incident;$("#fleetPage").hidden=!flags.fleet;$("#digitalTwinPage").hidden=!flags.twin;$("#analyticsPage").hidden=!flags.analytics;$("#securityPage").hidden=!flags.security;$("#missionsPage").hidden=!flags.mission;$("#reportsPage").hidden=!flags.reports;$("#settingsPage").hidden=!flags.settings;
    const active=Object.keys(mounts).find(k=>flags[k]);if(active){if(panel.parentElement!==mounts[active])mounts[active].appendChild(panel);if(intel[active]&&intel[active].parentElement!==viewport)viewport.appendChild(intel[active])}else if(!flags.analytics&&!flags.security&&!flags.reports&&!flags.settings&&panel.parentElement!==home.parentElement)home.parentNode.insertBefore(panel,home.nextSibling);
    Object.keys(flags).forEach(k=>{if(!flags[k]&&intel[k]&&intel[k].parentElement!==mounts[k])mounts[k].appendChild(intel[k])});
    const {live,drone,robot,maritime,mobility,ai,incident,fleet,twin,analytics,security,mission,reports,settings}=flags;
    const eyebrow=panel.querySelector(".map-title .eyebrow"),title=panel.querySelector(".map-title h2"),search=$("#mapSearch");
    const eyebrowKey=mission?"nationalPicture":live?"liveMapOperationsPicture":drone?"flightPicture":robot?"robotOperationsPicture":maritime?"maritimePicture":mobility?"mobilityPicture":ai?"aiOperationsPicture":incident?"incidentOperationsPicture":fleet?"fleetOperationsPicture":twin?"twinOperationsPicture":"nationalPicture",titleKey=mission?"uaeOperationalMap":live?"liveNationalMap":drone?"flightOperationsMap":robot?"robotFleetMap":maritime?"maritimeOperationalMap":mobility?"mobilityOperationalMap":ai?"aiOperationalMap":incident?"incidentOperationalMap":fleet?"fleetDeploymentMap":twin?"twinOperationalMap":"uaeOperationalMap";eyebrow.dataset.i18n=eyebrowKey;eyebrow.textContent=mission?(state.lang==="ar"?"صورة تنفيذ المهمة الحية":"Live mission execution picture"):t(eyebrowKey);title.dataset.i18n=titleKey;title.textContent=mission?(state.lang==="ar"?"خريطة تنسيق المهمة ثلاثية الأبعاد":"3D Mission Coordination Map"):t(titleKey);search.placeholder=mission?(state.lang==="ar"?"ابحث عن مهمة أو أصل أو نقطة مسار":"Search mission, asset or waypoint"):t(live?"searchNationalMap":drone?"searchDrone":robot?"searchRobot":maritime?"searchVessel":mobility?"searchVehicle":ai?"searchAi":incident?"searchIncident":fleet?"searchFleet":twin?"searchTwin":"searchMap");
    $("#scenarioLabel").textContent=mission?`${missionOps?.selected()?.id||"MISSION"} · ${missionOps?.selected()?.progress||0}% · LIVE C2`:reports?`${reportsOps?.selected()?.id||"REPORT"} · GOVERNED OUTPUT`:settings?"BASE-2026.09 · CONFIGURATION GOVERNANCE":analytics?`${local(D.nav.find(x=>x.id==="analytics").label)} · 94.0 NATIONAL INDEX · LIVE`:security?`${local(D.nav.find(x=>x.id==="security").label)} · ${securityOps?.selected()?.id||"SOC"} · ZERO TRUST`:live?`${t("liveNationalMap")} · ${liveMapOps?.selected()?.id||"NATIONAL"} · LIVE`:fleet?`${t("fleetDeploymentMap")} · ${fleetOps?.selected()?.id||"FLEET"} · 96.2% READY`:drone?`${t("currentMission")} · ${droneOps?.selected()?.id||"UAV"} · ${t("inProgress")}`:robot?`${t("currentMission")} · ${roboticsOps?.selected()?.id||"R"} · ${t("inProgress")}`:maritime?`${t("currentMission")} · ${maritimeOps?.selected()?.id||"MV"} · ${t("inProgress")}`:mobility?`${t("currentMission")} · ${mobilityOps?.selected()?.id||"AV"} · ${t("inProgress")}`:ai?`${t("aiDetectionsLabel")} · ${aiOps?.selectedDetection()?.id||"AI"} · ${t("inProgress")}`:incident?`${incidentOps?.selected()?.id||"INC"} · ${local(incidentOps?.selected()?.category)||t("incidents")} · ${t("inProgress")}`:twin?`${t("twinOperationalMap")} · ${twinOps?.selected()?.id||"TWIN"} · ${state.twin?.scenarioActive?"SIMULATION":"LIVE"}`:t("scenarioName");
    window.ACC_ARCGIS_MAP?.setSuspended(Boolean(analytics||security||reports||settings));
  }
  function switchModule(id,fly=true){
    if(id===state.module){applyModuleLayout();return}
    if(state.module==="live-map")state.liveMap.mapLayers={...state.map.layers};else if(state.module==="drone-ops")state.drone.mapLayers={...state.map.layers};else if(state.module==="robotics")state.robotics.mapLayers={...state.map.layers};else if(state.module==="maritime")state.maritime.mapLayers={...state.map.layers};else if(state.module==="mobility")state.mobility.mapLayers={...state.map.layers};else if(state.module==="ai")state.ai.mapLayers={...state.map.layers};else if(state.module==="incidents")state.incident.mapLayers={...state.map.layers};else if(state.module==="fleet")state.fleet.mapLayers={...state.map.layers};else if(state.module==="digital-twin")state.twin.mapLayers={...state.map.layers};else if(state.module==="missions")state.missions.mapLayers={...state.map.layers};else state.commandMapLayers={...state.map.layers};
    if(id==="live-map"){Object.assign(state.map.layers,state.liveMap.mapLayers);state.selectedAssetId=state.liveMap.objectType==="asset"?state.liveMap.objectId:state.selectedAssetId}else if(id==="drone-ops"){Object.assign(state.map.layers,state.drone.mapLayers);state.selectedAssetId=state.drone.selectedId}else if(id==="robotics"){Object.assign(state.map.layers,state.robotics.mapLayers);state.selectedAssetId=state.robotics.selectedId}else if(id==="maritime"){Object.assign(state.map.layers,state.maritime.mapLayers);state.selectedAssetId=state.maritime.selectedId}else if(id==="mobility"){Object.assign(state.map.layers,state.mobility.mapLayers);state.selectedAssetId=state.mobility.selectedId}else if(id==="ai"){Object.assign(state.map.layers,state.ai.mapLayers);state.selectedAssetId=aiOps?.selectedDetection()?.assetId||state.selectedAssetId}else if(id==="incidents"){Object.assign(state.map.layers,state.incident.mapLayers);const s=incidentOps?.selected();state.selectedIncidentId=s?.id||state.selectedIncidentId;state.selectedAssetId=s?.responders?.find(x=>D.assets.some(a=>a.id===x))||state.selectedAssetId}else if(id==="fleet"){Object.assign(state.map.layers,state.fleet.mapLayers);state.selectedAssetId=state.fleet.selectedId}else if(id==="digital-twin"){Object.assign(state.map.layers,state.twin.mapLayers);state.map.cartography.assetStyle="auto"}else if(id==="missions"){Object.assign(state.map.layers,state.missions.mapLayers);state.selectedAssetId=missionOps?.selected()?.assets?.[0]||state.selectedAssetId}else Object.assign(state.map.layers,state.commandMapLayers||{assets:true,incidents:true,zones:true,corridors:true,buildings:true,weather:false,cameras:false,air:true,land:true,sea:true});state.search="";state.module=id;
    persist("moduleV029",state.module);renderAll();if(matchMedia("(max-width:1180px)").matches)requestAnimationFrame(()=>{document.querySelector("#moduleNav button.active")?.scrollIntoView({block:"nearest",inline:"center",behavior:"smooth"});window.scrollTo({top:0,behavior:"smooth"})});setTimeout(()=>{window.ACC_ARCGIS_MAP?.resize();let a=state.module==="missions"?missionOps?.selected():state.module==="live-map"?liveMapOps?.selected():state.module==="drone-ops"?droneOps?.selected():state.module==="robotics"?roboticsOps?.selected():state.module==="maritime"?maritimeOps?.selected():state.module==="mobility"?mobilityOps?.selected():state.module==="ai"?aiOps?.selectedDetection():state.module==="incidents"?D.incidents.find(x=>x.id===incidentOps?.selected()?.id):state.module==="fleet"?fleetOps?.selected():state.module==="digital-twin"?D.twinDistricts.find(x=>x.id===state.twin.districtId):null;if(fly&&a&&Number.isFinite(a.lat))window.ACC_ARCGIS_MAP?.flyTo({lat:a.lat,lon:a.lon,zoom:a.zoom||(state.module==="missions"?15.5:state.module==="live-map"?13.4:state.module==="fleet"?15.4:state.module==="robotics"||state.module==="mobility"?16.8:state.module==="maritime"?15.9:state.module==="ai"?15.4:state.module==="incidents"?15.6:state.module==="digital-twin"?16.45:15.7),tilt:a.tilt||(state.module==="robotics"?72:state.module==="mobility"?71:state.module==="maritime"?68:state.module==="ai"?65:state.module==="incidents"?66:state.module==="digital-twin"?72:69),heading:a.heading||325})},280);
  }
  function renderAll(){
    applyLanguage();applyTheme();applyFontSize();renderHealth();renderNav();renderRoleDrawer();applyModuleLayout();
    if(state.module==="live-map"){droneOps?.deactivate();roboticsOps?.deactivate();maritimeOps?.deactivate();mobilityOps?.deactivate();aiOps?.deactivate();incidentOps?.deactivate();fleetOps?.deactivate();twinOps?.deactivate();liveMapOps?.render()}
    else if(state.module==="drone-ops"){liveMapOps?.deactivate();roboticsOps?.deactivate();maritimeOps?.deactivate();mobilityOps?.deactivate();aiOps?.deactivate();incidentOps?.deactivate();fleetOps?.deactivate();twinOps?.deactivate();droneOps?.render()}
    else if(state.module==="robotics"){droneOps?.deactivate();maritimeOps?.deactivate();mobilityOps?.deactivate();aiOps?.deactivate();incidentOps?.deactivate();twinOps?.deactivate();roboticsOps?.render()}
    else if(state.module==="maritime"){droneOps?.deactivate();roboticsOps?.deactivate();mobilityOps?.deactivate();aiOps?.deactivate();incidentOps?.deactivate();twinOps?.deactivate();maritimeOps?.render()}
    else if(state.module==="mobility"){droneOps?.deactivate();roboticsOps?.deactivate();maritimeOps?.deactivate();aiOps?.deactivate();incidentOps?.deactivate();twinOps?.deactivate();mobilityOps?.render()}
    else if(state.module==="ai"){droneOps?.deactivate();roboticsOps?.deactivate();maritimeOps?.deactivate();mobilityOps?.deactivate();incidentOps?.deactivate();twinOps?.deactivate();aiOps?.render()}
    else if(state.module==="incidents"){droneOps?.deactivate();roboticsOps?.deactivate();maritimeOps?.deactivate();mobilityOps?.deactivate();aiOps?.deactivate();twinOps?.deactivate();incidentOps?.render()}
    else if(state.module==="fleet"){liveMapOps?.deactivate();droneOps?.deactivate();roboticsOps?.deactivate();maritimeOps?.deactivate();mobilityOps?.deactivate();aiOps?.deactivate();incidentOps?.deactivate();twinOps?.deactivate();fleetOps?.render()}
    else if(state.module==="digital-twin"){liveMapOps?.deactivate();droneOps?.deactivate();roboticsOps?.deactivate();maritimeOps?.deactivate();mobilityOps?.deactivate();aiOps?.deactivate();incidentOps?.deactivate();fleetOps?.deactivate();twinOps?.render()}
    else if(state.module==="analytics"){liveMapOps?.deactivate();droneOps?.deactivate();roboticsOps?.deactivate();maritimeOps?.deactivate();mobilityOps?.deactivate();aiOps?.deactivate();incidentOps?.deactivate();fleetOps?.deactivate();twinOps?.deactivate();securityOps?.deactivate();analyticsOps?.render()}
    else if(state.module==="security"){liveMapOps?.deactivate();droneOps?.deactivate();roboticsOps?.deactivate();maritimeOps?.deactivate();mobilityOps?.deactivate();aiOps?.deactivate();incidentOps?.deactivate();fleetOps?.deactivate();twinOps?.deactivate();analyticsOps?.deactivate();securityOps?.render()}
    else if(state.module==="missions"){analyticsOps?.deactivate();securityOps?.deactivate();reportsOps?.deactivate();settingsOps?.deactivate();missionOps?.render()}
    else if(state.module==="reports"){missionOps?.deactivate();analyticsOps?.deactivate();securityOps?.deactivate();settingsOps?.deactivate();reportsOps?.render()}
    else if(state.module==="settings"){missionOps?.deactivate();analyticsOps?.deactivate();securityOps?.deactivate();reportsOps?.deactivate();settingsOps?.render()}
    else{liveMapOps?.deactivate();droneOps?.deactivate();roboticsOps?.deactivate();maritimeOps?.deactivate();mobilityOps?.deactivate();aiOps?.deactivate();incidentOps?.deactivate();fleetOps?.deactivate();twinOps?.deactivate();analyticsOps?.deactivate();securityOps?.deactivate();missionOps?.deactivate();reportsOps?.deactivate();settingsOps?.deactivate();renderScope();renderKpis();renderIncidents();renderSelectedAsset();renderMission();renderQuickActions();renderAnalytics()}
    if(window.ACC_ARCGIS_MAP?.isActive())setMapEngineStatus('ready');else if(window.ACC_ARCGIS_MAP?.isFailed?.())setMapEngineStatus('failed');requestAnimationFrame(renderMap)
  }

  function openDrawer(){$("#roleDrawer").classList.add('open');$("#drawerScrim").classList.add('open');$("#roleDrawer").setAttribute('aria-hidden','false');$("#userButton").setAttribute('aria-expanded','true')}
  function closeDrawer(){$("#roleDrawer").classList.remove('open');$("#drawerScrim").classList.remove('open');$("#roleDrawer").setAttribute('aria-hidden','true');$("#userButton").setAttribute('aria-expanded','false')}
  function modal(title,subtitle,body,foot='',size=''){
    const root=$("#modalRoot");document.body.classList.add('map-paused-by-modal');window.ACC_ARCGIS_MAP?.setSuspended(true);root.innerHTML=`<section class="modal-card ${size}"><header class="modal-head"><div><h2>${title}</h2>${subtitle?`<p>${subtitle}</p>`:''}</div><button type="button" class="icon-button" data-close-modal>${icon('close')}</button></header><div class="modal-body">${body}</div>${foot?`<footer class="modal-foot">${foot}</footer>`:''}</section>`;root.classList.add('open');root.setAttribute('aria-hidden','false');
  }
  function closeModal(){const root=$("#modalRoot");root.classList.remove('open');root.setAttribute('aria-hidden','true');setTimeout(()=>{if(!root.classList.contains('open')){root.innerHTML='';document.body.classList.remove('map-paused-by-modal');if(!document.hidden&&!['analytics','security','reports','settings'].includes(state.module)){window.ACC_ARCGIS_MAP?.setSuspended(false);window.ACC_ARCGIS_MAP?.resize()}}},180)}
  function toast(title,message,tone=''){
    const el=document.createElement('div');el.className=`toast ${tone}`;el.innerHTML=`<b>${esc(title)}</b><p>${esc(message)}</p>`;$("#toastRegion").appendChild(el);setTimeout(()=>el.remove(),4300);
  }
  function denied(reason=t("permissionReason")){logAudit("Denied command","Denied");toast(t("accessDenied"),reason,"red")}
  const presentationStops=[
    {module:"command",icon:"home",title:"guideCommand",note:{en:"Establish national readiness, active incidents and the multi-domain operating picture.",ar:"استعرض الجاهزية الوطنية والحوادث النشطة والصورة التشغيلية متعددة المجالات."}},
    {module:"live-map",icon:"map",title:"guideMap",note:{en:"Demonstrate real terrain, imagery, street labels, 3D buildings, physical assets and full camera control.",ar:"اعرض التضاريس والصور وأسماء الشوارع والمباني والأصول ثلاثية الأبعاد والتحكم الكامل بالكاميرا."}},
    {module:"digital-twin",icon:"twin",title:"guideTwin",note:{en:"Open a city district, inspect dependencies and run a governed impact simulation.",ar:"افتح منطقة حضرية وافحص الاعتماديات وشغّل محاكاة أثر محكومة."}},
    {action:"roles",icon:"users",title:"guideRoles",note:{en:"Switch from National Commander to a scoped operator, analyst, auditor or executive viewer.",ar:"بدّل من القائد الوطني إلى مشغّل أو محلل أو مدقق أو مستخدم تنفيذي محدود النطاق."}},
    {module:"incidents",icon:"alert",title:"guideIncident",note:{en:"Show evidence, response resources, approvals, timelines and role-governed command actions.",ar:"اعرض الأدلة وموارد الاستجابة والاعتمادات والخط الزمني وأوامر القيادة المحكومة بالدور."}},
    {module:"analytics",icon:"chart",title:"guideAnalytics",note:{en:"Translate operational activity into readiness, risk and cross-domain performance outcomes.",ar:"حوّل النشاط التشغيلي إلى نتائج للجاهزية والمخاطر والأداء عبر المجالات."}},
    {module:"reports",icon:"report",title:"guideReports",note:{en:"Close with bilingual, traceable evidence products, schedules and signed publication controls.",ar:"اختتم بمخرجات أدلة ثنائية اللغة وقابلة للتتبع مع الجدولة وضوابط النشر الموقّع."}}
  ];
  function presentationSnapshot(extra={}){
    return Object.assign({version:D.version,module:state.module,user:state.userId,role:user().roleCode,lang:state.lang,theme:state.theme,fontSize:state.fontSize,presentation:presentationMode,mapReady:!!window.ACC_ARCGIS_MAP?.isActive?.()},extra);
  }
  function openDemoGuide(){
    const stops=presentationStops.map((item,index)=>{const permitted=!item.module||user().nav.includes(item.module);const button=item.action?`data-guide-action="${item.action}"`:`data-guide-module="${item.module}"`;return `<button type="button" class="presentation-stop ${permitted?'':'restricted'}" ${button} ${permitted?'':'aria-disabled="true"'}><span class="presentation-stop-index">${String(index+1).padStart(2,'0')}</span><span class="presentation-stop-icon">${icon(item.icon)}</span><span class="presentation-stop-copy"><b>${t(item.title)}</b><small>${esc(local(item.note))}</small></span><em>${item.action?t('switchIdentity'):permitted?t('openSection'):t('restricted')}</em></button>`}).join('');
    modal(t('guidedWalkthrough'),`${t('presentationReady')} · v${D.version}`,`<div class="presentation-guide"><header><div><span class="eyebrow">${t('recommendedSequence')}</span><p>${t('guidedWalkthroughIntro')}</p></div><span class="presentation-ready-seal">${icon('check')}<b>${t('integrationReady')}</b></span></header><div class="presentation-stop-list">${stops}</div><section class="presentation-guide-notes"><article>${icon('layers')}<div><b>3D / 2D</b><small>${t('scenePerformance')}</small></div></article><article>${icon('shield')}<div><b>${t('presentationControls')}</b><small>${t('keyboardHelp')}</small></div></article></section></div>`,`<button class="modal-button" data-presentation-reset-confirm>${t('restartDemo')}</button><button class="modal-button primary" data-close-modal>${t('close')}</button>`,'presentation');
  }
  function confirmFullReset(){
    modal(t('restartDemo'),t('openingState'),`<div class="reset-confirmation">${icon('reset')}<div><b>${t('restartDemoConfirm')}</b><p>${t('presentationControlsNote')}</p></div></div>`,`<button class="modal-button" data-close-modal>${t('cancel')}</button><button class="modal-button primary" data-presentation-reset-now>${t('restartNow')}</button>`,'small');
  }
  function restartFullDemo(){
    try{Object.keys(localStorage).filter(key=>key.startsWith('acc.')).forEach(key=>localStorage.removeItem(key))}catch(e){}
    const url=new URL(window.location.href);url.search='';url.hash='';if(presentationMode)url.searchParams.set('presentation','1');window.location.replace(url.href);
  }
  function activatePresentationView(options={}){
    const requestedUser=D.users.find(x=>x.id===options.user);if(requestedUser){state.userId=requestedUser.id;persist('user',state.userId)}
    if(['en','ar'].includes(options.lang)){state.lang=options.lang;persist('lang',state.lang)}
    if(['dark','light'].includes(options.theme)){state.theme=options.theme;persist('theme',state.theme)}
    if(['small','medium','large'].includes(options.fontSize)){state.fontSize=options.fontSize;persist('fontSizeV029',state.fontSize)}
    const requestedModule=D.nav.some(x=>x.id===options.module)?options.module:state.module;
    const permitted=user().nav.includes(requestedModule),target=permitted?requestedModule:'command';
    closeModal();closeDrawer();
    if(target===state.module)renderAll();else switchModule(target,options.fly!==false);
    if(options.fullscreenMap&&['command','live-map','drone-ops','robotics','maritime','mobility','ai','incidents','fleet','digital-twin','missions'].includes(target))setTimeout(()=>{if(!isMapFullscreen())toggleMapFullscreen()},360);
    return presentationSnapshot({requestedModule,permitted});
  }
  function openPending(module){
    const body=state.lang==='ar'?'تتضمن هذه الحزمة مركز القيادة والخريطة الحية وعمليات الطائرات المسيّرة ومركز قيادة الروبوتات ومركز العمليات البحرية ومركز عمليات التنقل الذاتي ومركز الذكاء الاصطناعي والضمان ومركز القيادة الوطنية للحوادث وإدارة جاهزية الأسطول والتوأم الرقمي الاتحادي. يطبق عنصر التنقل هذا سياسة صلاحيات المستخدم المحدد، وهو جاهز للوحدة التالية.':"This package completes Command Center, Live Map, Drone Operations, Robotics Command Center, Maritime Operations, Autonomous Mobility, AI Intelligence & Assurance, National Incident Command, Fleet Readiness and the Federated Digital Twin. This navigation item already enforces the selected user’s role policy and is ready for the next operational module.";
    modal(t("pendingModule"),esc(local(module.label)),`<div class="detail-card"><h3>${t('rolePermissions')}</h3><p>${t('pendingModuleDetail')}</p></div><div class="command-banner">${body}</div>`,`<button class="modal-button primary" data-close-modal>${t('close')}</button>`,'small');
  }
  function openIncident(id){
    const i=D.incidents.find(x=>x.id===id);if(!i)return;state.selectedIncidentId=id;logAudit(`${t('incidentOpened')}: ${id}`);renderIncidents();
    const canCamera=has('camera'),assessment=state.lang==='ar'?"يرجح نموذج الارتباط أن السبب تشغيلي موضعي. لم يُرصد انتشار ثانوي، ويوصى بالتحقق البصري قبل أي عزل للبنية التحتية.":"Correlation analysis indicates a localized operational cause. No secondary propagation is detected; visual verification is recommended before any infrastructure isolation.";
    const timeline=[["20:45:12",t('detected')],["20:44:58",state.lang==='ar'?'تم تجاوز عتبة ثقة الذكاء الاصطناعي':'AI confidence threshold exceeded'],["20:43:20",state.lang==='ar'?`تم تكليف ${i.affected[0]}`:`${i.affected[0]} assigned`],["20:41:06",state.lang==='ar'?'تم ربط تدفق الأدلة':'Evidence stream linked']];
    modal(`${t('incidentCommand')} · ${i.id}`,`${t(i.severity)} · ${esc(local(i.location))}`,`<div class="detail-grid"><div><div class="evidence-image ${canCamera?'':'masked'}" data-live-label="${t('liveEvidence')}" data-mask-label="${t('rolePolicyMask')}"><img src="${i.image}" alt="${t('evidence')}"></div><div class="metric-grid" style="margin-top:8px"><div class="metric-box"><small>${t('confidence')}</small><b>${i.confidence}%</b></div><div class="metric-box"><small>${t('severity')}</small><b>${t(i.severity)}</b></div><div class="metric-box"><small>${t('affectedAssets')}</small><b>${i.affected.length}</b></div></div></div><div><section class="detail-card"><h3>${t('currentAssessment')}</h3><p>${assessment}</p></section><section class="detail-card"><h3>${t('assignedUnits')}</h3>${i.affected.map(id=>`<button class="search-result" data-open-asset="${id}">${icon('target')}<span><b>${id}</b><small>${D.assets.find(a=>a.id===id)?.model||'Autonomous unit'}</small></span>${icon('chevron')}</button>`).join('')}</section><section class="detail-card"><h3>${t('responseTimeline')}</h3><div class="timeline">${timeline.map(x=>`<div class="timeline-item"><b>${esc(x[1])}</b><small>${x[0]} GST</small></div>`).join('')}</div></section></div></div>`,`<button class="modal-button" data-incident-action="acknowledge">${t('acknowledge')}</button><button class="modal-button" data-incident-action="assign">${t('assignMission')}</button><button class="modal-button primary" data-incident-action="escalate">${t('escalate')}</button>`);
  }
  function openAsset(id){
    const a=D.assets.find(x=>x.id===id);if(!a||!visibleAssets().some(x=>x.id===id)){denied();return}state.selectedAssetId=id;logAudit(`${t('assetOpened')}: ${id}`);renderSelectedAsset();renderMission();renderQuickActions();renderMapOverlays();
    const canCamera=has('camera'),image=feedForType(a.type).image;
    const sensors=state.lang==='ar'?['كاميرا بصرية / حرارية','نظام GNSS / RTK','تجنب الاصطدام','شبكة 5G آمنة']:['Camera EO/IR','GNSS / RTK','Collision avoidance','Secure 5G'];
    modal(`${t('assetDossier')} · ${a.id}`,`${esc(a.model)} · ${esc(locationText(a))}`,`<div class="detail-grid"><div><div class="evidence-image ${canCamera?'':'masked'}" data-live-label="${t('liveEvidence')}" data-mask-label="${t('rolePolicyMask')}"><img src="${image}" alt="${t('cameraFeed')}"></div><div class="metric-grid" style="margin-top:8px"><div class="metric-box"><small>${t('battery')}</small><b>${a.battery}%</b></div><div class="metric-box"><small>${t('speed')}</small><b>${a.speed} km/h</b></div><div class="metric-box"><small>${t('health')}</small><b>${a.health}%</b></div></div></div><div><section class="detail-card"><h3>${t('telemetry')}</h3><div class="asset-fields">${assetFields(a)}</div></section><section class="detail-card"><h3>${t('sensors')}</h3>${sensors.map((x,j)=>`<div class="asset-field">${icon(j===0?'camera':j===1?'pin':j===2?'shield':'network')}<span>${x}</span><b style="color:var(--green)">${t('online')}</b></div>`).join('')}</section><section class="detail-card"><h3>${t('missionHistory')}</h3><div class="timeline"><div class="timeline-item"><b>${esc(missionText(a.mission))}</b><small>${state.lang==='ar'?'اليوم':'Today'} · ${a.missionProgress}%</small></div><div class="timeline-item"><b>${state.lang==='ar'?'فحص الجاهزية الدوري':'Routine readiness check'}</b><small>${state.lang==='ar'?'أمس':'Yesterday'} · 100%</small></div></div></section></div></div>`,`<button class="modal-button" data-follow-asset="${a.id}">${t('follow')}</button><button class="modal-button primary" data-modal-command="dispatch">${t('dispatch')}</button>`);
  }
  function openDomainFeed(type){
    const f=domainFeeds[type];if(!f)return;const a=visibleAssets().find(x=>x.type===type),canCamera=has('camera');
    const note=state.lang==='ar'?'يتم دمج البث البصري والقياسات والمسار في سجل تشغيلي واحد مع تطبيق مستوى الرؤية الخاص بالدور الحالي.':'Visual evidence, telemetry and route state are fused into one operational record while enforcing the current role’s visibility policy.';
    modal(t(f.title),`${esc(f.location)} · ${t('multiDomainFeed')}`,`<div class="detail-grid"><div><div class="evidence-image domain-evidence ${canCamera?'':'masked'}" data-live-label="${t('liveEvidence')}" data-mask-label="${t('rolePolicyMask')}"><img src="${f.image}" alt="${t(f.title)}"></div><div class="metric-grid" style="margin-top:8px"><div class="metric-box"><small>${t(f.metricLabel)}</small><b>${f.metric}</b></div><div class="metric-box"><small>${t('connectivity')}</small><b style="color:var(--green)">5G ${t('secure')}</b></div><div class="metric-box"><small>${t('status')}</small><b style="color:var(--green)">${t('operational')}</b></div></div></div><div><section class="detail-card"><h3>${t('operationalContext')}</h3><p>${note}</p></section><section class="detail-card"><h3>${t('assignedUnits')}</h3>${a?`<button class="search-result" data-open-asset="${a.id}">${icon(a.icon)}<span><b>${a.id} · ${esc(a.model)}</b><small>${esc(missionText(a.mission))}</small></span>${icon('chevron')}</button>`:`<p>${t('noResults')}</p>`}</section><section class="detail-card"><h3>${t('sensorFusion')}</h3><div class="asset-field">${icon('camera')}<span>EO / IR</span><b style="color:var(--green)">${t('online')}</b></div><div class="asset-field">${icon('network')}<span>Secure 5G</span><b style="color:var(--green)">${t('online')}</b></div><div class="asset-field">${icon('brain')}<span>${t('aiEngine')}</span><b style="color:var(--green)">${t('operational')}</b></div></section></div></div>`,a?`<button class="modal-button" data-follow-asset="${a.id}">${t('follow')}</button><button class="modal-button primary" data-open-asset="${a.id}">${t('openAsset')}</button>`:`<button class="modal-button primary" data-close-modal>${t('close')}</button>`);
  }
  function openKpi(index){
    const labels=["totalAssets","activeMissions","activeDrones","activeRobots","marineAssets","autonomousVehicles","activeIncidents","aiAlerts","avgResponse","fleetAvailability"],key=labels[Number(index)]||"totalAssets";
    const emirates=[['Abu Dhabi',68],['Dubai',55],['Sharjah',34],['Ras Al Khaimah',23],['Fujairah',19],['Ajman',14],['Umm Al Quwain',9]];
    modal(`${t('kpiAnalysis')} · ${t(key)}`,`${t('lastSevenDays')} · ${t('filteredByRole')}`,`<div class="detail-grid"><div class="chart-large">${largeMiniChart()}</div><div><section class="detail-card"><h3>${t('emirateBreakdown')}</h3>${emirates.map((x,i)=>`<div class="bar-row"><span>${state.lang==='ar'?(D.locations.find(l=>l.name===x[0])?.ar||x[0]):x[0]}</span><div class="bar-track"><i style="--w:${x[1]}%"></i></div><b>${Math.max(1,Math.round(x[1]*visibleAssets().length/270))}</b></div>`).join('')}</section><section class="detail-card"><h3>${t('operationalImpact')}</h3><p>${t('alertsPrioritized')}</p></section></div></div>`,`<button class="modal-button" data-export>${t('exportAccess')}</button><button class="modal-button primary" data-close-modal>${t('close')}</button>`);
  }
  function openAccessMatrix(){
    const keys=Object.keys(D.permissionLabels);
    modal(t('accessMatrix'),t('userSwitchingNote'),`<div style="overflow:auto"><table class="permission-table"><thead><tr><th>${t('capability')}</th>${D.users.map(u=>`<th>${esc(u.roleCode)}</th>`).join('')}</tr></thead><tbody>${keys.map(k=>`<tr><td>${t(D.permissionLabels[k])}</td>${D.users.map(u=>`<td><span class="permission-state ${u.permissions.includes(k)?'yes':''}">${u.permissions.includes(k)?'✓':'×'}</span></td>`).join('')}</tr>`).join('')}</tbody></table></div>`,`<button class="modal-button primary" data-close-modal>${t('close')}</button>`);
  }
  function openAudit(){
    modal(t('auditTrail'),`${t('activeSession')} · ${esc(local(user().name))}`,`<div class="audit-row header"><span>${t('time')}</span><span>${t('event')}</span><span>${t('actor')}</span><span>${t('result')}</span></div>${state.audit.map(a=>`<div class="audit-row"><time>${esc(a.time)}</time><b>${esc(a.event)}</b><span>${esc(a.actor)}</span><em>${esc(a.result)}</em></div>`).join('')}`,`<button class="modal-button" data-export>${t('exportAccess')}</button><button class="modal-button primary" data-close-modal>${t('close')}</button>`);
  }
  function openNotifications(){
    const approvals=state.pendingApprovals.filter(a=>a.status==='pending');
    const approvalRows=approvals.map(a=>`<div class="detail-card"><h3>${t('approvalWorkflow')} · ${a.id}</h3><p><b>${esc(a.assetId)} · ${esc(a.action)}</b><br>${t('submittedBy')}: ${esc(a.submittedBy)}<br>${t('reason')}: ${esc(a.reason)}</p>${has('approveHighRisk')?`<div style="display:flex;gap:6px;margin-top:9px"><button class="modal-button" data-approval-decision="deny" data-approval-id="${a.id}">${t('deny')}</button><button class="modal-button primary" data-approval-decision="approve" data-approval-id="${a.id}">${t('approveCommand')}</button></div>`:`<div class="command-banner" style="margin-top:8px;margin-bottom:0">${t('pending')} · ${t('approver')}: ${a.approver}</div>`}</div>`).join('');
    modal(t('notifications'),t('alertsPrioritized'),`${approvalRows}<div class="search-results">${D.scenarioEvents.slice().reverse().map((e,i)=>`<div class="search-result"><span class="severity-badge ${i<2?'high':'medium'}">${i<2?t('high'):t('medium')}</span><span><b>${esc(local(e.label))}</b><small>${Math.max(1,2+i*3)} ${t('minutes')}</small></span>${icon('chevron')}</div>`).join('')}</div>`,`<button class="modal-button primary" data-close-modal>${t('close')}</button>`,'small');
  }
  function commandFlow(action,a){
    if(!a){denied();return}
    if(action==='camera'){if(!has('camera'))denied();else openAsset(a.id);return}
    const permission=action==='dispatch'?'dispatch':action==='emergency'?'emergency':'changeMission';
    const allowed=has(permission),approval=action==='emergency'&&!allowed&&['incident','assigned','domain'].includes(user().authority);
    if(!allowed&&!approval){denied();return}
    const label={dispatch:t('dispatch'),return:t('returnHome'),hold:t('hold'),emergency:t('emergencyOverride'),assign:t('assignMission'),escalate:t('escalate'),acknowledge:t('acknowledge')}[action]||action;
    modal(approval?t('approvalWorkflow'):`${t('command')} · ${label}`,`${a.id} · ${esc(locationText(a))}`,`${approval?`<div class="command-banner">${t('approvalRequired')} · ${t('approver')}: NAT-CMD / Duty Commander</div>`:''}<label><span class="eyebrow">${t('reasonRequired')}</span><textarea id="commandReason" class="reason-box" placeholder="${t('enterReason')}"></textarea></label>`,`<button class="modal-button" data-close-modal>${t('cancel')}</button><button class="modal-button primary" data-confirm-command="${action}" data-approval="${approval}">${approval?t('requestApproval'):t('confirm')}</button>`,'small');
  }
  function completeCommand(action,approval){
    const reason=$("#commandReason")?.value.trim();if(!reason){$("#commandReason")?.focus();toast(t('reasonRequired'),t('enterReason'),'amber');return}
    const a=selectedAsset();if(approval)state.pendingApprovals.unshift({id:`APR-${1900+state.pendingApprovals.length}`,assetId:a?.id||'—',action,time:new Date().toISOString().slice(11,19),reason,submittedBy:local(user().name),approver:'NAT-CMD',status:'pending'});logAudit(`${t('commandIssued')}: ${action} · ${a?.id||''}`,approval?'Pending approval':'Recorded');closeModal();renderRoleDrawer();toast(approval?t('requestRecorded'):t('commandRecorded'),`${a?.id||''} · ${reason}`,approval?'amber':'green');
  }
  function decideApproval(id,decision){
    const item=state.pendingApprovals.find(a=>a.id===id);if(!item)return;if(!has('approveHighRisk')){denied();return}item.status=decision==='approve'?'approved':'denied';logAudit(`${t('approvalWorkflow')}: ${item.id}`,item.status);closeModal();renderRoleDrawer();toast(decision==='approve'?t('approveCommand'):t('deny'),`${item.assetId} · ${item.id}`,decision==='approve'?'green':'red');
  }
  function globalSearch(q){
    const term=q.trim().toLowerCase();if(!term)return;
    const assets=visibleAssets().filter(a=>(a.id+' '+a.location+' '+a.model+' '+a.mission).toLowerCase().includes(term)).slice(0,8);
    const incidents=visibleIncidents().filter(i=>(i.id+' '+local(i.title)+' '+local(i.location)).toLowerCase().includes(term)).slice(0,5);
    modal(t('globalSearch'),`${assets.length+incidents.length} ${t('results')} · ${t('filteredByRole')}`,`<div class="search-results">${assets.map(a=>`<button class="search-result" data-open-asset="${a.id}">${icon(a.icon)}<span><b>${a.id} · ${esc(a.model)}</b><small>${esc(locationText(a))} · ${esc(missionText(a.mission))}</small></span>${icon('chevron')}</button>`).join('')}${incidents.map(i=>`<button class="search-result" data-open-incident="${i.id}">${icon('alert')}<span><b>${i.id} · ${esc(local(i.title))}</b><small>${esc(local(i.location))}</small></span>${icon('chevron')}</button>`).join('')||(!assets.length?`<div class="empty-state">${t('noResults')}</div>`:'')}</div>`,'');
  }
  function followAsset(id){
    const a=D.assets.find(x=>x.id===id);if(!a)return;state.selectedAssetId=id;state.map.lat=a.lat;state.map.lon=a.lon;state.map.zoom=16;renderSelectedAsset();renderMission();renderQuickActions();renderMap();
    if(window.ACC_ARCGIS_MAP&&window.ACC_ARCGIS_MAP.isActive())window.ACC_ARCGIS_MAP.flyTo({lat:a.lat,lon:a.lon,zoom:16.3,tilt:a.type==='drone'?72:66,heading:a.heading||330});
    $("#mapSelectionLabel").innerHTML=`<b>${a.id} · ${esc(a.model)}</b><small>${t('follow')} · ${esc(locationText(a))}</small>`;$("#mapSelectionLabel").classList.add('show');setTimeout(()=>$("#mapSelectionLabel").classList.remove('show'),3500);toast(t('follow'),`${a.id} · ${locationText(a)}`,'green');
  }
  function switchUser(id){
    if(id===state.userId){closeDrawer();return}const old=local(user().name),oldModule=state.module;state.userId=id;persist('user',id);state.search='';state.selectedIncidentId=null;if(!user().nav.includes(state.module)){if(oldModule==='live-map')state.liveMap.mapLayers={...state.map.layers};else if(oldModule==='drone-ops')state.drone.mapLayers={...state.map.layers};else if(oldModule==='robotics')state.robotics.mapLayers={...state.map.layers};else if(oldModule==='maritime')state.maritime.mapLayers={...state.map.layers};else if(oldModule==='mobility')state.mobility.mapLayers={...state.map.layers};else if(oldModule==='ai')state.ai.mapLayers={...state.map.layers};else if(oldModule==='incidents')state.incident.mapLayers={...state.map.layers};else if(oldModule==='fleet')state.fleet.mapLayers={...state.map.layers};else if(oldModule==='digital-twin')state.twin.mapLayers={...state.map.layers};Object.assign(state.map.layers,state.commandMapLayers||{assets:true,incidents:true,zones:true,corridors:true,buildings:true,weather:false,cameras:false,air:true,land:true,sea:true});state.module='command';persist('moduleV029','command')}const va=visibleAssets();state.selectedAssetId=state.module==='fleet'&&va.some(a=>a.id===state.fleet.selectedId)?state.fleet.selectedId:state.module==='live-map'&&va.some(a=>a.id===state.liveMap.objectId)?state.liveMap.objectId:state.module==='robotics'&&va.some(a=>a.id==='R-008')?'R-008':state.module==='maritime'&&va.some(a=>a.id==='MV-003')?'MV-003':state.module==='mobility'&&va.some(a=>a.id==='AV-005')?'AV-005':state.module==='ai'&&D.aiDetections.some(d=>d.id===state.ai.detectionId&&va.some(a=>a.id===d.assetId))?D.aiDetections.find(d=>d.id===state.ai.detectionId).assetId:state.module==='incidents'&&D.incidentCases.some(x=>x.id===state.incident.caseId)?D.incidentCases.find(x=>x.id===state.incident.caseId).responders.find(id=>va.some(a=>a.id===id))||va[0]?.id:va.some(a=>a.id==='UAV-017')?'UAV-017':va[0]?.id||null;if(state.module==='fleet')state.fleet.selectedId=state.selectedAssetId;if(state.module==='live-map'){state.liveMap.objectType='asset';state.liveMap.objectId=state.selectedAssetId}logAudit(`${t('roleChange')}: ${old} → ${local(user().name)}`,'Recorded');renderAll();toast(t('identityChanged'),`${local(user().name)} · ${local(user().role)}`,'green');setTimeout(closeDrawer,180);
  }
  function scenarioTick(){
    if(document.hidden)return;
    const now=new Date(Date.UTC(2026,8,14,4,0,state.scenarioSecond));const gst=new Date(now.getTime()+4*3600000);
    $("#dateLabel").textContent=new Intl.DateTimeFormat(state.lang==='ar'?'ar-AE':'en-GB',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'}).format(gst);
    $("#clockLabel").textContent=gst.toISOString().slice(11,19);
    if(!state.playing)return;state.scenarioSecond=(state.scenarioSecond+1)%70;
    D.scenarioEvents.forEach(e=>{if(state.scenarioSecond===e.at&&!state.notified.has(e.at)){state.notified.add(e.at);toast(t('simulationRunning'),local(e.label),e.tone);if(e.at===52)$("#notificationCount").textContent='6'}});
    if(state.scenarioSecond===0)state.notified.clear();
    if(state.scenarioSecond%3===0)updateLiveMarkerPositions();
  }
  function isMapFullscreen(){const panel=$("#mapPanel");return !!panel&&(document.fullscreenElement===document.documentElement||panel.classList.contains('full-map'))}
  function updateFullscreenControl(active=isMapFullscreen()){
    const button=$("#expandMapBtn");if(!button)return;button.classList.toggle('active',active);button.setAttribute('aria-label',t(active?'exitFullscreen':'enterFullscreen'));const span=button.querySelector('span');if(span){span.dataset.i18n=active?'exitFullscreen':'enterFullscreen';span.textContent=t(active?'exitFullscreen':'enterFullscreen')}
  }
  function resizeMapSoon(){setTimeout(()=>{renderMap();window.ACC_ARCGIS_MAP&&window.ACC_ARCGIS_MAP.resize()},260)}
  async function toggleMapFullscreen(){
    const panel=$("#mapPanel");if(!panel)return;
    if(document.fullscreenElement===document.documentElement){try{await document.exitFullscreen()}catch(e){}return}
    if(panel.classList.contains('full-map')){panel.classList.remove('full-map');panel.dataset.nativeFullscreen='0';updateFullscreenControl(false);resizeMapSoon();return}
    panel.classList.add('full-map');updateFullscreenControl(true);
    if(document.documentElement.requestFullscreen){try{panel.dataset.nativeFullscreen='1';await document.documentElement.requestFullscreen()}catch(e){panel.dataset.nativeFullscreen='0'}}else panel.dataset.nativeFullscreen='0';
    resizeMapSoon();
  }
  document.addEventListener('fullscreenchange',()=>{const panel=$("#mapPanel"),active=document.fullscreenElement===document.documentElement;document.body.classList.toggle('native-map-fullscreen',active);if(!active&&panel?.dataset.nativeFullscreen==='1'){panel.classList.remove('full-map');panel.dataset.nativeFullscreen='0'}if(active)panel.classList.add('full-map');updateFullscreenControl(active||panel?.classList.contains('full-map'));resizeMapSoon()});

  document.addEventListener('click',e=>{
    const target=e.target.closest('button,[data-incident],[data-kpi]');if(!target)return;
    if(target.id==='demoGuideBtn'){openDemoGuide();return}
    if(target.dataset.guideModule){if(target.getAttribute('aria-disabled')==='true'){denied();return}const module=target.dataset.guideModule;closeModal();setTimeout(()=>activatePresentationView({module}),180);return}
    if(target.dataset.guideAction==='roles'){closeModal();setTimeout(openDrawer,180);return}
    if(target.hasAttribute('data-presentation-reset-confirm')){confirmFullReset();return}
    if(target.hasAttribute('data-presentation-reset-now')){restartFullDemo();return}
    if(target.id==='themeBtn'){state.theme=state.theme==='dark'?'light':'dark';persist('theme',state.theme);applyTheme();renderLocalMap();return}
    if(target.id==='langBtn'){state.lang=state.lang==='en'?'ar':'en';persist('lang',state.lang);renderAll();return}
    if(target.dataset.fontSize){state.fontSize=target.dataset.fontSize;persist('fontSizeV029',state.fontSize);applyFontSize();requestAnimationFrame(()=>window.ACC_ARCGIS_MAP?.resize());return}
    if(target.id==='userButton'){openDrawer();return}
    if(target.id==='notificationBtn'){openNotifications();return}
    if(target.matches('[data-close-drawer]')){closeDrawer();return}
    if(target.matches('[data-close-modal]')){closeModal();return}
    if(target.dataset.user){switchUser(target.dataset.user);return}
    if(target.dataset.module){const n=D.nav.find(x=>x.id===target.dataset.module);if(!user().nav.includes(n.id))denied();else if(["command","live-map","drone-ops","robotics","maritime","mobility","ai","incidents","fleet","digital-twin","analytics","security","missions","reports","settings"].includes(n.id))switchModule(n.id);else openPending(n);return}
    if(missionOps?.handleClick(target))return;
    if(reportsOps?.handleClick(target))return;
    if(settingsOps?.handleClick(target))return;
    if(analyticsOps?.handleClick(target))return;
    if(securityOps?.handleClick(target))return;
    if(liveMapOps?.handleClick(target))return;
    if(fleetOps?.handleClick(target))return;
    if(twinOps?.handleClick(target))return;
    if(incidentOps?.handleClick(target))return;
    if(aiOps?.handleClick(target))return;
    if(mobilityOps?.handleClick(target))return;
    if(droneOps?.handleClick(target))return;
    if(target.dataset.incident){openIncident(target.dataset.incident);return}
    if(target.dataset.incidentMarker){openIncident(target.dataset.incidentMarker);return}
    if(target.dataset.assetMarker){if(state.module==='live-map')liveMapOps?.chooseAsset(target.dataset.assetMarker,false);else if(state.module==='fleet')fleetOps?.choose(target.dataset.assetMarker,false);else if(state.module==='robotics')roboticsOps?.choose(target.dataset.assetMarker,false);else if(state.module==='drone-ops')droneOps?.choose(target.dataset.assetMarker,false);else if(state.module==='maritime')maritimeOps?.choose(target.dataset.assetMarker,false);else if(state.module==='mobility')mobilityOps?.choose(target.dataset.assetMarker,false);else if(state.module==='ai'){const d=D.aiDetections.find(x=>x.assetId===target.dataset.assetMarker);if(d)aiOps?.chooseDetection(d.id,false);else openAsset(target.dataset.assetMarker)}else if(state.module==='incidents'){const x=D.incidentCases.find(i=>i.responders.includes(target.dataset.assetMarker));if(x)incidentOps?.choose(x.id,false);else openAsset(target.dataset.assetMarker)}else openAsset(target.dataset.assetMarker);return}
    if(target.dataset.aiEdge){aiOps?.openMapContext({type:'ai-edge',id:target.dataset.aiEdge});return}
    if(target.dataset.maritimePort){maritimeOps?.openMapContext({type:'maritime-port',id:target.dataset.maritimePort});return}
    if(target.dataset.mobilityHub){mobilityOps?.openMapContext({type:'mobility-hub',id:target.dataset.mobilityHub});return}
    if(target.dataset.openAsset){closeModal();setTimeout(()=>openAsset(target.dataset.openAsset),190);return}
    if(target.dataset.openIncident){closeModal();setTimeout(()=>openIncident(target.dataset.openIncident),190);return}
    if(target.dataset.kpi!==undefined){openKpi(target.dataset.kpi);return}
    if(target.dataset.mapMode){state.mapMode=target.dataset.mapMode;if(state.mapMode==='3d'&&state.map.pitch<25){state.map.pitch=68;state.map.bearing=338}persist('mapModeV017',state.mapMode);logAudit(`${t('mapLayerChanged')}: ${state.mapMode}`);renderMapModes();if(window.ACC_ARCGIS_MAP&&window.ACC_ARCGIS_MAP.isActive())window.ACC_ARCGIS_MAP.setMode(state.mapMode);else renderMap();return}
    if(target.dataset.mapPlace){if(window.ACC_ARCGIS_MAP&&window.ACC_ARCGIS_MAP.isActive())window.ACC_ARCGIS_MAP.flyToPlace(target.dataset.mapPlace);else{const p={uae:[24.48,54.20,7.05],abudhabi:[24.4539,54.3773,9.4],yas:[24.4959,54.6031,10],dubai:[25.1972,55.2744,9.4]}[target.dataset.mapPlace];if(p){state.map.lat=p[0];state.map.lon=p[1];state.map.zoom=p[2];renderMap()}}return}
    if(target.dataset.mapCamera){const c=target.dataset.mapCamera;if(window.ACC_ARCGIS_MAP&&window.ACC_ARCGIS_MAP.isActive()){window.ACC_ARCGIS_MAP.cameraAction(c);return}if(c==='rotate-left')state.map.bearing-=15;if(c==='rotate-right')state.map.bearing+=15;if(c==='tilt-up')state.map.pitch=clamp(state.map.pitch+7,0,78);if(c==='tilt-down')state.map.pitch=clamp(state.map.pitch-7,0,78);if(c==='north'||c==='top-down')Object.assign(state.map,{bearing:0,pitch:c==='top-down'?0:52});if(c==='oblique')state.map.pitch=68;applyMapCamera();return}
    if(target.dataset.layer){state.map.layers[target.dataset.layer]=!state.map.layers[target.dataset.layer];logAudit(`${t('mapLayerChanged')}: ${target.dataset.layer}`);renderLayerPanel();renderMapOverlays();return}
    if(target.dataset.mapSetting){const key=target.dataset.mapSetting;state.map.cartography[key]=!state.map.cartography[key];logAudit(`${t('mapLayerChanged')}: ${key}`);renderLayerPanel();if(window.ACC_ARCGIS_MAP&&window.ACC_ARCGIS_MAP.isActive())window.ACC_ARCGIS_MAP.applySceneSettings({layers:state.map.layers,cartography:state.map.cartography});return}
    if(target.dataset.assetStyle){state.map.cartography.assetStyle=target.dataset.assetStyle;persist('assetStyleV017',target.dataset.assetStyle);renderLayerPanel();renderMapOverlays();logAudit(`${t('assetSymbology')}: ${target.dataset.assetStyle}`);return}
    if(target.dataset.mapQuality){state.map.cartography.quality=target.dataset.mapQuality;persist('mapQualityV017',target.dataset.mapQuality);renderLayerPanel();window.ACC_ARCGIS_MAP?.setQuality(target.dataset.mapQuality);logAudit(`${t('renderingQuality')}: ${t(target.dataset.mapQuality==='high'?'highFidelity':'balanced')}`);return}
    if(target.dataset.buildingStyle){state.map.cartography.buildingStyle=target.dataset.buildingStyle;renderLayerPanel();if(window.ACC_ARCGIS_MAP&&window.ACC_ARCGIS_MAP.isActive())window.ACC_ARCGIS_MAP.setBuildingStyle(target.dataset.buildingStyle);logAudit(`${t('buildingAppearance')}: ${target.dataset.buildingStyle}`);return}
    if(target.hasAttribute('data-close-layers')){$('#mapLayerPanel').classList.remove('open');return}
    if(target.dataset.mapControl){const c=target.dataset.mapControl;if(c==='layers'){$('#mapLayerPanel').classList.toggle('open');return}if(window.ACC_ARCGIS_MAP&&window.ACC_ARCGIS_MAP.isActive()){window.ACC_ARCGIS_MAP.cameraAction(c);return}if(c==='zoom-in')state.map.zoom=clamp(state.map.zoom+.5,6.4,17);if(c==='zoom-out')state.map.zoom=clamp(state.map.zoom-.5,6.4,17);if(c==='fit')Object.assign(state.map,{lat:24.48,lon:54.20,zoom:7.05,bearing:state.mapMode==='3d'?-16:0,pitch:52});renderMap();return}
    if(target.id==='expandMapBtn'){toggleMapFullscreen();return}
    if(target.dataset.feedDomain){openDomainFeed(target.dataset.feedDomain);return}
    if(target.id==='playPauseBtn'){state.playing=!state.playing;target.innerHTML=icon(state.playing?'pause':'play')+`<span>${t(state.playing?'pause':'resume')}</span>`;toast(state.playing?t('simulationRunning'):t('simulationPaused'),local(D.scenarioEvents[Math.min(D.scenarioEvents.length-1,Math.floor(state.scenarioSecond/12))].label));return}
    if(target.id==='resetBtn'&&state.module==='digital-twin'){state.scenarioSecond=0;state.notified.clear();state.twin.scenarioActive=false;state.twin.weather='clear';state.twin.hour=16;window.ACC_ARCGIS_MAP?.clearAnalysis();window.ACC_ARCGIS_MAP?.setWeather('clear');const d=D.twinDistricts.find(x=>x.id===state.twin.districtId)||D.twinDistricts[0];renderAll();window.ACC_ARCGIS_MAP?.flyTo(d);toast(t('reset'),t('simulationReady'),'green');return}
    if(target.id==='resetBtn'){state.scenarioSecond=0;state.notified.clear();if(['live-map','drone-ops','robotics','maritime','mobility','ai','incidents','fleet'].includes(state.module)){let a=state.module==='live-map'?liveMapOps?.selected():state.module==='fleet'?fleetOps?.selected():state.module==='drone-ops'?droneOps?.selected():state.module==='robotics'?roboticsOps?.selected():state.module==='maritime'?maritimeOps?.selected():state.module==='mobility'?mobilityOps?.selected():state.module==='ai'?aiOps?.selectedDetection():D.incidents.find(x=>x.id===incidentOps?.selected()?.id);if(a&&Number.isFinite(a.lat)){const z=state.module==='live-map'?13.4:state.module==='fleet'?15.4:state.module==='robotics'||state.module==='mobility'?16.8:state.module==='maritime'?15.9:state.module==='ai'?15.4:state.module==='incidents'?15.6:15.7,tilt=state.module==='robotics'?72:state.module==='mobility'?71:state.module==='maritime'?68:state.module==='ai'?65:state.module==='incidents'?66:69;Object.assign(state.map,{lat:a.lat,lon:a.lon,zoom:z,pitch:tilt,bearing:a.heading||325});renderMap();window.ACC_ARCGIS_MAP?.flyTo({lat:a.lat,lon:a.lon,zoom:z,tilt,heading:a.heading||325})}else window.ACC_ARCGIS_MAP?.flyToPlace('uae')}else{Object.assign(state.map,{lat:24.4800,lon:54.3810,zoom:14.65,pitch:67,bearing:338});renderMap();if(window.ACC_ARCGIS_MAP&&window.ACC_ARCGIS_MAP.isActive())window.ACC_ARCGIS_MAP.flyToPlace('abudhabi')}toast(t('reset'),t('simulationRunning'),'green');return}
    if(target.dataset.assetAction){const a=selectedAsset();if(target.dataset.assetAction==='follow')followAsset(a.id);else if(target.dataset.assetAction==='view'||target.dataset.assetAction==='more')openAsset(a.id);else commandFlow('assign',a);return}
    if(target.dataset.command){commandFlow(target.dataset.command,selectedAsset());return}
    if(target.dataset.modalCommand){commandFlow(target.dataset.modalCommand,selectedAsset());return}
    if(target.dataset.followAsset){closeModal();setTimeout(()=>followAsset(target.dataset.followAsset),180);return}
    if(target.dataset.incidentAction){const action=target.dataset.incidentAction==='escalate'?'emergency':target.dataset.incidentAction==='assign'?'dispatch':'acknowledge';closeModal();setTimeout(()=>commandFlow(action,selectedAsset()),180);return}
    if(target.dataset.confirmCommand){completeCommand(target.dataset.confirmCommand,target.dataset.approval==='true');return}
    if(target.dataset.approvalDecision){decideApproval(target.dataset.approvalId,target.dataset.approvalDecision);return}
    if(target.dataset.action==='access-matrix'){openAccessMatrix();return}
    if(target.dataset.action==='audit-trail'){openAudit();return}
    if(target.dataset.action==='all-incidents'){modal(t('incidentQueue'),t('filteredByRole'),`<div class="search-results">${visibleIncidents().map(i=>`<button class="search-result" data-open-incident="${i.id}">${icon('alert')}<span><b>${i.id} · ${esc(local(i.title))}</b><small>${esc(local(i.location))}</small></span><span class="severity-badge ${i.severity}">${t(i.severity)}</span></button>`).join('')}</div>`);return}
    if(target.dataset.export!==undefined){if(has('export')){logAudit(t('exportRequested'),'Recorded');toast(t('exportRequested'),t('exportQueued'),'green')}else denied();return}
    if(target.dataset.region){state.search=target.dataset.region;renderAll();return}
    if(target.hasAttribute('data-camera-marker')){if(has('camera'))openAsset(selectedAsset()?.id);else denied();return}
  });
  let sceneSettingsFrame=0;
  document.addEventListener('input',e=>{
    if(missionOps?.handleInput(e.target))return;
    if(reportsOps?.handleInput(e.target))return;
    if(settingsOps?.handleInput(e.target))return;
    if(analyticsOps?.handleInput(e.target))return;
    if(securityOps?.handleInput(e.target))return;
    if(liveMapOps?.handleInput(e.target))return;
    if(fleetOps?.handleInput(e.target))return;
    if(twinOps?.handleInput(e.target))return;
    if(incidentOps?.handleInput(e.target))return;
    if(aiOps?.handleInput(e.target))return;
    if(droneOps?.handleInput(e.target))return;
    if(mobilityOps?.handleInput(e.target))return;
    if(!e.target.matches('[data-building-opacity]'))return;
    state.map.cartography.buildingOpacity=Number(e.target.value)/100;
    const label=e.target.closest('.opacity-control')?.querySelector('b');if(label)label.textContent=e.target.value+'%';
    if(window.ACC_ARCGIS_MAP&&window.ACC_ARCGIS_MAP.isActive()){cancelAnimationFrame(sceneSettingsFrame);sceneSettingsFrame=requestAnimationFrame(()=>window.ACC_ARCGIS_MAP.applySceneSettings({layers:state.map.layers,cartography:state.map.cartography}))}
  });
  $("#drawerScrim").addEventListener('click',closeDrawer);
  $("#modalRoot").addEventListener('click',e=>{if(e.target===$("#modalRoot"))closeModal()});
  document.addEventListener('keydown',e=>{
    const editing=e.target instanceof HTMLElement&&['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName);
    if(e.key==='Escape'){if($('#modalRoot').classList.contains('open'))closeModal();else if($('#roleDrawer').classList.contains('open'))closeDrawer();else if(!document.fullscreenElement&&$('#mapPanel').classList.contains('full-map')){$('#mapPanel').classList.remove('full-map');updateFullscreenControl(false);resizeMapSoon()}return}
    if(!editing&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&e.key.toLowerCase()==='g'){e.preventDefault();openDemoGuide();return}
    if(!editing&&e.altKey&&['ArrowLeft','ArrowRight'].includes(e.key)){
      e.preventDefault();const allowed=D.nav.filter(n=>user().nav.includes(n.id)),index=Math.max(0,allowed.findIndex(n=>n.id===state.module));const direction=e.key==='ArrowRight'?1:-1,next=allowed[(index+direction+allowed.length)%allowed.length];if(next)switchModule(next.id);
    }
  });
  $("#globalSearch").addEventListener('keydown',e=>{if(e.key==='Enter')globalSearch(e.currentTarget.value)});
  $("#mapSearch").addEventListener('keydown',e=>{if(e.key==='Enter'){
    const q=e.currentTarget.value.trim().toLowerCase();
    if(state.module==='live-map'){liveMapOps?.search(q);return}
    if(state.module==='fleet'){fleetOps?.search(q);return}
    if(state.module==='digital-twin'){twinOps?.search(q);return}
    if(state.module==='drone-ops'){
      const a=scopedAssets().filter(x=>x.type==='drone').find(x=>(x.id+' '+x.location+' '+x.model+' '+x.mission).toLowerCase().includes(q));
      if(a)droneOps?.choose(a.id,true);else toast(t('noResults'),e.currentTarget.value,'amber');return;
    }
    if(state.module==='mobility'){
      const a=scopedAssets().filter(x=>x.type==='vehicle').find(x=>(x.id+' '+x.location+' '+x.model+' '+x.mission).toLowerCase().includes(q));
      if(a)mobilityOps?.choose(a.id,true);else toast(t('noResults'),e.currentTarget.value,'amber');return;
    }
    if(state.module==='ai'){
      const d=D.aiDetections.filter(x=>scopedAssets().some(a=>a.id===x.assetId)).find(x=>(x.id+' '+x.modelId+' '+local(x.class)+' '+local(x.location)).toLowerCase().includes(q));
      if(d)aiOps?.chooseDetection(d.id,true);else toast(t('noResults'),e.currentTarget.value,'amber');return;
    }
    if(state.module==='incidents'){
      const x=D.incidentCases.find(c=>{const i=D.incidents.find(z=>z.id===c.id);return(c.id+' '+local(c.category)+' '+local(i?.title)+' '+local(i?.location)+' '+c.responders.join(' ')).toLowerCase().includes(q)});
      if(x)incidentOps?.choose(x.id,true);else toast(t('noResults'),e.currentTarget.value,'amber');return;
    }
    const a=visibleAssets().find(x=>(x.id+' '+x.location+' '+x.model).toLowerCase().includes(q)),i=visibleIncidents().find(x=>(x.id+' '+local(x.title)+' '+local(x.location)).toLowerCase().includes(q));if(a)followAsset(a.id);else if(i){state.map.lat=i.lat;state.map.lon=i.lon;state.map.zoom=16;renderMap();if(window.ACC_ARCGIS_MAP&&window.ACC_ARCGIS_MAP.isActive())window.ACC_ARCGIS_MAP.flyTo({lat:i.lat,lon:i.lon,zoom:16,tilt:66,heading:325});openIncident(i.id)}else toast(t('noResults'),e.currentTarget.value,'amber')
  }});
  const vp=$("#mapViewport");let drag=null;
  vp.addEventListener('pointerdown',e=>{if((window.ACC_ARCGIS_MAP&&window.ACC_ARCGIS_MAP.isActive())||e.target.closest('button'))return;drag={x:e.clientX,y:e.clientY,lat:state.map.lat,lon:state.map.lon,pitch:state.map.pitch,bearing:state.map.bearing};vp.setPointerCapture(e.pointerId);vp.classList.add('dragging')});
  vp.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(state.mapMode==='3d'&&!e.shiftKey){state.map.bearing=drag.bearing+dx*.24;state.map.pitch=clamp(drag.pitch-dy*.16,25,68);applyMapCamera();return}const c=world(drag.lat,drag.lon,state.map.zoom),p=unworld(c.x-dx,c.y-dy,state.map.zoom);state.map.lat=clamp(p.lat,20,29);state.map.lon=clamp(p.lon,49,59);renderLocalMap();renderMapOverlays()});
  const endDrag=()=>{drag=null;vp.classList.remove('dragging')};vp.addEventListener('pointerup',endDrag);vp.addEventListener('pointercancel',endDrag);
  vp.addEventListener('wheel',e=>{if(window.ACC_ARCGIS_MAP&&window.ACC_ARCGIS_MAP.isActive())return;e.preventDefault();state.map.zoom=clamp(state.map.zoom+(e.deltaY<0?.35:-.35),6.4,17);renderMap()},{passive:false});
  let resizeFrame=0;
  window.addEventListener('resize',()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(()=>{renderMap();window.ACC_ARCGIS_MAP&&window.ACC_ARCGIS_MAP.resize()})});
  droneOps=window.ACC_DRONE_OPS.create({
    D,state,t,local,esc,icon,user,has,scopedAssets,statusText,locationText,missionText,
    command:commandFlow,modal,toast,denied,logAudit,openIncident,syncMap:renderMapOverlays,largeMiniChart,
    flyDrone:a=>{
      Object.assign(state.map,{lat:a.lat,lon:a.lon,zoom:15.7,pitch:69,bearing:a.heading||325});
      renderMap();
      if(window.ACC_ARCGIS_MAP?.isActive())window.ACC_ARCGIS_MAP.flyTo({lat:a.lat,lon:a.lon,zoom:15.7,tilt:69,heading:a.heading||325});
    }
  });
  roboticsOps=window.ACC_ROBOTICS.create({D,state,t,local,esc,icon,user,has,scopedAssets,statusText,locationText,missionText,describeScope,modal,toast,denied,logAudit,openIncident,syncMap:renderMapOverlays});
  maritimeOps=window.ACC_MARITIME.create({D,state,t,local,esc,icon,user,has,scopedAssets,statusText,locationText,missionText,describeScope,modal,toast,denied,logAudit,openIncident,syncMap:renderMapOverlays});
  mobilityOps=window.ACC_MOBILITY.create({D,state,t,local,esc,icon,user,has,scopedAssets,statusText,locationText,missionText,describeScope,modal,toast,denied,logAudit,openIncident,syncMap:renderMapOverlays});
  aiOps=window.ACC_AI_INTELLIGENCE.create({D,state,t,local,esc,icon,user,has,scopedAssets,statusText,locationText,missionText,describeScope,modal,toast,denied,logAudit,openIncident,syncMap:renderMapOverlays});
  incidentOps=window.ACC_INCIDENTS.create({D,state,t,local,esc,icon,user,has,scopedAssets,statusText,locationText,missionText,describeScope,modal,toast,denied,logAudit,openIncident,syncMap:renderMapOverlays});
  twinOps=window.ACC_DIGITAL_TWIN.create({D,state,t,local,esc,icon,user,has,scopedAssets,statusText,locationText,missionText,describeScope,modal,toast,denied,logAudit,openIncident,syncMap:renderMapOverlays});
  liveMapOps=window.ACC_LIVE_MAP.create({D,state,t,local,esc,icon,user,has,scopedAssets,statusText,locationText,missionText,describeScope,modal,toast,denied,logAudit,openIncident,syncMap:renderMapOverlays});
  fleetOps=window.ACC_FLEET.create({D,state,t,local,esc,icon,user,has,scopedAssets,statusText,locationText,missionText,describeScope,modal,toast,denied,logAudit,openIncident,syncMap:renderMapOverlays});
  analyticsOps=window.ACC_ANALYTICS.create({D,state,t,local,esc,icon,user,has,scopedAssets,statusText,locationText,missionText,describeScope,modal,toast,denied,logAudit,openIncident,syncMap:renderMapOverlays});
  securityOps=window.ACC_SECURITY.create({D,state,t,local,esc,icon,user,has,scopedAssets,statusText,locationText,missionText,describeScope,modal,toast,denied,logAudit,openIncident,syncMap:renderMapOverlays});
  missionOps=window.ACC_MISSIONS.create({D,state,t,local,esc,icon,user,has,scopedAssets,statusText,locationText,missionText,describeScope,modal,toast,denied,logAudit,openIncident,syncMap:renderMapOverlays});
  reportsOps=window.ACC_REPORTS.create({D,state,t,local,esc,icon,user,has,scopedAssets,statusText,locationText,missionText,describeScope,modal,toast,denied,logAudit,openIncident,syncMap:renderMapOverlays});
  settingsOps=window.ACC_SETTINGS.create({D,state,t,local,esc,icon,user,has,scopedAssets,statusText,locationText,missionText,describeScope,modal,toast,denied,logAudit,openIncident,syncMap:renderMapOverlays});
  if(state.module==='missions'){
    state.commandMapLayers={...state.map.layers};Object.assign(state.map.layers,state.missions.mapLayers);
    const m=missionOps.selected();if(m){state.selectedAssetId=m.assets[0];Object.assign(state.map,{lat:m.lat,lon:m.lon,zoom:15.5,pitch:67,bearing:325})}
  }else if(state.module==='live-map'){
    state.commandMapLayers={...state.map.layers};Object.assign(state.map.layers,state.liveMap.mapLayers);
    const a=liveMapOps.selected();if(a&&Number.isFinite(a.lat)){state.selectedAssetId=a.id;Object.assign(state.map,{lat:a.lat,lon:a.lon,zoom:13.4,pitch:64,bearing:a.heading||325})}
  }else if(state.module==='fleet'){
    state.commandMapLayers={...state.map.layers};Object.assign(state.map.layers,state.fleet.mapLayers);
    const a=fleetOps.selected();if(a){state.selectedAssetId=a.id;Object.assign(state.map,{lat:a.lat,lon:a.lon,zoom:15.4,pitch:66,bearing:a.heading||325})}
  }else if(state.module==='drone-ops'){
    state.commandMapLayers={...state.map.layers};Object.assign(state.map.layers,state.drone.mapLayers);
    const a=droneOps.selected();if(a){state.selectedAssetId=a.id;Object.assign(state.map,{lat:a.lat,lon:a.lon,zoom:15.7,pitch:69,bearing:a.heading||325})}
  }else if(state.module==='robotics'){
    state.commandMapLayers={...state.map.layers};Object.assign(state.map.layers,state.robotics.mapLayers);
    const a=roboticsOps.selected();if(a){state.selectedAssetId=a.id;Object.assign(state.map,{lat:a.lat,lon:a.lon,zoom:16.8,pitch:72,bearing:a.heading||315})}
  }else if(state.module==='maritime'){
    state.commandMapLayers={...state.map.layers};Object.assign(state.map.layers,state.maritime.mapLayers);
    const a=maritimeOps.selected();if(a){state.selectedAssetId=a.id;Object.assign(state.map,{lat:a.lat,lon:a.lon,zoom:15.9,pitch:68,bearing:a.heading||310})}
  }else if(state.module==='mobility'){
    state.commandMapLayers={...state.map.layers};Object.assign(state.map.layers,state.mobility.mapLayers);
    const a=mobilityOps.selected();if(a){state.selectedAssetId=a.id;Object.assign(state.map,{lat:a.lat,lon:a.lon,zoom:16.8,pitch:71,bearing:a.heading||315})}
  }else if(state.module==='ai'){
    state.commandMapLayers={...state.map.layers};Object.assign(state.map.layers,state.ai.mapLayers);
    const a=aiOps.selectedDetection();if(a){state.selectedAssetId=a.assetId;Object.assign(state.map,{lat:a.lat,lon:a.lon,zoom:15.4,pitch:65,bearing:325})}
  }else if(state.module==='incidents'){
    state.commandMapLayers={...state.map.layers};Object.assign(state.map.layers,state.incident.mapLayers);
    const s=incidentOps.selected(),a=D.incidents.find(x=>x.id===s?.id);if(a){state.selectedIncidentId=a.id;state.selectedAssetId=s.responders.find(x=>D.assets.some(z=>z.id===x))||state.selectedAssetId;Object.assign(state.map,{lat:a.lat,lon:a.lon,zoom:15.6,pitch:66,bearing:324})}
  }else if(state.module==='digital-twin'){
    state.commandMapLayers={...state.map.layers};Object.assign(state.map.layers,state.twin.mapLayers);
    const d=D.twinDistricts.find(x=>x.id===state.twin.districtId)||D.twinDistricts[0];Object.assign(state.map,{lat:d.lat,lon:d.lon,zoom:d.zoom,pitch:d.tilt,bearing:d.heading})
  }
  applyLanguage();applyTheme();renderAll();initializeLiveMap();scenarioTick();
  const presentationApi=Object.freeze({
    version:D.version,
    open:options=>activatePresentationView(options||{}),
    reset:()=>restartFullDemo(),
    guide:()=>{openDemoGuide();return presentationSnapshot()},
    state:()=>presentationSnapshot()
  });
  window.ACC_PRESENTATION_API=presentationApi;
  window.addEventListener('message',event=>{
    if(!event.source||(event.source!==window.parent&&event.source!==window.opener))return;
    const message=event.data;if(!message||message.type!=='ACC_PRESENTATION')return;
    let payload;
    if(message.action==='open')payload=presentationApi.open(message.options||{});
    else if(message.action==='guide')payload=presentationApi.guide();
    else if(message.action==='state')payload=presentationApi.state();
    else if(message.action==='reset'){presentationApi.reset();return}
    else return;
    try{event.source?.postMessage({type:'ACC_PRESENTATION_RESPONSE',requestId:message.requestId||null,payload},event.origin==='null'?'*':event.origin)}catch(e){}
  });
  const readyDetail=presentationSnapshot();document.dispatchEvent(new CustomEvent('acc:ready',{detail:readyDetail}));
  try{if(window.parent!==window)window.parent.postMessage({type:'ACC_PRESENTATION_READY',payload:readyDetail},'*');if(window.opener)window.opener.postMessage({type:'ACC_PRESENTATION_READY',payload:readyDetail},'*')}catch(e){}
  const scenarioTimer=setInterval(scenarioTick,1000);
  document.addEventListener('visibilitychange',()=>{const suspended=document.hidden||['analytics','security','reports','settings'].includes(state.module);document.body.classList.toggle('page-suspended',document.hidden);window.ACC_ARCGIS_MAP?.setSuspended(suspended);if(!suspended)scenarioTick()});
  window.addEventListener('pagehide',e=>{window.ACC_ARCGIS_MAP?.setSuspended(true);if(!e.persisted){clearInterval(scenarioTimer);window.ACC_ARCGIS_MAP?.destroy()}});
  window.addEventListener('pageshow',e=>{if(e.persisted){document.body.classList.remove('page-suspended');window.ACC_ARCGIS_MAP?.setSuspended(false);scenarioTick()}});
})();
