import './style.css'

/* ─────────────────────────────────────────────
   OPENING — buka kado
───────────────────────────────────────────── */
window.bukaKado = function () {
  const opening = document.getElementById('opening-screen')
  const main    = document.getElementById('main-content')
  const navbar  = document.getElementById('navbar')

  opening.classList.add('is-closing')

  setTimeout(() => {
    opening.style.display = 'none'
    main.classList.remove('hidden')
    navbar.classList.remove('navbar--hidden')
    navbar.classList.add('navbar--visible')

    spawnBubbles()
    spawnFloatingHearts()
    initMosaicParallax()
    initScrollReveal()
    initCinema()
    initReasons()
    showFooter()
  }, 920)
}

/* ─────────────────────────────────────────────
   NAVIGATION
───────────────────────────────────────────── */
window.pindahHalaman = function (target) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'))

  const page = document.getElementById('page-' + target)
  if (page) page.classList.remove('hidden')

  // replay letter animations
  if (target === 'pesan') {
    const seal = document.getElementById('wax-seal')
    const card = document.querySelector('.letter-card')
    if (seal) { seal.style.animation = 'none'; seal.offsetHeight; seal.style.animation = '' }
    if (card) { card.style.animation = 'none'; card.offsetHeight; card.style.animation = '' }
  }

  // nav active state
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('nav-btn--active', btn.dataset.page === target)
  })

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/* ─────────────────────────────────────────────
   STARS (opening)
───────────────────────────────────────────── */
function spawnStars () {
  const c = document.getElementById('stars-container')
  if (!c) return
  for (let i = 0; i < 70; i++) {
    const el = document.createElement('div')
    el.className = 'star'
    const size = rand(.8, 2.5)
    el.style.cssText = `left:${rand(0,100)}%;top:${rand(0,100)}%;width:${size}px;height:${size}px;--d:${rand(2,5).toFixed(1)}s;--dl:${rand(0,5).toFixed(1)}s;`
    c.appendChild(el)
  }
}

/* ─────────────────────────────────────────────
   BUBBLES (after open)
───────────────────────────────────────────── */
function spawnBubbles () {
  for (let i = 0; i < 14; i++) {
    const el = document.createElement('div')
    el.className = 'bubble'
    const size = rand(8, 24)
    el.style.cssText = `width:${size}px;height:${size}px;left:${rand(0,100)}%;bottom:0;--d:${rand(7,13).toFixed(1)}s;--dl:${rand(0,12).toFixed(1)}s;--drift:${(Math.random()-.5)*80}px;`
    document.body.appendChild(el)
  }
}

/* ─────────────────────────────────────────────
   FLOATING HEARTS (hero)
───────────────────────────────────────────── */
function spawnFloatingHearts () {
  const c = document.getElementById('floating-hearts')
  if (!c) return
  const emojis = ['❤️','🐳','💕','🌸','✨','💖','🐋']
  for (let i = 0; i < 10; i++) {
    const el = document.createElement('div')
    el.className = 'heart-float'
    el.style.cssText = `left:${rand(3,95)}%;--d:${rand(5,9).toFixed(1)}s;--dl:${rand(0,10).toFixed(1)}s;--sz:${rand(.8,1.6).toFixed(2)}rem;--rot:${(Math.random()-.5)*50}deg;`
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)]
    c.appendChild(el)
  }
}

