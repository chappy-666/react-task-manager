import React from 'react'

type TaskItemProps = {
  task: import('../types/task').Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => (
  <li className="bg-white rounded shadow flex flex-col gap-1 px-4 py-3 hover:shadow-lg transition group">
    <div className="flex items-center justify-between">
      <label className="flex items-center gap-2 flex-1 cursor-pointer select-none group-hover:text-indigo-600">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="accent-indigo-600 w-4 h-4"
        />
        <span
          className={
            task.completed ? 'line-through text-gray-400' : 'text-gray-800'
          }
        >
          {task.title}
        </span>
        {task.priority === 'high' ? (
          <span className="ml-2 px-2 py-0.5 rounded bg-red-100 text-red-600 text-xs font-bold border border-red-200 animate-pulse">
            HIGH
          </span>
        ) : (
          <span className="ml-2 px-2 py-0.5 rounded bg-gray-100 text-gray-500 text-xs font-medium border border-gray-200">
            LOW
          </span>
        )}
        {task.urgency === 'urgent' ? (
          <span className="ml-2 px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 text-xs font-bold border border-yellow-300 animate-pulse">
            URGENT
          </span>
        ) : (
          <span className="ml-2 px-2 py-0.5 rounded bg-blue-100 text-blue-600 text-xs font-medium border border-blue-200">
            NORMAL
          </span>
        )}
      </label>
      <button
        className="ml-4 px-2 py-1 text-xs bg-red-100 text-red-500 rounded hover:bg-red-200 transition"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </div>
    <div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-1">
      <span>
        Created:{' '}
        {task.createdAt ? new Date(task.createdAt).toLocaleString() : '-'}
      </span>
      <span>
        Updated:{' '}
        {task.updatedAt ? new Date(task.updatedAt).toLocaleString() : '-'}
      </span>
      <span>
        Completed:{' '}
        {task.completedAt ? new Date(task.completedAt).toLocaleString() : '-'}
      </span>
    </div>
  </li>
)

export default TaskItem
