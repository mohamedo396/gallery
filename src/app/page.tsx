/* eslint-disable @next/next/no-img-element */

import { db } from "~/server/db";

export const dynamic="force-dynamic";

const mockUrls=[
  "https://utfs.io/f/53ae19f8-5622-49c5-a8fd-0395b200f713-qrhmet.jpg",
  "https://utfs.io/f/6b045e6e-4181-4445-bb8d-df27ad19314d-g9j6yz.jpg",
  "https://utfs.io/f/cc305245-7969-4875-96d2-11b7dafb85ad-qhn8dw.png"

];

const mockImages=mockUrls.map((url,index)=>({
  id:index+1,
  url,
}))




export default async function HomePage() {
  const posts=await db.query.posts.findMany();
  console.log(posts);
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post)=>(
          <div key={post.id}>{post.name}</div>
        ))}
        {
          [ ... mockImages, ...mockImages, ...mockImages].map((image,index)=>(
            <div key={image.id+ "-" + index} className="w-48 ">
              <img src={image.url} alt="image" />
            </div>
          ))
        }
      </div>
    </main>
  );
}
