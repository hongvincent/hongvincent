# Subin Hong (홍수빈)

**English** | [한국어](README_KO.md)

**AI Engineer · Production LLM Agents on AWS Bedrock**

I build and ship production AI agents at **Sungmin Networks** — primary engineer (sole lead author, **1,149 commits**) on a multi-tenant hospital consultation system: 5 production hospital tenants, 12 languages, on AWS Bedrock AgentCore, plus a stateless reservation agent serving the same platform's omni-channel relay. Recognized publicly as the product engineer behind a **CES 2026 Innovation Award (AI category)** honoree, and as a **MFDS Red-Team Challenge Grand Prize (2025)** winner.

Most of my code is org-owned and private (under the **TalkCRM** platform org), so this profile leads with verifiable numbers and public award links where they exist. I'm happy to walk through the architecture and provide references in an interview.

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

## What I build

- Multi-tenant conversational AI agents on AWS Bedrock — multilingual NLU/NLG, RAG retrieval, and tool-calling against real CRM and reservation systems.
- Stateless, contract-driven services where the agent owns language and the relay owns state — designed so each piece can be redeployed independently.
- Fail-closed retrieval and security layers tuned for a healthcare domain: precision over recall, no unauthenticated mutations, no fabricated answers.
- Test-first Python codebases (FastAPI / pytest) with infrastructure as code (Terraform) and CI verification from the first commit.

---

## Recognition & awards

Two threads run through my work: I adversarially test LLM safety systems, and I build LLM products that ship. The awards below carry public evidence links; scope is stated precisely per item.

### Adversarial AI / red-team

- **Korea MFDS (Ministry of Food & Drug Safety) — Advanced AI Digital Medical Product Red-Team Challenge — Grand Prize (최우수상), Sep 2025.** Asia's first red-team challenge of its kind (100+ participants simulating attacks on LLMs intended for generative-AI medical devices). I uncovered critical vulnerabilities via prompt-injection attacks and by inducing HIPAA-violating outputs in commercial medical LLMs; judging weighed technical difficulty, risk severity, attack creativity, and reproducibility. [Announcement](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=221)
- **AIM Intelligence — AI Red-Team Arena 2026 — #32 globally** (**642 points**, **73** confirmed LLM safety breaches across GPT-5.4, Claude Opus, Gemini Flash, and MiMo over the T1/T2 tracks). Transferable finding: arena-grade judges score *action* (refusal vs. compliance) and *severity* independently via separate StrongREJECT rubric items — so a defense that only hardens refusal still leaks on severity. [Leaderboard](https://judgementday.aim-intelligence.com/leaderboard)

### Shipped AI products

- **CES 2026 Innovation Award — Artificial Intelligence category.** Sungmin Networks' AICC-based medical CRM platform "TalkCRM AI" received a CES 2026 Innovation Award (selected from 3,000+ global entries; announced Nov 2025). I am the primary engineer of **smnt-agent-core**, the production AI agent that powers TalkCRM AI — this is my contribution to the award-winning product, not a personal award. [Announcement](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=267)
- **KSA Service AI Leader Award 2026 — Korea Standards Association, leading-enterprise division.** Sungmin Networks was selected for the Service AI Leader Award — alongside LG Electronics, SK Telecom, Samsung Medical Center, and others — for the entry *"24/7, 12-language smart hospital administration: an AI-agent field case overcoming structural staffing shortages."* That entry is the production agent I lead (`smnt-agent-core`); I authored the award submission as the responsible engineer. Awarded by the Korea Standards Association; ceremony July 2026. *Public announcement forthcoming — link to follow.*

---

## Featured delivery (private / org-owned)

### smnt-agent-core — Hospital Consultation AI Agent
Serves **5 production hospital tenants across 12 languages**: a 2-stage routing layer (Amazon Nova 2 Lite fast-path → Claude Haiku 4.5 escalation) inside a **20-layer defense-in-depth** architecture, with every LLM call traced in Datadog LLMObs.

- Primary implementor — **1,149 commits** (sole lead author) since 2026-01-22.
- Built on the **Strands Agents SDK (deployed on v1.32.0)** over **AWS Bedrock AgentCore** (not Bedrock Agents) for full control of multi-turn flows, custom tools, and response filtering.
- The 20-layer defense is a real stack, not a tally: input validation, prompt-injection screening, threat scoring, an enforce-vs-notify policy split, and output filtering, among others.
- Tool chain: `search_knowledge_base` (RAG) → `get_customer_crm_info` (SMS identity verification) → `manage_reservation` (booking CRUD) — retrieve, verify identity, then act. No unauthenticated mutation reaches the CRM layer.
- Runtime: Lambda Proxy → ARM64 Bedrock AgentCore container (port 8080) → FastAPI with streaming middleware; a pre-warmed agent pool to absorb cold-start latency and a dual-layer session store (TTL expiry + LRU eviction to bound memory under concurrent tenants). Per-tenant Knowledge Base routing isolates each hospital's data.
- Architecture documented as an auto-generated knowledge graph: **770 nodes / 1,097 edges across 13 layers** (API entry, tools, defense, session & multi-tenancy, observability, KB ingest, IaC, CI/CD), with a 14-step guided tour.
- Stack: Python 3.11+ · FastAPI · Strands Agents · Bedrock AgentCore · Nova 2 Lite · Haiku 4.5 · Datadog LLMObs · Terraform.

