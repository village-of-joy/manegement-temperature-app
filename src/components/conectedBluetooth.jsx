import React, { useState } from "react";

const BluetoothComponent = () => {
  const [device, setDevice] = useState(null);
  const [connected, setConnected] = useState(false);

  const requestDevice = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["health_thermometer", "generic_access", "device_information"],
      });

    //   デバイス名の取得を試みる
    let deviceName = device.name || "不明なデバイス";

    if (!deviceName && device.gatt) {
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService("generic_access");
        const characteristic = await service.getCharacteristic("gap.device_name");
        const value = await characteristic.readValue();
        deviceName = new TextDecoder().decode(value);
    }

      setDevice({ ...device, name: deviceName });
      connectDevice(device);
    } catch (error) {
      console.error("Bluetooth接続エラー:", error);
    }
  };

  const connectDevice = async (device) => {
    try {
      const server = await device.gatt.connect();
      setConnected(true);
      console.log("接続成功:", device.name);

    //   Health Thermometerサービスを取得
    const service = await server.getPrimaryService("health_thermometer");
    // 温度測定キャラクタリスティックを取得
    const characteristic = await service.getCharacteristic("temperature_measurement");
    // キャラクタリスティックの値を読み取る
    const value = await characteristic.readValue();
    // 温度データをでコード（温度は通常16ビットの整数値として表現される）
    const temperature = value.getInt16(0, true); //Little Endianの場合
    console.log("温度", temperature / 100) // 摂氏に変換

    } catch (error) {
      console.error("接続失敗:", error);
      setConnected(false);
    }
  };

  const disconnectDevice = () => {
    if (device && device.gatt) {
      if (device.gatt.connected) {
        device.gatt.disconnect();
        setConnected(false);  // 切断後、接続状態を更新
        console.log("デバイスを切断しました");
      } else {
        console.warn("デバイスは既に切断されています");
        setConnected(false);
      }
    } else {
      console.warn("デバイスが接続されていません");
    }
  };
  

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">Bluetooth 接続</h2>
      <p>デバイス: {device ? device.name || "不明なデバイス" : "未接続"}</p>
      <div className="mt-4 flex gap-2">
        <button onClick={requestDevice} disabled={connected}>
          デバイスを検索
        </button>
        <button onClick={disconnectDevice} disabled={!connected}>
          切断
        </button>
      </div>
    </div>
  );
};

export default BluetoothComponent;
