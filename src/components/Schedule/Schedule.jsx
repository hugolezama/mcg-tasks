import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';

import { WeekContext } from '../../contexts/WeekContext';
import firebaseRef from '../../firebase/firebaseConfig';
import ScheduleTable from './ScheduleTable';

const Schedule = () => {
  const [stateSchedule, setStateSchedule] = useState({});
  const { startOfWeek } = useContext(WeekContext);

  useEffect(() => {
    (async () => {
      try {
        const scheduleSnap = await firebaseRef
          .child(`weeks/${moment(startOfWeek).format('MM-DD-YYYY')}/schedule`)
          .once('value');
        const data = scheduleSnap.val();
        console.log(data);
        setStateSchedule(data || {});
      } catch (err) {
        console.error(err);
      }
    })();
  }, [startOfWeek]);

  const saveScheduleItem = async (staffId, index, values, dayOff) => {
    console.log('SAVING SCHEDULE');
    console.log(startOfWeek.format('MM-DD-YYYY'));
    console.log(staffId);
    console.log(index);
    console.log(values);
    try {
      const ref = await firebaseRef.child(`weeks/${moment(startOfWeek).format('MM-DD-YYYY')}/schedule/${staffId}`);

      await ref.child(index).update({
        time: values,
        dayOff
      });

      let prevSched = Object.assign(stateSchedule);
      console.log(prevSched);
      prevSched[staffId][index].time = [];
      prevSched[staffId][index].dayOff = dayOff;

      if (!dayOff) {
        values.forEach((timeValue) => {
          prevSched[staffId][index].time.push(timeValue);
        });
      }

      console.log(prevSched);
      setStateSchedule(prevSched);
    } catch (err) {
      console.error(err);
    }
  };

  return <ScheduleTable stateSchedule={stateSchedule} saveScheduleItem={saveScheduleItem}></ScheduleTable>;
};

export default Schedule;
