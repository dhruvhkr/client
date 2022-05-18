import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";
import Header from "./Header";
import { Button } from "semantic-ui-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ chartData }) {
  const [region, setRegion] = useState(false);
  const month = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthLabels =
    chartData && chartData?.month?.value.map((item, i) => month[i]);

  const monthData = chartData?.month?.value.map((item, i) => item.total);

  const regionLabels =
    chartData && chartData?.region?.value.map((item, i) => item._id);

  const regionData = chartData?.region?.value.map((item, i) => item.total);

  const labels = region ? regionLabels : monthLabels;
  const myData = region ? regionData : monthData;

  const data = {
    labels,
    datasets: [
      {
        label: region
          ? "Policy bought in each region"
          : "Policy bought every month",
        data: myData,
        backgroundColor: "rgb(0,191,255)",
      },
    ],
  };
  return (
    <>
      <Header />
      <div
        style={{
          paddingTop: "120px",
        }}
      >
        <Button.Group floated="right">
          <Button primary onClick={() => setRegion(false)}>
            Month
          </Button>
          <Button.Or />
          <Button positive onClick={() => setRegion(true)}>
            Region
          </Button>
        </Button.Group>
        <Bar
          height={"100%"}
          options={{
            maintainAspectRatio: true,
          }}
          data={data}
        />
      </div>
    </>
  );
}
