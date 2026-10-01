/* ==========================================================
   Dr. Khan Research Academy - Dynamic Scripts
   Developed at MURAD UNITED STUDIO
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initSuccessorSlider();
	initNoticeBoard();
});

/**
 * Successors Slider Functionality
 * Handles Auto-play, Manual Scroll Navigation, and Pagination Dots
 */
function initSuccessorSlider() {
    const slider = document.querySelector('.successor-slider');
    const cards = document.querySelectorAll('.successor-card');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!slider || cards.length === 0) return;

    let currentIndex = 0;
    let autoPlayTimer = null;

    // Create Dynamic Pagination Dots
    cards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => scrollToSlide(index));
        if (dotsContainer) dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Scroll to Specific Slide Index
    function scrollToSlide(index) {
        currentIndex = index;
        const cardWidth = cards[0].offsetWidth + 20; // 20px gap
        slider.scrollTo({
            left: cardWidth * index,
            behavior: 'smooth'
        });
        updateDots(index);
    }

    // Update Dots Active State
    function updateDots(activeIndex) {
        dots.forEach((dot, idx) => {
            if (idx === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Next Slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        scrollToSlide(currentIndex);
    }

    // Previous Slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        scrollToSlide(currentIndex);
    }

    // Navigation Buttons Event Listeners
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

    // Detect Manual Scroll to Sync Dots
    slider.addEventListener('scroll', () => {
        const cardWidth = cards[0].offsetWidth + 20;
        const activeIdx = Math.round(slider.scrollLeft / cardWidth);
        if (activeIdx !== currentIndex && activeIdx < cards.length) {
            currentIndex = activeIdx;
            updateDots(currentIndex);
        }
    });

    // Auto-play Slider (Every 4 Seconds)
    function startAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, 4000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    // Pause on Mouse Hover
    slider.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    slider.addEventListener('mouseleave', () => startAutoPlay());

    // Start Auto Play
    startAutoPlay();
}
/**
 * Notice Board Auto-rotate & Switcher
 */
function initNoticeBoard() {
    const items = document.querySelectorAll('.notice-item');
    const dotsContainer = document.getElementById('noticeDots');
    const prevBtn = document.getElementById('prevNoticeBtn');
    const nextBtn = document.getElementById('nextNoticeBtn');

    if (items.length === 0) return;

    let currentIndex = 0;
    let timer = null;

    // ডায়নামিকভাবে প্যাজিনেশন ডট (Dots) তৈরি করা
    items.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.classList.add('notice-dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showNotice(idx));
        if (dotsContainer) dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.notice-dot');

    // নির্দিষ্ট নোটিশ দেখানোর ফাংশন
    function showNotice(index) {
        items[currentIndex].classList.remove('active');
        if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

        currentIndex = (index + items.length) % items.length;

        items[currentIndex].classList.add('active');
        if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    }

    // পরের নোটিশে যাওয়ার ফাংশন
    function nextNotice() {
        showNotice(currentIndex + 1);
    }

    // আগের নোটিশে যাওয়ার ফাংশন
    function prevNotice() {
        showNotice(currentIndex - 1);
    }

    // বাটনের ক্লিক ইভেন্ট লিসেনার
    if (nextBtn) nextBtn.addEventListener('click', () => { nextNotice(); resetTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevNotice(); resetTimer(); });

    // প্রতি ৫ সেকেন্ড পর পর স্বয়ংক্রিয়ভাবে নোটিশ পরিবর্তন হওয়া
    function startTimer() {
        timer = setInterval(nextNotice, 5000);
    }

    function resetTimer() {
        clearInterval(timer);
        startTimer();
    }

    startTimer();
}
