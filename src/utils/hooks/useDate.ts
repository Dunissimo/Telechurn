export const useDate = (format: string, date: string) => {
  const dateObj = new Date(date);
  const separator = format.includes("/")
    ? "/"
    : format.includes(".")
    ? "."
    : undefined;
  const options: Intl.DateTimeFormatOptions = {
    year: format.includes("YYYY") ? "numeric" : undefined,
    month: format.includes("MM") ? "2-digit" : undefined,
    day: format.includes("DD") ? "2-digit" : undefined,
    hour: format.includes("HH") ? "2-digit" : undefined,
    minute: format.includes("mm") ? "2-digit" : undefined,
    second: format.includes("ss") ? "2-digit" : undefined,
    timeZone: "UTC",
  };
  const dateString = dateObj
    .toLocaleString(undefined, options)
    .replace(/,/g, "")
    .replace(/(\d)([ap]m)/i, "$1 $2")
    .replace(/\s+/g, " ")
    .replace(/\//g, separator!)
    .replace(/\./g, separator!)
    .trim();

  return dateString;
};
