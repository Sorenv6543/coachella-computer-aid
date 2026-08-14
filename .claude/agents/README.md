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
