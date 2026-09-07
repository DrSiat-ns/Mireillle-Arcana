/**
 * MIREILLE ARCANA — Luxury Sanctuary Engine
 * Features:
 * - Cinematic Galaxy / Cosmic Cloud Portal Entrance
 * - Seamless Multi-View Router (The Sanctuary, Offerings, The Ritual, FAQs)
 * - Interactive 3D Daily Tarot Card Pull (The Hook)
 * - Promo vs. Regular Pricing Switch
 * - Menu Category Filters
 * - Global Booking Drawer with Discreet Checkout Payments
 * - Accessible FAQ Accordion & Mobile Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initCelestialSparkles(); // Initialize sparkles first so spawnSparkleBurst is available
  initGalaxyPortal();
  initViewRouter();
  initDailyOracle();
  initCurtainUnfold();
  initEthicsSwitcher();
  initPracticeCards();
  initPricingToggle();
  initMenuFilters();
  initBookingSheet();
  initFaqAccordion();
  initMobileNav();
  initNavGlassmorphism();
  initTestimoniesCarousel();
});

/* ==========================================================================
   1. Cinematic Galaxy / Cloud Portal Entrance
   ========================================================================== */
function initGalaxyPortal() {
  const veil = document.getElementById('galaxy-veil');
  const btnEnter = document.getElementById('btn-enter-portal');

  if (!veil) return;

  let isDissolving = false;

  function dissolveVeil(e) {
    if (isDissolving) return;
    isDissolving = true;

    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }

    // 1. Trigger energetic button ignite & initial particle surge
    if (btnEnter) {
      btnEnter.classList.add('portal-igniting');
      if (window.spawnSparkleBurst) {
        const rect = btnEnter.getBoundingClientRect();
        window.spawnSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 18);
      }
    }

    // 2. Stage 1: Portal Breaching (Shockwave, Hyper-spin, Twilight bloom)
    veil.classList.add('portal-breaching');

    // Sigil burst particles as the emblem rotates
    setTimeout(() => {
      const sigil = veil.querySelector('.veil-sigil-img');
      if (sigil && window.spawnSparkleBurst) {
        const sRect = sigil.getBoundingClientRect();
        window.spawnSparkleBurst(sRect.left + sRect.width / 2, sRect.top + sRect.height / 2, 14);
      }
    }, 80);

    // 3. Stage 2: Swift Dimensional Transition & Sanctuary Scene Emergence
    setTimeout(() => {
      veil.classList.add('portal-open');
      document.body.classList.add('sanctuary-entering');
      sessionStorage.setItem('sanctuary_veil_entered', 'true');
      window.dispatchEvent(new CustomEvent('sanctuary_entered'));

      // Wide ambient stardust burst into the Sanctuary
      if (window.spawnSparkleBurst) {
        window.spawnSparkleBurst(window.innerWidth * 0.35, window.innerHeight * 0.42, 12);
        window.spawnSparkleBurst(window.innerWidth * 0.65, window.innerHeight * 0.42, 12);
      }
    }, 120);

    // 4. Stage 3: Clean up veil and restore normal state (snappy 0.55s total)
    setTimeout(() => {
      veil.style.display = 'none';
      document.body.classList.remove('sanctuary-entering');
    }, 550);
  }

  // If visitor already entered during this session, dissolve immediately
  if (sessionStorage.getItem('sanctuary_veil_entered') === 'true') {
    veil.classList.add('portal-open');
    veil.style.display = 'none';
    return;
  }

  if (btnEnter) {
    btnEnter.addEventListener('click', dissolveVeil);
  }

  // Also allow tapping anywhere on the veil
  veil.addEventListener('click', (e) => {
    if (e.target === veil || e.target.classList.contains('cosmic-clouds') || e.target.classList.contains('cosmic-stardust')) {
      dissolveVeil(e);
    }
  });
}

/* ==========================================================================
   2. Multi-View Router (Sanctuary, Offerings, Ritual, FAQs)
   ========================================================================== */
