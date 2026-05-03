import './style.css'

/* =============================================
   OPENING SCREEN – buka kado
   ============================================= */
window.bukaKado = function () {
  const opening  = document.getElementById('opening-screen')
  const main     = document.getElementById('main-content')
  const navbar   = document.getElementById('navbar')

  opening.classList.add('is-closing')

  setTimeout(() => {
    opening.style.display = 'none'
    main.classList.remove('hidden')
    navbar.classList.remove('navbar--hidden')
    navbar.classList.add('navbar--visible')

    spawnBubbles()
    spawnFloatingHearts()
  }, 920)
}

/* =============================================
   NAVIGATION
   ============================================= */
window.pindahHalaman = function (target) {
  // hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'))

  // show target
  const page = document.getElementById('page-' + target)
  if (page) page.classList.remove('hidden')

  // refresh animations on letter page
  if (target === 'pesan') {
    const seal = document.getElementById('wax-seal')
    const card = document.querySelector('.letter-card')
    if (seal) { seal.style.animation = 'none'; seal.offsetHeight; seal.style.animation = '' }
    if (card) { card.style.animation = 'none'; card.offsetHeight; card.style.animation = '' }
  }

  // update nav active state
  document.querySelectorAll('.nav-btn').forEach(btn => {
    const isActive = btn.dataset.page === target
    btn.classList.toggle('nav-btn--active', isActive)
  })

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/* =============================================
   STAR PARTICLES (opening screen)
   ============================================= */
function spawnStars () {
  const container = document.getElementById('stars-container')
  if (!container) return

  for (let i = 0; i < 70; i++) {
    const el = document.createElement('div')
    el.className = 'star'
    const size = Math.random() * 2 + .8
    el.style.cssText = `
      left: ${rand(0, 100)}%;
      top:  ${rand(0, 100)}%;
      width:  ${size}px;
      height: ${size}px;
      --d:  ${rand(2, 5).toFixed(1)}s;
      --dl: ${rand(0, 5).toFixed(1)}s;
    `
    container.appendChild(el)
  }
}

/* =============================================
   BUBBLE PARTICLES
   ============================================= */
function spawnBubbles () {
  for (let i = 0; i < 14; i++) {
    const el = document.createElement('div')
    el.className = 'bubble'
    const size = rand(8, 24)
    el.style.cssText = `
      width:  ${size}px;
      height: ${size}px;
      left:   ${rand(0, 100)}%;
      bottom: 0;
      --d:     ${rand(7, 13).toFixed(1)}s;
      --dl:    ${rand(0, 12).toFixed(1)}s;
      --drift: ${(Math.random() - .5) * 80}px;
    `
    document.body.appendChild(el)
  }
}

/* =============================================
   FLOATING HEARTS / WHALES (home page)
   ============================================= */
function spawnFloatingHearts () {
  const container = document.getElementById('floating-hearts')
  if (!container) return

  const emojis = ['❤️', '🐳', '💕', '🌸', '✨', '💖', '🐋']

  for (let i = 0; i < 10; i++) {
    const el = document.createElement('div')
    el.className = 'heart-float'
    const sz = rand(.8, 1.6).toFixed(2)
    el.style.cssText = `
      left: ${rand(3, 95)}%;
      --d:   ${rand(5, 9).toFixed(1)}s;
      --dl:  ${rand(0, 10).toFixed(1)}s;
      --sz:  ${sz}rem;
      --rot: ${(Math.random() - .5) * 50}deg;
    `
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)]
    container.appendChild(el)
  }
}

/* =============================================
   UTILS
   ============================================= */
function rand (min, max) {
  return Math.random() * (max - min) + min
}

/* =============================================
   INIT
   ============================================= */
document.addEventListener('DOMContentLoaded', spawnStars)