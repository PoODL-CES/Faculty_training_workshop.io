// Faculty Training Workshop — interactive behaviour
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll(".nav-links a");

  // Mobile navigation
  menuToggle?.addEventListener("click", () => {
    const open = header.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", open);
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      header.classList.remove("menu-open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Open navigation");
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && header?.classList.contains("menu-open")) {
      header.classList.remove("menu-open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Open navigation");
      menuToggle?.focus();
    }
  });

  // Faculty profile pop-ups
  const facultyDialog = document.querySelector(".faculty-dialog");
  const facultyName = document.getElementById("facultyDialogName");
  const facultyBio = document.querySelector(".faculty-dialog-bio");
  const facultyProfileLink = document.querySelector(".faculty-dialog-link");
  const openFacultyProfile = card => {
    if (!facultyDialog || !facultyName || !facultyBio || !facultyProfileLink) return;
    facultyName.textContent = card.dataset.name;
    facultyBio.textContent = card.dataset.bio;
    facultyProfileLink.href = card.dataset.link;
    facultyProfileLink.setAttribute("aria-label", `Visit ${card.dataset.name}'s profile or lab website`);
    facultyDialog.showModal();
  };

  document.querySelectorAll(".faculty-card[data-name]").forEach(card => {
    card.addEventListener("click", () => openFacultyProfile(card));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openFacultyProfile(card);
      }
    });
  });

  facultyDialog?.querySelector(".dialog-close")?.addEventListener("click", () => facultyDialog.close());
  facultyDialog?.addEventListener("click", event => {
    if (event.target === facultyDialog) facultyDialog.close();
  });

  // Scroll reveal
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Cursor glow
  const glow = document.querySelector(".cursor-glow");
  if (glow && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = -500;
    let mouseY = -500;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener("mousemove", e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      glow.style.opacity = "1";
    });

    window.addEventListener("mouseleave", () => {
      glow.style.opacity = "0";
    });

    const animateGlow = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      glow.style.left = `${currentX}px`;
      glow.style.top = `${currentY}px`;
      requestAnimationFrame(animateGlow);
    };

    animateGlow();
  }

  // Topic ecosystem
  const topicData = {
    core: {
      icon: "✦",
      title: "Ecology & Evolution",
      description:
        "The central theme of the workshop: connecting ecological and evolutionary thinking with contemporary conservation challenges.",
      counter: "00 / 09"
    },
    population: {
      icon: "◎",
      title: "Population Genetics",
      description:
        "Explore genetic variation within and among populations, and the evolutionary processes that shape it.",
      counter: "01 / 09"
    },
    phylogenetics: {
      icon: "⌁",
      title: "Phylogenetics",
      description:
        "Use evolutionary relationships and shared ancestry to understand biological diversity through time.",
      counter: "02 / 09"
    },
    macroecology: {
      icon: "◌",
      title: "Macroecology",
      description:
        "Investigate broad-scale ecological patterns and the processes that influence biodiversity across space and time.",
      counter: "03 / 09"
    },
    sexual: {
      icon: "✺",
      title: "Sexual Selection",
      description:
        "Consider how mate choice, competition and reproductive strategies contribute to evolutionary change.",
      counter: "04 / 09"
    },
    quantitative: {
      icon: "⌗",
      title: "Quantitative Genetics",
      description:
        "Examine the genetic basis of complex traits and how variation can respond to evolutionary forces.",
      counter: "05 / 09"
    },
    social: {
      icon: "◈",
      title: "Social Evolution",
      description:
        "Explore how interactions among individuals can influence traits, behaviour and evolutionary outcomes.",
      counter: "06 / 09"
    },
    theoretical: {
      icon: "∿",
      title: "Theoretical Ecology",
      description:
        "Connect ecological theory, models and quantitative thinking to questions about populations and communities.",
      counter: "07 / 09"
    },
    biogeography: {
      icon: "◇",
      title: "Biogeography",
      description:
        "Understand how geography, history and environmental variation shape the distribution of biodiversity.",
      counter: "08 / 09"
    },
    genomics: {
      icon: "🧬",
      title: "Genomics & NGS",
      description:
        "Introduce genomic and next-generation sequencing approaches used in contemporary molecular ecology.",
      counter: "09 / 09"
    }
  };

  const topicNodes = document.querySelectorAll(".topic-node");
  const topicIcon = document.getElementById("topicIcon");
  const topicTitle = document.getElementById("topicTitle");
  const topicDescription = document.getElementById("topicDescription");
  const topicCounter = document.getElementById("topicCounter");

  function activateTopic(key) {
    const data = topicData[key];
    if (!data) return;

    topicNodes.forEach(node => {
      node.classList.toggle("active", node.dataset.topic === key);
    });

    topicIcon.style.transform = "scale(.7) rotate(-20deg)";
    setTimeout(() => {
      topicIcon.textContent = data.icon;
      topicTitle.textContent = data.title;
      topicDescription.textContent = data.description;
      topicCounter.textContent = data.counter;
      topicIcon.style.transform = "scale(1) rotate(0deg)";
    }, 120);
  }

  topicNodes.forEach(node => {
    node.addEventListener("mouseenter", () => activateTopic(node.dataset.topic));
    node.addEventListener("focus", () => activateTopic(node.dataset.topic));
    node.addEventListener("click", () => activateTopic(node.dataset.topic));
  });

  // Slight parallax on hero artwork
  const heroArt = document.querySelector(".hero-art");
  if (heroArt && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      heroArt.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // Magnetic button
  const magnetic = document.querySelector(".magnetic-button");
  if (magnetic && window.matchMedia("(pointer: fine)").matches) {
    magnetic.addEventListener("mousemove", e => {
      const rect = magnetic.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
      magnetic.style.transform = `translate(${x}px, ${y}px)`;
    });

    magnetic.addEventListener("mouseleave", () => {
      magnetic.style.transform = "";
    });
  }

  // Update hero section indicator based on scroll position
  const sections = [
    document.querySelector(".hero"),
    document.querySelector("#workshop"),
    document.querySelector("#topics"),
    document.querySelector("#learning"),
    document.querySelector("#activities"),
    document.querySelector("#faculty")
  ];

  const progress = document.querySelector(".hero-bottom span:last-child");

  window.addEventListener("scroll", () => {
    const y = window.scrollY + window.innerHeight * 0.45;
    let activeIndex = 0;

    sections.forEach((section, index) => {
      if (section && y >= section.offsetTop) activeIndex = index;
    });

    if (progress) {
      progress.textContent = `${String(activeIndex + 1).padStart(2, "0")} / 06`;
    }
  }, { passive: true });
});
