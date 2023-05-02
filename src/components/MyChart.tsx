import { FC, useEffect, useState } from "react";
import { ChartOptions, LineController } from "chart.js";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { IDataset } from "../utils/interfaces";
import { Spinner } from "react-bootstrap";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getStatus } from "../redux/slices/statusSlice";
import { useAppSelector } from "../utils/hooks/redux";
import { getData } from "../redux/slices/dataSlice";
import { getColors } from "../redux/slices/colorsSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  ChartDataLabels,
  Title,
  Tooltip
);

interface IProps {
  // data: IDataset[][];
}

const MyChart: FC<IProps> = ({}) => {
  const { datasets: data } = useAppSelector(getData);
  const COLORS = useAppSelector(getColors);

  const { isSuccess, isFetching } = useAppSelector(getStatus);
  const [percentages, setPercentages] = useState<number[][]>([]);

  useEffect(() => {
    if (isSuccess) {
      setPercentages(
        data.map((datasets: IDataset[]) => {
          return datasets.map((dataset) => {
            return dataset.percentage;
          });
        })
      );
    }
  }, [data, isSuccess]);

  const labels = percentages.map((_, index) => {
    return index + 1;
  });

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        align: "left",
        anchor: "start",
        clamp: true,
        color: "black",
        font: { size: 16, weight: "bolder" },
        backgroundColor: function (context: any) {
          return context.dataset.borderColor;
        },
        padding: 4,
        offset: 0,
        formatter: function (value: any, context: any) {
          let index = context.dataIndex;
          let length = context.dataset.data.length;
          if (index === length - 1) {
            return value + "%";
          } else {
            return null;
          }
        },
      },
    },
  };

  const chartData: ChartData = {
    labels: [...labels, labels?.length],
    datasets: percentages.map((percentage, index) => ({
      label: `Когорта ${index + 1}`,
      data: percentage.map((percentage) => percentage),
      borderWidth: 4,
      tension: 0.4,
      borderColor: COLORS[index],
      backgroundColor: COLORS[index],
      fill: false,
      pointRadius: 0,
    })),
  };

  // TODO: refactor

  return (
    <div className={`w-full lg:w-auto flex items-center justify-center`}>
      {isFetching ? (
        <Spinner
          className="w-[100px] h-[100px]"
          animation="border"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Chart
          type="line"
          height={300}
          width={100}
          data={chartData}
          options={options}
        />
      )}
    </div>
  );
};

export default MyChart;
