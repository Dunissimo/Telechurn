import { FC, ReactNode, useEffect } from "react";
import { useColors } from "../utils/hooks/useColor";
import { useDate } from "../utils/hooks/useDate";
import Summary from "./Summary";
import { getData } from "../redux/slices/dataSlice";
import { useAppDispatch, useAppSelector } from "../utils/hooks/redux";
import { setColors } from "../redux/slices/colorsSlice";

interface IProps {
  // datasets: IDataset[][];
}

const MyTable: FC<IProps> = ({}) => {
  const dispatch = useAppDispatch();
  const { datasets } = useAppSelector(getData);
  const colors = useColors(60, datasets.length).randomColors;

  // Add the colors to Redux so that the schedule lines are the same color that the cells
  useEffect(() => {
    dispatch(setColors(colors));
  }, [colors]);

  const days: ReactNode[] = datasets.map((_, i) => (
    <td className="head-td" key={i + 1}>
      {`День ${i + 1}`}
    </td>
  ));

  const datasetsToRender = datasets.map((datasets) =>
    datasets.slice(1).map(({ percentage, totalUsers, usersLeft }) => {
      const color = useColors(percentage, 0).redShades;

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
    const randomColor = colors[idx];

    return (
      <tr key={idx} className="t-body-rows">
        <td
          className={`font-bold text-[#394e6a] p-3 text-center bg-[${randomColor}]`}
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
