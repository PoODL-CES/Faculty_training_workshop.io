// Faculty Training Workshop — interactive behaviour
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll(".nav-links a");

  const updateHeaderOnScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);
  updateHeaderOnScroll();
  window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });

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

  // December 2026 workshop calendar and daily schedules
  const workshopSchedule = {
    7: [
      ["9:00–10:00 am", "Breakfast"],
      ["10:15–11:00 am", "Opening Talk", "Purpose of the workshop and introduction to the workshop experts.", "Anubhab Khan · Kartik Shanker"],
      ["11:15 am–12:30 pm", "Lecture", "Population Genetics — introductory concepts and framing for the workshop.", "Uma Ramakrishnan"],
      ["12:30–1:00 pm", "Interactive Session / Q&A", "Open discussion with participants; introduction to the hands-on training module.", "Uma Ramakrishnan"],
      ["1:00–2:00 pm", "Lunch Break"],
      ["2:15–4:00 pm", "Practical", "Hands-on practical modules in Population Genetics.", "Uma Ramakrishnan"],
      ["4:00–4:30 pm", "High Tea"],
      ["4:30–6:00 pm", "Paper Discussion and Open Q&A", "", "Uma Ramakrishnan"]
    ],
    8: [
      ["6:30–8:00 am", "Bird Walk", "Bird watching on campus."],
      ["9:00–10:00 am", "Breakfast"],
      ["10:15–11:30 am", "Lecture", "Population Genetics — core concepts, methods and case studies.", "Uma Ramakrishnan"],
      ["11:45 am–1:00 pm", "Hands-on / Discussion", "Applied exercises and open discussion on Population Genetics.", "Uma Ramakrishnan"],
      ["1:00–2:00 pm", "Lunch Break"],
      ["2:15–4:00 pm", "Open Q&A / Wrap-up", "Discussion of key tools in Population Genetics and closing discussion.", "Uma Ramakrishnan"],
      ["4:00–4:30 pm", "High Tea"]
    ],
    9: [
      ["9:00–10:00 am", "Breakfast"],
      ["10:15–11:00 am", "Lecture", "Quantitative Genetics — core concepts, methods and case studies.", "Gaurav Baruah"],
      ["11:15 am–1:00 pm", "Hands-on / Discussion", "Applied exercises and open discussion on Quantitative Genetics.", "Gaurav Baruah"],
      ["1:00–2:00 pm", "Lunch Break"],
      ["2:15–4:00 pm", "Hands-on and Paper Discussion", "Continuation of applied exercises on Quantitative Genetics.", "Gaurav Baruah"],
      ["4:00–4:30 pm", "High Tea"],
      ["4:45–6:00 pm", "Open Q&A / Wrap-up", "Recap and follow-up questions.", "Gaurav Baruah"]
    ],
    10: [
      ["9:00–10:00 am", "Breakfast"],
      ["10:15–11:45 am", "Lecture", "Biogeography — core concepts, methods and case studies.", "Kartik Shanker"],
      ["12:00–1:00 pm", "Open Discussion", "", "Kartik Shanker"],
      ["1:00–2:00 pm", "Lunch Break"],
      ["2:15–3:45 pm", "Hands-on / Paper Discussion", "Applied exercises and discussion on Biogeography; recap and follow-up questions.", "Kartik Shanker"],
      ["4:00–4:30 pm", "High Tea"],
      ["4:45–6:00 pm", "Nocturnal Walk", "Evening campus walk to look for frogs, lorises, insects, bats and more."]
    ],
    11: [
      ["9:00–10:00 am", "Breakfast"],
      ["10:00–11:00 am", "Lecture", "Macroecology — core concepts, methods and case studies.", "Gopal Murali"],
      ["11:15 am–1:00 pm", "Hands-on / Discussion", "Applied exercises and open discussion on Macroecology.", "Gopal Murali"],
      ["1:00–2:00 pm", "Lunch Break"],
      ["2:15–4:00 pm", "Paper Discussion", "", "Gopal Murali"],
      ["4:00–4:30 pm", "High Tea"],
      ["4:45–6:00 pm", "Open Q&A / Wrap-up", "Closing discussion.", "Gopal Murali"]
    ],
    12: [
      ["9:00–10:00 am", "Breakfast"],
      ["10:15–11:00 am", "Lecture", "Phylogenetics — core concepts, methods and case studies.", "Praveen Karanth"],
      ["11:00 am–1:00 pm", "Hands-on / Discussion", "Applied exercises and open discussion on Phylogenetics.", "Praveen Karanth"],
      ["1:00–2:00 pm", "Lunch Break"],
      ["2:00–4:00 pm", "Paper Discussion and Open Q&A / Wrap-up", "Discussion of key papers on Phylogenetics and closing discussion.", "Praveen Karanth"],
      ["4:00–4:30 pm", "High Tea"],
      ["4:30–6:00 pm", "Practical", "Hands-on Molecular Ecology.", "Uma Ramakrishnan · Anubhab Khan · Praveen Karanth"]
    ],
    13: [
      ["6:30–8:00 am", "Bird Walk", "Bird counting on campus."],
      ["9:00–10:00 am", "Breakfast"],
      ["10:15–11:00 am", "Lecture", "Social Evolution — core concepts, methods and case studies.", "Raghavendra Gadagkar"],
      ["11:15 am–1:00 pm", "Discussion", "Applied exercises and open discussion on Social Evolution.", "Raghavendra Gadagkar"],
      ["1:00–2:00 pm", "Lunch Break"],
      ["2:00–4:00 pm", "Paper Discussion and Open Q&A / Wrap-up", "Discussion of key papers on Social Evolution and closing discussion.", "Raghavendra Gadagkar"],
      ["4:00–4:30 pm", "High Tea"]
    ],
    14: [
      ["9:00–10:00 am", "Breakfast"],
      ["10:00–11:30 am", "Lecture", "Sexual Selection — core concepts, methods and case studies.", "Maria Thaker"],
      ["11:30 am–1:00 pm", "Open Discussion", "", "Maria Thaker"],
      ["1:00–2:00 pm", "Lunch Break"],
      ["2:15–3:45 pm", "Paper Discussion and Open Q&A / Wrap-up", "Applied exercises and open discussion on Sexual Selection; closing discussion.", "Maria Thaker"],
      ["4:00–4:30 pm", "High Tea"],
      ["4:45–6:00 pm", "Nocturnal Walk", "Evening campus walk to look for frogs, lorises, insects, bats and more."]
    ],
    15: [
      ["9:00–10:00 am", "Breakfast"],
      ["10:15–11:00 am", "Lecture", "Theoretical Ecology — core concepts, methods and case studies.", "Vishwesha Guttal"],
      ["11:00 am–1:00 pm", "Hands-on / Discussion", "Applied exercises and open discussion on Theoretical Ecology.", "Vishwesha Guttal"],
      ["1:00–2:00 pm", "Lunch Break"],
      ["2:15–4:00 pm", "Hands-on", "Models and theory in Theoretical Ecology, including Game Theory.", "Vishwesha Guttal"],
      ["4:00–4:30 pm", "High Tea"],
      ["4:45–6:00 pm", "Paper Discussion and Open Q&A / Wrap-up", "Closing discussion.", "Vishwesha Guttal"]
    ],
    16: [
      ["9:00–10:00 am", "Breakfast"],
      ["10:15–11:00 am", "Lecture", "Introduction to genomics and its use in ecology and evolution.", "Anubhab Khan"],
      ["11:00 am–1:00 pm", "Hands-on / Discussion", "Applied exercises and open discussion on Genomics.", "Anubhab Khan"],
      ["1:00–2:00 pm", "Lunch Break"],
      ["2:00–4:00 pm", "Hands-on", "Introduction to NGS and practical training.", "Anubhab Khan"],
      ["4:00–4:30 pm", "High Tea"],
      ["4:45–6:00 pm", "Paper Discussion", "", "Anubhab Khan"],
      ["6:00–7:00 pm", "Closing Ceremony", "Closing remarks and feedback.", "Anubhab Khan · Kartik Shanker"]
    ]
  };

  const calendarDays = document.getElementById("calendarDays");
  const scheduleDialog = document.querySelector(".schedule-dialog");
  const scheduleTitle = document.getElementById("scheduleDialogTitle");
  const scheduleList = document.getElementById("scheduleList");
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  if (calendarDays) {
    const year = 2026;
    const monthIndex = 11;
    const daysInMonth = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
    const mondayOffset = (new Date(Date.UTC(year, monthIndex, 1)).getUTCDay() + 6) % 7;
    for (let i = 0; i < mondayOffset; i += 1) {
      const blank = document.createElement("span");
      blank.className = "calendar-empty";
      calendarDays.append(blank);
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(Date.UTC(year, monthIndex, day));
      const weekday = weekdays[(date.getUTCDay() + 6) % 7];
      const button = document.createElement("button");
      button.type = "button";
      button.className = `calendar-day${workshopSchedule[day] ? " workshop-day" : ""}`;
      button.textContent = day;
      button.disabled = !workshopSchedule[day];
      if (workshopSchedule[day]) {
        button.setAttribute("aria-label", `${weekday}, ${monthNames[monthIndex]} ${day}, ${year} — view schedule`);
        button.addEventListener("click", () => {
          scheduleTitle.textContent = `Day ${day - 6} · ${weekday}, ${monthNames[monthIndex]} ${day}`;
          scheduleList.replaceChildren();
          workshopSchedule[day].forEach(([time, activity, topic = "", speaker = ""]) => {
            const item = document.createElement("article");
            item.className = "schedule-item";
            const timeLabel = document.createElement("span");
            timeLabel.className = "schedule-time";
            timeLabel.textContent = time;
            const details = document.createElement("div");
            const activityLabel = document.createElement("h3");
            activityLabel.className = "schedule-activity";
            activityLabel.textContent = activity;
            details.append(activityLabel);
            if (topic) {
              const topicLabel = document.createElement("p");
              topicLabel.className = "schedule-topic";
              topicLabel.textContent = topic;
              details.append(topicLabel);
            }
            if (speaker) {
              const speakerLabel = document.createElement("p");
              speakerLabel.className = "schedule-speaker";
              speakerLabel.textContent = `Speaker${speaker.includes("·") ? "s" : ""}: ${speaker}`;
              details.append(speakerLabel);
            }
            item.append(timeLabel, details);
            scheduleList.append(item);
          });
          scheduleDialog.showModal();
        });
      } else {
        button.setAttribute("aria-label", `${weekday}, ${monthNames[monthIndex]} ${day}`);
      }
      calendarDays.append(button);
    }
  }

  scheduleDialog?.querySelector(".schedule-dialog-close")?.addEventListener("click", () => scheduleDialog.close());
  scheduleDialog?.addEventListener("click", event => {
    if (event.target === scheduleDialog) scheduleDialog.close();
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
