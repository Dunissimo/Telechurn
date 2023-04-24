import { FC } from "react";
import { IDataset, IUser } from "../utils/interfaces";

interface IProps {
  data: {
    datasets: IDataset[][];
    users: IUser[][];
  };
}

const checkNum = (num: number) => {
  if (num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
};

const MyDetails: FC<IProps> = ({ data }) => {
  const render = (day: number) => {
    return data.users[0].map((user) => {
      const { full_name, username, left_date, joined_date } = user;

      let leftDate: string | Date = "-";
      const joinedDate = `✅ ${new Date(joined_date).toLocaleString()}`;

      if (left_date) {
        // console.log(left_date);

        leftDate = `🔻 ${new Date(left_date).toLocaleString()}`;
      }

      return (
        <tr className="">
          <td className="h-8 max-w-[40vw] w-[40%] truncate">
            <span className="font-[600] italic"> {full_name} </span>
            <a className="underline" href={`https://t.me/${username}`}>
              @{username}
            </a>
          </td>
          <td className="h-8">{joinedDate}</td>
          <td className="h-8">{leftDate}</td>
          <td className="h-8">-</td>
        </tr>
      );
    });
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl">
        <span className="font-bold">День 1</span>, 17.04.2023
      </h3>
      <table className="w-full">
        <thead>
          <td className="underline py-4"></td>
          <td className="underline py-4">Когда пришли</td>
          <td className="underline py-4">Когда ушли</td>
          <td className="underline py-4">Сколько были подписчиками</td>
        </thead>
        <tbody>
          {data.users.map((users: IUser[], index) => {
            return render(index);
          })}
        </tbody>
      </table>
    </div>
  );
};

// TODO: спросить про пагинацию. Должна ли она быть или хватит только ui пагинации.

export default MyDetails;
