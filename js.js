/*
==========================================
  FOODHUB - CLEAN PRODUCTION JS
  Safe | Future Proof | No Runtime Errors
==========================================
*/

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       ORDER BUTTON FUNCTIONALITY
    ========================================== */

    const orderButtons = document.querySelectorAll(".order-btn");

    if (orderButtons.length > 0) {
        orderButtons.forEach(button => {
            button.addEventListener("click", function () {
                alert("Item added to cart!");
            });
        });
    }


    /* ==========================================
       MOBILE MENU FUNCTIONALITY
    ========================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");
    const navOverlay = document.querySelector(".nav-overlay");
    const navLinks = document.querySelectorAll(".nav-links a");
    const body = document.body;

    // Safety check - agar elements exist karte hain tab hi run karo
    if (menuToggle && nav && navOverlay) {

        function toggleMenu() {
            menuToggle.classList.toggle("active");
            nav.classList.toggle("active");
            navOverlay.classList.toggle("active");

            const isMenuOpen = nav.classList.contains("active");

            menuToggle.setAttribute("aria-expanded", isMenuOpen);
            navOverlay.setAttribute("aria-hidden", !isMenuOpen);

            body.style.overflow = isMenuOpen ? "hidden" : "";
        }

        // Toggle menu on hamburger click
        menuToggle.addEventListener("click", toggleMenu);

        // Close menu when clicking overlay
        navOverlay.addEventListener("click", toggleMenu);

        // Close menu when clicking any nav link
        if (navLinks.length > 0) {
            navLinks.forEach(link => {
                link.addEventListener("click", function () {
                    if (nav.classList.contains("active")) {
                        toggleMenu();
                    }
                });
            });
        }

        // Close menu with ESC key
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && nav.classList.contains("active")) {
                toggleMenu();
            }
        });
    }


    /* ==========================================
       SMOOTH SCROLL ARROW
    ========================================== */

    const scrollArrow = document.querySelector(".scroll-down");

    if (scrollArrow) {
        scrollArrow.addEventListener("click", function () {
            window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth"
            });
        });
    }

});





    /**
     * Menu Filter System
     * Handles category-based filtering of menu items with smooth animations
     */

    (function() {
        'use strict';

        // Configuration
        const CONFIG = {
            SELECTORS: {
                tabButtons: '.tab-btn',
                menuItems: '.menu-item',
                downloadButton: '#download-menu'
            },
            CLASSES: {
                active: 'active',
                hidden: 'hidden'
            },
            ANIMATION_DELAY: 50, // Stagger animation delay in ms
            CATEGORY_ALL: 'all'
        };

        /**
         * Initialize the menu filter functionality
         */
        function initializeMenuFilter() {
            const tabButtons = document.querySelectorAll(CONFIG.SELECTORS.tabButtons);
            const menuItems = document.querySelectorAll(CONFIG.SELECTORS.menuItems);
            const downloadButton = document.querySelector(CONFIG.SELECTORS.downloadButton);

            // Validate required elements exist
            if (!tabButtons.length || !menuItems.length) {
                console.warn('Menu filter initialization failed: Required elements not found');
                return;
            }

            // Set up tab button click handlers
            tabButtons.forEach(button => {
                button.addEventListener('click', handleTabClick);
            });

            // Set up download button handler
            if (downloadButton) {
                downloadButton.addEventListener('click', handleDownloadClick);
            }

            // Show all items on initial load
            showAllItems(menuItems);
        }

        /**
         * Handle tab button click event
         * @param {Event} event - Click event
         */
        function handleTabClick(event) {
            const clickedButton = event.currentTarget;
            const selectedCategory = clickedButton.getAttribute('data-category');

            if (!selectedCategory) {
                console.error('Tab button missing data-category attribute');
                return;
            }

            // Update active tab state
            updateActiveTab(clickedButton);

            // Filter menu items based on selected category
            filterMenuItems(selectedCategory);

            // Update ARIA attributes for accessibility
            updateAriaAttributes(clickedButton);
        }

        /**
         * Update active state for tab buttons
         * @param {HTMLElement} activeButton - The button that was clicked
         */
        function updateActiveTab(activeButton) {
            const allButtons = document.querySelectorAll(CONFIG.SELECTORS.tabButtons);
            
            allButtons.forEach(button => {
                button.classList.remove(CONFIG.CLASSES.active);
            });
            
            activeButton.classList.add(CONFIG.CLASSES.active);
        }

        /**
         * Filter menu items based on selected category
         * @param {string} category - Category to filter by ('all' shows everything)
         */
        function filterMenuItems(category) {
            const menuItems = document.querySelectorAll(CONFIG.SELECTORS.menuItems);

            menuItems.forEach((item, index) => {
                const itemCategory = item.getAttribute('data-category');

                if (category === CONFIG.CATEGORY_ALL || itemCategory === category) {
                    // Show item with staggered animation
                    setTimeout(() => {
                        item.classList.remove(CONFIG.CLASSES.hidden);
                        item.style.display = '';
                    }, index * CONFIG.ANIMATION_DELAY);
                } else {
                    // Hide item
                    item.classList.add(CONFIG.CLASSES.hidden);
                    item.style.display = 'none';
                }
            });
        }

        /**
         * Show all menu items (used on initialization)
         * @param {NodeList} items - Menu items to show
         */
        function showAllItems(items) {
            items.forEach(item => {
                item.classList.remove(CONFIG.CLASSES.hidden);
                item.style.display = '';
            });
        }

        /**
         * Update ARIA attributes for accessibility
         * @param {HTMLElement} activeButton - The currently active button
         */
        function updateAriaAttributes(activeButton) {
            const allButtons = document.querySelectorAll(CONFIG.SELECTORS.tabButtons);
            
            allButtons.forEach(button => {
                button.setAttribute('aria-selected', 'false');
            });
            
            activeButton.setAttribute('aria-selected', 'true');
        }

        /**
         * Handle download button click
         * @param {Event} event - Click event
         */
        function handleDownloadClick(event) {
            event.preventDefault();
            
            // Check if PDF exists before attempting download
            const pdfUrl = 'menu.pdf';
            
            // In production, you would check if the file exists
            // For now, show a user-friendly message
            alert('PDF download feature coming soon! Please contact the restaurant for a menu copy.');
            
            // Uncomment when PDF is ready:
            // window.location.href = pdfUrl;
        }

        // Initialize when DOM is fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeMenuFilter);
        } else {
            // DOM already loaded
            initializeMenuFilter();
        }

    })();









/**
 * Gallery Modal System with Image Navigation
 * Handles image viewing, keyboard navigation, and accessibility
 */

