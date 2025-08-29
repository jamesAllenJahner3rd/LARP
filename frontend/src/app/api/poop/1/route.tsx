
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    context: { params: { id: string } }
) {
    const { id: rawId } = await context.params;
    const id = await Number(rawId);

    if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    if (id > 10) {
        return NextResponse.json({ error: "Poop not found" }, { status: 404 });
    }

    return NextResponse.json({ id, name: "pee" });
}