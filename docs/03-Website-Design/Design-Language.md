# Design Language & Visual System

**Complete Specification for Website Visual Consistency**

---

## 🎨 Color System

### Primary Palette
All website colors derive from our [[../../01-Project-Foundation/Brand-Bible.md|Brand Bible]].

| Use | Color | Hex | RGB |
|-----|-------|-----|-----|
| **Background** | Cream | #FDF6EC | 253, 246, 236 |
| **Accent** | Sand | #F8E9D5 | 248, 233, 213 |
| **Primary CTA** | Warm Orange | #F4A259 | 244, 162, 89 |
| **Secondary** | Sky Blue | #78B8D9 | 120, 184, 217 |
| **Tertiary** | Sage Green | #8BAE7B | 139, 174, 123 |
| **Text** | Charcoal | #343434 | 52, 52, 52 |

### Usage Rules
- **Backgrounds**: Cream (#FDF6EC) or white
- **Buttons**: Warm Orange (#F4A259) for primary actions
- **Links**: Sky Blue (#78B8D9) with underline
- **Accents**: Sand (#F8E9D5) for separators, dividers
- **Secondary Buttons**: Sage Green (#8BAE7B) or Charcoal outline
- **Text**: Charcoal (#343434) for all body copy
- **Hover States**: Darker variations of primary colors

### Accessibility
- **Contrast Ratio:** Minimum 4.5:1 for all text
- **WCAG AA:** All color combinations tested and compliant
- **Color Blindness:** Avoid red/green combinations without other indicators
- **Testing:** Use WebAIM contrast checker before launch

---

## 📝 Typography

### Font Families
- **Headlines:** "Archivo" (600–800 weights, Google Fonts) — display headings only
- **Body:** "Nunito Sans" (Google Fonts) — all body copy, UI text, and subheadings
- **Monospace:** "JetBrains Mono" (for code examples)
- **Fallback:** System fonts if web fonts fail

> **Decision (2026-08-14):** Nunito Sans + Archivo confirmed as the canonical
> pairing. This doc previously said Inter/Roboto, but every shipped deliverable
> (Brand Bible HTML, B2 prototype, illustration kit) uses Nunito Sans, and the
> approved B2 "Desert Modernism Warmed" direction adds Archivo for display
> headings.

### Type Scale

| Level | Size | Weight | Line Height | Use |
|-------|------|--------|-------------|-----|
| **H1** | 48px | 700 | 1.2 | Page titles, hero headlines |
| **H2** | 36px | 700 | 1.3 | Section headings |
| **H3** | 28px | 600 | 1.4 | Subsection headings |
| **H4** | 24px | 600 | 1.4 | Card titles (cards nested two levels below an H1 — see note) |
| **Body** | 16px | 400 | 1.6 | Main text content |
| **Small** | 14px | 400 | 1.5 | Captions, labels |
| **Tiny** | 12px | 400 | 1.4 | Footnotes, metadata |

> **Note on card-title heading level (2026-08-16):** The table's "H4 = 24px"
> row is generic guidance and assumes a card is nested two levels below the
> page H1 (e.g., H1 > H2 section > H3 subsection > H4 card). Where a card
> grid sits *directly* inside a homepage section's H2 (no intervening H3),
> the card title should be an H3 to avoid skipping a heading level — and at
> that shallower nesting depth, 20px/700 is the correct size/weight, not
> 24px/600. This is what's actually implemented for the Who We Help section
> cards (`AudienceCard.vue`, `<h3>` at 20px/700, directly under the section's
> `<h2>`), matching the section-specific spec in
> [[Homepage/Sections.md|Homepage Sections]]. Use judgment on nesting depth
> per section rather than reading H4/24px as a universal rule for all card
> titles.

### Responsive Typography
- **Mobile (320px):** Scale down to 14px body, 36px H1
- **Tablet (768px):** 16px body, 42px H1
- **Desktop (1024px+):** Full scale (see above)

### Text Properties
- **Letter Spacing:** Normal (no extra spacing that makes reading harder)
- **Word Spacing:** Normal
- **Paragraph Spacing:** 24px between paragraphs
- **Font Feature:** Ligatures enabled (nicer "fi", "fl")
- **Kerning:** Automatic

---

## 🔲 Spacing & Layout

### Spacing Scale
```
4px    (minimum)
8px    (xs)
12px   (sm)
16px   (base)
24px   (lg)
32px   (xl)
48px   (2xl)
64px   (3xl)
```

### Container & Gutters
- **Max Width:** 1200px (desktop)
- **Gutter (sides):** 16px (mobile), 24px (tablet), 48px (desktop)
- **Section Padding:** 32px top/bottom (mobile), 64px (desktop)
- **Card Padding:** 24px (mobile), 32px (desktop)

### Grid System
- **Mobile:** 1 column
- **Tablet:** 2 columns
- **Desktop:** 3-4 columns
- **Gap:** 16px between columns

---

## 🎨 Component Styles

### Buttons
- **Primary:** Warm Orange (#F4A259) background, white text, rounded 8px
- **Secondary:** White background, Charcoal (#343434) text, 2px border, rounded 8px
- **Sizes:** Small (40px), Default (48px), Large (56px)
- **Hover:** 10% darker background
- **Active:** 20% darker background
- **Disabled:** 50% opacity
- **Min Width:** 48px × 48px (touch-friendly)

### Cards
- **Background:** White (#FFFFFF)
- **Border:** 1px Clay (#B95E23) — *Decision (2026-08-16):* Sand (#F8E9D5) was the original spec, but it measures only ~1.1–1.2:1 contrast against both the white card and cream page background (effectively invisible), failing WCAG 1.4.11's 3:1 non-text minimum. Clay measures 4.48:1 on white and is the canonical replacement, first shipped in `AudienceCard.vue`.
- **Border Radius:** 12px
- **Shadow:** 0px 4px 12px rgba(0,0,0,0.08)
- **Hover Shadow:** 0px 8px 20px rgba(0,0,0,0.12)
- **Padding:** 24px

### Forms
- **Input Background:** #FAFAFA
- **Input Border:** 1px #E0E0E0
- **Focus Border:** 2px Sky Blue (#78B8D9)
- **Label Font:** 14px, 600 weight, Charcoal
- **Helper Text:** 12px, #666666
- **Error State:** Red (#DC3545)
- **Border Radius:** 6px
- **Padding:** 12px 16px

### Navigation
- **Height:** 72px (desktop), 56px (mobile)
- **Background:** White with subtle shadow
- **Link Color:** Charcoal (#343434)
- **Active Link:** Warm Orange (#F4A259) underline
- **Hover:** Background changes to Sand (#F8E9D5)

---

## 🖼️ Images & Illustrations

### Hero Images
- **Aspect Ratio:** 16:9 (desktop), 1:1 (mobile)
- **Format:** WebP (with PNG/JPG fallback)
- **Compression:** Optimized for web (< 200KB)
- **Max Size:** 1920×1440px

### Illustrations
- **Style:** Per [[../../04-Visual-System/Illustration-Strategy.md|Illustration Strategy]]
- **Colors:** Only brand palette colors
- **Format:** SVG (preferred) or WebP
- **Size:** Responsive, scales with container

### Photography
- **Filter:** Slight warmth filter (match brand warmth)
- **No:** Stock photo feeling, harsh shadows, cold tones
- **Style:** Real people, real moments, warm lighting
- **Format:** WebP with fallback

---

## 🎬 Animations & Transitions

### Timing
- **Quick Feedback:** 200ms (buttons, hovers)
- **Section Transitions:** 400ms (fade-in on scroll)
- **Page Transitions:** 300ms (smooth fade)
- **Delay:** 0ms (no unnecessary waiting)

### Easing
- **Standard:** `cubic-bezier(0.4, 0, 0.2, 1)` (ease in-out)
- **Entrance:** `cubic-bezier(0, 0, 0.2, 1)` (ease out)
- **Exit:** `cubic-bezier(0.4, 0, 1, 1)` (ease in)

### Animations
- **Scroll Reveal:** Fade-in + slight slide up when section comes into view
- **Button Hover:** Background color transition
- **Link Hover:** Color change + subtle underline animation
- **Page Load:** Header and sections stagger-animate in

### Performance
- **Use:** CSS animations, not JavaScript when possible
- **Avoid:** Animations on scroll for performance
- **Consider:** Reduced motion preference (`prefers-reduced-motion`)

---

## ♿ Accessibility Standards

### WCAG AA Compliance
- **Color Contrast:** Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus Indicators:** Always visible, high contrast
- **Keyboard Navigation:** All features accessible via keyboard
- **Screen Reader:** Semantic HTML, ARIA labels where needed
- **Skip Links:** Jump to main content option

### Text & Readability
- **Minimum Font Size:** 14px (body copy, never smaller)
- **Maximum Line Width:** 75 characters (optimal reading)
- **Line Height:** Minimum 1.5 (generous spacing)
- **Color:** Always sufficient contrast
- **Alternative Text:** All images have descriptive alt text

### Interactive Elements
- **Buttons:** Minimum 48×48px touch target
- **Links:** Underlined or color-differentiated
- **Forms:** Labeled inputs, error messages clear
- **Time Limits:** No auto-dismissing content
- **Flashing:** Never (seizure risk)

### Testing
- **Automated:** WAVE, Axe, Lighthouse
- **Manual:** Keyboard navigation, screen reader testing
- **User Testing:** Real seniors using the site
- **Quarterly:** Full accessibility audit

---

## 📱 Responsive Behavior

### Breakpoints
```
Mobile:    320px – 767px
Tablet:    768px – 1023px
Desktop:   1024px+
```

### Mobile-First Approach
- Design for mobile first
- Layer in enhancements for larger screens
- Touch-friendly (minimum 48px targets)
- Simplified navigation (hamburger menu)
- Full-width sections

### Tablet
- Two-column layouts where appropriate
- Larger spacing
- More visible navigation
- Optimized touch targets (still 48px+)

### Desktop
- Full three-to-four column layouts
- Generous spacing and breathing room
- All features visible
- Hover states available

---

## 🌙 Dark Mode (Optional)

If implemented:
- **Background:** #1A1A1A (very dark, not pure black)
- **Text:** #F0F0F0 (very light gray, not pure white)
- **Cards:** #252525 with subtle borders
- **Accent:** Same warm colors (F4A259 orange) but may need opacity adjustment
- **Contrast:** Maintain 4.5:1 minimum

*Note: Given our warm, welcoming aesthetic, dark mode may not align with brand. Test with users before implementing.*

---

## 📊 Component Library

### Core Components (Vuetify)
- Button
- Card
- Input
- Select
- Checkbox
- Radio
- Textarea
- Alert
- Badge
- Chip
- Divider
- Icon
- Image
- Link
- List
- Menu
- Modal
- Pagination
- Tabs
- Tooltip

### Custom Components
- Hero Section
- Feature Block
- Testimonial Card
- Service Card
- Workshop Card
- Pricing Slider
- Survey Component
- Newsletter Signup

---

## 🔗 Related Documents

- [[../../01-Project-Foundation/Brand-Bible.md|Brand Bible]] — Color palette, typography, brand
- [[Website-Strategy.md|Website Strategy]] — Tone and principles
- [[../../04-Visual-System/Illustration-Strategy.md|Illustration Strategy]] — Image usage
- [[../../05-Technical/Tech-Stack.md|Tech Stack]] — Implementation details

---

**Status:** Design Language Active  
**Compliance:** WCAG AA  
**Last Updated:** August 16, 2026
