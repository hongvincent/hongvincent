import { useCallback, useEffect, useState } from "react";

interface RecItem {
  id: string;
  icon: string;
  iconClass: string;
  tag: string;
  tagClass: string;
  title: string;
  result: string;
  date: string;
  desc: string;
  link?: string;
}

interface ProjectItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
  stats: { label: string; value: string }[];
  meta: string;
}

const RECOGNITION: RecItem[] = [
  {
    id: "sfass",
    icon: "S",
    iconClass: "icon-red",
    tag: "레드팀",
    tagClass: "tag-red",
    title: "SFASS 2026 AI 레드팀 워크숍",
    result: "현장 Top 7 중 5위",
    date: "2026.07.08",
    desc: "단독, 문장 입력만으로 Gemini-3.1-Flash 탑재 휴머노이드(Unitree G1, '에이미')를 레드팀. 서버 측 행동 감지로 실시간 채점하는 65분 세션, 약 60명 참가. AIM Intelligence 주최, 인공지능 안전 서울포럼(과기정통부 · ETRI) 내 개최.",
    link: "https://www.newsis.com/view/NISX20260708_0003701530",
  },
  {
    id: "aim",
    icon: "A",
    iconClass: "icon-cyan",
    tag: "레드팀",
    tagClass: "tag-cyan",
    title: "AIM Intelligence AI 레드팀 아레나 2026",
    result: "글로벌 리더보드 33위",
    date: "2026년 4~6월",
    desc: "709.00점, 제출 3,306건, LLM 안전성 위반 91건 확인(T1/T2 트랙). 공격 대상은 GPT-5.4, Claude Opus, Gemini Flash, MiMo.",
    link: "https://judgementday.aim-intelligence.com/leaderboard",
  },
  {
    id: "mfds",
    icon: "M",
    iconClass: "icon-amber",
    tag: "레드팀",
    tagClass: "tag-amber",
    title: "식약처 AI 의료기기 레드팀 챌린지",
    result: "최우수상 (Grand Prize)",
    date: "2025년 9월",
    desc: "생성형 AI 의료기기 LLM을 겨냥한 아시아 최초의 레드팀 챌린지, 100명 이상 참가. 상용 의료 LLM에서 프롬프트 인젝션과 HIPAA 위반 출력을 유도. 심사 기준은 난도, 위험 심각도, 창의성, 재현성.",
    link: "https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=221",
  },
  {
    id: "ksa",
    icon: "K",
    iconClass: "icon-amber",
    tag: "출시 제품",
    tagClass: "tag-amber",
    title: "KSA 서비스 AI 리더상 2026",
    result: "선도기업 부문",
    date: "2026",
    desc: "성민네트웍스가 한국표준협회 2026년 AI 적용 서비스 우수사례 공모전 선도기업 부문에서 삼성서울병원, LG전자, SK텔레콤과 함께 'TalkCRM AI'로 선정. 담당 엔지니어로서 출품작 작성.",
    link: "https://talkcrm24.com/blog?tpf=board/view&board_code=54&code=328",
  },
  {
    id: "ces",
    icon: "C",
    iconClass: "icon-cyan",
    tag: "출시 제품",
    tagClass: "tag-cyan",
    title: "CES 2026 혁신상 — 인공지능 부문",
    result: "선정 (2025년 11월 발표)",
    date: "2025.11",
    desc: "성민네트웍스의 AICC 의료 CRM 플랫폼 'TalkCRM AI'가 CES 2026 혁신상 AI 부문 선정작. 이를 구동하는 프로덕션 AI 에이전트의 주 개발자.",
    link: "https://www.ces.tech/ces-innovation-awards/2026/talkcrm-ai-intelligent-care-communication-platform/",
  },
];

const PROJECTS: ProjectItem[] = [
  {
    id: "reservation",
    icon: "R",
    title: "무상태 NLU+NLG 예약 에이전트",
    desc: "17개 예약 모드, 세션 상태 없음, DB 쓰기 없음. 실행은 릴레이가 맡고, 이 에이전트는 발화 분석과 문장 생성만 맡음. 1,656 테스트 / 커버리지 96%, AWS Lambda 라이브, 실 테넌트 대상 A/B 검증.",
    stats: [
      { label: "커밋", value: "162" },
      { label: "머지 PR", value: "82" },
      { label: "모드", value: "17" },
    ],
    meta: "2026-05-31 ~",
  },
  {
    id: "kb",
    icon: "K",
    title: "Knowledge Base 관리 백엔드",
    desc: "Bedrock KB 관리 서비스를 제로에서 프로덕션까지. FastAPI / Lambda + CloudFront, Terraform, E2E 테스트.",
    stats: [
      { label: "커밋", value: "116" },
      { label: "머지 PR", value: "68" },
    ],
    meta: "FastAPI · Lambda",
  },
  {
    id: "voice",
    icon: "V",
    title: "Speech-to-speech 음성 데모",
    desc: "OpenAI Realtime → Bedrock Nova Sonic 음성 파이프라인, 라이브 서버리스 부스급 데모.",
    stats: [{ label: "커밋", value: "68" }],
    meta: "Nova Sonic",
  },
];

