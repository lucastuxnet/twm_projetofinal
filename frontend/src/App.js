import "./App.css";
import Menu from "./components/utils/Menu.jsx";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Menu></Menu>
      </BrowserRouter>
    </div>
  );
}

export default App;
