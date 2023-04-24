import { IDataset } from "../interfaces";

export const useSummary = (datasets: IDataset[]) => {
  const totalUsers = datasets[0].totalUsers;
  const last = datasets.slice(-1)[0];
  const length = datasets.length - 1;
  const percentage = last.percentage;
  const day = datasets[1].date;

  return {
    totalUsers,
    last,
    length,
    percentage,
    day,
  };
};
