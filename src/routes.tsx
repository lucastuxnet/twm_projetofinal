import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./page/Error";
import Home from "./page/Home";
import Root from "./page/Root";
// import ServiceOrder from "./page/ServiceOrder";
// import ServiceType from "./page/ServiceType";
// import Technician from "./page/Provider/Data";
import Provider from "./page/Provider";
import ProviderData from "./page/Provider/Data";
// import ProviderRegister from "./page/Provider/SinistroRegister";
import ProviderPreview from "./page/Provider/Preview";
import Insured from "./page/Insured";
import InsuredData from "./page/Insured/Data";
import InsuredPreview from "./page/Insured/Preview";
import InsuredRegister from "./page/Insured/Register";
import SinistroRegister from "./page/Provider/SinistroRegister";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        element: <Provider />,
        children: [
          {
            path: "/prestador/dados",
            element: <ProviderData />,
          },
          {
            path: "/prestador/chamadoseg",
            element: <InsuredPreview />,
          },
          {
            path: "/prestador/chamados",
            element: <ProviderPreview />,
          },
          {
            path: "/prestador/cadastro",
            element: <SinistroRegister />,
          },
        ],
      },
      {
        element: <Insured />,
        children: [
          {
            path: "/segurado/dados",
            element: <InsuredData />,
          },
          {
            path: "/segurado/chamados",
            element: <InsuredPreview />,
          },
          {
            path: "/segurado/cadastro",
            element: <InsuredRegister />,
          },
        ],
      },
    ],
  },
]);
