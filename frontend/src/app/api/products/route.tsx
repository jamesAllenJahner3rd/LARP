import { NextResponse, NextRequest } from "next/server";
import schema from "../users/schema";
export async function GET(request: NextRequest) {
    return NextResponse.json([
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 200 },
    ]);
}
export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = schema.safeParse(body);// The parse method would throw an exception and I guess we don't want that
    if (!validation.success) {
        return NextResponse.json(validation.error.issues, { status: 400 })
    }
    if (!body.name) {
        return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    return NextResponse.json({ id: 10, name: body.name, price: body.price }, { status: 201 });// using a ... Could open the door for malicious users
}


