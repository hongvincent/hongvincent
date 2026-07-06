# Subin Hong (홍수빈)

**English** | [한국어](README_KO.md)

**AI Engineer · Production LLM Agents on AWS Bedrock**

## Highlights

- **Sole lead author of a production hospital-consultation AI agent.** 5 tenants × 12 languages on AWS Bedrock AgentCore (**1,152 commits · 651 merged PRs · 116 versioned releases**).
- **Recognized on two fronts:** personal red-team wins (MFDS Grand Prize 2025; AIM Arena **#32 global**) and lead engineer on two award-winning shipped products, the CES 2026 Innovation Award (AI) and the KSA Service AI Leader Award 2026.
- **Fail-closed reliability for a regulated healthcare domain:** precision over recall, with unauthenticated-mutation blocking in the flagship CRM tool chain and security gates ahead of any booking action.
- **A delivery pattern that repeats:** a reservation agent, a KB-management backend, and a voice pipeline, each taken from an empty repo to a live serverless deploy.
- **Public tool: [openrabbit](https://github.com/hongvincent/openrabbit).** A Bedrock-only, high-trust AI code reviewer (Nova 2 Lite finder → cross-family GPT-5.4 verifier, find-broad / verify-strict), now wired as a CI gate across repos.

I build and ship production AI agents at **Sungmin Networks**. As sole lead author I own a multi-tenant hospital-consultation system (the engine behind a **CES 2026 Innovation Award** product), serving 5 production tenants in 12 languages on AWS Bedrock AgentCore, plus a stateless reservation agent on the same platform's omni-channel relay. Alongside building it, I red-team medical LLMs, so the same system I ship is one I know how to break.

The flagship is **1,152 commits / 651 merged PRs** of PR-first, review-gated delivery from a single author (January to July 2026). Most code is org-owned and private under the **TalkCRM** platform org, so this profile leads with verifiable numbers and public award links, and I can walk through the architecture with references on request.

Seoul, South Korea · [smnt.subin@talkcrm24.com](mailto:smnt.subin@talkcrm24.com)

---

## Stack

![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![AWS Bedrock](https://img.shields.io/badge/AWS%20Bedrock-232F3E?style=flat&logo=amazonaws&logoColor=white)
![AWS Lambda](https://img.shields.io/badge/AWS%20Lambda-FF9900?style=flat&logo=awslambda&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![Anthropic Claude](https://img.shields.io/badge/Claude-D97757?style=flat&logo=anthropic&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=flat&logo=terraform&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Datadog](https://img.shields.io/badge/Datadog-632CA6?style=flat&logo=datadog&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat&logo=githubactions&logoColor=white)
![Flutter](https://img.shields.io/badge/Flutter-02569B?style=flat&logo=flutter&logoColor=white)

---

## Flagship — hospital-consultation AI agent (private / org-owned)

Serves **5 production hospital tenants across 12 languages**. A 2-stage routing layer (Amazon Nova 2 Lite fast-path → Claude Haiku 4.5 escalation) sits inside a **20-layer defense-in-depth** architecture, with every LLM call traced in Datadog LLMObs.

- **1,152 commits · 651 merged PRs · 116 versioned releases**, sole lead author (2026-01-22 → 07-01).
- **Strands Agents SDK (deployed on v1.32.0)** over **AWS Bedrock AgentCore** (not Bedrock Agents) for full control of multi-turn flows, custom tools, and response filtering.
- The 20-layer defense covers distinct stages: input validation, prompt-injection screening, threat scoring, an enforce-vs-notify policy split, and output filtering.
- Tool chain: `search_knowledge_base` (RAG) → `get_customer_crm_info` (SMS identity verification) → `manage_reservation` (booking CRUD); the CRM layer rejects any unauthenticated mutation.
- Runtime: Lambda Proxy → ARM64 Bedrock AgentCore container → FastAPI with streaming middleware; a pre-warmed agent pool absorbs cold starts, a dual-layer session store (TTL + LRU) bounds memory under concurrent tenants, and per-tenant Knowledge Base routing isolates each hospital's data.
- Architecture documented as an auto-generated knowledge graph: **770 nodes / 1,097 edges across 13 layers**.
- Stack: Python 3.11+ · FastAPI · Strands Agents · Bedrock AgentCore · Nova 2 Lite · Haiku 4.5 · Datadog LLMObs · Terraform.

---

## Recognition and awards

Two threads run through my work: adversarially breaking LLM safety systems, and shipping the LLM products that have to survive that scrutiny. Each item below carries a public evidence link, with my scope stated explicitly.

### Adversarial AI / red-team (personal)

- **Korea MFDS Advanced AI Digital Medical Product Red-Team Challenge, Grand Prize (최우수상), Sep 2025.** Asia's first red-team challenge for generative-AI medical-device LLMs, 100+ participants. I found critical vulnerabilities via prompt-injection and by inducing HIPAA-violating outputs in commercial medical LLMs; judged on technical difficulty, risk severity, attack creativity, and reproducibility. [Announcement](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=221)
- **AIM Intelligence AI Red-Team Arena 2026, #32 globally** (**642 points**, **73** confirmed LLM safety breaches across GPT-5.4, Claude Opus, Gemini Flash, and MiMo over the T1/T2 tracks; final standings, arena concluded May 2026). One transferable finding: arena-grade judges score action (refusal vs. compliance) and severity on separate StrongREJECT rubric items, so hardening refusal alone still leaks on severity. [Leaderboard](https://judgementday.aim-intelligence.com/leaderboard)

### Shipped AI products (lead engineer, not a personal award)

- **CES 2026 Innovation Award, Artificial Intelligence.** Sungmin Networks' AICC-based medical CRM platform "TalkCRM AI" is a CES 2026 Innovation Award honoree (announced Nov 2025). I am the primary engineer of the production AI agent that powers it; this is my contribution to an award-winning product, not a personal award. [CES honoree](https://www.ces.tech/ces-innovation-awards/2026/talkcrm-ai-intelligent-care-communication-platform/) · [announcement](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=267)
- **KSA Service AI Leader Award 2026, Korea Standards Association, leading-enterprise division.** Sungmin Networks was selected alongside LG Electronics, SK Telecom, and Samsung Medical Center for the entry *"24/7, 12-language smart hospital administration: an AI-agent field case overcoming structural staffing shortages."* That entry is the production agent I lead, and I authored the submission as the responsible engineer. Ceremony July 2026; public announcement forthcoming.

---

## Security as a product surface

The same competence proven on the offensive side (MFDS Grand Prize, AIM Arena) runs through the defensive work; security is built into the product rather than added afterward.

- **In-product hardening:** **24 dedicated security commits** inside the flagship agent: tenant-key rotation, revoked-key scrub, automated secret scanning (TruffleHog CI), and prompt-injection / phishing-link defenses baked into the agent itself.
- **Security audits:** a read-only **128-control** AWS security-posture audit (Seoul + Virginia, **96/100** adversarial-review convergence, zero production impact), plus a KISA-grounded source-code audit across **8 repositories** (**70-control catalog → 171 findings**), every file:line re-verified against live source.
- **Supply-chain hygiene by default:** commit-SHA action pinning, OpenSSF Scorecard + Dependabot CI, and scrubbing live secrets out of git history.

---

## Zero-to-production, repeatably (private / org-owned)

The same empty-repo-to-live-serverless motion, repeated across a reservation agent, a KB-management backend, and a voice pipeline.

### Stateless NLU+NLG reservation agent
A pure-language agent with a hard boundary: **18 reservation modes**, no session state, no DB writes. The relay owns execution; this agent owns only utterance analysis and sentence generation, so two identical `/invoke` calls are independent. Because it is stateless and contract-bound, it is straightforward to test: **1,656 tests at 96% coverage**, deployed to AWS Lambda (dev) and live A/B verified against real tenants.

- Lead engineer, **152 commits / 74 merged PRs** (plus a teammate's commits) since 2026-05-31.
- The 18-mode typed contract is the test oracle: when the relay adds a mode, CI fails on a contract-gap assertion, catching incompatibility before deployment rather than after a runtime error.
- Date/time NLU is rule-based and deterministic (relative → absolute); the LLM is invoked only where intent is ambiguous.
- Opt-in KB-retrieval override (Korean general-chat path, question ≥ 5 chars, tenant `rag_key` present): oversamples ~20 candidates from a live Seoul KB-retrieval Lambda → Amazon Nova rerank (in-region) → top-5 chunks, returned only if the score is **≥ 0.5**, then a grounded **Nova 2 Lite** answer. On any miss it fails closed, falling through to the existing ungrounded answer rather than fabricating content.
- Verified live at ~6.9s KB response (well within the Lambda timeout budget), with the rollback ECR digest preserved before cutover.
- Stack: Python 3.13+ · AWS Bedrock Converse · Amazon Nova.

More from the same delivery pattern:

- **Knowledge Base management backend** (**108 commits / 61 merged PRs**): a Bedrock KB admin service taken from zero to production, built on FastAPI / Lambda + CloudFront, Terraform, and E2E tests.
- **Speech-to-speech voice demo** (68 commits): OpenAI Realtime → Bedrock Nova Sonic voice pipeline, a live serverless CES/booth-grade demo.
- **KB Q/A auto-optimization pipeline** (~96 commits): Korean clinic KB Q/A, a 7-stage hallucination-defense pipeline (Bedrock Claude Sonnet + Nova Pro cross-validation, Google Sheets reviewer handoff).
- **Seoul-first agent refactor** (16 commits) · **billing automation**: monthly token-usage reporting for the hospital AI platform.

---

## Engineering culture and AX

I drove the internal AI-transformation and engineering-standards work, turning my own workflow into shared tooling, standards, and onboarding.

- **[openrabbit](https://github.com/hongvincent/openrabbit), public, Apache-2.0.** A high-trust, Bedrock-only AI code reviewer on a find-broad / verify-strict split: an Amazon Nova 2 Lite finder for a cheap high-recall pass, then a cross-family GPT-5.4 verifier (via Bedrock) that drops low-confidence findings, gated by an FP<10% eval and shipped as a SHA-pinned GitHub Action with OIDC keyless auth. Built solo end-to-end in a day; live validation caught 3 integration bugs mocks had hidden. Now a CI review gate across other repos, its action re-pinned to fresh commit SHAs four times across releases.
- **Agent-driven development.** Authored the org's shared **Claude Code configuration** and custom skill library standardizing AI-assisted workflows, plus **ADD/TDD practical playbooks** for the team.
- **Org repo governance and security baseline.** Authored the TalkCRM org's repository-governance baseline: triaged **50+ repositories** to a managed **Active 10 / Archived 42** split with lifecycle tagging, and elevated Dependabot from optional to a mandatory, auditable org standard, all run through `gh` CLI with zero code loss.
- **Developer enablement.** Built **git-quest**, a live 2-hour git RPG onboarding workshop (13 missions) with a Nova 2 Lite AI code-review gate, in the [`smnt-study`](https://github.com/smnt-study) org.

---

## How I work

- **Fail-closed in a healthcare domain.** Return nothing rather than a low-confidence or fabricated answer, and put security gates (SMS verification, score thresholds) before any action.
- **Contract-driven boundaries.** Draw the boundary so each part is independently testable and replaceable; compatibility is defined by the typed contract, not the implementation.
- **Cost-aware model routing.** A cheap fast model on the common path, a stronger model only on escalation, with cost and latency budgeted up front rather than optimized later.
- **PR-first even solo.** Review-gated delivery (651 merged PRs as a single author) so the workflow stays auditable and CI-verified from the first commit.

---

## Languages

Hand-curated to reflect real usage including private org work; the public top-langs widget under-represents this, since most of my code lives in private/org repos.

- **Primary:** Python, TypeScript
- **Supporting:** SQL, Terraform (HCL), Bash
- **Side project:** Dart / Flutter

---

## Activity

<!-- profile-metrics:start -->
- Last updated: 2026-07-06
- 5,712 contributions in the last 12 months
- 22 pull request contributions and 192 commit contributions across 13 repositories
- 22 owned public repositories and 70 owned private repositories (excluding forks)
- Private and internal work represent most of the recent contribution volume
<!-- profile-metrics:end -->

---

**Contact:** [smnt.subin@talkcrm24.com](mailto:smnt.subin@talkcrm24.com). I can walk through any of the private systems above, with architecture diagrams and references, on request.
