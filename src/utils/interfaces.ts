export interface IData {
  users: IUser[];
  datasets: IDataset[];
}

export interface IDataset {
  date: string;
  percentage: number;
  totalUsers: number;
  usersLeft: number;
}

export interface IUser {
  joined_date: string;
  left_date: string | null;
  username: string;
  full_name: string;
}

export interface IStatus {
  isSuccess: boolean;
  isFetching: boolean;
  isError: boolean;
}
