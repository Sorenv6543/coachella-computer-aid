# Homepage Sections — Detailed Specifications

**One Long Storytelling Experience**

---

## 📋 Homepage Flow

The homepage is structured as a continuous story that guides visitors from awareness → understanding → trust → action.

---

## 1️⃣ Navbar

**Status:** ✅ Built — `src/components/shared/AppNavbar.vue`

**Purpose:** Navigation and branding throughout the site

### Desktop Version
- Left: Logo + "Coachella Computer Aid" text
- Center: Navigation links (Home, Services, Workshops, Resources, Community, Contact)
- Right: Language toggle (English/Spanish), CTA button "Get Help Today"
- Sticky: Stays at top when scrolling

### Mobile Version
- Left: Logo
- Center: Empty
- Right: Hamburger menu icon + Language toggle
- Menu Contents: All navigation links + CTA button

### Colors & Style
- Background: White (#FFFFFF) with subtle shadow
- Text: Charcoal (#343434)
- Active Link: Warm Orange (#F4A259) underline
- CTA Button: Warm Orange background, white text

### Components Needed
- Navbar wrapper
- Logo component
- Navigation menu (desktop)
- Mobile drawer menu
- Language toggle
- CTA button

---

## 2️⃣ Hero Section

**Status:** ✅ Built — `src/components/home/Hero/HeroSection.vue`

**Purpose:** Emotional hook — "I can get help here"

### Visual
- **Full screen height** on desktop, tall on mobile
- **Background:** Large illustration of happy seniors using technology
- OR: San Jacinto Mountains with warm glow
- **Overlay:** Subtle gradient (warm orange/transparent)

### Text Content
**Headline:** (48px, bold, orange accent)
> Tech Help for Seniors

**Subheadline:** (28px, semi-bold)
> Patient, Friendly Technology Support in the Coachella Valley

**Body Copy:** (16px, charcoal)
> Technology should make life easier—not more confusing. We're here to help you learn at your pace.

### CTAs
- **Primary Button:** "Get Help Today" (large, warm orange, prominent)
- **Secondary Button:** "Explore Services" (white with charcoal outline)

### Responsive
- **Desktop:** Side-by-side (illustration left, text right) OR illustration as background
- **Mobile:** Stacked (image top, text below)
- **Spacing:** 64px padding top/bottom

### Illustration
- Characters: Mix of ages, abilities, smiling
- Activity: Using phones, tablets, video calling
- Warmth: Sunset lighting, comfortable setting

---

## 3️⃣ Mission Section

**Status:** ✅ Built — `src/components/home/Mission/MissionSection.vue`

**Purpose:** Build trust by explaining why we exist

### Layout
- Full width
- Centered content (max 800px)
- Background: Cream (#FDF6EC)

### Content
**Headline:** (36px, bold)
> Our Mission

**Quote:** (20px, italic, warm orange)
> "Technology should connect people, not leave them behind."

**Body:** (16px)
> We believe everyone deserves access to technology regardless of age, disability, language, income, or experience. We provide patient, compassionate technology support so you can confidently participate in today's connected world.

### Visual
- Large illustration: Diverse group of people, mixed ages, helping each other
- Warm colors
- Inclusive representation

### Components
- Heading
- Text block
- Illustration
- Optional: Core values as icons below

---

## 4️⃣ Who We Help Section

**Status:** ✅ Built — `src/components/home/Audience/WhoWeHelpSection.vue` + `AudienceCard.vue`

**Purpose:** Help visitors see themselves in the message

### Layout
- 3 columns (desktop), 1 column (mobile)
- Card-based design
- Gap: 24px

### Six Audience Cards
Each card includes:
- **Icon or small illustration**
- **Title:** (20px, bold)
- **Description:** (16px — matches [[../Design-Language.md|Design Language]]'s general Body row; kept at the 16px floor rather than a smaller caption size for readability with CCA's older/low-vision audience, confirmed correct by accessibility audit)
- Example: "Seniors learning video calls"

### Audiences
1. **Senior Citizens** — Stay connected, avoid scams, learn comfortably
2. **People with Disabilities** — Accessible technology, adaptive tools
3. **Spanish-Speaking Families** — Bilingual support, cultural relevance
4. **Veterans** — Benefits access, healthcare tech
5. **Low-Income Families** — Affordable help, donated resources
6. **Anyone Needing Help** — Technology shouldn't require expertise

### Visual
- Icon or small illustration per card
- Warm colors (use palette)
- Character representation

### Components
- Card component (custom)
- Icon/illustration
- Text content

---

## 5️⃣ Services Section

**Purpose:** Explain what we do (in human terms, not technical)

### Layout
- 3-4 columns (desktop), 1 column (mobile)
- Organized by goals, not technology

### Four Main Services

**1. Learn Technology**
- Description: One-on-one teaching at your pace
- Examples: Phone basics, computer fundamentals, internet safety
- Icon: Graduation cap or light bulb

**2. Stay Connected**
- Description: Help you connect with loved ones
- Examples: Video calls, email, social media
- Icon: Heart or connection symbol

**3. Stay Safe**
- Description: Protect yourself from scams and fraud
- Examples: Password protection, phishing awareness, identity theft prevention
- Icon: Shield

**4. Device Support**
- Description: Help when your devices need fixing
- Examples: Wi-Fi troubleshooting, virus removal, printer setup
- Icon: Device or tools

### Additional Services
- Remote Assistance
- Workshops & Group Training
- Internet Access Resources

### Visual
- Icon per service (custom or from icon library)
- Illustration or photograph per service
- Warm, inviting presentation

### Components
- Service card (custom component)
- Icons
- Descriptions

---

## 6️⃣ How It Works Section

**Purpose:** Reduce anxiety by explaining the process

### Layout
- 3-4 steps
- Connected flow (arrows or lines between steps)
- Numbered or icon-based progression

### Four Steps

**Step 1: Contact Us**
> Call, fill out a form, or visit us in person. No complicated process.

**Step 2: We Listen**
> We ask about what you're trying to learn and what makes you comfortable.

**Step 3: We Teach**
> Patient, judgment-free help at your pace. We explain clearly.

**Step 4: You Succeed**
> Learn skills you can use forever. Feel confident with your devices.

### Visual
- Simple, connected flow
- Icons or illustrations per step
- Warm, encouraging tone

### Components
- Step container
- Step cards
- Flow connector (lines/arrows)
- Illustrations

---

## 7️⃣ Pay What You Can Section

**Purpose:** Remove financial barriers and build community

### Layout
- Full width
- Centered content
- Background: Cream (#FDF6EC) or white

### Content
**Headline:** (36px, bold, orange)
> Everyone Deserves Help

**Subheading:** (18px)
> Pay What You Can

**Explanation:** (16px)
> Technology shouldn't be a luxury. Here's how our community-supported model works:

**Slider Interactive Component:**
- Range: $0–$75
- Default: $0 (showing true availability)
- Visual feedback (changes color as they move)
- Display: "$ 0 per session" (updates with slider)

**Supporting Text:**
> If you're able to contribute to support our mission, thank you. If not, we're still here to help. This is community care, not charity.

### Visual
- Clean, inviting design
- No judgment whatsoever
- Warm colors
- Optional: Photo of diverse group smiling

### Components
- Slider component (custom)
- Heading
- Text blocks
- Optional: Payment button (for those ready to book)

---

## 8️⃣ Community Workshops Section

**Purpose:** Show upcoming learning opportunities

### Layout
- 2-3 columns (desktop), 1 column (mobile)
- Card-based
- Filter by location (optional)

### Content
Each workshop card shows:
- **Date:** Month, day, time
- **Title:** Workshop name
- **Location:** Where it's held
- **Description:** 1-2 sentences
- **CTA Button:** "Learn More" or "Register"

### Example Workshops
- Senior Tech Mondays (Library)
- Smartphone Basics (Senior Center)
- Scam Awareness (Church)
- Video Calling Class (Community Center)

### Visual
- Event icon
- Location indicator
- Date/time clear
- Responsive cards

### Components
- Workshop card (custom)
- Calendar icon
- Location icon
- Registration button

---

## 9️⃣ Testimonials Section

**Purpose:** Social proof — "Real people are being helped"

### Layout
- Carousel (desktop), stacked (mobile)
- 2-3 testimonials visible
- Auto-advance (optional)

### Content Per Testimonial
- **Quote:** (18px, italic) — Person's own words
- **Name:** (14px, bold) — First name only (optional last initial)
- **Situation:** (12px) — "Senior from Palm Springs"
- **Photo:** Headshot or avatar (circular, 80px)
- **Icon:** (⭐⭐⭐⭐⭐) — 5 stars

### Example Testimonials
> "I never thought I could learn video calling, but they made it so easy. Now I see my grandkids every day!"  
> — Robert, 72

> "They explained things in a way I actually understood. No judgment."  
> — Maria, 68

### Visual
- Warm, genuine photos (or illustrations if photos unavailable)
- Diverse representation (ages, abilities, backgrounds)
- Large quote mark background (decorative)
- Star ratings

### Components
- Testimonial card (custom)
- Carousel/slider
- Star rating
- Photo component

---

## 🔟 Community Survey / Call To Action

**Purpose:** Involve community in shaping services

### Layout
- Full width
- Cream or sand background
- Centered content

### Content
**Headline:** (36px, bold)
> Help Shape Technology Support in the Coachella Valley

**Description:** (16px)
> Most nonprofits don't ask their community what they need. We do. Your feedback helps us build better programs.

**Survey Form:**
- 3-5 quick questions
- Focus on: What services are most needed?
- Short free-response option
- Email optional (for follow-up)

**Examples:**
- What technology topics interest you?
- What barriers prevent you from getting help?
- Would you be interested in workshops?

### CTA
- **Button:** "Take the 2-Minute Survey"
- **Alternative:** "Share Your Ideas" (email form)

### Visual
- Warm, inviting design
- Community photos (if available)
- Illustration: Diverse group contributing

### Components
- Survey form (custom or Typeform embed)
- Heading
- Description
- Submit button

---

## 1️⃣1️⃣ Call To Action Section

**Purpose:** Final push to get help

### Layout
- Full width
- Warm orange background (#F4A259)
- White text
- Centered content

### Content
**Headline:** (42px, bold, white)
> Ready to Get Started?

**Description:** (18px, white)
> Don't wait. Technology help is just a message or call away.

**CTAs:**
- **Primary Button:** "Get Help Today" (white background, orange text)
- **Or:** "Call us at (760) XXX-XXXX"
- **Or:** "Fill out this form"

### Visual
- Warm orange background
- Optional: Subtle illustration or gradient
- Clean, simple design
- Urgency without pressure

### Components
- Heading
- Description
- Large CTA button
- Phone number link

---

## 1️⃣2️⃣ Footer

**Purpose:** Navigation, contact, trust signals, legal

### Layout
- 3-4 columns (desktop), stacked (mobile)
- Dark background (charcoal or dark sand)

### Columns
1. **About**
   - Logo
   - Tagline
   - "Nonprofit helping the Coachella Valley"

2. **Quick Links**
   - Home
   - Services
   - Workshops
   - Resources
   - Contact

3. **Contact**
   - Phone
   - Email
   - Address (if any)
   - Hours

4. **Follow Us**
   - Facebook
   - YouTube
   - Email Newsletter signup
   - Social media icons

### Legal
- Copyright
- Privacy Policy
- Terms of Service
- Accessibility Statement

### Visual
- Dark background (Charcoal #343434 or similar)
- Light text (white or light sand)
- Icons for social media
- Responsive layout

### Components
- Footer container
- Column layout
- Link groups
- Social icons
- Newsletter signup form

---

## 🎯 Key Design Principles (Across All Sections)

✅ **Large, readable text** — No one squinting  
✅ **Warm colors** — Inviting, not clinical  
✅ **Diverse representation** — Everyone sees themselves  
✅ **Lots of white space** — Breathing room, not cluttered  
✅ **Clear CTAs** — Easy to know what to do next  
✅ **Mobile-first** — Perfect on phones  
✅ **Accessible** — Works for everyone  
✅ **Authentic photos/illustrations** — Real people, real stories  
✅ **Reduced jargon** — Plain language everywhere  
✅ **Emotional connection** — Not just information, feelings matter  

---

## 📊 Section Priority Ranking

### MVP (Must Have For Launch)
1. Navbar ✅ Built
2. Hero ✅ Built
3. Mission ✅ Built
4. Who We Help ✅ Built
5. Services
6. CTA
7. Footer

### Phase 2 (Add Soon After)
8. How It Works
9. Pay What You Can
10. Workshops

### Phase 3+ (Later Enhancements)
11. Testimonials
12. Survey

---

## 🔗 Related Documents

- [[../Design-Language.md|Design Language]] — Colors, typography, components
- [[../Website-Strategy.md|Website Strategy]] — Overall approach
- [[../../04-Visual-System/Character-Placement-Guide.md|Characters]] — Who appears in illustrations
- [[../../01-Project-Foundation/Brand-Bible.md|Brand Bible]] — Brand guidelines

---

**Status:** Homepage Specifications — Navbar, Hero, Mission & Who We Help built  
**Last Updated:** August 16, 2026
