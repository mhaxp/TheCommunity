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
    peers: new Map(),
    peerConnection: null,

    /**
     * Initialize the application
     */
    init() {
        console.log('TheCommunity initializing...');

        // Check WebRTC support
        if (!this.checkWebRTCSupport()) {
            this.updateStatus('WebRTC not supported in this browser', 'error');
            this.updateWebRTCSupport(false);
            return;
        }

        this.initialized = true;
        this.updateStatus('Ready', 'ready');
        this.updateWebRTCSupport(true);
        this.initializeWebRTCArea();
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
    },

    /**
     * Initialize WebRTC Area UI and event listeners
     */
    initializeWebRTCArea() {
        // Get UI elements
        const generateBtn = document.getElementById('generate-room-btn');
        const createBtn = document.getElementById('create-room-btn');
        const joinBtn = document.getElementById('join-room-btn');
        const disconnectBtn = document.getElementById('disconnect-btn');
        const roomIdInput = document.getElementById('room-id');

        // Enable buttons
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateRoomId());
        }

        if (roomIdInput) {
            roomIdInput.addEventListener('input', (e) => {
                const hasValue = e.target.value.trim().length > 0;
                if (createBtn) createBtn.disabled = !hasValue;
                if (joinBtn) joinBtn.disabled = !hasValue;
            });
        }

        if (createBtn) {
            createBtn.addEventListener('click', () => this.createRoom());
        }

        if (joinBtn) {
            joinBtn.addEventListener('click', () => this.joinRoom());
        }

        if (disconnectBtn) {
            disconnectBtn.addEventListener('click', () => this.disconnect());
        }

        // Update technical details
        this.updateTechnicalDetails();
    },

    /**
     * Generate a random room ID
     */
    generateRoomId() {
        const roomId = Math.random().toString(36).substring(2, 10).toUpperCase();
        const roomIdInput = document.getElementById('room-id');
        if (roomIdInput) {
            roomIdInput.value = roomId;
            roomIdInput.dispatchEvent(new Event('input'));
        }
        console.log('Generated room ID:', roomId);
    },

    /**
     * Create a new room
     */
    createRoom() {
        const roomIdInput = document.getElementById('room-id');
        const roomId = roomIdInput?.value.trim();

        if (!roomId) {
            alert('Please enter or generate a room ID');
            return;
        }

        console.log('Creating room:', roomId);
        this.updateConnectionStatus('connecting', 'Creating room...');

        // Placeholder for actual WebRTC connection logic
        // This will be implemented in future iterations
        setTimeout(() => {
            this.updateConnectionStatus('connected', 'Room created (demo mode)');
            this.updateTechnicalDetails('new', 'stable', 'new');
            document.getElementById('disconnect-btn').disabled = false;
            document.getElementById('create-room-btn').disabled = true;
            document.getElementById('join-room-btn').disabled = true;
        }, 1000);
    },

    /**
     * Join an existing room
     */
    joinRoom() {
        const roomIdInput = document.getElementById('room-id');
        const roomId = roomIdInput?.value.trim();

        if (!roomId) {
            alert('Please enter a room ID');
            return;
        }

        console.log('Joining room:', roomId);
        this.updateConnectionStatus('connecting', 'Joining room...');

        // Placeholder for actual WebRTC connection logic
        // This will be implemented in future iterations
        setTimeout(() => {
            this.updateConnectionStatus('connected', 'Joined room (demo mode)');
            this.updateTechnicalDetails('new', 'stable', 'new');
            document.getElementById('disconnect-btn').disabled = false;
            document.getElementById('create-room-btn').disabled = true;
            document.getElementById('join-room-btn').disabled = true;
        }, 1000);
    },

    /**
     * Disconnect from current session
     */
    disconnect() {
        console.log('Disconnecting...');
        this.updateConnectionStatus('disconnected', 'Not Connected');
        this.updateTechnicalDetails('closed', '-', '-');
        this.peers.clear();
        this.updatePeersList();

        document.getElementById('disconnect-btn').disabled = true;
        document.getElementById('create-room-btn').disabled = false;
        document.getElementById('join-room-btn').disabled = false;
    },

    /**
     * Update connection status in UI
     * @param {string} state - Connection state ('connected', 'connecting', 'disconnected', 'error')
     * @param {string} message - Status message
     */
    updateConnectionStatus(state, message) {
        const statusElement = document.getElementById('connection-status');
        const dotElement = document.getElementById('connection-dot');

        if (statusElement) {
            statusElement.textContent = message;
        }

        if (dotElement) {
            dotElement.className = 'status-dot';
            if (state === 'connected') {
                dotElement.classList.add('connected');
            } else if (state === 'connecting') {
                dotElement.classList.add('connecting');
            } else if (state === 'error') {
                dotElement.classList.add('error');
            }
        }
    },

    /**
     * Update WebRTC support status
     * @param {boolean} supported - Whether WebRTC is supported
     */
    updateWebRTCSupport(supported) {
        const supportElement = document.getElementById('webrtc-support');
        if (supportElement) {
            supportElement.textContent = supported ? 'Yes' : 'No';
            supportElement.style.color = supported ? 'var(--success-color)' : 'var(--accent-color)';
        }
    },

    /**
     * Update technical details in UI
     * @param {string} connectionState - RTCPeerConnection state
     * @param {string} signalingState - Signaling state
     * @param {string} iceState - ICE connection state
     */
    updateTechnicalDetails(connectionState = 'new', signalingState = '-', iceState = '-') {
        const connStateElement = document.getElementById('connection-state');
        const sigStateElement = document.getElementById('signaling-state');
        const iceStateElement = document.getElementById('ice-state');
        const dataChannelsElement = document.getElementById('data-channels');

        if (connStateElement) connStateElement.textContent = connectionState;
        if (sigStateElement) sigStateElement.textContent = signalingState;
        if (iceStateElement) iceStateElement.textContent = iceState;
        if (dataChannelsElement) dataChannelsElement.textContent = this.peers.size;
    },

    /**
     * Update the peers list in UI
     */
    updatePeersList() {
        const peersContainer = document.getElementById('peers-container');
        const peerCountElement = document.getElementById('peer-count');

        if (!peersContainer) return;

        if (peerCountElement) {
            peerCountElement.textContent = this.peers.size;
        }

        if (this.peers.size === 0) {
            peersContainer.innerHTML = '<p class="no-peers">No peers connected</p>';
        } else {
            peersContainer.innerHTML = '';
            this.peers.forEach((peerData, peerId) => {
                const peerElement = document.createElement('div');
                peerElement.className = 'peer-item';

                const peerInfo = document.createElement('div');
                peerInfo.className = 'peer-info';

                const peerIdSpan = document.createElement('span');
                peerIdSpan.className = 'peer-id';
                peerIdSpan.textContent = `Peer: ${peerId}`;

                const peerStatusSpan = document.createElement('span');
                peerStatusSpan.className = 'peer-status';
                peerStatusSpan.textContent = peerData.status;

                peerInfo.appendChild(peerIdSpan);
                peerInfo.appendChild(peerStatusSpan);
                peerElement.appendChild(peerInfo);
                peersContainer.appendChild(peerElement);
            });
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
