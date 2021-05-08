import Chart from "react-apexcharts";
import axios from "axios";

import {BASE_URL} from "utils/requests";
import {SaleSum} from "../types/sale"
import { useEffect, useState } from "react";

type ChartDataProps ={
  labels: string[];
  series: number[];
}

export function DonutChart(){

  const[chartData, setChartData] = useState<ChartDataProps>({ 
    series:[], labels: []
  });

  
  useEffect(() => {
    axios.get(`${BASE_URL}/sales/amount-by-seller`).then((response) => {
      const data = response.data as SaleSum[];
      const myLabels = data.map((labels) => labels.sellerName);
      const mySeries = data.map((series) => series.sum);

      setChartData({ labels: myLabels, series: mySeries });
    });
  }, [chartData]);
     
  const options = {
    legend: {
        show: true
    }
  }

  return(
    <Chart options={{...options, labels: chartData.labels}}
      series={chartData.series}
      type="donut"
      height="240"
    />
  );
}