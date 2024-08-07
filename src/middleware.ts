import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { MiddlewareUtils } from "./utils/server/middlewareUtils/middleware";
import { MiddlewareUtilConfig } from "./utils/server/middlewareUtils/middleware.types";
import { Modules } from "./lib/config/modules";
import { UserRoles } from "./server/app/auth/auth.types";
import { signOut } from "next-auth/react";
import { cookies } from "next/headers";

export function middleware(request: NextRequest, response: NextResponse) {
  const configMiddlewares: MiddlewareUtilConfig[] = [
    {
      identifier: "Validate Login Page | If request has session, skip login",
      matcherPathnames: [Modules.AUTH.LOGIN.route],
      condition: (token) => {
        const result = token?.user?.role !== UserRoles.ADMIN;
        return result;
      },
      failedUrl: Modules.ADMIN.STATE.route,
    },
    {
      identifier: "Validate Admin Pages",
      matcherPathnames: [],
      matcherCondition: request.nextUrl.pathname.startsWith(
        Modules.ADMIN.route
      ),
      condition: (token) => {
        const result = token?.user?.role === UserRoles.ADMIN;
        return result;
      },
      failedUrl: Modules.AUTH.LOGIN.route,
      failedUrlWithCallback: true,
    },
    {
      identifier: "Validate Getting Started Page",
      matcherPathnames: [Modules.AUTH.USER_REGISTER.route],
      condition: (token) => {
        const result =
          token?.user?.token && token?.user?.sessionToken ? false : true;
        return result;
      },

      failedUrl: Modules.USER.CHAT.route,
    },
    {
      identifier: "Validate User Chat",
      matcherPathnames: [Modules.USER.CHAT.route],
      condition: (token) => (token?.user?.token ? true : false),
      failedUrl: Modules.AUTH.USER_REGISTER.route,
    },
    {
      identifier: "Validate User Chat Session",
      matcherPathnames: [Modules.USER.CHAT.route],
      condition: (token) => {
        let result: boolean;

        if (request.nextUrl.searchParams.get("session") === "new") {
          result = true;
        } else {
          result = token?.user?.sessionToken ? true : false;
        }

        return result;
      },
      failedUrl: `${Modules.USER.NEW_SESSION.route}?session=new`,
    },
  ];

  const middlewareUtils = new MiddlewareUtils(configMiddlewares, request);
  console.log(request.nextUrl.pathname);

  return middlewareUtils.process();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|img).*)"],
};