function switchView(viewName) {
  const views = document.querySelectorAll('.sanctuary-view');
  const tabs = document.querySelectorAll('.nav-tab');

  // Support alias: if ritual requested, map to stories
  if (viewName === 'ritual') viewName = 'stories';
  let targetView = document.getElementById(`view-${viewName}`);
  if (!targetView && viewName === 'stories') {
    targetView = document.getElementById('view-ritual');
  }

  if (!targetView) return;

  // Deactivate all views
  views.forEach(v => v.classList.remove('active'));
  tabs.forEach(t => {
    const tabView = t.getAttribute('data-view');
    if (tabView === viewName || (viewName === 'stories' && tabView === 'ritual')) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });

  // Activate target
  targetView.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // If opening stories view, refresh carousel dimensions
  if (viewName === 'stories' && window.updateStoriesCarousel) {
    setTimeout(window.updateStoriesCarousel, 60);
  }

  // Close mobile nav if open
  const menu = document.getElementById('nav-menu');
  const toggle = document.getElementById('nav-toggle');
  if (menu && menu.classList.contains('open')) {
    menu.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }
}

function initViewRouter() {
  // Nav tabs
  const navTabs = document.querySelectorAll('[data-view]');
  navTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const view = tab.getAttribute('data-view');
      if (view) switchView(view);
    });
  });

  // In-page navigation triggers
  const navTriggers = document.querySelectorAll('[data-navigate]');
  navTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-navigate');
      if (target) switchView(target);
    });
  });
}

/* ==========================================================================
   3. Interactive 3D Daily Tarot Card Pull (The Hook)
   ========================================================================== */
const ORACLE_DECK = [
  {
    num: 'XVII',
    glyph: '⭐',
    heading: 'The Star',
    tags: 'Hope • Renewal • Serenity',
    text: '"A quiet peace follows every storm. Trust that the universe is gently aligning circumstances in your favor."'
  },
  {
    num: 'II',
    glyph: '🌙',
    heading: 'The High Priestess',
    tags: 'Intuition • Inner Wisdom • Stillness',
    text: '"Look beyond surface noise. Your deepest instinct already knows the truth—honor what your stillness reveals."'
  },
  {
    num: 'III',
    glyph: '🌸',
    heading: 'The Empress',
    tags: 'Abundance • Creative Flow • Growth',
    text: '"You are stepping into a fruitful season. Allow your creative desires and relationships the grace to bloom without rushing."'
  },
  {
    num: 'XIX',
    glyph: '☀️',
    heading: 'The Sun',
    tags: 'Joy • Vitality • Radiance',
    text: '"Warm clarity disperses all lingering doubts. Step boldly into your authenticity and celebrate how far you have come."'
  },
  {
    num: 'VIII',
    glyph: '🦁',
    heading: 'Strength',
    tags: 'Compassion • Inner Resolve • Gentleness',
    text: '"True power is quiet and loving. Tame the anxieties within your heart through patience and radical self-kindness."'
  },
  {
    num: 'I',
    glyph: '✨',
    heading: 'The Magician',
    tags: 'Manifestation • Power • Alchemy',
    text: '"You hold every tool necessary to transform your situation. Focus your sacred intention into deliberate, inspired action."'
  },
  {
    num: 'X',
    glyph: '☸️',
    heading: 'Wheel of Fortune',
    tags: 'Divine Cycles • Turning Tides • Alignment',
    text: '"Life moves in sacred spirals. A positive shift is underway. Trust the timing of unexpected opportunities."'
  },
  {
    num: 'XIV',
    glyph: '🕊️',
    heading: 'Temperance',
    tags: 'Balance • Harmony • Middle Way',
    text: '"Blend opposing currents into quiet equilibrium. The middle path will reveal the exact alchemy you seek."'
  }
];

let prevOracleIdx = -1;
let oracleRevealed = false;

