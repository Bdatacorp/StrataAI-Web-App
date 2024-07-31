"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button, Input, TextInput } from "@mantine/core";
import { PasswordInput } from "@mantine/core";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Colors } from "@/lib/config/colors";
import { Metadata } from "next";

const LoginForm = () => {
  const router = useRouter();

  const user = {
    emailAddress: "user@gmail.com",
    password: "1234",
  };

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailAddress === user.emailAddress && password === user.password
      ? setSuccess(true)
      : setError("Incorrect info");
  };

  useEffect(() => {
    success === true ? router.push("/") : "";
  }, [success, router]);

  return (
    <div className="pt-20 lg:pt-0 lg:h-screen flex flex-col-reverse lg:flex-row gap-5 lg:gap-0">
      <div className="md:flex-[6] flex justify-center items-center">
        <Image
          alt="Strata Login Bg"
          src={"/img/login/bg1.png"}
          width={500}
          height={100}
        />
      </div>
      <div className="md:flex-[4] w-full flex justify-center items-center mr-[6%]">
        <form
          className="flex flex-col justify-center items-center w-full px-[3%]"
          onSubmit={submitHandler}
        >
          {/* LOGO */}
          <div className="mb-7">
            <Image
              src={"/img/Strata-Logo.png"}
              alt="Strata"
              width={40}
              height={10}
            />
          </div>

          {/* WELCOME */}
          <div className="flex flex-col items-center justify-center leading-6 gap-2">
            <div>
              <h1 className="text-[30px] font-[700] text-black">
                Welcome Back
              </h1>
            </div>
            <div>
              <p className="text-[14px] font-[700] text-[#09132080]">
                Please login to your account
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 mt-6 w-full">
            {/* EMAIL ADDRESS */}
            <div className="w-full">
              <TextInput
                placeholder="Email address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                error={error}
              />
            </div>

            {/* PASSWORD */}
            <div className="w-full">
              <PasswordInput
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error}
              />
            </div>

            {/* LOGIN BUTTON */}
            <div className="grid">
              <Button color={Colors.primary}>Login</Button>
            </div>
          </div>

          {/* FORGET PASSWORD */}
          <div className="mt-6 flex flex-col gap-3">
            {/* <div className="flex items-center justify-center text-center gap-2">
              <span className="text-[#09132080] text-[14px] font-[600]">
                Forget Password?
              </span>
              <Link
                href={"/"}
                className="text-[14px] font-[600] text-Accent underline hover:text-Accent/90"
              >
                Contact Us
              </Link>
            </div> */}
            <div className="flex items-center gap-1 text-[11px] text-center justify-center flex-wrap font-[600]">
              <span className="text-[#09132080]">
                By continuing, you agree to our
              </span>
              <span className="text-Accent">Terms of Service</span>
              <span className="text-[#09132080]">and</span>
              <span className="text-Accent">Privacy Policy</span>
            </div>

            {/* COPYRIGHTS */}
            <div className="flex items-center justify-center text-center">
              <span className="text-[11px] font-[600] text-[#09132080]">
                © 2024 Stratapages. All right Reserved{" "}
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
