import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const encryptEmail = (email) => {
  const [username, domain] = email.split("@");
  const encryptedUsername = username
    .split("")
    .map((char, index) =>
      index < 4 || index >= username.length - 3 ? char : "*"
    )
    .join("");
  return `${encryptedUsername}@${domain}`;
};
