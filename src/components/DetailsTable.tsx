import { FC, ReactNode } from "react";
import { useAppSelector } from "../utils/hooks/redux";
import { getData } from "../redux/slices/dataSlice";
import { IUser } from "../utils/interfaces";
import { useDate } from "../utils/hooks/useDate";
import { useDuration } from "../utils/hooks/useDurations";

interface IRenderProps {
  days: number[];
  dates: string[];
  data: IUser[][];
}

const DetailsTable: FC = () => {
  const { datasets, users } = useAppSelector(getData);

  const prepareData = () => {
    const days: number[] = [];
    const dates: string[] = [];
    let data: IUser[][] = [];

    datasets.forEach((datasets) => {
      days.push(new Date(datasets[1].date).getDay() + 1);
      dates.push(useDate("DD.MM.YYYY", datasets[1].date));
    });

    users.forEach((users) => {
      data.push(users);
    });

    return renderTable({ days: days.sort(sortDays), dates, data });
  };

  const sortDays = (a: number, b: number) => {
    if (a > b) return 1;
    else if (a < b) return -1;
    else return 0;
  };

  const renderTable = ({ days, dates, data }: IRenderProps): ReactNode => {
    return days.map((day, i) => (
      <div>
        <div className="mt-12 mb-6">
          <p className="text-xl">
            <span className="font-bold">День {day}</span>, {dates[i]}
          </p>
        </div>
        <table className="w-full">
          <thead>
            <td className="underline pb-6">Полное имя и никнейм</td>
            <td className="underline pb-6">Когда пришли</td>
            <td className="underline pb-6">Когда ушли</td>
            <td className="underline pb-6 w-1/5">Сколько были подписчиками</td>
          </thead>
          <tbody>
            {data[i].map((user) => {
              const { full_name, username, left_date, joined_date } = user;
              const name = username ? (
                <>
                  {full_name}
                  <a
                    className="underline"
                    target="_blank"
                    href="https://t.me/${username}"
                  >
                    @{username}
                  </a>
                </>
              ) : (
                full_name
              );

              const leftDate = left_date ? useDate("HH:mm", left_date) : "-";
              const duration = left_date
                ? useDuration(+new Date(left_date) - +new Date(joined_date))
                : "-";
              const joinedDate = `✅ ${useDate(
                "HH:mm DD.MM.YYYYY",
                joined_date
              )}`;

              return (
                <tr className="h-8">
                  <td className="flex max-w-[40vw] w-[20vw] truncate">
                    <span className="truncate"> {name}</span>
                  </td>
                  <td>{joinedDate}</td>
                  <td>🔻 {leftDate}</td>
                  <td>{duration}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    ));
  };

  return <div>{prepareData()}</div>;
};

export default DetailsTable;
