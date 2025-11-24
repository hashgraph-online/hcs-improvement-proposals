# Hashgraph Online • HCS Standards & Docs

This repository is the canonical source for HCS — Hashgraph Consensus Standards — authored and maintained by Hashgraph Online. It contains specifications (HCS-1, HCS-2, HCS-3, HCS-10, HCS-12, etc.), SDK guides, and examples used across the Hashgraph Online ecosystem.

Live docs: https://hol.org

## Mission

- Open standards: Define, evolve, and maintain HCS in the open.
- Interoperability: Enable agents, wallets, and apps to work together reliably.
- Practical adoption: Ship reference SDKs, examples, and guidance alongside specs.
- Community first: Review and improve proposals collaboratively in the open.

## Repository Contents

- Standards: `docs/standards/**` (HCS-1, HCS-2, HCS-3, HCS-10, HCS-12, etc.)
- Libraries: `docs/libraries/**` (Standards SDK, Conversational Agent, examples)
- Site config: Docusaurus site powering the live documentation

## Standards At A Glance

Current HCS documents in this repo (non-exhaustive):

- HCS-1: File Management (`docs/standards/hcs-1.md`)
- HCS-2: Topic Registries (`docs/standards/hcs-2.md`)
- HCS-3: Recursion (`docs/standards/hcs-3.md`)
- HCS-5: Hashinals (`docs/standards/hcs-5.md`)
- HCS-6: Dynamic Hashinals (`docs/standards/hcs-6.md`)
- HCS-7: Smart Hashinals (`docs/standards/hcs-7.md`)
- HCS-8: Poll Topic (`docs/standards/hcs-8/`)
- HCS-9: Poll Metadata (`docs/standards/hcs-9/`)
- HCS-10: OpenConvAI — Agent Communication (`docs/standards/hcs-10/`)
- HCS-11: Profile Metadata (`docs/standards/hcs-11.md`)
- HCS-12: HashLinks — Actions, Blocks, Assemblies (`docs/standards/hcs-12/`)
- HCS-13: Schema Registry (`docs/standards/hcs-13.md`)
- HCS-19: AI Agent Privacy Compliance (`docs/standards/hcs-19.md`)
- HCS-20: Auditable Points (`docs/standards/hcs-20/`)

Implementation guides live separately under `docs/libraries/standards-sdk/**`. When in doubt: “Standards” are normative specs; “Libraries” are implementation docs.

## Who We Are

Hashgraph Online is a consortium focused on building the autonomous, on‑graph internet with Hashgraph Consensus Standards (HCS) on the Hedera network. We collaborate across companies, open source maintainers, and product teams to create interoperable protocols, robust SDKs, and production‑grade tools.

Core pillars:
- Protocol development: Author and maintain HCS standards (HCS‑1, HCS‑2, HCS‑10, HCS‑12, etc.).
- Developer enablement: Provide documentation, examples, and support for implementers.
- Open‑source tools: Ship reference SDKs and applications that prove and accelerate adoption.

Impact & adoption (as featured on the homepage):
- Millions of on‑chain transactions across HCS standards and growing.
- Hundreds of thousands of daily requests served via CDN.
- Over one hundred thousand files stored on‑graph via HCS‑1.
- Adopted in real projects (examples on the homepage Standards browser and Members pages).

## Submit a Standard (HCS)

1) Start a discussion
- Join Telegram: https://t.me/hashinals
- Share your idea, prior art, and intended scope; get initial feedback.

2) Draft the specification
- Create a folder under `docs/standards/hcs-XX/` with at least `index.md`.
- Include sections: Title, Status, Authors, Abstract, Motivation, Specification, Rationale, Security Considerations, Backwards Compatibility, References.
- Keep tone technical and neutral; avoid emojis or marketing language.

Numbering: Use the next available `XX`. Coordinate in Telegram if you need an allocation held for a larger proposal. Small edits to existing standards do not require a new number; propose a version bump instead.

