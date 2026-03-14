document.addEventListener("DOMContentLoaded", () => {

  // Hamburger toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  hamburger.addEventListener("click", () => navLinks.classList.toggle("active"));

  // Semua modal
  function setupModal(triggerSelector, modalId, titleId, imgId, descId) {
    const triggers = document.querySelectorAll(triggerSelector);
    const modal = document.getElementById(modalId);
    const title = document.getElementById(titleId);
    const img = document.getElementById(imgId);
    const desc = document.getElementById(descId);
    const closeBtn = modal.querySelector(".close-btn");

    triggers.forEach(trigger => {
      trigger.addEventListener("click", () => {
        title.textContent = trigger.dataset.title;
        img.src = trigger.dataset.img;
        img.alt = trigger.dataset.title;
        desc.textContent = trigger.dataset.desc;
        modal.style.display = "block";
      });
    });

    closeBtn.addEventListener("click", () => modal.style.display = "none");

    window.addEventListener("click", e => {
      if (e.target === modal) modal.style.display = "none";
    });
  }

  setupModal(".pancasila-card", "pancasilaModal", "modal-title", "modal-img", "modal-desc");
  setupModal(".gallery-item", "budayaModal", "modal-title-budaya", "modal-img-budaya", "modal-desc-budaya");
  setupModal("#geoImage", "geografiModal", "modal-title-geo", "modal-img-geo", "modal-desc-geo");
  setupModal("#negaraImage", "negaraModal", "modal-title-negara", "modal-img-negara", "modal-desc-negara");

});

// Efek sentuh untuk mobile
document.querySelectorAll('img.interactive').forEach(img => {
    img.addEventListener('touchstart', () => {
        img.style.transform = 'scale(1.03) rotate(-1deg)';
        img.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    });
    img.addEventListener('touchend', () => {
        img.style.transform = '';
        img.style.boxShadow = '';
    });
});