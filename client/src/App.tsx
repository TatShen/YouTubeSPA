import { BrowserRouter } from "react-router-dom";
import "./App.css";

import { LoginPage } from "./pages/login/login";

function App() {
  return (
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );
}

export default App;
