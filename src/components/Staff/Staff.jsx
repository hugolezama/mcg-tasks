import { useEffect, useState, useCallback } from "react";
import ListStaff from "./ListStaff";

const Staff = () => {
  const [stateStaff, setStateStaff] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const result = await fetch(
          `https://mcgtasks-default-rtdb.firebaseio.com/staff.json`
        );
        const data = await result.json();

        setStateStaff(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const manageStaffHandler = useCallback(async (staff) => {
    (async () => {
      try {
        await fetch("https://mcgtasks-default-rtdb.firebaseio.com/staff.json", {
          method: "POST",
          body: JSON.stringify(staff),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return <ListStaff staffList={stateStaff}></ListStaff>;
};

export default Staff;
