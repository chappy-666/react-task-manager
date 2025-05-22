import { useState } from 'react'
import './App.css'
import type { Task } from './types/task'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('active')

  const addTask = () => {
    if (!title.trim()) return
    const now = new Date().toISOString()
    const newTask: Task = {
      id: uuidv4(),
      title: title.trim(),
      completed: false,
      createdAt: now,
      updatedAt: now,
      completedAt: null,
    }
    setTasks([newTask, ...tasks])
    setTitle('')
  }

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              updatedAt: new Date().toISOString(),
              completedAt: !task.completed ? new Date().toISOString() : null,
            }
          : task,
      ),
    )
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-indigo-700 mb-8 drop-shadow">
        Task Manager
      </h1>

      <div className="flex gap-2 mb-6 w-full max-w-md">
        <input
          className="flex-1 px-4 py-2 rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white shadow"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter a new task"
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) addTask()
          }}
        />
        <button
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-r hover:bg-indigo-700 transition"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      <div className="flex gap-2 mb-8">
        {(['all', 'active', 'completed'] as const).map(f => (
          <button
            key={f}
            className={`px-3 py-1 rounded border font-medium transition shadow-sm ${
              filter === f
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-indigo-600 border-indigo-300 hover:bg-indigo-100'
            }`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'Completed'}
          </button>
        ))}
      </div>

      <ul className="w-full max-w-md space-y-3">
        {tasks.length === 0 ? (
          <li className="bg-white rounded shadow px-4 py-8 text-center text-indigo-400 text-lg font-semibold animate-pulse">
            No tasks! Nothing to do, happy day! 🎉
          </li>
        ) : filter === 'active' && filteredTasks.length === 0 ? (
          <li className="bg-white rounded shadow px-4 py-8 text-center text-indigo-400 text-lg font-semibold animate-pulse">
            No tasks! Nothing to do, happy day! 🎉
          </li>
        ) : filteredTasks.length === 0 ? (
          <li className="bg-white rounded shadow px-4 py-8 text-center text-indigo-300 text-base font-medium">
            No tasks in this filter.
          </li>
        ) : (
          filteredTasks.map(task => (
            <li
              key={task.id}
              className="bg-white rounded shadow flex flex-col gap-1 px-4 py-3 hover:shadow-lg transition group"
            >
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 flex-1 cursor-pointer select-none group-hover:text-indigo-600">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    className="accent-indigo-600 w-4 h-4"
                  />
                  <span
                    className={
                      task.completed
                        ? 'line-through text-gray-400'
                        : 'text-gray-800'
                    }
                  >
                    {task.title}
                  </span>
                </label>
                <button
                  className="ml-4 px-2 py-1 text-xs bg-red-100 text-red-500 rounded hover:bg-red-200 transition"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-1">
                <span>
                  Created:{' '}
                  {task.createdAt
                    ? new Date(task.createdAt).toLocaleString()
                    : '-'}
                </span>
                <span>
                  Updated:{' '}
                  {task.updatedAt
                    ? new Date(task.updatedAt).toLocaleString()
                    : '-'}
                </span>
                <span>
                  Completed:{' '}
                  {task.completedAt
                    ? new Date(task.completedAt).toLocaleString()
                    : '-'}
                </span>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default App
