function RoutinePanel() {
  const routines = [
    { id: 1, startTime: '07:10', title: '집에서 출발', days: '월 화 수 목 금' },
    { id: 2, startTime: '20:00', title: '전화영어', days: '월 수 금' },
    { id: 3, startTime: '19:30', title: '영어 숙제', days: '화 목' },
  ];

  return (
    <div className="flex flex-col gap-3">
      {routines.map(routine => (
        <div key={routine.id} className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-100">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">{routine.startTime}</span>
            <span className="text-sm font-bold text-gray-800">{routine.title}</span>
            <span className="text-xs text-gray-400">{routine.days}</span>
          </div>
          <div className="flex gap-2">
            <button className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-500">수정</button>
            <button className="text-xs px-3 py-1.5 border border-red-100 rounded-lg text-red-400">삭제</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RoutinePanel;