function initDailyOracle() {
  const cardBox = document.getElementById('oracle-card-box');
  const card = document.getElementById('oracle-card');
  const btnReDraw = document.getElementById('btn-re-draw');
  const tapHint = document.getElementById('oracle-tap-hint');

  if (!cardBox || !card) return;

  function revealCard(withSparkles = true) {
    let randIdx;
    do {
      randIdx = Math.floor(Math.random() * ORACLE_DECK.length);
    } while (randIdx === prevOracleIdx && ORACLE_DECK.length > 1);

    prevOracleIdx = randIdx;
    const selected = ORACLE_DECK[randIdx];

    const elNum = document.getElementById('card-num');
    const elGlyph = document.getElementById('card-glyph');
    const elHeading = document.getElementById('card-heading');
    const elTags = document.getElementById('card-tags');
    const elText = document.getElementById('card-oracle-text');

    if (elNum) elNum.textContent = selected.num;
    if (elGlyph) elGlyph.textContent = selected.glyph;
    if (elHeading) elHeading.textContent = selected.heading;
    if (elTags) elTags.textContent = selected.tags;
    if (elText) elText.textContent = selected.text;

    card.classList.add('flipped');

    if (btnReDraw) btnReDraw.style.display = 'inline-flex';
    if (tapHint) tapHint.style.display = 'none';

    if (withSparkles && window.spawnSparkleBurst) {
      const rect = cardBox.getBoundingClientRect();
      window.spawnSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);
    }
  }

  // Satisfying Entrance Animation: starts face-down, then flips open to reveal daily oracle
  let entranceTimer = null;
  function triggerOracleEntrance() {
    if (oracleRevealed) return;
    oracleRevealed = true;
    entranceTimer = setTimeout(() => {
      revealCard(true);
    }, 950);
  }

  const veil = document.getElementById('galaxy-veil');
  if (sessionStorage.getItem('sanctuary_veil_entered') === 'true' || !veil || veil.style.display === 'none') {
    triggerOracleEntrance();
  } else {
    window.addEventListener('sanctuary_entered', triggerOracleEntrance, { once: true });
  }

  cardBox.addEventListener('click', () => {
    if (entranceTimer) clearTimeout(entranceTimer);
    oracleRevealed = true;
    if (!card.classList.contains('flipped')) {
      revealCard(true);
    }
  });

  cardBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (entranceTimer) clearTimeout(entranceTimer);
      oracleRevealed = true;
      if (!card.classList.contains('flipped')) {
        revealCard(true);
      }
    }
  });

  if (btnReDraw) {
    btnReDraw.addEventListener('click', (e) => {
      e.stopPropagation();
      const retryIcon = btnReDraw.querySelector('.retry-svg-icon');
      if (retryIcon) retryIcon.classList.add('spinning');

      card.classList.remove('flipped');
      setTimeout(() => {
        revealCard(true);
        if (retryIcon) retryIcon.classList.remove('spinning');
      }, 420);
    });
  }
}

/* ==========================================================================
   3b. Curtain Unfold Theatre (The Sacred Process)
   ========================================================================== */
