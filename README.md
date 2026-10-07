# RentDesk — Design Your Workspace

Workspace rental builder (Bali). Pick desks, chairs, and accessories from the
catalog, arrange them on a visual canvas, and check out a monthly rental setup.

## Quick start

```bash
npm install
npm run dev      # local preview
npm run build    # production build → dist/
npm run lint     # eslint over src/
npm run format   # prettier write
```

## Project structure

```text
public/assets/            # product PNGs (served as /assets/...)
src/
  main.jsx                # React entry
  App.jsx                 # thin orchestrator (~60 lines)
  index.css               # tailwind import + App.css + body font
  styles/App.css          # reusable branded classes (cards, buttons, modal…)
  data/catalog.js         # CATEGORIES, PRODUCTS, MAX_MONITORS, singletons
  hooks/useSetup.js       # setup state (add/remove/total + selectors)
  utils/layout.js         # getMonitorWidth() scene sizing
  components/
    Header.jsx            # page hero
    CatalogPanel.jsx      # tabs + product grid
    ProductCard.jsx       # catalog card
    ProductImage.jsx      # non-interactive <img> wrapper
    RemoveButton.jsx      # hover-reveal delete button
    Scene.jsx             # canvas card + total pill + label strip
    DeskLayer.jsx         # desk anchor + monitors/lamp/keyboard/mouse
    ChairLayer.jsx        # chair in front of desk
    FloatingLayer.jsx     # accessories shown before a desk is picked
    EmptyState.jsx        # faded desk+chair placeholder
    ActionBar.jsx         # rent CTA bar
    CheckoutModal.jsx     # order summary modal
```

## Conventions

- **State** lives in `hooks/useSetup.js`. Components stay presentational and
  receive data + callbacks via props.
- **Styling** is Tailwind-first (utilities inline). Only genuinely reusable
  branded pieces live in `styles/App.css`. Dynamic values (pixel widths,
  percentage offsets) stay as `style` props.
- **Rules**: max `MAX_MONITORS` monitors; keyboard/mouse are singletons
  (re-adding replaces). Constants live in `data/catalog.js`.
- Assets use absolute `/assets/...` paths from `public/`.
