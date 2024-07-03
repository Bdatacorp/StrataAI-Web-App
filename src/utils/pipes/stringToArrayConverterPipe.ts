export default function stringToArrayConverterPipe(input: string) {
  if (typeof input === "string") {
    // Check if the input contains a comma
    if (input.includes(",")) {
      // Split the input by commas and trim whitespace from each element
      return input.split(",").map((id) => id.trim());
    } else {
      // If no comma is found, return the input as a single-element array
      return [input.trim()];
    }
  }
  return [];
}
