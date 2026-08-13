import Link from "next/link";
import { Header, Footer, PostCard } from "../components/blog";
import { getPosts } from "../lib/posts";

export default function Home() {
  const posts = getPosts();
  const featured = posts[0];
  return <div className="site-shell">
    <Header />
    <main>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">INTELLIGENCE, CURATED</p>
          <h1>AI의<br />최전선을<br /><span>탐험하다</span></h1>
          <p className="hero-description">생성형 AI, 컴퓨터 비전, 딥러닝의 변화를 이해하기 쉽게 기록합니다. 기술 너머의 가능성을 함께 발견하세요.</p>
          <div className="hero-actions"><Link className="button primary" href="/posts">최신 글 읽기 <span>↗</span></Link><a className="button ghost" href="#newsletter">뉴스레터 참여</a></div>
        </div>
        <Link href={`/posts/${featured.slug}`} className="hero-visual"><img src={featured.thumbnail} alt="노트북을 사용하는 휴머노이드 로봇" /><div className="hero-card-label"><span>{featured.category}</span><strong>{featured.title}</strong><small>{featured.readingTime}분 읽기 · {featured.date}</small></div></Link>
      </section>
      <section className="section container"><div className="section-heading"><div><p className="eyebrow">EDITOR&apos;S PICK</p><h2>주목할 만한 이야기</h2></div><Link href="/posts">전체 보기 <span>→</span></Link></div><div className="post-grid">{posts.slice(0,3).map((post, index)=><PostCard key={post.slug} post={post} index={index}/>)}</div></section>
      <section id="topics" className="topics container"><div><p className="eyebrow">EXPLORE TOPICS</p><h2>관심 분야에서<br />새로운 관점을 찾으세요.</h2></div><div className="topic-list">{["생성형 AI","컴퓨터 비전","머신러닝","AI 윤리"].map((topic,i)=><Link href={`/posts?topic=${encodeURIComponent(topic)}`} key={topic}><span>0{i+1}</span><strong>{topic}</strong><em>↗</em></Link>)}</div></section>
      <section id="newsletter" className="newsletter container"><div><p className="eyebrow">WEEKLY SIGNAL</p><h2>중요한 AI 소식만,<br />한 주에 한 번.</h2></div><form><label className="sr-only" htmlFor="email">이메일</label><input id="email" type="email" placeholder="you@example.com"/><button type="button">구독하기</button></form></section>
    </main><Footer />
  </div>;
}
