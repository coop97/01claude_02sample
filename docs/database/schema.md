# 데이터베이스 스키마

> 출처: Supabase MCP(`list_tables`, `list_migrations`)로 확인한 실제 운영 스키마.
> 직접 SQL을 작성하기 전에 항상 MCP로 현재 상태를 재확인할 것 (`CLAUDE.md` MCP 우선 사용 원칙 참조).

## 마이그레이션 이력

| version | name |
|---|---|
| 20260616031221 | create_core_tables |
| 20260616031403 | enable_rls_and_policies |
| 20260616031418 | create_storage_buckets_and_policies |
| 20260616031759 | fix_security_advisor_warnings |
| 20260616031825 | revoke_public_execute_on_internal_functions |

## ERD

```txt
auth.users
  └─ profiles (1:1, id = auth.users.id)
       ├─ posts (1:N, posts.author_id → profiles.id)
       └─ inquiries (1:N, inquiries.user_id → profiles.id)

products
  └─ inquiries (1:N, inquiries.product_id → products.id, nullable)
```

## 테이블

### profiles
`auth.users`를 1:1로 확장하는 사용자 프로필. 회원가입 시 `handle_new_user` 트리거가 자동 생성한다.

| 컬럼 | 타입 | 제약 |
|---|---|---|
| id | uuid | PK, FK → auth.users.id (on delete cascade) |
| email | text | nullable |
| name | text | nullable |
| phone | text | nullable |
| role | text | default `'user'`, check `role in ('user','admin')` |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now(), 트리거로 자동 갱신 |

트리거:
- `on_auth_user_created` (auth.users AFTER INSERT) → `profiles` 행 생성
- `profiles_protect_role` (BEFORE UPDATE) → 본인이 admin이 아니면 `role` 변경 무시
- `profiles_set_updated_at` (BEFORE UPDATE) → `updated_at` 갱신

### products
제품 정보.

| 컬럼 | 타입 | 제약 |
|---|---|---|
| id | uuid | PK, default `gen_random_uuid()` |
| name | text | not null |
| category | text | nullable, 인덱스(`products_category_idx`) |
| description | text | nullable |
| price | numeric | nullable |
| image_url | text | nullable (Storage `products` 버킷 경로) |
| is_active | boolean | default true |
| created_at / updated_at | timestamptz | default now() |

### posts
커뮤니티 게시판.

| 컬럼 | 타입 | 제약 |
|---|---|---|
| id | uuid | PK, default `gen_random_uuid()` |
| author_id | uuid | not null, FK → profiles.id (on delete cascade), 인덱스 |
| title | text | not null |
| content | text | not null |
| is_notice | boolean | default false, 인덱스 (공지 상단고정) |
| view_count | integer | default 0 |
| created_at | timestamptz | default now(), 인덱스(desc) |
| updated_at | timestamptz | default now() |

### inquiries
온라인문의.

| 컬럼 | 타입 | 제약 |
|---|---|---|
| id | uuid | PK, default `gen_random_uuid()` |
| user_id | uuid | not null, FK → profiles.id (on delete cascade), 인덱스 |
| product_id | uuid | nullable, FK → products.id (on delete set null) |
| title | text | not null |
| content | text | not null |
| status | text | default `'pending'`, check `status in ('pending','answered')`, 인덱스 |
| answer | text | nullable |
| answered_at | timestamptz | nullable |
| created_at / updated_at | timestamptz | default now() |

## 헬퍼 함수

- `public.is_admin()` — `auth.uid()`가 admin role인지 boolean 반환. RLS 정책에서 사용. anon/authenticated 모두 EXECUTE 권한 필요(정책 평가를 위해 의도적으로 유지).
- `public.set_updated_at()` — `updated_at` 자동 갱신 트리거 함수 (search_path 고정됨).
- `public.handle_new_user()` — 가입 시 `profiles` 생성 (SECURITY DEFINER, PUBLIC EXECUTE 권한 회수됨 → 트리거 전용).
- `public.prevent_role_self_escalation()` — `role` 자가 변경 차단 (SECURITY DEFINER, PUBLIC EXECUTE 권한 회수됨 → 트리거 전용).

## RLS 정책 요약

| 테이블 | select | insert | update | delete |
|---|---|---|---|---|
| profiles | 본인 또는 admin | (트리거로만 생성) | 본인(role은 트리거로 보호) 또는 admin | 정책 없음(불가) |
| products | 전체 공개 | admin | admin | admin |
| posts | 전체 공개 | 로그인 사용자(author_id = 본인) | 본인 글 또는 admin | 본인 글 또는 admin |
| inquiries | 본인 글 또는 admin | 로그인 사용자(user_id = 본인) | admin만 | 본인(pending 상태만) 또는 admin |

## Storage 버킷

| 버킷 | public | 용도 | 쓰기 권한 |
|---|---|---|---|
| products | true | 제품 이미지 | admin만 insert/update/delete |
| company | true | 회사소개 이미지 | admin만 insert/update/delete |
| editor | true | 게시판 첨부파일 | 로그인 사용자 insert, 본인 또는 admin만 delete |

public 버킷은 객체 URL 직접 접근 시 RLS 검사를 거치지 않으므로, 파일 목록 노출(list)을 막기 위해 별도 공개 SELECT 정책은 두지 않았다.
