# Subin Hong (홍수빈)

**English** | [한국어](README_KO.md)

**AI Engineer · Production LLM Agents on AWS Bedrock**

I build and ship production AI agents at **Sungmin Networks**. As primary engineer (sole lead author, **1,149 commits**) I work on a multi-tenant hospital consultation system that serves 5 production hospital tenants in 12 languages on AWS Bedrock AgentCore, plus a stateless reservation agent for the same platform's omni-channel relay. Public records list me as the product engineer behind a **CES 2026 Innovation Award (AI category)** honoree, and as a **MFDS Red-Team Challenge Grand Prize (2025)** winner.

Most of my code is org-owned and private (under the **TalkCRM** platform org), so this profile leads with verifiable numbers and public award links where they exist. I can walk through the architecture and provide references on request.

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

- Multi-tenant conversational AI agents on AWS Bedrock, with multilingual NLU/NLG and RAG retrieval, plus tool-calling against real CRM and reservation systems.
- Stateless, contract-bound services where the agent owns language and the relay owns state, so each piece can be redeployed on its own.
- Fail-closed retrieval and security layers for a healthcare domain. It favors precision over recall and blocks unauthenticated mutations; on low confidence it returns nothing rather than a fabricated answer.
- Test-first Python codebases (FastAPI / pytest) with infrastructure as code (Terraform) and CI verification from the first commit.

---

## Recognition and awards

The awards below carry public evidence links, with scope stated per item.

### Adversarial AI / red-team

- **Korea MFDS (Ministry of Food & Drug Safety) Advanced AI Digital Medical Product Red-Team Challenge, Grand Prize (최우수상), Sep 2025.** Asia's first red-team challenge for generative-AI medical-device LLMs, with 100+ participants simulating attacks on LLMs intended for generative-AI medical devices. I found critical vulnerabilities through prompt-injection attacks and by inducing HIPAA-violating outputs in commercial medical LLMs. Judging weighed technical difficulty, risk severity, attack creativity, and reproducibility. [Announcement](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=221)
- **AIM Intelligence AI Red-Team Arena 2026, #32 globally** (**642 points**, **73** confirmed LLM safety breaches across GPT-5.4, Claude Opus, Gemini Flash, and MiMo over the T1/T2 tracks). One transferable finding: arena-grade judges score *action* (refusal vs. compliance) and *severity* on separate StrongREJECT rubric items, so a defense that only hardens refusal still leaks on severity. [Leaderboard](https://judgementday.aim-intelligence.com/leaderboard)

### Shipped AI products

- **CES 2026 Innovation Award, Artificial Intelligence category.** Sungmin Networks' AICC-based medical CRM platform "TalkCRM AI" received a CES 2026 Innovation Award (selected from 3,000+ global entries, announced Nov 2025). I am the primary engineer of **smnt-agent-core**, the production AI agent that powers TalkCRM AI. This is my contribution to the award-winning product, not a personal award. [Announcement](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=267)
- **KSA Service AI Leader Award 2026, Korea Standards Association, leading-enterprise division.** Sungmin Networks was selected for the Service AI Leader Award, alongside LG Electronics, SK Telecom, and Samsung Medical Center, for the entry *"24/7, 12-language smart hospital administration: an AI-agent field case overcoming structural staffing shortages."* That entry is the production agent I lead (`smnt-agent-core`), and I authored the award submission as the responsible engineer. The Korea Standards Association grants the award, with the ceremony in July 2026. The public announcement is forthcoming, link to follow.

---

## Featured delivery (private / org-owned)

### smnt-agent-core: hospital consultation AI agent
Handles **5 production hospital tenants across 12 languages**. A 2-stage routing layer (Amazon Nova 2 Lite fast-path, then Claude Haiku 4.5 escalation) sits inside a **20-layer defense-in-depth** architecture, and every LLM call is traced in Datadog LLMObs.

- Primary implementor, **1,149 commits** (sole lead author) since 2026-01-22.
- Built on the **Strands Agents SDK (deployed on v1.32.0)** over **AWS Bedrock AgentCore** (not Bedrock Agents) for full control of multi-turn flows, custom tools, and response filtering.
- The 20-layer defense covers distinct stages: input validation, prompt-injection screening, threat scoring, an enforce-vs-notify policy split, and output filtering, among others.
- Tool chain: `search_knowledge_base` (RAG) → `get_customer_crm_info` (SMS identity verification) → `manage_reservation` (booking CRUD); the CRM layer rejects any unauthenticated mutation.
- Runtime: Lambda Proxy → ARM64 Bedrock AgentCore container (port 8080) → FastAPI with streaming middleware. A pre-warmed agent pool absorbs cold-start latency, and a dual-layer session store (TTL expiry plus LRU eviction) bounds memory under concurrent tenants. Per-tenant Knowledge Base routing isolates each hospital's data.
- Architecture documented as an auto-generated knowledge graph: **770 nodes / 1,097 edges across 13 layers** (API entry, tools, defense, session and multi-tenancy, observability, KB ingest, IaC, CI/CD), with a 14-step guided tour.
- Stack: Python 3.11+ · FastAPI · Strands Agents · Bedrock AgentCore · Nova 2 Lite · Haiku 4.5 · Datadog LLMObs · Terraform.

