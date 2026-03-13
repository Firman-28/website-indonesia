document.addEventListener('DOMContentLoaded', function() {
    // lightbox
    const lightbox = document.getElementById("lightbox");
    const closeBtn = document.querySelector(".lightbox-close");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxDesc = document.getElementById("lightbox-desc");
    const numbers = document.querySelectorAll(".number");

        numbers.forEach(num=>{
        let target = parseInt(num.textContent.replace(/\D/g,''));
        let count = 0;

        let update = ()=>{
        count += target/100;

        if(count < target){
        num.textContent = Math.floor(count);
        requestAnimationFrame(update);
        }else{
        num.textContent = target;
        }
        };

    update();
    });
    const timelineItems = document.querySelectorAll(".timeline-item");

    const timelineObserver = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
        if(entry.isIntersecting){
        entry.target.classList.add("show");
        }
        });
    });

timelineItems.forEach(item=>{
timelineObserver.observe(item);
});
    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
        anchor.addEventListener('click',function(e){
        e.preventDefault();

    document.querySelector(this.getAttribute('href'))
        .scrollIntoView({
        behavior:'smooth'
        });
        });
    });

    // buka dari item pancasila
    document.querySelectorAll(".pancasila-item, .clickable-image").forEach(item => {
        item.addEventListener("click", function(){

            const imgSrc = this.dataset.img  || this.src;
            const title = this.dataset.title || "";
            const desc = this.dataset.desc || this.dataset.description || "";

            lightboxImg.src = imgSrc;
            lightboxImg.alt = title;
            lightboxTitle.textContent = title;
            lightboxDesc.textContent = desc;

            lightbox.classList.add("active");
            document.body.style.overflow = 'hidden';
        });
    });
    document.addEventListener("keydown", function(e){
        if(e.key === "Escape"){
            lightbox.classList.remove("active");
            document.body.style.overflow="auto";
        }
    });
    
    // tutup lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // intersection observer untuk fade-in
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(s => observer.observe(s));

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

            let nomor = "6281514397312"; // ganti dengan nomor WhatsApp kamu
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

    // parallax effect untuk hero
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        let y = window.scrollY;
        hero.style.backgroundPosition = `center ${y * 0.5}px`;
    });
});