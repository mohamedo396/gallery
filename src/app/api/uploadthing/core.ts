import { auth as clerkAuth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
 // Assuming you're using Express for the request object

const f = createUploadthing();

const customAuth = (req: Request) => ({ userId: "fakeId" }); // Renamed auth function to customAuth

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB",maxFileCount:40 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = customAuth(req);

      // If you throw, the user will not be able to upload
      if (!user.userId) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      await db.insert(images).values({
        name:file.name,
        url:file.url,
        userId:metadata.userId,
      })
    

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