function initCurtainUnfold() {
  const theatre = document.getElementById('unfold-theatre');
  const btnUnveil = document.getElementById('btn-unveil-process');
  const btnRefold = document.getElementById('btn-refold-veil');
  const curtainOverlay = document.getElementById('curtain-overlay');
  const unfoldsSection = document.getElementById('how-it-unfolds-section');

  if (!theatre) return;

  function unfold() {
    if (theatre.classList.contains('unfolded')) return;
    theatre.classList.add('unfolded');
    if (btnRefold) btnRefold.style.display = 'inline-flex';

    if (window.spawnSparkleBurst) {
      const rect = theatre.getBoundingClientRect();
      const midX = rect.left + rect.width / 2;
      const midY = rect.top + rect.height / 2;
      
      // Initial sparkle burst along the parting seam
      window.spawnSparkleBurst(midX, midY, 18);

      const cards = theatre.querySelectorAll('.pipeline-card');
      // Sparkle accent as Step 1 appears
      setTimeout(() => {
        if (cards[0]) {
          const r = cards[0].getBoundingClientRect();
          window.spawnSparkleBurst(r.left + r.width / 2, r.top + r.height / 2, 10);
        }
      }, 360);

      // Sparkle accent as Step 2 appears
      setTimeout(() => {
        if (cards[1]) {
          const r = cards[1].getBoundingClientRect();
          window.spawnSparkleBurst(r.left + r.width / 2, r.top + r.height / 2, 10);
        }
      }, 1080);

      // Grand sparkle celebration as Step 3 completes the sacred trinity
      setTimeout(() => {
        if (cards[2]) {
          const r = cards[2].getBoundingClientRect();
          window.spawnSparkleBurst(r.left + r.width / 2, r.top + r.height / 2, 16);
        }
      }, 1800);
    }
  }

  function refold() {
    theatre.classList.remove('unfolded');
    if (btnRefold) btnRefold.style.display = 'none';
    handleCurtainScroll();
  }

  if (btnUnveil) {
    btnUnveil.addEventListener('click', (e) => {
      e.stopPropagation();
      unfold();
    });
  }

  if (curtainOverlay) {
    curtainOverlay.addEventListener('click', () => {
      unfold();
    });
  }

  if (btnRefold) {
    btnRefold.addEventListener('click', refold);
  }

  // Scroll listener: Curtain starts closed, button slowly appears in the middle as user scrolls down
  function handleCurtainScroll() {
    if (!theatre || theatre.classList.contains('unfolded') || !btnUnveil) return;

    const rect = theatre.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Start appearing as theatre enters viewport, fully visible when near center
    const triggerStart = windowHeight * 0.92;
    const triggerEnd = windowHeight * 0.38;

    let progress = (triggerStart - rect.top) / (triggerStart - triggerEnd);
    progress = Math.max(0, Math.min(1, progress));

    if (progress <= 0.05) {
      btnUnveil.style.opacity = '0';
      btnUnveil.style.transform = 'translate(-50%, -50%) scale(0.82)';
      btnUnveil.style.pointerEvents = 'none';
      btnUnveil.classList.remove('visible');
    } else if (progress >= 0.92) {
      btnUnveil.style.opacity = '1';
      btnUnveil.style.transform = 'translate(-50%, -50%) scale(1)';
      btnUnveil.style.pointerEvents = 'auto';
      btnUnveil.classList.add('visible');
    } else {
      btnUnveil.style.opacity = progress.toFixed(3);
      const scale = (0.82 + 0.18 * progress).toFixed(3);
      btnUnveil.style.transform = `translate(-50%, -50%) scale(${scale})`;
      if (progress > 0.35) {
        btnUnveil.style.pointerEvents = 'auto';
        btnUnveil.classList.add('visible');
      } else {
        btnUnveil.style.pointerEvents = 'none';
        btnUnveil.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleCurtainScroll, { passive: true });
  window.addEventListener('resize', handleCurtainScroll, { passive: true });
  handleCurtainScroll();
}

/* ==========================================================================
   3bb. The Sanctuary Ethics — Interactive Pillar Switcher
   ========================================================================== */
function initEthicsSwitcher() {
  const buttons = document.querySelectorAll('.ethics-circle-btn');
  const panels = document.querySelectorAll('.ethics-panel-view');
  const card = document.getElementById('ethics-curved-card');

  if (!buttons.length || !panels.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pillar = btn.getAttribute('data-pillar');
      if (!pillar) return;

      // Update button selection states
      buttons.forEach((b) => {
        const isMatch = b === btn;
        b.classList.toggle('active', isMatch);
        b.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });

      // Switch active tabpanel
      panels.forEach((p) => {
        const isMatch = p.id === `ethics-panel-${pillar}`;
        p.classList.toggle('active', isMatch);
        p.setAttribute('aria-hidden', isMatch ? 'false' : 'true');
      });

      // Celestial sparkle burst on the curved showcase card
      if (window.spawnSparkleBurst && card) {
        const rect = card.getBoundingClientRect();
        window.spawnSparkleBurst(rect.left + rect.width / 2, rect.top + 80, 12);
      }
    });
  });
}

/* ==========================================================================
   3c. Featured Offerings — Flippable Practice Tarot Cards Deck
   ========================================================================== */
