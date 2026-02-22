import api from './axios';

export const getEvents = (date) => api.get('/events', { params: { date } });
export const createEvent = (data) => api.post('/events', data);
export const updateEvent = (id, data) => api.put(`/events/${id}`, data);
export const deleteEvent = (id) => api.delete(`/events/${id}`);