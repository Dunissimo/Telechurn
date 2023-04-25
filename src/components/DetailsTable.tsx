import { FC, ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "../utils/hooks/redux";
import { getCurrentIndex, getData } from "../redux/slices/dataSlice";
import { useDate } from "../utils/hooks/useDate";
import { useDuration } from "../utils/hooks/useDurations";
import { IDataset, IUser } from "../utils/interfaces";

function getDayFromDate(
  datasets: IDataset[][],
  currentIndex: number | undefined,
  dateString: string
) {
  // create Date objects from the input strings
  const dateParts = dateString.split("/");
  const dateObject = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
  const startingDay = datasets[currentIndex ? currentIndex : 0][1].date;
  const startingDayObject = new Date(startingDay);

  // calculate the difference in days between the two dates
  const oneDay = 24 * 60 * 60 * 1000; // number of milliseconds in a day
  const diffDays = Math.round(
    Math.abs((dateObject.getTime() - startingDayObject.getTime()) / oneDay)
  );

  return `День ${diffDays + 1}`;
}

const createRow = (user: IUser) => {
  const { full_name, username, joined_date, left_date } = user;
  const name = username ? (
    <>
      {full_name}{" "}
      <a
        className="underline"
        target="_blank"
        href={`https://t.me/${username}`}
      >
        @{username}
      </a>
    </>
  ) : (
    full_name
  );

  return (
    <tr>
      <td className="h-8 w-[50vw] truncate">{name}</td>
      <td className="h-8">✅ {useDate("HH:mm DD.MM.YYYY", joined_date)}</td>
      <td className="h-8">
        {left_date ? `🔻 ${useDate("HH:mm", left_date)}` : "-"}
      </td>
      <td className="h-8 w-[20vw]">
        {left_date
          ? useDuration(+new Date(left_date) - +new Date(joined_date))
          : "-"}
      </td>
    </tr>
  );
};

const DetailsTable: FC = () => {
  const { datasets, users } = useAppSelector(getData);
  const currentIndex = useAppSelector(getCurrentIndex);

  const [isFull, setFull] = useState(false);
  const [daysToShow, setDays] = useState<number[]>([0]);

  const days: any[] = [];
  const headerDays: any[] = [];
  const currentUsers = users[currentIndex!];
  const datesSet: Set<string> = new Set();

  currentUsers.forEach((user) => {
    if (user.left_date) {
      const dateString = useDate("DD/MM/YYYY", user.left_date);

      if (!datesSet.has(dateString)) {
        datesSet.add(dateString);
      }
    }
  });

  const uniqueDates = Array.from(datesSet).sort((a, b) => {
    const dateA = new Date(a.split("/").reverse().join("-")).getTime();
    const dateB = new Date(b.split("/").reverse().join("-")).getTime();
    return dateA - dateB;
  });

  uniqueDates.forEach((date) => {
    const rows: any[] = [];

    headerDays.push(getDayFromDate(datasets, currentIndex, date));

    currentUsers
      .filter(
        (user) =>
          useDate("DD/MM/YYYY", user.left_date ? user.left_date : "-") === date
      )
      .forEach((user) => {
        rows.push(createRow(user));
      });

    days.push({ date, rows });
  });

  currentUsers
    .filter((user) => user.left_date == null)
    .forEach((user) => {
      days[0].rows.push(createRow(user));
    });

  const isMore = daysToShow.at(-1)! + 1 >= datasets.length;

  const handleClick = () => {
    if (!isFull) {
      setFull(true);
      return;
    }

    setDays((state) => {
      if (isMore) return state;

      return [...state, state.at(-1)! + 1];
    });
  };

  // TODO: optimize it, remove re-renders!

  return (
    <div className="text-lg flex flex-col">
      {days.map((day: { date: string; rows: ReactNode[] }, i) => {
        return (
          <table className="w-full mt-12">
            <thead>
              <tr>
                <td className="pb-12">
                  <b>{headerDays[i]},</b>
                  {day.date}
                </td>
                <td className="underline pb-12">Когда пришли</td>
                <td className="underline pb-12">Когда ушли</td>
                <td className="underline pb-12">Сколько были подписчиками</td>
              </tr>
            </thead>
            <tbody>{day.rows}</tbody>
          </table>
        );
      })}

      <button className="button" onClick={handleClick} disabled={isMore}>
        {isMore ? "Больше нет данных" : "Показать еще"}
      </button>
    </div>
  );
};

export default DetailsTable;
