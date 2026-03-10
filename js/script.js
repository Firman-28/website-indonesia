document.addEventListener('DOMContentLoaded', function() {
    // intersection observer for fade-in
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(s => observer.observe(s));

    // lightbox
    const lightbox = document.getElementById('lightbox');
    const lbImg = lightbox.querySelector('.lightbox-img');
    const lbCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.clickable-image').forEach(img => {
        img.addEventListener('click', () => {
            lbImg.src = img.src;
            lbImg.alt = img.alt;
            lbCaption.textContent = img.dataset.title + ' - ' + img.dataset.description;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // contact form validation
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', e => {
        e.preventDefault();
        let valid = true;
        Array.from(form.elements).forEach(el => {
            if (el.required) {
                const error = el.nextElementSibling;
                if (!el.value.trim()) {
                    valid = false;
                    error.textContent = 'Wajib diisi';
                } else {
                    error.textContent = '';
                    if (el.type === 'email' && !/\S+@\S+\.\S+/.test(el.value)) {
                        valid = false;
                        error.textContent = 'Email tidak valid';
                    }
                }
            }
        });
        if (valid) {

            let nama = form.querySelector('input[name="nama"]').value;
            let email = form.querySelector('input[name="email"]').value;
            let pesan = form.querySelector('textarea[name="pesan"]').value;

            let nomor = "628123456789"; // ganti dengan nomor WhatsApp kamu

            let url = "https://wa.me/" + nomor +
            "?text=Halo saya dari website anda%0A%0A" +
            "Nama: " + nama + "%0A" +
            "Email: " + email + "%0A" +
            "Pesan: " + pesan;

            window.open(url, "_blank");

        form.reset();
        }
    });

    // hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => navLinks.classList.toggle('show'));

    // parallax effect for hero
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        let y = window.scrollY;
        hero.style.backgroundPosition = `center ${y * 0.5}px`;
    });
});