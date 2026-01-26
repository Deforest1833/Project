/* =========================================
   1. MOBILE MENU
   ========================================= */
function toggleMenu() {
    const menu = document.querySelector('.nav-links');
    if (menu) {
        menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
        // Reset to flex if we added a class instead, but inline style works for simple toggle
    }
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            const menu = document.querySelector('.nav-links');
            if (window.innerWidth <= 768 && menu) {
                menu.style.display = 'none';
            }
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* =========================================
   2. HOME PAGE CAROUSEL
   ========================================= */
const track = document.getElementById('track');
if (track) {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    function updateCarousel() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Expose function globally for the HTML onClick attributes
    window.goToSlide = function(n) {
        currentSlide = n;
        updateCarousel();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }

    // Auto-advance every 15 seconds
    setInterval(nextSlide, 15000);
}

/* =========================================
   3. ARTICLES FILTERING
   ========================================= */
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    const articles = document.querySelectorAll('.article-item');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Search Function
    searchInput.addEventListener('keyup', function(e) {
        const term = e.target.value.toLowerCase();
        
        articles.forEach(article => {
            const title = article.querySelector('h2').textContent.toLowerCase();
            const text = article.querySelector('p').textContent.toLowerCase();
            const category = article.getAttribute('data-category');
            
            if (title.includes(term) || text.includes(term) || category.includes(term)) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    });

    // Filter Buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            articles.forEach(article => {
                if (filter === 'all' || article.classList.contains(filter)) {
                    article.style.display = 'block';
                } else {
                    article.style.display = 'none';
                }
            });
        });
    });
}

/* =========================================
   4. FAQ ACCORDION
   ========================================= */
const faqQuestions = document.querySelectorAll('.faq-question');
if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const arrow = question.querySelector('.arrow');

            // Close others (optional - currently allowing multiple open)
            // To auto-close others, uncomment this loop:
            /*
            document.querySelectorAll('.faq-answer').forEach(item => {
                if(item !== answer) {
                    item.style.maxHeight = null;
                    item.classList.remove('open');
                }
            });
            document.querySelectorAll('.arrow').forEach(item => {
                if(item !== arrow) item.classList.remove('rotate');
            });
            */

            // Toggle current
            question.classList.toggle('active');
            arrow.classList.toggle('rotate');
            
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                answer.classList.remove('open');
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.classList.add('open');
            }
        });
    });
}
