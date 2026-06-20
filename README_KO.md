[English](README.md) | **한국어**

# 홍수빈 (Subin Hong)

**AI 엔지니어 · AWS Bedrock 기반 프로덕션 LLM 에이전트**

성민네트웍스 소속 AI 엔지니어로, 프로덕션 AI 에이전트를 직접 설계하고 배포합니다. 멀티 테넌트 병원 상담 시스템의 주 개발자(단독 리드, **1,149 커밋**)로 일했고, 이 시스템으로 AWS Bedrock AgentCore 위에서 5개 병원 테넌트와 12개 언어를 운영합니다. 같은 플랫폼의 옴니채널 릴레이에 붙는 무상태 예약 에이전트도 함께 만들었습니다. 대외적으로는 **CES 2026 Innovation Award(AI 부문)** 수상 제품의 개발 엔지니어, **식품의약품안전처 레드팀 챌린지 최우수상(2025)** 수상자로 인정받았습니다.

제 코드는 대부분 **TalkCRM** 플랫폼 조직 소유의 비공개 레포에 있습니다. 그래서 이 프로필은 검증 가능한 수치를, 그리고 공개돼 있으면 공식 수상 링크를 앞세웁니다. 인터뷰에서는 아키텍처를 직접 설명하고 레퍼런스도 제공할 수 있습니다.

서울 · [smnt.subin@talkcrm24.com](mailto:smnt.subin@talkcrm24.com)

---

## 핵심 역량

- 멀티 테넌트 LLM 에이전트 설계 및 프로덕션 배포 (AWS Bedrock AgentCore)
- RAG 파이프라인과 헬스케어 도메인 Fail-Closed 설계
- LLM 안전성 평가 / Red-Team (의료 AI 취약점 검증)

---

## 기술 스택

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

## 만드는 것

- 멀티 테넌트 대화형 AI 에이전트 (AWS Bedrock) — 다국어 NLU/NLG, RAG 검색, 실 CRM·예약 시스템과의 Tool-Calling 연동
- 에이전트가 언어를, 릴레이가 상태를 맡는 무상태·계약 기반 서비스 — 각 조각을 독립적으로 재배포할 수 있게 설계
- 헬스케어 도메인에 맞춘 Fail-Closed 검색·보안 계층 — 재현율보다 정밀도 우선, 인증 없는 변경 차단, 답변 환각 차단
- 테스트 우선 Python 코드베이스 (FastAPI / pytest) — 첫 커밋부터 IaC(Terraform)와 CI 검증 적용

---

## 수상 / 인증

제 일에는 두 축이 있습니다. 하나는 LLM 안전성 시스템을 적대적으로 검증하는 일, 다른 하나는 실제로 출시되는 LLM 제품을 만드는 일입니다. 아래 수상 항목에는 공개 증빙 링크가 있고, 항목마다 제 기여 범위를 정확히 적었습니다.

### 적대적 AI / Red-Team

