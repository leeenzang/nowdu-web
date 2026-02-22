import { useState } from 'react';

function AddEventModal({ onClose }) {
  const [type, setType] = useState('routine');

  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-7 w-96 flex flex-col gap-5 shadow-xl">
        <div className="flex justify-between items-center">
          <span className="text-base font-bold text-gray-900">일정 추가</span>
          <button onClick={onClose} className="text-gray-400 text-xl">✕</button>
        </div>

        {/* 루틴 / 1회성 선택 */}
        <div className="flex border border-gray-900 rounded-lg overflow-hidden">
          <button onClick={() => setType('routine')} className={`flex-1 py-2 text-sm ${type === 'routine' ? 'bg-gray-900 text-white' : 'text-gray-700'}`}>루틴</button>
          <button onClick={() => setType('event')} className={`flex-1 py-2 text-sm ${type === 'event' ? 'bg-gray-900 text-white' : 'text-gray-700'}`}>1회성</button>
        </div>

        {/* 시간 */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">시간</label>
          <input type="time" className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-gray-50" />
        </div>

        {/* 제목 */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">제목</label>
          <input type="text" placeholder="제목을 입력해주세요" className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-gray-50" />
        </div>

        {/* 요일 (루틴일 때만) */}
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

        {/* 메모 */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">메모 (선택)</label>
          <textarea placeholder="메모를 입력해주세요" rows={3}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-gray-50 resize-none" />
        </div>

        <button className="bg-gray-900 text-white rounded-xl py-3 text-sm font-bold">저장</button>
      </div>
    </div>
  );
}

export default AddEventModal;