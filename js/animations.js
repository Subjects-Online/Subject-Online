// Initialize AOS (Animate On Scroll) library
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });

  // Add smooth scroll to all links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Add parallax effect to hero section
  const hero = document.querySelector(".hero");
  if (hero) {
    window.addEventListener("mousemove", (e) => {
      const x = (window.innerWidth / 2 - e.pageX) / 20;
      const y = (window.innerHeight / 2 - e.pageY) / 20;
      hero.style.backgroundPosition = `${x}px ${y}px`;
    });
  }

  // Add hover effect to subject cards
  const cards = document.querySelectorAll(".subject-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;

      // Add light reflection effect
      let glow = card.querySelector(".card-glow");
      if (!glow) {
        glow = document.createElement("div");
        glow.className = "card-glow";
        card.appendChild(glow);
      }

      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });
  });

  // Add typewriter effect to hero text
  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };

    // Start typing after a short delay
    setTimeout(typeWriter, 1000);
  }

  // Add scroll reveal animation
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run once on page load
});
