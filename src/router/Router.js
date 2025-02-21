import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import BluetoothComponent from '../components/conectedBluetooth';

const Routes = createBrowserRouter([
    { path: '/', element:<App/>},
    { path: '/bluetooth', element:<BluetoothComponent/>},
]);
export default Routes;