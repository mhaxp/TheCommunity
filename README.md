# TheCommunity

A fully decentralized, peer-to-peer chat application powered by WebRTC. No servers, no tracking, just direct communication between peers.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://themorpheus407.github.io/TheCommunity/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Overview

TheCommunity is a community-driven project where the direction and features are entirely steered by community issues and contributions. What started as a chat application will evolve based on what the community wants to build.

### Key Features

- **100% Peer-to-Peer**: All communication runs over WebRTC - no backend servers, not even a broker
- **Privacy-First**: No data collection, no tracking, no central authority
- **Open Source**: Community-driven development
- **Live Deployment**: Automatically deployed via GitHub Actions

## Live Demo

Visit the live application: [https://mhaxp.github.io/TheCommunity/](https://mhaxp.github.io/TheCommunity/)

## Architecture

### WebRTC-Only Communication

This project uses a unique architecture constraint: **ALL** backend communication must run over WebRTC. There is no traditional backend server, and not even a signaling broker. This means:

- Direct peer-to-peer connections using WebRTC
- No central server for message relay
- No backend API endpoints
- Complete decentralization

### Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: Pure CSS with CSS custom properties
- **Communication**: WebRTC API
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

### Project Structure

```
TheCommunity/
├── index.html          # Main HTML file
├── app.js              # Application logic and WebRTC handling
├── styles.css          # Styling and theming
├── CLAUDE.md           # AI assistant development guidelines
├── AGENTS.md           # Agent configuration
├── REQUIREMENTS.md     # Project requirements reference
└── .github/
    └── workflows/      # GitHub Actions for deployment and automation
```

## Getting Started

### Prerequisites

- A modern web browser with WebRTC support (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/mhaxp/TheCommunity.git
   cd TheCommunity
   ```

2. **Serve the files**

   Since this is a static site, you can use any local web server. Here are a few options:

   **Using Python:**
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Using Node.js (http-server):**
   ```bash
   npx http-server
   ```

   **Using PHP:**
   ```bash
   php -S localhost:8000
   ```

3. **Open in browser**

   Navigate to `http://localhost:8000` in your web browser.

### Browser Compatibility

TheCommunity requires WebRTC support. The application checks for:
- `RTCPeerConnection`
- `navigator.mediaDevices`
- `navigator.mediaDevices.getUserMedia`

Supported browsers:
- Chrome/Edge 56+
- Firefox 44+
- Safari 11+
- Opera 43+

## Current Features

### Implemented

- ✅ WebRTC support detection
- ✅ Clean, responsive UI
- ✅ Basic application structure
- ✅ Status monitoring

### In Development

The feature roadmap is driven by community issues. Check the [Issues](https://github.com/mhaxp/TheCommunity/issues) page to see what's being worked on or to suggest new features.

## Contributing

TheCommunity is a community-driven project. We welcome contributions!

### How to Contribute

1. **Check existing issues** or create a new one to discuss your idea
2. **Fork the repository**
3. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
4. **Make your changes** following the guidelines in [CLAUDE.md](CLAUDE.md)
5. **Ensure code quality**:
   - Write clean, maintainable code
   - Follow the existing code style
   - Test your changes in multiple browsers
   - Consider security implications (see Security section)
6. **Commit your changes** (`git commit -m 'Add amazing feature'`)
7. **Push to your branch** (`git push origin feature/amazing-feature`)
8. **Open a Pull Request**

### Development Guidelines

This project follows strict development guidelines outlined in [CLAUDE.md](CLAUDE.md):

- Always write clean, maintainable code
- Maintain a clean and extensible architecture
- Never decrease code quality
- Think through multiple solution approaches before implementing
- Always perform security reviews before submitting PRs
- The live site must never break - test thoroughly

### Automated Workflows

The project uses GitHub Actions for:
- **Automatic Deployment**: Changes to `main` are automatically deployed to GitHub Pages
- **Claude Code Review**: AI-assisted code reviews on pull requests
- **Auto-Merge**: Approved PRs are automatically merged after passing reviews

## Security

### Security Considerations

Since this is a peer-to-peer application with no backend:
- All code runs in the user's browser
- Direct peer connections expose IP addresses (inherent to WebRTC)
- No central authentication or authorization
- End-to-end encryption depends on WebRTC implementation

### Reporting Security Issues

If you discover a security vulnerability, please open an issue or contact the maintainers directly.

## Documentation Maintenance

To keep this README up-to-date:

### For Contributors

When adding new features or making significant changes:

1. **Update relevant sections** of this README in the same PR
2. **Add new features** to the "Current Features" section
3. **Update architecture** section if structure changes
4. **Modify setup instructions** if dependencies or requirements change

### For Reviewers

During code review, verify that:
- README accurately reflects the changes
- New features are documented
- Setup instructions are still valid
- Links and references are not broken

### Automated Checks

Consider adding automated checks in the future:
- Link validation in CI/CD
- Documentation coverage checks
- Version synchronization

## Project History

TheCommunity started as a simple chat application with a unique constraint: all backend communication must run over WebRTC without any traditional backend servers or even signaling brokers. The community drives where this project goes from here.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Community contributors who steer the project direction
- Claude AI for development assistance
- The WebRTC community for building amazing P2P technologies

## Links

- **Live Demo**: [https://themorpheus407.github.io/TheCommunity/](https://themorpheus407.github.io/TheCommunity/)
- **Issues**: [https://github.com/mhaxp/TheCommunity/issues](https://github.com/mhaxp/TheCommunity/issues)
- **Pull Requests**: [https://github.com/mhaxp/TheCommunity/pulls](https://github.com/mhaxp/TheCommunity/pulls)
- **Requirements Source**: [YouTube Video](https://www.youtube.com/watch?v=oBi326z4g2E)

---

**Built with WebRTC - No servers, no tracking, just peer-to-peer communication**
