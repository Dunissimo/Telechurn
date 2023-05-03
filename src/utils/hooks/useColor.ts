import { IDataset } from "../interfaces";

export function useRandomColors(percentage: number = 50, length: number) {
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgba(${r},${g},${b}, ${percentage}%`;
  };

  return {
    randomColors: new Array(length).fill(0).map(() => getRandomColor()),
  };
}

export const useRedTone = (datasets: IDataset[][]) => {
  let colors: any[][] = [];

  for (let i = 0; i < datasets.length; i++) {
    const left = datasets[i].slice(1).map((datasets) => datasets.usersLeft);
    const total = datasets[i][0].totalUsers;

    colors[i] = left.map(
      (num) =>
        `rgba(255, 0, 0, ${Math.max(0, Math.min(0.6, 5 * (num / total)))})`
    );
  }

  return colors;
};
