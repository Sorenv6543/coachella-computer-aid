# Mission, Vision & Values

**The Heart of Coachella Computer Aid**

---

## 🎯 Our Mission

To empower every member of the Coachella Valley with the knowledge, confidence, and access to use technology safely and independently, regardless of age, disability, language, or income.

### What This Means
- **Empower:** Help people gain skills and confidence
- **Every member:** No one is left behind
- **Knowledge:** Teaching, not just fixing
- **Confidence:** Remove fear and anxiety
- **Independently:** Enable self-sufficiency
- **Safely:** Protect from scams and harm
- **Technology:** All devices and digital tools
- **Regardless of:** No gatekeeping by demographics

---

## 🌟 Our Vision

We envision a community where technology creates opportunities instead of obstacles, and every person—regardless of age, income, language, or ability—has the confidence to connect, learn, work, and thrive.

### Long-Term Outcomes
- Technology is accessible to all
- No one feels left behind or intimidated
- Seniors stay connected with loved ones
- People get jobs through digital skills
- Immigrants access essential services
- People with disabilities use adaptive tech
- Community supports community
- Technology empowers rather than excludes

---

## ❤️ Core Values

### Patience ⏱️
We teach at your pace. Never rush. Never judge.

**How we live this:**
- Sessions last as long as you need
- Repeat explanations without frustration
- Celebrate small wins
- Never make assumptions about knowledge
- Acknowledge learning takes time

### Community 🤝
Technology should bring people together, not isolate them.

**How we live this:**
- Build relationships, not transactions
- Create spaces for people to help each other
- Partner with community organizations
- Celebrate volunteers and helpers
- Foster belonging

### Inclusion 🌍
Everyone deserves access. No exceptions.

**How we live this:**
- Bilingual support (English/Spanish)
- Accessible for people with disabilities
- Welcoming to all ages and backgrounds
- Affordable for low-income families
- No judgment about technology level

### Education 📚
We don't just fix problems. We teach.

**How we live this:**
- Explain the "why" not just the "how"
- Empower people to solve problems themselves
- Provide resources for continued learning
- Share knowledge generously
- Build digital literacy

### Trust 🔒
Privacy. Security. Honesty. Always.

**How we live this:**
- Protect personal data
- Transparent about what we do
- Keep information secure
- Don't exploit or upsell
- Follow through on promises

### Kindness 😊
Every interaction should leave someone feeling more confident than when they arrived.

**How we live this:**
- Greet everyone warmly
- Listen actively
- Recognize struggles without judgment
- Celebrate wins
- Treat people with respect and dignity

### Accessibility ♿
Technology should work for everyone, regardless of ability.

**How we live this:**
- Offer large text options
- Support screen readers
- Keyboard navigation
- Closed captions on videos
- Multiple ways to access services

---

## 📊 Success Looks Like

### For Individuals
- A senior video calling grandchildren for the first time
- Someone applying for a job online independently
- A person protecting themselves from a scam
- An immigrant filling out government forms
- A person with disabilities using assistive technology
- Anyone feeling less anxious about technology

### For the Community
- Monthly workshops packed with learners
- Partnerships with 10+ local organizations
- 50+ active volunteers
- Technology center serving hundreds
- Recognition as go-to resource
- Measurable digital inclusion improvements

### For the Organization
- 500+ people served annually
- Financial sustainability
- Positive community reputation
- Staff empowered to help more people
- Expanding to new locations
- Growing impact over time

---

## 🎯 Decision-Making Filter

When deciding what to do or build, ask:
- ✅ Does this serve our community?
- ✅ Does this align with our values?
- ✅ Is this sustainable long-term?
- ✅ Does this empower people?
- ✅ Is this accessible?
- ✅ Does this reduce anxiety?
- ✅ Would we be proud to show this to our community?

If the answer isn't yes, don't do it.

---

## 🌱 Evolution Over Time

### Today (Phase 1)
- One person passionate about helping
- Direct service to seniors and others
- Building reputation and community

### Tomorrow (Phase 2-3)
- Nonprofit organization with volunteers
- Multiple workshop locations
- Grant funding supporting growth
- First paid staff members

### Future (Phase 4-5)
- Community technology center(s)
- Hundreds served monthly
- Diverse programs and services
- Institution recognized and trusted

---

## 💬 How We Communicate

Everything we say and do should reflect our mission and values:

### Language
- Plain, jargon-free
- Warm, not corporate
- Encouraging, not patronizing
- Honest about what we can do
- Patient and kind

### Tone
- Welcoming and inclusive
- Patient and understanding
- Professional and competent
- Personal and genuine
- Humble and community-focused

### Actions
- Show up consistently
- Follow through on promises
- Respect people's time
- Celebrate others
- Listen more than we talk

---

## 🔗 Related Documents

- [[Brand-Bible.md|Brand Bible]] — Full brand identity
- [[../../02-Strategy/Community-Outreach-Strategy.md|Community Outreach]] — How we serve
- [[../../02-Strategy/Long-Term-Roadmap.md|Long-Term Roadmap]] — Where we're going
- [[../../03-Website-Design/Website-Strategy.md|Website Strategy]] — How we communicate

---

**This is who we are. This is what we stand for.**

Everything builds from here.

---

**Last Updated:** July 20, 2026  
**Status:** Foundation Phase




# CCA project subagents

Project-scoped Claude Code subagents. Each is a Markdown file with YAML frontmatter;
the body is the agent's system prompt. Claude Code auto-delegates based on the
`description` field, or you can call one explicitly:
`Use the accessibility-check subagent on HeroSection.vue`.

| Agent | Does | Writes code? | Model |
|---|---|---|---|
| `content-brand` | On-brand copy + tone linting | copy only | sonnet |
| `vuetify-builder` | Vue 3 + Vuetify components on brand | yes | sonnet |
| `accessibility-check` | WCAG 2.1 AA audit | no (review-only) | sonnet |
| `bilingual-content` | Matched EN/ES pairs + i18n parity | copy only | sonnet |
| `docs-sync` | Vault link/README/drift upkeep | docs only | sonnet |

## Intended handoff chain (building a page)

1. `vuetify-builder` scaffolds the component with placeholder copy.
2. `content-brand` writes the English copy on brand.
3. `bilingual-content` produces the Spanish pair and keeps i18n keys in parity.
4. `accessibility-check` audits the finished component → PASS or NEEDS FIXES.
5. `docs-sync` updates any affected docs/READMEs.

## Notes

- All five omit or restrict `tools` deliberately: reviewers (`accessibility-check`)
  can't write; content agents can't run Bash; the builder inherits everything
  (incl. the Vuetify MCP). Adjust in frontmatter as needed.
- `model` is set to `sonnet` across the board. `docs-sync` is grep-heavy and could
  drop to `haiku` for the scanning pass if you want to cut cost; keep sonnet if you
  want it to also reason about structure and fix links.
- These live at repo-root `.claude/agents/` (where Claude Code looks). The former
  `docs/.claude/instructions.md` duplicated `docs/CLAUDE.md` almost entirely and
  was removed in favor of the latter, which Claude Code actually auto-loads.
- Two real drifts these agents already know about: the `carlos-007` illustration
  mislabel (see `tools/illustrations/`) and the Inter-vs-Nunito font mismatch
  (`docs-sync` will flag it).
