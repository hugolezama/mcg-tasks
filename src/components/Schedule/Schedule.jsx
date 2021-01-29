import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';

import { WeekContext } from '../../contexts/WeekContext';
import firebaseRef from '../../firebase/firebaseConfig';
import ScheduleTable from './ScheduleTable';

const Schedule = () => {
  const [stateSchedule, setStateSchedule] = useState([]);
  const { startOfWeek } = useContext(WeekContext);

  useEffect(() => {
    (async () => {
      try {
        const scheduleSnap = await firebaseRef
          .child(`weeks/${moment(startOfWeek).format('MM-DD-YYYY')}/schedule`)
          .once('value');
        const data = scheduleSnap.val();
        const loadedData = [];
        console.log(data);
        for (const key in data) {
          const days = [];
          for (const key2 in data[key]) {
            const hours = [];
            for (const key3 in data[key][key2].time) {
              hours.push(data[key][key2].time[key3]);
            }
            days.push(hours);
          }
          loadedData.push({
            id: key,
            time: days
          });
        }
        console.log(loadedData);
        setStateSchedule(loadedData);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [startOfWeek]);

  // const saveScheduleHandler = useCallback(async (staff) => {
  //   console.log('SAVING STAFF');
  //   try {
  //     const ref = firebaseRef.child('staff');
  //     if (staff.id) {
  //       await ref.child(staff.id).update({
  //         name: staff.name,
  //         room: staff.room,
  //         role: staff.role
  //       });

  //       setStateSchedule((prevState) =>
  //         prevState.map((oldSchedule) => {
  //           return oldSchedule.id === staff.id ? staff : oldSchedule;
  //         })
  //       );
  //     } else {
  //       const res = await ref.push(staff);
  //       const snapshot = await res.once('value');
  //       setStateSchedule((prevState) => [
  //         ...prevState,
  //         {
  //           id: snapshot.key,
  //           ...staff
  //         }
  //       ]);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, []);

  return <ScheduleTable stateSchedule={stateSchedule}></ScheduleTable>;
};

export default Schedule;
