<div align="right">
  <a href="README.md">English</a> · <strong>한국어</strong>
</div>

# 홍수빈 (Subin Hong)
**AI 시스템 엔지니어 · LLM 레드팀** — *프로덕션 에이전틱 시스템 & 적대적 AI 안전성*

[![CES 2026 혁신상 AI 부문 선정](https://img.shields.io/badge/CES_2026-AI_혁신상_선정작-0284c7?style=flat-square)](https://www.ces.tech/ces-innovation-awards/2026/talkcrm-ai-intelligent-care-communication-platform/)
[![AIM Arena 2026 — 글로벌 33위](https://img.shields.io/badge/AIM_Arena_2026-%EA%B8%80%EB%A1%9C%EB%B2%8C_33%EC%9C%84-b91c1c?style=flat-square)](https://judgementday.aim-intelligence.com/leaderboard)
[![SFASS 2026 — 현장 Top 7 중 5위](https://img.shields.io/badge/SFASS_2026-%ED%98%84%EC%9E%A5_Top_7_%EC%A4%91_5%EC%9C%84-b91c1c?style=flat-square)](https://www.newsis.com/view/NISX20260708_0003701530)
[![식약처 AI 의료기기 레드팀 — 최우수상](https://img.shields.io/badge/%EC%8B%9D%EC%95%BD%EC%B2%98_%EB%A0%88%EB%93%9C%ED%8C%80_2025-%EC%B5%9C%EC%9A%B0%EC%88%98%EC%83%81-b91c1c?style=flat-square)](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=221)

| 프로덕션 동시성 | 엔드투엔드 벨로시티 | 테스트 & 검증 오라클 | 보안 가드레일 자동화 |
|:---:|:---:|:---:|:---:|
| **5개 병원 × 12개 언어**<br><sub>Nova 2 Lite + Haiku 4.5 라우팅</sub> | **1,152 커밋 · 116 릴리즈**<br><sub>빈 레포→라이브 서버리스 단독 개발</sub> | **1,656개 테스트 · 96% 커버리지**<br><sub>타입 계약 오라클 · SMS 인증 게이트</sub> | **198개 코드화된 컨트롤**<br><sub>128 인프라 + 70 KISA 스킬화</sub> |

`
• 핵심 AI & 클라우드: Python 3.11+ · AWS Bedrock (AgentCore) · Claude Haiku 4.5 · Nova 2 Lite · FastAPI · Lambda · PostgreSQL · Terraform
• 보안 & 옵저버빌리티: Datadog LLMObs · AST 읽기 전용 검증 · TruffleHog CI · GitHub Actions · OpenSSF Scorecard
`

### 🏆 수상 및 대외 인증
- **CES 2026 혁신상 (AI 부문)**: 프로덕션 AI 에이전트 주 개발자 ([CES 선정](https://www.ces.tech/ces-innovation-awards/2026/talkcrm-ai-intelligent-care-communication-platform/) · [공식 발표](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=267))
- **AIM Intelligence AI 레드팀 아레나 2026**: 글로벌 33위 (709점 / 91건 위반) ([리더보드](https://judgementday.aim-intelligence.com/leaderboard))
- **SFASS 2026 AI 레드팀**: 현장 Top 7 중 5위 ([관련 보도](https://www.newsis.com/view/NISX20260708_0003701530)) · **식약처 챌린지 2025**: 최우수상 ([공식 발표](https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=221))

<details>
<summary><b>🔍 아키텍처 심층 분석 및 20계층 방어 명세 (클릭하여 펼치기)</b></summary>

<br>

#### 플래그십: 자율 헬스케어 AI 에이전트 아키텍처
`mermaid
flowchart LR
    Client([사용자 발화]) --> Ingress[Lambda Ingress Proxy]
    Ingress --> Guard[스크리닝 & 위협 스코어링]
    Guard --> Router{복잡도}
    Router -->|Fast Path| Nova[Amazon Nova 2 Lite]
    Router -->|에스컬레이션| Haiku[Claude Haiku 4.5]
    Nova & Haiku --> ToolGate{인증 게이트}
    ToolGate -->|SMS 인증 완료| CRM[CRM / 예약 변이]
    ToolGate -->|Read Only| KB[(Bedrock Knowledge Base)]
    CRM & KB --> OutputGuard[의료 정보 / PII 필터]
    OutputGuard --> Stream([FastAPI SSE Stream])
`

- **2단계 모델 계층 라우팅:** 저지연 경량 질의는 Nova 2 Lite로 고속 처리, 복잡한 임상 질의만 Claude Haiku 4.5로 에스컬레이션.
- **Fail-Closed 검색 원칙:** KB 후보 20개 청크 오버샘플링 → 서울 리전 인하우스 리랭킹 → 점수 ≥ 0.5; 미달 시 자동 fallback으로 할루시네이션 원천 차단.
- **제로 투 프로덕션 딜리버리:** 무상태 예약 에이전트(17개 모드 타입 계약, 1,656개 테스트) · Bedrock KB 관리 백엔드(FastAPI/Lambda/Terraform) · 실시간 음성 데모(OpenAI Realtime → Bedrock Nova Sonic).

| 계층 | 범위 | 방어 메커니즘 및 엔지니어링 구현 |
|---|---|---|
| **인그레스 & AST** | 1~5계층 | 유니코드 정규화, 프롬프트 인젝션 스크리닝, 입력 길이 상한 제한 |
| **시맨틱 & 의도** | 6~10계층 | 탈옥 시도 휴리스틱 평가, 동적 위협 스코어링, 차단/알림 정책 분리 |
| **실행 샌드박스** | 11~15계층 | 사전 웜업된 ARM64 컨테이너 격리, AST 레벨 읽기 전용 검증, SMS 인증 게이트 |
| **이그레스 & 감사** | 16~20계층 | PII 마스킹, 의료 규정 준수 필터, Datadog LLMObs 분산 추적 |

#### 활동 지표
<!-- profile-metrics:start -->
- 최종 업데이트: 2026-09-06
- 최근 12개월 기여 8,685건
- 13개 레포에 걸쳐 pull request 기여 23건, 커밋 기여 201건
- 소유 공개 레포 22개, 소유 비공개 레포 79개 (포크 제외)
- 비공개·사내 작업이 최근 기여량의 대부분
<!-- profile-metrics:end -->

</details>
