document.addEventListener('DOMContentLoaded', function() {
    // Icons for bouncing elements
    const icons = ['📚', '🎓', '✏️', '📝', '📖', '🎯', '💡', '📊'];
    const messages = [
        'Loading your content...',
        'Preparing amazing experience...',
        'Almost there...',
        'Getting everything ready...',
        'Just a moment...'
    ];

    // Create particles for background
    function createAnimatedElements() {
        const container = document.createElement('div');
        container.className = 'animated-elements';
        
        // Create floating shapes
        const shape1 = document.createElement('div');
        shape1.className = 'floating-shape shape-1';
        container.appendChild(shape1);
        
        const shape2 = document.createElement('div');
        shape2.className = 'floating-shape shape-2';
        container.appendChild(shape2);
        
        const shape3 = document.createElement('div');
        shape3.className = 'floating-shape shape-3';
        container.appendChild(shape3);
        
        // Create moving lines
        const line1 = document.createElement('div');
        line1.className = 'moving-line line-1';
        container.appendChild(line1);
        
        const line2 = document.createElement('div');
        line2.className = 'moving-line line-2';
        container.appendChild(line2);
        
        // Create bouncing icons
        for (let i = 0; i < 5; i++) {
            const icon = document.createElement('div');
            icon.className = `bouncing-icon icon-${i+1}`;
            icon.textContent = icons[Math.floor(Math.random() * icons.length)];
            icon.style.left = `${10 + (i * 20)}%`;
            icon.style.top = `${20 + (i * 15)}%`;
            icon.style.animationDelay = `${i * 0.5}s`;
            container.appendChild(icon);
        }
        
        // Create floating text elements
        for (let i = 0; i < 3; i++) {
            const text = document.createElement('div');
            text.className = 'floating-text';
            text.textContent = messages[Math.floor(Math.random() * messages.length)];
            text.style.left = `${15 + (i * 25)}%`;
            text.style.top = `${60 + (i * 10)}%`;
            text.style.animationDelay = `${i * 2}s`;
            container.appendChild(text);
        }
        
        // Create particles
        const particles = document.createElement('div');
        particles.className = 'particles';
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size between 3 and 12px
            const size = Math.random() * 9 + 3;
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random animation duration between 10s and 30s
            const duration = Math.random() * 20 + 10;
            
            // Random delay
            const delay = Math.random() * -30;
            
            // Random color
            const colors = [
                'var(--primary-color)',
                'var(--secondary-color)',
                'var(--accent-color)',
                '#4ecdc4',
                '#45b7d1',
                '#ff9a8b'
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Apply styles
            Object.assign(particle.style, {
                width: `${size}px`,
                height: `${size}px`,
                left: `${posX}%`,
                top: `${posY}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                opacity: Math.random() * 0.6 + 0.2,
                background: color,
                transform: `rotate(${Math.random() * 360}deg)`
            });
            
            // Add hover effect
            particle.addEventListener('mouseover', () => {
                particle.style.transform = `scale(1.5) rotate(${Math.random() * 360}deg)`;
                particle.style.opacity = '0.9';
            });
            
            particle.addEventListener('mouseout', () => {
                particle.style.transform = `scale(1) rotate(${Math.random() * 360}deg)`;
                particle.style.opacity = Math.random() * 0.6 + 0.2;
            });
            
            particles.appendChild(particle);
        }
        
        container.appendChild(particles);
        return container;
    }

    // Show loader immediately
    const loader = document.createElement('div');
    loader.className = 'loader-container';
    loader.id = 'loader';
    
    // Create main loader content
    const loaderContent = document.createElement('div');
    loaderContent.className = 'loader-content';
    
    // Add animated elements
    loader.appendChild(createAnimatedElements());
    
    // Add truck animation
    const truckWrapper = document.createElement('div');
    truckWrapper.className = 'loader';
    truckWrapper.innerHTML = `
        <div class="truckWrapper">
            <div class="truckBody">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 198 93"
                    class="trucksvg"
                >
                    <path
                        stroke-width="3"
                        stroke="#282828"
                        fill="#F83D3D"
                        d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
                    ></path>
                    <path
                        stroke-width="3"
                        stroke="#282828"
                        fill="#7D7C7C"
                        d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
                    ></path>
                    <path
                        stroke-width="2"
                        stroke="#282828"
                        fill="#282828"
                        d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
                    ></path>
                    <rect
                        stroke-width="2"
                        stroke="#282828"
                        fill="#FFFCAB"
                        rx="1"
                        height="7"
                        width="5"
                        y="63"
                        x="187"
                    ></rect>
                    <rect
                        stroke-width="2"
                        stroke="#282828"
                        fill="#282828"
                        rx="1"
                        height="11"
                        width="4"
                        y="81"
                        x="193"
                    ></rect>
                    <rect
                        stroke-width="3"
                        stroke="#282828"
                        fill="#DFDFDF"
                        rx="2.5"
                        height="90"
                        width="121"
                        y="1.5"
                        x="6.5"
                    ></rect>
                    <rect
                        stroke-width="2"
                        stroke="#282828"
                        fill="#DFDFDF"
                        rx="2"
                        height="4"
                        width="6"
                        y="84"
                        x="1"
                    ></rect>
                </svg>
            </div>
            <div class="truckTires">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 30 30"
                    class="tiresvg"
                >
                    <circle
                        stroke-width="3"
                        stroke="#282828"
                        fill="#282828"
                        r="13.5"
                        cy="15"
                        cx="15"
                    ></circle>
                    <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 30 30"
                    class="tiresvg"
                >
                    <circle
                        stroke-width="3"
                        stroke="#282828"
                        fill="#282828"
                        r="13.5"
                        cy="15"
                        cx="15"
                    ></circle>
                    <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
                </svg>
            </div>
            <div class="road"></div>
            <svg
                xml:space="preserve"
                viewBox="0 0 453.459 453.459"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
                id="Capa_1"
                version="1.1"
                fill="#000000"
                class="lampPost"
            >
                <path
                    d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"
                ></path>
            </svg>
        </div>
    `;
    
    // Create welcome text
    const welcomeText = document.createElement('h1');
    welcomeText.className = 'welcome-text';
    welcomeText.textContent = 'Welcome';
    
    // Create loading message
    const welcomeSubtext = document.createElement('p');
    welcomeSubtext.className = 'welcome-subtext';
    welcomeSubtext.textContent = messages[Math.floor(Math.random() * messages.length)];
    
    // Create loading dots
    const loaderDots = document.createElement('div');
    loaderDots.className = 'loader-dots';
    loaderDots.innerHTML = `
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    `;
    
    // Assemble the loader
    loaderContent.appendChild(truckWrapper);
    loaderContent.appendChild(welcomeText);
    loaderContent.appendChild(welcomeSubtext);
    loaderContent.appendChild(loaderDots);
    
    loader.appendChild(loaderContent);
    document.body.prepend(loader);

    // Set minimum display time to 3 seconds (3000ms)
    const minDisplayTime = 3000;
    const loadStartTime = Date.now();
    
    function hideLoader() {
        const loader = document.getElementById('loader');
        if (!loader || loader.classList.contains('hidden')) return;
        
        const elapsedTime = Date.now() - loadStartTime;
        const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
        
        setTimeout(() => {
            loader.classList.add('hidden');
            // Remove loader from DOM after fade out
            setTimeout(() => {
                if (loader && loader.parentNode) {
                    loader.remove();
                }
            }, 800); // Slightly longer fade out for smoother transition
        }, remainingTime);
    }

    // Hide loader when everything is loaded, but respect minimum display time
    window.addEventListener('load', function() {
        hideLoader();
    });

    // Fallback in case the load event doesn't fire
    setTimeout(function() {
        hideLoader();
    }, 8000); // 8 seconds maximum loading time
});
