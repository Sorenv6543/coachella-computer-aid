# Coachella Computer Aid — Project Hub

**Community Technology Platform | Brand Ecosystem | Nonprofit Initiative**

---

## 🎯 Quick Navigation

Welcome! This vault contains all documentation for building Coachella Computer Aid—a comprehensive technology education platform for underserved communities in the Coachella Valley.

### 📚 Main Sections

#### **[01-Project-Foundation](01-Project-Foundation/README.md)**
- **[Brand Bible](01-Project-Foundation/Brand-Bible.md)** — Mission, vision, values, brand personality, voice guidelines
- **[Mission & Vision](01-Project-Foundation/Mission-Vision-Values.md)** — Core purpose and long-term goals
- **[Project Overview](01-Project-Foundation/Project-Overview.md)** — High-level summary and approach

#### **[02-Strategy](02-Strategy/README.md)**
- **[Community Outreach](02-Strategy/Community-Outreach-Strategy.md)** — Services, workshops, and outreach channels
- **[Business Model](02-Strategy/Business-Model.md)** *(Coming)* — Pay-what-you-can model, sustainability
- **[Long-Term Roadmap](02-Strategy/Long-Term-Roadmap.md)** — Phases 1–5 and growth strategy

#### **[03-Website-Design](03-Website-Design/README.md)**
- **[Design Language](03-Website-Design/Design-Language.md)** — Visual principles, accessibility, tone
- **[Website Strategy](03-Website-Design/Website-Strategy.md)** — Content strategy and user experience
- **[Website Experience & Implementation Vision](03-Website-Design/Website-Experience-Vision.md)** — Guiding principles for building the experience
- **[Website Roadmap](03-Website-Design/Website-Roadmap.md)** — Feature phases and rollout plan
- **[Homepage Blueprint](03-Website-Design/Homepage/)** — Detailed homepage sections and features
  - [[Homepage/Sections.md|Sections]] — Hero, Mission, Services, etc. (Navbar, Hero, Mission, Who We Help & Services now built)
  - [[Homepage/Features.md|Features]] *(Coming)* — Interactive elements and user stories
  - [[Homepage/User-Stories.md|User Stories]] *(Coming)* — Feature requirements by audience

#### **[04-Visual-System](04-Visual-System/README.md)**
- **[Illustration Strategy](04-Visual-System/Illustration-Strategy.md)** — Philosophy, approach, and asset roadmap
- **[Character Placement Guide](04-Visual-System/Character-Placement-Guide.md)** — Robert, Maria, Ana, David, Helen, Carlos usage
- **[Illustration Catalog](06-Assets/Illustration-Catalog.md)** — Complete specifications for all illustrations
- **[Icon Specifications](06-Assets/Icon-Specifications.md)** — 150+ icon library and design specs
- **[Background Assets](06-Assets/Background-Assets.md)** — Mountain scenes, locations, environments

#### **[05-Technical](05-Technical/README.md)**
- **[Tech Stack](05-Technical/Tech-Stack.md)** — Vue 3, TypeScript, Vite, Vuetify, Supabase, etc.
- **[Architecture Reference](06-Assets/Architecture-Reference.md)** — Actual `src/` folder structure (supersedes the old "Folder Structure (Coming)" placeholder)
- **[Development Plan](05-Technical/Development-Plan.md)** *(Coming)* — Implementation strategy and best practices

#### **[06-Assets](06-Assets/README.md)**
- Illustrations
- Icons  
- Backgrounds
- Component previews
- Brand assets

---

## 📖 How to Use This Vault

### For Claude (AI Assistant)
- Start with **[Brand Bible](01-Project-Foundation/Brand-Bible.md)** for project context
- Review **[Design Language](03-Website-Design/Design-Language.md)** before creating visual content
- Check **[Illustration Strategy](04-Visual-System/Illustration-Strategy.md)** and **[Character Placement Guide](04-Visual-System/Character-Placement-Guide.md)** for character/visual consistency
- Reference **[Illustration Catalog](06-Assets/Illustration-Catalog.md)** for detailed asset specifications
- Explore **[Icon Specifications](06-Assets/Icon-Specifications.md)** and **[Background Assets](06-Assets/Background-Assets.md)** for visual assets
- Check **[Tech Stack](05-Technical/Tech-Stack.md)** for development guidance
- Use **[Community Outreach](02-Strategy/Community-Outreach-Strategy.md)** for content understanding

### For Content Writers
- Read the **[Brand Bible](01-Project-Foundation/Brand-Bible.md)** first (especially voice/tone)
- Reference **[Design Language](03-Website-Design/Design-Language.md)** for principles
- Use **[Community Outreach](02-Strategy/Community-Outreach-Strategy.md)** for service descriptions

### For Designers
- Start with **[Design Language](03-Website-Design/Design-Language.md)**
- Review **[Illustration Strategy](04-Visual-System/Illustration-Strategy.md)** and **[Character Placement Guide](04-Visual-System/Character-Placement-Guide.md)**
- Study **[Illustration Catalog](06-Assets/Illustration-Catalog.md)**, **[Icon Specifications](06-Assets/Icon-Specifications.md)**, and **[Background Assets](06-Assets/Background-Assets.md)**
- Check **[Homepage Blueprint](03-Website-Design/Homepage/Sections.md)** for layout requirements

