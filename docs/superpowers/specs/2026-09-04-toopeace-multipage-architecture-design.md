# Toopeace Multi-page Architecture Design

## Goal

Convert the current single scrolling page into a four-page static site. The home page keeps only the existing hero, social links, and Contact CTA. Portfolio, Story, and Services move to dedicated pages opened from the primary navigation.

## Chosen approach

Use root-level static HTML files:

- `index.html`: hero, social links, Contact CTA, and contact dialog.
- `portfolio.html`: results heading, portfolio carousel, detail results, and results outro.
- `story.html`: journey heading, profile image, five story steps, and blog CTA.
- `services.html`: services heading and three service cards.

All pages share `styles.css` and `app.js`. Root-level files preserve the current `./assets/...` paths and work without routing configuration in the existing local Python server and Vercel deployment.

Folder routes and a JavaScript SPA are intentionally not used. Folder routes would require broader path normalization, while an SPA would add routing state and history handling without improving this static site.

## Navigation and page identity

The primary navigation uses real page links:

- `Portfolio` → `./portfolio.html`
- `Story` → `./story.html`
- `Services` → `./services.html`

Each subpage includes a top-left `TOOPEACE` home link to `./index.html`. The existing floating primary navigation remains top-right on desktop and bottom-fixed on mobile. The link for the current page uses `aria-current="page"` and a visible active style. The home page has no active section link.

Navigation is standard anchor navigation, so direct loads, refreshes, browser back/forward, keyboard activation, and opening in a new tab work without JavaScript routing.

## Shared styling

The existing black visual system, typography, glass capsules, spacing, responsive breakpoints, and section-specific animations remain unchanged unless a page boundary requires a small layout adjustment.

Subpages receive a shared page shell class that provides room for the home link and floating navigation without changing the content hierarchy. The first section on each subpage starts at the top of its document rather than appearing after an empty hero-sized area.

## JavaScript behavior

`app.js` remains shared and keeps its existing defensive initializers:

- Hero animation runs only when `.toopeace-wrap` and `.tp-svg-text` exist.
- Portfolio carousel and results reveal run only on `portfolio.html`.
- Journey reveal runs only on `story.html`.
- Morph-button hover behavior runs wherever `.tp-contact` exists.
- Contact modal initialization runs only on `index.html`, where `#contact-modal` exists.

The Story blog CTA keeps the shared visual button class but follows its external link normally because the Story page does not include the contact dialog.

## Content and asset boundaries

Existing content, case data, images, result claims, social URLs, and the blog URL are moved without rewriting or inventing information. `PORTFOLIO_ITEMS` stays in `app.js`; its initializers remain no-ops on pages that do not render the carousel.

## Error handling and fallbacks

- Every initializer returns safely when its page-specific DOM is absent.
- If JavaScript fails, all static headings, story content, services, navigation, and the home Contact button remain visible; only dynamic carousel population and modal behavior are unavailable.
- Native links remain functional without JavaScript.
- Missing portfolio media continues to use the existing placeholder behavior.

## Verification contract

The implementation is complete when:

1. `index.html` contains the hero and Contact dialog but no Portfolio, Story, or Services section.
2. Each subpage contains exactly its assigned section and the shared navigation.
3. All navigation links and the subpage home link reach the expected HTML file with HTTP 200.
4. `portfolio.html` renders the current carousel, dots, detail results, and images; keyboard arrows and buttons still work.
5. `story.html` reveals the five story rows and its blog CTA opens the external blog rather than the contact modal.
6. `services.html` renders all three service cards.
7. The current page is exposed with `aria-current="page"` and a visible active state.
8. Desktop and 390×844 mobile views have no horizontal overflow, hidden content, or navigation collision.
9. Existing static tests are updated for the new page boundaries and all checks pass alongside JavaScript syntax and `git diff --check`.

## Out of scope

- Clean extensionless URLs or server-side routing.
- CMS integration, analytics, form backend, or Tally integration.
- Rewriting copy, changing portfolio claims, replacing images, or redesigning the approved visual system.
- Production deployment in this implementation pass unless requested separately.
