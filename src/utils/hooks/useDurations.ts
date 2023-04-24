export function useDuration(duration: number) {
  const days = Math.floor(duration / 86400000);
  const hours = Math.floor((duration % 86400000) / 3600000);
  const minutes = Math.floor((duration % 3600000) / 60000);

  let result = "";
  if (days > 0) {
    result += `${days}д. `;
  }
  if (hours > 0) {
    result += `${hours}ч. `;
  }
  if (minutes > 0) {
    result += `${minutes}м. `;
  }
  if (result.length === 0) {
    result = "-";
  } else {
    result = `🕒 ${result}`;
  }

  return result.trim();
}
