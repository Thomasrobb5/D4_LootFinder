# D4 Loot Finder

**D4 Loot Finder** is a premium, responsive web utility designed for Diablo IV players to quickly and easily locate where to farm specific Unique items. Built with a sleek, dark-themed interface inspired by community hubs like Maxroll, it allows users to filter items by class or search directly for specific items. 

## Features

- **Instant Search:** Powerful autocomplete and search functionality to instantly find the Unique or Mythic Unique item you're looking for.
- **Boss Loot Tables:** View comprehensive loot tables for all major Echo bosses, including their required summoning materials, element types, and cosmetic drops.
- **Interactive Modals:** Detailed views for both items and bosses, making cross-referencing information seamless.
- **Responsive Design:** Fully mobile-optimized interface with beautiful glassmorphism effects, smooth animations, and a rich dark aesthetic.
- **Class Filtering:** Instantly filter loot drops specific to Barbarian, Druid, Necromancer, Rogue, Sorcerer, or view all Mythic Uniques.

## Technology Stack

- **HTML5** & **Vanilla JavaScript** (No external JS frameworks)
- **Tailwind CSS** (via CDN for rapid styling and utilities)
- **Custom CSS** for bespoke animations, scrollbars, and glassmorphism.

## Usage

Simply open `index.html` in your web browser to start using the tool locally, or host the files on any static web hosting provider (like GitHub Pages or Cloudflare Pages) to share with the community.

## Structure

- `index.html`: The main markup for the application.
- `styles.css`: Custom overrides for glows, animations, and theme-specific styling.
- `data.js`: The comprehensive boss loot dataset and inverted index engine.
- `script.js`: Handles DOM manipulation, filtering logic, modal states, and search debouncing.
