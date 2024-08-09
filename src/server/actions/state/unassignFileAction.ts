"use server";
import statesController from "@/server/app/state/state.controller";

export default async function unassignFileAction(
  fileIds: string[],
  stateId: string
) {
  const deleted = await statesController.unAssignFiles(fileIds, stateId);
  return deleted;
}
