// app/api/programmi-radio/route.ts
import { NextResponse } from "next/server";
import { getAllProgrammiData } from "@/lib/wp";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getAllProgrammiData();

  return NextResponse.json(data, {
    /*headers: {
      "Cache-Control": "no-store",
    },*/
  });
}