<div align="right">
  <a href="README.md">English</a> · <strong>한국어</strong>
</div>

# 홍수빈 (Subin Hong)
### AI 시스템 & 플랫폼 엔지니어 · LLM 레드팀
*프로덕션 에이전틱 시스템 · 심층 방어(Defense-in-Depth) 아키텍처 · 클라우드 네이티브 플랫폼*

[![CES 2026 혁신상 AI 부문 선정](https://img.shields.io/badge/CES_2026-AI_혁신상_선정작-0284c7?style=flat-square)](https://www.ces.tech/ces-innovation-awards/2026/talkcrm-ai-intelligent-care-communication-platform/)
[![AIM Arena 2026 — 글로벌 33위](https://img.shields.io/badge/AIM_Arena_2026-%EA%B8%80%EB%A1%9C%EB%B2%8C_33%EC%9C%84-b91c1c?style=flat-square)](https://judgementday.aim-intelligence.com/leaderboard)
[![SFASS 2026 — 현장 Top 7 중 5위](https://img.shields.io/badge/SFASS_2026-%ED%98%84%EC%9E%A5_Top_7_%EC%A4%91_5%EC%9C%84-b91c1c?style=flat-square)](https://www.newsis.com/view/NISX20260708_0003701530)
[![식약처 AI 의료기기 레드팀 — 최우수상](https://img.shields.io/badge/%EC%8B%9D%EC%95%BD%EC%B2%98_%EB%A0%88%EB%93%9C%ED%8C%80_2025-%EC%B5%9C%EC%9A%B0%EC%88%98%EC%83%81-b91c1c?style=flat-square)](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=221)

| 분류 | 내용 |
|---|---|
| **핵심 전문성** | AWS Bedrock 기반 프로덕션 에이전틱 오케스트레이션 · 적대적 AI 안전성 · 고가용성 서버리스 플랫폼 |
| **대외 인정** | 개인 AI 레드팀 공식 인증 3건 · 수상 프로덕션 플랫폼 2건의 주 개발자 |
| **프로덕션 규모** | 자율 병원 상담 에이전트: 5개 테넌트 × 12개 언어 라이브 · 1,152 커밋 · 116 릴리즈 (단독 개발) |
| **위치** | 서울, 대한민국 |

---

## 📊 프로덕션 규모 & 엔지니어링 벨로시티

| 핵심 지표 | 프로덕션 규모 | 아키텍처적 의의 |
|---|:---:|---|
| **멀티 테넌트 동시성** | **5개 병원 테넌트 × 12개 언어** | 테넌트별 전용 KMS 및 Bedrock KB 라우팅을 통한 엄격한 데이터 격리 |
| **엔드투엔드 라이프사이클** | **1,152 커밋 · 651 머지 PR · 116 릴리즈** | 빈 저장소부터 라이브 서버리스 프로덕션까지 단독 엔지니어링 |
| **자동화 테스트 오라클** | **1,656개 테스트 · 96% 커버리지** | 타입 계약 기반 오라클; 인증 없는 DB 상태 변이 원천 차단 |
| **보안 가드레일 자동화** | **198개 코드화된 컨트롤** | 128개 인프라 + 70개 KISA 규정 기반 재사용 가능 스킬 프레임워크 |

---

## 🚀 플래그십 시스템: 자율 헬스케어 AI 에이전트

> 5개 병원 네트워크에 걸쳐 12개 언어로 multi-turn 도구 실행을 완결하는 프로덕션 대화형 AI 에이전트.

```mermaid
flowchart LR
    Client([사용자 발화]) --> Ingress[Lambda Ingress Proxy]
    Ingress --> Guard[입력 스크리닝 & 위협 스코어링]
    Guard --> Router{비용 & 복잡도}
    Router -->|Fast Path / 일반 상담| Nova[Amazon Nova 2 Lite]
    Router -->|에스컬레이션 / 임상 질의| Haiku[Claude Haiku 4.5]
    Nova & Haiku --> ToolGate{인증 & 스키마 게이트}
    ToolGate -->|SMS 인증 완료| CRM[CRM / 예약 변이]
    ToolGate -->|Read Only| KB[(Bedrock Knowledge Base)]
    CRM & KB --> OutputGuard[의료 정보 / 개인정보(PII) 필터]
    OutputGuard --> Stream([FastAPI SSE Stream])
```

- **2단계 모델 계층 라우팅:** 일반적인 경량 질의는 Amazon Nova 2 Lite로 고속 처리하고, 복잡한 임상/예약 질의만 Claude Haiku 4.5로 에스컬레이션하여 레이턴시와 토큰 비용을 최적화.
- **Fail-Closed 검색 원칙:** 지식 베이스(KB)에서 후보 청크 20개를 오버샘플링한 뒤 서울 리전 인하우스 리랭킹을 거쳐 유사도 점수 < 0.5인 경우 자동 fallback 처리함으로써 의료 할루시네이션 원천 차단.
- **엄격한 상태 분리:** LLM은 발화 분석과 문장 생성만을 수행하며, 상태 영속화 및 CRM 변이 작업은 유효한 SMS 인증 세션 토큰이 있을 때만 게이트 통과.

<details>
<summary><b>🔍 20계층 심층 방어(Defense-in-Depth) 세부 명세 열람 (클릭하여 펼치기)</b></summary>

<br>

| 계층 | 범위 | 방어 메커니즘 및 엔지니어링 구현 |
|---|---|---|
| **인그레스 & AST** | 1~5계층 | 비출력 유니코드 정규화, 프롬프트 인젝션 패턴 매칭, 입력 길이 상한 제한 |
| **시맨틱 & 의도** | 6~10계층 | 탈옥 시도 휴리스틱 평가, 동적 위협 스코어링, 차단/알림 정책 분리 |
| **실행 샌드박스** | 11~15계층 | 사전 웜업된 ARM64 컨테이너 런타임 격리, AST 레벨 읽기 전용 검증, SMS 인증 게이트 |
| **이그레스 & 감사** | 16~20계층 | PII 마스킹, 의료 정보 규정 준수 필터, Datadog LLMObs 분산 추적 |

</details>

---

## ⚡ 제로 투 프로덕션(Zero-to-Production) 딜리버리

검증된 서버리스 아키텍처 패턴을 바탕으로 고신뢰성 서비스를 반복 배포했습니다.

| 시스템 | 규모 및 테스트 | 아키텍처 핵심 |
|---|---|---|
| **무상태(Stateless) NLU+NLG 예약 에이전트** | 162 커밋 · 82 PR · 1,656개 테스트 (96% 커버리지) | 17개 모드 타입 계약을 테스트 오라클로 활용; 규칙 기반의 결정론적 날짜/시간 파싱; DB 쓰기 제로. |
| **지식 베이스(KB) 관리 백엔드** | 116 커밋 · 68 PR · E2E 검증 완료 | FastAPI / Lambda + CloudFront 기반 Bedrock KB 관리 제어 평면, Terraform IaC 구현. |
| **Speech-to-Speech 음성 데모** | 68 커밋 · 실시간 파이프라인 | OpenAI Realtime → Bedrock Nova Sonic으로 이어지는 저지연 서버리스 음성 에이전트. |

---

## 🛡️ 방어적 엔지니어링 & 개발자 생산성(AX)

- **읽기 전용 보안 자동화 프레임워크:** 자격 증명 발급이나 시크릿 조회를 AST 레벨에서 원천 차단하는 가드레일을 구축하고, 198개 컨트롤(인프라 128개 + KISA 70개)을 재사용 가능한 Claude Code 스킬로 패키징.
- **조직 레포 거버넌스:** 50개 이상의 저장소를 Active 10 / Archived 42 라이프사이클로 체계화하고 Dependabot 상시 정책화 및 Action Commit-SHA 고정 자동화.
- **개발자 온보딩 (git-quest):** Amazon Nova 2 Lite AI 코드 리뷰 게이트가 내장된 13개 미션의 2시간 git 온보딩 RPG 워크숍 구축.

---

## 🛠️ 핵심 기술 스택

| 분야 | 기술 및 인프라 |
|---|---|
| **에이전틱 AI & 오케스트레이션** | ![Python](https://img.shields.io/badge/Python_3.11+-3776AB?style=flat-square&logo=python&logoColor=white) ![AWS Bedrock](https://img.shields.io/badge/AWS_Bedrock-232F3E?style=flat-square&logo=amazonaws&logoColor=white) ![Claude](https://img.shields.io/badge/Claude_Haiku_4.5-D97757?style=flat-square&logo=anthropic&logoColor=white) ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white) ![Strands](https://img.shields.io/badge/Strands_Agents-1.32.0-059669?style=flat-square) |
| **클라우드 & 플랫폼** | ![AWS Lambda](https://img.shields.io/badge/AWS_Lambda-FF9900?style=flat-square&logo=awslambda&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white) ![Docker](https://img.shields.io/badge/Docker_ARM64-2496ED?style=flat-square&logo=docker&logoColor=white) ![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=flat-square&logo=terraform&logoColor=white) |
| **보안 & 옵저버빌리티** | ![Datadog](https://img.shields.io/badge/Datadog_LLMObs-632CA6?style=flat-square&logo=datadog&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white) ![OpenSSF](https://img.shields.io/badge/OpenSSF-Scorecard-blue?style=flat-square) ![TruffleHog](https://img.shields.io/badge/TruffleHog-CI_Scanning-black?style=flat-square) |

---

## 🏆 수상 및 대외 인증

### 적대적 AI & 레드팀 (개인 부문)
| 인증 내역 | 결과 | 공식 증빙 |
|---|---|---|
| **SFASS 2026 AI 레드팀 워크숍** (2026.07.08) | 현장 Top 7 중 5위 | ETRI 발급 인증서 · [관련 보도](https://www.newsis.com/view/NISX20260708_0003701530) |
| **AIM Intelligence AI 레드팀 아레나 2026** (2026년 4~6월) | 글로벌 리더보드 33위 (709.00점 / 91건 위반) | [공식 리더보드](https://judgementday.aim-intelligence.com/leaderboard) |
| **식약처 AI 의료기기 레드팀 챌린지** (2025년 9월) | 최우수상 (Grand Prize) | [공식 발표](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=221) |

### 출시 AI 제품 (주 개발자 참여)
| 제품 및 수상 | 참여 역할 | 공식 증빙 |
|---|---|---|
| **CES 2026 Innovation Award (인공지능 부문)** | 구동 프로덕션 AI 에이전트 주 개발자 | [CES 선정](https://www.ces.tech/ces-innovation-awards/2026/talkcrm-ai-intelligent-care-communication-platform/) · [공식 발표](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=267) |
| **KSA 서비스 AI 리더상 2026 (한국표준협회)** | 담당 엔지니어, 출품작 작성 | [공식 발표](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=328) |

---

## 📈 활동 지표

<!-- profile-metrics:start -->
- 최종 업데이트: 2026-09-06
- 최근 12개월 기여 8,683건
- 13개 레포에 걸쳐 pull request 기여 23건, 커밋 기여 199건
- 소유 공개 레포 22개, 소유 비공개 레포 79개 (포크 제외)
- 비공개·사내 작업이 최근 기여량의 대부분
<!-- profile-metrics:end -->

---

<div align="center">
  <sub>GitHub을 통한 기술 토론, 아키텍처 논의 및 보안 연구 협업 환영합니다.</sub>
</div>
