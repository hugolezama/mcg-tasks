import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import firebaseRef from '../firebase/firebaseConfig';

const BASE_WEEK_ID = 'BASE';

export const WeekContext = createContext();

export const WeekProvider = ({ children }) => {
  const [startOfWeek, setStartOfWeek] = useState(moment().startOf('isoWeek'));
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek.format('MMM DD') + ' - ' + moment(startOfWeek).add(5, 'days').format('MMM DD')
  );
  const [currentWeekId, setCurrentWeekId] = useState(moment(startOfWeek).format('MM-DD-YYYY'));

  useEffect(() => {
    const start = moment(startOfWeek);
    setCurrentWeek(start.format('MMM DD') + ' - ' + moment(start).add(5, 'days').format('MMM DD'));
    setCurrentWeekId(start.format('MM-DD-YYYY'));
  }, [startOfWeek]);

  useEffect(() => {
    if (currentWeekId === BASE_WEEK_ID) {
      setCurrentWeek('BASE WEEK');
    }
  }, [currentWeekId]);

  const validateWeekCreated = async (week) => {
    const weekSnap = await firebaseRef.child(`weeks/${week.format('MM-DD-YYYY')}`).once('value');
    console.log(weekSnap.val());
    return weekSnap.val() !== null;
  };

  const createWeekFromBase = async (week) => {
    const baseWeek = await firebaseRef.child(`weeks/${BASE_WEEK_ID}`).once('value');
    const weeksRef = await firebaseRef.child(`weeks`);
    await weeksRef.child(week.format('MM-DD-YYYY')).set(baseWeek.val());
  };

  return (
    <WeekContext.Provider
      value={{
        startOfWeek,
        setStartOfWeek,
        currentWeek,
        currentWeekId,
        setCurrentWeekId,
        validateWeekCreated,
        createWeekFromBase,
        BASE_WEEK_ID
      }}
    >
      {children}
    </WeekContext.Provider>
  );
};

WeekProvider.propTypes = {
  children: PropTypes.node.isRequired
};
