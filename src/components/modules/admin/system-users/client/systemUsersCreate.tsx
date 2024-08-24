"use client";

import { Colors } from "@/lib/config/colors";
import { closeCreateSystemUserModel } from "@/lib/provider/features/ui/ui.slice";
import { RootState } from "@/lib/provider/store";
import createAdminAction from "@/server/actions/user/createAdminAction";
import {
  Button,
  LoadingOverlay,
  Modal,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdClose, MdOutlineAdminPanelSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

type FormState = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

type FormErros = {
  name: { message: string };
  email: { message: string };
  phone: { message: string };
  password: { message: string };
};

const initialFormErrors = {
  name: { message: "" },
  email: { message: "" },
  phone: { message: "" },
  password: { message: "" },
};

export default function SystemUsersCreate() {
  const isCreateSystemUserModelOpened = useSelector(
    (state: RootState) => state.ui.isCreateSystemUserModelOpened
  );
  const [inputValues, setInputValues] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [inputErrors, setInputErrors] = useState<FormErros>(initialFormErrors);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setInputErrors(initialFormErrors);
    setLoading(true);

    const res = await createAdminAction({
      name: inputValues.name,
      email: inputValues.email,
      phone: inputValues.phone,
      password: inputValues.password,
    });

    if ("zodErrors" in res) {
      setInputErrors((inputErrors) => ({ ...inputErrors, ...res.zodErrors }));
    } else {
      if ("status" in res) {
        if (res.status === true) {
          toast.success(res.payload.message);
          dispatch(closeCreateSystemUserModel());
        } else {
          toast.error(res.payload.message);
        }
      } else {
        toast.error("Something went wrong");
      }
    }

    return setLoading(false);
  };

  return (
    <>
      <Modal
        opened={isCreateSystemUserModelOpened}
        onClose={() => dispatch(closeCreateSystemUserModel())}
        centered
        size="lg"
        title={
          <div className="flex gap-5">
            <MdOutlineAdminPanelSettings />
            Create System User
          </div>
        }
      >
        <div className="w-full flex flex-col gap-5 relative">
          <LoadingOverlay
            visible={loading}
            loaderProps={{ color: Colors.primary }}
          />

          <div className="w-full flex flex-col gap-3">
            <TextInput
              label="User Name"
              description={"Please enter user name"}
              autoComplete="name"
              value={inputValues.name}
              error={inputErrors.name.message}
              onChange={(e) => {
                setInputValues((inputValues) => ({
                  ...inputValues,
                  name: e.target.value,
                }));
              }}
            />
            <TextInput
              label="User Email"
              description={"Please enter user email"}
              autoComplete="email"
              value={inputValues.email}
              error={inputErrors.email.message}
              onChange={(e) => {
                setInputValues((inputValues) => ({
                  ...inputValues,
                  email: e.target.value,
                }));
              }}
            />
            <TextInput
              label="User Phone"
              description={"Please enter user phone"}
              autoComplete="phone"
              placeholder="Ex. +61 412 345 678."
              value={inputValues.phone}
              error={inputErrors.phone.message}
              onChange={(e) => {
                setInputValues((inputValues) => ({
                  ...inputValues,
                  phone: e.target.value,
                }));
              }}
            />
            <PasswordInput
              label="User Password"
              description={"Please enter user password"}
              value={inputValues.password}
              error={inputErrors.password.message}
              onChange={(e) => {
                setInputValues((inputValues) => ({
                  ...inputValues,
                  password: e.target.value,
                }));
              }}
            />
          </div>
          <div className="w-full grid grid-cols-2 gap-2">
            <Button
              variant="light"
              color="red"
              onClick={() => dispatch(closeCreateSystemUserModel())}
              rightSection={<IoMdCloseCircleOutline />}
            >
              Close
            </Button>
            <Button
              variant="light"
              color="yellow"
              rightSection={<MdOutlineAdminPanelSettings />}
              onClick={() => handleSubmit()}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
