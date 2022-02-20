import { NextMiddleware, NextResponse } from "next/server";

const handler: NextMiddleware = async (req, ctx) => {
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;

  // todo signature based url authorization
  if (pathname.startsWith("/cv")) {
    if (!url.searchParams.has("simple"))
      return new Response("<(-_*)>", { status: 404 });
  }
  return NextResponse.next();
};

export default handler;
