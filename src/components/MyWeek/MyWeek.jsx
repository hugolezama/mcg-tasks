import { useContext, useEffect, useState } from 'react';
import firebaseRef from '../../firebase/firebaseConfig';
import moment from 'moment';
import { WeekContext } from '../../contexts/WeekContext';
import MyWeekTable from './MyWeekTable';

const MyWeek = () => {
  const { startOfWeek } = useContext(WeekContext);

  const [wholeWeekState, setWholeWeekState] = useState({});
  const [myWeekState, setMyWeekState] = useState({});
  const [currentStaffMember, setCurrentStaffMember] = useState('');

  useEffect(() => {
    (async () => {
      try {
        console.log('LOADING WHOLE WEEK');
        const snap = await firebaseRef.child(`weeks/${moment(startOfWeek).format('MM-DD-YYYY')}`).once('value');
        setWholeWeekState(snap.val());
      } catch (err) {
        console.error(err);
      }
    })();
  }, [startOfWeek]);

  useEffect(() => {
    console.log('LOADING STAFF WEEK: ' + currentStaffMember);
    let weekSchedule = {};

    const schedule = wholeWeekState['schedule'] || {};
    const roomTasks = wholeWeekState['roomTasks'] || {};
    const tasks = wholeWeekState['tasks'] || {};

    weekSchedule['schedule'] = schedule[currentStaffMember];

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
                [roomName]: {
                  [dayKey]: true
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

    setMyWeekState(weekSchedule);
    console.log(weekSchedule);
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
