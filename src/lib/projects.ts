export const getFormattedName = (name: string) => {
  return name.replace(/\s+/g, "-").toLowerCase();
};
