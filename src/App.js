import Layout from './components/Layout';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Tasks from './components/Tasks/Tasks';
import Schedule from './components/Schedule/Schedule';
import Staff from './components/Staff/Staff';
import RoomTasks from './components/RoomTasks/RoomTasks';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/schedule">
          <Schedule />
        </Route>
        <Route path="/tasks">
          <Tasks />
        </Route>
        <Route path="/room-tasks">
          <RoomTasks />
        </Route>
        <Route path="/staff">
          <Staff />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
