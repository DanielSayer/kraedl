import { env } from "@/env";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

export function encrypt(data: string) {
  const iv = randomBytes(16);
  const cipher = createCipheriv(
    "aes-256-gcm",
    Buffer.from(env.ENCRYPTION_KEY),
    iv,
  );
  let encryptedData = cipher.update(data, "utf-8", "hex");
  encryptedData += cipher.final("hex");

  return iv.toString("hex") + ":" + encryptedData;
}

export function decrypt(encryptedData: string) {
  const [ivHex, encryptedDataHex] = encryptedData.split(":");
  if (!ivHex || !encryptedDataHex) {
    return "";
  }
  const iv = Buffer.from(ivHex, "hex");
  const decipher = createDecipheriv(
    "aes-256-gcm",
    Buffer.from(env.ENCRYPTION_KEY),
    iv,
  );
  let decryptedData = decipher.update(encryptedDataHex, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");

  return decryptedData;
}
