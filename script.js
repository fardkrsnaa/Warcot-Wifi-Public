// ============================================
// Theme Management
// ============================================
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.init();
    }

    init() {
        // Check for saved theme preference or default to system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (systemPrefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        // Add event listener for theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Add rotation animation to toggle button
        this.themeToggle.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => {
            this.themeToggle.style.transform = '';
        }, 300);
    }

    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }
}

// ============================================
// Main Application
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme manager
    new ThemeManager();
    
    // Load configuration
    loadConfig();
});

async function loadConfig() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) {
            throw new Error('Gagal memuat konfigurasi');
        }
        
        const config = await response.json();
        renderData(config);
    } catch (error) {
        console.error('Error:', error);
        showError('Gagal memuat data konfigurasi. Silakan periksa file config.json.');
    }
}

function renderData(config) {
    // Render WiFi info
    document.getElementById('ssid').textContent = config.wifi.ssid;
    document.getElementById('password').textContent = config.wifi.password;
    
    // Render network status
    const statusElement = document.getElementById('status');
    const status = config.network.status === 'online' ? 'Online' : 'Offline';
    statusElement.textContent = status;
    statusElement.setAttribute('data-status', config.network.status);
    
    // Remove inline styles (handled by CSS now)
    statusElement.style.color = '';
    
    document.getElementById('network-type').textContent = config.network.type;
    document.getElementById('speed').textContent = config.network.speed;
    
    // Render announcement with typewriter effect
    const announcementElement = document.getElementById('announcement');
    typewriterEffect(announcementElement, config.announcement);
    
    // Render rules with staggered animation
    const rulesList = document.getElementById('rules');
    rulesList.innerHTML = '';
    config.rules.forEach((rule, index) => {
        const li = document.createElement('li');
        li.textContent = rule;
        li.style.opacity = '0';
        li.style.animation = `fadeInUp 0.3s ease forwards ${0.1 * index}s`;
        rulesList.appendChild(li);
    });
    
    // Render last updated
    document.getElementById('last-updated').textContent = config.last_updated;
}

// Typewriter effect for announcement
function typewriterEffect(element, text, speed = 30) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

function showError(message) {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = `
        <section class="card fade-in">
            <div class="card-header">
                <div class="card-icon" style="background: linear-gradient(135deg, #ef4444, #f87171);">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                </div>
                <h2>Error</h2>
            </div>
            <div class="card-body">
                <p style="color: var(--status-offline);">${message}</p>
            </div>
        </section>
    `;
}

// ============================================
// Smooth scroll behavior for better UX
// ============================================
document.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.card');
    const scrollPosition = window.scrollY + window.innerHeight;
    
    cards.forEach(card => {
        const cardBottom = card.offsetTop + card.offsetHeight;
        if (scrollPosition > cardBottom - 50) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}, { passive: true });

// ============================================
// Add hover effect for info items
// ============================================
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.info-item')) {
        const item = e.target.closest('.info-item');
        item.style.transform = 'translateX(4px)';
        item.style.transition = 'transform 0.2s ease';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.info-item')) {
        const item = e.target.closest('.info-item');
        item.style.transform = 'translateX(0)';
    }
});