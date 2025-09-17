document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');

    // CORRECTION: Utiliser querySelector pour les classes et getElementById seulement pour les IDs
    const menuToggle = document.querySelector('.mobile-menu-toggle'); // Classe
    const offcanvasMenu = document.querySelector('.offcanvas-menu'); // Classe
    const offcanvasClose = document.querySelector('.offcanvas-close');
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    console.log('Elements found:', { menuToggle, offcanvasMenu, offcanvasClose, overlay });

    // Vérifier si les éléments existent avant d'ajouter les écouteurs d'événements
    if (menuToggle && offcanvasMenu && offcanvasClose && overlay) {
        console.log('All elements found, adding event listeners');

        function openMenu() {
            console.log('Menu opened');
            offcanvasMenu.classList.add('active');
            overlay.classList.add('active');
            body.classList.add('mobile-menu-active');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            offcanvasMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('mobile-menu-active');
            document.body.style.overflow = '';
        }

        menuToggle.addEventListener('click', openMenu);
        offcanvasClose.addEventListener('click', closeMenu);
        overlay.addEventListener('click', closeMenu);

        // Fermer le menu en cliquant sur un lien
        const mobileLinks = document.querySelectorAll('.mobile-menu a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Fermer le menu avec la touche Échap
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeMenu();
            }
        });
    } else {
        console.error('Some elements are missing:', {
            menuToggle: !!menuToggle,
            offcanvasMenu: !!offcanvasMenu,
            offcanvasClose: !!offcanvasClose,
            overlay: !!overlay
        });
    }
});



document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.counter-number');
    const speed = 2000; // Durée de l'animation en ms

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = Math.ceil(target / (speed / 16));
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (current > target) current = target;
                counter.textContent = current;
                setTimeout(updateCounter, 1);
            }
        };

        // Démarrer l'animation lorsque l'élément est visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter);
    });
});


document.addEventListener('DOMContentLoaded', function () {
    // Initialize Swiper
    const swiper = new Swiper('.logo-carousel', {
        slidesPerView: 2,
        spaceBetween: 30,
        speed: 500,
        loop: true,
        navigation: {
            nextEl: '.carousel-next',
            prevEl: '.carousel-prev',
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 30
            }
        },
        on: {
            init: function () {
                updatePagination(this.activeIndex);
            },
            slideChange: function () {
                updatePagination(this.realIndex);
            }
        }
    });

    // Update pagination bullets
    function updatePagination(activeIndex) {
        const bullets = document.querySelectorAll('.pagination-bullet');
        bullets.forEach((bullet, index) => {
            if (index === activeIndex) {
                bullet.classList.add('pagination-bullet-active');
            } else {
                bullet.classList.remove('pagination-bullet-active');
            }
        });
    }

    // Add click events to pagination bullets
    document.querySelectorAll('.pagination-bullet').forEach((bullet, index) => {
        bullet.addEventListener('click', () => {
            swiper.slideTo(index);
        });
    });
});

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: { delay: 5000 },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
});