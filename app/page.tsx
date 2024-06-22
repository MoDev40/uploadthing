"use client"
import { UploadDropzone } from "@/utils/uploadthing";
import axios from "axios";

export default function Home() {
  return (
    <div className="container mx-auto h-screen flex flex-col justify-center">
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
        await axios.post('/api/file/store',file).then((response)=>{
          alert("Upload Completed");
        })
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
      
      />
    </div>
  );
}
