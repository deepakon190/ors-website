/* ═══════════════════════════════════════════
   ON ROUTE SERVICES — main.js
   ORS Mobile Car & Truck Repair · Millville NJ
═══════════════════════════════════════════ */

'use strict';

/* ── CHAT STATE ── */
let chatOpen = false;

const CHAT_REPLIES = {
  book:      "Great! Head to our <a href='#booking' style='color:var(--orange)'>Book Online section</a> to schedule — or call us at <a href='tel:8564842795' style='color:var(--orange)'>(856) 484-2795</a> for same-day slots.",
  brake:     "Brake issues are a safety priority! We replace brake pads and inspect rotors at your location. Call <a href='tel:8564842795' style='color:var(--orange)'>(856) 484-2795</a> or <a href='#booking' style='color:var(--orange)'>book online</a>.",
  oil:       "Oil leaks can be tricky — we handle them on-site: valve covers, pan gaskets, and more. <a href='#booking' style='color:var(--orange)'>Book a diagnosis</a> or call <a href='tel:8564842795' style='color:var(--orange)'>(856) 484-2795</a>.",
  tire:      "Flat tires and replacements done right at your location. Call <a href='tel:8564842795' style='color:var(--orange)'>(856) 484-2795</a> for fast service anywhere in Millville, NJ.",
  emergency: "🚨 For emergencies call us <strong>right now</strong>: <a href='tel:8564842795' style='color:var(--orange);font-size:1.1em'>(856) 484-2795</a>. We respond fast across Millville and South Jersey.",
  price:     "We give <strong>upfront quotes</strong> with no hidden fees. Call <a href='tel:8564842795' style='color:var(--orange)'>(856) 484-2795</a> for a fast estimate — no obligation!",
  recall:    "We help with recall-related repairs! Check your VIN at <a href='https://repairpal.com/recalls' target='_blank' style='color:var(--orange)'>RepairPal Recalls</a>, then <a href='#booking' style='color:var(--orange)'>book with us</a>.",
  hours:     "We're available <strong>7 days a week</strong> with emergency callouts around the clock. Call <a href='tel:8564842795' style='color:var(--orange)'>(856) 484-2795</a> any time.",
  location:  "We're based in <strong>Millville, NJ 08332</strong> and serve all of South Jersey including Vineland, Bridgeton, and Cumberland County. We come to <em>you</em>!",
  default:   "Thanks for reaching out! For the fastest help, call us at <a href='tel:8564842795' style='color:var(--orange)'>(856) 484-2795</a> or <a href='#booking' style='color:var(--orange)'>book online</a>. We serve Millville, NJ and all of South Jersey."
};

/* ── CHAT TOGGLE ── */
function toggleChat() {
  chatOpen = !chatOpen;
  const win  = document.getElementById('chatWindow');
  const icon = document.getElementById('chatIcon');
  const badge = document.querySelector('.chat-badge');

  win.classList.toggle('open', chatOpen);

  if (chatOpen) {
    if (badge) badge.style.display = 'none';
    icon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>';
  } else {
    icon.innerHTML = '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>';
  }
}

/* ── QUICK REPLY BUTTONS ── */
function sendQuick(text) {
  addMsg(text, 'user');
  document.getElementById('quickBtns').style.display = 'none';
  setTimeout(() => addMsg(getReply(text), 'bot'), 600);
}

/* ── SEND TYPED MESSAGE ── */
function sendChat() {
  const input = document.getElementById('chatInput');
  const text  = input.value.trim();
  if (!text) return;
  addMsg(text, 'user');
  input.value = '';
  document.getElementById('quickBtns').style.display = 'none';
  setTimeout(() => addMsg(getReply(text), 'bot'), 800);
}

