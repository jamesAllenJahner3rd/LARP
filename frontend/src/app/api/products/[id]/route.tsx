/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { prisma } from "../../../../prisma/client";
import { error } from 'console'

interface Props {
    params: {
        id: string;
        name: string;
        price: number;
    }
}
export async function GET(
    request: NextRequest,
    { params }: Props) {
    const context = await params;

    if (!context) {
        return NextResponse.json({ error: "Enter all info in" }, { status: 400 })
    }
    const product = await prisma.product.findUnique({
        where: { id: parseInt(context.id) },
    })
    if (!product) {
        return NextResponse.json({ error: "Product not Found" }, { status: 404 })
    }
    return NextResponse.json(product)
}
export async function PUT(request: NextResponse, { params }: Props) {
    const context = await params;
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.issues, { status: 400 })
    }

    if (!context) {
        return NextResponse.json({ error: "missing info" }, { status: 400 })
    }
    const product = await prisma.product.findUnique({
        where: { id: parseInt(context.id) }
    })
    if (!product) {
        return NextResponse.json({ error: " Cannot find product" }, { status: 404 })
    }
    const updatedProduct = await prisma.product.update({
        where: { id: product.id },
        data: {
            name: body.name,
            price: body.price
        }
    })
    return NextResponse.json({ updatedProduct }, { status: 201 })
}
export async function POST() { }
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const product = await prisma.product.findUnique({
        where: { id: parseInt(params.id) }
    }
    )
    if (!product) {
        return NextResponse.json({ error: " Product not found" }, { status: 400 })
    }
    await prisma.product.delete({
        where: { id: parseInt(params.id) }
    })
    return NextResponse.json({})
}
