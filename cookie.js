// Cookie Consent Management
class CookieConsent {
    constructor() {
        this.cookieName = 'cookieConsent';
        this.cookieExpiry = 365; // days
        this.init();
    }

    init() {
        // Show banner if no consent given
        if (!this.hasConsent()) {
            this.showBanner();
        }
        
        // Bind event listeners
        this.bindEvents();
    }

    bindEvents() {
        // Accept All button
        document.getElementById('accept-all-cookies')?.addEventListener('click', () => {
            this.acceptAllCookies();
        });

        // Decline button
        document.getElementById('decline-cookies')?.addEventListener('click', () => {
            this.declineCookies();
        });

        // Manage preferences button
        document.getElementById('manage-cookies')?.addEventListener('click', () => {
            this.showModal();
        });

        // Modal close button
        document.getElementById('close-modal')?.addEventListener('click', () => {
            this.hideModal();
        });

        // Save preferences button
        document.getElementById('save-preferences')?.addEventListener('click', () => {
            this.savePreferences();
        });

        // Accept all from modal
        document.getElementById('accept-all-modal')?.addEventListener('click', () => {
            this.acceptAllFromModal();
        });

        // Close modal when clicking outside
        document.getElementById('cookie-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'cookie-modal') {
                this.hideModal();
            }
        });
    }

    showBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            // Show banner with animation
            setTimeout(() => {
                banner.classList.add('show');
            }, 1000); // Delay showing banner by 1 second
        }
    }

    hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.remove('show');
        }
    }

    showModal() {
        const modal = document.getElementById('cookie-modal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    hideModal() {
        const modal = document.getElementById('cookie-modal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    }

    acceptAllCookies() {
        const consent = {
            essential: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().getTime()
        };
        
        this.setCookie(this.cookieName, JSON.stringify(consent), this.cookieExpiry);
        this.hideBanner();
        this.hideModal();
        
        // Enable all cookies/tracking
        this.enableAllTracking();
        
        // Show success message (optional)
        this.showNotification('All cookies accepted. Thank you!', 'success');
    }

    declineCookies() {
        const consent = {
            essential: true,
            analytics: false,
            marketing: false,
            timestamp: new Date().getTime()
        };
        
        this.setCookie(this.cookieName, JSON.stringify(consent), this.cookieExpiry);
        this.hideBanner();
        
        // Disable non-essential tracking
        this.disableNonEssentialTracking();
        
        // Show info message (optional)
        this.showNotification('Only essential cookies will be used.', 'info');
    }

    savePreferences() {
        const analyticsChecked = document.getElementById('analytics-cookies')?.checked || false;
        const marketingChecked = document.getElementById('marketing-cookies')?.checked || false;
        
        const consent = {
            essential: true,
            analytics: analyticsChecked,
            marketing: marketingChecked,
            timestamp: new Date().getTime()
        };
        
        this.setCookie(this.cookieName, JSON.stringify(consent), this.cookieExpiry);
        this.hideBanner();
        this.hideModal();
        
        // Apply preferences
        this.applyPreferences(consent);
        
        // Show success message
        this.showNotification('Your preferences have been saved.', 'success');
    }

    acceptAllFromModal() {
        // Check all checkboxes in modal
        document.getElementById('analytics-cookies').checked = true;
        document.getElementById('marketing-cookies').checked = true;
        
        // Then save as accept all
        this.acceptAllCookies();
    }

    hasConsent() {
        const consent = this.getCookie(this.cookieName);
        return consent !== null;
    }

    getConsent() {
        const consent = this.getCookie(this.cookieName);
        return consent ? JSON.parse(consent) : null;
    }

    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    enableAllTracking() {
        // Add your tracking scripts here
        console.log('All tracking enabled');
        
        // Example: Enable Google Analytics
        // gtag('consent', 'update', {
        //     'analytics_storage': 'granted',
        //     'ad_storage': 'granted'
        // });
        
        // Example: Enable Facebook Pixel
        // fbq('consent', 'grant');
    }

    disableNonEssentialTracking() {
        console.log('Non-essential tracking disabled');
        
        // Example: Disable Google Analytics
        // gtag('consent', 'update', {
        //     'analytics_storage': 'denied',
        //     'ad_storage': 'denied'
        // });
        
        // Example: Disable Facebook Pixel
        // fbq('consent', 'revoke');
    }

    applyPreferences(consent) {
        console.log('Applying preferences:', consent);
        
        if (consent.analytics) {
            // Enable analytics
            console.log('Analytics enabled');
        } else {
            // Disable analytics
            console.log('Analytics disabled');
        }
        
        if (consent.marketing) {
            // Enable marketing cookies
            console.log('Marketing cookies enabled');
        } else {
            // Disable marketing cookies
            console.log('Marketing cookies disabled');
        }
    }

    showNotification(message, type = 'info') {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.className = `cookie-notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#22c55e' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10002;
            display: flex;
            align-items: center;
            gap: 1rem;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }

    // Method to revoke consent (for your privacy policy page)
    revokeConsent() {
        document.cookie = `${this.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        this.showBanner();
        this.disableNonEssentialTracking();
        this.showNotification('Cookie consent has been revoked.', 'info');
    }
}

// Initialize cookie consent when page loads
document.addEventListener('DOMContentLoaded', () => {
    new CookieConsent();
});

// Add CSS animation for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);