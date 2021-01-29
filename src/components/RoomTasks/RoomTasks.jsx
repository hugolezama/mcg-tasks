import { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import firebaseRef from '../../firebase/firebaseConfig';

const RoomTasks = () => {
  const [stateTasks, setStateTasks] = useState([]);
  const [createdId, setCreatedId] = useState('');
  console.log('TASKS');

  useEffect(() => {
    console.log('LIST');

    firebaseRef
      .child('tasks')
      .once('value')
      .then((res) => {
        const data = res.val();
        const loadedTasks = [];
        for (const key in data) {
          loadedTasks.push({
            id: key,
            name: data[key].name,
            type: data[key].type
          });
        }
        setStateTasks(loadedTasks);
        setCreatedId(loadedTasks[0].id || '');
        console.log(loadedTasks);
      })

      .catch((err) => {
        console.error(err);
      });
  }, []);

  const saveTaskHandler = async (task) => {
    console.log('SAVE');
    try {
      const ref = firebaseRef.child('tasks');
      if (task.id) {
        await ref.child(task.id).update({
          name: task.name,
          type: task.type
        });

        setStateTasks((prevState) =>
          prevState.map((oldTask) => {
            return oldTask.id === task.id ? task : oldTask;
          })
        );
      } else {
        const res = await ref.push(task);
        const snapshot = await res.once('value');
        console.log(snapshot.key);
        setCreatedId(snapshot.key);
        setStateTasks((prevState) => [
          ...prevState,
          {
            id: snapshot.key,
            ...task
          }
        ]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeTaskHandler = (taskId) => {
    console.log('REMOVING');
    const ref = firebaseRef.child('tasks');
    ref
      .child(taskId)
      .remove()
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    setStateTasks((prevState) => prevState.filter((oldTask) => oldTask.id !== taskId));
    if (stateTasks.length > 1) {
      setCreatedId(stateTasks[0].id);
    }
  };

  return (
    <div>
      <Button
        onClick={() => {
          saveTaskHandler({
            name: 'task.name',
            type: 'task.type'
          });
        }}
      >
        ADD TASK
      </Button>
      {createdId}
      <br></br>
      <Button
        onClick={() => {
          removeTaskHandler(createdId);
        }}
      >
        REMOVE
      </Button>
      <br></br>

      <div>
        {stateTasks.map((task) => {
          return <div>{task.id}</div>;
        })}
      </div>
    </div>
  );
};

export default RoomTasks;
