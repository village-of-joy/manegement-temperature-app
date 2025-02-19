import React, { useEffect, useState } from 'react';
import TemperatureGraph from './TemperatureGraph';
import TemperatureDisplay from './TemperatureDisplay';
import RecordedTemperatureGraph from './RecordedTemperatureGraph';
import Ror from './Ror';

const Dashboard = () => {
  const [data, setData] = useState(createInitialData('温度 (°C)', 'rgba(75, 192, 192, 1)', 'rgba(75, 192, 192, 0.2)'));
  const [recordedData, setRecordedData] = useState(createInitialData('温度 (°C)', 'rgba(225, 55, 100, 1)', 'rgba(225, 55, 100, 0.2)'));
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTemperature, setCurrentTemperature] = useState(0);
  const [jsonData, setJsonData] = useState([]);
  const [markedPoints, setMarkedPoints] = useState([]);

  // 初期データを生成する関数
  function createInitialData(label, borderColor, backgroundColor) {
    return {
      labels: [],
      datasets: [
        {
          label,
          data: [],
          borderColor,
          backgroundColor,
          fill: true,
          borderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    };
  }

  // 1秒ごとに温度データを更新
  useEffect(() => {
    const interval = setInterval(() => {
      const newTemperature = generateRandomTemperature(15, 45);
      setCurrentTemperature(newTemperature); // 現在の温度を設定

      // 現在の時刻を更新
      setTime(prevTime => {
        const newTime = prevTime + 1;

        // 最新の温度データを更新
        updateTemperatureData(newTime, newTemperature);

        if (isRunning) {
          updateRecordedData(newTime, newTemperature);
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // ランダムな温度を生成
  const generateRandomTemperature = (min, max) => Math.floor(Math.random() * (max - min) + min);

  // 最新の温度データを更新
  const updateTemperatureData = (newTime, newTemperature) => {
    setData(prevData => {
      const newLabels = [...prevData.labels, newTime];
      const newData = [...prevData.datasets[0].data, newTemperature];

      // 30秒を超えた場合、古いデータを削除
      if (newLabels.length > 30) {
        newLabels.shift();
        newData.shift();
      }

      return {
        ...prevData,
        labels: newLabels,
        datasets: [{ ...prevData.datasets[0], data: newData }],
      };
    });
  };

  // 記録中の温度データを更新
  const updateRecordedData = (newTime, newTemperature) => {
    setRecordedData(prevRecordedData => ({
      ...prevRecordedData,
      labels: [...prevRecordedData.labels, newTime],
      datasets: [
        {
          ...prevRecordedData.datasets[0],
          data: [...prevRecordedData.datasets[0].data, newTemperature],
        },
      ],
    }));
  };

  // データ取得開始ボタンのハンドラー
  const startRecording = () => {
    setRecordedData(createInitialData('温度 (°C)', 'rgba(225, 55, 100, 1)', 'rgba(225, 55, 100, 0.2)'));
    setTime(0);
    setMarkedPoints([]); // 印をリセット
    setIsRunning(true);
  };

  // データ取得終了ボタンのハンドラー
  const stopRecording = () => {
    setIsRunning(false);

    // JSONデータとして保存
    const jsonData = recordedData.labels.map((label, index) => ({
      time: label,
      temperature: recordedData.datasets[0].data[index],
    }));

    setJsonData(jsonData);
    console.log('データが保存されました：', JSON.stringify(jsonData));
  };

  // チェックポイントを追加
  const addMark = () => {
    if (markedPoints.length < 2) {
      const newMark = { time, temperature: currentTemperature };
      setMarkedPoints(prevMarks => [...prevMarks, newMark]);

      console.log('しるしが追加されました：', newMark);
    } else {
      console.log('印は2つまでしか追加できません');
    }
  };

  return (
    <div className="dashboard">
      <div className="graph-container">
        {/* リアルタイム温度グラフ */}
        <TemperatureGraph data={data} />
        <div>
          {/* データ取得の開始・終了ボタン */}
          {isRunning ? (
            <button onClick={stopRecording} className='data-btn'>データ取得終了</button>
          ) : (
            <button onClick={startRecording} className='data-btn'>データ取得開始</button>
          )}
          {/* チェックポイント追加ボタン */}
          {isRunning && <button onClick={addMark} className='mark-btn'>チェックポイント</button>}
        </div>
      </div>

      {/* 温度表示とRoR計算 */}
      <div className='data-container'>
        <div className='display-container'>
          <TemperatureDisplay temperature={currentTemperature} />
        </div>
        <div className='ror-container'>
          <Ror data={data.datasets[0].data} />
        </div>
      </div>

      {/* 記録されたデータのグラフ */}
      <div className='Recorded-data-container'>
        <RecordedTemperatureGraph jsonData={jsonData} />
      </div>
    </div>
  );
};

export default Dashboard;
