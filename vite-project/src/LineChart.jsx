import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { DataContext } from './DataContext';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Time Trend of Selected Feature Line',
    },    
    zoom: {
      zoom: {
        wheel: {
          enabled: true
        },
        drag:{
          enabled:true
        },
        mode: "x",
        speed: 100
      },
      pan: {
        enabled: true,
        mode: "x",
        speed: 0.5
      }
    }
    },
  };

export default function LineChart() {
  const { data, filters, selectedFeature } = useContext(DataContext);

  if (!data || !selectedFeature) {
    return <p>Loading chart data...</p>;
  }

  const filteredData = (filters.age !== '' || filters.gender !== '')
    ? data.filter((item) => (
      (filters.age === '' || item.Age === filters.age) &&
      (filters.gender === '' || item.Gender === filters.gender)
    ))
    : data;

  const dateLabels = filteredData.map(item => item.Day); // Assuming 'Day' is the property containing date labels
  const selectedFeatureData = filteredData.map(item => +item[selectedFeature]);

  const chartData = {
    labels: dateLabels,
    datasets: [
      {
        label: `Time Trend of Feature ${selectedFeature}`,
        data: selectedFeatureData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: false,
      },
    ],
  };

  return <Line options={options} data={chartData} />;
}
