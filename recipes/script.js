const track = document.getElementById("recipeTrack");
const cards = [...document.querySelectorAll(".recipe-card")];
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("dots");

let currentIndex = 0;

const cardStep = () => {
  const card = cards[0];
  const styles = getComputedStyle(track);
  const gap = parseFloat(styles.columnGap || styles.gap || 0);
  return card.offsetWidth + gap;
};

function getVisibleCards() {
  return Math.max(1, Math.floor(track.clientWidth / cardStep()));
}

function maxIndex() {
  return Math.max(0, cards.length - getVisibleCards());
}

function goTo(index, smooth = true) {
  const max = maxIndex();
  currentIndex = Math.max(0, Math.min(index, max));

  track.scrollTo({
    left: currentIndex * cardStep(),
    behavior: smooth ? "smooth" : "auto"
  });

  updateDots();
}

function next() {
  const max = maxIndex();

  if (currentIndex >= max) {
    goTo(0);
  } else {
    goTo(currentIndex + 1);
  }
}

function previous() {
  if (currentIndex <= 0) {
    goTo(maxIndex());
  } else {
    goTo(currentIndex - 1);
  }
}

function createDots() {
  dotsContainer.innerHTML = "";

  const total = maxIndex() + 1;

  for (let i = 0; i < total; i++) {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.setAttribute("aria-label", `Go to recipe group ${i + 1}`);

    dot.addEventListener("click", () => {
      goTo(i);
    });

    dotsContainer.appendChild(dot);
  }

  updateDots();
}

function updateDots() {
  [...dotsContainer.children].forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

nextBtn.addEventListener("click", () => {
  next();
});

prevBtn.addEventListener("click", () => {
  previous();
});

// Keep the active dot synchronized when manually scrolling.
track.addEventListener("scroll", () => {
  const index = Math.round(track.scrollLeft / cardStep());

  if (index !== currentIndex) {
    currentIndex = Math.min(index, maxIndex());
    updateDots();
  }
}, { passive: true });

window.addEventListener("resize", () => {
  createDots();
  goTo(currentIndex, false);
});

createDots();
