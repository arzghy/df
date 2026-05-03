import './style.css'

// Fungsi untuk animasi membuka kado ala 2-luv
window.bukaKado = function() {
    const openingScreen = document.getElementById('opening-screen');
    const mainContent = document.getElementById('main-content');
    const navbar = document.getElementById('navbar');
    
    // Animasi layar pembuka naik ke atas dan menghilang
    openingScreen.style.transform = 'translateY(-100%)';
    openingScreen.style.opacity = '0';
    
    // Setelah animasi selesai, sembunyikan sepenuhnya dan tampilkan konten utama
    setTimeout(() => {
        openingScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
        navbar.classList.remove('-translate-y-full'); // Munculkan navbar
    }, 700);
}

// Logika navigasi halaman (sama seperti sebelumnya)
window.pindahHalaman = function(idTarget) {
    const semuaHalaman = document.querySelectorAll('.halaman');
    semuaHalaman.forEach(halaman => {
        halaman.classList.add('hidden');
    });

    const halamanTujuan = document.getElementById('page-' + idTarget);
    if (halamanTujuan) {
        halamanTujuan.classList.remove('hidden');
    }

    const semuaTombol = document.querySelectorAll('.nav-btn');
    semuaTombol.forEach(tombol => {
        tombol.classList.remove('text-white');
        tombol.classList.add('text-pausRed-200');
    });

    const tombolAktif = Array.from(semuaTombol).find(btn => btn.getAttribute('onclick').includes(idTarget));
    if (tombolAktif) {
        tombolAktif.classList.remove('text-pausRed-200');
        tombolAktif.classList.add('text-white');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}