# Toopeace Landing Clone Design

## Goal

Recreate the current public Toopeace home screen as a self-contained local landing page that preserves its first-load animation, hover behavior, re-entry replay, typography hierarchy, and desktop/mobile layout.

## Observed source contract

- The page is a single black, viewport-height hero with no media assets.
- The wordmark is inline SVG, drawn from eight letter paths: `T`, `O1`, `O2`, `P`, `E1`, `A`, `C`, `E2`.
- Each path uses `stroke-dasharray` and `stroke-dashoffset`; drawing starts at delays `0`, `0.25`, `0.5`, `0.75`, `1`, `1.25`, `1.5`, and `1.75` seconds with a 1.8 second cubic-bezier transition.
- Supporting copy appears after the wordmark: the two copy lines use opacity/translate transitions at 3.0 and 3.1 seconds; the pill navigation appears at 3.3 seconds; the caption appears at 3.6 seconds.
- An `IntersectionObserver` replays the drawing when the hero enters the viewport and erases it when the hero leaves.
- Desktop navigation is a horizontal row separated by 1px dividers; mobile navigation becomes a vertical stack.
- Navigation labels are `GROWTH LAB / ACADEMY`, `SOCIAL WAVE / CONTENTS`, and `DIGITAL SPACE / WEBSITE` with inline line icons.

## Approach

Use a framework-free static page with three focused files:

- `index.html`: semantic hero markup, inline SVG paths, three navigation links, and reduced-motion metadata.
- `styles.css`: full-viewport layout, typography, responsive breakpoint, pill hover state, and staged supporting-content transitions.
- `app.js`: deterministic path setup, draw/erase controls, and `IntersectionObserver` lifecycle.

The clone will not import the original Imweb runtime, external vendor CSS, tracking scripts, or account/shop UI. Those are not part of the visible landing experience and would make the local clone non-reproducible. The three links will use the observed relative destinations as local placeholder routes for this first screen; their downstream pages are out of scope for this pass.

## Interaction and accessibility

- All navigation items remain keyboard-focusable anchors with visible `:focus-visible` styling.
- `prefers-reduced-motion: reduce` disables staged transitions and leaves the wordmark/content visible.
- Link hover changes only the pill background, matching the source behavior.
- The observer is disconnected when the page is torn down only if the script is later embedded in a component; the initial static page needs no teardown.

## Verification contract

The result is complete when:

1. A local static server renders the page at the root URL.
2. At a 1920px desktop viewport, the wordmark draws letter-by-letter and the supporting content follows in sequence.
3. Hover/focus states visibly brighten a navigation pill without changing layout.
4. Re-entering the hero after scrolling away replays the draw animation.
5. At a mobile-width viewport, the three navigation pills stack vertically and remain readable.
6. A static smoke test confirms the required DOM hooks and animation constants are present.

## Out of scope

- Cloning the three destination pages behind the navigation.
- Production deployment, DNS, analytics, forms, CMS editing, or payment flows.
- Copying the original site's unrelated Imweb scripts, cookies, or tracking behavior.
