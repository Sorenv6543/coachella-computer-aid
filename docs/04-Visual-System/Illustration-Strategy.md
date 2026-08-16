# Illustration Strategy

**Building Illustrations as a Core Brand Asset**

---

## 🎨 Core Philosophy

Your illustrations are more than decorative elements—they're a brand asset that creates recognition and trust.

Rather than generating images ad hoc, we establish a consistent visual language where every future image reinforces the CCA identity:

- **Same warm color palette** — instantly recognizable
- **Same soft, rounded illustration style** — approachable, modern
- **Same recurring characters** — build familiarity over time
- **Same Coachella Valley aesthetic** — local, relevant, grounded
- **Same accessible, uncluttered compositions** — clear and welcoming

Over time, this creates a recognizable identity that people associate with your organization.

---

## 📚 Building a Complete Illustration Library

Rather than creating illustrations only as we need them, the goal is a complete illustration library—**300+ coordinated illustrations** across characters, heroes, services, icons, backgrounds, devices, and marketing (see `tools/illustrations/manifest.json` and [[../../tools/illustrations/README.md|Illustration Pipeline]])—before launch.

### Why This Approach?

One unified visual identity provides:

- ✅ **Homepage** — Hero, mission, audience cards, services, testimonials
- ✅ **Service Pages** — Service-specific illustrations
- ✅ **Workshops** — Location illustrations, community learning
- ✅ **Guides & Resources** — PDFs, tutorials, how-to content
- ✅ **Forms** — Input guidance, confirmation states
- ✅ **Blog & Articles** — Header images, topic illustrations
- ✅ **Social Media** — Posts, stories, promotional content
- ✅ **Flyers & Presentations** — Printed materials
- ✅ **Future Mobile Apps** — App interfaces and features
- ✅ **Marketing** — Ads, announcements, campaigns

The entire organization looks professionally designed rather than assembled from unrelated artwork.

---

## 🎯 Illustration Categories

See [[../06-Assets/Illustration-Catalog.md|Illustration Catalog]] for detailed specifications by category.

### Core Categories

| Category | Purpose | Count |
|----------|---------|-------|
| **Characters** | Recurring people, varied scenarios | 15–20 |
| **Hero** | Homepage and page headers | 5–8 |
| **Service** | One per service offering | 11 |
| **Audience** | One per audience segment | 6 |
| **Icon** | Custom icons for UI and navigation | 150+ |
| **Background** | Scene settings and locations | 10–15 |
| **Device** | Computers, phones, tablets in use | 8–10 |
| **UI** | Forms, buttons, interaction states | 8–10 |
| **Workshop** | Training and community events | 6–8 |
| **Community** | People together, group activities | 5–8 |

---

## ✨ Visual Consistency Principles

### Color Palette
- **Only brand palette colors:** Cream, sand, orange, sky blue, sage green, charcoal
- No external colors added
- Warm, inviting tones throughout
- [[../../01-Project-Foundation/Brand-Bible.md#color-palette|See Brand Bible for exact hex codes]]

### Style
- **Flat vector illustration** — no photorealism
- **Rounded, soft shapes** — approachable, friendly
- **Warm golden lighting** — never cold or harsh tones
- **Accessible compositions** — clear visual hierarchy
- **No baked-in text or logos** — keeps illustrations flexible

### Characters
See [[Character-Placement-Guide.md|Character Placement Guide]] for detailed usage.

Six recurring characters appear throughout:
- **Robert** — 72, retired teacher, blue cardigan, glasses, silver hair
- **Maria** — 68, orange cardigan, brown bun
- **Helen** — 76, sage cardigan, silver hair
- **Carlos** — Veteran, sage shirt, grey mustache
- **Ana** — 28, volunteer, orange top, dark ponytail, backpack
- **David** — Wheelchair user, sky-blue shirt, headset, glasses

These characters create visual continuity and help users see themselves in CCA's work.

### Locations & Context
- **San Jacinto Mountains** — local landmark, recognizable backdrop
- **Desert landscaping** — relevant to Coachella Valley
- **Bright blue skies** — optimistic, warm
- **Local settings** — libraries, senior centers, community centers, homes, coffee shops
- **Real-world technology** — computers, phones, tablets as users actually interact with them

---

## 📋 Illustration Workflow

See [[../../tools/illustrations/README.md|Illustration Pipeline]] for technical workflow details.

### Process Overview

1. **Manifest** — Catalog of all needed illustrations (300+ items)
2. **Prompts** — Generate prompts for each item (style-locked)
3. **Generation** — Batch-generate via Gemini API with reference images
4. **Review** — Pick best candidate for each item
5. **Export** — Apply picks, copy to `src/assets/images/illustrations/`
6. **Reconcile** — Verify all items are exported and status is current

### Consistency Through Reference Images

When regenerating character art:
- Each character's `-character-sheet.png` is attached as a reference
- For pairs/group shots, every character's sheet is attached
- This ensures new generations stay visually consistent with approved sheets
- Use `--only <ids> --force` to regenerate specific slots while keeping others

---

## 🎯 Success Metrics

### Visual
- [ ] All illustrations share the same color palette
- [ ] Character appearances consistent across contexts
- [ ] Illustrations feel cohesive as a system
- [ ] No jarring style shifts between categories
- [ ] Local context clear (San Jacinto Mountains, desert, etc.)

### Coverage
- [ ] Every page/section has illustration
- [ ] Service pages have dedicated illustrations
- [ ] Workshop types all illustrated
- [ ] Community activities shown
- [ ] Device usage variety shown
- [ ] Character diversity visible

### Impact
- [ ] Users can recognize CCA illustrations immediately
- [ ] Illustrations feel trustworthy and approachable
- [ ] Seniors see people who look like them
- [ ] Disabilities represented respectfully
- [ ] Diverse ethnicities visible throughout

---

## 🔗 Related Documents

- [[../06-Assets/Illustration-Catalog.md|Illustration Catalog]] — Complete specifications by category
- [[Character-Placement-Guide.md|Character Placement Guide]] — How/where to use recurring characters
- [[../06-Assets/Icon-Specifications.md|Icon Specifications]] — Custom icon requirements
- [[../../01-Project-Foundation/Brand-Bible.md|Brand Bible]] — Color palette and brand identity
- [[../../tools/illustrations/README.md|Illustration Pipeline]] — Technical generation workflow

---

**Status:** Strategy Phase  
**Last Updated:** August 15, 2026
