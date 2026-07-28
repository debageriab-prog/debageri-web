import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.hostname !== "www.debageri.se") {
    return NextResponse.next();
  }

  const destination = request.nextUrl.clone();
  destination.hostname = "debageri.se";
  destination.protocol = "https:";
  destination.port = "";

  return NextResponse.redirect(destination, 308);
}
