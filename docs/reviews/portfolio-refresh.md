# Software portfolio refresh

19 November 2026. Branch: codex/portfolio-refresh. Repository: PAPPY-JOE/dev-portfolio.

## What changed

The software portfolio now opens with an immediate introduction and visible work/contact actions. It keeps the dark identity, with a restrained green accent, sans-serif body copy, clearer contrast and fewer decorative terminal elements. The unverified portrait badge and delayed typing sequence are removed. Location now reads Lagos, Nigeria instead of Based in Remote.

Valet leads the selected work, followed by CitiCompass, Missions Aid and NurseNaija. Project links remain visible while native expandable case studies explain the problem, role, decisions and current state. NurseNaija is labelled Prototype and Bxpense appears separately as a university side project, rather than a previous founded business. The Valet image is the existing high-resolution concept-demo Today image, labelled Sample wardrobe shown. It does not establish a live AI stylist.

Experience is compact, with optional contribution details; skills use a responsive grid instead of a long tree or proficiency bars. Contact uses normal labels, a direct email link and the existing submission path. Failure keeps the draft; success resets it. Required field labels are associated with their controls. Navigation, footer and engineering background link to the separate academic site without rebuilding it.

Corrected canonical/sharing URLs and title/description, added a local favicon and a 1200 by 630 social preview. React uses its installed createRoot entry point. Vite environment types fix the existing type-check errors. A pre-existing empty unsubscribe callback is expressed as returning undefined so lint accepts it; behaviour is unchanged.

## CMS compatibility

The current published content was read anonymously from the same publicly readable document used by visitors. No CMS, contact-message or authentication record was changed. Default content now reflects the published projects plus Valet. A pure read-time compatibility function updates only known older copy, introduces Valet once and preserves unknown projects, custom text, IDs, unpublished projects and existing experience. Later custom copy stays authoritative. An authenticated future Save in the existing admin will persist the displayed content through its existing save path; no save was performed here.

## Validation

- `node scripts/test-portfolio.cjs`: passed. Covers immutable/idempotent CMS compatibility, custom copy, unpublished choices, project order, visible links/status, immediate hero and contact pending/failure/retry/success with an isolated fake transport.
- `node node_modules/typescript/bin/tsc --noEmit`: passed.
- `npm run lint` with `ESLINT_USE_FLAT_CONFIG=false`: passed, zero errors and three existing warnings in the Auth/Content providers. The environment override prevents the enclosing Valet checkout's flat ESLint config from masking this repository's own legacy config.
- `npm run build`: passed. The existing large-bundle and stale Browserslist notices remain; no dependencies were added or updated.
- Browser review uses the actual production build and anonymous published CMS content at 390, 768 and 1440 pixels. The first local dev-server check was interrupted by the watcher encountering a locked browser-profile file; production preview avoids that watcher.
- Responsive browser checks passed at all three widths with 16px body text, no horizontal overflow, no broken loaded images and no captured runtime errors. Native case studies opened with Space and closed with Enter, and reduced-motion scrolling is honoured. The first Enter simulation omitted its character event; the full browser key event passed. Screenshots: `.review/portfolio-{390,768,1440}.png`, `.review/mobile-work.png` and `.review/mobile-contact.png`.
- No real contact message was sent and no authenticated admin save or upload was tested. Academic site and Valet source are untouched.

## Review in the PR preview

1. Inspect the opening and section spacing on phone and desktop. Introductory text and links should not wait for animation.
2. Open each project, expand its case study by mouse and keyboard, and check the Valet sample-image caption and prototype/student labels.
3. Check compact experience, skills, navigation anchors and the academic-site link.
4. Check contact labels, required fields and direct email. A real submission writes a message to the existing backend, so perform one only if desired.
5. Check a shared-link preview after merge; metadata deliberately uses the production domain. Existing CMS editing and uploads retain their original backend and permissions.

Leave the PR unmerged for Joseph's review. Local review screenshots and logs are in the ignored .review folder.
