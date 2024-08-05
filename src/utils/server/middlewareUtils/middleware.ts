import { getToken, JWT } from "next-auth/jwt";
import { NextURL } from "next/dist/server/web/next-url";
import { MiddlewareUtilConfig } from "./middleware.types";
import { NextRequest, NextResponse } from "next/server";

export class MiddlewareUtils {
  private config: MiddlewareUtilConfig[];
  private token?: JWT | null;
  private request: NextRequest;
  constructor(
    config: MiddlewareUtilConfig[],
    request: NextRequest,
    token?: JWT
  ) {
    this.config = config;
    this.request = request;
    this.token = token;
  }

  /**
   * Process MiddlewareUtilConfigs By Matcher Pathname.
   *  - Redirect to failedUrl if condition false
   *  - Redirect to sucessUrl if condition true (Optional)
   * @param request
   * @param token
   * @returns
   */
  async process() {
    "use server";
    const retrivedToken = this.token || (await this.getToken(this.request));
    const nextUrl = this.request.nextUrl;

    for (const middleware of this.config) {
      const failedUrl = middleware.failedUrlWithCallback
        ? this.constructFailedUrl(middleware.failedUrl)
        : middleware.failedUrl;

      if (
        middleware.matcherCondition ||
        middleware.matcherPathnames.includes(nextUrl.pathname)
      ) {
        console.log(middleware.identifier);
        if (!middleware.condition(retrivedToken)) {
          return this.redirectTo(failedUrl, this.request);
        } else {
          if (middleware.sucessUrl) {
            console.log(middleware.sucessUrl);
            return this.redirectTo(middleware.sucessUrl, this.request);
          }
        }
      }
    }
  }

  private redirectTo(url: string, request: NextRequest) {
    return NextResponse.redirect(new URL(url, request.url));
  }

  private async getToken(request: NextRequest) {
    "use server";
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    return token;
  }

  private constructFailedUrl(baseUrl: string): string {
    const url = new URL(baseUrl, this.request.url);
    url.searchParams.append("callbackUrl", this.request.nextUrl.pathname);
    return url.pathname + url.search;
  }
}
