import React from 'react';
import Chart from 'react-apexcharts';

const TemperatureGraph = ({ data, markedPoints = [], isRecording }) => {
  // y軸の最大値と最小値を計算
  const temperatures = data.datasets[0].data;
  const yMin = Math.min(...temperatures) - 5 || 0;
  const yMax = Math.max(...temperatures) + 5 || 10;

  // ApexChartsの設定
  const options = {
    chart: {
      type: 'line',
      height: 350,
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: data.labels,
      title: {
        text: '時間 (秒)',
        style: {
          fontSize: '14px',
        },
      },
    },
    yaxis: {
      min: yMin,
      max: yMax,
      title: {
        text: '温度 (°C)',
        style: {
          fontSize: '14px',
        },
      },
    },
    annotations: {
      points: markedPoints.map((point) => ({
        x: point.time,
        y: point.temperature,
        marker: {
          size: 6,
          fillColor: 'red',
          strokeColor: 'darkred',
          radius: 2,
        },
        label: {
          text: `${point.temperature}°C`,
          style: {
            background: 'darkred',
            color: 'white',
          },
        },
      })),
    },
    stroke: {
      curve: 'smooth',
      colors: [isRecording ? '#007BFF' : '#00E396'], // 録画中は青、通常は緑
      width: 2,
    },
    markers: {
      size: 0, // デフォルトポイント非表示
    },
    grid: {
      borderColor: 'rgba(200, 200, 200, 0.5)',
    },
    tooltip: {
      enabled: true,
    },
  };

  const series = [
    {
      name: '温度',
      data: temperatures,
    },
  ];

  return (
    <div className="temperature-graph">
      <h2>リアルタイム温度グラフ</h2>
      <Chart options={options} series={series} type="line" height="250" />
    </div>
  );
};

export default TemperatureGraph;
