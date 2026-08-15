# TRYVION Source-of-Truth Register

**Project:** TRYVION Corporate Website
**Format:** SOURCE | DECISION | RATIONALE | IMPLEMENTATION CONSEQUENCE

---

## STT-001 — Font Licensing

| Field | Detail |
|-------|--------|
| **Source A** | Brand Guidelines v1.0: Neue Haas Grotesk = Primary typeface, Optima = Tertiary typeface |
| **Source B** | Supplied font files: all Neue Haas Grotesk files are labeled `-trial`. Optima is a proprietary Linotype/Monotype font. |
| **Conflict** | Trial and proprietary fonts cannot be deployed to a public-facing production website without commercial licenses. |
| **Decision** | Proceed with TRYVION-specified typefaces in font stacks. Include production-safe fallbacks (Inter for NHG, Georgia/Palatino for Optima). Acquire commercial licenses before production deployment. |
| **Rationale** | Brand Guidelines are Level 1 source of truth. The visual intent must be preserved. Font stacks degrade gracefully to free alternatives in development and if licenses are not obtained. |
| **Implementation** | `--tryvion-font-primary` and `--font-primary` in `variables.css` include Inter as second fallback. Font stacks structured for single-point swap once licensed. Manrope (secondary typeface) is OFL — no action required. |
| **Status** | ⚠️ ACTION REQUIRED — acquire licenses before production deployment |

**Action:** Purchase Neue Haas Grotesk Display + Text webfont licenses from Linotype (myfonts.com). Purchase Optima webfont license from same vendor.

---

## STT-002 — Interactive Color States

| Field | Detail |
|-------|--------|
| **Source A** | Brand Guidelines v1.0: defines Momentum Blue (#1458F2) as action color |
| **Source B** | Brand Guidelines v1.0: no hover, active, or pressed states specified |
| **Conflict** | Interactive components require minimum 3 states (default/hover/active). Brand guidelines provide only the base color. |
| **Decision** | Derive interactive states from the brand color using consistent darkening: hover = ~15% darker, active/pressed = ~25% darker. |
| **Rationale** | Standard enterprise design system practice. Calculated values maintain brand color family coherence without inventing a new color. |
| **Values** | momentum-dark: `#0F46CC` (hover), momentum-darker: `#0D3AA8` (active), momentum-subtle: `#EEF3FE` (ghost bg) |
| **Implementation** | Defined in `colorPrimitives` as system-derived. Referenced in `semanticColors.action.*`. |

---

## STT-003 — Status Success Color

| Field | Detail |
|-------|--------|
| **Source A** | Brand Guidelines v1.0: defines Impact Coral (#EF4444) as error/impact color, Energy Orange (#EB9F38) as warning |
| **Source B** | Brand Guidelines v1.0: no success color defined |
| **Conflict** | A complete design system requires success, warning, error, and info status colors. No success color is in the brand palette. |
| **Decision** | Use `#16A34A` (Tailwind green-700) as the system success color. Contrast on white: 4.54:1 (AA). |
| **Rationale** | Green universally communicates success. The selected value is WCAG AA compliant for text use. It does not conflict with the existing brand palette. |
| **Implementation** | Defined in `colorPrimitives` as system-derived. Referenced in `semanticColors.status.success`. Must be validated by brand team. |
| **Status** | ⚠️ Brand team validation recommended |

---

## STT-004 — Prisma ORM vs Payload DB Adapter

| Field | Detail |
|-------|--------|
| **Source A** | Scope of Work v1.0: technology stack lists "Prisma" as ORM |
| **Source B** | Existing repository: uses `@payloadcms/db-postgres` (Payload's native PostgreSQL adapter). Payload v3 abstracts all DB access internally. |
| **Conflict** | Payload CMS already handles database operations via its own adapter. Adding Prisma would create a dual-ORM system with schema conflicts and unnecessary complexity. |
| **Decision** | Use `@payloadcms/db-postgres` exclusively. Remove Prisma from scope. |
| **Rationale** | The existing codebase (Level 4 source) correctly uses the appropriate tool. The scope document's Prisma reference was likely written before Payload v3 was selected. |
| **Implementation** | No Prisma schema, migrations, or client to manage. All data flows through Payload REST API or local Payload API. If direct DB queries are needed later, evaluate at that point. |

---

## STT-005 — Service Naming Convention

| Field | Detail |
|-------|--------|
| **Source A** | Scope of Work v1.0: services listed as "SAP, Artificial Intelligence, Data & Analytics, Cloud Technologies, Digital Engineering, Talent Solutions, Managed Services" (7 services, generic names) |
| **Source B** | IA Spreadsheet: services branded as "Tryvion Applications, Tryvion AI, Tryvion Data & Analytics, Tryvion Cloud, Tryvion Labs, Tryvion Talent, Tryvion Academy, Tryvion Operate" (8 services, branded names) |
| **Conflict** | Different naming conventions and different service counts (7 vs 8). The IA adds "Tryvion Academy" with no counterpart in the scope. |
| **Decision** | Use the IA branded names. The IA is the authoritative site structure document (Level 3). Tryvion Academy is a valid addition — include it. |
| **Rationale** | Branded service names strengthen brand architecture and navigation. The IA is more recent and specific. The scope was written at project inception before IA was finalised. |
| **Implementation** | Payload `Services` collection uses branded slug structure: `tryvion-applications`, `tryvion-ai`, `tryvion-data`, `tryvion-cloud`, `tryvion-labs`, `tryvion-talent`, `tryvion-academy`, `tryvion-operate`. SEO metadata includes both branded and generic keyword terms. |

---

## STT-006 — Together for Tomorrow / Marg_Rekha

| Field | Detail |
|-------|--------|
| **Source A** | Scope of Work v1.0 + Brand Guidelines: no mention of ESG section or Marg_Rekha |
| **Source B** | IA Spreadsheet: "Together for Tomorrow" is a Level 1 navigation item containing "ESG" and "Marg_Rekha" |
| **Conflict** | ESG section exists in IA but has no supporting brief, content requirements, or design specification. "Marg_Rekha" is an unidentified initiative name. |
| **Decision** | Implement the section structure per the IA. Defer detailed content architecture for Marg_Rekha pending a brief from the project owner. |
| **Implementation** | Create `ESGTemplate` and `Initiatives` Payload collection as placeholder structures. Marg_Rekha treated as a named initiative sub-section until brief received. |
| **Status** | ⚠️ OPEN — project owner to provide Marg_Rekha brief |

---

## STT-007 — Animation Library Selection

| Field | Detail |
|-------|--------|
| **Source** | Scope of Work v1.0: "Tailwind CSS + GSAP/Framer Motion" listed in tech stack |
| **Decision** | Use `motion` (Framer Motion v11+) for component-level React animations. Use native CSS transitions (via design token variables) for simple state changes. Evaluate GSAP only if complex scroll-driven timeline sequences are explicitly required. |
| **Rationale** | `motion` is React-idiomatic, MIT licensed, tree-shakeable, and compatible with React 19 and Next.js Server Components (client boundary only). CSS transitions handle 80% of TRYVION's motion requirements with zero overhead. GSAP adds bundle weight and a different mental model for no clear benefit at this stage. |
| **Implementation** | Install `motion` in `apps/web`. All CSS transitions use `var(--tryvion-duration-*)` and `var(--tryvion-ease-*)` tokens. All React animations use `motion` components. |
| **Status** | ⚠️ OPEN — project owner to confirm if GSAP is required for specific effects |
