import prisma from "@/utils/client"
import Link from "next/link"

async function page() {
  const files = await prisma.fileStores.findMany()
  return (
    <div>
      <ul>
        {files.map((file) => (
          <li key={file.size}>
            <h1>{file.name}</h1>
            <Link href={file.url}>{file.url}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default page