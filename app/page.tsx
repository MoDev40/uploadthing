"use client"
import { useGetFilesQuery, useUploadFileMutation } from "@/lib/features/fileSlice";
import { UploadDropzone } from "@/utils/uploadthing";
import Link from "next/link";
export default function Home() {
  const [upload,{isLoading}] = useUploadFileMutation()
  const { data: files, isFetching } = useGetFilesQuery();
  return (
    <div className="container space-y-8 mx-auto h-screen flex flex-col justify-center">
      <UploadDropzone
      className="bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
      
      endpoint="fileUploader"
      onClientUploadComplete={async (res) => {
        const file = {
        name: res[0].name,
        size: res[0].size,
        type: res[0].type,
        url: res[0].url,
        key: res[0].key
        }
        await upload(file).unwrap().then(() =>{
          alert("Upload Completed");
        })
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
      
      />
      <div>
        {isLoading || isFetching ?<p>Loading...</p> :
          files&&
          <ul>
          {
            files.map((file) =>(
              <li key={file.size}>
                <p>{file.name}</p>
                <Link href={file.url}>{file.url}</Link>
              </li>
            ))
          }
          </ul>
        }
      </div>
    </div>
  );
}
