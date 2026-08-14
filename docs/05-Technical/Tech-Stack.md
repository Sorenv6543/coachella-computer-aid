# Tech Stack — Technology Choices & Rationale

**Production-Quality, Scalable, Future-Proof Technology**

---

## 🎯 Philosophy

We're building this like a real software company would—not a one-off website, but a sustainable platform that can grow into a full community technology center system.

Every technology choice prioritizes:
- **Maintainability** — Easy for team to work with
- **Scalability** — Can grow from 1,000 to 10,000+ users
- **Community** — Use technologies with strong communities
- **Open Source** — Where possible, for transparency
- **Performance** — Fast, responsive experience
- **Accessibility** — Built-in support for WCAG AA+

---

## 🏗️ Frontend Architecture

### Framework: Vue 3
**Why:** Easy to learn, powerful, used by large organizations  
**Version:** 3.x (composition API)  
**Ecosystem:** Large community, many libraries

### Build Tool: Vite
**Why:** Ultra-fast development, instant reload, optimized production builds  
**Features:** Next-generation ES modules, instant HMR

### Component Library: Vuetify 4
**Why:** Pre-built accessible components, theming system, maintained by community  
**Decision (2026-08-14):** Vuetify 4 confirmed over the originally documented v3 — the approved "B2 — Desert Modernism Warmed" prototype was built and verified against Vuetify 4 (stable Feb 2026) with the working `cca` theme object.  
**Components:** 80+ components ready to use  
**Accessibility:** Built-in WCAG AA support  
**📚 MCP Access:** Claude has access to the Vuetify MCP server for live documentation lookups
- Ask Claude about component APIs: "How do I use the VBtn component?"
- Request component examples: "Show me a VCard with an image"
- Get style and customization guidance directly from Vuetify docs

### State Management: Pinia
**Why:** Simple, modern replacement for Vuex  
**Use:** Manage appointments, user data, UI state  
**Why Not Redux:** Simpler for this project scope

### Styling: Sass/SCSS
**Why:** Variables, nesting, mixins for maintainable CSS  
**Use:** Custom styles on top of Vuetify  
**Scope:** Component-scoped styles to prevent conflicts

### Utility Libraries

| Library | Purpose |
|---------|---------|
| **VueUse** | Hooks and utilities for Vue |
| **VueUse Motion** | Smooth animations and transitions |
| **VueUse Core** | Common composables |
| **Floating Vue** | Tooltips and popovers |
| **Vue3 Lottie** | Animation support (for Lottie files) |
| **Unplugin Icons** | Icon system with auto-import |

### Build Optimizations
- **Auto Import:** Components, composables, utilities imported automatically
- **Code Splitting:** Lazy loading by route
- **Image Optimization:** Automatic WebP conversion, compression
- **Tree Shaking:** Unused code removed from bundle
- **Minification:** Production builds minified and optimized

---

## 🔌 Backend & Services

### Database: Supabase
**Why:** Open-source Firebase alternative, PostgreSQL, built-in auth  
**Features:**
- Real-time database
- Authentication (email, OAuth)
- Row-level security
- Auto-generated API
- Built-in file storage

**Tables:**
- Users (profiles, roles)
- Appointments (bookings, history)
- Workshops (details, registrations)
- Resources (guides, materials)
- Testimonials (stories, feedback)
- Donations/Payments (transaction logs)
- Volunteers (profiles, hours)
- Analytics (custom tracking)

### API: Supabase Auto-Generated REST API
**Why:** No backend code needed initially, scales as needed  
**GraphQL:** Optional upgrade as complexity increases

### Authentication
- **Primary:** Email + password (Supabase Auth)
- **Optional:** Google OAuth, Apple Sign-In
- **Admin:** Email verification, password reset

### File Storage: Supabase Storage
**What:** PDF guides, video thumbnails, user uploads  
**Security:** Private buckets, public CDN where needed

---

## 📊 Analytics & Monitoring

### Google Analytics 4
**Why:** Free, comprehensive, privacy-respecting  
**Tracks:**
- Visitor demographics
- Page engagement
- Conversion goals (bookings, signups)
- Device and browser usage
- Geographic data

### Error Tracking: Sentry (Optional)
**When to add:** Phase 2+ when we need production monitoring  
**Tracks:** JavaScript errors, performance issues

### Performance: Lighthouse
**Tools:** Chrome DevTools Lighthouse  
**Target:** 90+ score on all metrics  
**Monitoring:** Quarterly audits

---

## 🔒 Security & Compliance

### HTTPS/SSL
- **Required:** All traffic encrypted
- **Provider:** Let's Encrypt (free) or similar
- **Auto-renewal:** Automatic certificate updates

### Data Protection
- **Encryption:** In transit (HTTPS) and at rest (Supabase)
- **Backups:** Daily automated backups
- **Privacy Policy:** CCPA/GDPR compliant

### Authentication Security
- **Password Requirements:** Min 8 characters (Supabase defaults)
- **Rate Limiting:** Prevent brute force attacks
- **2FA (Optional):** For admin accounts

### Code Security
- **Dependencies:** Regular audits with `npm audit`
- **Secrets Management:** Environment variables, never in code
- **Headers:** Security headers configured (CSP, X-Frame-Options, etc.)

---

## 📱 Frontend Structure

