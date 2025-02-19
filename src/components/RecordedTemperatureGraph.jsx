import React from 'react';
import ReactApexChart from 'react-apexcharts';

const RecordedTemperatureGraph = ({ jsonData }) => {
  const series = [
    {
      name: '記録された温度 (°C)',
      data: jsonData.map(item => item.temperature),
    },
  ];

  const options = {
    chart: {
      zoom: {
        enabled: false
      },
      type: 'line',
      height: 400,
      width: '150%',
      scrollablePlotArea: {
        scrollEnabled: true,
        scrollbarHeight: 20,
        padding: {
          right: 20,
        },
      },
    },
    title: {
      text: '記録された温度データ',
      align: 'left',
    },
    xaxis: {
      categories: jsonData.map(item => `${item.time}秒`),
      title: {
        text: '時間 (秒)',
      },
      tickAmount: 10,
      labels: {
        rotate: -45,
        style: {
          fontSize: '12px',
        },
      },
      range: 20,
    },
    yaxis: {
      title: {
        text: '温度 (°C)',
      },
      min: 0,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    markers: {
      size: 5,
      hover: {
        size: 7,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.25,
        gradientToColors: ['#FF6384'],
        inverseColors: false,
        opacityFrom: 0.85,
        opacityTo: 0.25,
        stops: [0, 100],
      },
    },
    colors: ['#FF6384'],
    legend: {
      position: 'top',
      horizontalAlign: 'center',
    },
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <ReactApexChart options={options} series={series} type="line" height={400} />
    </div>
  );
};

export default RecordedTemperatureGraph;
