import { FC, ReactNode, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useGetStatisticsQuery } from "../redux/rtk";
import { useColor } from "../utils/hooks/useColor";
import { useDate } from "../utils/hooks/useDate";
import { IData, IDataset, IUser } from "../utils/interfaces";
import Summary from "./Summary";

interface IProps {
  data: IData[] | undefined;
}

const MyTable: FC<IProps> = ({ data }) => {
  const [datasets, setDatasets] = useState<IDataset[][]>([]);
  const [users, setUsers] = useState<IUser[][]>([]);

  useEffect(() => {
    const allDatasets: IDataset[][] = [];
    const allUsers: IUser[][] = [];

    data?.forEach((data: IData) => {
      allDatasets.push(data.datasets);
      allUsers.push(data.users);
    });

    if (allDatasets.length > 0) {
      setDatasets(allDatasets);
    }

    if (allUsers.length > 0) {
      setUsers(allUsers);
    }
  }, [data]);

  const days: ReactNode[] = datasets.map((_, i) => (
    <td className="head-td" key={i + 1}>
      День {i + 1}
    </td>
  ));

  const datasetsToRender = datasets.map((datasets) =>
    datasets.slice(1).map(({ percentage, totalUsers, usersLeft }) => {
      const color = useColor(percentage).redShades;

      return (
        <td className={`bg-[${color}]`} style={{ background: color }}>
          <span>{percentage}%</span>
          <br />
          <span>
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
        <td className="text-center">
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
            <td className="head-td">Дата</td>
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
