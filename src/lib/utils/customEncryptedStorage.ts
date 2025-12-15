import CryptoJS from "crypto-js";

const SECRET_KEY = "dev_secret";

export const customEncryptedStorage = {
  setItem: (key: string, value: any) => {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      SECRET_KEY
    ).toString();
    localStorage.setItem(key, encrypted);
  },
  getItem: (key: string) => {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  },
  removeItem: (key: string) => localStorage.removeItem(key),
};
