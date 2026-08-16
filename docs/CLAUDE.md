# Claude's Guide to Coachella Computer Aid

This file is for Claude (the AI assistant). It explains how to work on this project effectively.

## 🎯 TL;DR

When you're asked to work on CCA:

1. **Ask:** "Which part of the project?"
2. **Read:** Go to [[README.md|main README]], find the section
3. **Reference:** Read the relevant docs (they're cross-linked)
4. **Build:** Create with full context of brand, design, tech specs

## 📍 Navigation

### Start Here
- [[README.md|Master README]] — Hub for everything

### By Task Type
| Task | Start Here |
|------|-----------|
| Build components | [[03-Website-Design/Design-Language.md|Design Language]] + [[05-Technical/Tech-Stack.md|Tech Stack]] |
| Write content | [[01-Project-Foundation/Brand-Bible.md|Brand Bible]] + [[03-Website-Design/Website-Strategy.md|Website Strategy]] |
| Design visuals | [[01-Project-Foundation/Brand-Bible.md|Brand Bible]] + [[04-Visual-System/README.md|Visual System]] |
| Plan features | [[02-Strategy/Long-Term-Roadmap.md|Roadmap]] + [[03-Website-Design/Website-Roadmap.md|Website Roadmap]] |
| Understand context | [[01-Project-Foundation/Mission-Vision-Values.md|Mission & Vision]] + [[02-Strategy/Community-Outreach-Strategy.md|Outreach Strategy]] |

## 🎨 Critical Context

### What This Project Is
**Coachella Computer Aid:** A community technology education nonprofit helping seniors, people with disabilities, immigrants, veterans, and anyone feeling overwhelmed by technology.

This isn't a generic website—it's a mission-driven platform built on specific values and brand identity.

### Brand Essentials
- **Voice:** Warm, patient, kind, plain-language, reduces anxiety
- **Visual:** Warm colors (#F4A259 orange, #78B8D9 blue, #8BAE7B green, #FDF6EC cream)
- **Style:** Modern, soft, rounded, friendly, never corporate
- **Accessibility:** WCAG AA minimum, large text, bilingual (English/Spanish)

**Reference:** [[01-Project-Foundation/Brand-Bible.md|Brand Bible]]

### Tech Stack
- Frontend: Vue 3 + TypeScript + Vite
- Components: Vuetify 4 *(Claude has MCP access for live docs!)*
- Backend: Supabase (PostgreSQL, auth, storage)
- Hosting: Vercel or Netlify

**Reference:** [[05-Technical/Tech-Stack.md|Tech Stack]]

## 🚀 How to Work On This

### When Asked to Build Something

```
User asks: "Build the homepage hero section"

Your process:
1. Read [[03-Website-Design/Homepage/Sections.md#️-hero-section|Hero Section specs]]
2. Check [[03-Website-Design/Design-Language.md|Design Language]] for colors/sizing
3. Review [[01-Project-Foundation/Brand-Bible.md|Brand Bible]] for voice/tone
4. Reference [[05-Technical/Tech-Stack.md|Tech Stack]] for Vue/Vuetify specs
5. Build with full context
```

### When Asked About Design

```
User asks: "What colors should this button use?"

Your process:
1. Check [[03-Website-Design/Design-Language.md#color-system|Color System]]
2. Reference [[01-Project-Foundation/Brand-Bible.md#color-palette|Brand Bible colors]]
3. Verify accessibility contrast ratio
4. Suggest warm colors from palette
```

### When Asked About Content

```
User asks: "Write copy for the services section"

Your process:
1. Read [[01-Project-Foundation/Brand-Bible.md#brand-voice|Brand Voice]]
2. Check [[03-Website-Design/Website-Strategy.md|Website Strategy]] (no jargon!)
3. Review [[02-Strategy/Community-Outreach-Strategy.md|Services offered]]
4. Write warm, patient, clear copy
```

## ✅ Pre-Build Checklist

Before creating anything, verify:

- [ ] Is this consistent with [[01-Project-Foundation/Brand-Bible.md|Brand Bible]]?
- [ ] Does it meet [[03-Website-Design/Design-Language.md|Design Language]] specs?
- [ ] Is the tone warm/patient? ([[03-Website-Design/Website-Strategy.md|Website Strategy]])
- [ ] Is it accessible (WCAG AA)? ([[03-Website-Design/Design-Language.md#accessibility-standards|Accessibility]])
- [ ] Are colors from the brand palette? ([[03-Website-Design/Design-Language.md#color-system|Color System]])
- [ ] Does it use Vuetify components correctly? ([[05-Technical/Tech-Stack.md|Tech Stack]])

## 🎯 Quick Reference

| Question | Answer Location |
|----------|-----------------|
| "What colors?" | [[03-Website-Design/Design-Language.md#color-system|Color System]] |
| "What font size?" | [[03-Website-Design/Design-Language.md#typography|Typography]] |
| "How should this sound?" | [[01-Project-Foundation/Brand-Bible.md#brand-voice|Brand Voice]] |
| "Who do we serve?" | [[02-Strategy/Community-Outreach-Strategy.md|Outreach Strategy]] |
| "What tech stack?" | [[05-Technical/Tech-Stack.md|Tech Stack]] |
| "How does homepage flow?" | [[03-Website-Design/Homepage/Sections.md|Homepage Sections]] |
| "What's our mission?" | [[01-Project-Foundation/Mission-Vision-Values.md|Mission & Vision]] |
| "What phase are we in?" | [[02-Strategy/Long-Term-Roadmap.md|Long-Term Roadmap]] |

## 💡 Special Capabilities

### Vuetify MCP Access
Claude has live access to Vuetify documentation via MCP. When building components:
- Ask about component APIs
- Request code examples
- Get customization guidance
- No need to search docs

**Reference:** [[05-Technical/Tech-Stack.md#component-library-vuetify-3|Tech Stack — Vuetify]]

## 📚 Document Structure

```
docs/
├── README.md (START HERE)
├── CLAUDE.md (this file)
│
├── 01-Project-Foundation/
│   ├── Brand-Bible.md (MOST IMPORTANT)
│   ├── Mission-Vision-Values.md
│   ├── Project-Overview.md
│   └── README.md
│
├── 02-Strategy/
│   ├── Community-Outreach-Strategy.md
│   ├── Long-Term-Roadmap.md
│   └── README.md
│
├── 03-Website-Design/
│   ├── Design-Language.md
│   ├── Website-Strategy.md
│   ├── Website-Roadmap.md
│   ├── Website-Experience-Vision.md
│   ├── DetailedAppAssetLocations.md
│   ├── Homepage/Sections.md
│   └── README.md
│
├── 04-Visual-System/
│   ├── Illustration-Strategy.md
│   ├── Character-Placement-Guide.md
│   └── README.md
│
├── 05-Technical/
│   ├── Tech-Stack.md
│   └── README.md
│
└── 06-Assets/
    ├── Illustration-Catalog.md
    ├── Architecture-Reference.md
    ├── Background-Assets.md
    ├── Icon-Specifications.md
    └── README.md
```

## 🔑 Key Files (Read These First)

1. **[[01-Project-Foundation/Brand-Bible.md|Brand Bible]]** — Everything about who we are
2. **[[03-Website-Design/Design-Language.md|Design Language]]** — Visual specs
3. **[[05-Technical/Tech-Stack.md|Tech Stack]]** — Technology choices
4. **[[03-Website-Design/Homepage/Sections.md|Homepage Sections]]** — Website structure

## 🎯 Your Job

When working on CCA:
- ✅ Keep everything warm, patient, kind
- ✅ Use only brand colors and typography
- ✅ Make content plain-language (no jargon)
- ✅ Check accessibility (WCAG AA+)
- ✅ Respect the mission and values
- ✅ Reference docs when uncertain
- ✅ Ask the user for clarification if needed

## 📞 If You're Unsure

Before asking the user, check:
1. [[README.md|Main README]] for navigation
2. Relevant section README
3. Specific document (usually wiki-linked)
4. This file (CLAUDE.md)

If still unsure after reading: **Ask the user** with context. For example:

> "I'm building the services section. I see it should have 4 cards (Learn, Stay Connected, Stay Safe, Device Support). Before I start, should I use the Card component with or without shadows, based on [[03-Website-Design/Design-Language.md|our design language]]?"

---

## 🚀 Ready to Build

This project has everything documented. Use it. Reference it. Build with confidence.

**Most important:** Keep reading the [[01-Project-Foundation/Brand-Bible.md|Brand Bible]]. It's the foundation for everything.

---

**Status:** Ready for development  
**Keeping this current:** Use the `docs-sync` subagent after adding, moving, or renaming docs — it fixes broken wikilinks and updates this structure.  
**Your next task:** Check [[README.md|the README]] for what you're building
