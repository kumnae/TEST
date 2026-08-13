"use client";
import { useMemo, useState } from "react";
import { PostCard } from "./blog";
import type { Post } from "../lib/posts";

export function PostsBrowser({posts}:{posts:Post[]}){
  const [query,setQuery]=useState("");
  const [topic,setTopic]=useState("전체");
  const topics=["전체",...Array.from(new Set(posts.map(p=>p.category)))];
  const filtered=useMemo(()=>posts.filter(p=>(topic==="전체"||p.category===topic)&&`${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())),[posts,query,topic]);
  return <><div className="archive-tools"><label className="archive-search"><span aria-hidden="true">⌕</span><input value={query} onInput={e=>setQuery(e.currentTarget.value)} placeholder="아티클 검색" aria-label="게시물 검색"/></label><div className="archive-filters" aria-label="카테고리 필터">{topics.map(t=><button key={t} onClick={()=>setTopic(t)} className={topic===t?"active":""}>{t}</button>)}</div><span className="archive-count">{filtered.length}개</span></div>{filtered.length?<div className="post-grid archive-grid">{filtered.map((p,i)=><PostCard post={p} index={i} compact key={p.slug}/>)}</div>:<div className="empty-state"><strong>검색 결과가 없습니다.</strong><span>다른 검색어나 카테고리를 선택해 보세요.</span></div>}</>
}
