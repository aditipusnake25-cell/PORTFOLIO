PRD — Alexander Vex Portfolio (Floating Particle Background)
Original Problem Statement
Add beautiful floating particles throughout the entire portfolio background (canvas core + CSS sparkle layer), with mouse interaction, theme support (light/dark), reduced particle counts on mobile, reduced-motion accessibility, and performance optimizations. User chose: Canvas + CSS mix, "Rich & magical" intensity (~120-150 desktop), and a creative palette of Midnight Navy, Deep Blue, Sky Blue, and Soft Mint Green.

Architecture
Frontend: React (CRA + craco), Tailwind CSS, framer-motion, lenis-style native smooth scroll, sonner toasts. Single-page portfolio, no routing.
Backend: FastAPI (port 8001) + MongoDB via motor; POST /api/contact stores messages, GET /api/health, GET /api/contact/messages.
Signature visual: ParticleBackground.jsx — fixed full-screen canvas (z-0) with ~145 desktop / ~55 mobile particles (sky blue, icy white, mint green, light blue), depth-layered speeds, sine wobble drift, fade in/out pulsing, sparkle cross-flares, 6 large blurred glow orbs, grid-optimized subtle connection lines, mouse repulsion (120px), pause on tab hide, DPR capped 1.5, static frame under prefers-reduced-motion.
SparkleLayer.jsx — CSS twinkles + two drifting aurora glows + grain overlay (z-1, pointer-events-none).
Implemented (2026-11-03)
Full particle background system per above (all 6 core requirements)
Dark mode default (midnight navy #0A1128) + light mode toggle (pale blue/white/mint), persisted to localStorage
Redesign per Aditi's brief (2026-11-03, later same day): real identity "Aditi Pusnake — Full-Stack Developer | Gen-AI Enthusiast"; new sticky glass navbar (name+subtitle left, 6 links w/ animated underline, Resume + Get in Touch buttons, hamburger mobile); new hero (HELLO I'M / name / role / BCA intro / Explore My Projects + Download Resume / availability, right-side orbit rings + tilt code card + floating tech chips, no photos); section order Home > About > My Journey (timeline + BCA education) > Skills & Technologies (bento remapped to real stack) > Featured Projects (3 real projects: MockMind, Collaborative Markdown Notes Saver, AI Daily Journal Prompter — full descriptions, contributions, tech tags, placeholder previews + GitHub/Live Demo placeholder links) > Ideas & What I Care About > Contact (form -> MongoDB, scope dropdown restyled w/ chevron); lenis momentum scrolling w/ anchor interception; generated one-page resume.pdf in public/ from real details (reportlab); marquee items updated to real identity.
CollabSphere, screenshots & persistent rate limit (2026-11-03, session 6)
CollabSphere promoted to full card (04) using only repo-verifiable facts: React (Vite) frontend + Node/Express backend, MongoDB, JWT, Gemini API (from its .env setup); real repo + demo links (curl 200); user-supplied screenshot. Feature list hidden (none provided — nothing invented).
Real screenshots added: mockmind.png + collabsphere.png (user's Google Drive images) in public/screenshots; cards render real image with hover zoom, gradient overlay. SpendWise remains placeholder (user gave no details).
Rate limiter moved to MongoDB (contact_rate_limits, per-IP timestamps, 3/10min) — verified persisting across backend restart (3x200, restart, then 429).
Custom domain: user to link via Republish > Domain tab; env verification afterward. SpendWise details + remaining screenshots pending.
Links, rate limiting & domain (2026-11-03, session 5)
Real project links wired: MockMind (repo AI_Interview_Preparation_Platform, demo onrender), Markdown Notes (repo Collaborative_markdown_notes_, demo onrender), Journal Prompter (repo FULL_STACK_PROJECT_ASK_GEMINI, demo vercel). All GitHub/Demo buttons open in new tab; all URLs curl-verified 200. CollabSphere & SpendWise added as honest placeholder cards (details pending).
Contact rate limit: 3 messages / IP / 10 min (in-memory sliding window), 429 with clear detail; frontend shows friendly error banner. Verified: 3x200 then 429.
Screenshots: user chose to keep stylized previews. Custom domain: guidance relayed from support (Republish > Domain tab; auto-link or A/CNAME records; env update after verify).
Real details & delivery (2026-11-03, session 3)
Placeholders replaced: email aditipusnake15@gmail.com, LinkedIn aditi-pusnake-143230400, GitHub aditipusnake25-cell, Eternal University Baru Sahib HP (Journey + About + resume).
About section rewritten from Aditi's real extended bio (intro, What Drives Me x5, Beyond Coding, Current Focus chips).
Resume PDF regenerated with location, contact links, university.
Email delivery: Emergent managed Resend via EMERGENT_EMAIL_KEY; every /api/contact submission stored in MongoDB AND emailed to OWNER_EMAIL with Reply-To = sender; guardrail gate (_assert_safe_email) on every send; billing failures logged not surfaced to users.
Admin inbox: /admin route (link in footer), passcode-protected (Argon2 hash in .env, signed HttpOnly session cookie 8h), /api/admin/login|logout|messages. Passcode in /app/memory/test_credentials.md.
Project GitHub buttons -> Aditi's GitHub profile; Live Demo buttons -> "Coming Soon" (no URLs provided).
Verified: admin login 401/200, unauthed 401, messages list, contact submit 200 w/o email errors, screenshots of /admin + updated sections.
Layout & spacing pass (2026-11-03, session 4)
Section vertical rhythm unified across About/Journey/Skills/Projects/Ideas/Contact: py-4 md:py-8 per section (= 32px mobile / 64px desktop gaps between sections), SectionHeading margin mb-8 md:mb-12, marquee py-5 sm:py-8, hero pb reduced, journey timeline space-y-5, projects space-y-6, contact columns gap-10, footer mt-12 pt-6. Page height ~12k -> 7.5k px.
About columns equal height: grid items-stretch, left Reveal h-full flex, Quick Facts card h-full flex-col with flex-1 divide-y stats (justify-center per row, evenly distributed). Verified 1227px == 1227px at 1440w; mobile stacks naturally. No palette/typography/particles/theme-toggle/project-card changes.
Contact section redesign (2026-11-03)
Two-column "Let's Build Something Together." layout: left contact-info cards (email w/ copy, Location Yavatmal Maharashtra India, LinkedIn/GitHub placeholder rows), right form (Full Name, Email w/ regex validation, Subject, Message) with inline field errors, inline success/error banners, loading state, duplicate-submit guard, backend persistence w/ subject field.
Fixed: Tailwind alpha modifier on hex CSS vars (inputs fell back to UA white bg in dark mode) via --input-bg/--input-placeholder vars + .input-field class; mobile overflow-x from contact glow (added overflow-hidden).
Verified: curl POST/GET messages, empty-form validation errors, successful submit + banner, dark/light themes, no overflow at 390/1440.