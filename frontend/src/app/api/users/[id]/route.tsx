/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from "next/server";
import schema from "../schema";
import { prisma } from "../../../../prisma/client";
import { error } from "console";
interface Props {
    params: { id: string }
}
export async function GET(
    request: NextRequest,
    context: Props) {
    const params = await context.params;
    const user = await prisma.user.findUnique({
        where: { id: params.id },
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
}
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    // return NextResponse.json({ message: "PUT request received" });
    // Validate the request body
    const body = await request.json();
    console.log(body);
    // If invalid Or malformed return 400 error 
    // if (!body.name) { instead we use zod schema
    const validation = schema.safeParse(body)// The parse method would throw an exception and I guess we don't want that
    if (!validation.success) {
        return NextResponse.json(validation.error.issues, { status: 400 })
    }
    //else fetch user by id
    const user = await prisma.user.findUnique({ where: { id: params.id } })
    // user doesn't exist return 404 error
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    //Update the user
    // return the updated user
    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
            name: body.name,
            email: body.email
        }
    })
    return NextResponse.json(updatedUser, { status: 201 });
}
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    // Fetch user from the database
    const user = await prisma.user.findUnique(
        { where: { id: params.id } }
    )
    if (!user) {
        return NextResponse.json({ error: "User Not found" }, { status: 404 })
    }
    await prisma.user.delete({ where: { id: user.id } });
    return NextResponse.json({ message: "DELETE request received" }, { status: 200 });

    // if not found return 404 
    // delete the user 
    // return 200

}