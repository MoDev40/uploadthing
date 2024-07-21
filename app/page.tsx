"use client"
import { useDeleteFileMutation, useDeleteStoreFileMutation, useGetFilesQuery, useUploadFileMutation } from "@/lib/features/fileSlice";
import { UploadDropzone } from "@/utils/uploadthing";
import Link from "next/link";
export default function Home() {
  const [upload,{ isLoading }] = useUploadFileMutation();
  const { data: files, isFetching } = useGetFilesQuery();
  const [deleteFile,{ isLoading:isLoad }] = useDeleteFileMutation();
  const [deleteStoreFile,{ isLoading:Loader }] = useDeleteStoreFileMutation();


  async function handleDelete(id:string) {
    await deleteStoreFile(id).unwrap()
    .then(async(res)=>{
      await deleteFile(res.key).unwrap()
      .then(()=>{
        alert("Deleted Successfully")
      })
      .catch(()=>{
        alert("Unexpected error")
      })
    })
    .catch(()=>{
      alert("Unexpected error")
    })
  }

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
          <div className="flex flex-col gap-4">
          {
            files.map((file) =>(
              <div className="flex flex-col gap-4" key={file.key}>
                <p>{file.name}</p>
                <Link href={file.url}>{file.url}</Link>
                <button onClick={()=>{
                  handleDelete(file?.id as string)
                }} className="bg-rose-600 p-2 rounded w-24">{isLoad || Loader ? "loading...." : "delete"}</button>
              </div>
            ))
          }
          </div>
        }
      </div>
    </div>
  );
}
