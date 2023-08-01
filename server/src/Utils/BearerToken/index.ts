export const BearerTokenFinder = (header?: string) => {
  if (!header) return null;
  const token = header.split("Bearer")[1].trim();
  return token;
};
