<div align="right">
  <strong>English</strong> · <a href="README_KO.md">한국어</a>
</div>

# Subin Hong (홍수빈)
**AI Systems Engineer · LLM Red-Teamer** — *Production Agentic Systems & Adversarial Safety*

[![CES 2026 Innovation Award Honoree](https://img.shields.io/badge/CES_2026-AI_Innovation_Award_Honoree-0284c7?style=flat-square)](https://www.ces.tech/ces-innovation-awards/2026/talkcrm-ai-intelligent-care-communication-platform/)
[![AIM Arena 2026 — #33 Global](https://img.shields.io/badge/AIM_Arena_2026-%2333_Global_Leaderboard-b91c1c?style=flat-square)](https://judgementday.aim-intelligence.com/leaderboard)
[![SFASS 2026 — 5th of Top 7](https://img.shields.io/badge/SFASS_2026-5th_of_Top_7-b91c1c?style=flat-square)](https://www.newsis.com/view/NISX20260708_0003701530)
[![MFDS Red-Team 2025 — Grand Prize](https://img.shields.io/badge/MFDS_Red--Team_2025-Grand_Prize-b91c1c?style=flat-square)](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=221)

| Production Footprint | Full-Lifecycle Velocity | Testing & Verification | Defensive Automation |
|:---:|:---:|:---:|:---:|
| **5 Hospitals × 12 Languages**<br><sub>Nova 2 Lite + Haiku 4.5 routing</sub> | **1,152 Commits · 116 Releases**<br><sub>Sole author, empty repo → live</sub> | **1,656 Tests · 96% Coverage**<br><sub>Typed contract oracle · SMS auth</sub> | **198 Codified Controls**<br><sub>128 infra + 70 KISA guardrails</sub> |

```
• Core AI & Cloud: Python 3.11+ · AWS Bedrock (AgentCore) · Claude Haiku 4.5 · Nova 2 Lite · FastAPI · Lambda · PostgreSQL · Terraform
• Security & Ops:  Datadog LLMObs · AST Read-Only Screening · TruffleHog CI · GitHub Actions · OpenSSF Scorecard
```

### 🏆 Verified Honors
- **CES 2026 AI Innovation Award Honoree**: Primary engineer of production AI agent ([CES Honoree](https://www.ces.tech/ces-innovation-awards/2026/talkcrm-ai-intelligent-care-communication-platform/) · [Announcement](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=267))
- **AIM Arena 2026**: #33 on global leaderboard (709.00 pts / 91 confirmed breaches) ([Leaderboard](https://judgementday.aim-intelligence.com/leaderboard))
- **SFASS 2026**: 5th of on-site Top 7 ([Coverage](https://www.newsis.com/view/NISX20260708_0003701530)) · **Korea MFDS Challenge 2025**: Grand Prize ([Announcement](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=221))

<details>
<summary><b>🔍 Architecture Deep Dive & 20-Layer Defense Matrix (Click to expand)</b></summary>

<br>

#### Flagship: Healthcare AI Agent Architecture
```mermaid
flowchart LR
    Client([User Utterance]) --> Ingress[Lambda Ingress Proxy]
    Ingress --> Guard[Screening & Threat Scoring]
    Guard --> Router{Complexity}
    Router -->|Fast Path| Nova[Amazon Nova 2 Lite]
    Router -->|Escalation| Haiku[Claude Haiku 4.5]
    Nova & Haiku --> ToolGate{Auth Gate}
    ToolGate -->|SMS Auth| CRM[CRM / Booking Mutation]
    ToolGate -->|Read Only| KB[(Bedrock Knowledge Base)]
    CRM & KB --> OutputGuard[HIPAA / PII Scrub]
    OutputGuard --> Stream([FastAPI SSE Stream])
```

- **Two-Stage Model Routing:** Low-latency queries route through Nova 2 Lite; complex clinical escalations pass to Claude Haiku 4.5.
- **Fail-Closed Retrieval:** KB oversamples 20 chunks → Seoul in-region reranker → threshold ≥ 0.5; fallback on miss to eliminate hallucinations.
- **Zero-to-Production Deliveries:** Stateless reservation agent (17 typed modes, 1,656 tests, 96% coverage) · Bedrock KB admin backend (FastAPI/Lambda/Terraform) · Real-time voice agent (OpenAI Realtime → Bedrock Nova Sonic).

| Tier | Layers | Defense Mechanism & Implementation |
|---|---|---|
| **Ingress & AST** | L1–L5 | Unicode normalization, prompt injection screening, strict input bounding |
| **Semantic & Intent** | L6–L10 | Jailbreak heuristics, dynamic threat scoring, enforce-vs-notify policy split |
| **Execution Sandbox** | L11–L15 | Pre-warmed ARM64 container isolation, read-only AST checkers, SMS auth gates |
| **Egress & Audit** | L16–L20 | PII scrubbing, HIPAA compliance filter, Datadog LLMObs distributed tracing |

#### Activity
<!-- profile-metrics:start -->
- Last updated: 2026-09-06
- 8,685 contributions in the last 12 months
- 23 pull request contributions and 201 commit contributions across 13 repositories
- 22 owned public repositories and 79 owned private repositories (excluding forks)
- Private and internal work represent most of the recent contribution volume
<!-- profile-metrics:end -->

</details>
