# TensorLoom — website

A React + Vite landing page for TensorLoom, built around the loom/weave
concept from your logo (warp = the infrastructure you build on, weft =
the AI layer woven across it).

## Run it locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

Output goes to `dist/` — deploy that folder to Vercel, Netlify, GitHub
Pages, or any static host.

## Before you launch — things to fill in

This is real, working code, but a few pieces are placeholders you should
update with your actual details:

- **Contact form** (`src/components/Contact.jsx`): the form currently
  only shows a success message in the browser — it doesn't send an email
  anywhere yet. Wire the `handleSubmit` function to a real endpoint
  (e.g. [Formspree](https://formspree.io), [EmailJS](https://www.emailjs.com/),
  or your own backend route).
- **Email address**: `hello@tensorloom.ai` appears in `Contact.jsx` and
  `Footer.jsx` — swap for your real inbox.
- **Social links**: LinkedIn/Twitter/GitHub links in `Contact.jsx` and
  `Footer.jsx` are `#` placeholders — add your real profile URLs.
- **Pricing tiers** (`src/components/Pricing.jsx`): copy describes three
  engagement shapes (Sprint / Partner / Enterprise) without fixed dollar
  amounts, since real pricing depends on scope — adjust the wording if
  you'd rather publish fixed rates.
- **Industries marquee** (`src/components/IndustryMarquee.jsx`): lists
  general industries rather than named clients, since there's no client
  roster yet — swap in real client names once you have permission to use them.
- **Interactive demo** (`src/components/IndustryDemo.jsx`,
  `src/data/industries.js`): a Storylane/Rendemo-style guided walkthrough
  showing how an AI agent would work for Healthcare, Pharma, Real Estate,
  Logistics, and Automobile. The workflow steps and impact chips are
  illustrative scenarios, not real client results — the "before/after"
  bars are intentionally labeled illustrative for the same reason. Add
  or edit industries by adding entries to `industries.js`; the widget
  picks them up automatically. Swap in a real case study whenever you
  have one to publish.

## Structure

```
src/
  App.jsx              — page assembly
  index.css            — design tokens (colors, type, shared classes)
  hooks/useReveal.js    — scroll-reveal IntersectionObserver hook
  components/
    LoomMark.jsx        — the SVG logo mark (used in nav, hero, footer)
    Navbar.jsx / Hero.jsx / IndustryMarquee.jsx / About.jsx
    Services.jsx        — Warp (foundation) / Weft (intelligence) capability grid
    AgentShowcase.jsx   — AI agent pipeline spotlight
    Process.jsx / Pricing.jsx / FAQ.jsx / Contact.jsx / Footer.jsx
```

Each component has its own scoped `.css` file next to it.
