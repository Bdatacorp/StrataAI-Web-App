export default function extractSourceNumber(text: string): number | null {
  const extr = text.split(":");
  const page = extr[0].replace("【", "");
  return page ? parseInt(page, 10) : null;
}

export function extractSource(text: string): string | null {
  const extr = text.split("†");
  const page = extr[0].replace("【", "");
  return page ? page : null;
}
