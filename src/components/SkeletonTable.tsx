import { FC } from "react";

const SkeletonTable: FC = () => {
  const render = () => {
    const td = [];

    for (let i = 0; i < 9; i++) {
      td.push(
        <td key={Math.ceil(Math.random() * 10000)}>
          <span></span>
        </td>
      );
    }

    const tr = [];

    for (let i = 0; i < 9; i++) {
      tr.push(
        <tr
          key={Math.ceil(Math.random() * 10000)}
          className="skeleton-tbody-tr"
        >
          {td}
        </tr>
      );
    }

    return tr;
  };

  return (
    <div>
      <table className="skeleton-table w-full mt-4">
        <thead>
          <tr>
            <td className="head-td">Дата</td>
            <td className="head-td">Сводка</td>
            <td className="head-td">День 1</td>
            <td className="head-td">День 2</td>
            <td className="head-td">День 3</td>
            <td className="head-td">День 4</td>
            <td className="head-td">День 5</td>
            <td className="head-td">День 6</td>
            <td className="head-td">День 7</td>
          </tr>
        </thead>
        <tbody>{render()}</tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;
