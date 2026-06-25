import { NextResponse } from "next/server";
import { getClassificaSerieA } from "@/lib/footBallData";

export async function GET() {
    const data = await getClassificaSerieA();
    return NextResponse.json(data);
}