3) Wire it into the sidebar
- Update `hcs-improvement-proposals/sidebars.ts` to add your new HCS under the Standards section. Follow the existing HCS entries for structure.

4) Submit a pull request
- Include a short summary and rationale.
- Link any reference implementations or tests (SDKs, examples).
- Expect review on clarity, completeness, and compatibility with existing HCS.

Change requests to existing standards: Open a PR against the existing document with a clear changelog in the PR description. Mark breaking changes and propose a version increment (e.g., 1.1 → 2.0).

5) Lifecycle and status
- Draft: Open for community review.
- Candidate: Stabilizing; at least one reference implementation underway.
- Final: Accepted, versioned, and referenced by SDKs and ecosystem docs.
- Deprecated: Superseded or retired; retained for historical reference.

Normative language: Use RFC 2119 terms (MUST, SHOULD, MAY) for normative requirements. Keep examples and background material clearly marked as non-normative.

Governance: Editors are Hashgraph Online maintainers. Decisions are made in public discussion with editor consensus. For complex changes, editors may solicit external review.

Conformance: When practical, include a “Conformance” section in your standard with:
- Minimal valid message examples (happy path)
- Error conditions and expected behaviors
- Test vectors or schemas (JSON Schema, Zod, etc.)
- Integration expectations with other HCS (if any)

## Contributing to Libraries Docs

- The Libraries section documents SDKs maintained by Hashgraph Online (e.g., Standards SDK, Conversational Agent).
- Keep API docs aligned with the current implementation and models; prefer concrete examples.
- If adding a new library page, also update the Libraries section in `sidebars.ts`.
- When a standard reaches Candidate, aim for one reference implementation in `standards-sdk` (and tests) before moving to Final.

## Editorial & Style Notes

- Terminology: “HCS” = Hashgraph Consensus Standards by Hashgraph Online.
- Structure: Prefer short sections, diagrams (Mermaid) for flows, and code blocks for message examples.
- No emojis or marketing language in standards; keep tone neutral and precise.
- Link the normative spec from the implementation pages and vice versa.

## Security & Disclosure

- Report vulnerabilities that impact implementations to the maintainers privately first; avoid filing public issues with sensitive details.
- Standards-level issues (e.g., ambiguous requirements) can be raised publicly via issues/PRs.

## Style and Editorial Guidelines

- Tone: Technical, concise, implementation-oriented.
- Formatting: Use headings and bullets for scanability; no emojis.
- Consistency: Match naming (HCS-10, HCS-12) and file structure used in the repo.
- Links: Prefer relative links within this repo; use canonical URLs for external references.

## Running Locally

Prerequisites:
- Node.js >= 18 (LTS recommended)
- pnpm 10.x (use `corepack enable && corepack prepare pnpm@10.14.0 --activate`)

Option A — from the repo root (recommended):
- Install: `pnpm i`
- Develop: `pnpm --filter hcs-improvement-proposals start` (opens http://localhost:3000)
- Build: `pnpm --filter hcs-improvement-proposals build` (outputs to `hcs-improvement-proposals/build/`)
- Serve build: `pnpm --filter hcs-improvement-proposals serve`
- Clear caches: `pnpm --filter hcs-improvement-proposals clear`

Option B — inside the site folder:
- `cd hcs-improvement-proposals`
- Install: `pnpm i`
- Develop: `pnpm start` (opens http://localhost:3000)
- Build: `pnpm build` (outputs to `build/`)

Notes:
- Algolia DocSearch is configured via `themeConfig.algolia` in `docusaurus.config.ts`; no env vars are required for local runs.
- Hot reload is enabled; edits under `docs/**`, `src/**`, or `sidebars.ts` refresh automatically.

## Deployment

- Algolia DocSearch is integrated via `themeConfig.algolia` in `docusaurus.config.ts`.

## Getting Help

- Community: https://t.me/hashinals
- Standards index: `docs/standards/index.mdx`
- SDK docs: `docs/libraries/**`

---

Hashgraph Online — building open standards and tools for the Hedera ecosystem.
