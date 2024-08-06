"use client";

import PageLoading from "@/components/ui/client/loading/pageLoading";
import { Colors } from "@/lib/config/colors";
import { Modules } from "@/lib/config/modules";
import { setIsNewUser } from "@/lib/provider/features/user/user.slice";
import { RootState } from "@/lib/provider/store";
import createUserAction from "@/server/actions/user/createUserAction";
import { UserType } from "@/server/app/auth/auth.types";
import { auth } from "@/utils/client/helper/auth";
import delay from "@/utils/client/services/delay";
import {
  Button,
  LoadingOverlay,
  Modal,
  Select,
  TextInput,
} from "@mantine/core";
import { Session } from "next-auth";
import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

type InitialFormErrors = {
  [key: string]: { message: string };
};

type InitialFormState = {
  name: string;
  email: string;
  phone: string;
  type: string;
  stateId: string;
};

const initialFormErrors: InitialFormErrors = {
  name: { message: "" },
  email: { message: "" },
  phone: { message: "" },
  type: { message: "" },
  stateId: { message: "" },
};

const initialFormState: InitialFormState = {
  name: "",
  email: "",
  phone: "",
  type: "",
  stateId: "",
};

export default function GetStarted({ states }: { states: string[] }) {
  const isNewUser = useSelector((state: RootState) => state.user.isNewUser);
  const [session, setSession] = useState<Session | null>();
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [formSucessLoading, setFormSucessLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();

  // Form Control
  const [formState, setFormState] =
    useState<InitialFormState>(initialFormState);
  const [formError, setFormError] =
    useState<InitialFormErrors>(initialFormErrors);

  useEffect(() => {
    async function getSesstion() {
      const retrieved = await getSession();
      setSession(retrieved);
      if (!retrieved) {
        dispatch(setIsNewUser(true));
      }
    }

    getSesstion();
  }, [dispatch]);

  const hanldeOnSubmit = async () => {
    setFormError(initialFormErrors);
    setFormLoading(true);
    const res = await createUserAction(formState);
    console.log(res);

    setFormLoading(false);
    if (res.zodErrors) {
      setFormError(res.zodErrors);
    } else {
      if (res.status == true) {
        setFormSucessLoading(true);
        const payload = res.payload.data;
        const result: any = await signIn("register", {
          redirect: false,
          id: payload.id,
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          role: payload.role,
          type: payload.type,
          token: payload.token,
          sessionToken: payload.sessionToken,
        });
        await delay(3000);
        dispatch(setIsNewUser(false));
        setFormSucessLoading(false);
      } else {
        toast.error(res.payload.message);
      }
    }
  };

  return (
    <>
      <Modal
        opened={isNewUser}
        onClose={hanldeOnSubmit}
        size="100%"
        title={
          <Image
            width={100}
            height={35}
            src="/img/strata-ai.png"
            alt="Strata-Logo"
          />
        }
        centered
        transitionProps={{
          transition: "fade",
          duration: 200,
          timingFunction: "linear",
        }}
      >
        <div className="flex relative flex-col-reverse lg:flex-row gap-2">
          <SucessLoadingOverlay loading={formSucessLoading} />

          <div className="py-4 lg:py-0 w-full lg:w-2/5 flex justify-center items-center lg:items-start">
            <Image
              alt="chatbot"
              src="/img/chatbot.png"
              width={400}
              height={500}
            />
          </div>
          <div className="grow relative">
            <ErrorLoadingOverlay loading={formLoading} />

          </div>
        </div>
      </Modal>
    </>
  );
}

function ErrorLoadingOverlay({ loading }: { loading: boolean }) {
  return (
    <LoadingOverlay
      visible={loading}
      zIndex={1000}
      overlayProps={{ radius: "sm", blur: 2 }}
      loaderProps={{ color: Colors.primary }}
    />
  );
}

function SucessLoadingOverlay({ loading }: { loading: boolean }) {
  return (
    <LoadingOverlay
      visible={loading}
      zIndex={1000}
      overlayProps={{ radius: "sm", blur: 2 }}
      loaderProps={{ children: <PageLoading isFade /> }}
    />
  );
}
