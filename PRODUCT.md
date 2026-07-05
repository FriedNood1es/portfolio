# Product

## Register

brand

## Users

Recruiters, hiring managers, and technical interviewers screening Kent Lozano for Junior Software Developer / Mobile Developer roles (Davao City or remote). They arrive from a resume or LinkedIn link, spend under two minutes, and decide whether to shortlist. A secondary reader is the technical interviewer who opens the site during an interview and clicks through to repos.

## Product Purpose

The portfolio is the live proof behind the resume: it makes the "Next.js + TypeScript" claim true by existing, and it shows the projects (bastaFDA, GamotCheck, ModQueue) with honest status labels. Success = a recruiter shortlists; an interviewer finds nothing they can't verify.

## Brand Personality

Precise, technical, honest. The site reads as a beautifully-typeset terminal session — a developer's native environment, executed with typographic care. Confidence comes from specificity and craft, never from inflated claims.

## Anti-references

- Generic AI-template portfolio (dark Inter + purple gradients + identical card grids).
- Matrix-green hacker cosplay; CRT gimmickry that hurts readability.
- Any claim Kent cannot defend live (see ../CONTEXT.md — Defensible Claim is the admission test; bastaFDA has no database; unshipped work stays labeled in-progress/planned).

## Design Principles

1. **Terminal as register, not costume** — prompt/command grammar structures the page; readability always wins over period-accuracy.
2. **Every claim defensible** — content mirrors the resume (`lib/content.ts` is the single content source); status labels are honest.
3. **Craft is the argument** — for a junior candidate, the site's own precision (typography, motion, performance) is the strongest exhibit.
4. **Fast and static** — no framework overhead beyond React; instant load on a recruiter's laptop.

## Accessibility & Inclusion

WCAG AA: body text ≥4.5:1 on the dark ground, reduced-motion alternatives for all animation, semantic landmarks, keyboard-reachable nav. Terminal styling must never gate content behind interaction.