function initPracticeCards() {
  const cardBoxes = document.querySelectorAll('.practice-card-box');
  const btnFlipAll = document.getElementById('btn-flip-all-cards');

  if (!cardBoxes.length) return;

  cardBoxes.forEach(box => {
    const card = box.querySelector('.practice-card');
    if (!card) return;

    box.addEventListener('click', (e) => {
      // Don't flip if clicking the "Book Spread" CTA button directly
      if (e.target.closest('button')) return;

      const isFlipped = card.classList.toggle('flipped');
      if (window.spawnSparkleBurst) {
        const rect = box.getBoundingClientRect();
        window.spawnSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);
      }
    });

    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.closest('button')) return;
        e.preventDefault();
        card.classList.toggle('flipped');
        if (window.spawnSparkleBurst) {
          const rect = box.getBoundingClientRect();
          window.spawnSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);
        }
      }
    });
  });

  if (btnFlipAll) {
    let allFlipped = false;
    btnFlipAll.addEventListener('click', () => {
      allFlipped = !allFlipped;
      cardBoxes.forEach((box, i) => {
        const card = box.querySelector('.practice-card');
        if (!card) return;
        setTimeout(() => {
          if (allFlipped) {
            card.classList.add('flipped');
          } else {
            card.classList.remove('flipped');
          }
          if (window.spawnSparkleBurst) {
            const rect = box.getBoundingClientRect();
            window.spawnSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 14);
          }
        }, i * 160);
      });

      const span = btnFlipAll.querySelector('span') || btnFlipAll;
      span.textContent = allFlipped ? '✦ Reset Cards' : '✦ Flip All Cards';
    });
  }
}

/* ==========================================================================
   4. Promo vs. Regular Pricing Switch
   ========================================================================== */
let isPromoActive = true;

function initPricingToggle() {
  const switchBtn = document.getElementById('pricing-switch');
  const labelPromo = document.getElementById('label-promo');
  const labelRegular = document.getElementById('label-regular');
  const amts = document.querySelectorAll('.m-amt');
  const origs = document.querySelectorAll('.m-orig');

  if (!switchBtn) return;

  function applyRates() {
    amts.forEach(el => {
      const p = el.getAttribute('data-promo');
      const r = el.getAttribute('data-reg');
      el.textContent = `₱${isPromoActive ? p : r}`;
    });

    origs.forEach(el => {
      el.style.display = isPromoActive ? 'inline' : 'none';
    });

    if (isPromoActive) {
      switchBtn.setAttribute('aria-checked', 'true');
      if (labelPromo) labelPromo.classList.add('active');
      if (labelRegular) labelRegular.classList.remove('active');
    } else {
      switchBtn.setAttribute('aria-checked', 'false');
      if (labelPromo) labelPromo.classList.remove('active');
      if (labelRegular) labelRegular.classList.add('active');
    }

    recalcSheet();
  }

  switchBtn.addEventListener('click', () => {
    isPromoActive = !isPromoActive;
    applyRates();
  });
}

/* ==========================================================================
   5. Menu Category Filters
   ========================================================================== */
