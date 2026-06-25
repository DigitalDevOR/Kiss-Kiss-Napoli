import { NextResponse } from "next/server";
import { getNewsData } from "@/lib/wp";

export async function GET() {
    const data = await getNewsData();
    return NextResponse.json(data);
}