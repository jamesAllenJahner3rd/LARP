/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, type NextRequest } from "next/server";
import schema from "./schema"
import { prisma } from "../../../prisma/client";
export async function GET(
    request: NextRequest) {// this would cache if request:NextRequest wasn't there
    const users = await prisma.user.findMany()
    return NextResponse.json(users);
}
// For POST requests we're going to validate, 
//     if invalid return a 400, 
//     else return the data we collect.
export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = schema.safeParse(body)// The parse method would throw an exception and I guess we don't want that
    if (!validation.success) {
        return NextResponse.json(validation.error.issues, { status: 400 })
    }
    if (!body.name) {
        return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    return NextResponse.json({ id: 1, name: body.name }, { status: 201 });// 201 object created
}
