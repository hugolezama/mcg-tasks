import React, { createContext, useState } from 'react';
import moment from 'moment';
export const WeekContext = createContext();

export const WeekProvider = ({ children }) => {
  const [startOfWeek, setStartOfWeek] = useState(moment().startOf('isoweek'));
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek.format('MM/DD/YYYY') + ' - ' + moment(startOfWeek).add(5, 'days').format('MM/DD/YYYY')
  );

  return (
    <WeekContext.Provider
      value={{
        startOfWeek,
        setStartOfWeek,
        currentWeek,
        setCurrentWeek
      }}
    >
      {children}
    </WeekContext.Provider>
  );
};
