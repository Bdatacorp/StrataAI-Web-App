"use client";

import DropZone from "@/components/ui/client/dropzone/dropzone";
import { Colors } from "@/lib/config/colors";
import { closeCreateStateModel } from "@/lib/provider/features/state/state.slice";
import { RootState } from "@/lib/provider/store";
import createStateAction from "@/server/actions/state/createStateAction";
import uploadToStateAction from "@/server/actions/state/uploadToStateAction";
import Token from "@/utils/helper/token";
import { Button, Group, Modal, rem, Stepper, TextInput } from "@mantine/core";
import { FileWithPath, PDF_MIME_TYPE } from "@mantine/dropzone";
import { modals } from "@mantine/modals";
import { Dispatch, SetStateAction, useState } from "react";
import { isMobile } from "react-device-detect";
import { TbCircleX } from "react-icons/tb";
import { VscFilePdf } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function StateCreate() {
  const [active, setActive] = useState(0);
  const [nextStepLoading, setNextStepLoding] = useState(false);

  // For Manage State Name (1st Step)
  const [stateName, setStateName] = useState("");
  const [stateNameError, setStateNameError] = useState("");
  const [stateInputError, setStateInputError] = useState("");
  const [stateNameLoading, setStateNameLoading] = useState(false);
  const [stateId, setStateId] = useState();

  //For Manage Upload Files
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [uploadError, setUploadError] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);

  const dispatch = useDispatch();
  const isCreateModalOpened = useSelector(
    (state: RootState) => state.state.isCreateStateModelOpened
  );

  const nextStep = async () => {
    setNextStepLoding(true);
    if (active === 0) {
      handleStateNameSubmit();
    } else {
      handleUploadSubmit();
    }
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  // If State Name (1st Step) Set Loading, Next Step Button Loading and Call Server Action.
  const handleStateNameSubmit = async () => {
    setStateNameError("");
    setStateInputError("");

    setStateNameLoading(true);
    const res = await createStateAction(stateName, Token.getAuth());
    setStateNameLoading(false);

    if (res.zodErrors) {
      setStateInputError(res.zodErrors.name.message);
      setStateNameError(res.zodErrors.name.message);
    } else {
      if (res.status == true) {
        console.log(res);
        toast.success(res.payload.message);
        setStateId(res.payload.data.id);
        setActive(1);
      } else {
        setStateNameError(res.payload.message);
        toast.error(res.payload.message);
      }
    }

    setNextStepLoding(false);
  };

  const handleUploadSubmit = async () => {
    if (!stateId)
      return toast.error("Please create state name before the continue");

    const formData = new FormData();
    formData.append("stateId", stateId);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    setUploadLoading(true);
    const res = await uploadToStateAction(formData, Token.getAuth());
    setUploadLoading(false);

    if (res.status == true) {
      toast.success(res.payload.message);
      setActive(2);
      dispatch(closeCreateStateModel());
    } else {
      toast.error(res.payload.message);
    }

    setNextStepLoding(false);
  };

  return (
    <>
      <Modal
        opened={isCreateModalOpened}
        onClose={() => dispatch(closeCreateStateModel())}
        centered
        size="lg"
      >
        <Stepper
          active={active}
          onStepClick={setActive}
          allowNextStepsSelect={false}
          color={Colors.primary}
          iconSize={isMobile ? 35 : 40}
        >
          <Stepper.Step
            loading={stateNameLoading}
            label="First step"
            description="Create a state"
            color={stateNameError && "red"}
            icon={
              stateNameError && (
                <TbCircleX
                  style={{ width: rem(20), height: rem(20), color: "red" }}
                />
              )
            }
          >
            <StateCreateStep1
              stateName={stateName}
              stateInputError={stateInputError}
              setStateName={setStateName}
            />
          </Stepper.Step>

          <Stepper.Step
            loading={uploadLoading}
            label="Second step"
            description="Upload Documents"
          >
            <StateCreateStep2
              uploadLoading={uploadLoading}
              files={files}
              setFiles={setFiles}
            />
          </Stepper.Step>

          {/* <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed> */}
        </Stepper>

        <Group justify="center" mt="xl">
          <Button
            loading={nextStepLoading}
            color={Colors.primary}
            variant="default"
            onClick={prevStep}
          >
            Back
          </Button>
          <Button
            loading={nextStepLoading}
            color={Colors.primary}
            onClick={nextStep}
          >
            Next step
          </Button>
        </Group>
      </Modal>
    </>
  );
}

type StateCreateStep1Props = {
  stateName: string;
  stateInputError: string;
  setStateName: Dispatch<SetStateAction<string>>;
};

function StateCreateStep1({
  stateName,
  setStateName,
  stateInputError,
}: StateCreateStep1Props) {
  return (
    <>
      <TextInput
        label="State Name"
        description="Please enter the state name before the continue"
        placeholder="Ex. Victoria"
        value={stateName}
        error={stateInputError}
        onChange={(e) => setStateName(e.target.value)}
      />
    </>
  );
}

function StateCreateStep2({
  files,
  uploadLoading,
  setFiles,
}: {
  files: FileWithPath[];
  uploadLoading: boolean;
  setFiles: Dispatch<SetStateAction<FileWithPath[]>>;
}) {
  return (
    <>
      <DropZone
        loading={uploadLoading}
        title="Drag PDF here or click to select files"
        description="Attach as many files as you like, each file should not exceed 5mb"
        accept={PDF_MIME_TYPE}
        idleIcon={<VscFilePdf className="text-3xl" />}
        files={files}
        setFiles={setFiles}
      />
    </>
  );
}
