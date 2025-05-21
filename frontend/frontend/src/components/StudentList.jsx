import { useEffect, useState } from 'react';

function StudentList({ onAddNew, onEdit }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/students');
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/students/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete student');
      }
      // Refresh list after deletion
      fetchStudents();
    } catch (err) {
      alert('Error deleting student: ' + err.message);
    }
  };

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="student-list-container">
      <h2>Student List</h2>
      <button onClick={onAddNew}>Add New Student</button>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="4">No students found.</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>
                  <button onClick={() => onEdit(student)}>Edit</button>{' '}
                  <button onClick={() => handleDelete(student._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
