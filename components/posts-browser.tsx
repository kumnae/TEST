"use client";
import { useMemo, useState } from "react";
import { PostCard } from "./blog";
import type { Post } from "../lib/posts";
export function PostsBrowser({posts}:{posts:Post[]}){const [query,setQuery]=useState("");const [topic,setTopic]=useState("전체");const topics=["전체",...Array.from(new Set(posts.map(p=>p.category)))];const filtered=useMemo(()=>posts.filter(p=>(topic==="전체"||p.category===topic)&&`${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())),[posts,query,topic]);return <><div className="filters"><input className="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="제목, 설명 또는 태그 검색" aria-label="게시물 검색"/>{topics.map(t=><button key={t} onClick={()=>setTopic(t)} className={`filter-button ${topic===t?"active":""}`}>{t}</button>)}</div><p className="count">{filtered.length}개의 아티클</p><div className="post-grid">{filtered.map((p,i)=><PostCard post={p} index={i} key={p.slug}/>)}</div></>}
