document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const text = document.getElementById('text');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d', { alpha: true });

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Configuration options
    const config = {
        particleDensity: 3, // Lower = more particles
        particleSizeMultiplier: 1/20, // Adjust particle size relative to font
        gravity: 0.15,
        friction: 0.95,
        bounce: 0.6,
        returnSpeed: 0.05,
        colorVariation: 15, // Random color variation
        initialCycleDelay: 2000, // Initial delay before animation starts
        fallingDuration: 5000, // How long particles fall
        returnDuration: 800, // How long particles return
        restDuration: 2000, // Rest time between cycles
        canInteract: true, // Allow interaction with the mouse
        interactiveForce: 5, // Force applied by mouse interaction
        interactiveRadius: 100 // Radius of mouse interaction
    };

    // Mouse position tracking
    let mouse = {
        x: undefined,
        y: undefined,
        isPressed: false
    };

    // Track mouse movement
    canvas.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    // Track mouse press
    canvas.addEventListener('mousedown', () => {
        mouse.isPressed = true;
    });

    canvas.addEventListener('mouseup', () => {
        mouse.isPressed = false;
    });

    // Touch support
    canvas.addEventListener('touchmove', (event) => {
        event.preventDefault();
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
        mouse.isPressed = true;
    });

    canvas.addEventListener('touchend', () => {
        mouse.isPressed = false;
    });

    // Resize canvas on window resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Recreate particles on resize if they exist
            if (particles.length > 0) {
                particles = createParticles();
            }
        }, 250);
    });

    // Particle class
    class Particle {
        constructor(x, y, color, size) {
            this.x = x;
            this.y = y;
            this.originalX = x;
            this.originalY = y;
            this.baseColor = color;
            this.color = this.addColorVariation(color);
            this.size = size;
            this.baseSize = size;
            this.velocity = {
                x: (Math.random() - 0.5) * 2,
                y: Math.random() * -2
            };
            this.gravity = config.gravity * (0.8 + Math.random() * 0.4); // Slight variation in gravity
            this.friction = config.friction;
            this.active = false;
            this.activeDelay = Math.random() * 500; // Random delay for each particle
            this.returning = false;
            this.returnSpeed = config.returnSpeed * (0.8 + Math.random() * 0.4); // Variation in return speed
            this.opacity = 1;
            this.fadeSpeed = 0.02;
        }

        // Add slight color variation to particles
        addColorVariation(color) {
            const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (rgbMatch) {
                const r = Math.min(255, Math.max(0, parseInt(rgbMatch[1]) + (Math.random() - 0.5) * config.colorVariation));
                const g = Math.min(255, Math.max(0, parseInt(rgbMatch[2]) + (Math.random() - 0.5) * config.colorVariation));
                const b = Math.min(255, Math.max(0, parseInt(rgbMatch[3]) + (Math.random() - 0.5) * config.colorVariation));
                return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
            }
            return color;
        }

        update(timestamp, isReturning) {
            // Set returning state
            this.returning = isReturning;
            
            // Handle mouse interaction
            if (config.canInteract && mouse.x && mouse.y) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < config.interactiveRadius) {
                    const force = config.interactiveForce * (1 - distance / config.interactiveRadius);
                    const angle = Math.atan2(dy, dx);
                    
                    if (mouse.isPressed) {
                        // Push particles away when mouse is pressed
                        this.velocity.x += Math.cos(angle) * force;
                        this.velocity.y += Math.sin(angle) * force;
                    } else {
                        // Gentle attraction when mouse is just hovering
                        this.velocity.x += Math.cos(angle) * force * -0.2;
                        this.velocity.y += Math.sin(angle) * force * -0.2;
                    }
                }
            }
            
            if (this.returning) {
                // Return to original position
                const dx = this.originalX - this.x;
                const dy = this.originalY - this.y;
                this.x += dx * this.returnSpeed;
                this.y += dy * this.returnSpeed;
                
                // Reset velocity when close to original position
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 1) {
                    this.x = this.originalX;
                    this.y = this.originalY;
                    this.velocity.x = 0;
                    this.velocity.y = 0;
                    this.size = this.baseSize; // Reset size
                }
            } else {
                // Only start moving after delay
                if (!this.active && timestamp > this.activeDelay) {
                    this.active = true;
                }

                if (this.active) {
                    // Apply gravity
                    this.velocity.y += this.gravity;
                    
                    // Apply friction
                    this.velocity.x *= this.friction;
                    
                    // Update position
                    this.x += this.velocity.x;
                    this.y += this.velocity.y;
                    
                    // Bounce off bottom
                    if (this.y + this.size > canvas.height) {
                        this.y = canvas.height - this.size;
                        this.velocity.y *= -config.bounce;
                        
                        // Add some random horizontal movement on bounce
                        this.velocity.x += (Math.random() - 0.5) * 1.5;
                        
                        // Reduce size slightly on impact
                        this.size *= 0.98;
                        if (this.size < 0.5) this.size = 0.5;
                    }
                    
                    // Bounce off sides
                    if (this.x + this.size > canvas.width) {
                        this.x = canvas.width - this.size;
                        this.velocity.x *= -config.bounce;
                    } else if (this.x - this.size < 0) {
                        this.x = this.size;
                        this.velocity.x *= -config.bounce;
                    }
                }
            }
        }

        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    // Create particles from text
    function createParticles() {
        const particles = [];
        const textRect = text.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(text);
        const fontSize = parseInt(computedStyle.fontSize);
        const particleSize = fontSize * config.particleSizeMultiplier;
        
        // Create a temporary canvas to get pixel data from text
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        
        // Set canvas dimensions to match text element
        tempCanvas.width = textRect.width;
        tempCanvas.height = textRect.height;
        
        // Get all text styling properties
        const fontWeight = computedStyle.fontWeight;
        const fontFamily = computedStyle.fontFamily;
        const textAlign = computedStyle.textAlign;
        const textColor = computedStyle.color;
        
        // Apply exact text styling to canvas context
        tempCtx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
        tempCtx.fillStyle = textColor;
        
        // Match text alignment with the DOM element
        tempCtx.textAlign = 'center';
        tempCtx.textBaseline = 'middle';
        
        // Measure text to center it properly
        const textMetrics = tempCtx.measureText(text.textContent);
        const textWidth = textMetrics.width;
        
        // Clear the canvas with a transparent background
        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        
        // Draw text centered on the canvas
        tempCtx.fillText(
            text.textContent, 
            tempCanvas.width / 2, 
            tempCanvas.height / 2
        );
        
        // Get pixel data
        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const data = imageData.data;
        
        // Calculate offset to center particles on the original text position
        const offsetX = textRect.left;
        const offsetY = textRect.top;
        
        // Create particles for non-transparent pixels
        for (let y = 0; y < tempCanvas.height; y += config.particleDensity) {
            for (let x = 0; x < tempCanvas.width; x += config.particleDensity) {
                const index = (y * tempCanvas.width + x) * 4;
                const alpha = data[index + 3];
                
                if (alpha > 128) { // Only use pixels with sufficient opacity
                    const r = data[index];
                    const g = data[index + 1];
                    const b = data[index + 2];
                    const color = `rgb(${r}, ${g}, ${b})`;
                    
                    particles.push(new Particle(
                        x + offsetX,
                        y + offsetY,
                        color,
                        particleSize
                    ));
                }
            }
        }
        
        return particles;
    }

    // Animation variables
    let particles = [];
    let animationStartTime;
    let animationId;
    let isReturning = false;
    let cycleCount = 0;
    let isAnimating = false;

    // Start the animation cycle
    function startAnimationCycle() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Reset variables
        isReturning = false;
        
        // Create particles
        if (particles.length === 0) {
            particles = createParticles();
        }
        
        // Hide original text
        text.classList.add('hidden');
        
        // Start animation
        animationStartTime = performance.now();
        if (!animationId) {
            animate(animationStartTime);
        }
        
        // Schedule return after falling duration
        setTimeout(() => {
            isReturning = true;
            
            // Show text again when particles are returning
            setTimeout(() => {
                text.classList.remove('hidden');
                
                // Reset for next cycle after a delay
                setTimeout(() => {
                    cycleCount++;
                    isAnimating = false;
                    startAnimationCycle();
                }, config.restDuration);
            }, config.returnDuration);
        }, config.fallingDuration);
    }

    // FPS counter
    let fps = 0;
    let lastFrameTime = 0;
    let frameCount = 0;
    
    function updateFPS(timestamp) {
        if (!lastFrameTime) {
            lastFrameTime = timestamp;
            return;
        }
        
        frameCount++;
        
        // Update FPS every second
        if (timestamp - lastFrameTime >= 1000) {
            fps = frameCount;
            frameCount = 0;
            lastFrameTime = timestamp;
            
            // Adjust particle density based on performance
            if (fps < 30 && config.particleDensity < 8) {
                config.particleDensity++;
                // Only recreate particles if we're not in the middle of an animation
                if (!isAnimating) {
                    particles = createParticles();
                }
            }
        }
    }

    // Animation loop with timestamp-based animation
    function animate(timestamp) {
        animationId = requestAnimationFrame(animate);
        
        // Update FPS counter
        updateFPS(timestamp);
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update(timestamp - animationStartTime, isReturning);
            particle.draw();
        });
    }

    // Add keyboard control to restart animation
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            // Cancel current animation
            isAnimating = false;
            isReturning = false;
            
            // Clear particles to force recreation
            particles = [];
            
            // Start new cycle
            startAnimationCycle();
        }
    });

    // Start animation after initial delay
    setTimeout(() => {
        startAnimationCycle();
    }, config.initialCycleDelay);
});