import * as Crypto from 'expo-crypto';

export const hashPassword = async (password: string) => {
  const hashedPassword = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
  return hashedPassword;
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  const inputHash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
  const passwordMatch = inputHash === hashedPassword;
  return passwordMatch;
};
