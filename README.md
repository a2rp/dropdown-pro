# Dropdown/Menu Pro (React + Vite)

**Live:** https://a2rp.github.io/dropdown-pro/  
**Repo:** https://github.com/a2rp/dropdown-pro

## What is this?

A small, click-only **Dropdown / Menu** for React. It supports a single-level submenu, smart positioning (flip + clamp), closes on outside click, and needs no external UI libs. Styles and theme tokens are scoped inside a single `Styled.Wrapper`.

## Features

-   Click to open/close the menu; submenu opens on hover
-   **Smart placement:** computes `left/top` before paint, flips above/left if needed, clamps to viewport, repositions on scroll/resize
-   **Outside-click** closes everything
-   One portal target inside the wrapper so scoped styles apply
-   No keyboard shortcuts (by design), no routing, front-end only
-   Code isolated in `src/dropdownPro/`

## Run locally

```bash
git clone https://github.com/a2rp/dropdown-pro
cd dropdown-pro
npm i
npm run dev
```
