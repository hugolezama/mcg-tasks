import React, { useContext, useEffect, useState } from 'react';

import { WeekContext } from '../../contexts/WeekContext';
import firebaseRef from '../../firebase/firebaseConfig';
import ScheduleTable from './ScheduleTable';

const Schedule = () => {
  const [stateSchedule, setStateSchedule] = useState({});
  const { currentWeekId } = useContext(WeekContext);

  useEffect(() => {
    (async () => {
      try {
        const scheduleSnap = await firebaseRef.child(`weeks/${currentWeekId}/schedule`).once('value');
        const data = scheduleSnap.val();

        setStateSchedule(data || {});
      } catch (err) {
        console.error(err);
      }
    })();
  }, [currentWeekId]);

  const saveScheduleItem = async (staffId, index, values, dayOff) => {
    console.log('START saveScheduleItem');
    try {
      const ref = await firebaseRef.child(`weeks/${currentWeekId}/schedule/${staffId}`);
      await ref.child(index).update({
        time: values,
        dayOff
      });

      setStateSchedule((prevSched) => {
        return {
          ...prevSched,
          [staffId]: {
            ...prevSched[staffId],
            [index]: {
              time: values,
              dayOff
            }
          }
        };
      });
    } catch (err) {
      console.error(err);
    }
    console.log('END saveScheduleItem');
  };

  const addStaffSchedule = async (staffId) => {
    try {
      const ref = await firebaseRef.child(`weeks/${currentWeekId}/schedule/${staffId}`);

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
    <>
      <ScheduleTable
        stateSchedule={stateSchedule}
        saveScheduleItem={saveScheduleItem}
        addStaffSchedule={addStaffSchedule}
      ></ScheduleTable>
    </>
  );
};

export default Schedule;
