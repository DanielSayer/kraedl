export function formatPhoneNumber(phoneNumber: string): string {
  const trimmedInput = phoneNumber.replace(/\s/g, "");
  const length = trimmedInput.length;

  if (length === 8 && !/\s/.test(trimmedInput)) {
    return `${trimmedInput.slice(0, 4)} ${trimmedInput.slice(4)}`;
  } else if (length === 10) {
    return `${trimmedInput.slice(0, 4)} ${trimmedInput.slice(4, 7)} ${trimmedInput.slice(7)}`;
  } else {
    return `${trimmedInput.slice(0, 4)} ${trimmedInput.slice(4, 7)} ${trimmedInput.slice(7)}`;
  }
}