/* ─────────────────────────────────────────────
   MOSAIC PARALLAX — rows shift at different speeds
   on scroll (subtle, like 2-luv)
───────────────────────────────────────────── */
function initMosaicParallax () {
  const row1 = document.querySelector('.mosaic-row--1')
  const row2 = document.querySelector('.mosaic-row--2')
  const section = document.querySelector('.mosaic-section')
  if (!row1 || !row2 || !section) return

  function onScroll () {
    const rect = section.getBoundingClientRect()
    const visible = rect.top < window.innerHeight && rect.bottom > 0
    if (!visible) return

    // progress: 0 = section just entered viewport, 1 = just left
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
    const offset = (progress - 0.5) * 60 // ±30px

    row1.style.transform = `translateY(${-offset * 0.6}px)`
    row2.style.transform = `translateY(${offset * 0.4}px)`
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}

/* ─────────────────────────────────────────────
   SCROLL REVEAL — tagline features fade in
   when they enter viewport
───────────────────────────────────────────── */
function initScrollReveal () {
  // tl-heading reveal
  const heading = document.querySelector('.tl-heading')
  if (heading) {
    heading.style.opacity = '0'
    heading.style.transform = 'translateY(30px)'
    heading.style.transition = 'opacity .8s ease, transform .8s ease'
  }

  const underline = document.querySelector('.tl-underline')
  // tl-feats: reset delay so they re-animate
  document.querySelectorAll('.tl-feat').forEach(el => {
    el.style.opacity = '0'
  })

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      const el = entry.target

      if (el.classList.contains('tl-heading')) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }
      if (el.classList.contains('tl-feat')) {
        // animation already defined in CSS via keyframes + opacity:0
        el.style.animation = ''  // let CSS animation run
      }
      io.unobserve(el)
    })
  }, { threshold: .25 })

  if (heading) io.observe(heading)
  document.querySelectorAll('.tl-feat').forEach(el => io.observe(el))
}

/* ─────────────────────────────────────────────
   CINEMA — parallax + split name letters
───────────────────────────────────────────── */
function initCinema () {
  // ── split name into animated letters ──
  const nameEl = document.getElementById('cinema-name')
  if (nameEl) {
    const text = nameEl.textContent.trim()
    nameEl.textContent = ''
    text.split('').forEach((ch, i) => {
      const span = document.createElement('span')
      span.className = 'cn-letter'
      span.textContent = ch === ' ' ? '\u00a0' : ch
      const rotations = [-4, 3, -2, 5, -3, 2, -4, 3]
      span.style.setProperty('--rot', (rotations[i % rotations.length] ?? 0) + 'deg')
      span.style.setProperty('--ld', (.25 + i * .07) + 's')
      nameEl.appendChild(span)
    })
  }

  // ── parallax on scroll ──
  const bg = document.getElementById('cinema-bg')  // now a <picture>
  const section = document.querySelector('.cinema-section')
  if (!bg || !section) return

  function onScroll () {
    const rect = section.getBoundingClientRect()
    const progress = 1 - (rect.bottom / (window.innerHeight + rect.height))
    const shift = (progress - .5) * 10
    bg.style.transform = `scale(1.08) translateY(${shift}%)`
  }

  window.addEventListener('scroll', onScroll, { passive: true })
}

/* ─────────────────────────────────────────────
   REASONS — scroll reveal + touch flip
───────────────────────────────────────────── */
function initReasons () {
  const cards = document.querySelectorAll('.reason-card')
  if (!cards.length) return

  // reveal cards as they enter viewport
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        io.unobserve(entry.target)
      }
    })
  }, { threshold: .15 })

  cards.forEach(card => {
    io.observe(card)
    // touch / click toggle for mobile
    card.addEventListener('click', () => {
      card.classList.toggle('flipped')
    })
  })
}


/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function showFooter () {
  const footer = document.getElementById('site-footer')
  if (!footer) return
  footer.classList.remove('hidden')

  const c = document.getElementById('footer-stars')
  if (c) {
    for (let i = 0; i < 55; i++) {
      const el = document.createElement('div')
      el.className = 'star'
      const size = rand(.8, 2.2)
      el.style.cssText = `left:${rand(0,100)}%;top:${rand(0,100)}%;width:${size}px;height:${size}px;--d:${rand(2,5).toFixed(1)}s;--dl:${rand(0,5).toFixed(1)}s;`
      c.appendChild(el)
    }
  }
}

function rand (min, max) { return Math.random() * (max - min) + min }

/* ─────────────────────────────────────────────
   INIT
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', spawnStars)