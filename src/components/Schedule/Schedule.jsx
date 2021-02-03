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

        setStateSchedule(data || {});
      } catch (err) {
        console.error(err);
      }
    })();
  }, [startOfWeek]);

  const saveScheduleItem = async (staffId, index, values, dayOff) => {
    try {
      const ref = await firebaseRef.child(`weeks/${moment(startOfWeek).format('MM-DD-YYYY')}/schedule/${staffId}`);
      await ref.child(index).update({
        time: values,
        dayOff
      });

      let prevSched = Object.assign(stateSchedule);
      prevSched[staffId][index].time = [];
      prevSched[staffId][index].dayOff = dayOff;

      if (!dayOff) {
        values.forEach((timeValue) => {
          prevSched[staffId][index].time.push(timeValue);
        });
      }

      setStateSchedule(prevSched);
    } catch (err) {
      console.error(err);
    }
  };

  const addStaffSchedule = async (staffId) => {
    try {
      const ref = await firebaseRef.child(`weeks/${moment(startOfWeek).format('MM-DD-YYYY')}/schedule/${staffId}`);

      const defaultDay = {
        dayOff: false,
        time: {
          0: '07:00',
          1: '16:00',
          2: '13:00'
        }
      };
      const defaultSched = {
        0: defaultDay,
        1: defaultDay,
        2: defaultDay,
        3: defaultDay,
        4: defaultDay
      };
      await ref.set(defaultSched);
      setStateSchedule((prev) => {
        return {
          ...prev,
          [staffId]: defaultSched
        };
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScheduleTable
      stateSchedule={stateSchedule}
      saveScheduleItem={saveScheduleItem}
      addStaffSchedule={addStaffSchedule}
    ></ScheduleTable>
  );
};

export default Schedule;
