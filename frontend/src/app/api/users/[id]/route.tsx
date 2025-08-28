
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
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ id, name: "Mosh" });
}} // Fetch data from a database or external API
// If not found, return a 404 response
//else return the data