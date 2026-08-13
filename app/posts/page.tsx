import { Header,Footer } from "../../components/blog";
import { PostsBrowser } from "../../components/posts-browser";
import { getPosts } from "../../lib/posts";
export const metadata={title:"전체 아티클"};
export default function PostsPage(){const posts=getPosts();return <div><Header active="articles"/><main className="archive container"><section className="archive-heading"><p>THE ARCHIVE</p><h1>전체 아티클</h1><span>AI의 흐름과 미래를 기록한 {posts.length}개의 이야기</span></section><PostsBrowser posts={posts}/></main><Footer/></div>}
