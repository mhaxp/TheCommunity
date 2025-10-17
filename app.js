/**
 * TheCommunity - WebRTC Chat Application
 *
 * This application uses WebRTC for peer-to-peer communication.
 * No backend servers - all communication is direct between peers.
 */

'use strict';

// Application State
const App = {
    initialized: false,

    /**
     * Initialize the application
     */
    init() {
        console.log('TheCommunity initializing...');

        // Check WebRTC support
        if (!this.checkWebRTCSupport()) {
            this.updateStatus('WebRTC not supported in this browser', 'error');
            return;
        }

        this.initialized = true;
        this.updateStatus('Ready', 'ready');
        console.log('TheCommunity initialized successfully');
    },

    /**
     * Check if browser supports WebRTC
     * @returns {boolean}
     */
    checkWebRTCSupport() {
        return !!(
            window.RTCPeerConnection &&
            navigator.mediaDevices &&
            navigator.mediaDevices.getUserMedia
        );
    },

    /**
     * Update status message
     * @param {string} message - Status message to display
     * @param {string} type - Status type ('ready', 'error', or default)
     */
    updateStatus(message, type = '') {
        const statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.className = type;
        }
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
