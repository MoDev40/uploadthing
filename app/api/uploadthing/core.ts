import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const file = createUploadthing();
 
// Fake auth function
const auth = (req: Request) => ({ id: "test" }); 
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  fileUploader: file({ image: { maxFileSize:"8MB",maxFileCount:1 },
    pdf: { maxFileSize:"8MB",maxFileCount:1 },text:{ maxFileSize:"8MB",maxFileCount:1 },
    "application/msword":{ maxFileSize:"8MB",maxFileCount:1 },
    "application/vnd.ms-powerpoint":{ maxFileSize:"8MB",maxFileCount:1},
    "application/vnd.ms-excel":{ maxFileCount:1,maxFileSize:"8MB" },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":{ maxFileSize:"8MB",maxFileCount:1 },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{ maxFileSize:"8MB",maxFileCount:1 },
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":{ maxFileSize:"16MB",maxFileCount:1 },
    })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);
 
      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;