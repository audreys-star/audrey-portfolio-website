const words = [
  "Accounting Student",
  "Data Learner",
  "Finance Club Executive",
  "Student Leader",
  "Community Volunteer",
  "Growing Professional",
];

const rotatingWord = document.querySelector("[data-rotating-word]");
const header = document.querySelector("[data-header]");
const timelineItems = document.querySelectorAll(".timeline-item");
const skillBadges = document.querySelectorAll(".badge-row button");
let wordIndex = 0;

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
});

setInterval(() => {
  wordIndex = (wordIndex + 1) % words.length;
  rotatingWord.animate(
    [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0, transform: "translateY(8px)" },
    ],
    { duration: 180, easing: "ease-out" }
  ).onfinish = () => {
    rotatingWord.textContent = words[wordIndex];
    rotatingWord.animate(
      [
        { opacity: 0, transform: "translateY(-8px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 220, easing: "ease-out" }
    );
  };
}, 2200);

timelineItems.forEach((item) => {
  item.addEventListener("click", () => {
    timelineItems.forEach((other) => other.classList.remove("is-active"));
    item.classList.add("is-active");
  });
});

skillBadges.forEach((badge) => {
  badge.addEventListener("click", () => {
    badge.classList.toggle("is-selected");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-active");
      }
    });
  },
  { threshold: 0.42 }
);

timelineItems.forEach((item) => observer.observe(item));
