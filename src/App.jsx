import { useRoutes } from "react-router-dom";
import routeList from "./utils/routeList";

function App() {
  const element = useRoutes(routeList);

  return element;
}

export default App;
