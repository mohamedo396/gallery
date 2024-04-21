/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const mockUrls=[
  "https://utfs.io/f/53ae19f8-5622-49c5-a8fd-0395b200f713-qrhmet.jpg",
  "https://utfs.io/f/6b045e6e-4181-4445-bb8d-df27ad19314d-g9j6yz.jpg",
  "https://utfs.io/f/cc305245-7969-4875-96d2-11b7dafb85ad-qhn8dw.png"

];

const mockImages=mockUrls.map((url,index)=>({
  id:index+1,
  url,
}))




export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {
          [ ... mockImages, ...mockImages, ...mockImages].map((image)=>(
            <div key={image.id} className="w-48 ">
              <img src={image.url} alt="image" />
            </div>
          ))
        }
      </div>
    </main>
  );
}
