export function useColor(percentage: number = 50) {
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgba(${r},${g},${b}, ${percentage}%`;
  };

  return {
    redShades: `rgba(255, 0, 0, ${percentage}%`,
    randomColor: getRandomColor(),
  };
}
