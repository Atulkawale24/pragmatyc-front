import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { RootRoutes } from "./routes/RootRoutes";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <RootRoutes />
      </Provider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
