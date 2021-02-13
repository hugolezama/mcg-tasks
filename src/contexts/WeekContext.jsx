import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

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
    if (currentWeekId === 'BASE') {
      setCurrentWeek('BASE WEEK');
    }
  }, [currentWeekId]);

  return (
    <WeekContext.Provider
      value={{
        startOfWeek,
        setStartOfWeek,
        currentWeek,
        currentWeekId,
        setCurrentWeekId
      }}
    >
      {children}
    </WeekContext.Provider>
  );
};

WeekProvider.propTypes = {
  children: PropTypes.node.isRequired
};
