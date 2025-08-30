import prisma from "@/prisma/client";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
export async function POST(request: NextRequest) {
    const body = await request.json()
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(8).max(100),
    });
    const validation = schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.issues, { status: 400 });
    }
    // If validation passes, you can access the validated data like this:
    const user = await prisma.user.findUnique({
        where: { email: body.email }
    })
    if (user) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }


    const passwordHash = await bcrypt.hash(body.password, 10);
    const newUser = await prisma.user.create({
        data: {
            email: body.email,
            passwordHash
        }
    });
    return NextResponse.json({ email: newUser.email }, { status: 201 });

    return NextResponse.json(newUser, { status: 201 });
}