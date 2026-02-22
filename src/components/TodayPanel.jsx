import { useState, useEffect } from 'react';
import { getDailyTimetable } from '../api/timetable';

function TodayPanel() {
  const [events, setEvents] = useState([]);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    getDailyTimetable(today)
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, [today]);

  const nowTime = new Date().toTimeString().slice(0, 5);

  return (
    <div className="flex flex-col gap-3">
      {events.map(event => {
        const passed = event.startTime < nowTime;
        return (
          <div key={`${event.type}-${event.id}`}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl border
              ${passed ? 'opacity-40 border-gray-100 bg-gray-50' :
                event.type === 'event' ? 'border-yellow-200 bg-yellow-50' : 'border-gray-100 bg-gray-50'}`}>
            <span className="text-sm text-gray-400 w-12">{event.startTime}</span>
            <span className="text-sm font-medium text-gray-800 flex-1">{event.title}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full
              ${event.type === 'routine' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
              {event.type === 'routine' ? '루틴' : '1회'}
            </span>
          </div>
        );
      })}
      {events.length === 0 && (
        <p className="text-sm text-gray-400 text-center mt-10">오늘 일정이 없어요</p>
      )}
    </div>
  );
}

export default TodayPanel;