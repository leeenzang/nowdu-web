import { deleteRoutine } from '../api/routine';
import { deleteEvent } from '../api/event';

function EventDetailModal({ event, onClose, onDeleted, onEdit }) {

  const handleDelete = () => {
    if (!window.confirm('삭제할까요?')) return;

    if (event.type === 'routine') {
      deleteRoutine(event.id).then(() => { onDeleted(); onClose(); }).catch(console.error);
    } else {
      deleteEvent(event.id).then(() => { onDeleted(); onClose(); }).catch(console.error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-7 w-80 flex flex-col gap-5 shadow-xl">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">{event.startTime} · {event.type === 'routine' ? '루틴' : '1회성'}</span>
            <span className="text-lg font-bold text-gray-900">{event.title}</span>
          </div>
          <button onClick={onClose} className="text-gray-400 text-xl">✕</button>
        </div>
        {event.memo && (
          <>
            <div className="h-px bg-gray-100" />
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400">메모</span>
              <span className="text-sm text-gray-600 leading-relaxed">{event.memo}</span>
            </div>
          </>
        )}
        <div className="flex gap-3">
          <button onClick={handleDelete}
            className="flex-1 py-3 rounded-xl border border-red-100 text-red-400 text-sm font-bold">삭제</button>
          <button onClick={() => { onEdit(event); onClose(); }}
            className="flex-1 py-3 rounded-xl bg-gray-900 text-white text-sm font-bold">수정</button>
        </div>
      </div>
    </div>
  );
}

export default EventDetailModal;