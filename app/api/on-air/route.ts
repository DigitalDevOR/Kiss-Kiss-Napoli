// app/api/on-air/route.ts
import { NextResponse } from "next/server";
import { getOnAirData } from "@/lib/wp";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getOnAirData();

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}