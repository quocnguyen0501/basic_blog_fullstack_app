// export async function middleware(req: NextRequest) {
//     const { pathname, searchParams } = req.nextUrl;

//     if (pathname == "/reset-token") {
//         const index = searchParams.findIndex((x) => x.key === "token");
//         // You could also add token validation here.
//         if (!index) {
//             return NextResponse.redirect("/");
//         }
//     }
//     return NextResponse.next();
// }

import { NextRequest, NextResponse } from "next/server";

const allowedParams = ["id"];

export function middleware(req: NextRequest) {
    const url = req.nextUrl;
    let changed = false;

    url.searchParams.forEach((_, key) => {
        if (!allowedParams.includes(key)) {
            changed = true;
        }
    });

    console.log(">>> CHANGE: ", changed);

    // Avoid infinite loop by only redirecting if the query
    // params were changed
    if (changed) {
        return NextResponse.redirect(url);
        // It's also useful to do a rewrite instead of a redirect
        // return NextResponse.rewrite(url)
    }
}
