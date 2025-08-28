
import { NextResponse, type NextRequest } from "next/server";

export function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = Number(params.id);

    if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    if (id > 10) {
        return NextResponse.json({ error: "Poop not found" }, { status: 404 });
    }

    return NextResponse.json({ id, name: "pee" });
}