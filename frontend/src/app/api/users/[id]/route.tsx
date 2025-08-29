
import { NextResponse, NextRequest } from "next/server";
import schema from "../schema";
import { prisma } from "../../../../prisma/client";

export function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = Number(params.id);

    if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    if (id > 10) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ id, name: "Mosh" });
}
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    // return NextResponse.json({ message: "PUT request received" });
    // Validate the request body
    const body = await request.json();
    console.log(body);
    // If invalid return 400 error
    // if (!body.name) { instead we use zod schema
    const validation = schema.safeParse(body)// The parse method would throw an exception and I guess we don't want that
    if (!validation.success) {
        return NextResponse.json(validation.error.issues, { status: 400 })
    }
    //else fetch user by id

    // user doesn't exist return 404 error
    if (+params.id > 10) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })

    }
    //Update the user
    // return the updated user
    return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}
export function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    // Fetch user from the database 
    if (params.id > '10') {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
    }


    // if not found return 404 
    // delete the user 
    // return 200
    return NextResponse.json({ message: "DELETE request received" }, { status: 200 });
}