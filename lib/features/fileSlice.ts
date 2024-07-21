import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../baseUrl'

interface FileBody {
    id?: string;
    name: string;
    size: number;
    type: string;
    url: string;
    key: string;
}
const fileSlice = createApi({
    reducerPath:'api/fileSlice',
    baseQuery:fetchBaseQuery({baseUrl:BASE_URL}),
    tagTypes:['files'],
    endpoints:(builder)=>({
        uploadFile:builder.mutation<FileBody,FileBody>({
            query:(file)=>({
                url:'/file/store',
                method:'POST',
                body:file
            }),
            invalidatesTags:['files']
        }),
        deleteFile:builder.mutation<string,string | string[]>({
            query:(fileKeys)=>({
                url:`/uploadthing`,
                method:'DELETE',
                body:{ fileKeys }
            }),
            invalidatesTags:['files']
        }),
        deleteStoreFile:builder.mutation<FileBody,string | string[]>({
            query:(id)=>({
                url:`/file/delete`,
                method:'DELETE',
                body:{ id }
            }),
        }),
        getFiles:builder.query<FileBody[],void>({
            query:()=>({
                url:'/file/store',
                method:'GET'
            }),
            providesTags:['files']
        })
    })
})

export default fileSlice
export const {
    useUploadFileMutation,
    useGetFilesQuery,
    useDeleteFileMutation,
    useDeleteStoreFileMutation,
} = fileSlice