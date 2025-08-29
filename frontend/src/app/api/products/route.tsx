import { NextResponse, NextRequest } from "next/server";
import schema from "../products/schema";
import prisma from "../../../prisma/client"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
    const products = await prisma.product.findMany()
    if (!products) {
        return NextResponse.json({ error: " I can't find products in the server where's the server help" }, { status: 400 })
    }
    return NextResponse.json(products);
}
export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = schema.safeParse(body);// The parse method would throw an exception and I guess we don't want that
    if (!validation.success) {
        return NextResponse.json(validation.error.issues, { status: 400 })
    }
    const newProduct = await prisma.product.create(
        {
            data: {
                name: body.name,
                price: body.price
            }
        }
    )
    if (!body.name) {
        return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    return NextResponse.json(newProduct, { status: 201 });// using a ... Could open the door for malicious users
}


