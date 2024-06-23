import prisma from "@/utils/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        const body = await req.json();
        const file = await prisma.fileStores.create({
            data:{
                name:body.name,
                size:body.size,
                type:body.type,
                url:body.url,
                key:body.key
            }
        })

        return NextResponse.json(file,{status:201});
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"error"},{status:500});
    }
}

export async function GET(req:NextRequest){
    try {
        const files = await prisma.fileStores.findMany();
        return NextResponse.json(files,{status:200});
    } catch (error) {
        return NextResponse.json({message:"error"},{status:500});
    }
}