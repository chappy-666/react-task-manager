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
