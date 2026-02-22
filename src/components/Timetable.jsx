import { useState, useEffect, useRef, useCallback } from 'react';
import { getDailyTimetable } from '../api/timetable';
import EventDetailModal from './EventDetailModal';
import AddEventModal from './AddEventModal';

function Timetable() {
  const [events, setEvents] = useState([]);
  const [now, setNow] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const currentRef = useRef(null);

  const today = new Date().toISOString().split('T')[0];

  const fetchTimetable = useCallback(() => {
    getDailyTimetable(today)
      .then(res => {
        console.log(res.data);
        setEvents(res.data);
      })
      .catch(err => console.error(err));
  }, [today]);

  useEffect(() => { fetchTimetable(); }, [fetchTimetable]);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentRef.current) {
      currentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [now]);

  const nowTime = `${String(now.getHours()).padStart(2, '0')}:${String(Math.floor(now.getMinutes() / 10) * 10).padStart(2, '0')}`;

  const timeSlots = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 10) {
      timeSlots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }

  const getEvent = (time) => events.find(e => e.startTime === time);
  const isCurrent = (time) => time === nowTime;

  return (
    <>
      <div>
        {timeSlots.map(time => {
          const event = getEvent(time);
          const current = isCurrent(time);
          return (
            <div key={time} ref={current ? currentRef : null}
              onClick={() => event && setSelectedEvent(event)}
              className={`flex items-center h-10 px-5 border-b border-gray-50 cursor-pointer relative
                ${current ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}>
              {current && <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-yellow-400 opacity-60" />}
              <span className={`w-14 text-xs z-10 ${current ? 'text-yellow-500 font-bold' : 'text-gray-300'}`}>{time}</span>
              {event && (
                <>
                  <span className="text-sm text-gray-800 font-medium z-10">{event.title}</span>
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full z-10
                    ${event.type === 'routine' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
                    {event.type === 'routine' ? '루틴' : '1회'}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onDeleted={fetchTimetable}
          onEdit={(event) => { setEditEvent(event); setSelectedEvent(null); }}
        />
      )}
      {editEvent && (
        <AddEventModal
          editData={editEvent}
          onClose={() => setEditEvent(null)}
          onSaved={() => { fetchTimetable(); setEditEvent(null); }}
        />
      )}
    </>
  );
}

export default Timetable;