import { useContext, useEffect } from 'react';
import firebaseRef from '../../firebase/firebaseConfig';
import moment from 'moment';
import { WeekContext } from '../../contexts/WeekContext';

const MyWeek = () => {
  const { startOfWeek } = useContext(WeekContext);

  useEffect(() => {
    (async () => {
      try {
        const snap = await firebaseRef.child(`weeks/${moment(startOfWeek).format('MM-DD-YYYY')}`).once('value');
        const data = snap.val();
        console.log(data);

        const staff = 'Paty';

        let weekSchedule = {};

        const schedule = data['schedule'] || {};
        const roomTasks = data['roomTasks'] || {};
        const tasks = data['tasks'] || {};

        weekSchedule['schedule'] = schedule[staff];

        Object.keys(roomTasks).forEach((taskName) => {
          const roomTask = roomTasks[taskName];
          Object.keys(roomTask).forEach((roomName) => {
            const room = roomTask[roomName];
            Object.keys(room).forEach((dayKey) => {
              const assignees = room[dayKey];
              if (assignees.includes(staff)) {
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
            if (assignees.includes(staff)) {
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
      } catch (err) {
        console.error(err);
      }
    })();
  }, [startOfWeek]);

  return <div>HOME</div>;
};

export default MyWeek;