### smnt-thin-agent-core: stateless NLU+NLG reservation agent
A pure-language agent with a hard boundary: it implements 17 reservation modes, holds no session state, and performs no DB writes. The relay owns execution, and this agent owns only utterance analysis and sentence generation, so two identical `/invoke` calls are independent. Because the agent is stateless and contract-bound, it is straightforward to test: **1,656 tests at 96% coverage**, deployed to AWS Lambda (dev) and live A/B verified against real tenants.

- Lead engineer, **91 commits** (plus 31 from a teammate) since 2026-05-31.
- The 17-mode typed contract is the test oracle. CI fails on a contract-gap assertion when the relay adds a new mode, which surfaces incompatibility before deployment rather than after a runtime error.
- Date/time NLU is rule-based and deterministic (relative to absolute); the LLM is invoked only where intent is ambiguous.
- Opt-in KB-retrieval override (Korean general-chat path, question ≥ 5 chars, tenant `rag_key` present): it oversamples ~20 candidates from the live Seoul `smnt-seoul-kb-retrieve` Lambda → Amazon Nova rerank (in-region) → top-5 chunks, returned only if the score clears **0.5**, then a grounded **Nova 2 Lite** answer. On any miss it fails closed, falling through to the existing ungrounded answer rather than returning 503 or fabricating content.
- Verified live at ~6.9s KB response, well under the 28s Lambda timeout, and the rollback ECR digest is preserved before cutover.
- Stack: Python 3.13+ · AWS Bedrock Converse · Amazon Nova.

---

## Engineering culture and AX

I drove the internal AI-transformation and engineering-standards work, building the shared tooling and conventions described below.

- **Agent-driven development.** I authored the org's shared **Claude Code configuration** and custom skill library (`claude-code-config`), which standardizes AI-assisted, agent-driven development workflows across the engineering team.
- **Org repo governance and security baseline.** I authored the TalkCRM org repo-governance baseline (`repo-governance`): I triaged **50+ repositories** to a managed **Active 10 / Archived 42** split with **100% lifecycle-topic tagging** and an org-wide Dependabot security policy, run through the `gh` CLI with zero code loss.
- **Developer enablement.** I built **git-quest**, a 2-hour hands-on git RPG onboarding workshop with an AI code-review gate (Amazon Nova 2 Lite). It lives in the [`smnt-study`](https://github.com/smnt-study) org.

---

## More org contributions (private / TalkCRM org)

- **kb-admin** (~42 commits): AWS Bedrock Knowledge Base management web app. React + FastAPI + Lambda.
- **smnt-kb-qa-optimizer** (~96 commits): Korean ophthalmology-clinic KB Q/A auto-optimization, a 6-stage Bedrock Claude Sonnet pipeline with Amazon Nova Pro cross-validation and a Google Sheets reviewer handoff.
- **consultation-agent** (~15 commits): refactored hospital consultation agent (Strands + Bedrock AgentCore), Seoul-first.
- **smnt-billing-report**: monthly token-usage billing automation (Google Sheets) for the hospital AI agent.
- **smnt-aws-security-audit**: read-only AWS security-posture audit (Seoul + Virginia), with reusable collectors and zero production impact.

---

## How I work

- **Fail-closed in a healthcare domain.** Return nothing rather than a low-confidence or fabricated answer, and put security gates (SMS verification, score thresholds) before any action.
- **Contract-driven boundaries.** Draw the service boundary so each part is independently testable and replaceable. Compatibility is defined by the typed contract rather than the implementation.
- **Cost-aware model routing.** A cheap fast model on the common path, a stronger model only on escalation. Cost and latency are budgeted up front, not optimized later.

---

## Languages

Hand-curated to reflect real usage including private org work. The public top-langs widget under-represents this, since most of my code lives in private/org repos.

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

**Contact:** [smnt.subin@talkcrm24.com](mailto:smnt.subin@talkcrm24.com). I can walk through any of the private systems above, with architecture diagrams and references, on request.
