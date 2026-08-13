# NeuralPulse Markdown Blog

V0의 `Ai Blog` 템플릿을 참고해 만든 로컬 Markdown 기반 블로그입니다. GitHub, 외부 CMS, 데이터베이스를 사용하지 않습니다.

## 실행

```powershell
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 열어 확인합니다.

## 새 글 추가

`content/posts` 폴더에 `.md` 파일을 추가합니다. 파일명이 URL의 slug가 됩니다.

```md
---
title: "글 제목"
description: "목록에 표시할 짧은 설명"
date: "2026-08-13"
author: "작성자"
category: "생성형 AI"
tags: ["AI", "기술"]
thumbnail: "/images/robot-ai.jpg"
published: true
featured: false
relatedPosts: ["다른-글-파일명"]
---

Markdown 본문을 작성합니다.
```
