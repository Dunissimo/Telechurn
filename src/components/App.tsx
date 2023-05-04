import { FC, useEffect, useState } from "react";

import { Stack, FormSelect, Alert } from "react-bootstrap";
import { useGetStatisticsQuery } from "../redux/rtk";
import { IData } from "../utils/interfaces";
import MyChart from "./MyChart";
import MyTable from "./MyTable";
import SkeletonTable from "./SkeletonTable";

import DetailsHeader from "./DetailsHeader";
import { useAppDispatch, useAppSelector } from "../utils/hooks/redux";
import { getStatus, setStatus } from "../redux/slices/statusSlice";
import { setData } from "../redux/slices/dataSlice";
import DetailsTable from "./DetailsTable";
import Footer from "./Footer";
import ErrorBoundary from "./ErrorBoundary";
import MyTooltip from "./MyTooltip";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { isError, isFetching } = useAppSelector(getStatus);
  const [interval, setInterval] = useState(7);

  const {
    data,
    isSuccess: apiSuccess,
    isError: apiError,
    isFetching: apiFetching,
  } = useGetStatisticsQuery({
    channelId: "aaeb08bd-a5e5-4425-98af-fd53b45f3b0a",
    interval,
  });

  useEffect(() => {
    dispatch(
      setStatus({
        isFetching: apiFetching,
        isError: apiError,
        isSuccess: apiSuccess,
      })
    );
  }, [apiSuccess, apiError, apiFetching]);

  const formatData = (data: IData[] | undefined) => {
    if (!data || data.length === 0) {
      return { datasets: [], users: [] };
    }

    const datasets = data.map((data) => data.datasets);
    const users = data.map((data) => data.users);

    return { datasets, users };
  };

  useEffect(() => {
    const { datasets, users } = formatData(data);

    dispatch(setData({ datasets, users }));
  }, [data]);

  const handleChange = (value: number) => {
    setInterval(value);
  };

  return (
    <section className="App font-sans">
      <Stack className="px-3 md:px-auto md:mx-auto md:container">
        {/* <div className="mt-4 flex flex-col md:flex-row"> */}
        <MyTooltip header="Отток по времени" className="md:w-1/2">
          <p className="pb-2">
            Подходит для тех, у кого не накладываются рекламные активности, а
            пользователи приходят с внешних источников и не отслеживаются
            пригласительными ссылками.
          </p>
          <p className="pb-2">
            Для анализа определяется группа пользователей (когорта) по интервалу
            времени (день или больше), и анализируется их движение по дням.
          </p>
          <p>
            Здоровый подписчик будет читать ваш канал долго, без резких
            движений. Короткий жизненный цикл и массовые движения – признак
            некачественной аудитории (боты, накрутки).
          </p>
        </MyTooltip>
        <div className="flex md:justify-end">
          <FormSelect
            className="md:w-auto self-end bg-[#e3e9f4] text-[#394e6a] font-bold md:ms-auto h-[52px] pr-10"
            style={{ backgroundSize: "35px 18px" }}
            onChange={(e) => handleChange(+e.currentTarget.value)}
          >
            <option value={7}>За последнюю неделю</option>
            <option value={14}>За последние 2 недели</option>
            <option value={21}>За последние 3 недели</option>
          </FormSelect>
        </div>
        {/* </div> */}

        <Stack className="mb-12 text-sm md:text-base">
          <MyTooltip header="Таблицей">
            <p className="pb-2">
              <span className="font-bold">Дата</span> – это когорта,
              пользователи, пришедшие за день.
            </p>
            <p className="pb-2">
              <span className="font-bold">Сводка:</span>
              <br />
              👥 пользователей пришло в первый день → в последний день,
              <br />
              📉 суммарный отток,
              <br />
              🕒 сколько дней прошло с первого дня когорты.
            </p>
            <p>
              <span className="font-bold">Ячейки по дням:</span>
              <br />
              % – отток относительно предыдущего дня (не первого). <br />
              Первая цифра во второй строке – количество пользователей. <br />
              Вторая цифра – количество ушедших пользователей. <br />
              Чем ярче 🟥 красный цвет – тем больше ушло подписчиков в этот
              период.
            </p>
          </MyTooltip>

          <ErrorBoundary
            temp={
              <Alert key="danger" variant="danger">
                При загрузке данных что-то пошло не так
              </Alert>
            }
          >
            {isFetching ? <SkeletonTable /> : <MyTable />}
          </ErrorBoundary>
        </Stack>

        <Stack className="mb-12">
          <MyTooltip header="Графиком">
            <p className="pb-2">
              На графике показан отток подписчиков в когортах по дням. Для
              наглядного сравнения количество подписчиков переведено в проценты.
            </p>
            <p className="pb-2">
              🧠 Чем более горизонтальный график без резких падений вниз, тем
              качественнее аудитория. Чем быстрее падает график вниз – тем хуже
              аудитория, слив бюджета.
            </p>
            <p className="pb-2">
              Значение в прямоугольнике – общий отток в когорте.
            </p>
            <p className="pb-2">→ По горизонтали – дни жизни когорты.</p>
            <p className="pb-2">
              ↑ По вертикали сверху – относительное количество подписчиков.
            </p>
          </MyTooltip>

          <ErrorBoundary
            temp={
              <Alert key="danger" variant="danger">
                При загрузке данных что-то пошло не так
              </Alert>
            }
          >
            <MyChart />
          </ErrorBoundary>
        </Stack>

        <Stack className="mb-12">
          <DetailsHeader />
          <ErrorBoundary
            temp={
              <Alert key="danger" variant="danger">
                При загрузке данных что-то пошло не так
              </Alert>
            }
          >
            {isFetching ? <SkeletonTable withHead={false} /> : <DetailsTable />}
          </ErrorBoundary>
        </Stack>
      </Stack>

      <Footer />
    </section>
  );
};

export default App;
