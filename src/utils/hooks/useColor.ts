export function useColors(percentage: number = 50, length: number) {
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgba(${r},${g},${b}, ${percentage}%`;
  };

  return {
    redShades: `rgba(255, 0, 0, ${percentage}%`,
    randomColors: new Array(length).fill(0).map(() => getRandomColor()),
  };
}
