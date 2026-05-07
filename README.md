![]('/../public/images/og-image.png)

# [ASTRO-CUBE](https://astro-cube.vercel.app) 🧊

a tiny, almost-unopinionated [Astro](https://astro.build/) starter for your next blog, documentation, personal/marketing website, and more.

it comes with the [CUBE CSS](https://cube.fyi/) file structure, a methodology for managing stylesheets efficiently no matter the size of the project.

the project is mostly barebones, the goal isn't to provide a batteries-included template, just an easy starter kit and stylesheets to copy/paste from.

most styles are for demo purposes and to explain the underlying philosophy: "Be the browser's mentor, not its micromanager" (see [buildexcellentwebsit.es](https://buildexcellentwebsit.es)).

## features

- **[CUBE CSS](https://cube.fyi/) implementation**: take a look at the docs, they are concise and explain way better than i would
- **fluid and responsive**: it looks great no matter the device size
  - [Every Layout](https://every-layout.dev/) examples for layout elements
  - [Utopia](https://utopia.fyi/) for fluid `clamp()`-based font sizes and spacing
- **lightweight**: 💯 [lighthouse score](https://developer.chrome.com/en/docs/lighthouse/performance/performance-scoring/) across the board — not surprising considering the size of the project, but worth mentioning
- **dark-mode ready**: implement your own theme switcher if you're into that sort of thing, all you have to do is toggle the `data-theme` attribute on the body
- **SEO** ready: basic SEO meta-tags are set-up, with `sitemap`s automatically generated at build time

## installation

### clone this repo

```bash
git clone https://github.com/williamhzo/astro-cube.git
```

### instal dependencies

```bash
cd astro-cube
```

```bash
npm i
```

### spin up local dev server

```bash
npm run dev
```

### build to `./dist/`

```bash
npm run build
```

### preview production build

```bash
npm run preview
```

### ...or use the template directly ➡️ "Use this template" > "Create a new repository"

## Booking form — environment variables

The booking form on `/book/` posts to a Cloudflare Pages Function at
`functions/api/submit-form.ts`. The function notifies Telegram and Resend
in parallel. Four environment variables are required:

| Variable | Purpose |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token issued by @BotFather. |
| `TELEGRAM_CHAT_ID` | Chat ID (or channel ID) the bot posts new bookings into. |
| `RESEND_API_KEY` | Resend API key (`re_...`). |
| `BUSINESS_EMAIL` | Address that receives booking emails. Defaults to `info@samsungrefrigerator.repair`. |

### Local development

For local testing under `wrangler pages dev`, copy `.dev.vars.example` to
`.dev.vars` (or create `.dev.vars` directly) at the project root and fill in
the values. `.dev.vars` is gitignored.

```
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
RESEND_API_KEY=...
BUSINESS_EMAIL=info@samsungrefrigerator.repair
```

### Production (Cloudflare Pages)

Set the same four variables in **Cloudflare Pages → Settings → Environment
Variables** for both the **Production** and **Preview** environments.

If the Function build complains about Node-style APIs, enable
`nodejs_compat` under **Cloudflare Pages → Settings → Functions →
Compatibility flags** for both environments. (Our handler uses only Web
fetch + JSON, so this should not be required, but the flag is harmless and
documented here in case Cloudflare changes runtime defaults.)

## contributions are welcome! 👋

it's great if this kit can be helpful to some folks out there, i'm open to feedback and greatly appreciate contributions, feel free to chip in for fixes, suggestions, or features! let me know if you have improvement ideas.

---

## credits

greater minds than mine are behind the choices in this kit, i'd like to mention them for the inspiration and learning provided:

### **[Astro core & docs team](https://docs.astro.build/en/getting-started/)**

along with contributors, for a great onboarding experience and a wholesome community.

### **[Andy Bell](https://andy-bell.co.uk/)**

Andy is a great source of inspiration for building robust UI working with the browser, rather than against it. but also for reminding me that CSS is an extremely powerful tool as it is. CUBE CSS really clicked to me as it brought pure "traditional" CSS to the component-first world of today.

- [Every Layout](https://every-layout.dev/)
- [CUBE CSS](https://cube.fyi/)

### **[Heydon Pickering](https://heydonworks.com/)**

Heydon provides amazing insights and spicy takes on how to build for the web, from an inclusive and accessible perspective.

- [Inclusive Components](https://inclusive-components.design/)
- [Webbed Briefs](https://briefs.video/)
- [Every Layout](https://every-layout.dev/)

### **[Lene Saile](https://www.lenesaile.com/en/)**

Lene made an amazing [Eleventy](https://www.11ty.dev/) starter based on CUBE CSS which is way more mature and complete than this one. it comes batteries included to build a full-blown blog with 11y in a breeze, i'd definitely recommend checking it out.

her starter greatly inspired me to build one for Astro (it will be a separate one from this minimal one).

- [Eleventy Excellent](https://github.com/madrilene/eleventy-excellent)
