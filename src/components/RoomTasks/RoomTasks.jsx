import React, { useCallback, useContext, useEffect, useState } from 'react';
import { WeekContext } from '../../contexts/WeekContext';
import firebaseRef from '../../firebase/firebaseConfig';
import RoomTasksTable from './RoomTasksTable';

const RoomTasks = () => {
  const [stateTasks, setStateTasks] = useState({});
  const { currentWeekId } = useContext(WeekContext);

  useEffect(() => {
    (async () => {
      try {
        const snap = await firebaseRef.child(`weeks/${currentWeekId}/roomTasks`).once('value');
        const data = snap.val();

        setStateTasks(data || {});
      } catch (err) {
        console.error(err);
      }
    })();
  }, [currentWeekId]);

  const addTaskRow = useCallback((taskName) => {
    const newRoomTaskRow = {
      blue: { 0: [], 1: [], 2: [], 3: [], 4: [] },
      purple: { 0: [], 1: [], 2: [], 3: [], 4: [] },
      yellow: { 0: [], 1: [], 2: [], 3: [], 4: [] },
      red: { 0: [], 1: [], 2: [], 3: [], 4: [] }
    };
    setStateTasks((prev) => {
      return {
        ...prev,
        [taskName]: newRoomTaskRow
      };
    });
  }, []);
  const assignTask = useCallback(
    async (taskName, weekDay, assignees, room) => {
      try {
        const ref = await firebaseRef.child(`weeks/${currentWeekId}/roomTasks/${taskName}/${room}`);
        await ref.child(weekDay).set(assignees);

        setStateTasks((prev) => {
          return {
            ...prev,
            [taskName]: {
              ...prev[taskName],
              [room]: {
                ...prev[taskName][room],
                [weekDay]: assignees
              }
            }
          };
        });
      } catch (err) {
        console.error(err);
      }
    },
    [currentWeekId]
  );

  return (
    <RoomTasksTable stateTasks={stateTasks} addTaskRow={addTaskRow} assignTask={assignTask}></RoomTasksTable>
    // <div>dsd</div>
  );
};

export default RoomTasks;