function initMenuFilters() {
  const tabs = document.querySelectorAll('.m-tab');
  const cards = document.querySelectorAll('.menu-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.getAttribute('data-cat');
      cards.forEach(card => {
        const cardCat = card.getAttribute('data-cat');
        if (cat === 'all' || cardCat === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. Global Booking Drawer / Modal (Payments at Checkout)
   ========================================================================== */
const PAY_INFO = {
  GCash: {
    lbl: 'GCash Mobile:',
    val: '0917-888-ARCANA',
    name: 'Mireille Arcana'
  },
  Maya: {
    lbl: 'Maya Mobile:',
    val: '0917-888-ARCANA',
    name: 'Mireille Arcana'
  },
  'Bank Transfer': {
    lbl: 'BDO Unibank / BPI:',
    val: '0012-8888-9921',
    name: 'Mireille Arcana Sanctuary'
  }
};

let extraQs = 0;

function recalcSheet() {
  const select = document.getElementById('book-service');
  const tallyPrice = document.getElementById('tally-price');
  const tallyStatus = document.getElementById('tally-status');
  if (!select || !tallyPrice) return;

  const opt = select.options[select.selectedIndex];
  if (!opt) return;

  const promoP = parseInt(opt.getAttribute('data-promo'), 10) || 0;
  const regP = parseInt(opt.getAttribute('data-reg'), 10) || 0;

  const base = isPromoActive ? promoP : regP;
  const addRate = isPromoActive ? 10 : 25;
  const total = base + (extraQs * addRate);

  tallyPrice.textContent = `₱${total.toLocaleString()}`;
  if (tallyStatus) {
    tallyStatus.textContent = isPromoActive 
      ? `✨ Special Promo Rate Applied${extraQs > 0 ? ` (+${extraQs} extra Qs)` : ''}`
      : `Regular Rate${extraQs > 0 ? ` (+${extraQs} extra Qs)` : ''}`;
  }

  return total;
}

window.openBookingModal = function(serviceName = '') {
  const modal = document.getElementById('booking-modal');
  const select = document.getElementById('book-service');
  const form = document.getElementById('booking-form');
  const conf = document.getElementById('sheet-confirmation');

  if (!modal) return;

  if (form) form.style.display = 'flex';
  if (conf) conf.style.display = 'none';

  if (serviceName && select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value === serviceName) {
        select.selectedIndex = i;
        break;
      }
    }
  }

  recalcSheet();

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

function closeBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initBookingSheet() {
  const modal = document.getElementById('booking-modal');
  const btnClose = document.getElementById('btn-sheet-close');
  const btnHeader = document.getElementById('btn-open-booking-header');
  const select = document.getElementById('book-service');
  const btnAdd = document.getElementById('btn-add-q');
  const btnSub = document.getElementById('btn-sub-q');
  const extraInput = document.getElementById('extra-q-input');
  const payChips = document.querySelectorAll('.pay-chip');
  const btnCopyAcc = document.getElementById('btn-copy-acc');
  const form = document.getElementById('booking-form');
  const btnCloseConf = document.getElementById('btn-close-sheet');
  const btnCopyDm = document.getElementById('btn-copy-dm');

  if (btnHeader) {
    btnHeader.addEventListener('click', () => window.openBookingModal());
  }

  if (btnClose) {
    btnClose.addEventListener('click', closeBookingModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeBookingModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeBookingModal();
    }
  });

  if (select) {
    select.addEventListener('change', recalcSheet);
  }

  // Stepper
  if (btnAdd && btnSub && extraInput) {
    btnAdd.addEventListener('click', () => {
      if (extraQs < 10) {
        extraQs++;
        extraInput.value = extraQs;
        recalcSheet();
      }
    });

    btnSub.addEventListener('click', () => {
      if (extraQs > 0) {
        extraQs--;
        extraInput.value = extraQs;
        recalcSheet();
      }
    });
  }

  // Payment chips
  payChips.forEach(chip => {
    const radio = chip.querySelector('input[type="radio"]');
    chip.addEventListener('click', () => {
      payChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      if (radio) radio.checked = true;

      const method = radio ? radio.value : 'GCash';
      const info = PAY_INFO[method];
      if (info) {
        document.getElementById('pay-number-lbl').textContent = info.lbl;
        document.getElementById('pay-number-val').textContent = info.val;
      }
    });
  });

  // Copy Account details
  if (btnCopyAcc) {
    btnCopyAcc.addEventListener('click', () => {
      const num = document.getElementById('pay-number-val').textContent;
      navigator.clipboard.writeText(num).then(() => {
        const orig = btnCopyAcc.textContent;
        btnCopyAcc.textContent = 'Copied! ✓';
        setTimeout(() => { btnCopyAcc.textContent = orig; }, 1800);
      });
    });
  }

  // Form submit -> Show confirmation
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const service = select.value;
      const name = document.getElementById('client-name').value;
      const contact = document.getElementById('client-contact').value;
      const delivery = document.getElementById('client-delivery').value;
      const notes = document.getElementById('client-notes').value;
      const payOption = document.querySelector('input[name="pay_option"]:checked')?.value || 'GCash';
      const total = document.getElementById('tally-price').textContent;

      // Populate confirmation
      document.getElementById('conf-name').textContent = name;
      document.getElementById('conf-service').textContent = service;
      document.getElementById('conf-total').textContent = total;
      document.getElementById('conf-method').textContent = payOption;
      document.getElementById('conf-del').textContent = delivery;

      const summaryText = 
`✦ MIREILLE ARCANA READING INQUIRY ✦
Seeker: ${name}
Contact: ${contact}
Offering: ${service}${extraQs > 0 ? ` (+${extraQs} extra Qs)` : ''}
Energy Exchange: ${total}
Delivery: ${delivery}
Payment: ${payOption}
Intention / Question: ${notes || 'General reading'}
──────────────────────────────
Ready to send via Instagram @mireillearcana`;

      if (btnCopyDm) {
        btnCopyDm.onclick = () => {
          navigator.clipboard.writeText(summaryText).then(() => {
            const prev = btnCopyDm.textContent;
            btnCopyDm.textContent = 'Copied to Clipboard! ✨';
            setTimeout(() => { btnCopyDm.textContent = prev; }, 2000);
          });
        };
      }

      form.style.display = 'none';
      const conf = document.getElementById('sheet-confirmation');
      if (conf) conf.style.display = 'block';
    });
  }

  if (btnCloseConf) {
    btnCloseConf.addEventListener('click', closeBookingModal);
  }
}

