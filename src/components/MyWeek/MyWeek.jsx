import React from 'react';
import { useContext, useEffect, useState } from 'react';
import firebaseRef from '../../firebase/firebaseConfig';
import { WeekContext } from '../../contexts/WeekContext';
import MyWeekTable from './MyWeekTable';

const MyWeek = () => {
  const { currentWeekId } = useContext(WeekContext);

  const [wholeWeekState, setWholeWeekState] = useState({});
  const [myWeekState, setMyWeekState] = useState({});
  const [currentStaffMember, setCurrentStaffMember] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const snap = await firebaseRef.child(`weeks/${currentWeekId}`).once('value');
        setWholeWeekState(snap.val() || {});
      } catch (err) {
        console.error(err);
      }
    })();
  }, [currentWeekId]);

  useEffect(() => {
    let weekSchedule = {};

    const schedule = wholeWeekState['schedule'] || {};
    const roomTasks = wholeWeekState['roomTasks'] || {};
    const tasks = wholeWeekState['tasks'] || {};

    if (schedule[currentStaffMember]) {
      weekSchedule['schedule'] = schedule[currentStaffMember];
    }

    Object.keys(roomTasks).forEach((taskName) => {
      const roomTask = roomTasks[taskName];
      Object.keys(roomTask).forEach((roomName) => {
        const room = roomTask[roomName];
        Object.keys(room).forEach((dayKey) => {
          const assignees = room[dayKey];
          if (assignees.includes(currentStaffMember)) {
            weekSchedule['roomTasks'] = {
              ...weekSchedule['roomTasks'],
              [taskName]: {
                ...weekSchedule['roomTasks']?.[taskName],
                [dayKey]: {
                  ...weekSchedule['roomTasks']?.[taskName]?.[dayKey],
                  [roomName]: true
                }
              }
            };
          }
        });
      });
    });

    Object.keys(tasks).forEach((taskName) => {
      const task = tasks[taskName];

      Object.keys(task).forEach((dayKey) => {
        const assignees = task[dayKey];
        if (assignees.includes(currentStaffMember)) {
          weekSchedule['tasks'] = {
            ...weekSchedule['tasks'],
            [taskName]: {
              ...weekSchedule['tasks']?.[taskName],
              [dayKey]: true
            }
          };
        }
      });
    });
    console.log(weekSchedule);
    setMyWeekState(weekSchedule);
  }, [currentStaffMember, wholeWeekState]);

  return (
    <MyWeekTable
      myWeekState={myWeekState}
      currentStaffMember={currentStaffMember}
      setCurrentStaffMember={setCurrentStaffMember}
    ></MyWeekTable>
  );
};

export default MyWeek;
