import { useRef, useContext } from "react";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DataContext } from "./DataContext";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Features - Total Time Spent",
    },
  },
  width: 800,
  height: 400,
};

const labels = ["A", "B", "C", "D", "E", "F"];

function BarChart() {
  const chartRef = useRef();
  const { data, filters, setFilteredData, setSelectedFeature } =
    useContext(DataContext);

  if (!data) {
    return <p>Loading chart data...</p>;
  }

  // Apply filters and date range to data
  const filteredData =
    filters.age !== "" ||
    filters.gender !== "" ||
    filters.sdate ||
    filters.edate
      ? data.filter(
          (item) =>
            (filters.age === "" || item.Age === filters.age) &&
            (filters.gender === "" || item.Gender === filters.gender) &&
            (filters.sdate === "" || item.date === filters.sdate) &&
            (filters.edate === "" || item.date === filters.edate) &&
            (filters.sdate === "" ||
              new Date(item.date) >= new Date(filters.sdate)) &&
            (filters.edate === "" ||
              new Date(item.date) <= new Date(filters.edate))
        )
      : data;

  // Extract values for the chart labels
  const chartLabels = labels.map((label) => +filteredData[0][label]);
  console.log(filters.sdate);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Time Spent",
        data: chartLabels,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
    ],
  };

  const onClick = (event) => {
    let elements = getElementAtEvent(chartRef.current, event);
    console.log(elements);
    const clickedIndex = elements[0].index;
    const clickedFeature = labels[clickedIndex];
    setFilteredData(filteredData);
    setSelectedFeature(clickedFeature);
    console.log(`Clicked feature: ${clickedFeature}`);


    const shareableURL = `/shareable-chart?filters=${filters}&selectedFeature=${clickedFeature}`;
    console.log(`Shareable URL: ${shareableURL}`);

    console.log(`Clicked feature: ${clickedFeature}`);
  };

  return (
    <div>
      <Bar
        options={options}
        data={chartData}
        onClick={onClick}
        ref={chartRef}
        width={650}
        height={350}
      />
    </div>
  );
}

export default BarChart;
