import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { createContext,  useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import RequireAuth from './components/RequireAuth/RequireAuth';
import PrivateRoute from './components/RequireAuth/RequireAuth';

export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <BrowserRouter>
        <Header></Header>
        <Routes>


          <Route path="/shop" element={<Shop />}/>
          <Route path="/review" element={<Review />}/>
          <Route path="/inventory" element={
            <PrivateRoute>
              <Inventory></Inventory>
            </PrivateRoute>
          }/>
          <Route path="/login" element={<Login />}/>
          <Route path="/shipment" element={
            <PrivateRoute>
              <Shipment></Shipment>
            </PrivateRoute>
          }/>
          <Route path="/" element={<Shop />}/>
          <Route path="/product/:productKey" element={<ProductDetail />}/>
          <Route path="*" element={<NotFound />}/>
          
        </Routes>
      </BrowserRouter>


    </userContext.Provider>
  );
}

export default App;
