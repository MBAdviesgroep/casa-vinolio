(() => {
  const gate = document.getElementById('gate');
  const accept = document.getElementById('accept');
  const reject = document.getElementById('reject');
  const denied = document.getElementById('denied');
  const key = 'casa_vinolio_age_confirmed';

  function unlock() {
    gate.hidden = true;
    document.body.style.overflow = '';
  }

  try {
    if (sessionStorage.getItem(key) === 'yes') unlock();
    else document.body.style.overflow = 'hidden';
  } catch (e) {
    document.body.style.overflow = 'hidden';
  }

  accept.addEventListener('click', () => {
    try { sessionStorage.setItem(key, 'yes'); } catch (e) {}
    unlock();
  });

  reject.addEventListener('click', () => {
    denied.hidden = false;
    accept.hidden = true;
    reject.hidden = true;
  });

  const menu = document.querySelector('.navlinks');
  const toggle = document.querySelector('.menu-toggle');
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? 'Sluiten' : 'Menu';
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Menu';
  }));
})();