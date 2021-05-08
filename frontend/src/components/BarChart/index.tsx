import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

import { BASE_URL } from "utils/requests";
import { SaleSuccess } from "components/types/sale";
import { round } from "../../utils/format";

type SeriesDataProps = {
  name: string;
  data: number[];
};

type ChartDataProps = {
  labels: {
    categories: string[];
  };
  series: SeriesDataProps[];
};

export function BarChart() {
  const [chartData, setChartData] = useState<ChartDataProps>({
    labels: {
      categories: [],
    },
    series: [
      {
        name: "",
        data: [],
      },
    ],
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/sales/success-by-seller`).then((response) => {
      const data = response.data as SaleSuccess[];
      const myLabels = data.map((labels) => labels.sellerName);
      const mySeries = data.map((series) =>
        round((100.0 * series.deals) / series.visited, 1)
      );

      setChartData({
        labels: {
          categories: myLabels,
        },
        series: [
          {
            name: "% Success",
            data: mySeries,
          },
        ],
      });
    });
  }, [chartData]);

  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
  };

  return (
    <Chart
      options={{ ...options, xaxis: chartData.labels }}
      series={chartData.series}
      type="bar"
      height="240"
    />
  );
}
