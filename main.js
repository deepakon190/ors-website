/* ═══════════════════════════════════════════
   ON ROUTE SERVICES — main.js
═══════════════════════════════════════════ */
'use strict';

var VEHICLES = {
  Car: {
    "Acura":         ["ILX","MDX","RDX","RLX","TLX","NSX","Integra"],
    "Audi":          ["A3","A4","A5","A6","A7","A8","Q3","Q5","Q7","Q8","TT","R8","e-tron"],
    "BMW":           ["2 Series","3 Series","4 Series","5 Series","7 Series","8 Series","X1","X3","X5","X7","M3","M5","Z4","i4","iX"],
    "Buick":         ["Enclave","Encore","Encore GX","Envision","LaCrosse"],
    "Cadillac":      ["CT4","CT5","Escalade","XT4","XT5","XT6","LYRIQ"],
    "Chevrolet":     ["Blazer","Camaro","Colorado","Corvette","Equinox","Malibu","Silverado 1500","Silverado 2500","Spark","Tahoe","Trailblazer","Traverse","Trax"],
    "Chrysler":      ["300","Pacifica","Voyager"],
    "Dodge":         ["Challenger","Charger","Durango","Grand Caravan","Hornet"],
    "Ford":          ["Bronco","Bronco Sport","Edge","Escape","Expedition","Explorer","F-150","F-250","F-350","Fusion","Maverick","Mustang","Mustang Mach-E","Ranger","Taurus"],
    "Genesis":       ["G70","G80","G90","GV70","GV80"],
    "GMC":           ["Acadia","Canyon","Sierra 1500","Sierra 2500","Terrain","Yukon"],
    "Honda":         ["Accord","Civic","CR-V","Fit","HR-V","Insight","Odyssey","Passport","Pilot","Ridgeline"],
    "Hyundai":       ["Accent","Elantra","IONIQ 5","IONIQ 6","Kona","Palisade","Santa Cruz","Santa Fe","Sonata","Tucson","Venue"],
    "Infiniti":      ["Q50","Q60","QX50","QX55","QX60","QX80"],
    "Jeep":          ["Cherokee","Compass","Gladiator","Grand Cherokee","Grand Wagoneer","Renegade","Wrangler"],
    "Kia":           ["Carnival","EV6","Forte","K5","Niro","Rio","Seltos","Soul","Sorento","Sportage","Stinger","Telluride"],
    "Land Rover":    ["Defender","Discovery","Discovery Sport","Range Rover","Range Rover Evoque","Range Rover Sport"],
    "Lexus":         ["ES","GS","GX","IS","LC","LS","LX","NX","RX","UX"],
    "Lincoln":       ["Aviator","Corsair","MKZ","Nautilus","Navigator"],
    "Mazda":         ["CX-3","CX-5","CX-50","CX-9","CX-90","Mazda3","Mazda6","MX-5 Miata"],
    "Mercedes-Benz": ["A-Class","C-Class","CLA","CLS","E-Class","GLA","GLB","GLC","GLE","GLS","S-Class","SL","Sprinter","G-Class"],
    "Mini":          ["Clubman","Convertible","Countryman","Hardtop"],
    "Mitsubishi":    ["Eclipse Cross","Mirage","Outlander","Outlander Sport"],
    "Nissan":        ["Altima","Armada","Frontier","GT-R","Kicks","Leaf","Maxima","Murano","Pathfinder","Rogue","Sentra","Titan","Versa"],
    "Porsche":       ["718 Boxster","718 Cayman","911","Cayenne","Macan","Panamera","Taycan"],
    "RAM":           ["1500","2500","3500","ProMaster"],
    "Subaru":        ["Ascent","BRZ","Crosstrek","Forester","Impreza","Legacy","Outback","WRX"],
    "Tesla":         ["Model 3","Model S","Model X","Model Y","Cybertruck"],
    "Toyota":        ["4Runner","Avalon","Camry","Corolla","Crown","GR Supra","Highlander","Land Cruiser","Prius","RAV4","Sequoia","Sienna","Tacoma","Tundra","Venza"],
    "Volkswagen":    ["Atlas","Golf","ID.4","Jetta","Passat","Taos","Tiguan"],
    "Volvo":         ["C40","S60","S90","V60","V90","XC40","XC60","XC90"]
  },
  Truck: {
    "Ford":             ["F-150","F-250 Super Duty","F-350 Super Duty","F-450 Super Duty","Maverick","Ranger","F-150 Lightning"],
    "Chevrolet":        ["Colorado","Silverado 1500","Silverado 2500HD","Silverado 3500HD"],
    "GMC":              ["Canyon","Sierra 1500","Sierra 2500HD","Sierra 3500HD"],
    "RAM":              ["1500","2500","3500","4500","5500","ProMaster"],
    "Toyota":           ["Tacoma","Tundra"],
    "Nissan":           ["Frontier","Titan","Titan XD"],
    "Honda":            ["Ridgeline"],
    "Jeep":             ["Gladiator"],
    "Dodge":            ["Dakota"],
    "Rivian":           ["R1T"],
    "Other Heavy Duty": ["Freightliner","Kenworth","Peterbilt","Mack","International","Volvo Truck","Western Star"]
  }
};

var SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwapEHEpEldMDtpz9w3TsOUDY7Ebsj2bCXbo9v3H2sYFLhOTXCFzVUJa9Q3JTRDkNCm7w/exec';
var currentType = 'Car';

function g(id){ return document.getElementById(id); }

function populateBrands(type){
  var s = g('fBrand'); if(!s) return;
  s.innerHTML = '<option value="">-- Select Brand --</option>';
  Object.keys(VEHICLES[type]||{}).sort().forEach(function(b){
    var o=document.createElement('option'); o.value=o.textContent=b; s.appendChild(o);
  });
  var m=g('fModel'); if(m) m.innerHTML='<option value="">-- Select Brand First --</option>';
}

function populateModels(type,brand){
  var s=g('fModel'); if(!s) return;
  s.innerHTML='<option value="">-- Select Model --</option>';
  ((VEHICLES[type]||{})[brand]||[]).forEach(function(m){
    var o=document.createElement('option'); o.value=o.textContent=m; s.appendChild(o);
  });
}

function setType(type){
  currentType=type;
  g('fVehicleType').value=type;
  g('vBtnCar').classList.toggle('active', type==='Car');
  g('vBtnTruck').classList.toggle('active', type==='Truck');
  populateBrands(type);
}

var chatOpen=false;
var REPLIES={
  book:      "Head to our <a href='#booking' style='color:var(--orange)'>Book Online section</a> or call <a href='tel:8562095990' style='color:var(--orange)'>(856) 209-5990</a>.",
  brake:     "We replace brake pads on-site! Call <a href='tel:8562095990' style='color:var(--orange)'>(856) 209-5990</a> or <a href='#booking' style='color:var(--orange)'>book online</a>.",
  oil:       "We handle oil leaks on-site. <a href='#booking' style='color:var(--orange)'>Book a diagnosis</a> or call <a href='tel:8562095990' style='color:var(--orange)'>(856) 209-5990</a>.",
  tire:      "Flat tires and replacements at your location! Call <a href='tel:8562095990' style='color:var(--orange)'>(856) 209-5990</a>.",
  emergency: "CALL NOW: <a href='tel:8562095990' style='color:var(--orange);font-size:1.1em;font-weight:700'>(856) 209-5990</a> — fast response across Millville and South Jersey.",
  price:     "Upfront quotes, no hidden fees. Call <a href='tel:8562095990' style='color:var(--orange)'>(856) 209-5990</a> for a fast estimate!",
  default:   "For fastest help call <a href='tel:8562095990' style='color:var(--orange)'>(856) 209-5990</a> or <a href='#booking' style='color:var(--orange)'>book online</a>."
};

function getReply(t){
  t=t.toLowerCase();
  if(t.includes('book')||t.includes('schedule')||t.includes('appoint')) return REPLIES.book;
  if(t.includes('brake')||t.includes('pad'))                            return REPLIES.brake;
  if(t.includes('oil')||t.includes('leak')||t.includes('gasket'))       return REPLIES.oil;
  if(t.includes('tire')||t.includes('tyre')||t.includes('flat'))        return REPLIES.tire;
  if(t.includes('emergency')||t.includes('stuck')||t.includes('strand'))return REPLIES.emergency;
  if(t.includes('price')||t.includes('cost')||t.includes('how much'))   return REPLIES.price;
  return REPLIES.default;
}

function addMsg(html,type){
  var b=g('chatMsgs'); if(!b) return;
  var d=document.createElement('div');
  d.className='msg '+type;
  d.innerHTML=html+'<div class="msg-time">Just now</div>';
  b.appendChild(d); b.scrollTop=b.scrollHeight;
}

function toggleChat(){
  chatOpen=!chatOpen;
  var w=g('chatWin'),ic=g('chatIcon'),bk=document.querySelector('.chat-badge');
  if(!w||!ic) return;
  w.classList.toggle('open',chatOpen);
  if(chatOpen){
    if(bk) bk.style.display='none';
    ic.innerHTML='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>';
  } else {
    ic.innerHTML='<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>';
  }
}

