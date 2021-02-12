import { useCallback, useContext, useEffect } from 'react';
import React, { useState } from 'react';
import firebaseRef from '../../firebase/firebaseConfig';
import { WeekContext } from '../../contexts/WeekContext';
import TasksTable from './TasksTable';

const Tasks = () => {
  const [stateTasks, setStateTasks] = useState({});
  const { currentWeekId } = useContext(WeekContext);

  useEffect(() => {
    (async () => {
      try {
        const snap = await firebaseRef.child(`weeks/${currentWeekId}/tasks`).once('value');
        const data = snap.val();
        setStateTasks(data || {});
      } catch (err) {
        console.error(err);
      }
    })();
  }, [currentWeekId]);

  const addTaskRow = useCallback((taskName) => {
    const newTaskRow = { 0: [], 1: [], 2: [], 3: [], 4: [] };
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
        const ref = await firebaseRef.child(`weeks/${currentWeekId}/tasks/${taskName}`);
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
    [currentWeekId]
  );

  return <TasksTable stateTasks={stateTasks} addTaskRow={addTaskRow} assignTask={assignTask}></TasksTable>;
};

export default Tasks;
