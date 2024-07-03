import revalidateCache from "../actions/revalidateCache";
import CacheTags from "../config/cacheTags";
import ResponceStatus from "../config/responseStatus";

export default async function responseProcess(
  res: any,
  key: string,
  tag: string | string[],
  action?: string
) {
  if (res?.status) {
    await revalidateCache(tag);
    return ResponceStatus.success(key, action);
  } else if (res?.status === false && res?.message) {
    return res;
  } else {
    //if uncontrolled error
    return ResponceStatus.failed(key, action);
  }
}
