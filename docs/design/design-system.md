# 회사소개 홈페이지 — 디자인 시스템

> 참고: Airbnb 디자인 시스템 구조를 레퍼런스로 삼아 작성. 단 본 프로젝트는 여행 마켓플레이스가 아닌
> **기업형 B2B/B2C 회사소개 홈페이지**이므로 사진 중심 카드 레이아웃 대신 신뢰감 있는 정보 전달 레이아웃을 채택한다.
> 기술스택(Tailwind CSS, React)과 일치하도록 토큰명은 Tailwind 설정에 그대로 매핑 가능한 형태로 정의한다.

## Overview

본 시스템은 제품/서비스를 신뢰감 있게 전달하는 것이 목표인 **기업 정보형 사이트**다. 캔버스는 Airbnb와 동일하게 **순수 백색** (`{colors.canvas}` — #ffffff)을 쓰지만, 단일 비비드 액센트 대신 **신뢰를 상징하는 딥 블루** (`{colors.primary}` — #1d4ed8)를 모든 주요 CTA, 활성 내비게이션, 링크에 일관되게 사용한다. 보조 색으로는 게시판의 공지/상태 배지에만 쓰는 **앰버** (`{colors.accent}` — #f59e0b)를 두며, 마케팅 페이지 전반에는 등장하지 않는다(Airbnb의 Luxe/Plus 서브 브랜드 색 스코핑과 동일한 원칙).

타이포그래피는 한국어 본문 가독성이 최우선이므로 **Pretendard**를 기본 폰트로, 시스템 폰트를 백업으로 둔다. Airbnb처럼 디스플레이 폰트가 사진의 무게를 빌리는 구조가 아니라, 텍스트와 표(관리자 페이지의 테이블, 게시판 리스트)가 정보 위계를 직접 책임지므로 디스플레이 비중(24–32px / 600–700)을 Airbnb보다 다소 무겁게 둔다.

형태 언어는 **모던하지만 절제된 라운드**다. 버튼/입력은 8px(`{rounded.sm}`), 카드는 12px(`{rounded.md}`), 배지/아바타는 완전 원형(`{rounded.full}`)이다. Airbnb처럼 모든 요소를 필 형태로 두지 않고, 검색/필터 바는 8px 라운드의 사각형을 사용해 "친근함"보다 "신뢰감"을 우선한다.

**Key Characteristics:**
- 단일 액센트 컬러: `{colors.primary}` (#1d4ed8)가 모든 주요 CTA, 활성 탭, 링크, 폼 포커스 링을 담당한다. 앰버(`{colors.accent}`)는 게시판 공지/상태 배지 전용.
- 기본 폰트: `Pretendard Variable`. 디스플레이 24–32px / 600–700, 본문 16px / 400, 보조 14px / 400.
- 4단 글로벌 내비게이션: 회사소개 / 제품소개 / 커뮤니티 / 온라인문의 + 우측 로그인·회원가입(또는 마이페이지) 영역. 활성 탭은 밑줄(`{component.nav-tab-active}`)로 표시.
- 검색/필터 바는 사각형 8px 라운드(`{rounded.sm}`), 1px 헤어라인 보더, 포커스 시 2px 프라이머리 보더로 전환.
- 제품 카드는 정보 우선: 정사각 이미지(`{rounded.md}`) + 제목 + 한 줄 설명 + "자세히 보기" 텍스트 링크. Airbnb의 하트/배지 오버레이 같은 장식 요소는 없다.
- 게시판 리스트는 표 형태(타이틀/작성자/날짜/조회수 컬럼)로, 공지글만 `{component.notice-badge}`로 강조.
- 엘리베이션은 2단계로 제한: 카드 기본(`{elevation.card}`)과 드롭다운/모달(`{elevation.overlay}`). Airbnb처럼 1단계만 두지 않는 이유는 관리자 테이블에서 행 호버 구분이 필요하기 때문.
- 8px 기본 스페이싱 시스템, 섹션 간격은 `{spacing.section}`(80px)으로 Airbnb(64px)보다 약간 넓게 — 마케팅 사이트보다 카드 밀도가 낮은 정보형 사이트이므로 여백을 더 둔다.

## Colors

### Brand & Accent
- **Primary** (`{colors.primary}` — #1d4ed8): 모든 주요 CTA(로그인, 회원가입, 문의하기, 게시글 작성), 활성 내비게이션 밑줄, 링크, 폼 포커스 보더에 사용.
- **Primary Hover** (`{colors.primary-hover}` — #1e40af): 버튼/링크 호버 시.
- **Primary Active** (`{colors.primary-active}` — #1e3a8a): 버튼 클릭(press) 시.
- **Primary Disabled** (`{colors.primary-disabled}` — #bfdbfe): 비활성 CTA 배경.
- **Accent** (`{colors.accent}` — #f59e0b): 게시판 "공지" 배지, 문의 상태 "대기중" 배지 전용. 마케팅 영역에는 등장하지 않음.
- **Accent Soft** (`{colors.accent-soft}` — #fef3c7): 배지 배경 톤.

### Surface
- **Canvas** (`{colors.canvas}` — #ffffff): 모든 공개 페이지의 기본 배경.
- **Surface Soft** (`{colors.surface-soft}` — #f8fafc): 섹션 구분 배경(회사소개 요약, 푸터 상단), 비활성 입력 배경.
- **Surface Strong** (`{colors.surface-strong}` — #f1f5f9): 테이블 헤더 배경, 관리자 사이드바 배경.

### Hairlines & Borders
- **Hairline** (`{colors.hairline}` — #e2e8f0): 기본 1px 보더 — 카드 테두리, 테이블 행 구분선, 헤더 하단선.
- **Hairline Soft** (`{colors.hairline-soft}` — #f1f5f9): 더 옅은 구분선 — 게시글 본문 내 단락 구분.
- **Border Strong** (`{colors.border-strong}` — #94a3b8): 폼 입력의 기본(비포커스) 보더.

### Text
- **Ink** (`{colors.ink}` — #0f172a): 헤드라인, 본문, 주요 텍스트.
- **Body** (`{colors.body}` — #334155): 게시글/제품 설명 등 장문 텍스트.
- **Muted** (`{colors.muted}` — #64748b): 메타 정보(작성일, 조회수), 보조 라벨, 푸터 링크.
- **Muted Soft** (`{colors.muted-soft}` — #94a3b8): 비활성 텍스트, placeholder.
- **On Primary** (`{colors.on-primary}` — #ffffff): 프라이머리 버튼 위 텍스트.

### Semantic
- **Success** (`{colors.success}` — #16a34a): 문의 상태 "답변완료" 배지, 폼 제출 성공 토스트.
- **Error** (`{colors.error}` — #dc2626): 폼 검증 에러 텍스트/보더 (Zod 에러 메시지).
- **Warning** (`{colors.warning}` — #f59e0b): 비밀번호 강도 경고 등.

### Scrim
- **Scrim** (`{colors.scrim}` — #000000, 50% opacity): 모달/드로어 배경 (로그인 모달, 이미지 라이트박스, 모바일 내비게이션 시트).

## Typography

### Font Family
기본 폰트는 **Pretendard Variable**, 폴백은 `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`. 별도 디스플레이 전용 폰트는 두지 않는다 — Pretendard 자체의 가변 굵기로 전체 스케일을 처리한다.

### Hierarchy

| Token | Size | Weight | Line Height | Use |
|---|---|---|---|---|
| `{typography.display-xl}` | 32px | 700 | 1.25 | 메인 히어로 타이틀 |
| `{typography.display-lg}` | 28px | 700 | 1.3 | 페이지 타이틀(회사소개, 제품소개 등) |
| `{typography.display-md}` | 24px | 600 | 1.3 | 섹션 제목("대표 제품", "최신 게시글") |
| `{typography.title-md}` | 18px | 600 | 1.4 | 카드 제목, 게시글 제목(상세) |
| `{typography.title-sm}` | 16px | 600 | 1.4 | 폼 라벨, 테이블 헤더 |
| `{typography.body-md}` | 16px | 400 | 1.6 | 기본 본문(게시글, 제품 설명) |
| `{typography.body-sm}` | 14px | 400 | 1.5 | 카드 메타, 보조 설명 |
| `{typography.caption}` | 13px | 400 | 1.4 | 작성일, 조회수, 헬프 텍스트 |
| `{typography.badge}` | 12px | 600 | 1.2 | 공지/상태 배지 텍스트 |
| `{typography.button-md}` | 16px | 600 | 1.25 | 주요 버튼 라벨 |
| `{typography.button-sm}` | 14px | 600 | 1.25 | 보조 버튼, 페이지네이션 |
| `{typography.nav-link}` | 15px | 600 | 1.25 | 글로벌 내비게이션 라벨 |
| `{typography.link}` | 14px | 400 | 1.5 | 인라인 본문 링크 |

### Principles
관리자 페이지와 게시판처럼 **텍스트/표가 정보 위계를 직접 전달**하는 화면이 많으므로, 디스플레이 굵기는 Airbnb(500–700, 비교적 가벼움)보다 한 단계 무겁게(600–700) 설정해 제목과 본문의 대비를 분명히 한다. 사진/카드가 위계를 대신 책임지는 섹션(메인 히어로, 제품 목록)에서만 의도적으로 본문과의 대비를 줄인다.

## Layout

### Spacing System
- **Base unit:** 4px.
- **Tokens:** `{spacing.xxs}` 2px · `{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.md}` 12px · `{spacing.base}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 80px.
- **섹션 수직 패딩:** `{spacing.section}` (80px) — 메인 페이지의 회사소개 요약/대표 제품/최신 게시글 같은 주요 블록 간.
- **카드 내부 패딩:** `{spacing.lg}` (24px) — 제품 카드, 게시글 작성 폼 카드. 테이블 행 패딩은 `{spacing.md}` (12px).
- **거터:** `{spacing.base}` (16px) — 제품 그리드, 게시판 리스트 행 간 구분(보더로 대체 가능).

### Grid & Container
- **최대 컨텐츠 너비:** 1200px 중앙 정렬. 관리자 페이지는 사이드바(240px) + 본문(가변)으로 분리.
- **제품 목록:** 데스크톱 4열, 태블릿 3열, 모바일 1열 그리드 카드.
- **게시판 목록:** 단일 컬럼 표(타이틀/작성자/날짜/조회수), 모바일에서는 작성자·날짜를 타이틀 아래 보조 텍스트로 축약.
- **회사소개 서브페이지:** 좌측 사이드 내비게이션(회사소개/CEO 인사말/비전/연혁/오시는 길) + 우측 본문 2단 구조, 모바일은 상단 탭으로 전환.
- **관리자 페이지:** 좌측 고정 사이드바(회원/제품/게시판/문의/사이트설정 메뉴) + 우측 콘텐츠 영역(테이블 + 필터 바).

### Whitespace Philosophy
메인 페이지 섹션 간에는 80px의 여유를 두어 "신뢰감 있는 기업 사이트"의 톤을 유지하지만, 게시판/제품 목록 같은 리스트형 화면에서는 행 간격을 좁게(8–12px) 잡아 한 화면에 더 많은 정보를 노출한다 — Airbnb의 "열린 히어로, 밀도 있는 그리드" 철학을 그대로 계승.

## Elevation

- **Flat (no shadow):** 본문, 히어로, 푸터, 회사소개/제품소개 정적 섹션 — 대부분의 표면.
- **Card** (`{elevation.card}`): `box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.08)` — 제품 카드, 게시글 카드, 폼 카드(로그인/회원가입)의 기본 상태.
- **Card Hover** (`{elevation.card-hover}`): `box-shadow: 0 4px 6px rgba(15, 23, 42, 0.08), 0 2px 4px rgba(15, 23, 42, 0.06)` — 카드 호버 시 살짝 들뜨는 효과.
- **Overlay** (`{elevation.overlay}`): `box-shadow: 0 10px 15px rgba(15, 23, 42, 0.12), 0 4px 6px rgba(15, 23, 42, 0.08)` — 드롭다운(계정 메뉴), 모달(로그인, 이미지 라이트박스), 토스트.

Airbnb의 1단계 셰도우 정책과 달리 본 시스템은 2단계(card/overlay)를 둔다 — 관리자 테이블과 카드 그리드에서 호버 상태를 명확히 구분해야 하기 때문.

## Components

### Buttons
**`button-primary`** — Primary 배경, 흰 텍스트, `{rounded.sm}`(8px), 12×20px 패딩, 44px 높이. "로그인", "회원가입", "문의하기", "게시글 작성" 등 주요 액션.
**`button-primary-disabled`** — `{colors.primary-disabled}` 배경, cursor not-allowed.
**`button-secondary`** — 흰 배경 + Ink 텍스트 + 1px `{colors.border-strong}` 보더. "취소", "목록으로" 등.
**`button-text`** — 배경 없음, Primary 텍스트, 호버 시 밑줄. "더보기", "전체보기" 링크형 버튼.
**`button-danger`** — `{colors.error}` 배경, 흰 텍스트. 게시글/계정 삭제 확인.

### Navigation
**`global-nav`** — 흰 배경, 72px 높이, 1px 하단 헤어라인. 좌측 로고, 중앙 4탭(회사소개/제품소개/커뮤니티/온라인문의), 우측 로그인 또는 마이페이지/로그아웃.
**`nav-tab-active`** — Ink 텍스트, 2px Primary 밑줄.
**`nav-tab-inactive`** — Muted 텍스트, 밑줄 없음.
**`breadcrumb`** — Muted 텍스트 체인("회사소개 > 비전"), `>` 구분자, 마지막 항목만 Ink.

### Cards
**`product-card`** — 정사각 이미지(`{rounded.md}` 클리핑) + 제목(`{typography.title-md}`) + 설명 1줄(`{typography.body-sm}` muted) + "자세히 보기" 텍스트 링크. 기본 `{elevation.card}`, 호버 시 `{elevation.card-hover}`.
**`post-row`** — 게시판 리스트의 1행. 공지글은 `{component.notice-badge}`를 제목 앞에 붙이고 행 배경을 `{colors.surface-soft}`로 살짝 강조, 최상단 고정.
**`notice-badge`** — `{colors.accent-soft}` 배경 + `{colors.accent}` 텍스트, `{rounded.full}`, "공지" 라벨(`{typography.badge}`).
**`status-badge`** — 문의 상태 표시. `pending` → muted 배경 + ink 텍스트, `answered` → `{colors.success}` 텍스트 + 연한 초록 배경.

### Forms
**`text-input`** — 흰 배경, 1px `{colors.border-strong}` 보더, `{rounded.sm}`, 44px 높이, 12×16px 패딩. 포커스 시 2px Primary 보더로 전환(글로우 없음). 라벨은 입력 위 `{typography.title-sm}`.
**`textarea`** — text-input과 동일 스타일, 게시글/문의 본문 작성용. 최소 높이 160px.
**`form-error-text`** — `{colors.error}`, `{typography.caption}`. Zod 검증 실패 시 입력 바로 아래 표시.
**`file-attach`** — 점선 보더(`{colors.hairline}`) 영역에 "파일을 끌어다 놓거나 클릭" 안내, 첨부 후 파일명 + 삭제(x) 아이콘 행으로 전환.

### Admin
**`admin-sidebar`** — `{colors.surface-strong}` 배경, 240px 고정 너비. 메뉴 항목(회원관리/제품관리/게시판관리/문의관리/사이트설정), 활성 항목은 흰 배경 + Primary 텍스트 + 좌측 4px Primary 바.
**`data-table`** — 헤더 행은 `{colors.surface-strong}` 배경 + `{typography.title-sm}`, 본문 행은 1px `{colors.hairline}` 하단 보더, 행 호버 시 `{colors.surface-soft}` 배경.
**`pagination`** — 페이지 번호 버튼(`{rounded.sm}`), 활성 페이지는 Primary 배경 + 흰 텍스트.

### Footer
**`footer-light`** — `{colors.surface-soft}` 배경, 3컬럼(회사정보 / 바로가기 / 고객센터), 하단에 사업자정보 + 저작권 행(`{typography.caption}` muted).

## Responsive Behavior

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 640px | 글로벌 내비게이션은 로고 + 햄버거로 축소, 4탭은 슬라이드 시트로 이동. 제품 그리드 1열. 게시판 리스트는 작성자/날짜를 제목 아래 보조줄로 축약. 관리자 사이드바는 상단 드롭다운으로 전환. |
| Tablet | 640–1024px | 제품 그리드 2–3열. 회사소개 사이드 내비게이션이 상단 가로 탭으로 전환. 관리자 사이드바는 아이콘만 표시되는 축소 모드. |
| Desktop | 1024–1280px | 글로벌 내비게이션 4탭 전부 노출, 제품 그리드 4열, 관리자 사이드바 전체 라벨 노출. |
| Wide | > 1280px | 컨텐츠 최대 너비 1200px로 고정, 여백은 좌우로 흡수. |

### Touch Targets
- 모든 버튼/입력 최소 44×44px (WCAG AA 이상).
- 게시판 페이지네이션 버튼 최소 36×36px.
- 모바일 내비게이션 햄버거 48×48px.

### Collapsing Strategy
- 글로벌 내비게이션 4탭은 640px 미만에서 햄버거 시트로 합쳐진다.
- 회사소개 좌측 사이드 내비게이션은 1024px 미만에서 상단 가로 스크롤 탭으로 전환된다.
- 관리자 사이드바는 1024px 미만에서 아이콘 전용으로, 640px 미만에서 상단 드롭다운 메뉴로 전환된다 — 행을 줄이지 않고 항상 컬럼을 줄이는 방향(Airbnb 원칙과 동일).

## Known Gaps

- **다크 모드:** 본 프로젝트 범위에서는 정의하지 않음(공개 페이지는 라이트 모드 전용).
- **에디터 상세 스타일:** 게시글 작성용 리치 텍스트 에디터의 툴바/포맷 버튼 스타일은 실제 에디터 라이브러리 선정 후 확정 필요.
- **이미지 업로드 진행 상태:** Storage 업로드 중 프로그레스 바 등 인터랙션 디테일은 미정.
- **빈 상태(Empty State):** 게시글/제품/문의 내역이 없을 때의 일러스트레이션·문구는 미정.
- **다국어:** 현재 한국어 단일 언어 기준으로만 작성, 영어 버전 전환 시 타이포 스케일 재검토 필요.
