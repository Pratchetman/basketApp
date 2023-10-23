import React from "react";
import { BasketmaniaApp } from "./BasketmaniaApp";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css";
import { BasketmaniaProvider } from "./context/BasketmaniaContext";
function App() {
  return (
    <div className="App">
      <BasketmaniaProvider>
      <BasketmaniaApp />
      </BasketmaniaProvider>
      
    </div>
  );
}

export default App;
