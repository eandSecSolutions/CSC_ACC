(function(){
  "use strict";

  const api={ready:false,failed:false,suspended:false,mode:"3d",view:null,options:null,data:null,orbiting:false};
  const places={
    uae:{center:[54.55,24.25],zoom:7.15,tilt:22,heading:0},
    abudhabi:{center:[54.3810,24.4800],zoom:14.65,tilt:67,heading:338},
    yas:{center:[54.6031,24.4959],zoom:15.3,tilt:66,heading:315},
    dubai:{center:[55.2744,25.1972],zoom:15.55,tilt:70,heading:330}
  };
  const buildingStyles={
    graphite:{color:[29,49,59,0.96],edge:[87,163,182,0.7]},
    cyan:{color:[13,158,190,0.94],edge:[139,239,255,0.9]},
    amber:{color:[207,139,38,0.94],edge:[255,218,132,0.9]},
    red:{color:[188,23,48,0.94],edge:[255,126,143,0.9]}
  };
  // Presentation-scaled so autonomous devices remain recognizable at command-camera heights.
  const modelDimensions={drone:{width:34,height:8,depth:34},vehicle:{width:10,height:7,depth:18},marine:{width:14,height:9,depth:38},robot:{width:8,height:10,depth:9}};
  const silhouettePaths={
    drone:'<circle cx="11" cy="11" r="6"/><circle cx="53" cy="11" r="6"/><circle cx="11" cy="53" r="6"/><circle cx="53" cy="53" r="6"/><path d="M15 15l12 12m22-12L37 27M15 49l12-12m22 12L37 37"/><path d="M25 25h14l5 7-5 7H25l-5-7z"/><path d="M29 39h6v10h-6z"/>',
    vehicle:'<path d="M20 8h24l8 11v29l-7 8H19l-7-8V19z"/><path d="M20 18h24l4 9H16zM17 32h30v14H17z"/><path d="M8 19h7v12H8zm41 0h7v12h-7zM8 39h7v12H8zm41 0h7v12h-7z"/>',
    marine:'<path d="M32 4 48 27l-5 27-11 7-11-7-5-27z"/><path d="M24 27h16l-2 17H26zM29 14h6v13h-6z"/><path d="M32 8v38"/>',
    robot:'<rect x="15" y="14" width="34" height="34" rx="7"/><rect x="20" y="21" width="24" height="15" rx="3"/><circle cx="27" cy="28" r="3"/><circle cx="37" cy="28" r="3"/><path d="M32 14V7m-7 0h14M10 20h6v25h-6zm38 0h6v25h-6zM23 48v8m18-8v8"/>'
  };
  let C={},layers={},naturalRenderer=null,orbitToken=0,pulseTimer=null,pulseOn=false,lastSymbolBucket="",currentBuildingStyle="",modelUrls={},iconUrls={},activeAnalysis=null,weatherToken=0;
  const signatures={assets:"",incidents:"",noFly:"",routes:"",context:"",twin:"",scene:"",movement:-1,count:""};
  const metrics={syncCalls:0,assetRebuilds:0,incidentRebuilds:0,zoneRebuilds:0,routeRebuilds:0,contextRebuilds:0,twinRebuilds:0,positionUpdates:0};

  function emit(name,payload){try{api.options&&api.options[name]&&api.options[name](payload)}catch(e){console.warn("Map callback failed",name,e)}}
  function fail(error){api.failed=true;api.ready=false;console.error("ArcGIS map engine failed",error);emit("onFailure",error)}
  function ensureData(){if(api.data&&api.ready&&!api.suspended)sync(api.data)}
  function signature(value){return JSON.stringify(value)}
  function symbolBucket(){return(api.data?.cartography?.assetStyle||"auto")+":"+(api.mode==="tactical"||(api.view?.zoom||0)<11.25?"2d":"3d")+":"+((api.view?.zoom||0)>=13.15?"labels":"clean")}
  function assetSignature(data){return signature([data.layers.assets,data.layers.air,data.layers.land,data.layers.sea,data.visibility,data.selectedAssetId,data.droneMode,data.robotMode,data.maritimeMode,data.mobilityMode,data.aiMode,data.incidentMode,data.missionMode,data.twinMode,data.cartography?.assetStyle||"auto",symbolBucket(),data.assets.map(a=>[a.id,a.type,a.status,a.region,a.lat,a.lon,a.altitude,a.heading])])}
  function incidentSignature(data){return signature([data.layers.incidents,data.layers.zones,data.visibility,data.selectedIncidentId,data.incidents.map(i=>[i.id,i.lat,i.lon,i.severity,i.region])])}
  function noFlySignature(data){return signature([data.layers.zones,data.robotMode,data.maritimeMode,data.mobilityMode,data.aiMode,data.incidentMode,data.selectedDetectionId,data.selectedCaseId,(data.noFlyZones||[]).map(x=>[x.id,x.lat,x.lon,x.radiusKm,x.severity]),(data.robotZones||[]).map(x=>[x.id,x.lat,x.lon,x.radiusKm,x.severity]),(data.maritimeZones||[]).map(x=>[x.id,x.lat,x.lon,x.radiusKm,x.severity,x.kind]),(data.mobilityZones||[]).map(x=>[x.id,x.lat,x.lon,x.radiusKm,x.severity,x.kind]),(data.aiDetections||[]).map(x=>[x.id,x.lat,x.lon,x.confidence,x.severity]),(data.incidentCases||[]).map(x=>[x.id,x.level,x.phase,x.progress])])}
  function routeSignature(data){return signature([data.layers.corridors,data.droneMode,data.robotMode,data.maritimeMode,data.mobilityMode,data.aiMode,data.incidentMode,data.missionMode,data.selectedCaseId,data.visibility,data.selectedAssetId,data.assets.map(a=>[a.id,a.type,a.lat,a.lon,a.altitude]),data.incidents.slice(0,2).map(i=>[i.id,i.lat,i.lon])])}
  function contextSignature(data){return signature([data.layers.assets,data.layers.weather,data.layers.cameras,data.layers.air,data.layers.land,data.layers.sea,data.liveMapMode,data.fleetMode,data.droneMode,data.robotMode,data.maritimeMode,data.mobilityMode,data.aiMode,data.incidentMode,data.selectedDetectionId,data.selectedCaseId,(data.weatherStations||[]).map(x=>[x.id,x.temperature,x.lat,x.lon]),(data.bases||[]).map(x=>[x.id,x.lat,x.lon,x.status]),(data.robotBases||[]).map(x=>[x.id,x.lat,x.lon,x.available]),(data.maritimePorts||[]).map(x=>[x.id,x.lat,x.lon,x.available]),(data.maritimeContacts||[]).map(x=>[x.id,x.lat,x.lon,x.risk,x.mmsi]),(data.mobilityHubs||[]).map(x=>[x.id,x.lat,x.lon,x.available]),(data.mobilityNodes||[]).map(x=>[x.id,x.lat,x.lon,x.signal,x.latency]),(data.aiDetections||[]).map(x=>[x.id,x.lat,x.lon,x.confidence,x.severity,x.domain]),(data.aiEdgeNodes||[]).map(x=>[x.id,x.lat,x.lon,x.status,x.latency]),(data.incidentResources||[]).map(x=>[x.id,x.status,x.eta]),data.assets.filter((a,i)=>i%10===0).slice(0,6).map(a=>[a.id,a.lat,a.lon])])}
  function twinSignature(data){return signature([data.twinMode,data.twinFocus,data.twinScenarioActive,data.selectedTwinFacilityId,data.selectedTwinSensorId,data.selectedTwinScenarioId,(data.twinFacilities||[]).map(x=>[x.id,x.lat,x.lon,x.status,x.health,x.load]),(data.twinSensors||[]).map(x=>[x.id,x.lat,x.lon,x.status,x.value]),(data.twinLinks||[]).map(x=>[x.id,x.from,x.to,x.status,x.load]),(data.twinScenarios||[]).map(x=>[x.id,x.lat,x.lon,x.radiusKm,x.severity])])}
  function colorForAsset(a){
    if(a.status==="offline"||a.status==="maintenance")return [239,56,80,1];
    return a.type==="drone"?[28,230,135,1]:a.type==="robot"?[244,178,71,1]:a.type==="marine"?[38,216,245,1]:[43,231,157,1];
  }
  function colorHex(a){if(a.status==="offline"||a.status==="maintenance")return"#ef3850";return a.type==="drone"?"#1ce687":a.type==="robot"?"#f4b247":a.type==="marine"?"#26d8f5":"#2be79d"}
  function modelUrl(type){
    if(modelUrls[type])return modelUrls[type];const raw=window.ACC_MODEL_DATA&&window.ACC_MODEL_DATA[type];if(!raw)return"";
    try{const binary=atob(raw),bytes=new Uint8Array(binary.length);for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);modelUrls[type]=URL.createObjectURL(new Blob([bytes],{type:"model/gltf-binary"}));return modelUrls[type]}catch(e){console.warn("3D asset model unavailable",type,e);return""}
  }
  function silhouetteUrl(a,beacon=false){
    const key=a.type+":"+colorHex(a)+":"+(beacon?"beacon":"plain");if(iconUrls[key])return iconUrls[key];const body=silhouettePaths[a.type]||silhouettePaths.vehicle,color=colorHex(a);
    const plate=beacon?`<circle cx="32" cy="32" r="29" fill="#04151d" fill-opacity=".92" stroke="${color}" stroke-width="3"/><circle cx="32" cy="32" r="23" fill="${color}" fill-opacity=".13"/>`:"";
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${plate}<g fill="${color}" stroke="#e9fdff" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" transform="${beacon?'translate(12 12) scale(.625)':''}">${body}</g></svg>`;
    iconUrls[key]="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg);return iconUrls[key];
  }
  function use3dModels(){const pref=api.data?.cartography?.assetStyle||"auto";if(pref==="2d")return false;if(pref==="3d")return true;return api.mode!=="tactical"&&(api.view?.zoom||0)>=11.25}
  function displayPoint(a,index,visibility,second){
    if(visibility==="masked")return{lat:Math.round(a.lat*20)/20,lon:Math.round(a.lon*20)/20};
    const drift=visibility==="exact"?.00055:0;
    return{lat:a.lat+Math.sin((second||0)/11+index)*drift,lon:a.lon+Math.cos((second||0)/13+index)*drift};
  }
  function assetModelSymbol(a){
    const href=modelUrl(a.type),dims=modelDimensions[a.type]||modelDimensions.vehicle;
    return href?{type:"point-3d",symbolLayers:[{type:"object",resource:{href},width:dims.width,height:dims.height,depth:dims.depth,heading:a.heading||0}]}:null;
  }
  function assetBeaconSymbol(a,selected,modelActive){
    const color=colorForAsset(a),screenLength=a.type==="drone"?(modelActive?25:14):(modelActive?36:18),plateSize=selected?42:modelActive?31:29;
    return{type:"point-3d",symbolLayers:[
      {type:"icon",resource:{primitive:"circle"},material:{color:[4,21,29,.94]},size:plateSize,outline:{color:selected?[31,220,255,1]:color,size:selected?2:1.35}},
      {type:"icon",resource:{href:silhouetteUrl(a)},size:selected?29:modelActive?21:20}
    ],verticalOffset:{screenLength:selected?screenLength+12:screenLength,maxWorldLength:selected?320:230,minWorldLength:8},callout:{type:"line",color:selected?[31,220,255,.96]:[color[0],color[1],color[2],.72],size:selected?1.6:.8,border:{color:[2,15,22,.82]}}};
  }
  function assetLabelSymbol(a,selected,modelActive){
    const offset=a.type==="drone"?(modelActive?57:45):(modelActive?68:49);
    return{type:"point-3d",symbolLayers:[{type:"text",text:a.id,material:{color:[244,253,255,1]},halo:{color:[2,13,19,.98],size:1.6},size:selected?12:10,font:{family:"Arial",weight:"bold"}}],verticalOffset:{screenLength:selected?offset+7:offset,maxWorldLength:420,minWorldLength:12}};
  }
  function incidentSymbol(selected){return{type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:"triangle"},material:{color:[238,35,60,1]},size:selected?30:24,outline:{color:[255,214,220,1],size:1.4}},{type:"text",text:"!",material:{color:[255,255,255,1]},halo:{color:[129,0,18,1],size:1},size:12,font:{family:"Arial",weight:"bold"}}],verticalOffset:{screenLength:30,maxWorldLength:240,minWorldLength:8},callout:{type:"line",color:[239,35,60,.82],size:1}}}
  function aggregateSymbol(count){return{type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:"circle"},material:{color:[8,48,61,.94]},size:34,outline:{color:[31,220,255,1],size:1.4}},{type:"text",text:String(count),material:{color:[255,255,255,1]},halo:{color:[3,19,27,1],size:1},size:11,font:{family:"Arial",weight:"bold"}}],verticalOffset:{screenLength:18,maxWorldLength:150,minWorldLength:3}}}
  function addAssets(data){
    metrics.assetRebuilds++;
    layers.assets.removeAll();layers.beacons.removeAll();layers.assetLabels.removeAll();layers.pulse.removeAll();
    if(!data.layers.assets)return;
    if(data.visibility==="aggregated"){
      const groups={};data.assets.forEach(a=>(groups[a.region]||(groups[a.region]=[])).push(a));
      Object.entries(groups).forEach(([region,list])=>{
        const lat=list.reduce((s,a)=>s+a.lat,0)/list.length,lon=list.reduce((s,a)=>s+a.lon,0)/list.length;
        layers.beacons.add(new C.Graphic({geometry:new C.Point({longitude:lon,latitude:lat,z:18}),symbol:aggregateSymbol(list.length),attributes:{kind:"region",region,count:list.length}}));
      });return;
    }
    const modelActive=use3dModels(),showLabels=(api.view?.zoom||0)>=13.15;
    data.assets.forEach((a,index)=>{
      const p=displayPoint(a,index,data.visibility,data.scenarioSecond),selected=a.id===data.selectedAssetId,z=a.type==="drone"?Math.max(55,a.altitude||120):a.type==="marine"?2:5;
      const geometry=new C.Point({longitude:p.lon,latitude:p.lat,z}),attributes={kind:"asset",id:a.id,type:a.type,region:a.region,status:a.status};
      if(modelActive){const symbol=assetModelSymbol(a);if(symbol)layers.assets.add(new C.Graphic({geometry,symbol,attributes}))}
      layers.beacons.add(new C.Graphic({geometry:geometry.clone(),symbol:assetBeaconSymbol(a,selected,modelActive),attributes}));
      if(showLabels||selected)layers.assetLabels.add(new C.Graphic({geometry:geometry.clone(),symbol:assetLabelSymbol(a,selected,modelActive),attributes}));
      if(selected){layers.pulse.add(new C.Graphic({geometry:geometry.clone(),symbol:{type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:"circle"},material:{color:[31,220,255,.035]},size:48,outline:{color:[31,220,255,.9],size:1.5}}],verticalOffset:{screenLength:modelActive?36:22,maxWorldLength:300,minWorldLength:8}},attributes:{kind:"pulse",id:a.id}}))}
    });
  }
  function addIncidents(data){
    metrics.incidentRebuilds++;
    layers.incidents.removeAll();layers.zones.removeAll();
    if(!data.layers.incidents)return;
    data.incidents.forEach((i,index)=>{
      const lat=data.visibility==="exact"?i.lat:Math.round(i.lat*20)/20,lon=data.visibility==="exact"?i.lon:Math.round(i.lon*20)/20,selected=i.id===data.selectedIncidentId;
      const point=new C.Point({longitude:lon,latitude:lat,z:10});
      layers.incidents.add(new C.Graphic({geometry:point,symbol:incidentSymbol(selected),attributes:{kind:"incident",id:i.id,severity:i.severity,region:i.region}}));
      if(data.layers.zones&&index<3){
        try{const poly=C.geometryEngine.geodesicBuffer(new C.Point({longitude:lon,latitude:lat}),1.8+index*.7,"kilometers");layers.zones.add(new C.Graphic({geometry:poly,symbol:{type:"polygon-3d",symbolLayers:[{type:"fill",material:{color:[238,35,60,.1]},outline:{color:[255,61,83,.78],size:1}}]},attributes:{kind:"zone",id:i.id}}))}catch(e){}
      }
    });
  }
  function addNoFlyZones(data){
    metrics.zoneRebuilds++;
    layers.noFly.removeAll();if(!data.layers.zones||!Array.isArray(data.noFlyZones))return;
    data.noFlyZones.forEach(zone=>{
      const point=new C.Point({longitude:zone.lon,latitude:zone.lat,z:14});
      try{const poly=C.geometryEngine.geodesicBuffer(new C.Point({longitude:zone.lon,latitude:zone.lat}),zone.radiusKm||2.5,"kilometers");layers.noFly.add(new C.Graphic({geometry:poly,symbol:{type:"polygon-3d",symbolLayers:[{type:"fill",material:{color:[205,22,49,.16]},outline:{color:[255,65,88,.92],size:1.4}}]},attributes:{kind:"no-fly",id:zone.id}}))}catch(e){}
      layers.noFly.add(new C.Graphic({geometry:point,symbol:{type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:"triangle"},material:{color:[220,27,53,.96]},size:24,outline:{color:[255,220,225,1],size:1.2}},{type:"text",text:"NFZ",material:{color:[255,255,255,1]},halo:{color:[97,0,14,1],size:1.1},size:8,font:{family:"Arial",weight:"bold"}}],verticalOffset:{screenLength:23,maxWorldLength:210,minWorldLength:6},callout:{type:"line",color:[255,65,88,.8],size:.9}},attributes:{kind:"no-fly",id:zone.id}}));
    });
    (data.robotZones||[]).forEach(zone=>{
      const point=new C.Point({longitude:zone.lon,latitude:zone.lat,z:7});
      try{const poly=C.geometryEngine.geodesicBuffer(new C.Point({longitude:zone.lon,latitude:zone.lat}),zone.radiusKm||.6,"kilometers");layers.noFly.add(new C.Graphic({geometry:poly,symbol:{type:"polygon-3d",symbolLayers:[{type:"fill",material:{color:[19,211,150,.1]},outline:{color:zone.severity==="high"?[244,178,71,.95]:[35,231,164,.9],size:1.4}}]},attributes:{kind:"robot-zone",id:zone.id}}))}catch(e){}
      layers.noFly.add(new C.Graphic({geometry:point,symbol:{type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:"diamond"},material:{color:[5,58,55,.96]},size:25,outline:{color:[43,235,179,1],size:1.2}},{type:"text",text:"G",material:{color:[235,255,249,1]},halo:{color:[1,40,38,1],size:1},size:10,font:{family:"Arial",weight:"bold"}}],verticalOffset:{screenLength:19,maxWorldLength:150,minWorldLength:4},callout:{type:"line",color:[43,235,179,.75],size:.8}},attributes:{kind:"robot-zone",id:zone.id}}));
    });
    (data.maritimeZones||[]).forEach(zone=>{
      const high=zone.severity==="high",color=high?[239,56,80,1]:zone.kind==="channel"?[38,216,245,1]:[244,178,71,1],point=new C.Point({longitude:zone.lon,latitude:zone.lat,z:4});
      try{const poly=C.geometryEngine.geodesicBuffer(new C.Point({longitude:zone.lon,latitude:zone.lat}),zone.radiusKm||1,"kilometers");layers.noFly.add(new C.Graphic({geometry:poly,symbol:{type:"polygon-3d",symbolLayers:[{type:"fill",material:{color:[color[0],color[1],color[2],high?.13:.08]},outline:{color:[color[0],color[1],color[2],.92],size:1.5}}]},attributes:{kind:"maritime-zone",id:zone.id}}))}catch(e){}
      layers.noFly.add(new C.Graphic({geometry:point,symbol:{type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:"circle"},material:{color:[3,33,45,.95]},size:26,outline:{color,size:1.4}},{type:"text",text:zone.kind==="channel"?"C":zone.kind==="restricted"?"R":"N",material:{color:[240,254,255,1]},halo:{color:[1,21,29,1],size:1},size:10,font:{family:"Arial",weight:"bold"}}],verticalOffset:{screenLength:18,maxWorldLength:150,minWorldLength:4},callout:{type:"line",color:[color[0],color[1],color[2],.74],size:.9}},attributes:{kind:"maritime-zone",id:zone.id}}));
    });
    (data.mobilityZones||[]).forEach(zone=>{
      const high=zone.severity==="high",color=high?[239,56,80,1]:zone.kind==="priority"?[244,178,71,1]:[31,220,255,1],point=new C.Point({longitude:zone.lon,latitude:zone.lat,z:5});
      try{const poly=C.geometryEngine.geodesicBuffer(new C.Point({longitude:zone.lon,latitude:zone.lat}),zone.radiusKm||.7,"kilometers");layers.noFly.add(new C.Graphic({geometry:poly,symbol:{type:"polygon-3d",symbolLayers:[{type:"fill",material:{color:[color[0],color[1],color[2],high?.14:.08]},outline:{color:[color[0],color[1],color[2],.94],size:1.5}}]},attributes:{kind:"mobility-zone",id:zone.id}}))}catch(e){}
      layers.noFly.add(new C.Graphic({geometry:point,symbol:{type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:"diamond"},material:{color:[3,37,48,.96]},size:26,outline:{color,size:1.4}},{type:"text",text:zone.kind==="odd"?"L4":zone.kind==="hazard"?"!":"P",material:{color:[240,254,255,1]},halo:{color:[1,21,29,1],size:1},size:9,font:{family:"Arial",weight:"bold"}}],verticalOffset:{screenLength:18,maxWorldLength:150,minWorldLength:4},callout:{type:"line",color:[color[0],color[1],color[2],.74],size:.9}},attributes:{kind:"mobility-zone",id:zone.id}}));
    });
    if(data.aiMode)(data.aiDetections||[]).forEach(d=>{
      const selected=d.id===data.selectedDetectionId,high=d.severity==="high",color=high?[239,56,80,1]:d.severity==="medium"?[244,178,71,1]:[151,112,255,1];
      try{const poly=C.geometryEngine.geodesicBuffer(new C.Point({longitude:d.lon,latitude:d.lat}),selected?1.25:high?.9:.55,"kilometers");layers.noFly.add(new C.Graphic({geometry:poly,symbol:{type:"polygon-3d",symbolLayers:[{type:"fill",material:{color:[color[0],color[1],color[2],selected?.18:.08]},outline:{color:[color[0],color[1],color[2],selected?1:.78],size:selected?2:1.1}}]},attributes:{kind:"ai-detection",id:d.id}}))}catch(e){}
    });
    if(data.incidentMode)(data.incidentCases||[]).forEach(c=>{const i=data.incidents.find(x=>x.id===c.id);if(!i)return;const selected=c.id===data.selectedCaseId,color=c.level==="L3"?[239,56,80,1]:c.level==="L2"?[244,178,71,1]:[31,220,255,1];try{const poly=C.geometryEngine.geodesicBuffer(new C.Point({longitude:i.lon,latitude:i.lat}),selected?1.5:c.level==="L3"?1.05:.7,"kilometers");layers.noFly.add(new C.Graphic({geometry:poly,symbol:{type:"polygon-3d",symbolLayers:[{type:"fill",material:{color:[color[0],color[1],color[2],selected?.17:.065]},outline:{color:[color[0],color[1],color[2],selected?1:.72],size:selected?2.2:1.1}}]},attributes:{kind:"response-zone",id:c.id}}))}catch(e){}});
  }
  function routeGeometry(data,a,index){
    const p=displayPoint(a,index,data.visibility,data.scenarioSecond),z=a.type==="drone"?Math.max(60,a.altitude||120):a.type==="marine"?4:8;
    const incident=data.incidentMode?data.incidents.find(x=>x.id===data.selectedCaseId):null,twin=data.twinMode?(data.twinFacilities||[]).find(x=>x.id===data.selectedTwinFacilityId):null,dest=data.droneMode?[p.lon+(index%2?.026:-.022),p.lat+.016+(index%3)*.007,z]:data.robotMode?[p.lon+(index%2?.006:-.005),p.lat+.004+(index%3)*.0015,z]:data.maritimeMode?[p.lon+(index%2?.035:-.028),p.lat+(index%3-1)*.018,z]:data.mobilityMode?[p.lon+(index%2?.012:-.010),p.lat+(index%3-1)*.006,z]:data.aiMode?[54.3773+(index%3)*.004,24.4539+(index%2)*.003,z]:incident?[incident.lon,incident.lat,z]:twin?[twin.lon,twin.lat,z]:[54.48+(index%4)*.055,24.43+(index%3)*.045,z];
    const path=[[p.lon,p.lat,z],[(p.lon+dest[0])/2,(p.lat+dest[1])/2+(data.robotMode?.0012:data.maritimeMode?.006:data.mobilityMode?.002:data.aiMode?.004:data.incidentMode?.006:data.twinMode?.004:.025),data.robotMode||data.maritimeMode||data.mobilityMode||data.aiMode||data.incidentMode||data.twinMode?z:z+20],dest];
    return new C.Polyline({paths:[path],spatialReference:{wkid:4326}});
  }
  function addRoutes(data){
    metrics.routeRebuilds++;
    layers.routes.removeAll();if(!data.layers.corridors||!data.assets.length)return;
    const center=data.maritimeMode?[54.6408,24.8332,4]:data.mobilityMode?[54.6058,24.4871,7]:[54.3773,24.4539,18];
    data.assets.filter((a,i)=>data.incidentMode?(data.incidentCases.find(x=>x.id===data.selectedCaseId)?.responders||[]).includes(a.id):i%(data.droneMode?3:data.maritimeMode||data.mobilityMode?1:data.aiMode?4:6)===0).slice(0,10).forEach((a,index)=>{
      layers.routes.add(new C.Graphic({geometry:routeGeometry(data,a,index),symbol:{type:"line-3d",symbolLayers:[{type:"line",material:{color:data.incidentMode?[255,78,103,.9]:data.aiMode?[151,112,255,.86]:data.robotMode?[43,235,179,.9]:a.type==="marine"?[38,216,245,.9]:data.mobilityMode?[31,220,255,.92]:[31,220,255,.76]},size:a.id===data.selectedAssetId?2.8:1.4,cap:"round",join:"round"}]},attributes:{kind:"route",id:a.id,index}}));
    });
    data.incidents.slice(0,2).forEach(i=>layers.routes.add(new C.Graphic({geometry:new C.Polyline({paths:[[center,[i.lon,i.lat,16]]],spatialReference:{wkid:4326}}),symbol:{type:"line-3d",symbolLayers:[{type:"line",material:{color:[239,35,60,.82]},size:1.8}]},attributes:{kind:"incident-route",id:i.id}})));
  }
  function addWeatherAndCameras(data){
    metrics.contextRebuilds++;
    layers.context.removeAll();
    if(data.layers.weather){const points=data.weatherStations?.length?data.weatherStations.map((x,i)=>({lon:Number.isFinite(x.lon)?x.lon:[54.6048,54.3888,55.2740,56.3260][i],lat:Number.isFinite(x.lat)?x.lat:[24.4858,24.4992,25.1960,25.1280][i],label:`${x.temperature}°C`,id:x.id})):[{lon:54.3773,lat:24.4539,label:"32°C",id:"WX-AD"},{lon:55.2744,lat:25.1972,label:"31°C",id:"WX-DX"},{lon:56.3265,lat:25.1288,label:"29°C",id:"WX-FJ"}];points.forEach(x=>layers.context.add(new C.Graphic({geometry:new C.Point({longitude:x.lon,latitude:x.lat,z:data.maritimeMode?5:80}),symbol:{type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:"circle"},material:{color:[255,184,55,.9]},size:20,outline:{color:[255,234,177,1],size:1}},{type:"text",text:x.label,material:{color:[255,245,222,1]},halo:{color:[36,24,2,1],size:1},size:9}]},attributes:{kind:"weather",id:x.id}})))}
    if(data.layers.cameras){
      if(data.liveMapMode){const groups=[[data.layers.air?data.bases:[],"H",[31,220,255,1]],[data.layers.land?data.robotBases:[],"R",[244,178,71,1]],[data.layers.sea?data.maritimePorts:[],"P",[47,147,255,1]],[data.layers.land?data.mobilityHubs:[],"M",[43,231,157,1]]];groups.forEach(([rows,label,color])=>(rows||[]).forEach(x=>layers.context.add(new C.Graphic({geometry:new C.Point({longitude:x.lon,latitude:x.lat,z:6}),symbol:{type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:"square"},material:{color:[4,38,49,.96]},size:21,outline:{color,size:1.2}},{type:"text",text:label,material:{color:[245,255,255,1]},halo:{color:[0,25,32,1],size:1},size:8,font:{family:"Arial",weight:"bold"}}],verticalOffset:{screenLength:15,maxWorldLength:140,minWorldLength:3},callout:{type:"line",color:[color[0],color[1],color[2],.65],size:.7}},attributes:{kind:"live-base",id:x.id}}))))}
      else if(data.droneMode)(data.bases||[]).forEach(x=>layers.context.add(new C.Graphic({geometry:new C.Point({longitude:x.lon,latitude:x.lat,z:3}),symbol:{type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:"circle"},material:{color:x.status==="weatherHold"?[221,49,72,.96]:[10,76,91,.95]},size:25,outline:{color:[72,239,255,1],size:1.3}},{type:"text",text:"H",material:{color:[235,255,255,1]},halo:{color:[0,34,42,1],size:1},size:11,font:{family:"Arial",weight:"bold"}}],verticalOffset:{screenLength:12,maxWorldLength:120,minWorldLength:3}},attributes:{kind:"landing-pad",id:x.id}})));
      else if(data.robotMode)(data.robotBases||[]).forEach(x=>layers.context.add(new C.Graphic({geometry:new C.Point({longitude:x.lon,latitude:x.lat,z:5}),symbol:{type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:"square"},material:{color:[7,74,60,.96]},size:26,outline:{color:[43,235,179,1],size:1.3}},{type:"text",text:"R",material:{color:[238,255,249,1]},halo:{color:[0,35,29,1],size:1},size:11,font:{family:"Arial",weight:"bold"}}],verticalOffset:{screenLength:12,maxWorldLength:120,minWorldLength:3}},attributes:{kind:"robot-base",id:x.id}})));
      else if(data.maritimeMode)(data.maritimePorts||[]).forEach(x=>layers.context.add(new C.Graphic({geometry:new C.Point({longitude:x.lon,latitude:x.lat,z:4}),symbol:{type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:"square"},material:{color:x.status==="weatherWatch"?[121,76,14,.96]:[5,54,72,.96]},size:27,outline:{color:x.status==="weatherWatch"?[244,178,71,1]:[38,216,245,1],size:1.4}},{type:"text",text:"P",material:{color:[239,253,255,1]},halo:{color:[0,29,40,1],size:1},size:11,font:{family:"Arial",weight:"bold"}}],verticalOffset:{screenLength:13,maxWorldLength:140,minWorldLength:3},callout:{type:"line",color:[38,216,245,.7],size:.8}},attributes:{kind:"maritime-port",id:x.id}})));
      else if(data.mobilityMode){(data.mobilityHubs||[]).forEach(x=>layers.context.add(new C.Graphic({geometry:new C.Point({longitude:x.lon,latitude:x.lat,z:5}),symbol:{type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:"square"},material:{color:x.status==="busy"?[92,59,13,.96]:[4,53,66,.96]},size:27,outline:{color:x.status==="busy"?[244,178,71,1]:[31,220,255,1],size:1.4}},{type:"text",text:"H",material:{color:[239,253,255,1]},halo:{color:[0,29,40,1],size:1},size:11,font:{family:"Arial",weight:"bold"}}],verticalOffset:{screenLength:14,maxWorldLength:140,minWorldLength:3},callout:{type:"line",color:[31,220,255,.7],size:.8}},attributes:{kind:"mobility-hub",id:x.id}})));(data.mobilityNodes||[]).forEach(x=>{const color=x.signal==="red"?[239,56,80,1]:x.signal==="amber"?[244,178,71,1]:[43,231,157,1];layers.context.add(new C.Graphic({geometry:new C.Point({longitude:x.lon,latitude:x.lat,z:7}),symbol:{type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:"circle"},material:{color:[3,30,39,.96]},size:22,outline:{color,size:1.5}},{type:"text",text:"V2X",material:{color:[244,255,255,1]},halo:{color:[1,20,27,1],size:1},size:7,font:{family:"Arial",weight:"bold"}}],verticalOffset:{screenLength:19,maxWorldLength:160,minWorldLength:4},callout:{type:"line",color:[color[0],color[1],color[2],.75],size:.8}},attributes:{kind:"mobility-node",id:x.id}}))})}
      else if(data.incidentMode){const c=(data.incidentCases||[]).find(x=>x.id===data.selectedCaseId),i=data.incidents.find(x=>x.id===data.selectedCaseId);if(c&&i)layers.context.add(new C.Graphic({geometry:new C.Point({longitude:i.lon,latitude:i.lat,z:18}),symbol:{type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:"square"},material:{color:[74,12,28,.97]},size:31,outline:{color:[255,82,108,1],size:1.7}},{type:"text",text:"ICP",material:{color:[255,255,255,1]},halo:{color:[55,5,17,1],size:1},size:8,font:{family:"Arial",weight:"bold"}}],verticalOffset:{screenLength:27,maxWorldLength:210,minWorldLength:8},callout:{type:"line",color:[255,82,108,.86],size:1.1}},attributes:{kind:"incident-post",id:c.id}}))}
      else if(data.aiMode)(data.aiEdgeNodes||[]).forEach(x=>{const color=x.status==="watch"?[244,178,71,1]:[151,112,255,1];layers.context.add(new C.Graphic({geometry:new C.Point({longitude:x.lon,latitude:x.lat,z:12}),symbol:{type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:"square"},material:{color:[28,17,59,.97]},size:29,outline:{color,size:1.6}},{type:"text",text:"AI",material:{color:[250,247,255,1]},halo:{color:[18,8,42,1],size:1},size:9,font:{family:"Arial",weight:"bold"}}],verticalOffset:{screenLength:22,maxWorldLength:190,minWorldLength:6},callout:{type:"line",color:[color[0],color[1],color[2],.82],size:1}},attributes:{kind:"ai-edge",id:x.id}}))});
      else data.assets.filter((a,i)=>i%10===0).slice(0,6).forEach(a=>layers.context.add(new C.Graphic({geometry:new C.Point({longitude:a.lon+.006,latitude:a.lat+.004,z:25}),symbol:{type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:"square"},material:{color:[106,112,255,.92]},size:13,outline:{color:[214,216,255,1],size:1}}]},attributes:{kind:"camera",id:a.id}})));
    }
    if(data.aiMode&&data.layers.assets)(data.aiDetections||[]).forEach(d=>{const selected=d.id===data.selectedDetectionId,high=d.severity==="high",color=high?[239,56,80,1]:d.severity==="medium"?[244,178,71,1]:[151,112,255,1],z=d.domain==="drone"?150:d.domain==="marine"?8:16;layers.context.add(new C.Graphic({geometry:new C.Point({longitude:d.lon,latitude:d.lat,z}),symbol:{type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:"diamond"},material:{color:[color[0],color[1],color[2],.97]},size:selected?31:23,outline:{color:[248,244,255,1],size:selected?2:1.1}},{type:"text",text:String(d.confidence),material:{color:[255,255,255,1]},halo:{color:[18,8,42,1],size:1},size:selected?10:8,font:{family:"Arial",weight:"bold"}}],verticalOffset:{screenLength:selected?33:24,maxWorldLength:260,minWorldLength:7},callout:{type:"line",color:[color[0],color[1],color[2],.86],size:selected?1.4:.8}},attributes:{kind:"ai-detection",id:d.id}}))});
    if((data.maritimeMode||(data.liveMapMode&&data.layers.sea))&&data.layers.assets)(data.maritimeContacts||[]).forEach(x=>{const high=x.risk==="high",medium=x.risk==="medium",color=high?[239,56,80,1]:medium?[244,178,71,1]:[43,231,157,1],unknown=x.mmsi==="—";layers.context.add(new C.Graphic({geometry:new C.Point({longitude:x.lon,latitude:x.lat,z:4}),symbol:{type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:unknown?"diamond":"triangle"},material:{color:[color[0],color[1],color[2],.95]},size:high?23:18,outline:{color:[235,254,255,1],size:1}},{type:"text",text:unknown?"?":"A",material:{color:[255,255,255,1]},halo:{color:[2,18,25,1],size:1},size:8,font:{family:"Arial",weight:"bold"}}],verticalOffset:{screenLength:19,maxWorldLength:170,minWorldLength:4},callout:{type:"line",color:[color[0],color[1],color[2],.72],size:.8}},attributes:{kind:"maritime-contact",id:x.id}}))});
  }
  function addTwin(data){
    metrics.twinRebuilds++;layers.twinLinks.removeAll();layers.twinFacilities.removeAll();layers.twinSensors.removeAll();layers.twinScenario.removeAll();if(!data.twinMode)return;
    const facilities=data.twinFacilities||[],byId=new Map(facilities.map(x=>[x.id,x])),focus=data.twinFocus||"city";
    if(["city","infrastructure","utilities","traffic","assets"].includes(focus)){
      (data.twinLinks||[]).forEach(link=>{const a=byId.get(link.from),b=byId.get(link.to);if(!a||!b)return;const color=link.status==="watch"?[244,178,71,.9]:link.type==="water"||link.type==="maritime"?[38,216,245,.86]:link.type==="power"?[255,199,77,.86]:[43,231,157,.82],z=focus==="utilities"?14:8;layers.twinLinks.add(new C.Graphic({geometry:new C.Polyline({paths:[[[a.lon,a.lat,z],[(a.lon+b.lon)/2,(a.lat+b.lat)/2,z+22],[b.lon,b.lat,z]]],spatialReference:{wkid:4326}}),symbol:{type:"line-3d",symbolLayers:[{type:"line",material:{color},size:link.status==="watch"?3:1.8,cap:"round",join:"round"}]},attributes:{kind:"twin-link",id:link.id}}))});
    }
    facilities.forEach((f,index)=>{const selected=f.id===data.selectedTwinFacilityId,watch=f.status==="watch",bad=f.status==="degraded"||f.status==="isolated",color=bad?[239,56,80,1]:watch?[244,178,71,1]:[31,220,255,1],z=5;
      layers.twinFacilities.add(new C.Graphic({geometry:new C.Point({longitude:f.lon,latitude:f.lat,z}),symbol:{type:"point-3d",symbolLayers:[{type:"object",resource:{primitive:selected?"diamond":"cube"},material:{color:[color[0],color[1],color[2],selected?.9:.62]},width:selected?15:9,height:selected?34:19,depth:selected?15:9,heading:index*17}]},attributes:{kind:"twin-facility",id:f.id}}));
      layers.twinFacilities.add(new C.Graphic({geometry:new C.Point({longitude:f.lon,latitude:f.lat,z}),symbol:{type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:"circle"},material:{color:[3,20,28,.96]},size:selected?34:26,outline:{color,size:selected?2:1.2}},{type:"text",text:f.type==="power"?"PWR":f.type==="port"?"PRT":f.type==="water"?"WTR":"INF",material:{color:[245,254,255,1]},halo:{color:[1,16,22,1],size:1},size:selected?9:7,font:{family:"Arial",weight:"bold"}}],verticalOffset:{screenLength:selected?45:32,maxWorldLength:320,minWorldLength:9},callout:{type:"line",color:[color[0],color[1],color[2],.86],size:selected?1.5:.8}},attributes:{kind:"twin-facility",id:f.id}}));
      if(selected||(api.view?.zoom||0)>=15.7)layers.twinFacilities.add(new C.Graphic({geometry:new C.Point({longitude:f.lon,latitude:f.lat,z}),symbol:{type:"point-3d",symbolLayers:[{type:"text",text:`${f.id} · ${f.health}%`,material:{color:[240,253,255,1]},halo:{color:[1,13,19,.98],size:1.5},size:selected?10:8,font:{family:"Arial",weight:"bold"}}],verticalOffset:{screenLength:selected?87:68,maxWorldLength:460,minWorldLength:18}},attributes:{kind:"twin-facility",id:f.id}}));
    });
    if(["city","sensors","environment"].includes(focus))(data.twinSensors||[]).forEach(s=>{const selected=s.id===data.selectedTwinSensorId,color=s.status==="degraded"?[239,56,80,1]:s.status==="watch"?[244,178,71,1]:[43,231,157,1];layers.twinSensors.add(new C.Graphic({geometry:new C.Point({longitude:s.lon,latitude:s.lat,z:7}),symbol:{type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:"circle"},material:{color:[2,29,36,.96]},size:selected?22:14,outline:{color,size:selected?2:1.2}},{type:"text",text:selected?String(s.value):"S",material:{color:[248,255,253,1]},halo:{color:[1,20,25,1],size:1},size:selected?8:6,font:{family:"Arial",weight:"bold"}}],verticalOffset:{screenLength:selected?29:18,maxWorldLength:190,minWorldLength:5},callout:{type:"line",color:[color[0],color[1],color[2],.72],size:.7}},attributes:{kind:"twin-sensor",id:s.id}}))});
    const sc=(data.twinScenarios||[]).find(x=>x.id===data.selectedTwinScenarioId);if(sc&&(data.twinScenarioActive||["incidents","environment"].includes(focus))){const color=sc.severity==="high"?[239,56,80,1]:[244,178,71,1];for(let ring=1;ring<=3;ring++){try{const poly=C.geometryEngine.geodesicBuffer(new C.Point({longitude:sc.lon,latitude:sc.lat}),sc.radiusKm*(ring/3),"kilometers");layers.twinScenario.add(new C.Graphic({geometry:poly,symbol:{type:"polygon-3d",symbolLayers:[{type:"fill",material:{color:[color[0],color[1],color[2],data.twinScenarioActive ? .12/ring : .04]},outline:{color:[color[0],color[1],color[2],.9-ring*.16],size:data.twinScenarioActive?2:1}}]},attributes:{kind:"twin-scenario",id:sc.id}}))}catch(e){}}
      layers.twinScenario.add(new C.Graphic({geometry:new C.Point({longitude:sc.lon,latitude:sc.lat,z:12}),symbol:{type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:"triangle"},material:{color},size:data.twinScenarioActive?34:25,outline:{color:[255,239,242,1],size:1.4}},{type:"text",text:data.twinScenarioActive?"SIM":"RISK",material:{color:[255,255,255,1]},halo:{color:[64,4,15,1],size:1},size:8,font:{family:"Arial",weight:"bold"}}],verticalOffset:{screenLength:34,maxWorldLength:260,minWorldLength:8},callout:{type:"line",color:[color[0],color[1],color[2],.9],size:1.2}},attributes:{kind:"twin-scenario",id:sc.id}}));
    }
  }
  function updateDynamicPositions(data){
    if(data.visibility!=="exact"||!data.layers.assets)return;metrics.positionUpdates++;
    const positions=new Map(data.assets.map((a,index)=>{const p=displayPoint(a,index,data.visibility,data.scenarioSecond),z=a.type==="drone"?Math.max(55,a.altitude||120):a.type==="marine"?2:5;return[a.id,new C.Point({longitude:p.lon,latitude:p.lat,z})]}));
    [layers.assets,layers.beacons,layers.assetLabels,layers.pulse].forEach(layer=>layer.graphics.forEach(g=>{const p=positions.get(g.attributes?.id);if(p)g.geometry=p}));
    if(data.layers.corridors)layers.routes.graphics.forEach(g=>{if(g.attributes?.kind!=="route")return;const a=data.assets.find(x=>x.id===g.attributes.id);if(a)g.geometry=routeGeometry(data,a,Number(g.attributes.index)||0)});
  }
  function sync(data){
    const filtered={...data,assets:data.assets.filter(a=>a.type==="drone"?data.layers.air:a.type==="marine"?data.layers.sea:data.layers.land)};
    api.data=filtered;metrics.syncCalls++;if(!api.ready||api.suspended)return;
    const assetKey=assetSignature(filtered),incidentKey=incidentSignature(filtered),noFlyKey=noFlySignature(filtered),routeKey=routeSignature(filtered),contextKey=contextSignature(filtered),twinKey=twinSignature(filtered),movement=Math.floor((Number(filtered.scenarioSecond)||0)/3);
    if(assetKey!==signatures.assets){addAssets(filtered);signatures.assets=assetKey}
    if(incidentKey!==signatures.incidents){addIncidents(filtered);signatures.incidents=incidentKey}
    if(noFlyKey!==signatures.noFly){addNoFlyZones(filtered);signatures.noFly=noFlyKey}
    if(routeKey!==signatures.routes){addRoutes(filtered);signatures.routes=routeKey}
    if(contextKey!==signatures.context){addWeatherAndCameras(filtered);signatures.context=contextKey}
    if(twinKey!==signatures.twin){addTwin(filtered);signatures.twin=twinKey}
    if(movement!==signatures.movement){updateDynamicPositions(filtered);signatures.movement=movement}
    layers.assets.visible=!!filtered.layers.assets;layers.beacons.visible=!!filtered.layers.assets;layers.assetLabels.visible=!!filtered.layers.assets;layers.incidents.visible=!!filtered.layers.incidents;layers.zones.visible=!!filtered.layers.zones;layers.noFly.visible=!!filtered.layers.zones;layers.routes.visible=!!filtered.layers.corridors;layers.twinFacilities.visible=!!filtered.twinMode;layers.twinSensors.visible=!!filtered.twinMode;layers.twinLinks.visible=!!filtered.twinMode;layers.twinScenario.visible=!!filtered.twinMode;
    applySceneSettings(filtered);const countKey=`${filtered.assets.length}:${layers.incidents.graphics.length}`;if(countKey!==signatures.count){signatures.count=countKey;emit("onOverlayCount",{assets:filtered.assets.length,incidents:layers.incidents.graphics.length})}
  }
  function applySceneSettings(data=api.data){
    if(!api.ready||!data||api.suspended)return;const c=data.cartography||{},quality=c.quality==="high"?"high":"medium",sceneKey=signature([data.layers.buildings,c.buildingOpacity,c.labels,c.elevation,c.shadows,c.buildingStyle,quality,api.mode]);if(sceneKey===signatures.scene)return;signatures.scene=sceneKey;
    layers.buildings.visible=!!data.layers.buildings&&api.mode!=="tactical";
    layers.buildings.opacity=Math.max(.12,Math.min(1,Number(c.buildingOpacity)||.82));
    layers.labels.visible=c.labels!==false;layers.elevation.visible=c.elevation!==false;
    if(api.view){try{api.view.qualityProfile=quality}catch(e){}if(api.view.environment){api.view.environment.lighting.directShadowsEnabled=c.shadows!==false;api.view.environment.lighting.ambientOcclusionEnabled=quality==="high";if(api.view.environment.atmosphere)api.view.environment.atmosphere.quality=quality==="high"?"high":"low"}}
    setBuildingStyle(c.buildingStyle||"natural",false);
  }
  function setBuildingStyle(style,notify=true){
    if(!api.ready)return;if(style===currentBuildingStyle){if(notify)emit("onBuildingStyle",style);return}if(style==="natural"&&naturalRenderer)layers.buildings.renderer=naturalRenderer.clone();
    else if(buildingStyles[style]){const s=buildingStyles[style];layers.buildings.renderer={type:"simple",symbol:{type:"mesh-3d",symbolLayers:[{type:"fill",material:{color:s.color,colorMixMode:"replace"},edges:{type:"solid",color:s.edge,size:.55}}]}}}
    currentBuildingStyle=style;
    if(notify)emit("onBuildingStyle",style);
  }
  function setQuality(quality){if(api.data?.cartography)api.data.cartography.quality=quality==="high"?"high":"balanced";signatures.scene="";applySceneSettings()}
  function activateBasemap(mode){
    layers.imagery.visible=mode==="satellite"||mode==="3d";layers.streets.visible=mode==="tactical";layers.terrainBase.visible=mode==="terrain";
    layers.labels.visible=api.data?.cartography?.labels!==false;
  }
  function setMode(mode,animate=true){
    api.mode=mode||"3d";if(!api.ready)return;activateBasemap(api.mode);applySceneSettings();ensureData();
    const current=api.view.camera.clone();
    if(api.mode==="tactical"){current.tilt=0;current.heading=0}
    if(api.mode==="satellite")current.tilt=Math.min(current.tilt,34);
    if(api.mode==="terrain")current.tilt=Math.max(48,Math.min(current.tilt,64));
    if(api.mode==="3d")current.tilt=Math.max(58,current.tilt||0);
    api.view.goTo(current,{duration:animate?720:0,easing:"ease-in-out"}).catch(()=>{});emitCamera();
  }
  function emitCamera(){
    if(!api.ready||!api.view)return;const c=api.view.camera,center=api.view.center;
    emit("onCamera",{pitch:Math.round(c.tilt||0),bearing:Math.round(((c.heading||0)+360)%360),zoom:Number(api.view.zoom||0).toFixed(1),lat:center?.latitude,lon:center?.longitude,orbiting:api.orbiting});
  }
  function cameraAction(action){
    if(!api.ready)return;if(action!=="orbit")stopOrbit();const v=api.view,c=v.camera.clone(),center=v.center?.clone();
    if(action==="zoom-in")return v.goTo({zoom:v.zoom+1},{duration:450}).catch(()=>{});
    if(action==="zoom-out")return v.goTo({zoom:v.zoom-1},{duration:450}).catch(()=>{});
    if(action==="fit")return flyToPlace("uae");
    if(action==="rotate-left")c.heading-=20;if(action==="rotate-right")c.heading+=20;
    if(action==="tilt-up")c.tilt=Math.min(82,c.tilt+10);if(action==="tilt-down")c.tilt=Math.max(0,c.tilt-10);
    if(action==="north")c.heading=0;if(action==="top-down"){c.tilt=0;c.heading=0}if(action==="oblique")c.tilt=68;
    if(action.startsWith("pan-")&&center){const delta=.018*Math.pow(2,Math.max(0,13-(v.zoom||13)));if(action==="pan-up")center.latitude+=delta;if(action==="pan-down")center.latitude-=delta;if(action==="pan-left")center.longitude-=delta;if(action==="pan-right")center.longitude+=delta;return v.goTo({center,heading:c.heading,tilt:c.tilt},{duration:420,easing:"ease-in-out"}).catch(()=>{})}
    if(action==="orbit")return api.orbiting?stopOrbit():startOrbit();
    v.goTo(c,{duration:520,easing:"ease-in-out"}).catch(()=>{}).finally(emitCamera);
  }
  function startOrbit(){if(!api.ready||api.orbiting)return;api.orbiting=true;const token=++orbitToken;emitCamera();const step=()=>{if(!api.orbiting||token!==orbitToken)return;const c=api.view.camera.clone();c.heading=(c.heading+10)%360;api.view.goTo(c,{duration:900,easing:"linear"}).then(()=>setTimeout(step,20)).catch(stopOrbit)};step()}
  function stopOrbit(){api.orbiting=false;orbitToken++;emitCamera()}
  function flyToPlace(key){if(!api.ready||!places[key])return;stopOrbit();api.view.goTo(places[key],{duration:key==="uae"?1450:1900,easing:"ease-in-out"}).catch(()=>{}).finally(emitCamera)}
  function flyTo(point){if(!api.ready||!point)return;stopOrbit();api.view.goTo({center:[point.lon,point.lat],zoom:point.zoom||16,tilt:point.tilt==null?68:point.tilt,heading:point.heading==null?330:point.heading},{duration:1700,easing:"ease-in-out"}).catch(()=>{}).finally(emitCamera)}
  function resize(){try{api.view&&api.view.resize()}catch(e){}}
  function pulse(){if(!api.ready||api.suspended||document.hidden||!layers.pulse.graphics.length)return;pulseOn=!pulseOn;const g=layers.pulse.graphics.getItemAt(0),size=pulseOn?56:42,modelActive=use3dModels();g.symbol={type:"point-3d",symbolLayers:[{type:"icon",resource:{primitive:"circle"},material:{color:[31,220,255,.035]},size,outline:{color:[31,220,255,pulseOn?.28:.92],size:pulseOn?.7:1.5}}],verticalOffset:{screenLength:modelActive?36:22,maxWorldLength:300,minWorldLength:8}}}
  function clearAnalysis(){if(!activeAnalysis)return;try{api.view?.ui?.remove(activeAnalysis)}catch(e){}try{activeAnalysis.destroy()}catch(e){}activeAnalysis=null}
  function startAnalysis(tool){
    if(!api.ready||typeof window.require!=="function")return;const modules={measure:"esri/widgets/DirectLineMeasurement3D","line-of-sight":"esri/widgets/LineOfSight",slice:"esri/widgets/Slice"},module=modules[tool];if(!module)return;clearAnalysis();
    window.require([module],function(AnalysisWidget){if(!api.ready)return;try{activeAnalysis=new AnalysisWidget({view:api.view});api.view.ui.add(activeAnalysis,{position:"top-right",index:0});if(tool==="measure"&&activeAnalysis.viewModel?.newMeasurement)activeAnalysis.viewModel.newMeasurement();if(tool==="slice"&&activeAnalysis.viewModel)activeAnalysis.viewModel.tiltEnabled=true;emit("onAnalysis",{tool,state:"ready"})}catch(error){console.warn("3D analysis unavailable",tool,error);emit("onAnalysis",{tool,state:"failed",error})}},error=>emit("onAnalysis",{tool,state:"failed",error}));
  }
  function setLighting(hour){if(!api.ready||!api.view?.environment?.lighting)return;const h=Math.max(0,Math.min(23,Number(hour)||0));api.view.environment.lighting.date=new Date(Date.UTC(2026,8,14,h-4,0,0));api.view.environment.lighting.directShadowsEnabled=true;emit("onLighting",{hour:h})}
  function setWeather(kind="clear",intensity=.35){
    if(!api.ready||typeof window.require!=="function")return;const token=++weatherToken,classes={clear:"SunnyWeather",cloudy:"CloudyWeather",foggy:"FoggyWeather",rainy:"RainyWeather"},name=classes[kind]||classes.clear;
    window.require([`esri/views/3d/environment/${name}`],function(Weather){if(token!==weatherToken||!api.ready)return;try{const options=kind==="rainy"?{cloudCover:.72,precipitation:Math.max(.05,Math.min(1,intensity))}:kind==="cloudy"?{cloudCover:.68}:{};api.view.environment.weather=new Weather(options);emit("onWeather",{kind,state:"ready"})}catch(error){console.warn("3D weather unavailable",kind,error);emit("onWeather",{kind,state:"failed",error})}},error=>emit("onWeather",{kind,state:"failed",error}));
  }
  function setSuspended(suspended){const next=!!suspended;if(next===api.suspended)return;api.suspended=next;if(next){stopOrbit();return}if(api.ready){ensureData();resize();emitCamera()}}
  function destroy(){if(pulseTimer){clearInterval(pulseTimer);pulseTimer=null}clearAnalysis();weatherToken++;stopOrbit();Object.values(modelUrls).forEach(url=>{try{URL.revokeObjectURL(url)}catch(e){}});modelUrls={};iconUrls={};try{api.view&&api.view.destroy()}catch(e){}api.view=null;api.ready=false;api.suspended=true}

  function init(options){
    api.options=options||{};emit("onStatus",{state:"loading",message:"Connecting 3D services"});
    if(typeof window.require!=="function")return fail(new Error("ArcGIS SDK loader unavailable"));
    window.require([
      "esri/Map","esri/Basemap","esri/Ground","esri/views/SceneView","esri/layers/TileLayer","esri/layers/ElevationLayer","esri/layers/SceneLayer","esri/layers/GraphicsLayer","esri/Graphic","esri/geometry/Point","esri/geometry/Polyline","esri/geometry/geometryEngine","esri/core/reactiveUtils"
    ],function(Map,Basemap,Ground,SceneView,TileLayer,ElevationLayer,SceneLayer,GraphicsLayer,Graphic,Point,Polyline,geometryEngine,reactiveUtils){
      Object.assign(C,{Map,Basemap,Ground,SceneView,TileLayer,ElevationLayer,SceneLayer,GraphicsLayer,Graphic,Point,Polyline,geometryEngine,reactiveUtils});
      layers.imagery=new TileLayer({url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",title:"World Imagery",visible:true});
      layers.streets=new TileLayer({url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",title:"World Street Map",visible:false});
      layers.terrainBase=new TileLayer({url:"https://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer",title:"World Terrain",visible:false});
      layers.labels=new TileLayer({url:"https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer",title:"Street and place labels",visible:true});
      layers.elevation=new ElevationLayer({url:"https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",title:"World Elevation 3D"});
      layers.buildings=new SceneLayer({portalItem:{id:"ca0470dbbddb4db28bad74ed39949e25"},title:"OpenStreetMap 3D Buildings",opacity:.82,popupEnabled:false});
      layers.zones=new GraphicsLayer({title:"Operational zones",elevationInfo:{mode:"on-the-ground"}});
      layers.noFly=new GraphicsLayer({title:"No-fly zones",elevationInfo:{mode:"relative-to-ground"}});
      layers.routes=new GraphicsLayer({title:"Mission corridors",elevationInfo:{mode:"relative-to-ground"}});
      layers.assets=new GraphicsLayer({title:"3D autonomous assets",elevationInfo:{mode:"relative-to-ground"}});
      layers.beacons=new GraphicsLayer({title:"Persistent asset beacons",elevationInfo:{mode:"relative-to-ground"}});
      layers.assetLabels=new GraphicsLayer({title:"Asset identification labels",elevationInfo:{mode:"relative-to-ground"}});
      layers.pulse=new GraphicsLayer({title:"Selected asset",elevationInfo:{mode:"relative-to-ground"}});
      layers.incidents=new GraphicsLayer({title:"Incidents",elevationInfo:{mode:"relative-to-ground"}});
      layers.context=new GraphicsLayer({title:"Operational context",elevationInfo:{mode:"relative-to-ground"}});
      layers.twinLinks=new GraphicsLayer({title:"Digital twin utility topology",elevationInfo:{mode:"relative-to-ground"}});
      layers.twinFacilities=new GraphicsLayer({title:"Digital twin facilities",elevationInfo:{mode:"relative-to-ground"}});
      layers.twinSensors=new GraphicsLayer({title:"Digital twin sensor mesh",elevationInfo:{mode:"relative-to-ground"}});
      layers.twinScenario=new GraphicsLayer({title:"Digital twin scenario impact",elevationInfo:{mode:"on-the-ground"}});
      const basemap=new Basemap({baseLayers:[layers.imagery,layers.streets,layers.terrainBase],referenceLayers:[layers.labels],title:"UAE Operational Basemap"});
      const ground=new Ground({layers:[layers.elevation],surfaceColor:"#06131b",opacity:1,navigationConstraint:{type:"none"}});
      const map=new Map({basemap,ground,layers:[layers.buildings,layers.zones,layers.noFly,layers.twinScenario,layers.twinLinks,layers.routes,layers.assets,layers.beacons,layers.pulse,layers.assetLabels,layers.incidents,layers.context,layers.twinFacilities,layers.twinSensors]});
      api.view=new SceneView({container:"arcgisMap",map,center:places.abudhabi.center,zoom:places.abudhabi.zoom,tilt:places.abudhabi.tilt,heading:places.abudhabi.heading,qualityProfile:"medium",viewingMode:"global",popupEnabled:false,constraints:{altitude:{min:6,max:24000000}},environment:{atmosphere:{quality:"low"},lighting:{date:new Date("2026-09-14T13:30:00Z"),directShadowsEnabled:true,ambientOcclusionEnabled:false,cameraTrackingEnabled:false},starsEnabled:false,background:{type:"color",color:[3,12,18,1]}},ui:{components:["attribution"]}});
      api.view.on("pointer-down",stopOrbit);
      api.view.on("click",function(event){api.view.hitTest(event,{include:[layers.assets,layers.beacons,layers.assetLabels,layers.incidents,layers.noFly,layers.routes,layers.context,layers.twinLinks,layers.twinFacilities,layers.twinSensors,layers.twinScenario]}).then(function(hit){const item=hit.results&&hit.results.find(r=>r.graphic&&r.graphic.attributes);if(!item)return;const a=item.graphic.attributes;if(a.kind==="asset")emit("onAsset",a.id);if(a.kind==="incident")emit("onIncident",a.id);if(a.kind==="region")emit("onRegion",a.region);if(["no-fly","landing-pad","weather","robot-zone","robot-base","maritime-zone","maritime-port","maritime-contact","mobility-zone","mobility-hub","mobility-node","ai-detection","ai-edge","response-zone","incident-post","twin-facility","twin-sensor","twin-scenario","twin-link"].includes(a.kind))emit("onMapContext",{type:a.kind,id:a.id});if(a.kind==="route"||a.kind==="incident-route")emit("onMapContext",{type:"route",id:a.id})})});
      reactiveUtils.watch(()=>api.view.stationary,stationary=>{if(stationary)emitCamera()},{initial:true});
      reactiveUtils.watch(()=>api.view.zoom,zoom=>{const bucket=(api.data?.cartography?.assetStyle||"auto")+":"+(api.mode==="tactical"||zoom<11.25?"2d":"3d")+":"+(zoom>=13.15?"labels":"clean");if(bucket!==lastSymbolBucket){lastSymbolBucket=bucket;ensureData()}},{initial:true});
      Promise.all([api.view.when(),layers.imagery.load(),layers.elevation.load(),layers.buildings.load()]).then(function(){
        naturalRenderer=layers.buildings.renderer&&layers.buildings.renderer.clone?layers.buildings.renderer.clone():layers.buildings.renderer;
        api.ready=true;api.failed=false;activateBasemap(api.mode);applySceneSettings();ensureData();if(pulseTimer)clearInterval(pulseTimer);pulseTimer=setInterval(pulse,680);emit("onStatus",{state:"ready",message:"Live 3D operational map"});emitCamera();
      }).catch(fail);
    },fail);
  }

  window.ACC_ARCGIS_MAP={init,sync,setMode,cameraAction,flyToPlace,flyTo,setBuildingStyle,setQuality,applySceneSettings,resize,stopOrbit,startAnalysis,clearAnalysis,setLighting,setWeather,setSuspended,destroy,isActive:()=>api.ready&&!api.failed,isLoading:()=>!api.ready&&!api.failed,isFailed:()=>api.failed,getView:()=>api.view,getDiagnostics:()=>({...metrics,suspended:api.suspended,quality:api.view?.qualityProfile||"unavailable"})};
})();
