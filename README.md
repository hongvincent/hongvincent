# Subin Hong

**Senior AI/LLM Engineer — production RAG, AWS Bedrock multi-agent systems, and adversarial LLM evaluation.**
Seoul, South Korea · I ship multi-tenant GenAI to production: 2,000+ test suites, fail-closed RAG, live-verified Lambda deploys.

I work at the orchestration and serving layer: fail-closed RAG pipelines, multi-model agent workflows on AWS Bedrock, and the test/deploy discipline that keeps them live for a Korean B2B SaaS (TalkCRM / SMNT Networks, a medical-CRM company).

Most of my production work is org-owned and private, so this profile leads with architecture and named failure modes over star counts — the public repos below show the same test-first discipline on code you can actually read, and I am happy to walk through any private project's architecture, with references, in an interview.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/Python-3670A0?style=flat-square&logo=python&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white)
![AWS Bedrock](https://img.shields.io/badge/AWS%20Bedrock-FF9900?style=flat-square&logo=amazonaws&logoColor=white)
![AWS Lambda](https://img.shields.io/badge/Lambda-FF9900?style=flat-square&logo=awslambda&logoColor=white)
![Anthropic](https://img.shields.io/badge/Anthropic%20Claude-191919?style=flat-square&logo=anthropic&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Dart](https://img.shields.io/badge/Dart-0175C2?style=flat-square&logo=dart&logoColor=white)
![Flutter](https://img.shields.io/badge/Flutter-02569B?style=flat-square&logo=flutter&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)

---

## What I do

- **Ship production GenAI to real tenants.** RAG retrieval and conversational agents deployed to AWS Lambda (Seoul / ap-northeast-2, PIPA-compliant) and live-verified against real tenant data, including measured latency budgets (6.9s KB response under a 28s Lambda timeout).
- **Engineer for failure modes, not happy paths.** Fail-closed retrieval (503 on uncertainty, never a hallucinated fallback), documented rollback digests, HITL concurrency hardening, and a live Docker build smoke test as a CI gate.
- **Treat tests as a contract.** Branch coverage enforced as a CI floor (not vanity statement coverage); per-requirement traceability matrices; an orchestrator that re-runs typecheck/lint/test/coverage itself rather than trusting self-reported green. 2,079- and 1,656-test suites gated in CI across production codebases.
- **Own the human judgment, not just the agent leverage.** I design the contracts, gates, and characterization tests that automated workflows run against; the rigor is the architecture, not the agent count.

---

## Featured delivery (private / org-owned)

### Adversarial LLM Evaluation — AIM Intelligence Red Team Arena (2026)
I red-team production LLM defenses to inform how I build them. The transferable result: I now design eval rubrics knowing that arena-grade judges score *action* (refusal vs. compliance) and *severity* **independently** via separate StrongREJECT rubric items — so a system that only hardens refusal still leaks on severity.
**Evidence:** **#32 globally** · 642 points · 73 confirmed breaches across GPT-5.4, Claude Opus, Gemini Flash, and MiMo over T1/T2 tracks; plus a maintained dead-list of 18+ defeated mechanic families to kill false-positive pursuit.
*Leaderboard is publicly hosted; link available on request.*

### Medical CRM Platform Revamp — SMNT Networks (2025–2026) · Proprietary
Reverse-engineered a legacy clinical CRM from black box (177 features / 80 APIs) into a gap-zero PRD (332 requirements, 40 NFRs), then built the greenfield replacement.
**Outcome:** **2,079 API tests** · **82% branch coverage** enforced as a CI floor across 3 modules (96% statement) · 351/351 contract-sync manifest · requirements-traceability GAP=0 · 19 backend modules shipped in 3 deploy batches · live Docker build + DB-bootstrap smoke gate (7/7) required before every merge.
**War story:** caught an **SWC-vs-tsc decorator-metadata divergence** that passed unit tests on the SWC test build but shipped a silently broken NestJS `ValidationPipe` on the tsc prod build — fixed by adding a mandatory live build smoke gate. HITL concurrency races were hardened with PostgreSQL partial unique indexes (`WHERE status IN (...)`), turning 23505 conflicts into clean 409s.
**Stack:** TypeScript · NestJS-style modular monorepo (pnpm/turbo) · PostgreSQL (Drizzle, partial-unique-index concurrency) · AWS Bedrock Seoul — Strands TS in-process agents, Titan v2 (1024-dim) embeddings, S3 Vectors retrieval · OpenTelemetry + structured/redacted logging · React · Omnichannel (KakaoTalk, Naver, 의사랑 — a major Korean clinic EMR).
*Architecture discussable in interview.*

### Production Conversational AI Agent + KB Retrieval — SMNT Networks (2025) · Proprietary
Added a fail-closed, KB-grounded retrieval path to an existing multi-mode CRM agent without touching the relay codebase.
**Outcome:** **1,656 tests** · 96% coverage · deployed to AWS Lambda (dev) · live A/B verified with real tenants — 6.9s KB response with `rag_key`, existing deflection without it, reservation path unchanged, all under a 28s Lambda timeout. Rollback ECR digest preserved before cutover.
**Design:** `rag_key` allowlist → Korean + ≥5-char gate → KB-retrieve-only Lambda → Claude Haiku 4.5 → NLG fallback. A KB miss returns 503 rather than a fabricated answer.
**Stack:** Python · AWS Lambda · Bedrock · Claude Haiku 4.5 · vector retrieval.

---

## Selected public work

- **[im-not-ai](https://github.com/epoko77-ai/im-not-ai)** — Korean AI-text humanizer (MIT). Detects 40+ post-editese patterns across 10 categories; 5-agent strict pipeline with semantic-invariance guardrails and a 30–50% change-rate threshold. v2.0 grounded in Korean translation-studies typology. *Public — readable code that demonstrates the same test-first, guardrailed discipline as my private work.*
- **openflat** *(private, in progress)* — Korean-first, fully on-device document scanner. Flutter + ONNX Runtime + OpenCV + PP-OCRv5 OCR (no cloud OCR dependency). Pure-Dart TDD core; CER + quad-detection module complete.
- **pkm-os** *(private)* — Local-first AI personal knowledge OS. Python 3.12, strict TDD, sqlite-vec retrieval, local nomic embeddings with Bedrock fallback. Compile-don't-retrieve architecture — reinforces the RAG/embedding story end to end.

---

## How I work

- **Live-verified, not just CI-green.** A human checks real system output against named rollback points before merge, and the orchestrator re-runs typecheck/lint/test/coverage directly rather than trusting agent- or self-reported green.
- **Branch coverage over vanity coverage.** I gate on branch coverage as the hard floor; near-100% statement coverage is cheap and I treat it as table stakes, not the achievement.
- **Characterization before refactor.** Inherited behavior is locked with characterization tests — alongside verbatim and net-new tests — before any code changes.
- **Model-tier discipline.** Route by task demand: Haiku for high-frequency lightweight calls, Sonnet for generation, Opus for adversarial review and architectural decisions.
- **Specific vocabulary over marketing words.** Partial unique index, fail-closed, Lambda timeout constraint, RTM GAP=0 — incident-report precision, not keyword farming.

---

## Activity snapshot

<!-- profile-metrics:start -->
- Last updated: 2026-06-20
- 3,226 contributions in the last 12 months
- 3,101 restricted contributions from private and organizational repositories
<!-- profile-metrics:end -->

- Active in: TalkCRM, smnt-study, gorani-ELK, ICA-7-Engineer-T3. Primary languages: TypeScript and Python.
- Reference and contribution detail (private/org repos at TalkCRM / SMNT Networks) available on request.

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=hongvincent&layout=compact&langs_count=6&hide=html,css,shell&count_private=true&hide_border=true&bg_color=00000000)

> The public contribution graph is intentionally sparse: the bulk of my work lives in client and org production systems. The metrics above reflect that ratio honestly, and I am glad to corroborate it directly.

---

**Open to:** Senior / Staff AI Engineer · Applied AI · AI Platform · LLM safety & evaluation roles.
[Email](mailto:hong@talkcrm24.com) · Happy to walk through any private project's architecture or provide references on request.
