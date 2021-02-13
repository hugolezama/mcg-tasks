import React, { useContext, useEffect, useState } from 'react';

import { WeekContext } from '../../contexts/WeekContext';
import firebaseRef from '../../firebase/firebaseConfig';
import ScheduleTable from './ScheduleTable';

const Schedule = () => {
  const [stateSchedule, setStateSchedule] = useState({});
  const { currentWeekId } = useContext(WeekContext);

  useEffect(() => {
    console.log('Rendering Schedule');
  });

  useEffect(() => {
    (async () => {
      console.log('Loading WEEK DATA');
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
      await ref.child(index).set(
        {
          time: values,
          dayOff
        },
        () => {
          console.log('SAVE COMPLETE!');
        }
      );

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
        time: ['07:00', '16:00', '13:00']
      };
      const defaultSched = [defaultDay, defaultDay, defaultDay, defaultDay, defaultDay];

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

  const deleteStaffSchedule = async (staffId) => {
    try {
      const ref = firebaseRef.child(`weeks/${currentWeekId}/schedule/${staffId}`);

      await ref.set(null);
      setStateSchedule((prev) => {
        const newObject = { ...prev };
        delete newObject[staffId];
        return newObject;
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
        deleteStaffSchedule={deleteStaffSchedule}
      ></ScheduleTable>
    </>
  );
};

export default Schedule;
