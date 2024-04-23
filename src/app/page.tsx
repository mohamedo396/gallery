/* eslint-disable @next/next/no-img-element */

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
export const dynamic="force-dynamic";

async function Images(){
  const images=await getMyImages();
  
  return(
    <div className="flex flex-wrap gap-4">
       
    {
       images.map((image,index)=>(
        <div key={image.id} className="flex w-48 flex-col ">
          <img src={image.url} alt="image" />
          <div>{image.name}</div>
        </div>
      ))
    }
  </div>
  )
}


export default async function HomePage() {
 
  return (
    <main className="">
      <SignedOut>
          <div className="w-full h-full text-2xl text-center">heey fucker,Please Sign in above</div>
      </SignedOut>

      <SignedIn>
        <Images/>
      </SignedIn>
    </main>
  );
}