### For Developers
- Read **[Tech Stack](05-Technical/Tech-Stack.md)** first
- Review **[Architecture Reference](06-Assets/Architecture-Reference.md)** for the actual `src/` layout (the app is scaffolded and buildable — `npm run dev`/`build`/`test` all work)
- Follow **[Development Plan](05-Technical/Development-Plan.md)** *(Coming)*
- Reference **[Design Language](03-Website-Design/Design-Language.md)** for component requirements

---

## 🚀 Current Phase

**Phase 1: Foundation**

- ✅ Brand Bible (mission, voice, colors, values)
- ✅ Design Language (visual principles, tone)
- 🔄 Visual System (illustration library, characters, backgrounds)
- 🔄 Vuetify Design System (theme, components)
- 🔄 Homepage Blueprint (sections, wireframes) — Navbar, Hero, Mission, Who We Help, and Services are built (copy-reviewed EN/ES, accessibility-audited PASS); remaining sections still planned

**Now in Development:** The Vue 3 + Vuetify 4 app is scaffolded and buildable. First five components shipped: `AppNavbar.vue`, `HeroSection.vue`, `MissionSection.vue`, `WhoWeHelpSection.vue` (with `AudienceCard.vue`), and `ServicesSection.vue` (with `ServiceCard.vue`), wired into the homepage — 5 of 7 MVP sections built.

**Next:** Remaining homepage sections (CTA, Footer) → Component Library → Full site

---

## 📋 Quick Reference

| Aspect | Document |
|--------|----------|
| **What is CCA?** | [[01-Project-Foundation/Brand-Bible.md\|Brand Bible]] |
| **Who do we serve?** | [[02-Strategy/Community-Outreach-Strategy.md\|Outreach Strategy]] |
| **What's the timeline?** | [[02-Strategy/Long-Term-Roadmap.md\|Long-Term Roadmap]] |
| **Website feel & approach** | [[03-Website-Design/Website-Experience-Vision.md\|Experience Vision]] |
| **Website content strategy** | [[03-Website-Design/Website-Strategy.md\|Website Strategy]] |
| **Website visual specs** | [[03-Website-Design/Design-Language.md\|Design Language]] |
| **Illustration strategy** | [[04-Visual-System/Illustration-Strategy.md\|Illustration Strategy]] |
| **Character usage** | [[04-Visual-System/Character-Placement-Guide.md\|Character Placement]] |
| **Illustration specifications** | [[06-Assets/Illustration-Catalog.md\|Illustration Catalog]] |
| **Icon library** | [[06-Assets/Icon-Specifications.md\|Icon Specifications]] |
| **Background specs** | [[06-Assets/Background-Assets.md\|Background Assets]] |
| **Source code structure** | [[06-Assets/Architecture-Reference.md\|Architecture Reference]] |
| **What tech do we use?** | [[05-Technical/Tech-Stack.md\|Tech Stack]] |
| **How do we build it?** | [[05-Technical/Development-Plan.md\|Development Plan]] *(Coming)* |

---

## 🎨 Project DNA

**Organization:** Coachella Computer Aid  
**Tagline:** Personalized Technology Help for Everyone  
**Type:** Nonprofit | Technology Education | Community Platform  
**Stage:** Foundation (Brand & Design System)  
**Vision:** Make technology accessible, understandable, and less intimidating for everyone

**Brand Inspiration:** Apple + National Park Service + Public Library + Local Nonprofit + Google Illustrations

---

## 📚 Important: Claude Has Vuetify MCP Access!

**When you ask Claude to build components**, it has live access to Vuetify documentation.

This means:
- ✅ Ask about Vuetify component APIs and get real-time answers
- ✅ Request component examples with current best practices
- ✅ Get style/customization guidance from actual docs
- ✅ No searching needed — Claude looks it up

**Example:** "How do I customize the VCard component's colors using our brand palette?"
Claude can provide current, accurate answers with live documentation.

See [[05-Technical/Tech-Stack.md|Tech Stack]] for details.

---

## 📞 Key Contacts & Resources

- **Outreach Partners:** Senior Centers, Libraries, Churches, Community Centers, Schools
- **Target Audiences:** Seniors, People with Disabilities, Spanish-speaking Families, Veterans, Low-income Families
- **Services:** Learn, Stay Connected, Stay Safe, Device Support, Workshops, Remote Assistance

---

## 💡 Design Principles

Every decision should pass these questions:
- ✅ Is it easy to read?
- ✅ Would an 80-year-old understand it?
- ✅ Is it warm and welcoming?
- ✅ Does it reduce anxiety?
- ✅ Does it build trust?

---

## 📝 Notes for Future Contributors

This vault is organized to be:
- **Self-documenting** — All decisions are explained
- **Scalable** — Easy to add new sections as the project grows
- **Consistent** — All sections reference the Brand Bible
- **Discoverable** — Clear navigation and cross-references
- **AI-friendly** — Claude can understand context quickly

When adding new documentation, place it in the appropriate folder and update the relevant README with a link.

---

**Last Updated:** August 16, 2026  
**Maintained By:** Soren (Coachella Computer Aid)  
**Status:** Active Development — Phase 1: Foundation (Navbar + Hero + Mission + Who We Help + Services built)
