import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { MiddlewareUtils } from "./utils/server/middlewareUtils/middleware";
import { MiddlewareUtilConfig } from "./utils/server/middlewareUtils/middleware.types";
import { Modules } from "./lib/config/modules";
import { UserRoles } from "./server/app/auth/auth.types";

export function middleware(request: NextRequest) {
  const configMiddlewares: MiddlewareUtilConfig[] = [
    // {
    //   identifier: "Validate Login Page | If request has session, skip login",
    //   matcherPathnames: [Modules.AUTH.LOGIN.route],
    //   condition: (token) => {
    //     return true;
    //   },
    //   failedUrl: Modules.ADMIN.STATE.route,
    // },
    {
      identifier: "Validate Admin Pages",
      matcherPathnames: [],
      matcherCondition: request.nextUrl.pathname.startsWith(
        Modules.ADMIN.route
      ),
      condition: (token) => {
        const result =
          token?.user?.token && token?.user?.role === UserRoles.ADMIN
            ? true
            : false;
        console.log(result);

        return result;
      },
      failedUrl: Modules.AUTH.LOGIN.route,
      failedUrlWithCallback: true,
    },
    {
      identifier: "Validate Getting Started Page",
      matcherPathnames: [Modules.AUTH.USER_REGISTER.route],
      condition: (token) =>
        token?.user?.token && token?.user?.sessionToken ? false : true,
      failedUrl: Modules.USER.CHAT.route,
    },
    {
      identifier: "Validate User Chat",
      matcherPathnames: [Modules.USER.CHAT.route],
      condition: (token) =>
        token?.user?.token && token?.user?.sessionToken ? true : false,
      failedUrl: Modules.AUTH.USER_REGISTER.route,
    },
  ];

  const middlewareUtils = new MiddlewareUtils(configMiddlewares, request);
  return middlewareUtils.process();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|img).*)"],
};
