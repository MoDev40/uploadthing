import prisma from "@/utils/client"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(req:NextRequest){
    try {
        const { id } : { id:string} = await req.json()

            const res = await prisma.fileStores.delete({
                where:{
                    id,
                }
            })

        return NextResponse.json(res,{status:200})
    } catch (error) {
        return NextResponse.json({message:"unexpected error"},{status:500})
    }
  }