function sendChat(){
  var inp=g('chatInput'); if(!inp) return;
  var t=inp.value.trim(); if(!t) return;
  addMsg(t,'user'); inp.value='';
  var qb=g('quickBtns'); if(qb) qb.style.display='none';
  setTimeout(function(){ addMsg(getReply(t),'bot'); },800);
}

function markErr(id){
  var e=g(id); if(!e) return;
  e.classList.add('err');
  setTimeout(function(){ e.classList.remove('err'); },2500);
  e.focus();
}

function validate(){
  var checks=[
    {id:'fName',   msg:'Please enter your full name.'},
    {id:'fEmail',  msg:'Please enter your email address.'},
    {id:'fPhone',  msg:'Please enter your phone number.'},
    {id:'fBrand',  msg:'Please select a vehicle brand.'},
    {id:'fYear',   msg:'Please select the vehicle year.'},
    {id:'fModel',  msg:'Please select a vehicle model.'},
    {id:'fService',msg:'Please select a service.'},
    {id:'fStreet', msg:'Please enter your street address.'},
    {id:'fCity',   msg:'Please enter your city.'},
    {id:'fZip',    msg:'Please enter your ZIP code.'}
  ];
  for(var i=0;i<checks.length;i++){
    var el=g(checks[i].id);
    if(!el||!el.value.trim()){ markErr(checks[i].id); alert(checks[i].msg); return false; }
  }
  if(g('fService').value==='Other'){
    var ot=g('fOther');
    if(!ot||!ot.value.trim()){ markErr('fOther'); alert('Please describe your problem.'); return false; }
  }
  if(!/^[^@]+@[^@]+\.[^@]+$/.test(g('fEmail').value)){
    markErr('fEmail'); alert('Please enter a valid email address.'); return false;
  }
  return true;
}

