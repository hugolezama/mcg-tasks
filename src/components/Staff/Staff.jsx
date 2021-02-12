import React, { useCallback, useContext, useEffect, useState } from 'react';
import ListStaff from './ListStaff';
import firebaseRef from '../../firebase/firebaseConfig';
import { StaffContext } from '../../contexts/StaffContext';

const Staff = () => {
  const { stateStaff, setStateStaff } = useContext(StaffContext);

  const [arrayStaff, setArrayStaff] = useState([]);

  useEffect(() => {
    const loadedStaff = [];
    for (const key in stateStaff) {
      loadedStaff.push({
        id: key,
        name: stateStaff[key].name,
        rooms: stateStaff[key].rooms,
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
            rooms: staff.rooms,
            role: staff.role
          });

          setStateStaff((prev) => {
            return {
              ...prev,
              [staff.id]: {
                name: staff.name,
                rooms: staff.rooms,
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
    async (staffId) => {
      try {
        const ref = firebaseRef.child('/staff');
        await ref.child(staffId).remove();

        setStateStaff((prev) => {
          const newObject = { ...prev };
          delete newObject[staffId];
          return newObject;
        });
      } catch (err) {
        console.error(err);
      }
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
