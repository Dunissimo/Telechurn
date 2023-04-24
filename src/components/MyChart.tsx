import { FC, useEffect, useState } from "react";
import { ChartOptions, LineController } from "chart.js";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { IData, IDataset, IStatus } from "../utils/interfaces";
import { useColor } from "../utils/hooks/useColor";
import { Spinner } from "react-bootstrap";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  ChartDataLabels,
  Title,
  Tooltip,
  Legend
);

interface IProps {
  data: IDataset[][];
  status: IStatus;
}

const MyChart: FC<IProps> = ({ data, status }) => {
  const { isSuccess, isFetching } = status;
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

  const colors = percentages.map((_, index) => {
    return useColor(100).randomColor;
  });

  const labels = percentages.map((_, index) => {
    return index + 1;
  });

  const options: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        align: "left",
        anchor: "start",
        clamp: true,
        color: "black",
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
      borderColor: colors[index],
      backgroundColor: colors[index],
      fill: false,
      pointRadius: 0,
    })),
  };

  return (
    <div className="mt-4 w-full min-h-[500px] overflow-x-auto text-center">
      {isFetching ? (
        <Spinner
          className="w-[100px] h-[100px]"
          animation="border"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Chart type="line" height={100} data={chartData} options={options} />
      )}
    </div>
  );
};

export default MyChart;
