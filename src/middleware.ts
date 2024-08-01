import { withAuth } from "next-auth/middleware";
import { UserRoles } from "./server/app/auth/auth.types";

export const config = {
  matcher: ["/admin/:path*"],
};

export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.user.role === UserRoles.ADMIN,
  },
});
