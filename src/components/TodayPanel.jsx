function TodayPanel() {
  const events = [
    { id: 1, startTime: '07:10', title: '집에서 출발', type: 'routine', passed: true },
    { id: 2, startTime: '08:40', title: '팀 미팅', type: 'event', passed: false },
    { id: 3, startTime: '20:00', title: '전화영어', type: 'routine', passed: false },
  ];

  return (
    <div className="flex flex-col gap-3">
      {events.map(event => (
        <div key={event.id} className={`flex items-center gap-4 px-4 py-3 rounded-xl border 
          ${event.passed ? 'opacity-40 border-gray-100 bg-gray-50' : 
            event.type === 'event' ? 'border-yellow-200 bg-yellow-50' : 'border-gray-100 bg-gray-50'}`}>
          <span className="text-sm text-gray-400 w-12">{event.startTime}</span>
          <span className="text-sm font-medium text-gray-800 flex-1">{event.title}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full 
            ${event.type === 'routine' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
            {event.type === 'routine' ? '루틴' : '1회'}
          </span>
        </div>
      ))}
    </div>
  );
}

export default TodayPanel;