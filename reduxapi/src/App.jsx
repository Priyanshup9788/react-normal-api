import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/header";
import AddProduct from "./Components/AddProduct";
import ViewProduct from "./Components/viewProduct";
import UpdateProduct from "./Components/UpdateProduct";
import Home from "./Components/Home";
import ProductView from "./Components/ProductView";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* <Route path="/" element={<Product />} /> */}
          <Route path="/" element={<Home/>} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/updateProduct/:id" element={<UpdateProduct />} />
          <Route path="/viewProduct/:id" element={<ViewProduct />} />
          <Route path="/productView" element={<ProductView/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
