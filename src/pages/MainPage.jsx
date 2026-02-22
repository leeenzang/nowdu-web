import Timetable from '../components/Timetable';
import TodayPanel from '../components/TodayPanel';
import RoutinePanel from '../components/RoutinePanel';
import AddEventModal from '../components/AddEventModal';
import { useState } from 'react';

function MainPage() {
  const [activeTab, setActiveTab] = useState('today');
  const [showModal, setShowModal] = useState(false);
  const [editEvent, setEditEvent] = useState(null);

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900">Nowdu</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg">일간</button>
          <button className="px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg">주간</button>
        </div>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg">+ 일정 추가</button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-96 border-r border-gray-100 flex flex-col">
          <div className="px-5 py-4 border-b border-gray-100 font-bold text-gray-900">
            2월 22일 일요일
          </div>
          <div className="flex-1 overflow-y-auto">
            <Timetable />
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('today')}
              className={`flex-1 py-3 text-sm ${activeTab === 'today' ? 'font-bold text-gray-900 border-b-2 border-gray-900' : 'text-gray-400'}`}>
              오늘 일정
            </button>
            <button
              onClick={() => setActiveTab('routine')}
              className={`flex-1 py-3 text-sm ${activeTab === 'routine' ? 'font-bold text-gray-900 border-b-2 border-gray-900' : 'text-gray-400'}`}>
              루틴 관리
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            {activeTab === 'today' ? <TodayPanel /> : <RoutinePanel onEdit={setEditEvent} />}
          </div>
        </div>
      </div>

      {showModal && (
        <AddEventModal
          onClose={() => setShowModal(false)}
          onSaved={() => window.location.reload()}
        />
      )}
      {editEvent && (
        <AddEventModal
          editData={editEvent}
          onClose={() => setEditEvent(null)}
          onSaved={() => { setEditEvent(null); window.location.reload(); }}
        />
      )}
    </div>
  );
}

export default MainPage;