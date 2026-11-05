# The Vanishing Index — implementation plan

## Scope

A frontend-only React/Vite archive experience with six direct screens: Home, Archive, Case Files, Evidence Room, Historical Timeline, and Design Process & Gestalt Showcase. The site uses local data for the three supplied cases, their documented timelines, and evidence captions. It has no login, backend, database, paid API, or map integration.

## Implementation approach

- `src/data.js` owns cases, evidence, timeline events, source links, and the eight-principle showcase.
- `src/App.jsx` owns a small history-based router, shared shell, page screens, filters, case tabs, evidence modal, timeline interactions, and the global Gestalt toggle.
- `src/styles.css` owns the full editorial visual system, responsive behavior, archive imagery treatments, focus states, animation, reduced-motion behavior, and Gestalt highlight labels.
- `public/manus-routes.json` declares `/`, `/archive`, `/cases/:slug`, `/evidence`, `/timeline`, and `/process` for direct-route awareness.
- Vite serves the same SPA entry for direct route URLs in development and static deployment.

## Design direction

### Design Movement

- Documentary archive / editorial museum interface — probability 0.07
- Arts-and-Crafts research folio — probability 0.05
- Minimalist contemporary news investigation — probability 0.04

Chosen direction: **documentary archive / editorial museum interface**.

### Core principles

1. Evidence is grouped in calm, bounded regions so hierarchy stays legible.
2. Warm materials and restrained bronze/terracotta accents make uncertainty feel human, not futuristic.
3. Oversized serif headlines and mono metadata separate story from record.
4. Motion is purposeful: filters pull related material together and the timeline leads the eye forward.

### Color philosophy

Charcoal and deep brown establish the reading room. Parchment and ivory create a tactile paper field. Bronze marks action and provenance; olive and terracotta distinguish classification without turning the site into a dashboard.

### Layout paradigm

A staggered archival folio: large focal compositions are balanced by narrow metadata rails, framed common regions, and a visible document spine that carries visitors between screens.

### Signature elements

- The split-ring “V” seal, used as a closure motif in the wordmark and section indices.
- A bronze archive spine running through timelines and evidence shelves.
- Small provenance stamps and mono labels that make the interface feel catalogued rather than decorative.

### Interaction philosophy

Controls behave like catalog instruments. Filters preserve context, cards reveal one clear action, and the Gestalt toggle exposes design intent without interrupting the normal reading experience.

### Animation

Use quiet 180–320ms fades and translations. Related timeline and evidence items move as a unit when filtered (common fate). Respect `prefers-reduced-motion` and provide a manual pause for the moving timeline marker.

### Typography system

Fraunces for display headlines; DM Sans for body copy and controls; DM Mono for codes, dates, and source metadata. Display sizes should be bold and generous, body text should remain comfortably readable, and metadata should never carry essential meaning alone.

### Brand essence

A credible digital reading room for unresolved historical records. Personality: exacting, atmospheric, humane.

### Brand voice

Headlines are concise and observational. CTAs sound like invitations to inspect, not sales copy. Example lines: “Enter the archive.” “Read the record, then decide what remains unknown.”

### Wordmark & logo

A split-ring seal paired with a tightly tracked wordmark. The incomplete ring is a closure cue: the viewer mentally completes the mark while the archive acknowledges what cannot be completed in the record.

### Signature brand color

Antique bronze `#A77C50` — used sparingly for provenance, focus, and actions.

## Project structure

```text
index.html
app.config.ts
public/manus-routes.json
src/
  App.jsx      shared shell, router, screens, interactions
  data.js      local research data and showcase content
  main.jsx     React entry
  styles.css   visual system and responsive layout
```

## Delivery

The project is prepared for Vercel/static output with `pnpm build`. A clean checkpoint should include the source, public route manifest, package lockfile, and the concise planning/TODO files.
