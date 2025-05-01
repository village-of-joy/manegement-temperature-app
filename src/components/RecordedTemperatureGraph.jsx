import React from 'react';
import ReactApexChart from 'react-apexcharts';

const RecordedTemperatureGraph = ({ jsonData }) => {
  const { recordedData = [], markedPoints = [] } = jsonData || {};

  const series = [
    {
      name: '記録された温度 (°C)',
      data: recordedData.map(item => ({ x: `${item.time}秒`, y: item.temperature })),
    },
  ];

  const options = {
    chart: {
      type: 'line',
      height: 400,
      zoom: { enabled: false }, // ← ズーム無効化
      toolbar: {
        show: true,
        tools: {
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: true,
        },
      },
    },
    title: {
      text: '温度の推移',
      align: 'left',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
      },
    },
    xaxis: {
      type: 'numeric',
      title: {
        text: '時間 (秒)',
        style: { fontSize: '14px', fontWeight: 'bold' },
      },
      labels: {
        rotate: -45,
        style: { fontSize: '12px' },
      },
      tickAmount: 10,
    },
    yaxis: {
      title: {
        text: '温度 (°C)',
        style: { fontSize: '14px', fontWeight: 'bold' },
      },
      min: 0,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    markers: {
      size: 5,
      hover: { size: 7 },
    },
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        formatter: (val) => `${val}秒`,
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      fontSize: '14px',
    },
    colors: ['#FF6384', '#36A2EB'], // 通常データ＋強調ポイント用
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // 交互に背景色
        opacity: 0.5,
      },
    },

    // 🔽 markedPoints を annotation で表示
    annotations: {
      points: markedPoints.map((point) => ({
        x: `${point.time}秒`,
        y: point.temperature,
        marker: {
          size: 8,
          fillColor: '#36A2EB',
          strokeColor: '#000',
          radius: 2,
        },
        label: {
          borderColor: '#36A2EB',
          style: {
            color: '#fff',
            background: '#36A2EB',
          },
          text: '注目',
          offsetY: -10,
        },
      })),
    },
  };
  

  return (
    <div>
      <ReactApexChart options={options} series={series} type="line" height={400} />
    </div>
  );
};

export default RecordedTemperatureGraph;
