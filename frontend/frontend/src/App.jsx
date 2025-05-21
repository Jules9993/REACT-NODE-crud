import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState } from 'react'
import StudentForm from './components/StudentForm'
import StudentList from './components/StudentList'

function App() {
  const [view, setView] = useState('form') // 'form' or 'list'
  const [selectedStudent, setSelectedStudent] = useState(null)

  const handleFormSuccess = () => {
    setSelectedStudent(null)
    setView('list')
  }

  const handleAddNew = () => {
    setSelectedStudent(null)
    setView('form')
  }

  const handleEdit = (student) => {
    setSelectedStudent(student)
    setView('form')
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {view === 'form' ? (
        <StudentForm student={selectedStudent} onSuccess={handleFormSuccess} />
      ) : (
        <StudentList onAddNew={handleAddNew} onEdit={handleEdit} />
      )}
    </>
  )
}

export default App
