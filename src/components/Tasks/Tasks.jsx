import { useCallback, useContext, useEffect } from 'react';
import { useState } from 'react';
import firebaseRef from '../../firebase/firebaseConfig';
import { WeekContext } from '../../contexts/WeekContext';
import moment from 'moment';
import TasksTable from './TasksTable';

const Tasks = () => {
  const [stateTasks, setStateTasks] = useState({});
  const { startOfWeek } = useContext(WeekContext);

  useEffect(() => {
    (async () => {
      try {
        const snap = await firebaseRef.child(`weeks/${moment(startOfWeek).format('MM-DD-YYYY')}/tasks`).once('value');
        const data = snap.val();
        setStateTasks(data || {});
      } catch (err) {
        console.error(err);
      }
    })();
  }, [startOfWeek]);

  const addTaskRow = useCallback((taskName) => {
    const newTaskRow = { taskName: { 0: [], 1: [], 2: [], 3: [], 4: [] } };
    setStateTasks((prev) => {
      return {
        ...prev,
        [taskName]: newTaskRow
      };
    });
  }, []);
  const assignTask = useCallback(
    async (taskName, weekDay, assignees) => {
      try {
        const ref = await firebaseRef.child(`weeks/${moment(startOfWeek).format('MM-DD-YYYY')}/tasks/${taskName}`);
        await ref.child(weekDay).set(assignees);

        setStateTasks((prev) => {
          return {
            ...prev,
            [taskName]: {
              ...prev[taskName],
              [weekDay]: assignees
            }
          };
        });
      } catch (err) {
        console.error(err);
      }
    },
    [startOfWeek]
  );

  return <TasksTable stateTasks={stateTasks} addTaskRow={addTaskRow} assignTask={assignTask}></TasksTable>;
};

export default Tasks;
