"use client";

import { Routes } from "@/lib/config/routes";
import deleteThread from "@/server/actions/openapi/deleteThread";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatClearPage() {
  const [elements, setElements] = useState("Loading...");
  const router = useRouter();

  async function clearUserSession() {
    const token = localStorage.getItem("session_id");

    if (!token) {
      return setElements("Couldn't Found Token");
    }

    setElements(`Deleting... Token : ${token}`);

    const res = await deleteThread(token);

    if (res) {
      setElements("Deleted Successfully");
      localStorage.removeItem("session_id");
      router.push(Routes.CHAT);
    } else {
      setElements("Error");
    }
  }

  useEffect(() => {
    clearUserSession();
  }, []);

  return elements;
}
