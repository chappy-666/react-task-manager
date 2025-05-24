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
  const getOrder = (task: Task) => {
    // high,urgent: 0; low,urgent: 1; high,normal: 2; low,normal: 3
    if (task.priority === 'high' && task.urgency === 'urgent') return 0
    if (task.priority === 'low' && task.urgency === 'urgent') return 1
    if (task.priority === 'high' && task.urgency === 'normal') return 2
    return 3
  }

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'active') return !task.completed
      if (filter === 'completed') return task.completed
      return true
    })
    .sort((a, b) => getOrder(a) - getOrder(b))

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