```
src/
├── assets/
│   ├── images/          (illustrations, icons, backgrounds)
│   ├── fonts/           (custom fonts)
│   └── styles/          (global styles, variables)
├── components/
│   ├── ui/              (buttons, cards, forms — Vuetify + custom)
│   ├── home/            (homepage sections)
│   ├── layout/          (navbar, footer, shared layouts)
│   └── shared/          (reusable components)
├── pages/               (page-level components for routes)
├── stores/              (Pinia state management)
├── router/              (Vue Router configuration)
├── composables/         (reusable logic hooks)
├── plugins/             (Vue plugins, global config)
├── types/               (TypeScript interfaces)
├── utils/               (helper functions)
└── App.vue              (root component)
```

---

## 🧪 Testing & Quality

### Vitest
**Why:** Fast, modern test runner for Vue 3  
**What:** Unit and component tests  
**Target:** 70%+ code coverage

### ESLint
**Why:** Catch errors before runtime  
**Config:** Popular Vue + TypeScript rules  
**Enforcement:** Pre-commit hook

### Prettier
**Why:** Automatic code formatting  
**Benefit:** No style debates, consistent code

### Pre-commit Hooks (Husky)
**Runs:** Linting and formatting before commit  
**Prevents:** Broken code from being committed

---

## 🚀 Deployment & Hosting

### Frontend Hosting: Vercel or Netlify
**Why:** Optimized for Vue/Next.js apps, automatic deployments  
**Features:**
- Automatic builds from GitHub
- Preview deployments
- CDN distribution
- Serverless functions (if needed)
- Analytics included

### Domain & DNS
- **Domain:** coachellcomputeraid.org (or .com)
- **DNS:** Cloudflare (optional, for extra security/performance)

### SSL/HTTPS
- **Automatic:** Provided by Vercel/Netlify
- **Certificate:** Auto-renewed

### Monitoring
- **Uptime:** Uptime Robot (free tier)
- **Notifications:** Slack/email alerts if site goes down

---

## 🔄 Development Workflow

### Version Control: Git + GitHub
- **Repo:** Private GitHub repo
- **Branches:** main (production), develop (staging), feature branches
- **PRs:** Code review before merging
- **Commits:** Descriptive messages

### Development Environment
- **Node.js:** LTS version (currently 18+)
- **Package Manager:** npm or pnpm
- **Local Dev:** `npm run dev` (Vite dev server)
- **Environment:** Local .env file with API keys

### Production Deployment
- **Build:** `npm run build`
- **Deploy:** Git push to main → Vercel/Netlify auto-deploys
- **Duration:** Typically 2-5 minutes

### Environment Variables
- **Local:** `.env.local` (not in git)
- **Production:** Vercel/Netlify environment variables
- **Key Variables:**
  - Supabase URL
  - Supabase API key
  - Google Analytics ID
  - API endpoints

---

## 📦 Dependencies (Key Packages)

### Core
```json
{
  "vue": "^3.3",
  "typescript": "^5.0",
  "vuetify": "^4.0",
  "pinia": "^2.0",
  "vue-router": "^4.2"
}
```

### Utilities
```json
{
  "vueuse": "^10.0",
  "@vueuse/motion": "^2.0",
  "floating-vue": "^5.0",
  "lottie-web": "^5.10"
}
```

### Build & Dev
```json
{
  "vite": "^4.3",
  "vitest": "^0.34",
  "eslint": "^8.0",
  "prettier": "^3.0",
  "husky": "^8.0"
}
```

---

## 🌐 Browser Support

### Target Browsers
- Chrome 90+ (latest 2 versions)
- Firefox 88+ (latest 2 versions)
- Safari 14+ (latest 2 versions)
- Edge 90+ (latest 2 versions)

### Mobile
- iOS Safari 14+
- Chrome Android 90+

### Approach
- **Progressive Enhancement:** Core works in older browsers
- **Polyfills:** Added for needed features
- **Testing:** Tested on actual devices

---

## 📊 Performance Targets

### Page Load
- **First Paint:** < 1 second
- **Largest Contentful Paint (LCP):** < 2.5 seconds
- **First Input Delay (FID):** < 100ms
- **Cumulative Layout Shift (CLS):** < 0.1

### Bundle Size
- **JavaScript:** < 150KB (gzipped)
- **CSS:** < 30KB (gzipped)
- **Images:** Optimized, lazy-loaded

### SEO
- **Core Web Vitals:** All green
- **PageSpeed Insights:** 90+ score
- **Meta Tags:** Configured
- **Open Graph:** Sharing optimized
- **Sitemap:** Included

---

## 🔗 Integration Points

### Email Service
- **Confirmation emails:** Supabase + SendGrid/Resend
- **Newsletter:** Mailchimp or Supabase
- **Reminders:** Automated via serverless function

### Payment (Phase 3+)
- **Provider:** Stripe or Supabase billing
- **Use:** Pay-What-You-Can processing

### Calendar (Phase 2+)
- **Google Calendar API:** Sync workshop schedules
- **iCal:** Public calendar feeds

### SMS (Optional, Phase 3+)
- **Provider:** Twilio or similar
- **Use:** Appointment reminders

---

## 🔗 Related Documents

- [[Folder-Structure.md|Folder Structure]] — Project organization
- [[Development-Plan.md|Development Plan]] — How to build
- [[../../03-Website-Design/Design-Language.md|Design Language]] — Visual specs
- [[../../01-Project-Foundation/Brand-Bible.md|Brand Bible]] — Brand guidelines

---

**Status:** Technical Architecture  
**Version:** 1.0  
**Last Updated:** July 20, 2026  
**Maintainability:** High (modern stack, well-documented)
