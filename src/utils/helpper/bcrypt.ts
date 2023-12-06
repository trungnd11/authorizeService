import bcrypt from "bcrypt";

export const enCodeBcryt = async (password: string, saltOrRounds?: string | number) => {
  const encode = await bcrypt.hash(password, saltOrRounds ?? 12);
  return encode;
};

export const compareBcryt = async (providedPassword: string, password: string) => {
  return await bcrypt.compare(providedPassword, password);
};