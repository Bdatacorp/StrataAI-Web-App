/**
 * Delay
 *
 * Ex. await delay(5000);
 *
 * @param ms
 * @returns
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export default delay;
