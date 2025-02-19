import React from "react"

const TemperatureDisplay = ({ temperature }) => {
    return (
        <div className="temperature-display">
            <h2>リアルタイム温度表示</h2>
            <p className="temperature">{ temperature }</p>
        </div>
    );
};

export default TemperatureDisplay;