(function () {
    'use strict';

    // ================= CONFIGURATION =================
    const CONFIG = {
        SELECTORS: {
            galleryItems: '.gallery-item',
            modal: '#image-modal',
            modalImg: '.modal-img',
            modalTitle: '.modal-title',
            closeBtn: '.close-modal',
            prevBtn: '.modal-prev',
            nextBtn: '.modal-next',
            loader: '.image-loader'
        },
        CLASSES: {
            active: 'active',
            loaded: 'loaded'
        },
        KEYS: {
            ESCAPE: 'Escape',
            ARROW_LEFT: 'ArrowLeft',
            ARROW_RIGHT: 'ArrowRight',
            ENTER: 'Enter',
            SPACE: ' '
        }
    };

    // ================= STATE MANAGEMENT =================
    let state = {
        currentIndex: 0,
        totalImages: 0,
        isModalOpen: false,
        focusedElementBeforeModal: null
    };

    // ================= DOM ELEMENTS =================
    const elements = {
        galleryItems: null,
        modal: null,
        modalImg: null,
        modalTitle: null,
        closeBtn: null,
        prevBtn: null,
        nextBtn: null,
        loader: null,
        body: document.body
    };

    // ================= INITIALIZATION =================
    /**
     * Initialize the gallery modal system
     */
    function initialize() {
        try {
            // Cache DOM elements
            cacheDOMElements();

            // Validate required elements
            if (!validateElements()) {
                console.warn('Gallery modal: Required elements not found');
                return;
            }

            // Set initial state
            state.totalImages = elements.galleryItems.length;

            // Attach event listeners
            attachEventListeners();

            console.log('Gallery modal initialized successfully');
        } catch (error) {
            console.error('Gallery modal initialization error:', error);
        }
    }

    /**
     * Cache all DOM elements
     */
    function cacheDOMElements() {
        elements.galleryItems = document.querySelectorAll(CONFIG.SELECTORS.galleryItems);
        elements.modal = document.querySelector(CONFIG.SELECTORS.modal);
        elements.modalImg = document.querySelector(CONFIG.SELECTORS.modalImg);
        elements.modalTitle = document.querySelector(CONFIG.SELECTORS.modalTitle);
        elements.closeBtn = document.querySelector(CONFIG.SELECTORS.closeBtn);
        elements.prevBtn = document.querySelector(CONFIG.SELECTORS.prevBtn);
        elements.nextBtn = document.querySelector(CONFIG.SELECTORS.nextBtn);
        elements.loader = document.querySelector(CONFIG.SELECTORS.loader);
    }

    /**
     * Validate that all required elements exist
     * @returns {boolean} - True if all elements exist
     */
    function validateElements() {
        return !!(
            elements.galleryItems?.length &&
            elements.modal &&
            elements.modalImg &&
            elements.closeBtn &&
            elements.prevBtn &&
            elements.nextBtn
        );
    }

    // ================= EVENT LISTENERS =================
    /**
     * Attach all event listeners
     */
    function attachEventListeners() {
        // Gallery item clicks and keyboard activation
        elements.galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => handleGalleryItemClick(index));
            item.addEventListener('keydown', (e) => handleGalleryItemKeydown(e, index));
        });

        // Close button
        elements.closeBtn.addEventListener('click', closeModal);

        // Navigation buttons
        elements.prevBtn.addEventListener('click', showPreviousImage);
        elements.nextBtn.addEventListener('click', showNextImage);

        // Modal backdrop click
        elements.modal.addEventListener('click', handleModalBackdropClick);

        // Global keyboard events
        document.addEventListener('keydown', handleGlobalKeydown);
    }

    /**
     * Handle gallery item click
     * @param {number} index - Index of clicked item
     */
    function handleGalleryItemClick(index) {
        state.currentIndex = index;
        openModal();
        loadImage(index);
    }

    /**
     * Handle keyboard activation on gallery items
     * @param {KeyboardEvent} event - Keyboard event
     * @param {number} index - Index of gallery item
     */
    function handleGalleryItemKeydown(event, index) {
        if (event.key === CONFIG.KEYS.ENTER || event.key === CONFIG.KEYS.SPACE) {
            event.preventDefault();
            handleGalleryItemClick(index);
        }
    }

    /**
     * Handle clicks on modal backdrop
     * @param {Event} event - Click event
     */
    function handleModalBackdropClick(event) {
        if (event.target === elements.modal) {
            closeModal();
        }
    }

    /**
     * Handle global keyboard events
     * @param {KeyboardEvent} event - Keyboard event
     */
    function handleGlobalKeydown(event) {
        if (!state.isModalOpen) return;

        switch (event.key) {
            case CONFIG.KEYS.ESCAPE:
                event.preventDefault();
                closeModal();
                break;
            case CONFIG.KEYS.ARROW_LEFT:
                event.preventDefault();
                showPreviousImage();
                break;
            case CONFIG.KEYS.ARROW_RIGHT:
                event.preventDefault();
                showNextImage();
                break;
        }
    }

    // ================= MODAL CONTROL =================
    /**
     * Open the modal
     */
    function openModal() {
        // Store currently focused element
        state.focusedElementBeforeModal = document.activeElement;

        // Show modal
        elements.modal.classList.add(CONFIG.CLASSES.active);
        elements.modal.setAttribute('aria-hidden', 'false');
        
        // Disable body scroll
        elements.body.style.overflow = 'hidden';
        
        // Update state
        state.isModalOpen = true;

        // Focus close button for accessibility
        setTimeout(() => elements.closeBtn.focus(), 100);

        // Update navigation buttons
        updateNavigationButtons();
    }

    /**
     * Close the modal
     */
    function closeModal() {
        // Hide modal
        elements.modal.classList.remove(CONFIG.CLASSES.active);
        elements.modal.setAttribute('aria-hidden', 'true');
        
        // Re-enable body scroll
        elements.body.style.overflow = '';
        
        // Update state
        state.isModalOpen = false;

        // Reset image
        elements.modalImg.classList.remove(CONFIG.CLASSES.loaded);
        elements.modalImg.src = '';
        elements.modalImg.alt = '';

        // Restore focus to previously focused element
        if (state.focusedElementBeforeModal) {
            state.focusedElementBeforeModal.focus();
        }
    }

    // ================= IMAGE LOADING =================
    /**
     * Load and display an image
     * @param {number} index - Index of image to load
     */
    function loadImage(index) {
        const item = elements.galleryItems[index];
        if (!item) return;

        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-title')?.textContent || '';

        // Show loader
        showLoader();

        // Remove loaded class for animation
        elements.modalImg.classList.remove(CONFIG.CLASSES.loaded);

        // Create new image object to preload
        const tempImage = new Image();

        tempImage.onload = () => {
            // Set modal image source
            elements.modalImg.src = tempImage.src;
            elements.modalImg.alt = img.alt;
            
            // Set title
            if (elements.modalTitle) {
                elements.modalTitle.textContent = title;
            }

            // Hide loader and show image
            hideLoader();
            elements.modalImg.classList.add(CONFIG.CLASSES.loaded);
        };

        tempImage.onerror = () => {
            console.error(`Failed to load image: ${img.src}`);
            hideLoader();
            // Show error message
            if (elements.modalTitle) {
                elements.modalTitle.textContent = 'Failed to load image';
            }
        };

        // Start loading
        tempImage.src = img.src;
    }

    /**
     * Show loading indicator
     */
    function showLoader() {
        if (elements.loader) {
            elements.loader.classList.add(CONFIG.CLASSES.active);
        }
    }

    /**
     * Hide loading indicator
     */
    function hideLoader() {
        if (elements.loader) {
            elements.loader.classList.remove(CONFIG.CLASSES.active);
        }
    }

    // ================= NAVIGATION =================
    /**
     * Show previous image
     */
    function showPreviousImage() {
        if (state.currentIndex > 0) {
            state.currentIndex--;
            loadImage(state.currentIndex);
            updateNavigationButtons();
        }
    }

    /**
     * Show next image
     */
    function showNextImage() {
        if (state.currentIndex < state.totalImages - 1) {
            state.currentIndex++;
            loadImage(state.currentIndex);
            updateNavigationButtons();
        }
    }

    /**
     * Update navigation button states
     */
    function updateNavigationButtons() {
        // Disable previous button on first image
        elements.prevBtn.disabled = state.currentIndex === 0;
        
        // Disable next button on last image
        elements.nextBtn.disabled = state.currentIndex === state.totalImages - 1;
    }

    // ================= INITIALIZATION TRIGGER =================
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

})();







