export default function generateMessageID(prefix = "user_", length = 12) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  const token = Array.from(array, (byte) =>
    ("0" + byte.toString(16)).slice(-2)
  ).join("");

  return `${prefix}${token}`;
}