/* ==========================================================================
   7. Accessible FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const cards = document.querySelectorAll('.faq-card');

  cards.forEach(card => {
    const btn = card.querySelector('.faq-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = card.classList.contains('active');

      cards.forEach(c => {
        if (c !== card) {
          c.classList.remove('active');
          const b = c.querySelector('.faq-btn');
          if (b) b.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        card.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        card.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   8. Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.contains('open');
    if (open) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      menu.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });
}

/* ==========================================================================
   8b. Dynamic Nav Bar Glassmorphism Scroll Reactor
   ========================================================================== */
function initNavGlassmorphism() {
  const nav = document.getElementById('sanctuary-nav');
  if (!nav) return;

  function updateNavState() {
    const isScrolled = window.scrollY > 20;
    nav.classList.toggle('scrolled', isScrolled);
  }

  window.addEventListener('scroll', updateNavState, { passive: true });
  window.addEventListener('resize', updateNavState, { passive: true });
  updateNavState();
}

/* ==========================================================================
   9. Celestial Sparkle Stardust Particle Trail
   ========================================================================== */
function initCelestialSparkles() {
  const canvas = document.getElementById('celestial-sparkles');
  if (!canvas) return;

  // Honor reduced motion preference
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const ctx = canvas.getContext('2d');
  let dpr = window.devicePixelRatio || 1;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const particles = [];
  const palette = [
    '#fde047', // Radiant gold
    '#f3d082', // Celestial amber
    '#ffffff', // Starlight ivory white
    '#2dd4bf', // Seafoam turquoise
    '#5eead4', // Bright cyan-mint
    '#f472b6', // Berry rose
    '#c084fc'  // Mystic lavender
  ];

  let lastX = -100;
  let lastY = -100;
  let lastTime = 0;
  let animId = null;

  function createParticle(x, y, isBurst = false) {
    const angle = Math.random() * Math.PI * 2;
    const speed = isBurst ? (Math.random() * 2.6 + 1.2) : (Math.random() * 0.8 + 0.2);
    const color = palette[Math.floor(Math.random() * palette.length)];
    const size = isBurst ? (Math.random() * 5.5 + 4) : (Math.random() * 4.5 + 3);
    const maxLife = isBurst ? (Math.random() * 28 + 32) : (Math.random() * 22 + 22);

    return {
      x: x + (Math.random() - 0.5) * (isBurst ? 8 : 4),
      y: y + (Math.random() - 0.5) * (isBurst ? 8 : 4),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (isBurst ? 0.2 : 0.35), // gentle upward stardust float
      size: size,
      rotation: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.14,
      color: color,
      life: 0,
      maxLife: maxLife
    };
  }

  function drawStar(x, y, size, rotation, color, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

    // Outer sparkling 4-point star
    ctx.fillStyle = color;
    ctx.beginPath();
    const rOuter = size;
    const rInner = size * 0.22;
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      ctx.lineTo(Math.cos(a) * rOuter, Math.sin(a) * rOuter);
      const aMid = a + Math.PI / 4;
      ctx.lineTo(Math.cos(aMid) * rInner, Math.sin(aMid) * rInner);
    }
    ctx.closePath();
    ctx.fill();

    // Luminous center dot
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, Math.max(0.6, size * 0.28), 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life++;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.95;
      p.vy *= 0.95;
      p.rotation += p.rotSpeed;

      const progress = p.life / p.maxLife;
      if (progress >= 1) {
        particles.splice(i, 1);
        continue;
      }

      // Delicate fade curve
      const alpha = 1 - progress;
      const currentSize = p.size * (1 - progress * 0.4);
      drawStar(p.x, p.y, currentSize, p.rotation, p.color, alpha);
    }

    if (particles.length > 0) {
      animId = requestAnimationFrame(animate);
    } else {
      animId = null;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  function triggerLoop() {
    if (!animId) {
      animId = requestAnimationFrame(animate);
    }
  }

  window.addEventListener('mousemove', (e) => {
    const now = performance.now();
    const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);

    if (dist > 7 || (now - lastTime > 35 && dist > 2)) {
      particles.push(createParticle(e.clientX, e.clientY));
      if (dist > 28) {
        particles.push(createParticle(e.clientX, e.clientY));
      }
      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;
      triggerLoop();
    }
  }, { passive: true });

  // Burst of 8 sparkles on click
  window.addEventListener('click', (e) => {
    for (let i = 0; i < 8; i++) {
      particles.push(createParticle(e.clientX, e.clientY, true));
    }
    triggerLoop();
  }, { passive: true });

  // Expose global sparkle burst trigger for card flips & veil unveils
  window.spawnSparkleBurst = function(x, y, count = 14) {
    if (typeof x !== 'number' || typeof y !== 'number' || isNaN(x) || isNaN(y)) return;
    for (let i = 0; i < count; i++) {
      particles.push(createParticle(x, y, true));
    }
    triggerLoop();
  };
}