/**
 * VIP Testimonials Slider & Stats Counter System
 * Handles testimonial carousel, statistics animation, and accessibility
 */

(function () {
    'use strict';

    // ================= CONFIGURATION =================
    const CONFIG = {
        SELECTORS: {
            cards: '.vip-card',
            nextBtn: '.vip-next',
            prevBtn: '.vip-prev',
            dotsContainer: '.vip-dots',
            counters: '.counter',
            slider: '.vip-slider',
            statsSection: '.vip-stats'
        },
        CLASSES: {
            active: 'active',
            animated: 'animated'
        },
        TIMING: {
            autoplayInterval: 5000,
            counterDuration: 2000,
            transitionDelay: 100
        },
        KEYS: {
            ARROW_LEFT: 'ArrowLeft',
            ARROW_RIGHT: 'ArrowRight',
            ENTER: 'Enter',
            SPACE: ' '
        }
    };

    // ================= STATE MANAGEMENT =================
    const state = {
        currentIndex: 0,
        totalSlides: 0,
        autoplayInterval: null,
        countersAnimated: false,
        touchStartX: 0,
        touchEndX: 0,
        isTransitioning: false
    };

    // ================= DOM ELEMENTS =================
    const elements = {
        cards: null,
        nextBtn: null,
        prevBtn: null,
        dotsContainer: null,
        dots: [],
        counters: null,
        slider: null,
        statsSection: null
    };

    // ================= INITIALIZATION =================
    /**
     * Initialize the testimonial slider and counter system
     */
    function initialize() {
        try {
            // Cache DOM elements
            cacheDOMElements();

            // Validate required elements
            if (!validateElements()) {
                console.warn('VIP Testimonials: Required elements not found');
                return;
            }

            // Set initial state
            state.totalSlides = elements.cards.length;

            // Initialize components
            createPaginationDots();
            attachEventListeners();
            showSlide(0);
            startAutoplay();
            setupIntersectionObserver();

            console.log('VIP Testimonials initialized successfully');
        } catch (error) {
            console.error('VIP Testimonials initialization error:', error);
        }
    }

    /**
     * Cache all DOM elements
     */
    function cacheDOMElements() {
        elements.cards = document.querySelectorAll(CONFIG.SELECTORS.cards);
        elements.nextBtn = document.querySelector(CONFIG.SELECTORS.nextBtn);
        elements.prevBtn = document.querySelector(CONFIG.SELECTORS.prevBtn);
        elements.dotsContainer = document.querySelector(CONFIG.SELECTORS.dotsContainer);
        elements.counters = document.querySelectorAll(CONFIG.SELECTORS.counters);
        elements.slider = document.querySelector(CONFIG.SELECTORS.slider);
        elements.statsSection = document.querySelector(CONFIG.SELECTORS.statsSection);
    }

    /**
     * Validate that required elements exist
     * @returns {boolean} - True if all required elements exist
     */
    function validateElements() {
        return !!(
            elements.cards?.length &&
            elements.nextBtn &&
            elements.prevBtn &&
            elements.dotsContainer &&
            elements.slider
        );
    }

    // ================= PAGINATION DOTS =================
    /**
     * Create pagination dot indicators
     */
    function createPaginationDots() {
        elements.dotsContainer.innerHTML = '';
        elements.dots = [];

        elements.cards.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
            dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
            dot.setAttribute('tabindex', index === 0 ? '0' : '-1');
            
            dot.addEventListener('click', () => handleDotClick(index));
            dot.addEventListener('keydown', (e) => handleDotKeydown(e, index));
            
            elements.dotsContainer.appendChild(dot);
            elements.dots.push(dot);
        });
    }

    /**
     * Handle dot click event
     * @param {number} index - Index of clicked dot
     */
    function handleDotClick(index) {
        showSlide(index);
        resetAutoplay();
    }

    /**
     * Handle keyboard navigation on dots
     * @param {KeyboardEvent} event - Keyboard event
     * @param {number} index - Index of current dot
     */
    function handleDotKeydown(event, index) {
        if (event.key === CONFIG.KEYS.ENTER || event.key === CONFIG.KEYS.SPACE) {
            event.preventDefault();
            handleDotClick(index);
        }
    }

    // ================= SLIDER FUNCTIONALITY =================
    /**
     * Show a specific slide
     * @param {number} index - Index of slide to show
     */
    function showSlide(index) {
        if (state.isTransitioning) return;

        state.isTransitioning = true;

        // Normalize index (handle wrapping)
        state.currentIndex = ((index % state.totalSlides) + state.totalSlides) % state.totalSlides;

        // Update cards
        elements.cards.forEach((card, i) => {
            card.classList.remove(CONFIG.CLASSES.active);
            card.setAttribute('aria-hidden', 'true');
        });

        elements.cards[state.currentIndex].classList.add(CONFIG.CLASSES.active);
        elements.cards[state.currentIndex].setAttribute('aria-hidden', 'false');

        // Update dots
        elements.dots.forEach((dot, i) => {
            dot.classList.remove(CONFIG.CLASSES.active);
            dot.setAttribute('aria-selected', 'false');
            dot.setAttribute('tabindex', '-1');
        });

        elements.dots[state.currentIndex].classList.add(CONFIG.CLASSES.active);
        elements.dots[state.currentIndex].setAttribute('aria-selected', 'true');
        elements.dots[state.currentIndex].setAttribute('tabindex', '0');

        // Allow transitions to complete
        setTimeout(() => {
            state.isTransitioning = false;
        }, CONFIG.TIMING.transitionDelay);
    }

    /**
     * Navigate to next slide
     */
    function nextSlide() {
        showSlide(state.currentIndex + 1);
    }

    /**
     * Navigate to previous slide
     */
    function prevSlide() {
        showSlide(state.currentIndex - 1);
    }

    // ================= AUTOPLAY =================
    /**
     * Start autoplay
     */
    function startAutoplay() {
        state.autoplayInterval = setInterval(nextSlide, CONFIG.TIMING.autoplayInterval);
    }

    /**
     * Stop autoplay
     */
    function stopAutoplay() {
        if (state.autoplayInterval) {
            clearInterval(state.autoplayInterval);
            state.autoplayInterval = null;
        }
    }

    /**
     * Reset autoplay (stop and restart)
     */
    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // ================= EVENT LISTENERS =================
    /**
     * Attach all event listeners
     */
    function attachEventListeners() {
        // Navigation buttons
        elements.nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoplay();
        });

        elements.prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoplay();
        });

        // Keyboard navigation
        document.addEventListener('keydown', handleGlobalKeydown);

        // Pause on hover
        elements.slider.addEventListener('mouseenter', stopAutoplay);
        elements.slider.addEventListener('mouseleave', startAutoplay);

        // Touch events for mobile swipe
        elements.slider.addEventListener('touchstart', handleTouchStart, { passive: true });
        elements.slider.addEventListener('touchend', handleTouchEnd, { passive: true });

        // Visibility change (pause when tab is hidden)
        document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    /**
     * Handle global keyboard events
     * @param {KeyboardEvent} event - Keyboard event
     */
    function handleGlobalKeydown(event) {
        // Only handle if slider is in focus context
        if (!elements.slider.contains(document.activeElement)) return;

        switch (event.key) {
            case CONFIG.KEYS.ARROW_LEFT:
                event.preventDefault();
                prevSlide();
                resetAutoplay();
                break;
            case CONFIG.KEYS.ARROW_RIGHT:
                event.preventDefault();
                nextSlide();
                resetAutoplay();
                break;
        }
    }

    /**
     * Handle touch start event
     * @param {TouchEvent} event - Touch event
     */
    function handleTouchStart(event) {
        state.touchStartX = event.changedTouches[0].screenX;
    }

    /**
     * Handle touch end event (swipe detection)
     * @param {TouchEvent} event - Touch event
     */
    function handleTouchEnd(event) {
        state.touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    }

    /**
     * Process swipe gesture
     */
    function handleSwipe() {
        const swipeThreshold = 50;
        const difference = state.touchStartX - state.touchEndX;

        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
            resetAutoplay();
        }
    }

    /**
     * Handle page visibility change
     */
    function handleVisibilityChange() {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    }

    // ================= COUNTER ANIMATION =================
    /**
     * Setup intersection observer for counter animation
     */
    function setupIntersectionObserver() {
        if (!elements.statsSection || !elements.counters?.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !state.countersAnimated) {
                    state.countersAnimated = true;
                    animateAllCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(elements.statsSection);
    }

    /**
     * Animate all counter elements
     */
    function animateAllCounters() {
        elements.counters.forEach(counter => {
            animateCounter(counter);
        });
    }

    /**
     * Animate a single counter element
     * @param {HTMLElement} counter - Counter element to animate
     */
    function animateCounter(counter) {
        const target = parseFloat(counter.dataset.target);
        const suffix = counter.dataset.suffix || '';
        const decimals = parseInt(counter.dataset.decimal || '0');
        const duration = CONFIG.TIMING.counterDuration;
        const startTime = performance.now();

        /**
         * Update counter value using requestAnimationFrame
         * @param {number} currentTime - Current timestamp
         */
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (easeOutCubic)
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = target * easeProgress;

            // Format the number
            const formatted = decimals > 0 
                ? current.toFixed(decimals) 
                : Math.floor(current).toLocaleString();

            counter.textContent = formatted;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Final value with suffix
                const finalValue = decimals > 0 
                    ? target.toFixed(decimals) 
                    : target.toLocaleString();
                counter.textContent = finalValue + suffix;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // ================= CLEANUP =================
    /**
     * Cleanup function (can be called when component is destroyed)
     */
    function cleanup() {
        stopAutoplay();
        // Remove event listeners if needed
        document.removeEventListener('keydown', handleGlobalKeydown);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
    }

    // Make cleanup available globally if needed
    window.cleanupVIPTestimonials = cleanup;

    // ================= INITIALIZATION TRIGGER =================
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

})();









