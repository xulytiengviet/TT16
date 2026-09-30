(function (w) {
  'use strict';

  var VERSION = '0.1.0';
  var selfSrc = document.currentScript && document.currentScript.src ? document.currentScript.src : '';
  var baseUrl = selfSrc ? new URL('.', selfSrc).href : '';
  var LJS = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';
  var LCSS = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';
  var DJS = 'https://cdn.jsdelivr.net/npm/leaflet-draw@1.0.4/dist/leaflet.draw.js';
  var DCSS = 'https://cdn.jsdelivr.net/npm/leaflet-draw@1.0.4/dist/leaflet.draw.css';

  var fallbackCatalog = [
    {id:'BV_Rg_quocgia',label:'Ranh giới quốc gia',category:'01 · Ranh giới chung',geometry:'line',aci:206,scales:[500,2000,5000,10000]},
    {id:'BV_Rg_captinh',label:'Ranh giới tỉnh/thành phố',category:'01 · Ranh giới chung',geometry:'line',aci:238,scales:[500,2000,5000,10000]},
    {id:'BV_Rg_capcoso',label:'Ranh giới xã/phường/đặc khu',category:'01 · Ranh giới chung',geometry:'line',aci:14,scales:[500,2000,5000,10000]},
    {id:'BV_Rg_lapquyhoach',label:'Ranh giới lập quy hoạch',category:'01 · Ranh giới chung',geometry:'line',aci:1,scales:[500,2000,5000,10000]}
  ];

  function addCss(url,id){
    if(document.getElementById(id)) return Promise.resolve();
    return new Promise(function(ok,fail){
      var e=document.createElement('link'); e.id=id; e.rel='stylesheet'; e.href=url;
      e.onload=ok; e.onerror=fail; document.head.appendChild(e);
    });
  }

  function addScript(url,id){
    if(document.getElementById(id)) return Promise.resolve();
    return new Promise(function(ok,fail){
      var e=document.createElement('script'); e.id=id; e.src=url;
      e.onload=ok; e.onerror=fail; document.head.appendChild(e);
    });
  }

  async function deps(){
    await addCss(LCSS,'tt16-leaflet-css');
    if(!w.L) await addScript(LJS,'tt16-leaflet-js');
    await addCss(DCSS,'tt16-draw-css');
    if(!(w.L && w.L.Control && w.L.Control.Draw)) await addScript(DJS,'tt16-draw-js');
  }

  function uiCss(){
    if(document.getElementById('tt16-player-css')) return;
    var s=document.createElement('style'); s.id='tt16-player-css';
    s.textContent=
      '.tt16p{height:100%;min-height:560px;display:flex;flex-direction:column;font-family:Inter,system-ui,-apple-system,Segoe UI,sans-serif;color:#172033;background:#fff;border:1px solid #dfe5ec;border-radius:14px;overflow:hidden;box-shadow:0 8px 30px rgba(16,24,40,.08)}'+
      '.tt16p *{box-sizing:border-box}.tt16p button,.tt16p input,.tt16p select,.tt16p textarea{font:inherit}.tt16p-h{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:9px 12px;border-bottom:1px solid #e3e8ef;background:#fff}.tt16p-brand{font-weight:800;margin-right:8px}.tt16p-brand small{display:block;font-size:11px;color:#667085;font-weight:500}.tt16p-grow{flex:1}.tt16p-btn,.tt16p-in,.tt16p-sel,.tt16p-ta{border:1px solid #d5dce5;border-radius:9px;background:#fff;color:#172033}.tt16p-btn{padding:8px 10px;cursor:pointer;font-weight:650}.tt16p-btn:hover{background:#f7f9fc}.tt16p-btn.primary{background:#0f5bd8;border-color:#0f5bd8;color:#fff}.tt16p-btn.danger{color:#b42318}.tt16p-in,.tt16p-sel,.tt16p-ta{width:100%;padding:8px 9px}.tt16p-h .tt16p-sel{width:auto;min-width:118px}.tt16p-grid{display:grid;grid-template-columns:260px minmax(0,1fr) 280px;flex:1;min-height:0}.tt16p-side{padding:12px;overflow:auto;background:#fff}.tt16p-side.l{border-right:1px solid #e3e8ef}.tt16p-side.r{border-left:1px solid #e3e8ef}.tt16p-map{height:100%;min-height:500px;background:#edf1f5}.tt16p-title{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:#667085;margin:0 0 7px}.tt16p-help{font-size:12px;line-height:1.45;color:#667085;margin:7px 0 14px}.tt16p-card{display:grid;grid-template-columns:26px 1fr;gap:8px;align-items:center;padding:8px;margin-top:8px;border:1px solid #e3e8ef;border-radius:10px;background:#f7f9fc}.tt16p-sw{width:24px;height:24px;border:1px solid rgba(0,0,0,.18);border-radius:6px}.tt16p-card b{display:block;font-size:13px}.tt16p-card span{font-size:11px;color:#667085}.tt16p-form label{display:block;font-size:12px;font-weight:700;margin:8px 0 5px}.tt16p-ta{min-height:66px;resize:vertical}.tt16p-actions{display:flex;gap:6px;flex-wrap:wrap;margin-top:9px}.tt16p-list{display:flex;flex-direction:column;gap:5px;margin-top:14px}.tt16p-item{width:100%;text-align:left;padding:7px 8px;border:1px solid #e3e8ef;border-radius:8px;background:#fff;cursor:pointer}.tt16p-item:hover,.tt16p-item.on{border-color:#8fb3ee;background:#f3f7ff}.tt16p-item b{display:block;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tt16p-item span{font-size:11px;color:#667085}.tt16p-foot{display:flex;gap:8px;align-items:center;padding:6px 10px;border-top:1px solid #e3e8ef;font-size:12px;color:#667085}.tt16p-dot{width:8px;height:8px;border-radius:50%;background:#12b76a}.tt16p-mark{width:16px;height:16px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.35)}.tt16p-readonly .editonly{display:none!important}@media(max-width:980px){.tt16p-grid{grid-template-columns:220px minmax(0,1fr)}.tt16p-side.r{display:none}}@media(max-width:700px){.tt16p-grid{grid-template-columns:1fr}.tt16p-side.l{display:none}.tt16p-map{min-height:540px}.tt16p-grow{display:none}}';
    document.head.appendChild(s);
  }

  function color(aci){
    var p={1:'#e03131',3:'#2f9e44',7:'#343a40',8:'#868e96',9:'#adb5bd',14:'#0ca678',15:'#1098ad',16:'#0b7285',22:'#f76707',24:'#e8590c',30:'#f08c00',32:'#f59f00',34:'#d97706',40:'#fab005',42:'#fcc419',44:'#ffd43b',46:'#ffe066',56:'#94d82d',57:'#82c91e',64:'#66a80f',72:'#40c057',79:'#2b8a3e',94:'#20c997',107:'#087f5b',126:'#0ca678',129:'#099268',144:'#15aabf',148:'#0c8599',150:'#228be6',152:'#1c7ed6',154:'#339af0',175:'#5f3dc4',192:'#7950f2',195:'#845ef7',206:'#ae3ec9',210:'#cc5de8',220:'#e64980',238:'#d6336c',243:'#c2255c',251:'#495057',252:'#868e96'};
    if(p[aci]) return p[aci];
    return 'hsl('+((Number(aci||1)*137.508)%360)+' 62% 47%)';
  }

  function esc(v){
    return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});
  }

  function clone(v){return JSON.parse(JSON.stringify(v==null?null:v));}

  async function getCatalog(o){
    if(Array.isArray(o.catalog)&&o.catalog.length) return o.catalog;
    var url=o.catalogUrl || (baseUrl ? baseUrl+'catalog/tt16-symbols.json' : 'catalog/tt16-symbols.json');
    try{
      var r=await fetch(url,{cache:'no-cache'});
      if(!r.ok) throw new Error('HTTP '+r.status);
      var d=await r.json();
      return Array.isArray(d)&&d.length?d:fallbackCatalog;
    }catch(e){
      console.warn('[TT16Player] catalog fallback',e);
      return fallbackCatalog;
    }
  }

  function geom(L,layer){
    if(layer instanceof L.Marker || layer instanceof L.CircleMarker) return 'point';
    if(layer instanceof L.Polygon) return 'polygon';
    if(layer instanceof L.Polyline) return 'line';
    return 'unknown';
  }

  async function mount(target,o){
    o=Object.assign({
      editable:true, scale:5000, phase:'QHDD', center:[10.25,106.38], zoom:12, height:720,
      tileUrl:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      tileAttribution:'&copy; OpenStreetMap contributors',
      phasePrefixes:{BASE:'',HT:'HT_',QHDD:'QHDD_',QHDH:'QHDH_',CUSTOM:''}
    },o||{});

    var host=typeof target==='string'?document.querySelector(target):target;
    if(!host) throw new Error('TT16Player: không tìm thấy phần tử mount.');

    uiCss(); await deps();
    var L=w.L, catalog=await getCatalog(o);

    host.innerHTML=[
      '<div class="tt16p '+(o.editable?'':'tt16p-readonly')+'" style="height:'+(Number(o.height)||720)+'px">',
      '<div class="tt16p-h">',
      '<div class="tt16p-brand">TT16 Map Editor<small>Player v'+VERSION+' · biên tập WebGIS</small></div>',
      '<select class="tt16p-sel" data-x="scale"><option value="500">1/500</option><option value="2000">1/2.000</option><option value="5000">1/5.000</option><option value="10000">1/10.000</option></select>',
      '<select class="tt16p-sel editonly" data-x="phase"><option value="BASE">Lớp gốc</option><option value="HT">Hiện trạng</option><option value="QHDD">Quy hoạch đợt đầu</option><option value="QHDH">Quy hoạch dài hạn</option><option value="CUSTOM">Tùy chỉnh</option></select>',
      '<div class="tt16p-grow"></div>',
      '<button class="tt16p-btn" data-a="open">Mở GeoJSON</button>',
      '<button class="tt16p-btn primary" data-a="export">Xuất GeoJSON</button>',
      '<input type="file" data-x="file" accept=".json,.geojson,application/json,application/geo+json" hidden>',
      '</div>',
      '<div class="tt16p-grid">',
      '<aside class="tt16p-side l"><div class="tt16p-title">Ký hiệu / phân lớp</div>',
      '<input class="tt16p-in" data-x="search" placeholder="Tìm lớp TT16…">',
      '<select class="tt16p-sel" data-x="symbol" size="14" style="margin-top:8px"></select>',
      '<div class="tt16p-card" data-x="card"></div>',
      '<div class="tt16p-help editonly">Chọn lớp rồi dùng công cụ vẽ trên bản đồ. Metadata TT16 được giữ trong GeoJSON.</div></aside>',
      '<main><div class="tt16p-map" data-x="map"></div></main>',
      '<aside class="tt16p-side r"><div class="tt16p-title">Thuộc tính đối tượng</div>',
      '<div class="tt16p-form"><label>Tên</label><input class="tt16p-in" data-f="name"><label>Mã</label><input class="tt16p-in" data-f="code"><label>Ghi chú</label><textarea class="tt16p-ta" data-f="note"></textarea><label>Layer TT16</label><input class="tt16p-in" data-f="layer" readonly>',
      '<div class="tt16p-actions editonly"><button class="tt16p-btn primary" data-a="save">Lưu</button><button class="tt16p-btn" data-a="apply">Áp ký hiệu</button><button class="tt16p-btn danger" data-a="delete">Xóa</button></div></div>',
      '<div class="tt16p-title" style="margin-top:18px">Đối tượng</div><div class="tt16p-list" data-x="list"></div></aside>',
      '</div><div class="tt16p-foot"><span class="tt16p-dot"></span><span data-x="status">Sẵn sàng.</span></div></div>'
    ].join('');

    var root=host.querySelector('.tt16p');
    var q=function(s){return root.querySelector(s);};
    var el={
      map:q('[data-x="map"]'),scale:q('[data-x="scale"]'),phase:q('[data-x="phase"]'),
      search:q('[data-x="search"]'),symbol:q('[data-x="symbol"]'),card:q('[data-x="card"]'),
      file:q('[data-x="file"]'),list:q('[data-x="list"]'),status:q('[data-x="status"]'),
      name:q('[data-f="name"]'),code:q('[data-f="code"]'),note:q('[data-f="note"]'),layer:q('[data-f="layer"]')
    };

    var st={scale:Number(o.scale)||5000,phase:o.phase||'QHDD',active:null,selected:null,editable:!!o.editable,draw:null};
    el.scale.value=String(st.scale); el.phase.value=st.phase;

    var map=L.map(el.map,{preferCanvas:true}).setView(o.center,o.zoom);
    L.tileLayer(o.tileUrl,{attribution:o.tileAttribution,maxZoom:o.maxZoom||20}).addTo(map);
    var fg=new L.FeatureGroup().addTo(map);

    function byId(id){return catalog.find(function(x){return x.id===id;})||null;}
    function visible(){
      var t=(el.search.value||'').toLowerCase().trim();
      return catalog.filter(function(x){
        var sok=!x.scales||!x.scales.length||x.scales.indexOf(st.scale)>=0;
        var text=(x.id+' '+(x.label||'')+' '+(x.category||'')).toLowerCase();
        return sok && (!t || text.indexOf(t)>=0);
      });
    }
    function layerName(id){var p=o.phasePrefixes&&o.phasePrefixes[st.phase]!=null?o.phasePrefixes[st.phase]:'';return (p||'')+id;}
    function meta(s,g){return {catalogId:s.id,baseLayer:s.id,layer:layerName(s.id),label:s.label||s.id,category:s.category||'',aci:s.aci==null?null:s.aci,geometry:g,expectedGeometry:s.geometry||null,geometryWarning:!!(s.geometry&&g&&s.geometry!==g),scale:st.scale,phase:st.phase,source:'TT16/2025/TT-BXD - Phụ lục I',playerVersion:VERSION};}
    function props(layer){if(layer.feature&&layer.feature.properties)return layer.feature.properties;if(!layer.__tt16)layer.__tt16={};return layer.__tt16;}
    function put(layer,p){layer.__tt16=clone(p||{})||{};layer.feature=layer.feature||{type:'Feature',properties:{},geometry:null};layer.feature.properties=clone(layer.__tt16);}
    function paint(layer){
      var m=props(layer).tt16||{}, s=byId(m.catalogId||m.baseLayer), c=color(s?s.aci:m.aci), g=geom(L,layer);
      if(g==='point'&&layer.setIcon) layer.setIcon(L.divIcon({className:'',html:'<div class="tt16p-mark" style="background:'+c+'"></div>',iconSize:[16,16],iconAnchor:[8,8]}));
      else if(layer.setStyle) layer.setStyle({color:c,weight:g==='line'?3:2,opacity:.95,fillColor:c,fillOpacity:g==='polygon'?.28:0});
    }
    function renderCatalog(){
      var a=visible(), groups={}; el.symbol.innerHTML='';
      a.forEach(function(x){var k=x.category||'Khác';(groups[k]=groups[k]||[]).push(x);});
      Object.keys(groups).forEach(function(k){var og=document.createElement('optgroup');og.label=k;groups[k].forEach(function(x){var op=document.createElement('option');op.value=x.id;op.textContent=(x.label||x.id)+' · '+x.id;og.appendChild(op);});el.symbol.appendChild(og);});
      if(!a.length){var z=document.createElement('option');z.disabled=true;z.textContent='Không có lớp phù hợp';el.symbol.appendChild(z);st.active=null;}
      else{if(!a.some(function(x){return x.id===st.active;}))st.active=a[0].id;el.symbol.value=st.active;}
      card();
    }
    function card(){
      var s=byId(st.active);if(!s){el.card.innerHTML='Chưa chọn ký hiệu';return;}
      el.card.innerHTML='<div class="tt16p-sw" style="background:'+color(s.aci)+'"></div><div><b>'+esc(s.label||s.id)+'</b><span>'+esc(s.id)+' · ACI '+esc(s.aci)+' · '+esc(s.geometry||'')+'</span></div>';
      el.status.textContent='Đang chọn: '+(s.label||s.id)+' · 1/'+st.scale.toLocaleString('vi-VN');
    }
    function json(){
      var out={type:'FeatureCollection',features:[]};
      fg.eachLayer(function(layer){if(!layer.toGeoJSON)return;var f=layer.toGeoJSON();f.properties=clone(props(layer))||{};out.features.push(f);});
      return out;
    }
    function title(layer,i){var p=props(layer),m=p.tt16||{};return p.name||p.code||m.label||m.layer||('Đối tượng '+(i+1));}
    function list(){
      var a=[];fg.eachLayer(function(x){a.push(x);});el.list.innerHTML='';
      a.forEach(function(layer,i){var p=props(layer),m=p.tt16||{},b=document.createElement('button');b.className='tt16p-item'+(st.selected===layer?' on':'');b.innerHTML='<b>'+esc(title(layer,i))+'</b><span>'+esc(m.layer||geom(L,layer))+'</span>';b.onclick=function(){select(layer,true);};el.list.appendChild(b);});
      if(!a.length)el.list.innerHTML='<div class="tt16p-help">Chưa có đối tượng.</div>';
      el.status.textContent=a.length+' đối tượng · 1/'+st.scale.toLocaleString('vi-VN')+' · '+(st.editable?'Biên tập':'Chỉ xem');
    }
    function inspector(){
      var p=st.selected?props(st.selected):{},m=p.tt16||{};
      el.name.value=p.name||'';el.code.value=p.code||'';el.note.value=p.note||'';el.layer.value=m.layer||'';
      [el.name,el.code,el.note].forEach(function(x){x.disabled=!st.selected||!st.editable;});
    }
    function select(layer,pan){
      if(st.selected&&st.selected!==layer)paint(st.selected);
      st.selected=layer||null;
      if(layer&&layer.setStyle){paint(layer);layer.setStyle({weight:5});}
      if(pan&&layer){if(layer.getBounds&&layer.getBounds().isValid())map.fitBounds(layer.getBounds(),{padding:[24,24],maxZoom:17});else if(layer.getLatLng)map.panTo(layer.getLatLng());}
      inspector();list();
    }
    function bind(layer){if(layer.on)layer.on('click',function(e){if(e.originalEvent)L.DomEvent.stopPropagation(e.originalEvent);select(layer,false);});paint(layer);}
    function changed(){list();host.dispatchEvent(new CustomEvent('tt16:change',{detail:{geojson:json(),scale:st.scale,phase:st.phase}}));}
    function load(data,fit){
      fg.clearLayers();st.selected=null;
      var group=L.geoJSON(data,{style:function(f){var m=f&&f.properties&&f.properties.tt16,s=byId(m&&(m.catalogId||m.baseLayer)),c=color(s?s.aci:(m&&m.aci));return {color:c,weight:2,fillColor:c,fillOpacity:.28};},pointToLayer:function(f,ll){return L.marker(ll);}});
      group.eachLayer(function(layer){put(layer,(layer.feature&&layer.feature.properties)||{});fg.addLayer(layer);bind(layer);});
      inspector();changed();
      if(fit!==false&&fg.getLayers().length){var b=fg.getBounds();if(b.isValid())map.fitBounds(b,{padding:[30,30],maxZoom:17});}
    }
    function download(name){
      var blob=new Blob([JSON.stringify(json(),null,2)],{type:'application/geo+json;charset=utf-8'}),u=URL.createObjectURL(blob),a=document.createElement('a');
      a.href=u;a.download=name||('tt16-map-'+Date.now()+'.geojson');document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u);},1000);
    }
    async function openFile(file){if(!file)return;try{load(JSON.parse(await file.text()),true);}catch(e){alert('Không đọc được GeoJSON.');}}
    function addDraw(){
      if(st.draw)return;
      st.draw=new L.Control.Draw({position:'topleft',draw:{polygon:true,polyline:true,marker:true,rectangle:false,circle:false,circlemarker:false},edit:{featureGroup:fg,remove:true}});
      map.addControl(st.draw);
    }
    function removeDraw(){if(!st.draw)return;map.removeControl(st.draw);st.draw=null;}

    map.on(L.Draw.Event.CREATED,function(e){
      if(!st.editable)return;
      var s=byId(st.active)||visible()[0]||fallbackCatalog[0],layer=e.layer,g=geom(L,layer);
      put(layer,{name:'',code:'',note:'',tt16:meta(s,g)});fg.addLayer(layer);bind(layer);select(layer,false);changed();
    });
    map.on(L.Draw.Event.EDITED,changed);
    map.on(L.Draw.Event.DELETED,function(){st.selected=null;inspector();changed();});
    map.on('click',function(){select(null,false);});

    el.scale.onchange=function(){st.scale=Number(el.scale.value);renderCatalog();};
    el.phase.onchange=function(){st.phase=el.phase.value;card();};
    el.search.oninput=renderCatalog;
    el.symbol.onchange=function(){st.active=el.symbol.value;card();};
    el.file.onchange=function(){openFile(el.file.files[0]);el.file.value='';};

    root.onclick=function(e){
      var a=e.target&&e.target.getAttribute('data-a');if(!a)return;
      if(a==='open')el.file.click();
      if(a==='export')download();
      if(a==='save'&&st.selected&&st.editable){var p=props(st.selected);p.name=el.name.value.trim();p.code=el.code.value.trim();p.note=el.note.value.trim();put(st.selected,p);changed();}
      if(a==='apply'&&st.selected&&st.editable){var s=byId(st.active);if(s){var p2=props(st.selected);p2.tt16=meta(s,geom(L,st.selected));put(st.selected,p2);paint(st.selected);inspector();changed();}}
      if(a==='delete'&&st.selected&&st.editable){fg.removeLayer(st.selected);st.selected=null;inspector();changed();}
    };

    ['dragenter','dragover'].forEach(function(n){root.addEventListener(n,function(e){e.preventDefault();e.dataTransfer.dropEffect='copy';});});
    root.addEventListener('drop',function(e){e.preventDefault();if(e.dataTransfer.files&&e.dataTransfer.files[0])openFile(e.dataTransfer.files[0]);});

    renderCatalog();inspector();list();if(st.editable)addDraw();
    if(o.data){try{var d=typeof o.data==='string'?await (await fetch(o.data)).json():o.data;load(d,true);}catch(e){console.error(e);}}
    setTimeout(function(){map.invalidateSize();},50);

    var api={
      version:VERSION,map:map,catalog:catalog,
      load:function(d){load(d,true);return api;},
      getGeoJSON:json,
      download:download,
      setScale:function(v){el.scale.value=String(v);el.scale.onchange();return api;},
      setPhase:function(v){el.phase.value=v;el.phase.onchange();return api;},
      setEditable:function(v){st.editable=!!v;root.classList.toggle('tt16p-readonly',!st.editable);if(st.editable)addDraw();else removeDraw();inspector();list();return api;},
      destroy:function(){map.remove();host.innerHTML='';}
    };
    return api;
  }

  w.TT16Player={version:VERSION,mount:mount};
})(window);
