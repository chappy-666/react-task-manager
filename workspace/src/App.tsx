import { useState } from 'react'
import './App.css'
import type { Task } from './types/task'
import { v4 as uuidv4 } from 'uuid'
import TaskList from './components/TaskList'

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

      <TaskList
        tasks={tasks}
        onToggle={toggleComplete}
        onDelete={deleteTask}
        filter={filter}
      />
    </div>
  )
}

export default App
