const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const iconOpen = document.getElementById("icon-open");
const iconClose = document.getElementById("icon-close");

menuToggle.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.contains("hidden");

    if (isHidden) {
        mobileMenu.classList.remove("hidden");
        mobileMenu.classList.add("flex");
        iconOpen.classList.add("hidden");
        iconClose.classList.remove("hidden");
        menuToggle.setAttribute("aria-expanded", "true");
    } else {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("flex");
        iconOpen.classList.remove("hidden");
        iconClose.classList.add("hidden");
        menuToggle.setAttribute("aria-expanded", "false");
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth >= 640 && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("flex");
        iconOpen.classList.remove("hidden");
        iconClose.classList.add("hidden");
        menuToggle.setAttribute("aria-expanded", "false");
    }
});

// ---------- اسلایدر تصاویر ----------
const sliderTrack = document.getElementById("slider-track");
const slides = document.querySelectorAll(".slider-slide");
const dotsContainer = document.getElementById("slider-dots");
const prevBtn = document.getElementById("slider-prev");
const nextBtn = document.getElementById("slider-next");
const sliderWrapper = document.getElementById("hero-slider");

let currentIndex = 0;
const totalSlides = slides.length;
let autoplayInterval;
const AUTOPLAY_DELAY = 4500;

slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.classList.add(
        "w-2.5", "h-2.5", "rounded-full", "transition-all", "duration-300",
        i === 0 ? "bg-gold" : "bg-cream/50"
    );
    dot.setAttribute("aria-label", `رفتن به اسلاید ${i + 1}`);
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll("button");

function updateSlider() {
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => {
        dot.classList.toggle("bg-gold", i === currentIndex);
        dot.classList.toggle("w-6", i === currentIndex);
        dot.classList.toggle("bg-cream/50", i !== currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    updateSlider();
    resetAutoplay();
}

function nextSlide() {
    goToSlide(currentIndex + 1);
}

function prevSlide() {
    goToSlide(currentIndex - 1);
}

function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
}

function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

sliderWrapper.addEventListener("mouseenter", () => clearInterval(autoplayInterval));
sliderWrapper.addEventListener("mouseleave", startAutoplay);

let touchStartX = 0;
let touchEndX = 0;

sliderWrapper.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(autoplayInterval);
}, { passive: true });

sliderWrapper.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const delta = touchEndX - touchStartX;
    const SWIPE_THRESHOLD = 50;

    if (delta > SWIPE_THRESHOLD) {
        prevSlide();
    } else if (delta < -SWIPE_THRESHOLD) {
        nextSlide();
    } else {
        resetAutoplay();
    }
}, { passive: true });

updateSlider();
startAutoplay();

// ---------- باز/بسته کردن متن درباره آموزشگاه (موبایل) ----------
const aboutToggleBtn = document.getElementById("about-toggle-btn");
if (aboutToggleBtn) {
    const aboutMoreText = document.getElementById("about-more-text");
    const aboutToggleText = document.getElementById("about-toggle-text");
    const aboutToggleIcon = document.getElementById("about-toggle-icon");

    aboutToggleBtn.addEventListener("click", () => {
        const isHidden = aboutMoreText.classList.contains("hidden");

        if (isHidden) {
            aboutMoreText.classList.remove("hidden");
            aboutToggleText.textContent = "بستن";
            aboutToggleIcon.classList.add("rotate-180");
        } else {
            aboutMoreText.classList.add("hidden");
            aboutToggleText.textContent = "بیشتر بخوانید";
            aboutToggleIcon.classList.remove("rotate-180");
        }
    });
}