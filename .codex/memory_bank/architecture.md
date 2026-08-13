# NeuralPulse 프로젝트 아키텍처

## 1. 프로젝트 개요

NeuralPulse는 로컬 Markdown 파일을 콘텐츠 원본으로 사용하는 한국어 AI 기술 블로그다. GitHub 기반 CMS, 외부 CMS, 외부 데이터베이스 없이 `content/posts`의 `.md` 파일을 빌드 시 읽어 페이지를 생성한다.

- 프레임워크: vinext 기반 Next.js App Router 호환 구조
- 언어: TypeScript
- UI: React 19, Tailwind CSS 4 및 전역 CSS
- 실행 환경: Node.js 22.13 이상
- 호스팅: OpenAI Sites의 Cloudflare Worker 호환 출력
- 데이터 저장: 로컬 Markdown 파일

## 2. 주요 디렉터리

```text
blog-preview/
├─ index.html                 # 더블클릭으로 여는 독립 실행 안내 페이지
├─ app/
│  ├─ layout.tsx             # 전역 HTML 레이아웃과 SEO 메타데이터
│  ├─ globals.css            # 사이트 전체 디자인과 반응형 스타일
│  ├─ page.tsx               # 홈페이지
│  ├─ not-found.tsx          # 404 화면
│  └─ posts/
│     ├─ page.tsx            # 전체 아티클 목록
│     └─ [slug]/page.tsx     # 포스팅 상세 페이지
├─ components/
│  ├─ blog.tsx               # Header, Footer, PostCard
│  ├─ posts-browser.tsx      # 검색과 카테고리 필터 UI
│  └─ markdown.tsx           # Markdown 본문 렌더러
├─ content/posts/            # 게시물 Markdown 원본
├─ lib/posts.ts              # 게시물 로딩, 파싱, 정렬, 연관 글 처리
├─ public/
│  ├─ images/                # 게시물 이미지
│  └─ og.png                 # 소셜 공유 이미지
├─ worker/index.ts           # Cloudflare Worker 진입점
├─ build/                    # Sites용 Vite 플러그인
├─ tests/                    # 렌더링 검증
├─ .openai/hosting.json      # Sites 프로젝트 및 리소스 설정
├─ vite.config.ts            # vinext/Vite 빌드 설정
└─ package.json              # 패키지와 실행 스크립트
```

`db`, `drizzle`, `examples/d1`은 스타터에 포함된 확장 예제다. 현재 블로그 콘텐츠 흐름에서는 데이터베이스를 사용하지 않는다.

## 3. 라우팅 구조

| URL | 파일 | 역할 |
|---|---|---|
| `/` | `app/page.tsx` | 대표 게시물, 추천 글, 토픽, 뉴스레터 영역 |
| `/posts` | `app/posts/page.tsx` | 전체 글 목록, 검색, 카테고리 필터 |
| `/posts/[slug]` | `app/posts/[slug]/page.tsx` | Markdown 본문과 연관 포스팅 |
| 존재하지 않는 경로 | `app/not-found.tsx` | 404 안내 |

상세 페이지의 `slug`는 Markdown 파일명에서 확장자를 제외한 값이다. 예를 들어 `computer-vision-world.md`는 `/posts/computer-vision-world`로 연결된다.

## 4. 콘텐츠 데이터 흐름

```text
content/posts/*.md
        ↓ import.meta.glob의 eager raw import
lib/posts.ts
        ↓ front matter와 본문 파싱
Post 객체 배열
        ├─ app/page.tsx
        ├─ app/posts/page.tsx
        └─ app/posts/[slug]/page.tsx
```

`lib/posts.ts`의 주요 함수:

- `getPosts()`: 공개 게시물을 날짜 내림차순으로 반환한다.
- `getPost(slug)`: slug와 일치하는 게시물 하나를 반환한다.
- `getRelated(post)`: front matter의 `relatedPosts`를 우선 사용하고 부족한 자리는 같은 카테고리 글로 보충해 최대 3개를 반환한다.
- `parse()`: front matter, 본문, 예상 읽기 시간을 `Post` 객체로 변환한다.

## 5. Markdown 게시물 규격

게시물은 다음 front matter를 사용한다.

```md
---
title: "글 제목"
description: "목록과 상세 상단에 표시할 설명"
date: "2026-08-13"
author: "작성자"
category: "생성형 AI"
tags: ["AI", "기술"]
thumbnail: "/images/robot-ai.jpg"
published: true
featured: false
relatedPosts: ["다른-게시물-slug"]
---

Markdown 본문
```

- `published: false`인 글은 공개 목록에서 제외된다.
- `thumbnail`은 일반적으로 `public/images` 아래의 파일을 `/images/...` 형태로 가리킨다.
- `relatedPosts`에는 파일 확장자를 제외한 다른 게시물의 slug를 작성한다.

## 6. UI 구성

### 공통 컴포넌트

- `Header`: 일반 내비게이션과 상세 페이지용 최소 내비게이션을 지원한다.
- `Footer`: 블로그 설명과 저작권 정보를 표시한다.
- `PostCard`: 홈, 아카이브, 연관 글에서 재사용한다. `compact` 속성으로 밀도 높은 카드 형태를 선택한다.
- `PostsBrowser`: 클라이언트 컴포넌트이며 검색과 카테고리 상태를 관리한다.
- `Markdown`: 현재 프로젝트에 필요한 제목, 문단, 목록을 가볍게 렌더링한다.

### 디자인 원칙

- 검은 배경과 보라색 포인트 색상을 사용한다.
- `/posts`는 데스크톱 3열, 태블릿 2열, 모바일 1열이다.
- 상세 페이지는 약 768px의 중앙 본문 칼럼을 사용한다.
- 상세 페이지 하단에 최대 3개의 연관 포스팅을 표시한다.

## 7. 빌드와 배포

주요 명령:

```powershell
npm run dev
npm run build
npm run test
```

- 개발 서버 기본 주소: `http://localhost:3000`
- `npm run build`는 Cloudflare Worker 호환 `dist` 결과물을 생성한다.
- `.openai/hosting.json`의 `project_id`는 기존 Sites 프로젝트를 식별하므로 임의로 변경하거나 제거하지 않는다.
- 현재 배포 주소: `https://neuralpulse-ai-blog.tiny-trail-5042.chatgpt.site`
- 프로젝트 루트의 `index.html`은 빌드 도구 없이 직접 열 수 있으며 게시된 블로그 주소로 즉시 이동한다. JavaScript가 차단된 환경을 위해 meta refresh와 수동 링크를 함께 제공한다.

## 8. 변경 시 주의사항

1. 게시물을 추가할 때 파일명 slug가 기존 게시물과 중복되지 않는지 확인한다.
2. front matter는 현재의 단순 파서가 처리할 수 있는 한 줄 형식을 유지한다.
3. 새로운 Markdown 문법이 필요하면 `components/markdown.tsx`를 함께 확장한다.
4. 게시물 데이터 구조가 바뀌면 `Post` 타입, 파서, 카드 및 상세 페이지를 함께 수정한다.
5. 레이아웃 변경 후 `/`, `/posts`, 대표 상세 페이지를 모두 확인한다.
6. 배포 전에 `npm run build`를 실행해 빌드 오류가 없는지 확인한다.
