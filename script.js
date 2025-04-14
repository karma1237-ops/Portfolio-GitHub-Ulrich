document.addEventListener("DOMContentLoaded", function () {

  // === ✨ Effet scroll vers section projets (bouton) ===
  const button = document.querySelector('.btn');
  button?.addEventListener('click', function () {
    document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' });
  });
  // === ✅ Fin scroll vers section projets ===

  // === ✨ Hover sur lien CV ===
  const cvLink = document.querySelector('.cv-link');
  cvLink?.addEventListener("mouseover", () => cvLink.classList.add("hovered"));
  cvLink?.addEventListener("mouseout", () => cvLink.classList.remove("hovered"));
  // === ✅ Fin hover lien CV ===

  // === ✨ Animation outils-item (apparition au scroll) ===
  const outilsItems = document.querySelectorAll('.outils-item');

  function checkVisibility() {
    outilsItems.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        el.classList.add('in-view');
      } else {
        el.classList.remove('in-view'); // disparition si on remonte
      }
    });
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility(); // Initial
  // === ✅ Fin animation outils-item ===

  // === ✨ Barre de progression horizontale  ===
  const wrapper = document.querySelector('.skills-container-wrapper');
  const line = document.getElementById('scroll-line');

  wrapper?.addEventListener('scroll', () => {
    const scrollWidth = wrapper.scrollWidth - wrapper.clientWidth;
    const scrolled = wrapper.scrollLeft;
    const percent = (scrolled / scrollWidth) * 100;
    line.style.width = `${percent}%`;
  });
  // === ✅ Fin barre de progression horizontale ===

});

document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view'); // Disparition si on remonte
      }
    });
  }, {
    threshold: 0.2 // 20% de visibilité pour déclencher l'effet
  });

  animatedElements.forEach(el => observer.observe(el));
});
