import React from 'react';
import Layout from './components/Layout';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Tasks from './components/Tasks/Tasks';
import Schedule from './components/Schedule/Schedule';
import Staff from './components/Staff/Staff';
import RoomTasks from './components/RoomTasks/RoomTasks';
import MyWeek from './components/MyWeek/MyWeek';
import Login from './components/Login/Login';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Layout>
        <Route path="/my-week" component={MyWeek} />
        <Route exact path="/" component={Home} />

        <PrivateRoute path="/schedule" component={Schedule} />
        <PrivateRoute path="/tasks" component={Tasks} />
        <PrivateRoute path="/room-tasks" component={RoomTasks} />
        <PrivateRoute path="/staff" component={Staff} />
      </Layout>
    </Switch>
  );
};

export default App;
