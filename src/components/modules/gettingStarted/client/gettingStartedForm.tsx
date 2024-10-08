"use client";

import { useRouter } from "next/navigation";
import {
  GettingStartedErrors,
  GettingStartedProps,
  GettingStartedState,
} from "./types";
import { RefObject, SetStateAction, useRef, useState } from "react";
import { Button, Card, Checkbox, Select, TextInput } from "@mantine/core";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setIsNewUser } from "@/lib/provider/features/user/user.slice";
import { Modules } from "@/lib/config/modules";
import { CreateUserDto } from "@/server/app/auth/auth.types";
import { Id, toast } from "react-toastify";
import VerificationBox from "@/components/ui/client/verificationBox/verificationBox";
import Link from "next/link";

const initialFormErrors: GettingStartedErrors = {
  name: { message: "" },
  email: { message: "" },
  phone: { message: "" },
  type: { message: "" },
  stateId: { message: "" },
  acceptTerms: { message: "" },
};

const initialFormState: GettingStartedState = {
  name: "",
  email: "",
  phone: "",
  type: "",
  stateId: "",
};

enum Forms {
  USER_VALIDATION = 0,
  USER_REGISTRATION = 1,
  USER_EMAIL_VERIFICATION = 2,
}

export default function GettingStartedForm({
  UserTypesData,
  StatesData,
}: GettingStartedProps) {
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [activeForm, setActiveForm] = useState<Forms>(Forms.USER_VALIDATION);
  const acceptTermsRef = useRef<HTMLInputElement>(null);
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
      acceptTerms: acceptTermsRef.current?.checked,
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

  const handleValidateUser = async () => {
    setFormError(initialFormErrors);
    setFormLoading(true);

    const result: any = await signIn("validateUser", {
      redirect: false,
      email: formState?.email,
    });

    if (result?.error) {
      setFormLoading(false);

      if (
        result?.error.includes("zodErrors") ||
        result?.error.includes("payload")
      ) {
        const res = await JSON.parse(result.error);
        if (res && res.zodErrors) {
          return setFormError((errors) => ({ ...errors, ...res.zodErrors }));
        } else if (res?.payload?.message) {
          if (res.payload?.statusCode === 404) {
            setActiveForm(Forms.USER_REGISTRATION);
          } else {
            return toast.error(res?.payload?.message);
          }
        }
      } else {
        return toast.error("Origin is unreachable");
      }
    } else {
      dispatch(setIsNewUser(true));
      setTimeout(() => router.replace(Modules.USER.CHAT.route), 4000);
      setFormLoading(false);
    }
  };

  const FormList = [
    <UserRegistrationForm
      key={Forms.USER_REGISTRATION}
      formState={formState}
      setFormState={setFormState}
      handleValidateUser={handleValidateUser}
      StatesData={StatesData}
      UserTypesData={UserTypesData}
      formError={formError}
      formLoading={formLoading}
      hanldeOnSubmit={hanldeOnSubmit}
      acceptTermsRef={acceptTermsRef}
    />,

    <UserValidationForm
      key={Forms.USER_VALIDATION}
      formError={formError}
      formState={formState}
      formLoading={formLoading}
      handleValidateUser={handleValidateUser}
      setFormState={setFormState}
    />,
  ];

  return (
    <>
      <div className="flex flex-col gap-5 items-center mb-5">
        <Image
          src={"/img/strata-ai.png"}
          className="loaderStrataAILogo"
          alt="Strata"
          width={200}
          height={30}
        />

        {FormList.map(
          (form, index) => activeForm.toString() === form.key && form
        )}
      </div>
    </>
  );
}

