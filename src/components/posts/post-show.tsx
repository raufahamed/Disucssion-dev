import {db} from '@/db';
import { notFound } from 'next/navigation';
interface PostShowProps {

  PostId:string

}



export default async  function PostShow({PostId}: PostShowProps) {
  await new Promise((resolve)=>setTimeout(resolve,2500))
  const post = await db.post.findFirst({
    where:{id:PostId}
  })
  if(!post){
    notFound()
  }
  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  );
}
