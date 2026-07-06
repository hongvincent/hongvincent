[English](README.md) | **한국어**

# 홍수빈 (Subin Hong)

**AI 엔지니어 · AWS Bedrock 기반 프로덕션 LLM 에이전트**

## 핵심 성과

- **프로덕션 병원 상담 AI 에이전트의 단독 리드 개발자** — AWS Bedrock AgentCore 위에서 5개 테넌트 × 12개 언어 운영 (**1,152 커밋 · 651 머지 PR · 116 릴리스**).
- **두 축에서 인정받음** — 개인 레드팀 수상(식약처 최우수상 2025, AIM Arena **글로벌 32위**), 그리고 수상 제품 두 건의 리드 엔지니어: CES 2026 Innovation Award(AI 부문)와 KSA 서비스 AI 리더상 2026.
- **규제 헬스케어 도메인의 Fail-Closed 신뢰성** — 재현율보다 정밀도, 플래그십 CRM 툴 체인의 인증 없는 변경 차단, 예약 동작 앞에 세운 보안 게이트.
- **반복되는 딜리버리** — 예약 에이전트, KB 관리 백엔드, 음성 파이프라인을 각각 빈 레포에서 라이브 서버리스 배포까지.
- **공개 도구 [openrabbit](https://github.com/hongvincent/openrabbit)** — Bedrock 전용 고신뢰 AI 코드 리뷰어(Nova 2 Lite finder → cross-family GPT-5.4 verifier, find-broad / verify-strict). 여러 레포에서 CI 게이트로 연결.

성민네트웍스 소속 AI 엔지니어로, 프로덕션 AI 에이전트를 직접 만들고 배포합니다. 단독 리드 개발자로 멀티 테넌트 병원 상담 시스템을 소유하며 — **CES 2026 Innovation Award** 수상 제품을 구동하는 엔진 — AWS Bedrock AgentCore 위에서 5개 프로덕션 테넌트를 12개 언어로 운영합니다. 같은 플랫폼의 옴니채널 릴레이에 붙는 무상태 예약 에이전트도 함께 만들었습니다. 시스템을 만드는 한편으로 의료 LLM을 레드팀으로 공격하기도 하니, 제가 배포하는 시스템은 곧 제가 깨는 법을 아는 시스템입니다.

플래그십은 단독 저자가 **1,152 커밋 / 651 머지 PR**로 쌓은 PR 우선·리뷰 게이트 딜리버리입니다(2026년 1~7월). 코드 대부분이 **TalkCRM** 플랫폼 조직 소유의 비공개 레포에 있어, 이 프로필은 검증 가능한 수치와 공개 수상 링크를 앞세웁니다. 요청하시면 레퍼런스와 함께 아키텍처를 직접 설명해 드립니다.

서울 · [smnt.subin@talkcrm24.com](mailto:smnt.subin@talkcrm24.com)

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

## 플래그십 — 병원 상담 AI 에이전트 (비공개 / 조직 소유)

**5개 프로덕션 병원 테넌트, 12개 언어**를 운영합니다. 2단계 라우팅 계층(Amazon Nova 2 Lite 빠른 경로 → Claude Haiku 4.5 에스컬레이션)을 **20-layer defense-in-depth** 아키텍처 안에 두고, 모든 LLM 호출을 Datadog LLMObs로 추적합니다.

- **1,152 커밋 · 651 머지 PR · 116 릴리스**, 단독 리드 저자(2026-01-22 → 07-01).
- 멀티턴 흐름·커스텀 툴·응답 필터링을 완전히 제어하려고 **AWS Bedrock AgentCore**(Bedrock Agents 아님) 위에 **Strands Agents SDK(v1.32.0 배포)**를 사용.
- 20-layer 방어는 각기 다른 단계를 덮습니다: 입력 검증, 프롬프트 인젝션 스크리닝, 위협 점수화, enforce vs. notify 정책 분리, 출력 필터링.
- 툴 체인: `search_knowledge_base`(RAG) → `get_customer_crm_info`(SMS 본인 인증) → `manage_reservation`(예약 CRUD). CRM 계층은 인증 없는 변경을 거부합니다.
- 런타임: Lambda Proxy → ARM64 Bedrock AgentCore 컨테이너 → 스트리밍 미들웨어가 붙은 FastAPI. 사전 예열 에이전트 풀이 콜드 스타트를 흡수하고, 2계층 세션 스토어(TTL + LRU)가 동시 테넌트 환경에서 메모리를 묶어두며, 테넌트별 Knowledge Base 라우팅으로 각 병원 데이터를 격리.
- 아키텍처는 자동 생성 지식 그래프로 문서화: **13개 계층에 걸쳐 770개 노드 / 1,097개 엣지**.
- 스택: Python 3.11+ · FastAPI · Strands Agents · Bedrock AgentCore · Nova 2 Lite · Haiku 4.5 · Datadog LLMObs · Terraform.

---

## 수상 / 인증

제 일에는 두 축이 있습니다. 하나는 LLM 안전성 시스템을 적대적으로 깨는 일, 다른 하나는 그 검증을 견뎌야 하는 LLM 제품을 만드는 일입니다. 아래 항목마다 공개 증빙 링크가 있고, 제 기여 범위를 명확히 적었습니다.

### 적대적 AI / 레드팀 (개인)

- **식품의약품안전처 첨단 AI 디지털 의료제품 레드팀 챌린지 최우수상 (2025년 9월).** 생성형 AI 의료기기용 LLM을 대상으로 한 아시아 최초의 레드팀 챌린지로 100명 이상이 참가. 상용 의료 LLM에서 프롬프트 인젝션으로 치명적 취약점을 찾아내고 HIPAA 위반 출력을 유도. 심사는 기술 난도, 위험 심각도, 공격 창의성, 재현성 기준. [공식 발표](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=221)
- **AIM Intelligence AI Red-Team Arena 2026 — 글로벌 32위** (**642점**, GPT-5.4·Claude Opus·Gemini Flash·MiMo 대상 T1/T2 트랙에서 LLM 안전성 위반 **73건** 확인. 최종 순위, 아레나는 2026년 5월 종료). 다른 곳에도 적용되는 발견 하나 — 아레나급 심사기는 *행동*(거부 vs. 응답)과 *심각도*를 별도의 StrongREJECT 루브릭 항목으로 채점합니다. 그래서 거부만 강화한 방어는 심각도 쪽에서 여전히 새어 나옵니다. [리더보드](https://judgementday.aim-intelligence.com/leaderboard)

### 출시한 AI 제품 (리드 엔지니어, 개인 수상 아님)

- **CES 2026 Innovation Award — 인공지능(AI) 부문.** 성민네트웍스의 AICC 기반 의료 CRM 플랫폼 "TalkCRM AI"가 CES 2026 Innovation Award에 선정(2025년 11월 발표). 저는 이 제품을 구동하는 프로덕션 AI 에이전트의 주 개발자로, 이 항목은 수상 제품에 대한 제 개발 기여이며 개인 수상은 아닙니다. [CES 선정](https://www.ces.tech/ces-innovation-awards/2026/talkcrm-ai-intelligent-care-communication-platform/) · [공식 발표](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=267)
- **KSA 서비스 AI 리더상 2026 — 한국표준협회, 선도기업 부문.** 성민네트웍스가 LG전자, SK텔레콤, 삼성서울병원과 함께 선정. 출품작은 *"24시간·12개 국어 스마트 원무: 구조적 인력난을 뛰어넘는 AI 에이전트 실증 사례"*. 이 출품작이 바로 제가 리드하는 프로덕션 에이전트이며, 저는 담당 엔지니어로서 출품작을 직접 작성. 시상식은 2026년 7월, 공식 발표는 예정.

---

## 제품의 한 면으로서의 보안

공격 쪽에서 증명한 역량(식약처 최우수상, AIM Arena)이 방어 작업에도 그대로 흐릅니다. 보안은 나중에 덧붙이는 게 아니라 제품에 내장됩니다.

- **제품 내 하드닝:** 플래그십 에이전트 안의 **보안 전용 커밋 24건** — 테넌트 키 로테이션, 폐기 키 스크럽, 자동 시크릿 스캐닝(TruffleHog CI), 프롬프트 인젝션·피싱 링크 방어를 에이전트에 직접 내장.
- **보안 감사:** 읽기 전용 **128개 컨트롤** AWS 보안 태세 감사(서울 + 버지니아, 적대적 리뷰 수렴 **96/100**, 프로덕션 영향 0)와, KISA 기반 소스코드 감사 **8개 레포**(**70개 컨트롤 카탈로그 → 171건 발견**) — 모든 file:line을 실 소스에 재검증.
- **기본값으로서의 공급망 위생:** 커밋 SHA 액션 피닝, OpenSSF Scorecard + Dependabot CI, git 히스토리의 라이브 시크릿 스크럽.

---

## 반복 가능한 Zero-to-Production (비공개 / 조직 소유)

빈 레포에서 라이브 서버리스까지의 같은 동작을 예약 에이전트, KB 관리 백엔드, 음성 파이프라인에 반복 적용 — 운 좋은 한 번의 출시가 아니라 신뢰할 수 있는 딜리버리 패턴입니다.

### 무상태 NLU+NLG 예약 에이전트
경계를 못 박은 순수 언어 에이전트: **18개 예약 모드, 세션 상태 없음, DB 쓰기 없음.** 실행은 릴레이가 소유하고, 이 에이전트는 발화 분석과 문장 생성만 소유합니다. 그래서 동일한 `/invoke` 두 번은 서로 독립적입니다. 무상태이고 계약에 묶여 있어 테스트가 쉽습니다: **1,656 테스트, 커버리지 96%**, AWS Lambda(dev)에 배포해 실 테넌트 대상 라이브 A/B로 검증.

- 리드 엔지니어, **152 커밋 / 74 머지 PR**(팀원 커밋 별도), 2026-05-31 이후.
- 18개 모드 타입 계약이 곧 테스트 오라클: 릴레이가 모드를 추가하면 CI가 contract-gap 단언에서 실패해, 런타임 오류가 나기 전 배포 단계에서 비호환을 드러냅니다.
- 날짜·시간 NLU는 규칙 기반 결정론(상대 → 절대). LLM은 의도가 모호한 곳에서만 호출.
- 옵트인 KB 검색 오버라이드(한국어 일반 대화 경로, 질문 5자 이상, 테넌트 `rag_key` 존재): 서울의 KB 검색 Lambda에서 후보 약 20개를 과표집 → Amazon Nova 리랭크(in-region) → 상위 5개 청크를 점수 **0.5 이상**일 때만 반환 → grounded **Nova 2 Lite** 답변. 미스가 나면 Fail-Closed로, 지어내는 대신 기존의 grounding 없는 답변으로 폴스루.
- 라이브에서 KB 응답 약 6.9초로 검증(Lambda 타임아웃 예산에 충분히 못 미침). 전환 전 롤백용 ECR 다이제스트를 보존.
- 스택: Python 3.13+ · AWS Bedrock Converse · Amazon Nova.

같은 딜리버리 패턴의 다른 사례:

- **Knowledge Base 관리 백엔드** (**108 커밋 / 61 머지 PR**): Bedrock KB 관리 서비스를 제로에서 프로덕션까지 — FastAPI / Lambda + CloudFront, Terraform, E2E 테스트.
- **Speech-to-speech 음성 데모** (68 커밋): OpenAI Realtime → Bedrock Nova Sonic 음성 파이프라인, 라이브 서버리스 CES 부스급 데모.
- **KB Q/A 자동 최적화 파이프라인** (~96 커밋): 한국 클리닉 KB Q/A — 7단계 환각 방어 파이프라인(Bedrock Claude Sonnet + Nova Pro 교차 검증, Google Sheets 리뷰어 핸드오프).
- **서울 우선 에이전트 리팩터링** (16 커밋) · **청구 자동화**: 병원 AI 플랫폼의 월간 토큰 사용량 리포팅.

---

## 엔지니어링 문화 & AX

사내 AI 전환과 엔지니어링 표준 작업을 주도했습니다 — 제 워크플로를 공용 도구·표준·온보딩으로 남기는 일입니다.

- **[openrabbit](https://github.com/hongvincent/openrabbit) — 공개, Apache-2.0.** find-broad / verify-strict로 나뉜 고신뢰 Bedrock 전용 AI 코드 리뷰어 — 값싼 고재현율 패스는 Amazon Nova 2 Lite finder가, 낮은 확신 발견의 탈락은 cross-family GPT-5.4 verifier(Bedrock 경유)가 맡습니다. FP<10% eval 게이트를 걸고, SHA 피닝된 GitHub Action + OIDC 키리스 인증으로 배포. 하루 만에 혼자 엔드투엔드로 빌드했고, 라이브 검증에서 mock이 가려온 통합 버그 3건을 잡았습니다. 지금은 다른 레포들의 CI 리뷰 게이트로 쓰이며, 릴리스마다 액션을 새 커밋 SHA로 4회 리핀.
- **에이전트 주도 개발.** 조직 공용 **Claude Code 설정**과 커스텀 스킬 라이브러리를 작성해 AI 보조 워크플로를 표준화하고, 팀용 **ADD/TDD 실전 플레이북**도 함께 작성.
- **조직 레포 거버넌스 & 보안 베이스라인.** TalkCRM 조직 레포 거버넌스 베이스라인 작성: **50개 이상 레포**를 관리형 **Active 10 / Archived 42**로 분류하고 라이프사이클 태깅을 적용, Dependabot을 선택에서 필수·감사 가능한 조직 표준으로 격상 — 모두 `gh` CLI로 처리하며 코드 유실 0.
- **개발자 온보딩.** [`smnt-study`](https://github.com/smnt-study) 조직에서 **git-quest** 제작 — Nova 2 Lite AI 코드 리뷰 게이트를 붙인 2시간짜리 git RPG 온보딩 워크숍(미션 13개).

---

## 일하는 방식

- **헬스케어 도메인의 Fail-Closed.** 신뢰도 낮거나 지어낸 답변보다 무응답을 택하고, 어떤 동작 앞에도 보안 게이트(SMS 인증, 점수 임계값)를 먼저 세웁니다.
- **계약 기반 경계.** 각 부분을 독립적으로 테스트·교체할 수 있게 경계를 그립니다. 호환성의 단위는 구현이 아니라 타입 계약입니다.
- **비용 인지형 모델 라우팅.** 흔한 경로에는 싸고 빠른 모델, 에스컬레이션에만 강한 모델. 비용과 지연은 나중에 최적화하는 게 아니라 처음부터 예산화합니다.
- **혼자여도 PR 우선.** 리뷰 게이트 딜리버리(단독 저자 651 머지 PR)로 첫 커밋부터 워크플로를 감사 가능하고 CI 검증된 상태로 유지합니다.

---

## 사용 언어

비공개 조직 작업을 포함한 실사용 기준으로 직접 정리했습니다. 제 코드 대부분이 비공개/조직 레포에 있어 공개 top-langs 위젯은 실제를 적게 보여줍니다.

- **주력:** Python, TypeScript
- **보조:** SQL, Terraform (HCL), Bash
- **사이드 프로젝트:** Dart / Flutter

---

## 활동

<!-- profile-metrics:start -->
- 최종 업데이트: 2026-07-06
- 최근 12개월 기여 5,712건
- 13개 레포에 걸쳐 pull request 기여 22건, 커밋 기여 192건
- 소유 공개 레포 22개, 소유 비공개 레포 70개(포크 제외)
- 최근 기여량의 대부분은 비공개·사내 작업
<!-- profile-metrics:end -->

---

**연락:** [smnt.subin@talkcrm24.com](mailto:smnt.subin@talkcrm24.com). 위 비공개 시스템은 요청하시면 아키텍처 다이어그램과 레퍼런스를 곁들여 설명해 드립니다.
