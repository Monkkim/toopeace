# Toopeace Results Section Design

## Goal

Add a scrollable results section below the hero Contact CTA with the heading `Toopeace와 함께한 사람들은 이렇게 바뀌었습니다`, alternating media/text rows, and the three user-supplied case screenshots and outcome copy.

## Layout

- The section uses the existing black visual system and begins below the full-screen hero.
- A centered section heading and short supporting line introduce the case studies.
- Three case rows are a two-column grid on desktop and a single-column stack on mobile.
- Odd rows place the media card on the left and the result summary on the right; even rows reverse that order.
- The media cards use the three user-supplied profile screenshots in `assets/` and preserve their horizontal image ratio.
- The text side contains the supplied case copy, result details, and scope labels without adding new customer names or claims.

## Interaction

- Rows start slightly translated and transparent.
- `IntersectionObserver` adds `.is-visible` when a row enters the viewport, revealing the media and text with staggered transitions.
- The section respects `prefers-reduced-motion: reduce` by showing all rows immediately.
- The page remains horizontally overflow-free at desktop and mobile widths.

## Data boundary

The three case facts and screenshots are user-supplied content. They are displayed as provided, but were not independently verified in this implementation. Future edits should preserve the distinction between supplied claims and independently verified proof.

## Verification

- Static smoke test confirms the section heading, three alternating rows, supplied asset mappings, observer hook, and reduced-motion CSS.
- Browser QA confirms the section exists below the hero, alternating row order is present, rows reveal on scroll, mobile layout stacks, and the console has no errors.
