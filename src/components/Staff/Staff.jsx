import React, { useCallback, useContext, useEffect, useState } from 'react';
import ListStaff from './ListStaff';
import firebaseRef from '../../firebase/firebaseConfig';
import { StaffContext } from '../../contexts/StaffContext';

const Staff = () => {
  const { stateStaff, setStateStaff } = useContext(StaffContext);

  const [arrayStaff, setArrayStaff] = useState([]);

  useEffect(() => {
    console.log('USE EFFFECT');
    const loadedStaff = [];
    for (const key in stateStaff) {
      loadedStaff.push({
        id: key,
        name: stateStaff[key].name,
        room: stateStaff[key].room,
        role: stateStaff[key].role
      });
    }
    setArrayStaff(loadedStaff);
  }, [stateStaff, setStateStaff]);

  const saveStaffHandler = useCallback(
    async (staff) => {
      try {
        const ref = firebaseRef.child('staff');
        if (staff.id) {
          await ref.child(staff.id).update({
            name: staff.name,
            room: staff.room,
            role: staff.role
          });

          setStateStaff((prev) => {
            return {
              ...prev,
              [staff.id]: {
                name: staff.name,
                room: staff.room,
                role: staff.role
              }
            };
          });
        } else {
          const res = await ref.push(staff);
          const snapshot = await res.once('value');

          setStateStaff((prev) => {
            return {
              ...prev,
              [snapshot.key]: {
                ...staff
              }
            };
          });
        }
      } catch (err) {
        console.error(err);
      }
    },
    [setStateStaff]
  );

  const removeStaffHandler = useCallback(
    (staffId) => {
      const ref = firebaseRef.child('/staff');
      ref
        .child(staffId)
        .remove()
        .then((res) => console.log(res))
        .catch((err) => console.error(err));

      setStateStaff((prev) => {
        const newObject = { ...prev };
        delete newObject[staffId];
        return newObject;
      });
    },
    [setStateStaff]
  );

  return (
    <ListStaff
      staffList={arrayStaff}
      handleSaveStaff={saveStaffHandler}
      handleRemoveStaff={removeStaffHandler}
    ></ListStaff>
  );
};

export default Staff;
