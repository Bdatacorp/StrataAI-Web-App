import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/login/", "/admin/"],
    },
    sitemap: "https://chat.stratapages.com.au/sitemap.xml",
  };
}
