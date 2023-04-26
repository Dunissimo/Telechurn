import { FC, ReactNode, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useGetStatisticsQuery } from "../redux/rtk";
import { useColor } from "../utils/hooks/useColor";
import { useDate } from "../utils/hooks/useDate";
import { IData, IDataset, IUser } from "../utils/interfaces";
import Summary from "./Summary";
import { getData } from "../redux/slices/dataSlice";
import { useAppSelector } from "../utils/hooks/redux";

interface IProps {
  // datasets: IDataset[][];
}

const MyTable: FC<IProps> = ({}) => {
  const { datasets } = useAppSelector(getData);

  const days: ReactNode[] = datasets.map((_, i) => (
    <td className="head-td" key={i + 1}>
      {`День ${i + 1}`}
    </td>
  ));

  const datasetsToRender = datasets.map((datasets) =>
    datasets.slice(1).map(({ percentage, totalUsers, usersLeft }) => {
      const color = useColor(percentage).redShades;

      return (
        <td
          className={`bg-[${color}] text-left pl-4`}
          style={{ background: color }}
        >
          <span className="text-2xl">{percentage}%</span>
          <br />
          <span className="text-base opacity-75 whitespace-nowrap pr-2">
            {totalUsers}, -{usersLeft}
          </span>
        </td>
      );
    })
  );

  const tBodyRows = datasets.map((datasets, idx) => {
    const date = useDate("DD.MM", datasets[1].date);
    const randomColor = useColor(60).randomColor;

    return (
      <tr key={idx} className="t-body-rows">
        <td
          className={`font-bold text-[#394e6a] p-4 text-center bg-[${randomColor}]`}
          style={{ background: randomColor }}
        >
          {date}
        </td>
        <td className="text-left pl-4">
          <Summary datasets={datasets} />
        </td>
        {...datasetsToRender[idx]}
      </tr>
    );
  });

  return (
    <div className="overflow-x-auto">
      <table className="main-table w-full mt-4">
        <thead>
          <tr>
            <td className="head-td text-center">Дата</td>
            <td className="head-td">Сводка</td>
            {days}
          </tr>
        </thead>
        <tbody>{tBodyRows}</tbody>
      </table>
    </div>
  );
};

export default MyTable;