/**
 * Restaurant Reservation Form System
 * Handles form validation, submission, and user feedback
 */

(function () {
    'use strict';

    // ================= CONFIGURATION =================
    const CONFIG = {
        SELECTORS: {
            form: '#reservationForm',
            submitBtn: '#submitBtn',
            formMessage: '#formMessage',
            fields: {
                fullName: '#fullName',
                phone: '#phone',
                date: '#date',
                time: '#time',
                guests: '#guests'
            }
        },
        CLASSES: {
            error: 'error',
            success: 'success',
            loading: 'loading'
        },
        VALIDATION: {
            minNameLength: 2,
            maxNameLength: 50,
            phonePattern: /^[\d\s\-\+\(\)]{10,15}$/,
            minPhoneDigits: 10
        },
        BUSINESS_HOURS: {
            weekday: { open: 11, close: 23 },  // 11 AM - 11 PM
            weekend: { open: 11, close: 24 }   // 11 AM - 12 AM (midnight)
        },
        MESSAGES: {
            success: 'Reservation submitted successfully! We will contact you soon.',
            genericError: 'Please fix the errors above and try again.',
            submitting: 'Submitting your reservation...'
        },
        TIMING: {
            messageDisplay: 5000,  // 5 seconds
            submitDelay: 1500      // 1.5 seconds (simulated API call)
        }
    };

    // ================= STATE MANAGEMENT =================
    const state = {
        isSubmitting: false,
        validationErrors: {}
    };

    // ================= DOM ELEMENTS =================
    const elements = {
        form: null,
        submitBtn: null,
        formMessage: null,
        fields: {}
    };

    // ================= INITIALIZATION =================
    /**
     * Initialize the reservation form system
     */
    function initialize() {
        try {
            // Cache DOM elements
            cacheDOMElements();

            // Validate required elements exist
            if (!validateElements()) {
                console.warn('Reservation form: Required elements not found');
                return;
            }

            // Set minimum date to today
            setMinimumDate();

            // Attach event listeners
            attachEventListeners();

            console.log('Reservation form initialized successfully');
        } catch (error) {
            console.error('Reservation form initialization error:', error);
        }
    }

    /**
     * Cache all DOM elements
     */
    function cacheDOMElements() {
        elements.form = document.querySelector(CONFIG.SELECTORS.form);
        elements.submitBtn = document.querySelector(CONFIG.SELECTORS.submitBtn);
        elements.formMessage = document.querySelector(CONFIG.SELECTORS.formMessage);

        // Cache form fields
        Object.keys(CONFIG.SELECTORS.fields).forEach(fieldName => {
            elements.fields[fieldName] = document.querySelector(
                CONFIG.SELECTORS.fields[fieldName]
            );
        });
    }

    /**
     * Validate that required elements exist
     * @returns {boolean} - True if all required elements exist
     */
    function validateElements() {
        return !!(
            elements.form &&
            elements.submitBtn &&
            elements.formMessage &&
            Object.values(elements.fields).every(field => field !== null)
        );
    }

    /**
     * Set minimum date to today's date
     */
    function setMinimumDate() {
        const today = new Date().toISOString().split('T')[0];
        elements.fields.date.setAttribute('min', today);
    }

    // ================= EVENT LISTENERS =================
    /**
     * Attach all event listeners
     */
    function attachEventListeners() {
        // Form submission
        elements.form.addEventListener('submit', handleFormSubmit);

        // Real-time validation on blur
        Object.values(elements.fields).forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => clearFieldError(field));
        });
    }

    /**
     * Handle form submission
     * @param {Event} event - Submit event
     */
    async function handleFormSubmit(event) {
        event.preventDefault();

        // Prevent double submission
        if (state.isSubmitting) return;

        // Clear previous messages
        clearFormMessage();

        // Validate all fields
        const isValid = validateAllFields();

        if (!isValid) {
            showFormMessage(CONFIG.MESSAGES.genericError, CONFIG.CLASSES.error);
            return;
        }

        // Show loading state
        setSubmittingState(true);

        try {
            // Simulate API call (replace with actual submission)
            await simulateAPICall();

            // Show success message
            showFormMessage(CONFIG.MESSAGES.success, CONFIG.CLASSES.success);

            // Reset form
            elements.form.reset();
            clearAllFieldStates();

            // Hide message after delay
            setTimeout(clearFormMessage, CONFIG.TIMING.messageDisplay);

        } catch (error) {
            console.error('Reservation submission error:', error);
            showFormMessage(
                'An error occurred. Please try again later.',
                CONFIG.CLASSES.error
            );
        } finally {
            setSubmittingState(false);
        }
    }

    // ================= VALIDATION =================
    /**
     * Validate all form fields
     * @returns {boolean} - True if all fields are valid
     */
    function validateAllFields() {
        state.validationErrors = {};
        let isValid = true;

        Object.values(elements.fields).forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * Validate a single field
     * @param {HTMLElement} field - Field to validate
     * @returns {boolean} - True if field is valid
     */
    function validateField(field) {
        const fieldName = field.id;
        const value = field.value.trim();

        let errorMessage = '';

        switch (fieldName) {
            case 'fullName':
                errorMessage = validateName(value);
                break;
            case 'phone':
                errorMessage = validatePhone(value);
                break;
            case 'date':
                errorMessage = validateDate(value);
                break;
            case 'time':
                errorMessage = validateTime(value, elements.fields.date.value);
                break;
            case 'guests':
                // Guests field is optional, always valid
                break;
        }

        if (errorMessage) {
            showFieldError(field, errorMessage);
            state.validationErrors[fieldName] = errorMessage;
            return false;
        } else {
            clearFieldError(field);
            showFieldSuccess(field);
            delete state.validationErrors[fieldName];
            return true;
        }
    }

    /**
     * Validate name field
     * @param {string} name - Name value
     * @returns {string} - Error message or empty string
     */
    function validateName(name) {
        if (!name) {
            return 'Name is required';
        }

        if (name.length < CONFIG.VALIDATION.minNameLength) {
            return `Name must be at least ${CONFIG.VALIDATION.minNameLength} characters`;
        }

        if (name.length > CONFIG.VALIDATION.maxNameLength) {
            return `Name must not exceed ${CONFIG.VALIDATION.maxNameLength} characters`;
        }

        if (!/^[a-zA-Z\s'-]+$/.test(name)) {
            return 'Name can only contain letters, spaces, hyphens, and apostrophes';
        }

        return '';
    }

    /**
     * Validate phone number
     * @param {string} phone - Phone value
     * @returns {string} - Error message or empty string
     */
    function validatePhone(phone) {
        if (!phone) {
            return 'Phone number is required';
        }

        // Remove all non-digit characters for counting
        const digitsOnly = phone.replace(/\D/g, '');

        if (digitsOnly.length < CONFIG.VALIDATION.minPhoneDigits) {
            return `Phone number must contain at least ${CONFIG.VALIDATION.minPhoneDigits} digits`;
        }

        if (!CONFIG.VALIDATION.phonePattern.test(phone)) {
            return 'Please enter a valid phone number';
        }

        return '';
    }

    /**
     * Validate date field
     * @param {string} dateValue - Date value
     * @returns {string} - Error message or empty string
     */
    function validateDate(dateValue) {
        if (!dateValue) {
            return 'Date is required';
        }

        const selectedDate = new Date(dateValue);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            return 'Date cannot be in the past';
        }

        // Optional: Limit booking to 3 months in advance
        const threeMonthsLater = new Date();
        threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

        if (selectedDate > threeMonthsLater) {
            return 'Reservations can only be made up to 3 months in advance';
        }

        return '';
    }

    /**
     * Validate time field
     * @param {string} timeValue - Time value
     * @param {string} dateValue - Associated date value
     * @returns {string} - Error message or empty string
     */
    function validateTime(timeValue, dateValue) {
        if (!timeValue) {
            return 'Time is required';
        }

        const [hours, minutes] = timeValue.split(':').map(Number);
        const selectedDate = new Date(dateValue);
        const dayOfWeek = selectedDate.getDay();
        
        // Determine if weekend (Friday=5, Saturday=6, Sunday=0)
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6;
        const businessHours = isWeekend 
            ? CONFIG.BUSINESS_HOURS.weekend 
            : CONFIG.BUSINESS_HOURS.weekday;

        // Check if time is within business hours
        if (hours < businessHours.open) {
            return `Restaurant opens at ${businessHours.open}:00 AM`;
        }

        if (hours >= businessHours.close) {
            const closingTime = businessHours.close === 24 ? '12:00 AM' : `${businessHours.close}:00 PM`;
            return `Restaurant closes at ${closingTime}`;
        }

        // If date is today, check if time is in the future
        const today = new Date();
        const selectedDateTime = new Date(dateValue);
        selectedDateTime.setHours(hours, minutes);

        if (
            selectedDateTime.toDateString() === today.toDateString() &&
            selectedDateTime <= today
        ) {
            return 'Time must be in the future';
        }

        return '';
    }

    // ================= UI FEEDBACK =================
    /**
     * Show field error
     * @param {HTMLElement} field - Field element
     * @param {string} message - Error message
     */
    function showFieldError(field, message) {
        field.classList.add(CONFIG.CLASSES.error);
        field.classList.remove(CONFIG.CLASSES.success);
        
        const errorElement = document.getElementById(`${field.id}-error`);
        if (errorElement) {
            errorElement.textContent = message;
        }

        // Update ARIA
        field.setAttribute('aria-invalid', 'true');
    }

    /**
     * Clear field error
     * @param {HTMLElement} field - Field element
     */
    function clearFieldError(field) {
        field.classList.remove(CONFIG.CLASSES.error);
        
        const errorElement = document.getElementById(`${field.id}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }

        // Update ARIA
        field.setAttribute('aria-invalid', 'false');
    }

    /**
     * Show field success state
     * @param {HTMLElement} field - Field element
     */
    function showFieldSuccess(field) {
        if (field.value.trim()) {
            field.classList.add(CONFIG.CLASSES.success);
        }
    }

    /**
     * Clear all field states
     */
    function clearAllFieldStates() {
        Object.values(elements.fields).forEach(field => {
            field.classList.remove(CONFIG.CLASSES.error, CONFIG.CLASSES.success);
            field.setAttribute('aria-invalid', 'false');
            
            const errorElement = document.getElementById(`${field.id}-error`);
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    }

    /**
     * Show form-level message
     * @param {string} message - Message text
     * @param {string} type - Message type ('success' or 'error')
     */
    function showFormMessage(message, type) {
        elements.formMessage.textContent = message;
        elements.formMessage.className = `form-message ${type}`;
    }

    /**
     * Clear form message
     */
    function clearFormMessage() {
        elements.formMessage.textContent = '';
        elements.formMessage.className = 'form-message';
    }

    /**
     * Set submitting state
     * @param {boolean} isSubmitting - Submitting state
     */
    function setSubmittingState(isSubmitting) {
        state.isSubmitting = isSubmitting;

        if (isSubmitting) {
            elements.submitBtn.disabled = true;
            elements.submitBtn.classList.add(CONFIG.CLASSES.loading);
            showFormMessage(CONFIG.MESSAGES.submitting, 'info');
        } else {
            elements.submitBtn.disabled = false;
            elements.submitBtn.classList.remove(CONFIG.CLASSES.loading);
        }
    }

    // ================= API SIMULATION =================
    /**
     * Simulate API call (replace with actual implementation)
     * @returns {Promise} - Resolves after delay
     */
    function simulateAPICall() {
        return new Promise((resolve) => {
            setTimeout(resolve, CONFIG.TIMING.submitDelay);
        });
    }

    // ================= INITIALIZATION TRIGGER =================
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

})();










/**
 * Contact Section Interactive Features
 * Handles copy-to-clipboard, map loading, and user interactions
 */

(function () {
    'use strict';

    // ================= CONFIGURATION =================
    const CONFIG = {
        SELECTORS: {
            copyButtons: '.copy-btn',
            toast: '#copyToast',
            mapIframe: '#contactMap',
            mapLoading: '#mapLoading'
        },
        CLASSES: {
            copied: 'copied',
            show: 'show',
            hidden: 'hidden',
            success: 'success',
            error: 'error'
        },
        TIMING: {
            toastDuration: 3000,
            copiedStateDuration: 2000
        },
        MESSAGES: {
            copySuccess: '✓ Copied to clipboard!',
            copyError: '✗ Failed to copy',
            fallbackCopy: 'Press Ctrl+C to copy'
        }
    };

    // ================= STATE MANAGEMENT =================
    const state = {
        isMapLoaded: false,
        activeToast: null
    };

    // ================= DOM ELEMENTS =================
    const elements = {
        copyButtons: null,
        toast: null,
        mapIframe: null,
        mapLoading: null
    };

    // ================= INITIALIZATION =================
    /**
     * Initialize contact section features
     */
    function initialize() {
        try {
            // Cache DOM elements
            cacheDOMElements();

            // Attach event listeners
            attachEventListeners();

            // Initialize map loading
            initializeMapLoading();

            console.log('Contact section initialized successfully');
        } catch (error) {
            console.error('Contact section initialization error:', error);
        }
    }

    /**
     * Cache all DOM elements
     */
    function cacheDOMElements() {
        elements.copyButtons = document.querySelectorAll(CONFIG.SELECTORS.copyButtons);
        elements.toast = document.querySelector(CONFIG.SELECTORS.toast);
        elements.mapIframe = document.querySelector(CONFIG.SELECTORS.mapIframe);
        elements.mapLoading = document.querySelector(CONFIG.SELECTORS.mapLoading);
    }

    // ================= EVENT LISTENERS =================
    /**
     * Attach all event listeners
     */
    function attachEventListeners() {
        // Copy button listeners
        if (elements.copyButtons) {
            elements.copyButtons.forEach(button => {
                button.addEventListener('click', handleCopyClick);
            });
        }

        // Map load listener
        if (elements.mapIframe) {
            elements.mapIframe.addEventListener('load', handleMapLoad);
            elements.mapIframe.addEventListener('error', handleMapError);
        }

        // Track external link clicks (analytics hook)
        trackExternalLinks();
    }

    // ================= COPY TO CLIPBOARD =================
    /**
     * Handle copy button click
     * @param {Event} event - Click event
     */
    async function handleCopyClick(event) {
        const button = event.currentTarget;
        const textToCopy = button.dataset.copy;

        if (!textToCopy) {
            console.warn('No text to copy');
            return;
        }

        try {
            // Modern clipboard API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(textToCopy);
                showCopySuccess(button);
            } else {
                // Fallback for older browsers
                copyTextFallback(textToCopy);
                showCopySuccess(button);
            }
        } catch (error) {
            console.error('Copy failed:', error);
            showCopyError();
        }
    }

    /**
     * Fallback copy method for older browsers
     * @param {string} text - Text to copy
     */
    function copyTextFallback(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            if (!successful) {
                throw new Error('Copy command failed');
            }
        } finally {
            document.body.removeChild(textArea);
        }
    }

    /**
     * Show copy success feedback
     * @param {HTMLElement} button - Clicked button
     */
    function showCopySuccess(button) {
        // Add copied class to button
        button.classList.add(CONFIG.CLASSES.copied);
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';

        // Reset button after delay
        setTimeout(() => {
            button.classList.remove(CONFIG.CLASSES.copied);
            button.textContent = originalText;
        }, CONFIG.TIMING.copiedStateDuration);

        // Show toast notification
        showToast(CONFIG.MESSAGES.copySuccess, CONFIG.CLASSES.success);
    }

    /**
     * Show copy error feedback
     */
    function showCopyError() {
        showToast(CONFIG.MESSAGES.copyError, CONFIG.CLASSES.error);
    }

    // ================= TOAST NOTIFICATIONS =================
    /**
     * Show toast notification
     * @param {string} message - Message to display
     * @param {string} type - Toast type (success/error)
     */
    function showToast(message, type = CONFIG.CLASSES.success) {
        if (!elements.toast) return;

        // Clear existing timeout
        if (state.activeToast) {
            clearTimeout(state.activeToast);
        }

        // Set message and type
        elements.toast.textContent = message;
        elements.toast.className = `toast ${CONFIG.CLASSES.show} ${type}`;

        // Auto-hide after duration
        state.activeToast = setTimeout(() => {
            hideToast();
        }, CONFIG.TIMING.toastDuration);
    }

    /**
     * Hide toast notification
     */
    function hideToast() {
        if (!elements.toast) return;

        elements.toast.classList.remove(CONFIG.CLASSES.show);
        state.activeToast = null;
    }

    // ================= MAP LOADING =================
    /**
     * Initialize map loading state
     */
    function initializeMapLoading() {
        if (!elements.mapIframe || !elements.mapLoading) return;

        // Show loading state
        elements.mapLoading.classList.remove(CONFIG.CLASSES.hidden);
    }

    /**
     * Handle map load success
     */
    function handleMapLoad() {
        state.isMapLoaded = true;

        // Hide loading state
        if (elements.mapLoading) {
            setTimeout(() => {
                elements.mapLoading.classList.add(CONFIG.CLASSES.hidden);
            }, 500);
        }

        console.log('Map loaded successfully');
    }

    /**
     * Handle map load error
     */
    function handleMapError() {
        console.error('Map failed to load');

        if (elements.mapLoading) {
            elements.mapLoading.innerHTML = `
                <p style="color: #dc3545; font-weight: 600;">
                    Failed to load map. 
                    <a 
                        href="https://www.google.com/maps/search/?api=1&query=Connaught+Place+New+Delhi"
                        target="_blank"
                        rel="noopener noreferrer"
                        style="color: #ff6347; text-decoration: underline;"
                    >
                        Open in Google Maps
                    </a>
                </p>
            `;
        }
    }

    // ================= ANALYTICS =================
    /**
     * Track external link clicks (hook for analytics)
     */
    function trackExternalLinks() {
        const externalLinks = document.querySelectorAll('a[target="_blank"]');

        externalLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                const url = link.href;
                const label = link.textContent.trim();

                // Hook for analytics (Google Analytics, etc.)
                if (typeof gtag === 'function') {
                    gtag('event', 'click', {
                        'event_category': 'External Link',
                        'event_label': label,
                        'value': url
                    });
                }

                console.log('External link clicked:', { url, label });
            });
        });
    }

    // ================= UTILITY FUNCTIONS =================
    /**
     * Sanitize text for XSS prevention
     * @param {string} text - Text to sanitize
     * @returns {string} - Sanitized text
     */
    function sanitizeText(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ================= INITIALIZATION TRIGGER =================
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

})();










/**
 * Footer Functionality Module
 * Handles scroll-to-top button and newsletter subscription
 */

(function () {
    'use strict';

    // ================= CONFIGURATION =================
    const CONFIG = {
        SELECTORS: {
            scrollTopBtn: '#scrollTopBtn',
            newsletterForm: '#newsletterForm',
            newsletterEmail: '#newsletterEmail',
            newsletterSubmit: '#newsletterSubmit',
            newsletterMessage: '#newsletterMessage',
            currentYear: '#currentYear'
        },
        CLASSES: {
            visible: 'visible',
            loading: 'loading',
            error: 'error',
            success: 'success'
        },
        SCROLL: {
            threshold: 300, // Show button after scrolling 300px
            throttleDelay: 100 // Throttle scroll event to every 100ms
        },
        TIMING: {
            messageDuration: 5000, // Hide message after 5 seconds
            submitDelay: 1500 // Simulate API call delay
        },
        VALIDATION: {
            emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        MESSAGES: {
            invalidEmail: 'Please enter a valid email address',
            subscribeSuccess: '✓ Successfully subscribed! Check your inbox.',
            subscribeError: '✗ Subscription failed. Please try again.',
            networkError: '✗ Network error. Please check your connection.'
        }
    };

    // ================= STATE MANAGEMENT =================
    const state = {
        isScrollButtonVisible: false,
        isSubmitting: false,
        messageTimeout: null
    };

    // ================= DOM ELEMENTS =================
    const elements = {
        scrollTopBtn: null,
        newsletterForm: null,
        newsletterEmail: null,
        newsletterSubmit: null,
        newsletterMessage: null,
        currentYear: null
    };

    // ================= INITIALIZATION =================
    /**
     * Initialize footer functionality
     */
    function initialize() {
        try {
            // Cache DOM elements
            cacheDOMElements();

            // Validate required elements
            if (!validateElements()) {
                console.warn('Footer: Some elements not found');
                return;
            }

            // Set current year
            setCurrentYear();

            // Attach event listeners
            attachEventListeners();

            // Initial scroll button check
            checkScrollPosition();

            console.log('Footer initialized successfully');
        } catch (error) {
            console.error('Footer initialization error:', error);
        }
    }

    /**
     * Cache all DOM elements
     */
    function cacheDOMElements() {
        Object.keys(CONFIG.SELECTORS).forEach(key => {
            elements[key] = document.querySelector(CONFIG.SELECTORS[key]);
        });
    }

    /**
     * Validate that required elements exist
     * @returns {boolean} - True if critical elements exist
     */
    function validateElements() {
        // Only scroll button and year are truly critical
        return !!(elements.currentYear);
    }

    /**
     * Set current year dynamically
     */
    function setCurrentYear() {
        if (elements.currentYear) {
            elements.currentYear.textContent = new Date().getFullYear();
        }
    }

    // ================= EVENT LISTENERS =================
    /**
     * Attach all event listeners
     */
    function attachEventListeners() {
        // Scroll button listeners
        if (elements.scrollTopBtn) {
            window.addEventListener('scroll', throttle(handleScroll, CONFIG.SCROLL.throttleDelay));
            elements.scrollTopBtn.addEventListener('click', scrollToTop);
            elements.scrollTopBtn.addEventListener('keydown', handleScrollButtonKeydown);
        }

        // Newsletter form listener
        if (elements.newsletterForm) {
            elements.newsletterForm.addEventListener('submit', handleNewsletterSubmit);
        }

        // Real-time email validation
        if (elements.newsletterEmail) {
            elements.newsletterEmail.addEventListener('blur', validateEmailField);
            elements.newsletterEmail.addEventListener('input', clearEmailError);
        }
    }

    // ================= SCROLL TO TOP =================
    /**
     * Handle scroll event with throttling
     */
    function handleScroll() {
        checkScrollPosition();
    }

    /**
     * Check scroll position and toggle button visibility
     */
    function checkScrollPosition() {
        if (!elements.scrollTopBtn) return;

        const shouldShow = window.scrollY > CONFIG.SCROLL.threshold;

        if (shouldShow !== state.isScrollButtonVisible) {
            state.isScrollButtonVisible = shouldShow;
            toggleScrollButton(shouldShow);
        }
    }

    /**
     * Toggle scroll button visibility
     * @param {boolean} show - Whether to show the button
     */
    function toggleScrollButton(show) {
        if (show) {
            elements.scrollTopBtn.classList.add(CONFIG.CLASSES.visible);
            elements.scrollTopBtn.setAttribute('tabindex', '0');
        } else {
            elements.scrollTopBtn.classList.remove(CONFIG.CLASSES.visible);
            elements.scrollTopBtn.setAttribute('tabindex', '-1');
        }
    }

    /**
     * Scroll smoothly to top of page
     */
    function scrollToTop() {
        // Check for smooth scroll support
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Fallback for older browsers
            smoothScrollPolyfill();
        }

        // Focus management for accessibility
        setTimeout(() => {
            const firstHeading = document.querySelector('h1');
            if (firstHeading) {
                firstHeading.focus({ preventScroll: true });
            }
        }, 500);
    }

    /**
     * Polyfill for smooth scrolling in older browsers
     */
    function smoothScrollPolyfill() {
        const startPosition = window.scrollY;
        const duration = 600;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function
            const ease = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            window.scrollTo(0, startPosition * (1 - ease));

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    /**
     * Handle keyboard navigation for scroll button
     * @param {KeyboardEvent} event - Keyboard event
     */
    function handleScrollButtonKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            scrollToTop();
        }
    }

    // ================= NEWSLETTER =================
    /**
     * Handle newsletter form submission
     * @param {Event} event - Submit event
     */
    async function handleNewsletterSubmit(event) {
        event.preventDefault();

        // Prevent double submission
        if (state.isSubmitting) return;

        // Clear previous messages
        clearNewsletterMessage();

        // Validate email
        const email = elements.newsletterEmail.value.trim();
        if (!validateEmail(email)) {
            showNewsletterMessage(CONFIG.MESSAGES.invalidEmail, CONFIG.CLASSES.error);
            elements.newsletterEmail.classList.add(CONFIG.CLASSES.error);
            elements.newsletterEmail.focus();
            return;
        }

        // Set submitting state
        setSubmittingState(true);

        try {
            // Simulate API call (replace with actual implementation)
            await simulateAPICall(email);

            // Show success message
            showNewsletterMessage(CONFIG.MESSAGES.subscribeSuccess, CONFIG.CLASSES.success);
            elements.newsletterEmail.classList.add(CONFIG.CLASSES.success);

            // Reset form
            elements.newsletterForm.reset();

            // Auto-hide message after delay
            state.messageTimeout = setTimeout(() => {
                clearNewsletterMessage();
                elements.newsletterEmail.classList.remove(CONFIG.CLASSES.success);
            }, CONFIG.TIMING.messageDuration);

        } catch (error) {
            console.error('Newsletter subscription error:', error);
            showNewsletterMessage(
                error.message || CONFIG.MESSAGES.subscribeError,
                CONFIG.CLASSES.error
            );
        } finally {
            setSubmittingState(false);
        }
    }

    /**
     * Validate email address
     * @param {string} email - Email to validate
     * @returns {boolean} - True if valid
     */
    function validateEmail(email) {
        if (!email) return false;
        
        // Comprehensive email validation
        return CONFIG.VALIDATION.emailPattern.test(email) &&
               email.length >= 5 &&
               email.length <= 254;
    }

    /**
     * Validate email field on blur
     */
    function validateEmailField() {
        const email = elements.newsletterEmail.value.trim();
        
        if (email && !validateEmail(email)) {
            elements.newsletterEmail.classList.add(CONFIG.CLASSES.error);
            showNewsletterMessage(CONFIG.MESSAGES.invalidEmail, CONFIG.CLASSES.error);
        }
    }

    /**
     * Clear email field error on input
     */
    function clearEmailError() {
        elements.newsletterEmail.classList.remove(CONFIG.CLASSES.error);
        clearNewsletterMessage();
    }

    /**
     * Set form submitting state
     * @param {boolean} isSubmitting - Submitting state
     */
    function setSubmittingState(isSubmitting) {
        state.isSubmitting = isSubmitting;

        if (isSubmitting) {
            elements.newsletterSubmit.disabled = true;
            elements.newsletterSubmit.classList.add(CONFIG.CLASSES.loading);
            elements.newsletterEmail.disabled = true;
        } else {
            elements.newsletterSubmit.disabled = false;
            elements.newsletterSubmit.classList.remove(CONFIG.CLASSES.loading);
            elements.newsletterEmail.disabled = false;
        }
    }

    /**
     * Show newsletter message
     * @param {string} message - Message text
     * @param {string} type - Message type (success/error)
     */
    function showNewsletterMessage(message, type) {
        if (!elements.newsletterMessage) return;

        elements.newsletterMessage.textContent = message;
        elements.newsletterMessage.className = `newsletter-message ${type}`;
    }

    /**
     * Clear newsletter message
     */
    function clearNewsletterMessage() {
        if (!elements.newsletterMessage) return;

        elements.newsletterMessage.textContent = '';
        elements.newsletterMessage.className = 'newsletter-message';

        // Clear timeout if exists
        if (state.messageTimeout) {
            clearTimeout(state.messageTimeout);
            state.messageTimeout = null;
        }
    }

    // ================= UTILITY FUNCTIONS =================
    /**
     * Throttle function to limit execution rate
     * @param {Function} func - Function to throttle
     * @param {number} delay - Delay in milliseconds
     * @returns {Function} - Throttled function
     */
    function throttle(func, delay) {
        let lastCall = 0;
        return function (...args) {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                func.apply(this, args);
            }
        };
    }

    /**
     * Simulate API call (replace with actual implementation)
     * @param {string} email - Email address
     * @returns {Promise} - Resolves after delay
     */
    function simulateAPICall(email) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success
                resolve({ success: true, email });
                
                // Uncomment to simulate error:
                // reject(new Error(CONFIG.MESSAGES.networkError));
            }, CONFIG.TIMING.submitDelay);
        });
    }

    // ================= INITIALIZATION TRIGGER =================
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

})();