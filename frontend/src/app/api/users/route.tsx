/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, type NextRequest } from "next/server";

export function GET(
    request: NextRequest) {// this would cache if request:NextRequest wasn't there
    return NextResponse.json([
        { id: 1, name: 'Mosh' },
        { id: 2, name: "John" },
    ]);
}