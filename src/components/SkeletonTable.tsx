import { FC } from "react";

const SkeletonTable: FC = () => {
  const render = () => {
    const td = new Array(9).fill(
      <td>
        <span></span>
      </td>
    );

    const tr = new Array(9).fill(<tr className="skeleton-tbody-tr">{td}</tr>);

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
        <tbody>
          {render().map((tr) => {
            console.log(tr);
            return tr;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;
