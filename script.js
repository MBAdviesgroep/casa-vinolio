(() => {
  const gate = document.getElementById('age-gate');
  const yes = document.getElementById('age-yes');
  const no = document.getElementById('age-no');
  const denied = document.getElementById('gate-denied');
  const ageKey = 'casa_vinolio_18plus';
  const lock = () => { document.body.style.overflow='hidden'; };
  const unlock = () => { gate.hidden=true; document.body.style.overflow=''; };
  try {
    if(sessionStorage.getItem(ageKey)==='yes') unlock();
    else {lock(); yes.focus();}
  } catch (_) { lock(); }
  yes.addEventListener('click', () => {
    try { sessionStorage.setItem(ageKey,'yes'); } catch (_) {}
    unlock(); document.querySelector('.brand').focus();
  });
  no.addEventListener('click', () => { yes.hidden=true; no.hidden=true; denied.hidden=false; });

  const menu = document.getElementById('main-nav');
  const menuButton = document.getElementById('menu-toggle');
  function closeMenu(){menu.classList.remove('open'); menuButton.setAttribute('aria-expanded','false');}
  menuButton.addEventListener('click', () => {const open=menu.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open));});
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e=>{if(e.key==='Escape')closeMenu();});

  const wa = '31682670111';
  const whatsapp = msg => { const url='https://wa.me/'+wa+'?text='+encodeURIComponent(msg); window.open(url,'_blank','noopener,noreferrer'); };
  const selection = new Set();
  const buttons = [...document.querySelectorAll('[data-interest]')];
  const dialog = document.getElementById('wishes-dialog');
  const items = document.getElementById('wishes-items');
  const empty = document.getElementById('wishes-empty');
  const count = document.getElementById('wishlist-count');
  const mobileCount = document.getElementById('mobile-count');
  function draw(){
    buttons.forEach(b=>{const active=selection.has(b.dataset.interest); b.setAttribute('aria-pressed',String(active)); b.firstChild.textContent=active?'Toegevoegd aan mijn wensen ':'Voeg toe aan mijn wensen '; b.querySelector('span').textContent=active?'✓':'↗';});
    items.replaceChildren();
    for (const value of selection) {
      const li=document.createElement('li');
      li.append(document.createTextNode(value));
      const remove=document.createElement('button'); remove.type='button'; remove.textContent='Verwijderen';
      remove.addEventListener('click',()=>{selection.delete(value);draw()});
      li.append(remove);items.append(li);
    }
    count.textContent=String(selection.size); mobileCount.textContent=String(selection.size);
    count.hidden=selection.size===0; mobileCount.hidden=selection.size===0;
    empty.hidden=selection.size!==0;
  }
  buttons.forEach(b=>b.addEventListener('click', () => {const value=b.dataset.interest;selection.has(value)?selection.delete(value):selection.add(value);draw();}));
  function openDialog(){ if(!dialog.open)dialog.showModal(); }
  for(const id of ['open-wishes','mobile-open-wishes'])document.getElementById(id).addEventListener('click',openDialog);
  document.getElementById('close-wishes').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click', e=>{if(e.target===dialog)dialog.close();});
  document.getElementById('send-wishes').addEventListener('click',()=>{
    const name=document.getElementById('wishes-name').value.trim();
    const note=document.getElementById('wishes-note').value.trim();
    if(!selection.size && !note){document.getElementById('wishes-note').focus();return;}
    let msg='Hoi Juup'+(name?', ik ben '+name:'')+',\n\nIk heb interesse in het volgende bij CASA VINOLIO:';
    if(selection.size)msg+='\n- '+[...selection].join('\n- ');
    if(note)msg+='\n\nAanvullend: '+note;
    msg+='\n\nKun je aangeven wat er beschikbaar is en wat het kost?';
    whatsapp(msg);
  });
  document.getElementById('contact-form').addEventListener('submit',e=>{
    e.preventDefault();
    if(!e.currentTarget.reportValidity())return;
    const name=document.getElementById('contact-name').value.trim();
    const message=document.getElementById('contact-message').value.trim();
    if(!name || !message)return;
    whatsapp('Hoi Juup, ik ben '+name+'.\n\n'+message+'\n\nGroeten, '+name);
  });
  draw();

  const pour = document.getElementById('pour-stage');
  const replay = document.getElementById('replay-pour');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function playPour(){if(reduceMotion)return;pour.classList.remove('playing');void pour.offsetWidth;pour.classList.add('playing');}
  replay.addEventListener('click',playPour);
  if(!reduceMotion && 'IntersectionObserver' in window) {
    const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){playPour();observer.disconnect();}},{threshold:.38});
    observer.observe(pour);
  }
})();