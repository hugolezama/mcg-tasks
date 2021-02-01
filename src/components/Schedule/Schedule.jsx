import React, { useCallback, useContext, useEffect, useState } from 'react';
import moment from 'moment';

import { WeekContext } from '../../contexts/WeekContext';
import firebaseRef from '../../firebase/firebaseConfig';
import ScheduleTable from './ScheduleTable';

const Schedule = () => {
  const [stateSchedule, setStateSchedule] = useState([]);
  const { startOfWeek, setStartOfWeek } = useContext(WeekContext);

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

  const saveScheduleItem = useCallback(
    async (staffId, index, values) => {
      console.log('SAVING SCHEDULE');
      console.log(startOfWeek.format('MM-DD-YYYY'));
      console.log(staffId);
      console.log(index);
      console.log(values);
      try {
        const ref = await firebaseRef.child(`weeks/${moment(startOfWeek).format('MM-DD-YYYY')}/schedule/${staffId}`);

        await ref.child(index).update({
          time: values
        });

        setStartOfWeek(startOfWeek);
      } catch (err) {
        console.error(err);
      }
    },
    [startOfWeek]
  );

  return <ScheduleTable stateSchedule={stateSchedule} saveScheduleItem={saveScheduleItem}></ScheduleTable>;
};

export default Schedule;
