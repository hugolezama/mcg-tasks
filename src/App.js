import Layout from "./components/Layout";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/schedule">
          <Schedule></Schedule>
        </Route>
      </Switch>
    </Layout>
  );
};

const Schedule = () => {
  return <div>SCHEDULE</div>;
};
export default App;
