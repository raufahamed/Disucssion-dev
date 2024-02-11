import PostList from "@/components/posts/post-list"
import TopicCreaeteForm from "@/components/topics/topics-create-form"
import TopList from "@/components/topics/topics-list"
import { fetchTopPosts } from "@/db/queries/posts"
import { Divider } from "@nextui-org/react"
export default function Home() {
 return (
    <div className="grid grid-cols-4 gap-4 p-4">
       <div className="col-span-3">
           <h1 className="text-xl m-2">Top Posts</h1>
           <PostList fetchData={fetchTopPosts}/>
       </div>

       <div className="border shadow py-3 px-2">
        <TopicCreaeteForm/>
        <Divider className="my-2"/>
        <h3 className="text-lg">Topics</h3>
        <TopList/>

       </div>
    </div>
  )
}
