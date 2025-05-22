import React from 'react'
import type { Task } from '../types/task'
import TaskItem from './TaskItem'

type TaskListProps = {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  filter: 'all' | 'active' | 'completed'
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggle,
  onDelete,
  filter,
}) => {
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  if (
    tasks.length === 0 ||
    (filter === 'active' && filteredTasks.length === 0)
  ) {
    return (
      <ul className="w-full max-w-md space-y-3">
        <li className="bg-white rounded shadow px-4 py-8 text-center text-indigo-400 text-lg font-semibold animate-pulse">
          No tasks! Nothing to do, happy day! 🎉
        </li>
      </ul>
    )
  }

  if (filteredTasks.length === 0) {
    return (
      <ul className="w-full max-w-md space-y-3">
        <li className="bg-white rounded shadow px-4 py-8 text-center text-indigo-300 text-base font-medium">
          No tasks in this filter.
        </li>
      </ul>
    )
  }

  return (
    <ul className="w-full max-w-md space-y-3">
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TaskList