- **식품의약품안전처 첨단 AI 디지털 의료제품 레드팀 챌린지 최우수상 (2025년 9월).** 아시아 최초로 열린 형태의 레드팀 챌린지로, 100명 이상이 생성형 AI 의료기기용 LLM을 대상으로 공격을 시뮬레이션. 상용 의료 LLM에서 프롬프트 인젝션으로 치명적 취약점을 찾아내고 HIPAA 위반 출력을 유도. 심사는 기술 난도, 위험 심각도, 공격 창의성, 재현성을 기준으로 진행. [공식 발표](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=221)
- **AIM Intelligence AI Red-Team Arena 2026 — 글로벌 32위** (**642점**, GPT-5.4·Claude Opus·Gemini Flash·MiMo 대상 T1/T2 트랙에서 LLM 안전성 위반 **73건** 확인). 다른 사례에도 적용되는 발견 — 아레나급 심사기는 *행동*(거부 vs. 응답)과 *심각도*를 별도의 StrongREJECT 루브릭 항목으로 따로 채점. 그래서 거부만 강화한 방어는 심각도 쪽에서 여전히 새어 나옴. [리더보드](https://judgementday.aim-intelligence.com/leaderboard)

### 출시한 AI 제품

- **CES 2026 Innovation Award — 인공지능(AI) 부문.** 성민네트웍스의 AICC 기반 의료 CRM 플랫폼 "TalkCRM AI"가 CES 2026 Innovation Award 수상(전 세계 3,000여 출품작 중 선정, 2025년 11월 발표). 저는 TalkCRM AI를 구동하는 프로덕션 AI 에이전트 **smnt-agent-core**의 주 개발자로, 이 항목은 수상 제품에 대한 제 개발 기여이며 개인 수상은 아닙니다. [공식 발표](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=267)
- **KSA 서비스 AI 리더상 2026 — 한국표준협회, 선도기업 부문.** 성민네트웍스가 서비스 AI 리더상에 선정 — LG전자, SK텔레콤, 서울삼성병원(SMC) 등과 함께 수상. 출품작은 *"24시간·12개 국어로 작동하는 스마트 원무: 구조적 인력난을 뛰어넘는 AI 에이전트 실증 사례"*. 이 출품작이 바로 제가 리드하는 프로덕션 에이전트(`smnt-agent-core`)이며, 저는 담당 엔지니어로서 수상 출품작을 직접 작성. 주관은 한국표준협회, 시상식은 2026년 7월. *공식 발표·보도 예정 — 링크 추후 추가.*

---

## 주요 프로젝트 (비공개 / 조직 소유)

### smnt-agent-core — 병원 상담 AI 에이전트
**5개 병원 테넌트, 12개 언어**를 운영. 2단계 라우팅 계층(Amazon Nova 2 Lite 빠른 경로 → Claude Haiku 4.5 에스컬레이션)을 **20-layer defense-in-depth** 아키텍처 안에 두고, 모든 LLM 호출을 Datadog LLMObs로 추적.

- 주 구현자 — 2026-01-22 이후 단독 리드로 **1,149 커밋** 기여
- 멀티턴 흐름, 커스텀 툴, 응답 필터링을 완전히 제어하기 위해 **AWS Bedrock AgentCore**(Bedrock Agents 아님) 위에 **Strands Agents SDK(v1.32.0 배포)** 사용
- 20-layer 방어는 숫자 채우기가 아니라 실제 스택: 입력 검증, 프롬프트 인젝션 스크리닝, 위협 점수화, enforce vs. notify 정책 분리, 출력 필터링 등
- 툴 체인: `search_knowledge_base`(RAG) → `get_customer_crm_info`(SMS 본인 인증) → `manage_reservation`(예약 CRUD) — 검색하고, 신원을 확인한 뒤, 실행. 인증 없는 변경은 CRM 계층에 도달하지 못함
- 런타임: Lambda Proxy → ARM64 Bedrock AgentCore 컨테이너(포트 8080) → 스트리밍 미들웨어가 붙은 FastAPI. 콜드 스타트 지연을 흡수하는 사전 예열 에이전트 풀, 동시 테넌트 환경에서 메모리를 묶어두는 2계층 세션 스토어(TTL 만료 + LRU 제거). 테넌트별 Knowledge Base 라우팅으로 각 병원 데이터를 격리
- 아키텍처는 자동 생성 지식 그래프로 문서화: **13개 계층에 걸쳐 770개 노드 / 1,097개 엣지**(API 진입, 툴, 방어, 세션·멀티 테넌시, 관측성, KB 적재, IaC, CI/CD) + 14단계 가이드 투어
- 스택: Python 3.11+ · FastAPI · Strands Agents · Bedrock AgentCore · Nova 2 Lite · Haiku 4.5 · Datadog LLMObs · Terraform

### smnt-thin-agent-core — 무상태 NLU+NLG 예약 에이전트
경계를 못 박은 순수 언어 에이전트: **17개 예약 모드, 세션 상태 없음, DB 쓰기 없음 — 실행은 릴레이가 맡고, 이 에이전트는 발화 분석과 문장 생성만 담당.** 동일한 `/invoke` 두 번은 서로 독립적. 이 경계 덕에 전수 테스트가 가능했고, **1,656 테스트 / 커버리지 96%**를 달성. AWS Lambda(dev)에 배포해 실 테넌트 대상 라이브 A/B로 검증.

- 리드 엔지니어 — 2026-05-31 이후 **91 커밋**(팀원 31 커밋 별도)
- 17개 모드 타입 계약이 테스트 오라클: 릴레이가 새 모드를 추가하면 CI가 contract-gap 단언에서 실패해, 런타임 오류가 나기 전 배포 단계에서 비호환을 드러냄
- 날짜·시간 NLU는 규칙 기반 결정론(상대 → 절대). LLM은 의도가 정말 모호한 곳에서만 호출. 결정론으로 처리할 수 있는 곳에는 확률적 모델을 쓰지 않음
- 옵트인 KB 검색 오버라이드(한국어 일반 대화 경로, 질문 5자 이상, 테넌트 `rag_key` 존재): 서울 `smnt-seoul-kb-retrieve` Lambda에서 후보 약 20개를 과표집 → Amazon Nova 리랭크(in-region) → 점수가 **0.5**를 넘을 때만 상위 5개 청크 반환 → grounded **Nova 2 Lite** 답변. **미스가 나면 grounding 없는 기존 답변으로 폴스루 — 503을 반환하지 않고, 지어내지도 않는다.** 설계 자체가 Fail-Closed
- 라이브에서 KB 응답 약 6.9초로 검증(28초 Lambda 타임아웃에 충분히 못 미침). 전환 전 롤백용 ECR 다이제스트를 보존
- 스택: Python 3.13+ · AWS Bedrock Converse · Amazon Nova

---

## 엔지니어링 문화 & AX

기능 출시 외에도 사내 AI 전환과 엔지니어링 표준 작업을 주도했습니다. 팀을 더 빠르게 만든 도구와 규범을 직접 만들었습니다.

- **에이전트 주도 개발.** 조직 공용 **Claude Code 설정**과 커스텀 스킬 라이브러리(`claude-code-config`)를 작성 — 엔지니어링 팀 전반의 AI 보조·에이전트 주도 개발 워크플로를 표준화
- **조직 레포 거버넌스 & 보안 베이스라인.** TalkCRM 조직 레포 거버넌스 베이스라인(`repo-governance`) 작성: **50개 이상 레포**를 관리형 **Active 10 / Archived 42**로 정리, **라이프사이클 토픽 100% 태깅**과 조직 전체 Dependabot 보안 정책 적용 — 모두 `gh` CLI로 처리하며 코드 유실 0
- **개발자 온보딩.** **git-quest** 제작 — AI 코드 리뷰 게이트(Amazon Nova 2 Lite)를 붙인 2시간짜리 git RPG 실습 온보딩 워크숍. 신규 엔지니어의 git 마찰을 인터랙티브하고 자동 채점되는 실습으로 전환. ([`smnt-study`](https://github.com/smnt-study) 조직에 있음)

---

## 그 밖의 조직 기여 (비공개 / TalkCRM 조직)

- **kb-admin** (~42 커밋) — AWS Bedrock Knowledge Base 관리 웹 앱. React + FastAPI + Lambda
- **smnt-kb-qa-optimizer** (~96 커밋) — 한국 안과 KB Q/A 자동 최적화: Bedrock Claude Sonnet 6단계 파이프라인 + Amazon Nova Pro 교차 검증 + Google Sheets 리뷰어 핸드오프
- **consultation-agent** (~15 커밋) — 병원 상담 에이전트 리팩터링(Strands + Bedrock AgentCore), 서울 우선
- **smnt-billing-report** — 병원 AI 에이전트의 월간 토큰 사용량 청구 자동화(Google Sheets)
- **smnt-aws-security-audit** — 읽기 전용 AWS 보안 상태 점검(서울 + 버지니아): 재사용 가능한 수집기, 프로덕션 영향 0

---

## 일하는 방식

- **Fail-Closed 설계 (헬스케어 도메인).** 신뢰도 낮거나 지어낸 답변보다 무응답이 안전. 어떤 동작이든 그 전에 보안 게이트(SMS 인증, 점수 임계값)가 먼저 선다
- **계약 기반 경계 설계.** 각 부분을 독립적으로 테스트·교체할 수 있도록 서비스 경계를 그음. 호환성의 단위는 코드가 아니라 타입 계약
- **비용 인지형 모델 라우팅.** 흔한 경로에는 싸고 빠른 모델, 에스컬레이션에만 강한 모델. 비용과 지연은 나중에 붙이는 게 아니라 설계 입력값

---

## 사용 언어

비공개 조직 작업을 포함한 실사용 기준으로 직접 정리(공개 top-langs 위젯은 제 코드 대부분이 비공개/조직 레포에 있어 실제를 적게 보여줌):

- **주력:** Python, TypeScript
- **보조:** SQL, Terraform (HCL), Bash
- **사이드 프로젝트:** Dart / Flutter

---

## 활동

<!-- profile-metrics:start -->
- Last updated: 2026-06-20
- 3,226 contributions in the last 12 months
- 3,101 restricted contributions from private and organizational repositories
<!-- profile-metrics:end -->

---

**관심 포지션:** AI 엔지니어 (AI Engineer) · LLM 애플리케이션 개발자 (LLM Application Engineer) · Applied AI 엔지니어 (Applied AI / ML Engineer) · AI/LLM 백엔드 엔지니어 (Backend Engineer, AI/LLM Systems) · AI 플랫폼 엔지니어 (AI Platform Engineer)

연락은 [smnt.subin@talkcrm24.com](mailto:smnt.subin@talkcrm24.com)로 주세요. 위의 비공개 시스템은 인터뷰에서 아키텍처 다이어그램과 레퍼런스를 곁들여 무엇이든 설명해 드릴 수 있습니다.