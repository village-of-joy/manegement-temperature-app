// Ror.jsx
import React, { useEffect, useState } from 'react';

const Ror = ({ data }) => {
  const [rateOfRise, setRateOfRise] = useState(0);

  useEffect(() => {
    if (data.length > 1) {
      // 直近の2つのデータポイントから温度上昇率を計算
      const lastTemp = data[data.length - 2];
      const secondLastTemp = data[data.length - 3];
      const risePerSecond = lastTemp - secondLastTemp;
      
      // 1秒ごとの上昇率をもとに60秒間の予測上昇率を計算
      const predictedRise = risePerSecond * 60;
      setRateOfRise(predictedRise);
    }
  }, [data]);

  return (
    <div className="ror">
      <h2>予測温度上昇率</h2>
      <p className='ror-p'>{rateOfRise.toFixed(2)}</p>
    </div>
  );
};

export default Ror;
