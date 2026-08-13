import Link from "next/link";
import { notFound } from "next/navigation";
import { Header,Footer,PostCard } from "../../../components/blog";
import { Markdown } from "../../../components/markdown";
import { getPost,getPosts,getRelated } from "../../../lib/posts";
export function generateStaticParams(){return getPosts().map(p=>({slug:p.slug}))}
export default async function PostPage({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const post=getPost(slug);if(!post)notFound();const related=getRelated(post);return <div><Header/><main><article className="article"><div className="breadcrumb"><Link href="/posts">아티클</Link> / {post.category}</div><span className="tag">{post.category}</span><h1>{post.title}</h1><p className="article-lead">{post.description}</p><div className="article-meta">{post.author} · {post.date} · {post.readingTime}분 읽기</div><img className="article-cover" src={post.thumbnail} alt=""/><Markdown content={post.content}/><Link className="back-link" href="/posts">← 전체 아티클로 돌아가기</Link></article><section className="related"><p className="eyebrow">KEEP READING</p><h2>연관 포스팅</h2><div className="post-grid">{related.map((p,i)=><PostCard key={p.slug} post={p} index={i}/>)}</div></section></main><Footer/></div>}