### smnt-thin-agent-core — Stateless NLU+NLG Reservation Agent
A pure-language agent with a hard boundary: **17 reservation modes, no session state, no DB writes — the relay owns execution; this agent owns only utterance analysis and sentence generation.** Two identical `/invoke` calls are independent. That boundary is what made exhaustive testing possible: **1,656 tests at 96% coverage**, deployed to AWS Lambda (dev) and live A/B verified against real tenants.

- Lead engineer — **91 commits** (plus 31 from a teammate) since 2026-05-31.
- The 17-mode typed contract is the test oracle: CI fails on a contract-gap assertion when the relay adds a new mode, surfacing incompatibility before deployment rather than after a runtime error.
- Date/time NLU is rule-based and deterministic (relative → absolute); the LLM is invoked only where intent is genuinely ambiguous. Stochastic models are not applied where determinism is achievable.
- Opt-in KB-retrieval override (Korean general-chat path, question ≥ 5 chars, tenant `rag_key` present): oversamples ~20 candidates from the live Seoul `smnt-seoul-kb-retrieve` Lambda → Amazon Nova rerank (in-region) → returns the top-5 chunks only if the score clears **0.5** → grounded **Nova 2 Lite** answer. **On any miss it falls through to the existing ungrounded answer — it never returns 503 and never fabricates.** Fail-closed by design.
- Verified live at ~6.9s KB response, well under the 28s Lambda timeout; the rollback ECR digest is preserved before cutover.
- Stack: Python 3.13+ · AWS Bedrock Converse · Amazon Nova.

---

## Engineering culture & AX

Beyond shipping features, I drove the internal AI-transformation and engineering-standards work — building the tooling and norms that made the team faster.

- **Agent-driven development.** Authored the org's shared **Claude Code configuration** and custom skill library (`claude-code-config`) — standardizing AI-assisted, agent-driven development workflows across the engineering team.
- **Org repo governance & security baseline.** Authored the TalkCRM org repo-governance baseline (`repo-governance`): triaged **50+ repositories** to a managed **Active 10 / Archived 42** split with **100% lifecycle-topic tagging** and an org-wide Dependabot security policy — executed via the `gh` CLI with zero code loss.
- **Developer enablement.** Built **git-quest**, a 2-hour hands-on git RPG onboarding workshop with an AI code-review gate (Amazon Nova 2 Lite) — turning new-engineer git friction into interactive, automatically graded practice. (Lives in the [`smnt-study`](https://github.com/smnt-study) org.)

---

## More org contributions (private / TalkCRM org)

- **kb-admin** (~42 commits) — AWS Bedrock Knowledge Base management web app. React + FastAPI + Lambda.
- **smnt-kb-qa-optimizer** (~96 commits) — Korean ophthalmology-clinic KB Q/A auto-optimization: a 6-stage Bedrock Claude Sonnet pipeline with Amazon Nova Pro cross-validation and a Google Sheets reviewer handoff.
- **consultation-agent** (~15 commits) — refactored hospital consultation agent (Strands + Bedrock AgentCore), Seoul-first.
- **smnt-billing-report** — monthly token-usage billing automation (Google Sheets) for the hospital AI agent.
- **smnt-aws-security-audit** — read-only AWS security-posture audit (Seoul + Virginia): reusable collectors, zero production impact.

---

## How I work

- **Fail-closed in a healthcare domain.** Return nothing rather than a low-confidence or fabricated answer; security gates (SMS verification, score thresholds) precede any action.
- **Contract-driven boundaries.** Draw the service boundary so each part is independently testable and replaceable — the typed contract, not the code, is the unit of compatibility.
- **Cost-aware model routing.** Cheap fast model on the common path, stronger model only on escalation; cost and latency are design inputs, not afterthoughts.

---

## Languages

Hand-curated to reflect real usage including private org work (the public top-langs widget under-represents this, since most of my code lives in private/org repos):

- **Primary:** Python, TypeScript
- **Supporting:** SQL, Terraform (HCL), Bash
- **Side project:** Dart / Flutter

---

## Activity

<!-- profile-metrics:start -->
- Last updated: 2026-06-20
- 3,226 contributions in the last 12 months
- 3,101 restricted contributions from private and organizational repositories
<!-- profile-metrics:end -->

---

**Open to:** AI Engineer · LLM Application Engineer · Applied AI / ML Engineer · Backend Engineer (AI/LLM Systems) · AI Platform Engineer

Reach me at [smnt.subin@talkcrm24.com](mailto:smnt.subin@talkcrm24.com) — I can walk through any of the private systems above, with architecture diagrams and references, in an interview.