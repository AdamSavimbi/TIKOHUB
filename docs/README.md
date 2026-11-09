# Project docs

Short, reviewable records of every **approved** change to TIKOHUB. Read these to see what exists, why it looks the way it does, and what changed when.

## Layout

```
docs/
  README.md            this file: how the docs work
  CHANGELOG.md         one entry per approved change, newest first
  foundation/          project-wide pieces: theme, tooling, conventions
  sections/            one living doc per landing-page section (later: per page)
  _templates/          copy these when adding a new doc or entry
```

- **`CHANGELOG.md`** is the timeline. Each entry is a few bullets and links to the doc it touched.
- **Topic docs** (`foundation/*.md`, `sections/*.md`) describe the *current* state of one thing: what it is, files, data, behaviour, decisions. Each ends with its own short history.
- New area of the app (e.g. checkout, dashboard)? Add a folder beside `sections/` (e.g. `pages/`, `features/`) using the same section template.

## When docs are written

1. Work happens and is reviewed in the conversation or PR.
2. Only **after the owner approves the final version** are the docs updated:
   - add or update the topic doc;
   - add a `CHANGELOG.md` entry linking to it.
3. Unapproved, rejected or in-progress work is never recorded here.

## Style

- Concise. Lead with the main changes; one short explanation each.
- Bullets over paragraphs. No code dumps; link to files (`src/...`) instead.
- Record decisions with their reason, especially where the build differs from the design or from the rules in `CLAUDE.md`.
- Dates are absolute (YYYY-MM-DD).
