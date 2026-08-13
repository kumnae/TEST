import { Header,Footer } from "../../components/blog";
import { PostsBrowser } from "../../components/posts-browser";
import { getPosts } from "../../lib/posts";
export const metadata={title:"전체 아티클"};
export default function PostsPage(){const posts=getPosts();return <div><Header/><main className="container"><section className="posts-hero"><p className="eyebrow">THE ARCHIVE</p><h1>모든 아티클</h1><p>AI 기술의 현재와 미래를 다룬 글을 한곳에서 검색하고 미리 볼 수 있습니다.</p></section><section className="all-posts"><PostsBrowser posts={posts}/></section></main><Footer/></div>}
