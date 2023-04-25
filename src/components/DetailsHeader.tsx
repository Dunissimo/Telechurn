import { FC, useState } from "react";
import { FormSelect, Stack } from "react-bootstrap";
import { IDataset } from "../utils/interfaces";
import { useSummary } from "../utils/hooks/useSummary";
import { useDate } from "../utils/hooks/useDate";
import { getData } from "../redux/slices/dataSlice";
import { useAppSelector } from "../utils/hooks/redux";
import { getStatus } from "../redux/slices/statusSlice";

interface IProps {
  // datasets: IDataset[][];
}

const DetailsHeader: FC<IProps> = ({}) => {
  const { isFetching } = useAppSelector(getStatus);
  const { datasets } = useAppSelector(getData);

  const [day, setDay] = useState(17);

  const renderOptions = () => {
    return datasets.map((datasets: IDataset[], index) => {
      return datasets.map((dataset, i, arr) => {
        let day = useDate("DD.MM", dataset.date);
        let { totalUsers, percentage, length, last } = useSummary(arr);

        return (
          <option value={day.split(".")[0]} key={index}>
            {day} 👥{totalUsers} → {last.totalUsers} 📉{percentage}% 🕑{length}
          </option>
        );
      });
    });
  };

  const handleChange = (value: number) => {
    setDay(value);
  };

  return (
    <Stack direction="horizontal">
      <h2 className="w-1/2 text-2xl font-bold">Подробные события в когорте</h2>

      <FormSelect
        className="w-auto bg-[#e3e9f4] text-[#394e6a] font-bold ms-auto"
        onChange={(e) => handleChange(+e.currentTarget.value)}
      >
        {isFetching ? (
          <option>Загрузка...</option>
        ) : (
          datasets.map((_, i) => renderOptions()[i][1])
        )}
      </FormSelect>
    </Stack>
  );
};

export default DetailsHeader;
