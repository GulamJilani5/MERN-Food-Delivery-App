import "./App.css";
import Home from "./srcreens/Home";

import { createBrowserRouter } from "react-router-dom";
import Login from "./srcreens/Login";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from "./srcreens/Signup";
import { CartProvider } from "./components/ContextReducer";
import MyOrder from "./srcreens/MyOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/createuser",
    element: <Signup />,
  },
  {
    path: "/myorder",
    element: <MyOrder />,
  },
]);

// function App() {
//   return router;
//   // <CartProvider>router</CartProvider>;
// }
// export default App;
// export default function App() {
//   return <CartProvider>useRoutes(router);</CartProvider>;
// }
// // {
// {
// {
// }
// // }
// }
<CartProvider>useRoutes(router)</CartProvider>;
export default router;
