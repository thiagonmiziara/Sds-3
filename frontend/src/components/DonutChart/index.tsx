import Chart from "react-apexcharts";
import axios from "axios";

import {BASE_URL} from "utils/requests";
import {SaleSum} from "../types/sale"

type ChartDataProps ={
  labels: string[];
  series: number[];
}

export function DonutChart(){

  let chatData: ChartDataProps ={labels:[],series:[]};

 
    axios.get(`${BASE_URL}/sales/amount-by-seller`)
    .then(response => {
      const data = response.data as SaleSum[];
      const myLabels = data.map(labels => labels.sellerName);
      const mySeries = data.map(series => series.sum);

      chatData={labels: myLabels, series: mySeries}
      console.log(chatData);
    });
 
        
  // const mockData = {
  //   series: [477138, 499928, 444867, 220426, 473088],
  //   labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
  // }
  
  const options = {
    legend: {
        show: true
    }
  }


  return(
    <Chart options={{...options, labels: chatData.labels}}
      series={chatData.series}
      type="donut"
      height="240"
    />
  );
}