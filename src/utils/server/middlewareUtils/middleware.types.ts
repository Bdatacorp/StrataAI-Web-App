import { JWT } from "next-auth/jwt";

export type MiddlewareUtilConfig = {
  /**
   * Identifier
   */
  identifier: string;

  /**
   * Match Pathnames
   */
  matcherPathnames: string[];

  /**
   * If Matcher Condition true. Trigger the  it's middleware function
   *  - Optional
   */
  matcherCondition?: boolean;

  /**
   * Condition callback.
   * @param token JWT token in Next Auth
   * @returns boolean
   */
  condition: (token: JWT | null) => boolean;

  /**
   * If Condition false redirect url
   */
  failedUrl: string | null;

  /**
   * Append searchParams as ?callbackUrl=
   */
  failedUrlWithCallback?: boolean;

  /**
   * If Condition true redirect url
   *  - Optional
   */
  sucessUrl?: string;
  sucessUrlWithToken?: string;
};
