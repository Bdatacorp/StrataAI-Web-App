"use client";

import { useRouter } from "next/navigation";
import {
  GettingStartedErrors,
  GettingStartedProps,
  GettingStartedState,
} from "./types";
import { useState } from "react";
import { Button, Card, Select, TextInput } from "@mantine/core";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setIsNewUser } from "@/lib/provider/features/user/user.slice";
import { Modules } from "@/lib/config/modules";
import { CreateUserDto } from "@/server/app/auth/auth.types";
import { toast } from "react-toastify";

const initialFormErrors: GettingStartedErrors = {
  name: { message: "" },
  email: { message: "" },
  phone: { message: "" },
  type: { message: "" },
  stateId: { message: "" },
};

const initialFormState: GettingStartedState = {
  name: "",
  email: "",
  phone: "",
  type: "",
  stateId: "",
};

export default function GettingStartedForm({
  UserTypesData,
  StatesData,
}: GettingStartedProps) {
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [formSucessLoading, setFormSucessLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  // Form Control
  const [formState, setFormState] =
    useState<GettingStartedState>(initialFormState);
  const [formError, setFormError] =
    useState<GettingStartedErrors>(initialFormErrors);

  const hanldeOnSubmit = async () => {
    setFormError(initialFormErrors);
    setFormLoading(true);

    const result: any = await signIn("register", {
      redirect: false,
      name: formState?.name,
      email: formState?.email,
      phone: formState?.phone,
      type: formState?.type,
      stateId: formState?.stateId,
    });

    if (result?.error) {
      setFormLoading(false);
      const res = await JSON.parse(result.error);
      if (res && res.zodErrors) {
        setFormError((errors) => ({ ...errors, ...res.zodErrors }));
      } else if (res?.payload?.message) {
        toast.error(res?.payload?.message);
      } else {
        toast.error("Origin is unreachable");
      }
    } else {
      dispatch(setIsNewUser(true));
      setTimeout(() => router.replace(Modules.USER.CHAT.route), 4000);
      setFormLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5 items-center">
        <Image
          src={"/img/strata-ai.png"}
          className="loaderStrataAILogo"
          alt="Strata"
          width={200}
          height={30}
        />

        <div className="flex flex-col items-center justify-center leading-6 gap-2">
          <div>
            <h1 className="text-[30px] font-[700] text-black">Welcome</h1>
          </div>
          <div>
            <p className="text-[14px] font-[700] text-[#09132080]">
              Please fillout below details before the continue
            </p>
          </div>
        </div>

        <div className="w-full">
          <TextInput
            label="Name"
            name="name"
            description="Please enter your name"
            placeholder="Ex. Dilshan"
            error={formError?.name?.message}
            onChange={(e) =>
              setFormState((state) => ({
                ...state,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div className="w-full">
          <TextInput
            label="Email"
            name="email"
            description="Please enter your email"
            placeholder="Ex. example@gmail.com"
            error={formError?.email?.message}
            onChange={(e) =>
              setFormState((state) => ({
                ...state,
                email: e.target.value,
              }))
            }
          />
        </div>
        <div className="w-full">
          <TextInput
            label="Phone"
            name="phone"
            description="Please enter your Mobile Number"
            placeholder="Ex. +61 412 345 678."
            error={formError?.phone?.message}
            onChange={(e) =>
              setFormState((state) => ({
                ...state,
                phone: e.target.value,
              }))
            }
          />
        </div>
        <div className="w-full">
          <Select
            label="About User"
            name="type"
            description="Please select your type"
            placeholder="Ex. Owner"
            searchable
            data={UserTypesData}
            error={formError?.type?.message}
            onChange={(value) =>
              setFormState((state) => ({
                ...state,
                type: value as string,
              }))
            }
          />
        </div>
        <div className="w-full">
          <Select
            label="State"
            name="state"
            description="Please enter state"
            placeholder="Ex. Victoria"
            data={StatesData}
            searchable
            error={formError?.stateId?.message}
            onChange={(value) =>
              setFormState((state) => ({
                ...state,
                stateId: value as string,
              }))
            }
          />
        </div>
        <Button
          loading={formLoading}
          onClick={hanldeOnSubmit}
          className="bg-primary hover:bg-primary hover:opacity-90 w-full"
        >
          Continue
        </Button>
      </div>
    </>
  );
}