document.addEventListener('DOMContentLoaded', function(){

  /* Nav shadow */
  var nav=document.querySelector('nav');
  window.addEventListener('scroll',function(){
    if(nav) nav.style.boxShadow=window.scrollY>40?'0 4px 32px rgba(0,0,0,.5)':'none';
  },{passive:true});

  /* Hamburger */
  var hb=g('hamburgerBtn');
  if(hb) hb.addEventListener('click',function(){ document.querySelector('.nav-links').classList.toggle('open'); });

  /* Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var t=document.querySelector(a.getAttribute('href'));
      if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); document.querySelector('.nav-links').classList.remove('open'); }
    });
  });

  /* Scroll reveal */
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('vis'); });
  },{threshold:0,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  setTimeout(function(){
    document.querySelectorAll('.reveal').forEach(function(el){
      if(el.getBoundingClientRect().top<window.innerHeight) el.classList.add('vis');
    });
  },100);

  /* Chat events */
  var cb=g('chatBtn'), cx=g('chatCloseBtn'), cs=g('chatSendBtn'), ci=g('chatInput');
  if(cb) cb.addEventListener('click',toggleChat);
  if(cx) cx.addEventListener('click',toggleChat);
  if(cs) cs.addEventListener('click',sendChat);
  if(ci) ci.addEventListener('keypress',function(e){ if(e.key==='Enter') sendChat(); });
  document.querySelectorAll('.qbtn').forEach(function(btn){
    btn.addEventListener('click',function(){
      var msg=this.getAttribute('data-msg'); if(!msg) return;
      addMsg(msg,'user');
      var qb=g('quickBtns'); if(qb) qb.style.display='none';
      setTimeout(function(){ addMsg(getReply(msg),'bot'); },600);
    });
  });

  /* EmailJS */
  if(typeof emailjs!=='undefined') emailjs.init({publicKey:'0b-42YoW_Gw1QsBI8'});

  /* ── BOOKING FORM ── */
  var bookForm=g('bookForm');
  if(!bookForm) return;

  /* Year */
  var ys=g('fYear');
  if(ys){
    var cur=new Date().getFullYear();
    for(var y=cur+1;y>=1990;y--){
      var o=document.createElement('option'); o.value=o.textContent=y; ys.appendChild(o);
    }
  }

  /* Min date */
  var di=g('fDate'); if(di) di.min=new Date().toISOString().split('T')[0];

  /* Vehicle buttons */
  var vC=g('vBtnCar'), vT=g('vBtnTruck');
  if(vC) vC.addEventListener('click',function(){ setType('Car'); });
  if(vT) vT.addEventListener('click',function(){ setType('Truck'); });
  populateBrands('Car');

  /* Brand → Model */
  var bs=g('fBrand');
  if(bs) bs.addEventListener('change',function(){ populateModels(currentType,this.value); });

  /* Other box */
  var ss=g('fService'), ob=g('otherBox');
  if(ss) ss.addEventListener('change',function(){
    if(ob) ob.style.display=this.value==='Other'?'block':'none';
  });

  /* Live location */
  var lb=g('liveLocBtn'), lst=g('locStatus');
  if(lb){
    lb.addEventListener('click',function(){
      if(!navigator.geolocation){
        lst.textContent='Geolocation not supported.'; lst.className='loc-status fail'; return;
      }
      lst.textContent='Getting your location...'; lst.className='loc-status loading'; lb.disabled=true;
      navigator.geolocation.getCurrentPosition(
        function(pos){
          fetch('https://nominatim.openstreetmap.org/reverse?lat='+pos.coords.latitude+'&lon='+pos.coords.longitude+'&format=json')
            .then(function(r){ return r.json(); })
            .then(function(d){
              var a=d.address||{};
              var st=g('fStreet'),ci=g('fCity'),sta=g('fState'),zi=g('fZip');
              if(st)  st.value=((a.house_number||'')+' '+(a.road||a.pedestrian||'')).trim();
              if(ci)  ci.value=a.city||a.town||a.village||'';
              if(sta) sta.value=a.state||'NJ';
              if(zi)  zi.value=a.postcode||'';
              lst.textContent='Location detected! Please verify.'; lst.className='loc-status ok'; lb.disabled=false;
            })
            .catch(function(){
              var st=g('fStreet');
              if(st) st.value=pos.coords.latitude.toFixed(5)+', '+pos.coords.longitude.toFixed(5);
              lst.textContent='Coordinates captured.'; lst.className='loc-status ok'; lb.disabled=false;
            });
        },
        function(err){
          var m={1:'Location denied. Type your address.',2:'Location unavailable.',3:'Location timed out.'};
          lst.textContent=m[err.code]||'Could not get location.'; lst.className='loc-status fail'; lb.disabled=false;
        },
        {timeout:12000,enableHighAccuracy:true}
      );
    });
  }

  /* Popup close */
  var cp=g('closePopup');
  if(cp) cp.addEventListener('click',function(){
    g('successOverlay').classList.remove('show');
    bookForm.reset(); populateBrands('Car'); setType('Car');
    if(ob) ob.style.display='none';
  });

  /* Submit */
  bookForm.addEventListener('submit',function(e){
    e.preventDefault();
    if(!validate()) return;

    var svc=g('fService').value;
    var oth=g('fOther')?g('fOther').value:'';
    var svcD=svc==='Other'?'Other: '+oth:svc;
    var name=g('fName').value.trim(), email=g('fEmail').value.trim(), phone=g('fPhone').value.trim();
    var brand=g('fBrand').value, model=g('fModel').value, year=g('fYear').value;
    var street=g('fStreet').value.trim(), city=g('fCity').value.trim();
    var state=g('fState').value, zip=g('fZip').value.trim();
    var date=g('fDate').value||'Flexible', time=g('fTime').value||'Any time';
    var addr=street+', '+city+', '+state+' '+zip;
    var vt=g('fVehicleType').value;
    var ts=new Date().toLocaleString('en-US',{timeZone:'America/New_York'});

    var sb=g('submitBtn'), st=g('submitText');
    sb.disabled=true; st.textContent='Sending...';

    var ep={
      to_email:email, from_name:name, from_email:email, phone:phone,
      vehicle_type:vt, brand:brand, model:model, year:year,
      service:svcD, location:addr, date:date, time:time,
      reply_to:'admin@onrouteservice.com'
    };
    var sd={
      timestamp:ts, name:name, email:email, phone:phone,
      vehicle:vt+' - '+brand+' '+model+' '+year,
      service:svcD, location:addr, date:date, time:time, status:'New'
    };

    function done(){
      sb.disabled=false; st.textContent='Send Booking Request';
      var ov=g('successOverlay');
      if(g('popName'))  g('popName').textContent=name;
      if(g('popEmail')) g('popEmail').textContent=email;
      if(g('popPhone')) g('popPhone').textContent=phone;
      if(ov) ov.classList.add('show');
    }

    function saveSheet(){
      return fetch(SHEETS_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(sd)});
    }

    if(typeof emailjs!=='undefined'){
      emailjs.send('service_53qpycb','template_xaz3et2',ep)
        .then(saveSheet).then(done)
        .catch(function(){ saveSheet().finally(done); });
    } else {
      saveSheet().finally(done);
    }
  });

});