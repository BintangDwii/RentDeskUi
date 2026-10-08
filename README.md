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
  App.jsx                 # thin layout shell (~100 lines)
  index.css               # tailwind import + App.css + body font
  styles/App.css          # reusable branded classes (cards, buttons, modal…)
  data/catalog.js         # CATEGORIES, PRODUCTS, MAX_MONITORS, singletons, plans
  hooks/
    useSetup.js           # persisted setup state (add/remove/total + selectors)
    useSetupActions.js    # useSetup + toast/undo UX (add/remove/clear)
    useToast.js           # transient toast state
    useModal.js           # scroll-lock + Escape handling
    useAnimatedNumber.js  # tweened numbers
  utils/
    setup.js              # setup domain logic (singletons, membership, card state)
    layout.js             # getMonitorWidth() scene sizing
    pricing.js            # plan discounts, contract/deposit math
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
    CartStrip.jsx         # horizontal cart summary
    Toast.jsx             # undo toast
    CheckoutModal.jsx     # order summary modal (orchestrator)
    ProductDetailModal.jsx# product detail modal (orchestrator)
    ui/                   # Modal shell, Rating
    checkout/             # OrderSuccess, SetupSummary, RentalDuration,
                          # PriceBreakdown, DeliveryInfo, SectionTitle, groups
    product/              # ProductImagePanel, ProductInfoPanel, ProductSpecList
    scene/                # MonitorItem, SceneRemoveButton
    icons/specIcons.js    # spec key → Lucide icon map
```

## Conventions

- **State** lives in `hooks/useSetup.js` (raw setup) and
  `hooks/useSetupActions.js` (setup + toast/undo UX). Components stay
  presentational and receive data + callbacks via props.
- **Setup rules** (singletons, membership, item names, catalog card state)
  live in `utils/setup.js` — one source of truth shared by the hook and UI.
- **Modals** share the `components/ui/Modal.jsx` shell (overlay, Escape,
  scroll-lock, click-outside, close button). Feature bodies are split under
  `components/checkout/` and `components/product/`.
- **Styling** is Tailwind-first (utilities inline). Only genuinely reusable
  branded pieces live in `styles/App.css`. Dynamic values (pixel widths,
  percentage offsets) stay as `style` props.
- **Rules**: max `MAX_MONITORS` monitors; keyboard/mouse are singletons
  (re-adding replaces). Constants live in `data/catalog.js`.
- Assets use absolute `/assets/...` paths from `public/`.

Approach & Tech Choices:

I chose to stick strictly to the required tech stack (HTML, Tailwind CSS, and vanilla JavaScript)
as I am already familiar with them. This enabled me to build a clean, responsive, and functional workspace
builder efficiently without unnecessary framework complexity.

What I'd Improve with More Time:

If given more time, I would expand the product catalog with more variety and detailed specs, enhance the UI design
with richer visual animations, and potentially upgrade the 2D canvas into a fully interactive 3D workspace viewer.
