export const getHeaderValue = (
  headers: { name?: string | null; value?: string | null }[] | null | undefined,
  name: string
) => {
  const found = headers?.find((h) => h.name === name);
  return found?.value || undefined;
};
