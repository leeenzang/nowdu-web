import { useState, useEffect } from 'react';
import { createRoutine, updateRoutine } from '../api/routine';
import { createEvent, updateEvent } from '../api/event';

const days = ['월', '화', '수', '목', '금', '토', '일'];
const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];


function AddEventModal({ onClose, onSaved, editData }) {
  const [type, setType] = useState('routine');
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [memo, setMemo] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);

  // 수정 모드일 때 기존 데이터로 채우기
  useEffect(() => {
    if (editData) {
      setType(editData.type);
      setTitle(editData.title);
      setStartTime(editData.startTime);
      setMemo(editData.memo || '');
      if (editData.type === 'routine') {
        const filled = dayKeys.filter((key, i) => editData[key]).map((key, i) => days[dayKeys.indexOf(key)]);
        setSelectedDays(filled);
      }
    }
  }, [editData]);

  const toggleDay = (day) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSave = () => {
    if (!title || !startTime) return alert('시간과 제목을 입력해주세요.');

    if (type === 'routine') {
      const data = {
        title, memo, startTime,
        ...Object.fromEntries(dayKeys.map((key, i) => [key, selectedDays.includes(days[i])]))
      };
      const req = editData ? updateRoutine(editData.id, data) : createRoutine(data);
      req.then(() => { onSaved(); onClose(); }).catch(console.error);
    } else {
      const today = new Date().toISOString().split('T')[0];
      const data = { title, memo, startTime, eventDate: today };
      const req = editData ? updateEvent(editData.id, data) : createEvent(data);
      req.then(() => { onSaved(); onClose(); }).catch(console.error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-7 w-96 flex flex-col gap-5 shadow-xl">
        <div className="flex justify-between items-center">
          <span className="text-base font-bold text-gray-900">{editData ? '일정 수정' : '일정 추가'}</span>
          <button onClick={onClose} className="text-gray-400 text-xl">✕</button>
        </div>
        <div className="flex border border-gray-900 rounded-lg overflow-hidden">
          <button onClick={() => setType('routine')} className={`flex-1 py-2 text-sm ${type === 'routine' ? 'bg-gray-900 text-white' : 'text-gray-700'}`}>루틴</button>
          <button onClick={() => setType('event')} className={`flex-1 py-2 text-sm ${type === 'event' ? 'bg-gray-900 text-white' : 'text-gray-700'}`}>1회성</button>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">시간</label>
          <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-gray-50" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">제목</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-gray-50" />
        </div>
        {type === 'routine' && (
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400">반복 요일</label>
            <div className="flex gap-2">
              {days.map(day => (
                <button key={day} onClick={() => toggleDay(day)}
                  className={`w-9 h-9 rounded-full text-xs font-medium border
                    ${selectedDays.includes(day) ? 'bg-gray-900 text-white border-gray-900' : 'text-gray-400 border-gray-200'}`}>
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">메모 (선택)</label>
          <textarea value={memo} onChange={e => setMemo(e.target.value)}
            placeholder="메모를 입력해주세요" rows={3}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-gray-50 resize-none" />
        </div>
        <button onClick={handleSave} className="bg-gray-900 text-white rounded-xl py-3 text-sm font-bold">저장</button>
      </div>
    </div>
  );
}

export default AddEventModal;