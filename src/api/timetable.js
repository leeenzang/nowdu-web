import api from './axios';

export const getDailyTimetable = (date) => {
  return api.get('/timetable', { params: { date } });
};