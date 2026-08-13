import Link from "next/link";
import type { Post } from "../lib/posts";

export function Header({active,minimal=false}:{active?:"home"|"articles"|"topics"|"about";minimal?:boolean}){
  return <header className={`site-header ${minimal?"minimal":""}`}><div className="container header-inner">
    <Link className="logo" href="/">Neural<span>Pulse</span></Link>
    {!minimal&&<nav className="nav" aria-label="주 메뉴"><Link className={active==="home"?"active":""} href="/">홈</Link><Link className={active==="articles"?"active":""} href="/posts">아티클</Link><a className={active==="topics"?"active":""} href="/#topics">토픽</a><a className={active==="about"?"active":""} href="#about">소개</a></nav>}
    <a className="subscribe" href="/#newsletter">구독하기</a>
  </div></header>
}
export function Footer(){return <footer id="about" className="footer"><div className="container footer-inner"><span>© 2026 NeuralPulse. AI를 이해하는 새로운 관점.</span><span>Markdown으로 기록되는 독립 기술 블로그</span></div></footer>}
export function PostCard({post,index=0,compact=false}:{post:Post;index?:number;compact?:boolean}){return <Link className={`post-card ${compact?"compact":""}`} href={`/posts/${post.slug}`}><div className="post-thumb"><img src={post.thumbnail} alt=""/></div><div className="post-category"><span aria-hidden="true">✣</span>{post.category}</div><h3>{post.title}</h3><p>{post.description}</p><div className="post-date"><span aria-hidden="true">◷</span>{post.date}</div></Link>}