/* ==========================================================================
   10. Seeker Stories & Testimonies Carousel Controller
   ========================================================================== */
function initTestimoniesCarousel() {
  const container = document.getElementById('stories-carousel-showcase');
  if (!container) return;

  const track = container.querySelector('#stories-track');
  const slides = container.querySelectorAll('.carousel-slide');
  const btnPrev = container.querySelector('.btn-stories-prev');
  const btnNext = container.querySelector('.btn-stories-next');
  const counter = container.querySelector('#stories-carousel-counter');
  const dotsWrap = container.querySelector('#stories-dots');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  function getVisibleCount() {
    if (window.innerWidth <= 680) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function getMaxIndex() {
    return Math.max(0, totalSlides - getVisibleCount());
  }

  function renderDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    const dotCount = getMaxIndex() + 1;
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `carousel-dot ${i === currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(i);
      });
      dotsWrap.appendChild(dot);
    }
  }

  function updateCarousel() {
    const maxIdx = getMaxIndex();
    const totalSteps = maxIdx + 1;
    if (currentIndex > maxIdx) currentIndex = maxIdx;

    const slide = slides[0];
    const viewport = container.querySelector('#stories-viewport') || container;
    const visCount = getVisibleCount();
    const gap = 24;
    const slideWidth = (slide && slide.offsetWidth > 0) 
      ? slide.offsetWidth 
      : Math.max(280, (viewport.offsetWidth - (visCount - 1) * gap) / visCount);
    const offset = currentIndex * (slideWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;

    if (counter) {
      counter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(totalSteps).padStart(2, '0')}`;
    }

    if (btnPrev) btnPrev.disabled = currentIndex === 0;
    if (btnNext) btnNext.disabled = currentIndex >= maxIdx;

    if (dotsWrap) {
      const dots = dotsWrap.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }
  }

  function goToSlide(idx) {
    const maxIdx = getMaxIndex();
    currentIndex = Math.max(0, Math.min(idx, maxIdx));
    updateCarousel();
    if (window.spawnSparkleBurst) {
      const activeSlide = slides[currentIndex];
      if (activeSlide) {
        const rect = activeSlide.getBoundingClientRect();
        window.spawnSparkleBurst(rect.left + rect.width / 2, rect.top + 40, 8);
      }
    }
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
    });
  }

  // Touch Swipe Support
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    const diff = startX - currentX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
    }
  });

  window.addEventListener('resize', () => {
    renderDots();
    updateCarousel();
  });

  // Expose global update for when view is switched to stories
  window.updateStoriesCarousel = function() {
    renderDots();
    updateCarousel();
  };

  renderDots();
  updateCarousel();
}

