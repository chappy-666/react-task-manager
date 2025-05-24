import { useState } from 'react'
import './App.css'
import type { Task } from './types/task'
import { v4 as uuidv4 } from 'uuid'
import TaskList from './components/TaskList'
import { Button } from './components/ui/button'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<'low' | 'high'>('low')
  const [urgency, setUrgency] = useState<'normal' | 'urgent'>('normal')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('active')

  const addTask = () => {
    if (!title.trim()) return
    const now = new Date().toISOString()
    const newTask: Task = {
      id: uuidv4(),
      title: title.trim(),
      priority: priority,
      urgency: urgency,
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
        <select
          className="px-2 py-2 border-t border-b border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={priority}
          onChange={e => setPriority(e.target.value as 'low' | 'high')}
        >
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>
        <select
          className="px-2 py-2 border-t border-b border-r border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={urgency}
          onChange={e => setUrgency(e.target.value as 'normal' | 'urgent')}
        >
          <option value="normal">Normal</option>
          <option value="urgent">Urgent</option>
        </select>
        <Button size="lg" className="rounded-r" onClick={addTask}>
          Add
        </Button>
      </div>

      <div className="flex gap-2 mb-8">
        {(['all', 'active', 'completed'] as const).map(f => (
          <Button
            size="lg"
            key={f}
            className={`min-w-24 rounded-sm ${
              filter === f ? '' : 'bg-white text-violet-500 hover:bg-violet-200'
            }`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'Completed'}
          </Button>
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
