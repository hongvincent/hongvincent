<div align="right">
  <strong>English</strong> · <a href="README_KO.md">한국어</a>
</div>

# Subin Hong (홍수빈)
### AI Systems & Platform Engineer · LLM Red-Teamer
*Production Agentic Systems · Defense-in-Depth Architecture · Cloud-Native Platforms*

[![CES 2026 Innovation Award Honoree](https://img.shields.io/badge/CES_2026-AI_Innovation_Award_Honoree-0284c7?style=flat-square)](https://www.ces.tech/ces-innovation-awards/2026/talkcrm-ai-intelligent-care-communication-platform/)
[![AIM Arena 2026 — #33 Global](https://img.shields.io/badge/AIM_Arena_2026-%2333_Global_Leaderboard-b91c1c?style=flat-square)](https://judgementday.aim-intelligence.com/leaderboard)
[![SFASS 2026 — 5th of Top 7](https://img.shields.io/badge/SFASS_2026-5th_of_on--site_Top_7-b91c1c?style=flat-square)](https://www.newsis.com/view/NISX20260708_0003701530)
[![MFDS Red-Team 2025 — Grand Prize](https://img.shields.io/badge/MFDS_Red--Team_2025-Grand_Prize-b91c1c?style=flat-square)](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=221)

| Dimension | Specification |
|---|---|
| **Primary Focus** | Production Agentic Orchestration on AWS Bedrock · Adversarial Safety · Resilient Serverless Platforms |
| **Engineering Track** | 3 Personal Red-Team Accolades · Primary Engineer for 2 Award-Winning Shipped Platforms |
| **Production Scale** | Autonomous Hospital Agent: 5 Tenants × 12 Languages · 1,152 Commits · 116 Releases (Sole Author) |
| **Location** | Seoul, South Korea |

---

## 📊 Production Scale & Engineering Velocity

| Metric | Footprint | Architectural Significance |
|---|:---:|---|
| **Multi-Tenant Concurrency** | **5 Tenants × 12 Languages** | Strict data isolation via per-tenant KMS & Bedrock KB routing |
| **Full Lifecycle Delivery** | **1,152 Commits · 651 PRs · 116 Releases** | Empty-repo to live serverless production as sole author |
| **Automated Test Oracle** | **1,656 Tests · 96% Coverage** | Contract-driven test oracle; zero DB mutation without auth |
| **Defensive Control Catalog** | **198 Codified Controls** | 128 infra + 70 KISA rules codified into reusable skills |

---

## 🚀 Flagship System: Autonomous Healthcare Agent

> Production conversational AI agent serving 5 hospital networks across 12 languages with end-to-end multi-turn tool execution.

```mermaid
flowchart LR
    Client([User Utterance]) --> Ingress[Lambda Ingress Proxy]
    Ingress --> Guard[Input Screening & Threat Scoring]
    Guard --> Router{Cost & Complexity}
    Router -->|Fast Path / Common| Nova[Amazon Nova 2 Lite]
    Router -->|Clinical / Complex| Haiku[Claude Haiku 4.5]
    Nova & Haiku --> ToolGate{Auth & Schema Gate}
    ToolGate -->|Valid SMS Auth| CRM[CRM / Booking Mutation]
    ToolGate -->|Read Only| KB[(Bedrock Knowledge Base)]
    CRM & KB --> OutputGuard[HIPAA / PII Scrub]
    OutputGuard --> Stream([FastAPI SSE Stream])
```

- **Two-Stage Model Routing:** Low-latency common queries route through Amazon Nova 2 Lite; complex clinical escalations pass to Claude Haiku 4.5, optimizing token cost and latency.
- **Fail-Closed Retrieval:** Knowledge Base candidate retrieval oversamples 20 chunks; reranker drops scores < 0.5 directly to deterministic fallback, preventing medical hallucinations.
- **Strict State Separation:** The LLM executes utterance analysis and sentence generation only; state persistence and CRM mutations require valid SMS auth tokens.

<details>
<summary><b>🔍 View 20-Layer Defense-in-Depth Specification (Click to expand)</b></summary>

<br>

| Tier | Layer Range | Defense Mechanism & Implementation |
|---|---|---|
| **Ingress & AST** | Layers 1–5 | Non-printable Unicode normalization, prompt injection pattern matching, and input length bounding. |
| **Semantic & Intent** | Layers 6–10 | Jailbreak heuristic evaluation, dynamic threat scoring, and enforce-vs-notify policy split. |
| **Execution Sandbox** | Layers 11–15 | Pre-warmed ARM64 container runtime isolation, read-only AST checkers, and SMS authentication gates. |
| **Egress & Audit** | Layers 16–20 | PII scrubbing, HIPAA compliance filter, and Datadog LLMObs distributed tracing. |

</details>

---

## ⚡ Zero-to-Production Deliveries

The same empty-repo-to-live-serverless motion, repeated across high-assurance services.

| System | Scale & Rigor | Architectural Core |
|---|---|---|
| **Stateless NLU+NLG Reservation Agent** | 162 commits · 82 PRs · 1,656 tests (96% coverage) | 17-mode typed contract serves as test oracle; rule-based deterministic date/time resolution; zero DB writes. |
| **Knowledge Base Admin Backend** | 116 commits · 68 PRs · E2E verified | Bedrock KB administrative control plane on FastAPI / Lambda + CloudFront with Terraform IaC. |
| **Speech-to-Speech Voice Demo** | 68 commits · Real-time pipeline | Low-latency voice agent: OpenAI Realtime → Bedrock Nova Sonic pipeline in serverless environment. |

---

## 🛡️ Defensive Engineering & AX Enablement

- **Read-Only Security Framework:** Codified 198 controls (128 infrastructure + 70 KISA application checks) into shareable Claude Code skills with AST-level gates blocking credential minting.
- **Engineering Governance:** Triaged 50+ repositories into an Active 10 / Archived 42 lifecycle split with automated Dependabot CI and commit-SHA action pinning.
- **Developer Enablement (git-quest):** Built a 13-mission git onboarding RPG workshop with an AI code-review gate on Amazon Nova 2 Lite.

---

## 🛠️ Core Competencies & Stack

| Domain | Technologies & Infrastructure |
|---|---|
| **Agentic AI & Orchestration** | ![Python](https://img.shields.io/badge/Python_3.11+-3776AB?style=flat-square&logo=python&logoColor=white) ![AWS Bedrock](https://img.shields.io/badge/AWS_Bedrock-232F3E?style=flat-square&logo=amazonaws&logoColor=white) ![Claude](https://img.shields.io/badge/Claude_Haiku_4.5-D97757?style=flat-square&logo=anthropic&logoColor=white) ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white) ![Strands](https://img.shields.io/badge/Strands_Agents-1.32.0-059669?style=flat-square) |
| **Cloud & Platform** | ![AWS Lambda](https://img.shields.io/badge/AWS_Lambda-FF9900?style=flat-square&logo=awslambda&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white) ![Docker](https://img.shields.io/badge/Docker_ARM64-2496ED?style=flat-square&logo=docker&logoColor=white) ![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=flat-square&logo=terraform&logoColor=white) |
| **Security & Observability** | ![Datadog](https://img.shields.io/badge/Datadog_LLMObs-632CA6?style=flat-square&logo=datadog&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white) ![OpenSSF](https://img.shields.io/badge/OpenSSF-Scorecard-blue?style=flat-square) ![TruffleHog](https://img.shields.io/badge/TruffleHog-CI_Scanning-black?style=flat-square) |

---

## 🏆 Honors & Recognition

### Adversarial AI & Red-Teaming (Personal)
| Credential | Result | Evidence |
|---|---|---|
| **SFASS 2026 AI Red-Teaming Workshop** (2026-07-08) | 5th of on-site Top 7 | ETRI-issued certificate · [Coverage](https://www.newsis.com/view/NISX20260708_0003701530) |
| **AIM Intelligence AI Red-Team Arena 2026** (Apr–Jun 2026) | #33 on global leaderboard (709.00 pts / 91 breaches) | [Leaderboard](https://judgementday.aim-intelligence.com/leaderboard) |
| **Korea MFDS AI Medical-Device Red-Team Challenge** (Sep 2025) | Grand Prize (최우수상) | [Announcement](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=221) |

### Shipped AI Products (Primary Engineer)
| Product & Honor | Role | Evidence |
|---|---|---|
| **CES 2026 Innovation Award (Artificial Intelligence)** | Primary engineer of production AI agent | [CES Honoree](https://www.ces.tech/ces-innovation-awards/2026/talkcrm-ai-intelligent-care-communication-platform/) · [Announcement](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=267) |
| **KSA Service AI Leader Award 2026 (Korea Standards Assoc.)** | Responsible engineer; authored submission | [Announcement](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=328) |

---

## 📈 Activity

<!-- profile-metrics:start -->
- Last updated: 2026-09-06
- 8,683 contributions in the last 12 months
- 23 pull request contributions and 199 commit contributions across 13 repositories
- 22 owned public repositories and 79 owned private repositories (excluding forks)
- Private and internal work represent most of the recent contribution volume
<!-- profile-metrics:end -->

---

<div align="center">
  <sub>Open to technical discussions, architecture walkthroughs, and security research collaboration via GitHub.</sub>
</div>