function UserValidationForm({
  formError,
  formState,
  formLoading,
  handleValidateUser,
  setFormState,
}: {
  formError: GettingStartedErrors;
  formState: GettingStartedState;
  formLoading: boolean;
  handleValidateUser: () => Promise<void | Id>;
  setFormState: (value: SetStateAction<GettingStartedState>) => void;
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-center leading-6 gap-2">
        <div>
          <h1 className="text-[30px] font-[700] text-black">Welcome</h1>
        </div>
        <div>
          <p className="text-[14px] font-[700] text-[#09132080]">
            Please enter the email before continuing
          </p>
        </div>
      </div>

      <div className="w-full">
        <TextInput
          label="Email"
          name="email"
          description="Please enter your email"
          placeholder="Ex. example@gmail.com"
          error={formError?.email?.message}
          value={formState?.email}
          onChange={(e) =>
            setFormState((state) => ({
              ...state,
              email: e.target.value,
            }))
          }
        />
      </div>

      <Button
        loading={formLoading}
        onClick={handleValidateUser}
        className="bg-primary hover:bg-primary hover:opacity-90 w-full"
      >
        Continue
      </Button>
    </>
  );
}

// function UserEmailVerification({
//   formError,
//   formState,
//   formLoading,
//   handleValidateUser,
//   setFormState,
// }: {
//   formError: GettingStartedErrors;
//   formState: GettingStartedState;
//   formLoading: boolean;
//   handleValidateUser: () => Promise<void | Id>;
//   setFormState: (value: SetStateAction<GettingStartedState>) => void;
// }) {
//   return (
//     <>
//       <div className="flex flex-col items-center justify-center leading-6 gap-2">
//         <div>
//           <h1 className="text-[30px] font-[700] text-black">Welcome</h1>
//         </div>
//         <div>
//           <p className="text-[14px] font-[700] text-[#09132080]">
//             Please verify your email before continuing
//           </p>
//         </div>
//       </div>

//       <div className="w-full">
//         <VerificationBox />
//       </div>
//     </>
//   );
// }

function UserRegistrationForm({
  formError,
  formState,
  formLoading,
  setFormState,
  UserTypesData,
  StatesData,
  hanldeOnSubmit,
  acceptTermsRef,
}: {
  formError: GettingStartedErrors;
  formState: GettingStartedState;
  formLoading: boolean;
  handleValidateUser: () => Promise<void | Id>;
  setFormState: (value: SetStateAction<GettingStartedState>) => void;
  UserTypesData: string[];
  StatesData: { value: string; label: string }[];
  hanldeOnSubmit: () => Promise<void>;
  acceptTermsRef: RefObject<HTMLInputElement>;
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-center leading-6 gap-2">
        <div>
          <h1 className="text-[30px] font-[700] text-black">Welcome</h1>
        </div>
        <div>
          <p className="text-[14px] font-[700] text-[#09132080]">
            Please fill out below details before continuing
          </p>
        </div>
      </div>

      <div className="w-full">
        <TextInput
          label="Name"
          name="name"
          description="Please enter your name"
          placeholder="Ex. John Doe"
          error={formError?.name?.message}
          value={formState?.name}
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
          disabled
          error={formError?.email?.message}
          value={formState?.email}
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
          value={formState?.phone}
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
          label="User Type"
          name="type"
          description="Please let us know if you are an owner or a manager"
          placeholder="Ex. Owner"
          searchable
          data={UserTypesData}
          error={formError?.type?.message}
          value={formState?.type}
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
          description="Please select your state"
          placeholder="Ex. Victoria"
          data={StatesData}
          searchable
          error={formError?.stateId?.message}
          value={formState?.stateId}
          onChange={(value) =>
            setFormState((state) => ({
              ...state,
              stateId: value as string,
            }))
          }
        />
      </div>

      <div className="w-full">
        <Checkbox
          error={formError?.acceptTerms?.message}
          ref={acceptTermsRef}
          label={
            <div className="flex items-center gap-1 text-[11px] text-center justify-center flex-wrap font-[600]">
              <span className="text-[#09132080]">I accept</span>
              <Link
                target="_blank"
                href={Modules.GUEST.TERMS.route}
                className="text-Accent"
              >
                Terms and Conditions
              </Link>
              <span className="text-[#09132080]">and</span>
              <Link
                target="_blank"
                href={Modules.GUEST.PRIVACY.route}
                className="text-Accent"
              >
                Privacy Policy
              </Link>
            </div>
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
    </>
  );
}
