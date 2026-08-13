import Link from "next/link";
import { notFound } from "next/navigation";
import { Header,Footer,PostCard } from "../../../components/blog";
import { Markdown } from "../../../components/markdown";
import { getPost,getPosts,getRelated } from "../../../lib/posts";
export function generateStaticParams(){return getPosts().map(p=>({slug:p.slug}))}
export default async function PostPage({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const post=getPost(slug);if(!post)notFound();const related=getRelated(post);return <div><Header minimal/><main><article className="article"><Link className="article-back" href="/posts"><span>←</span> 전체 아티클로 돌아가기</Link><div className="article-category"><span aria-hidden="true">✣</span>{post.category}</div><h1>{post.title}</h1><div className="article-meta"><span>◷ {post.readingTime}분 읽기</span><span>{post.date}</span><span>작성자 {post.author}</span></div><img className="article-cover" src={post.thumbnail} alt={`${post.title} 대표 이미지`}/><p className="article-deck">{post.description}</p><Markdown content={post.content}/><Link className="back-link" href="/posts">← 전체 아티클로 돌아가기</Link></article><section className="related"><p className="eyebrow">KEEP READING</p><h2>연관 포스팅</h2><div className="post-grid archive-grid">{related.map((p,i)=><PostCard key={p.slug} post={p} index={i} compact/>)}</div></section></main><Footer/></div>}
