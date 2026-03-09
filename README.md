# VanLite UI 🍦⚡
Pure Vanilla. Zero Gravity.
Lightweight UI components built with pure HTML, CSS and minimal JavaScript.
The goal of this project is to provide simple, modern UI components without heavy frameworks or dependencies.

Features
    • No frameworks
    • Very small JavaScript footprint
    • Uses modern native HTML elements where possible
    • Easy to integrate into any project

Components
This UI kit currently includes:
    • Modal (based on the native <dialog> element)
    • Accordion
    • Toast notifications
    • Cards
    • Progress bars
    • Circular progress indicator
    • Spinner loader
    • Skeleton loader

Installation
Clone the repository:
git clone https://github.com/vladnzv/vanlite-ui
Or copy the files into your project.
Include the CSS and JavaScript:
<link rel="stylesheet" href="ui.css">
<script src="ui.js"></script>

Usage
Toast
<button data-toast="Saved successfully">
Save
</button>
Modal
<button data-modal-open="settingsModal">
Open settings
</button>

<dialog id="settingsModal">
<h2>Settings</h2>
<p>Modal content</p>
<button onclick="this.closest('dialog').close()">Close</button>
</dialog>

Philosophy
This project focuses on:
    • simplicity
    • small bundle size
    • native browser features
    • minimal JavaScript
Many components use modern HTML elements such as <dialog> and <details> instead of complex scripts.

Browser Support
Works in all modern browsers.
Older browsers may require polyfills for the <dialog> element.

Roadmap
Planned improvements:
    • Tabs component
    • Tooltip
    • Dropdown menu
    • Off-canvas panel
    • Theme customization via CSS variables

License
MIT License

Created by Vladislav Nazarov

GitHub: github.com/vladnzv

