import { useState, useEffect, useRef } from 'react';

function Timetable() {
  const events = [
    { startTime: '07:10', title: '집에서 출발', type: 'routine' },
    { startTime: '08:40', title: '팀 미팅', type: 'event' },
    { startTime: '20:00', title: '전화영어', type: 'routine' },
  ];

  // 현재 시간 ref 추가
  const currentRef = useRef(null);

  // 현재 시간 상태
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    if (currentRef.current) {
      currentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [now]);

  // 1분마다 현재 시간 갱신
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);
  
  // 현재 시간을 HH:MM 형식으로
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
    <div>
      {timeSlots.map(time => {
        const event = getEvent(time);
        const current = isCurrent(time);
        return (
          <div key={time} ref={current ? currentRef : null} className={`flex items-center h-10 px-5 border-b border-gray-50 cursor-pointer relative
            ${current ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}>
            {current && <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-yellow-400 opacity-60" />}
            <span className={`w-14 text-xs z-10 ${current ? 'text-yellow-500 font-bold' : 'text-gray-300'}`}>{time}</span>
            {event && (
              <>
                <span className="text-sm text-gray-800 font-medium z-10">{event.title}</span>
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full z-10 ${event.type === 'routine' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
                  {event.type === 'routine' ? '루틴' : '1회'}
                </span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Timetable;