/* ── KEYWORD MATCHER ── */
function getReply(text) {
  const t = text.toLowerCase();
  if (t.includes('book') || t.includes('schedule') || t.includes('appoint'))  return CHAT_REPLIES.book;
  if (t.includes('brake') || t.includes('brakes') || t.includes('pad'))       return CHAT_REPLIES.brake;
  if (t.includes('oil') || t.includes('leak') || t.includes('gasket'))        return CHAT_REPLIES.oil;
  if (t.includes('tire') || t.includes('tyre') || t.includes('flat'))         return CHAT_REPLIES.tire;
  if (t.includes('emergency') || t.includes('stuck') || t.includes('strand')) return CHAT_REPLIES.emergency;
  if (t.includes('price') || t.includes('cost') || t.includes('how much'))    return CHAT_REPLIES.price;
  if (t.includes('recall'))                                                    return CHAT_REPLIES.recall;
  if (t.includes('hour') || t.includes('open') || t.includes('available'))    return CHAT_REPLIES.hours;
  if (t.includes('where') || t.includes('location') || t.includes('area'))    return CHAT_REPLIES.location;
  return CHAT_REPLIES.default;
}

/* ── APPEND MESSAGE TO CHAT ── */
function addMsg(html, type) {
  const box = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `msg ${type}`;
  div.innerHTML = html + `<div class="msg-time">Just now</div>`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

/* ── ENTER KEY IN CHAT INPUT ── */
function chatInputKeypress(e) {
  if (e.key === 'Enter') sendChat();
}

/* ── MOBILE NAV TOGGLE ── */
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('open');
}

/* ── SCROLL REVEAL ── */
function initReveal() {
  // Use threshold 0 so elements visible on load trigger immediately
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
  }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Also reveal anything already in view on page load
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add('vis');
    });
  }, 100);
}

/* ── SHOPMONKEY LOADER ── */
function initShopMonkey() {
  // After 3 seconds, if the ShopMonkey iframe hasn't loaded, show fallback form.
  // TO ACTIVATE REAL SHOPMONKEY:
  //   1. Go to your ShopMonkey dashboard
  //   2. Navigate to Marketing → Appt Scheduler → Copy Code
  //   3. Paste the generated <iframe> src URL into the variable below
  //   4. The loader will be hidden and the iframe shown automatically
  const SHOPMONKEY_URL = ''; // <-- paste your ShopMonkey booking URL here

  const frame   = document.getElementById('smFrame');
  const loader  = document.getElementById('smLoader');
  const fallback = document.getElementById('smFallback');

  if (SHOPMONKEY_URL) {
    const iframe = document.createElement('iframe');
    iframe.src = SHOPMONKEY_URL;
    iframe.style.cssText = 'width:100%;height:520px;border:none;display:block;';
    iframe.onload = () => { if (loader) loader.style.display = 'none'; };
    frame.appendChild(iframe);
  } else {
    // No URL configured — show fallback form after short delay
    setTimeout(() => {
      if (loader)   loader.style.display   = 'none';
      if (fallback) fallback.style.display = 'block';
    }, 2500);
  }
}

/* ── BOOKING FORM SUBMIT ── */
function initBookingForm() {
  const form = document.getElementById('bookForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.innerHTML = `
      <div style="text-align:center;padding:24px;color:var(--orange);font-family:'Barlow Condensed',sans-serif;font-size:1.1rem;font-weight:700;line-height:1.7;">
        ✓ Request received!<br>We'll call you shortly at the number provided.<br><br>
        <a href="tel:8564842795" style="color:white;font-size:1.4rem;font-family:'Bebas Neue',sans-serif;letter-spacing:.05em;">(856) 484-2795</a>
      </div>`;
  });
}

/* ── SMOOTH SCROLL FOR NAV LINKS ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        // close mobile menu if open
        document.querySelector('.nav-links')?.classList.remove('open');
      }
    });
  });
}

/* ── NAV SCROLL SHADOW ── */
function initNavScroll() {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 40
      ? '0 4px 32px rgba(0,0,0,.5)'
      : 'none';
  }, { passive: true });
}

/* ── INIT ALL ── */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initShopMonkey();
  initBookingForm();
  initSmoothScroll();
  initNavScroll();
});