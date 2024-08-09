// pages/api/stream.js

import { authConfig } from "@/utils/client/helper/auth";
import ServerToken from "@/utils/server/helper/token/serverToken";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authConfig);
    try {
      const response = await fetch(
        `${process.env.BASE_API_URL}/chat/stream/${session?.user.sessionToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        }
      );

      if (response.ok && response.body) {
        res.send(response.body);
      } else {
        res.status(response.status).json({ error: "Failed to fetch stream" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
