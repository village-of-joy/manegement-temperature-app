import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from '../App';
import BluetoothComponent from '../components/conectedBluetooth';

const Routes = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route index element={<App />} />
            <Route path='/bluetooth' element={<BluetoothComponent />} />
        </>
    )
)
export default Routes;