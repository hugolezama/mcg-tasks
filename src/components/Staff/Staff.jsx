import { useEffect, useState, useCallback } from 'react';
import ListStaff from './ListStaff';
import firebaseRef from '../../firebase/firebaseConfig';

const Staff = () => {
  const [stateStaff, setStateStaff] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const staffSnap = await firebaseRef.child('staff').once('value');
        const data = staffSnap.val();
        const loadedStaff = [];
        for (const key in data) {
          loadedStaff.push({
            id: key,
            name: data[key].name,
            room: data[key].room,
            role: data[key].role
          });
        }
        setStateStaff(loadedStaff);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const saveStaffHandler = useCallback(async (staff) => {
    console.log('SAVING STAFF');
    try {
      const ref = firebaseRef.child('staff');
      if (staff.id) {
        await ref.child(staff.id).update({
          name: staff.name,
          room: staff.room,
          role: staff.role
        });

        setStateStaff((prevState) =>
          prevState.map((oldStaff) => {
            return oldStaff.id === staff.id ? staff : oldStaff;
          })
        );
      } else {
        const res = await ref.push(staff);
        const snapshot = await res.once('value');
        setStateStaff((prevState) => [
          ...prevState,
          {
            id: snapshot.key,
            ...staff
          }
        ]);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const removeStaffHandler = useCallback((staffId) => {
    console.log('REMOVING STAFF');
    const ref = firebaseRef.child('/staff');
    ref
      .child(staffId)
      .remove()
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    setStateStaff((prevState) => prevState.filter((oldStaff) => oldStaff.id !== staffId));
  }, []);

  return (
    <ListStaff
      staffList={stateStaff}
      handleSaveStaff={saveStaffHandler}
      handleRemoveStaff={removeStaffHandler}
    ></ListStaff>
  );
};

export default Staff;
