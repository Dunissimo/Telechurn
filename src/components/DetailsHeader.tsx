import { FC } from "react";
import { FormSelect } from "react-bootstrap";
import { IDataset } from "../utils/interfaces";
import { useSummary } from "../utils/hooks/useSummary";
import { useDate } from "../utils/hooks/useDate";
import { getData, setCurrentIndex } from "../redux/slices/dataSlice";
import { useAppDispatch, useAppSelector } from "../utils/hooks/redux";
import { getStatus } from "../redux/slices/statusSlice";
import ErrorBoundary from "./ErrorBoundary";

interface IProps {
  // datasets: IDataset[][];
}

const DetailsHeader: FC<IProps> = ({}) => {
  const dispatch = useAppDispatch();
  const { isFetching, isError } = useAppSelector(getStatus);
  const { datasets } = useAppSelector(getData);

  const renderOptions = () => {
    return datasets.map((datasets: IDataset[], index: number) => {
      return datasets.map((dataset, i, arr) => {
        let day = useDate("DD.MM", dataset.date);
        let { totalUsers, percentage, length, last } = useSummary(arr);

        return (
          <option value={index} key={index}>
            {day} 👥{totalUsers} → {last.totalUsers} 📉{percentage}% 🕑{length}
          </option>
        );
      });
    });
  };

  const handleChange = (value: number) => {
    dispatch(setCurrentIndex(value));
  };

  return (
    <div className="mb-4 flex flex-col md:flex-row gap-4 md:gap-0">
      <h2 className="w-full md:w-1/2 text-2xl font-bold">
        Подробные события в когорте
      </h2>

      <ErrorBoundary>
        <FormSelect
          className="w-auto bg-[#e3e9f4] text-[#394e6a] font-bold md:ms-auto"
          onChange={(e) => handleChange(+e.currentTarget.value)}
        >
          {isFetching ? (
            <option>Загрузка...</option>
          ) : (
            datasets.map((_, i) => renderOptions()[i][1])
          )}
        </FormSelect>
      </ErrorBoundary>
    </div>
  );
};

export default DetailsHeader;