const STACK = [
  { name: "Python", icon: "P", color: "#3776AB" },
  { name: "TypeScript", icon: "T", color: "#3178C6" },
  { name: "PostgreSQL", icon: "D", color: "#4169E1" },
  { name: "AWS Bedrock", icon: "B", color: "#FF9900" },
  { name: "AWS Lambda", icon: "L", color: "#FF9900" },
  { name: "FastAPI", icon: "F", color: "#009688" },
  { name: "Claude", icon: "C", color: "#D97757" },
  { name: "Terraform", icon: "T", color: "#7B42BC" },
  { name: "Docker", icon: "D", color: "#2496ED" },
  { name: "Datadog", icon: "D", color: "#632CA6" },
  { name: "GitHub Actions", icon: "G", color: "#2088FF" },
  { name: "Flutter", icon: "F", color: "#02569B" },
];

const TOTAL = 11;

function App() {
  const [current, setCurrent] = useState(0);

  const go = useCallback((n: number) => {
    setCurrent(Math.max(0, Math.min(TOTAL - 1, n)));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        setCurrent((c) => Math.min(TOTAL - 1, c + 1));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setCurrent((c) => Math.max(0, c - 1));
      } else if (e.key === "Home") {
        setCurrent(0);
      } else if (e.key === "End") {
        setCurrent(TOTAL - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const slideClass = (i: number) => (i === current ? "active" : i < current ? "prev" : "");

  return (
    <div className="deck">
      <div className="bg-grid" />
      <div className="bg-glow" />

      <div className="progress" style={{ width: `${((current + 1) / TOTAL) * 100}%` }} />

      <div className="topbar">
        <div className="brand">
          <div className="brand-mark">SH</div>
          <span>홍수빈 · 포트폴리오</span>
        </div>
        <div className="slide-counter">
          <span className="now">{String(current + 1).padStart(2, "0")}</span> / {String(TOTAL).padStart(2, "0")}
        </div>
      </div>

      {/* SLIDE 1 — 표지 */}
      <section className={`slide ${slideClass(0)}`}>
        <div className="slide-inner cover">
          <div className="cover-eyebrow anim">
            <span className="dot" />
            대화 환영 · 서울, 대한민국
          </div>
          <h1 className="cover-title anim">
            LLM 에이전트를 만들고
            <br />
            <span className="accent">직접 깨뜨립니다.</span>
          </h1>
          <div className="cover-role anim">주니어 AI 엔지니어 · AWS Bedrock 기반 프로덕션 LLM 에이전트 · LLM 레드팀</div>
          <div className="cover-badges anim">
            <span className="cover-badge">SFASS 2026 · 5th of Top 7</span>
            <span className="cover-badge">AIM Arena · #33 global</span>
            <span className="cover-badge">식약처 2025 · 최우수상</span>
          </div>
          <div className="cover-meta anim">
            <div className="cover-meta-item">
              <span className="cover-meta-num">3</span>
              <span className="cover-meta-label">레드팀 인증</span>
            </div>
            <div className="cover-meta-item">
              <span className="cover-meta-num">2</span>
              <span className="cover-meta-label">수상 제품</span>
            </div>
            <div className="cover-meta-item">
              <span className="cover-meta-num">5×12</span>
              <span className="cover-meta-label">테넌트 × 언어</span>
            </div>
            <div className="cover-meta-item">
              <span className="cover-meta-num">6,026</span>
              <span className="cover-meta-label">12개월 기여</span>
            </div>
          </div>
        </div>
        <div className="cover-hint">
          <ArrowRight /> 방향키 · 스페이스로 탐색
        </div>
      </section>

      {/* SLIDE 2 — 소개 */}
      <section className={`slide ${slideClass(1)}`}>
        <div className="slide-inner">
          <div className="eyebrow anim">소개</div>
          <h2 className="slide-title anim">남의 모델을 공격하며 제 모델이 어디서 무너질지 배웁니다</h2>
          <p className="slide-sub anim">
            성민네트웍스(플랫폼 조직: TalkCRM)에서 프로덕션 LLM 에이전트를 만들고, 또 직접 깨뜨립니다. 레드팀으로 남의 모델을
            공격해 보면 제 모델이 어디서 무너질지 알게 되고, 그래서 배포하기 전에 방어부터 설계합니다.
          </p>
          <div className="stats-grid anim">
            {[
              { icon: <IconActivity />, num: "6,026", label: "최근 12개월 기여" },
              { icon: <IconShield />, num: "198", label: "보안 컨트롤 총수" },
              { icon: <IconCheck />, num: "1,656", label: "테스트 · 커버리지 96%" },
              { icon: <IconSpark />, num: "20+", label: "에이전트 · 90+ 스킬" },
            ].map((s, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLIDE 3 — 수상/인증 */}
      <section className={`slide ${slideClass(2)}`}>
        <div className="slide-inner">
          <div className="eyebrow anim">수상 / 인증</div>
          <h2 className="slide-title anim">LLM을 깨뜨리고, 살아남는 것을 배포합니다</h2>
          <p className="slide-sub anim">
            두 축이 관통합니다 — LLM 안전성 시스템을 적대적으로 깨는 일, 그리고 그 검증을 견뎌야 하는 LLM 제품을 출시하는 일.
          </p>
          <div className="rec-grid anim">
            {RECOGNITION.slice(0, 3).map((item) => (
              <RecCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* SLIDE 4 — 출시 제품 */}
      <section className={`slide ${slideClass(3)}`}>
        <div className="slide-inner">
          <div className="eyebrow anim">출시한 AI 제품</div>
          <h2 className="slide-title anim">수상 제품을 뒷받침하는 주 개발자</h2>
          <p className="slide-sub anim">
            두 수상 출품작을 구동하는 프로덕션 AI 에이전트의 주 개발자로 기여. 회사 수상이며 개인 수상이 아님을 분명히 합니다.
          </p>
          <div className="rec-grid anim" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {RECOGNITION.slice(3).map((item) => (
              <RecCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* SLIDE 5 — 플래그십 */}
      <section className={`slide ${slideClass(4)}`}>
        <div className="slide-inner">
          <div className="eyebrow anim">플래그십 · 비공개 / 조직 소유</div>
          <div className="flagship-card anim">
            <div className="flagship-top">
              <div className="flagship-label">
                <span style={{ width: 6, height: 6, borderRadius: 2, background: "var(--accent-warm)", display: "inline-block" }} />
                병원 상담 AI 에이전트
              </div>
              <h2 className="flagship-title">5개 병원 테넌트 · 12개 언어 · 20-layer 방어 스택</h2>
              <p className="flagship-desc">
                2단계 라우팅(Nova 2 Lite 빠른 경로 → Claude Haiku 4.5 에스컬레이션)이 20-layer defense-in-depth 스택 안에 자리하며,
                모든 LLM 호출은 Datadog LLMObs로 추적.
              </p>
            </div>
            <div className="flagship-metrics">
              {[
                { num: "1,152", label: "커밋" },
                { num: "651", label: "머지 PR" },
                { num: "5×12", label: "테넌트 × 언어" },
                { num: "770", label: "그래프 노드" },
              ].map((m, i) => (
                <div className="fm-cell" key={i}>
                  <div className="fm-num">{m.num}</div>
                  <div className="fm-label">{m.label}</div>
                </div>
              ))}
            </div>
            <div className="flagship-body">
              <div className="flagship-section">
                <h4>런타임 & 라우팅</h4>
                <div className="feature-list">
                  <div className="feature-item">
                    <span className="dot" />
                    <span>Lambda Proxy → ARM64 Bedrock AgentCore 컨테이너 → FastAPI (스트리밍).</span>
                  </div>
                  <div className="feature-item">
                    <span className="dot" />
                    <span>Nova 2 Lite 빠른 경로 → Claude Haiku 4.5 에스컬레이션.</span>
                  </div>
                  <div className="feature-item">
                    <span className="dot" />
                    <span>Strands Agents SDK(v1.32.0) on Bedrock AgentCore — Bedrock Agents 아님.</span>
                  </div>
                </div>
              </div>
              <div className="flagship-section">
                <h4>방어 & 툴링</h4>
                <div className="feature-list">
                  <div className="feature-item">
                    <span className="dot" />
                    <span>20-layer: 입력 검증, 프롬프트 인젝션 스크리닝, 위협 점수화, enforce vs. notify 분리, 출력 필터링.</span>
                  </div>
                  <div className="feature-item">
                    <span className="dot" />
                    <span>툴 체인: search_knowledge_base → get_customer_crm_info(SMS 인증) → manage_reservation. CRM은 인증 없는 변경 거부.</span>
                  </div>
                  <div className="feature-item">
                    <span className="dot" />
                    <span>사전 예열 에이전트 풀, 2계층 세션 스토어(TTL + LRU), 테넌트별 KB 라우팅.</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="tech-pills">
              {["Python 3.11+", "FastAPI", "Strands Agents", "Bedrock AgentCore", "Nova 2 Lite", "Haiku 4.5", "Datadog LLMObs", "Terraform"].map(
                (s) => (
                  <span className="tech-pill" key={s}>
                    {s}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 6 — 반복 가능한 딜리버리 */}
      <section className={`slide ${slideClass(5)}`}>
        <div className="slide-inner">
          <div className="eyebrow anim">반복 가능한 Zero-to-Production</div>
          <h2 className="slide-title anim">빈 레포에서 라이브까지, 같은 과정을 반복합니다</h2>
          <p className="slide-sub anim">각 서비스는 빈 레포에서 라이브 서버리스 배포까지.</p>
          <div className="proj-grid anim">
            {PROJECTS.map((p) => (
              <div className="proj-card" key={p.id}>
                <div className="proj-card-head">
                  <div className="proj-card-icon">{p.icon}</div>
                  <div className="proj-card-meta">{p.meta}</div>
                </div>
                <h3 className="proj-card-title">{p.title}</h3>
                <p className="proj-card-desc">{p.desc}</p>
                <div className="proj-card-stats">
                  {p.stats.map((s, i) => (
                    <div key={i}>
                      <div className="proj-stat-num">{s.value}</div>
                      <div className="proj-stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLIDE 7 — 보안 자동화 */}
      <section className={`slide ${slideClass(6)}`}>
        <div className="slide-inner">
          <div className="eyebrow anim">보안 자동화</div>
          <h2 className="slide-title anim">판정이 아니라 공유를 위해 만들었습니다</h2>
          <p className="slide-sub anim">
            read-only 가드레일을 갖춘 재사용 가능한 보안 자동화 프레임워크를 설계하고, 스킬로 패키징해 조직의 레포에 전파했습니다.
          </p>
          <div className="sec-grid anim">
            <div className="sec-card">
              <h3>설계상 read-only</h3>
              <p>2-게이트 체크가 credential-minting과 secret-read 호출을 코드 레벨에서 패턴 매칭·차단합니다.</p>
              <ul className="sec-list">
                <li>
                  <span className="check">✓</span>
                  <span>쓰기나 유출 권한 없이 인프라와 소스를 점검.</span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span>198개 컨트롤을 실행 가능한 프레임워크로 코드화(인프라 128 + KISA 앱 소스 70).</span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span>Claude Code 스킬과 CI 스텝으로 패키징, 레포 간 공유.</span>
                </li>
              </ul>
            </div>
            <div className="sec-card">
              <h3>제품 내 하드닝</h3>
              <p>플래그십 에이전트에 직접 내장된 방어와 상시 정책으로서의 공급망 위생.</p>
              <ul className="sec-list">
                <li>
                  <span className="check">✓</span>
                  <span>테넌트 키 로테이션, 폐기 키 스크럽, TruffleHog CI 시크릿 스캐닝.</span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span>프롬프트 인젝션·피싱 링크 방어를 에이전트에 내장.</span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span>커밋 SHA 액션 피닝, OpenSSF Scorecard, Dependabot CI.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 8 — 엔지니어링 문화 & AX */}
      <section className={`slide ${slideClass(7)}`}>
        <div className="slide-inner">
          <div className="eyebrow anim">엔지니어링 문화 & AX</div>
          <h2 className="slide-title anim">제 워크플로를 팀을 위한 공용 도구로</h2>
          <div className="culture-grid anim">
            {[
              {
                icon: "A",
                title: "에이전트 주도 개발",
                desc: "조직 공용 Claude Code 설정과 스킬 라이브러리를 만들어 팀 전반의 AI 보조 워크플로를 하나로 맞췄습니다.",
                stat: "76 커밋 · 20+ 에이전트 · 90+ 스킬 · 17 훅",
              },
              {
                icon: "G",
                title: "조직 레포 거버넌스",
                desc: "TalkCRM 레포 거버넌스 베이스라인 작성: 50개 이상 레포를 Active 10 / Archived 42로 분류, 라이프사이클 태깅, Dependabot 상시 정책화. 코드 유실 0.",
                stat: "6 커밋 · 50+ 레포 분류",
              },
              {
                icon: "D",
                title: "개발자 역량 강화",
                desc: "smnt-study 조직에서 git-quest 제작: Nova 2 Lite AI 코드 리뷰 게이트를 붙인 2시간짜리 라이브 git RPG 온보딩 워크숍(미션 13개).",
                stat: "7 커밋 · 13 미션",
              },
            ].map((c, i) => (
              <div className="culture-card" key={i}>
                <div className="culture-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div className="culture-stat">{c.stat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLIDE 9 — 일하는 방식 */}
      <section className={`slide ${slideClass(8)}`}>
        <div className="slide-inner">
          <div className="eyebrow anim">일하는 방식</div>
          <h2 className="slide-title anim">제가 지키는 원칙</h2>
          <div className="principles anim">
            {[
              {
                n: "01",
                title: "헬스케어의 Fail-Closed",
                desc: "신뢰도 낮거나 지어낸 답변보다 무응답을 택하고, 어떤 동작이든 앞에 보안 게이트(SMS 인증, 점수 임계값)를 먼저 세웁니다.",
              },
              {
                n: "02",
                title: "계약 기반 경계",
                desc: "각 부분을 따로 테스트하고 교체할 수 있게 경계를 긋습니다. 호환성은 구현이 아니라 타입 계약으로 정의합니다.",
              },
              {
                n: "03",
                title: "비용 인지형 모델 라우팅",
                desc: "흔한 경로에는 싸고 빠른 모델, 에스컬레이션에만 강한 모델. 비용과 지연은 나중이 아니라 처음부터 예산에 넣습니다.",
              },
              {
                n: "04",
                title: "혼자여도 PR 우선",
                desc: "리뷰 게이트 딜리버리(혼자여도 모든 변경을 PR로 리뷰)로 첫 커밋부터 워크플로를 감사 가능하고 CI 검증된 상태로 유지합니다.",
              },
            ].map((p, i) => (
              <div className="principle" key={i}>
                <span className="principle-num">{p.n}</span>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLIDE 10 — 기술 스택 */}
      <section className={`slide ${slideClass(9)}`}>
        <div className="slide-inner">
          <div className="eyebrow anim">기술 스택</div>
          <h2 className="slide-title anim">무엇으로 만드는가</h2>
          <p className="slide-sub anim">
            주력: Python, TypeScript · 보조: SQL, Terraform (HCL), Bash · 사이드: Dart / Flutter
          </p>
          <div className="stack-grid anim">
            {STACK.map((s, i) => (
              <div className="stack-item" key={i}>
                <div className="stack-icon" style={{ color: s.color }}>
                  {s.icon}
                </div>
                <span className="stack-name">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLIDE 11 — 연락 */}
      <section className={`slide ${slideClass(10)}`}>
        <div className="slide-inner">
          <div className="contact-card anim">
            <div className="eyebrow" style={{ justifyContent: "center" }}>연락</div>
            <h2 className="contact-title">이야기 나눠요</h2>
            <p className="contact-desc">
              위 비공개 시스템은 요청하시면 아키텍처 다이어그램과 레퍼런스를 곁들여 설명해 드립니다.
            </p>
            <a className="contact-email" href="https://github.com/hongvincent" target="_blank" rel="noreferrer">
              <GithubIcon />
              github.com/hongvincent
            </a>
            <div className="contact-meta">Seoul, South Korea</div>
          </div>
        </div>
      </section>

      {/* CONTROLS */}
      <div className="controls">
        <button className="ctrl-btn" onClick={() => go(current - 1)} disabled={current === 0} aria-label="이전">
          <ArrowLeft />
        </button>
        <div className="dots">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button
              key={i}
              className={`dot${i === current ? " active" : ""}`}
              onClick={() => go(i)}
              aria-label={`슬라이드 ${i + 1}`}
            />
          ))}
        </div>
        <button className="ctrl-btn" onClick={() => go(current + 1)} disabled={current === TOTAL - 1} aria-label="다음">
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}

function RecCard({ item }: { item: RecItem }) {
  return (
    <div className="rec-card">
      <div className="rec-card-head">
        <div className={`rec-card-icon ${item.iconClass}`}>{item.icon}</div>
        <span className={`rec-tag ${item.tagClass}`}>{item.tag}</span>
      </div>
      <h3 className="rec-card-title">{item.title}</h3>
      <span className="rec-card-result">{item.result}</span>
      <p className="rec-card-desc">{item.desc}</p>
      {item.link && (
        <a className="rec-card-link" href={item.link} target="_blank" rel="noreferrer">
          증빙 보기 <ArrowRight />
        </a>
      )}
    </div>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function IconActivity() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18M7 14l3-3 3 3 5-6" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

export default App;
