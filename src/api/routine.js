import api from './axios';

export const getRoutines = () => api.get('/routines');
export const createRoutine = (data) => api.post('/routines', data);
export const updateRoutine = (id, data) => api.put(`/routines/${id}`, data);
export const deleteRoutine = (id) => api.delete(`/routines/${id}`);