import logo from "./logo.svg";
import "./App.css";
import MainCard from "./components/MainCard";
import { Provider } from "react-redux";
import store from "./utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WeatherInfo from "./components/WeatherInfo";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainCard />,
  },
  {
    path: "/weather-info",
    element: <WeatherInfo />,
  },
]);
function App() {
  return (
    <>
      <Provider store={store}>
        <div className="main-container">
          <RouterProvider router={appRouter} />
        </div>
      </Provider>
    </>
  );
}

export default App;
