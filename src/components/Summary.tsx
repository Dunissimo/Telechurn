import { FC } from "react";
import { IDataset } from "../utils/interfaces";
import { useSummary } from "../utils/hooks/useSummary";

interface IProps {
  datasets: IDataset[];
  inline?: boolean;
}

const Summary: FC<IProps> = ({ datasets, inline }) => {
  const makeSummary = (datasets: IDataset[], inline = false) => {
    const { totalUsers, last, percentage, length } = useSummary(datasets);

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
