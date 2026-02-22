import { useState, useEffect } from 'react';
import { getRoutines, deleteRoutine } from '../api/routine';

function RoutinePanel({ onEdit }) {
  const [routines, setRoutines] = useState([]);

  const dayLabels = { mon: '월', tue: '화', wed: '수', thu: '목', fri: '금', sat: '토', sun: '일' };

  const getDays = (routine) =>
    Object.entries(dayLabels)
      .filter(([key]) => routine[key])
      .map(([, label]) => label)
      .join(' ');

  useEffect(() => {
    getRoutines()
      .then(res => setRoutines(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('삭제할까요?')) return;
    deleteRoutine(id)
      .then(() => setRoutines(prev => prev.filter(r => r.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="flex flex-col gap-3">
      {routines.map(routine => (
        <div key={routine.id} className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-100">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">{routine.startTime}</span>
            <span className="text-sm font-bold text-gray-800">{routine.title}</span>
            <span className="text-xs text-gray-400">{getDays(routine)}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onEdit({ ...routine, type: 'routine' })}
              className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-500">수정</button>
            <button onClick={() => handleDelete(routine.id)}
              className="text-xs px-3 py-1.5 border border-red-100 rounded-lg text-red-400">삭제</button>
          </div>
        </div>
      ))}
      {routines.length === 0 && (
        <p className="text-sm text-gray-400 text-center mt-10">루틴이 없어요</p>
      )}
    </div>
  );
}

export default RoutinePanel;