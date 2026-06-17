# 회사홈페이지 — 확정 요구사항 명세 (spec-fixed)

> 기준 문서: `docs/spec/spec-origin.md`, `CLAUDE.md`
> 본 문서는 origin 명세의 모호한 부분을 구체화하고, 이미 구축된 Supabase 스키마(`profiles`, `products`, `posts`, `inquiries`)와 일치하도록 고정한 버전입니다.

## 1. 범위

### 포함 (MVP)
회원가입 / 로그인 / 로그아웃 / 회사소개 / 제품소개 / 온라인문의 / 게시판 / 관리자 페이지

### 제외 (MVP)
댓글 / 좋아요 / 채팅 / 알림 / 결제

## 2. 기능 요구사항

### FR-01. 회원가입
이메일 + 비밀번호로 가입한다. 가입 즉시 `auth.users` 트리거로 `profiles` 행이 생성되며 기본 `role`은 `user`이다. React Hook Form + Zod로 입력값(이메일 형식, 비밀번호 최소 길이, 비밀번호 확인 일치)을 검증한다.

### FR-02. 로그인 / 로그아웃
Supabase Auth(email/password)로 로그인하며, 세션은 Supabase client가 관리한다. 로그아웃 시 세션을 종료하고 메인 페이지로 이동한다.

### FR-03. 마이페이지
로그인 사용자는 본인 프로필(이름, 이메일, 전화번호)을 조회/수정할 수 있다. `role` 컬럼은 클라이언트에서 수정 불가(DB 트리거로 차단됨).

### FR-04. 회사소개 — 정적 서브페이지
회사소개 / CEO 인사말 / 비전 / 연혁 / 조직도 / 오시는 길 6개 서브페이지를 제공한다. 콘텐츠는 별도 CMS 테이블 없이 정적 콘텐츠(코드/마크다운)로 관리한다.

### FR-05. 제품 목록
`products` 테이블을 카드형 UI로 조회한다. 이름 검색과 `category` 필터를 지원하며, 비로그인 사용자도 조회 가능하다(공개 SELECT 정책 적용됨).

### FR-06. 제품 상세
제품 1건의 이미지/설명/가격을 표시하고, "문의하기" 버튼 클릭 시 해당 `product_id`가 연결된 문의 작성 폼으로 이동한다.

### FR-07. 온라인문의 작성
로그인 사용자만 문의를 작성할 수 있다(`user_id = auth.uid()` 강제). 제목/내용은 필수이며, 제품 연결은 선택이다. 작성 시 `status`는 `pending`으로 시작한다.

### FR-08. 온라인문의 내역 조회 (사용자)
로그인 사용자는 본인이 작성한 문의 목록과 상태(`pending`/`answered`), 관리자 답변을 조회할 수 있다. 타인의 문의는 조회할 수 없다(RLS로 강제됨).

### FR-09. 온라인문의 답변/상태 변경 (관리자)
admin role만 문의에 답변을 작성하고 `status`를 `answered`로 변경할 수 있다(RLS `inquiries_update_admin` 정책으로 강제됨).

### FR-10. 게시판 목록
`posts`를 최신순으로 페이징 조회한다. `is_notice = true`인 글은 상단에 고정 노출한다. 제목/내용 검색을 지원한다.

### FR-11. 게시판 상세 + 조회수
게시글 상세 진입 시 `view_count`를 1 증가시킨다(중복 증가 방지 로직 없이 단순 증가).

### FR-12. 게시판 작성 / 수정 / 삭제
로그인 사용자만 작성 가능하며 `author_id = auth.uid()`로 고정된다. 수정/삭제는 작성자 본인 또는 admin만 가능하다(RLS로 강제됨). 작성 시 에디터(텍스트)와 파일 첨부(Storage `editor` 버킷)를 지원한다.

### FR-13. Protected Route
로그인이 필요한 화면(마이페이지, 게시글 작성, 문의 작성/조회)은 비로그인 접근 시 로그인 페이지로 리다이렉트한다.

### FR-14. Admin Route
`/관리자` 하위 전체 라우트는 `profiles.role = 'admin'`이 아닌 사용자의 접근을 차단하고 메인 페이지로 리다이렉트한다.

### FR-15. 관리자 — 회원관리
admin은 전체 사용자 목록을 조회하고 `role`을 변경할 수 있다(`profiles_update_own_or_admin` 정책으로 admin은 모든 행 수정 가능).

### FR-16. 관리자 — 제품관리
admin은 제품을 등록/수정/삭제하고 이미지를 Storage `products` 버킷에 업로드한다(`products_admin_write` 정책으로 강제됨).

### FR-17. 관리자 — 게시판관리
admin은 모든 게시글을 수정/삭제할 수 있고, 공지 고정(`is_notice`) 여부를 토글할 수 있다.

### FR-18. 관리자 — 사이트설정
회사소개 콘텐츠(연혁, 오시는 길 등) 및 회사 이미지(Storage `company` 버킷)를 관리한다. MVP 범위에서는 별도 설정 테이블 없이 정적 콘텐츠 갱신으로 처리한다.

## 3. 비기능 요구사항

### NFR-01. 권한 분리 (RLS)
모든 테이블은 RLS가 활성화되어 있으며, 클라이언트는 Supabase anon/authenticated 키로만 접근한다. 서비스 키는 서버/관리 스크립트 외 노출하지 않는다.

### NFR-02. 반응형 레이아웃
Tailwind CSS Utility-First 원칙으로 모바일/데스크톱 반응형을 지원한다.

### NFR-03. 컴포넌트 재사용 / Service Layer 분리
Supabase 호출은 화면 컴포넌트가 아닌 별도 Service Layer(`src/services/*`)를 통해서만 수행한다.

## 4. 권한 매트릭스 (요약)

| 기능 | 비로그인 | user | admin |
|---|---|---|---|
| 제품/게시글 조회 | O | O | O |
| 게시글 작성/본인 수정·삭제 | X | O | O |
| 문의 작성/본인 조회 | X | O | O |
| 회원/제품/게시판/문의 관리 | X | X | O |

## 5. 데이터 모델 (이미 적용됨)
`profiles` / `products` / `posts` / `inquiries` — 컬럼, FK, RLS 정책은 Supabase에 마이그레이션 적용 완료 상태와 일치함 (`create_core_tables`, `enable_rls_and_policies`, `create_storage_buckets_and_policies` 마이그레이션 참조).
