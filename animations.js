// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            // Toggle menu visibility
            mobileMenu.classList.toggle('hidden');
            
            // If menu is visible, animate items
            if (!mobileMenu.classList.contains('hidden')) {
                const menuItems = mobileMenu.querySelectorAll('a');
                gsap.from(menuItems, {
                    y: 20,
                    opacity: 0,
                    duration: 0.3,
                    stagger: 0.1,
                    ease: 'power2.out'
                });
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuButton.contains(e.target) && 
                !mobileMenu.contains(e.target) && 
                !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });

        // Close menu when clicking menu items
        const menuItems = mobileMenu.querySelectorAll('a');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        disable: 'mobile'
    });

    // Initialize Experience Tabs
    const tabButtons = document.querySelectorAll('[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(tabId) {
        // Hide all contents first
        tabContents.forEach(content => {
            content.classList.add('hidden');
        });

        // Reset all buttons
        tabButtons.forEach(button => {
            button.classList.remove('text-primary', 'border-primary', 'bg-light-navy/10');
            button.classList.add('text-slate', 'border-transparent');
        });

        // Show selected content
        const selectedContent = document.getElementById(tabId);
        if (selectedContent) {
            selectedContent.classList.remove('hidden');
        }

        // Update selected button
        const selectedButton = document.querySelector(`[data-tab="${tabId}"]`);
        if (selectedButton) {
            selectedButton.classList.remove('text-slate', 'border-transparent');
            selectedButton.classList.add('text-primary', 'border-primary', 'bg-light-navy/10');
        }

        // Animate content
        gsap.from(selectedContent, {
            y: 20,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    }

    // Add click handlers to all tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Show first tab by default
    const firstTab = tabButtons[0];
    if (firstTab) {
        const firstTabId = firstTab.getAttribute('data-tab');
        switchTab(firstTabId);
    }

    // Initialize Particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#0EA5E9' },
            shape: { type: 'circle' },
            opacity: {
                value: 0.5,
                random: false,
                animation: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
                value: 3,
                random: true,
                animation: { enable: true, speed: 2, size_min: 0.1, sync: false }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#0EA5E9',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            }
        },
        retina_detect: true
    });

    // Initialize Three.js Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.canvas-container').appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x0EA5E9,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    camera.position.z = 30;

    function animate() {
        requestAnimationFrame(animate);
        torusKnot.rotation.x += 0.01;
        torusKnot.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Contact Form Handling
    document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const form = e.target;
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        try {
            // Submit the form
            await form.submit();
            
            // Show success message
            submitButton.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            submitButton.classList.remove('bg-primary/10');
            submitButton.classList.add('bg-green-500/10', 'border-green-500', 'text-green-500');
            
            // Reset form
            form.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.innerHTML = originalButtonText;
                submitButton.classList.remove('bg-green-500/10', 'border-green-500', 'text-green-500');
                submitButton.classList.add('bg-primary/10');
                submitButton.disabled = false;
            }, 3000);
            
        } catch (error) {
            // Show error message
            submitButton.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send';
            submitButton.classList.remove('bg-primary/10');
            submitButton.classList.add('bg-red-500/10', 'border-red-500', 'text-red-500');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.innerHTML = originalButtonText;
                submitButton.classList.remove('bg-red-500/10', 'border-red-500', 'text-red-500');
                submitButton.classList.add('bg-primary/10');
                submitButton.disabled = false;
            }, 3000);
        }
    });
});

// Loading Animation (outside DOMContentLoaded because we want this to run immediately)
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    gsap.to(loader, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
            loader.style.display = 'none';
            // Animate hero section elements
            gsap.from('.hero-content > *', {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power4.out'
            });
        }
    });
});