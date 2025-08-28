/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, type NextRequest } from "next/server";

export function GET(
    request: NextRequest) {// this would cache if request:NextRequest wasn't there
    return NextResponse.json([
        { id: 1, name: 'Mosh' },
        { id: 2, name: "John" },
    ]);
}
// For POST requests we're going to validate, 
//     if invalid return a 400, 
//     else return the data we collect.
export async function POST(request: NextRequest) {
    const body = await request.json();
    if (!body.name) {
        return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    return NextResponse.json({ id: 1, name: body.name }, { status: 201 });// 201 object created
}
