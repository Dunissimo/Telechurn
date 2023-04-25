import { FC, ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "../utils/hooks/redux";
import { getData } from "../redux/slices/dataSlice";
import { IUser } from "../utils/interfaces";
import { useDate } from "../utils/hooks/useDate";
import { useDuration } from "../utils/hooks/useDurations";
import { addListener } from "@reduxjs/toolkit";

const DetailsTable: FC = () => {
  const { datasets, users } = useAppSelector(getData);
  const [isFull, setIsFull] = useState(false);
  const [stateDay, setDay] = useState<number[]>([0]);
  const [arr, setArr] = useState<ReactNode[]>([]);

  const renderTable = (): ReactNode[] => {
    const days: number[] = [];
    const dates: string[] = [];

    datasets.forEach((datasets, i) => {
      days.push(i + 1);
      dates.push(useDate("DD.MM.YYYY", datasets[1].date));
    });

    if (users.length < 1) return [<h1 key={"123333"}>ERROR</h1>];

    return days.map((day, i) => (
      <div key={i + "123"}>
        <div className="mt-12 mb-6">
          <p className="text-xl">
            <span className="font-bold">День {day}</span>, {dates[i]}
          </p>
        </div>
        <table className="w-full text-lg">
          <thead>
            <tr>
              <td className="underline pb-6">Полное имя и никнейм</td>
              <td className="underline pb-6">Когда пришли</td>
              <td className="underline pb-6">Когда ушли</td>
              <td className="underline pb-6 w-1/5">
                Сколько были подписчиками
              </td>
            </tr>
          </thead>
          <tbody>
            {users[i].slice(0, isFull ? Infinity : 15).map((user) => {
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
                <tr key={Math.random() * 1000} className="h-8">
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

  useEffect(() => {
    setArr(renderTable());
  }, [users, datasets, isFull]);

  const a = stateDay.at(-1)! + 1 >= datasets.length;
  return (
    <div className="flex flex-col">
      {stateDay.map((day) => arr[day])}
      <button
        disabled={a}
        className="button"
        onClick={() => {
          if (!isFull) {
            setIsFull(true);
            return;
          }

          setDay((state) => {
            if (a) return state;

            return [...state, state.at(-1)! + 1];
          });
        }}
      >
        {a ? "На этом все" : "Показать еще"}
      </button>
    </div>
  );
};

export default DetailsTable;
