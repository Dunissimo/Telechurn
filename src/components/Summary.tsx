import { FC } from "react";
import { IDataset } from "../utils/interfaces";

interface IProps {
  datasets: IDataset[];
  inline?: boolean;
}

const Summary: FC<IProps> = ({ datasets, inline }) => {
  const makeSummary = (datasets: IDataset[], inline = false) => {
    const totalUsers = datasets[0].totalUsers;
    const last = datasets.slice(-1)[0];
    const length = datasets.length - 1;
    const percentage = last.percentage;

    return (
      <>
        <span>
          👥{totalUsers}→{last.totalUsers}
        </span>
        {inline ? " " : <br />}
        <span>
          📉{percentage}% 🕑{length}
        </span>
      </>
    );
  };

  return makeSummary(datasets, inline);
};

export default Summary;
