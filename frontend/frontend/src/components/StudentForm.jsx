import { useState, useEffect } from 'react';

function StudentForm({ student, onSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (student) {
      setName(student.name || '');
      setEmail(student.email || '');
      setCourse(student.course || '');
      setMessage('');
    } else {
      setName('');
      setEmail('');
      setCourse('');
      setMessage('');
    }
  }, [student]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentData = { name, email, course };

    try {
      let response;
      if (student && student._id) {
        // Update existing student
        response = await fetch(`http://localhost:3000/students/${student._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentData),
        });
      } else {
        // Add new student
        response = await fetch('http://localhost:3000/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentData),
        });
      }

      if (response.ok) {
        setMessage(student ? 'Student updated successfully!' : 'Student added successfully!');
        setName('');
        setEmail('');
        setCourse('');
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setMessage('Failed to save student.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="student-form-container">
      <h2>{student ? 'Edit Student' : 'Add Student'}</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter name"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email"
          />
        </label>
        <label>
          Course:
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
            placeholder="Enter course"
          />
        </label>
        <button type="submit">{student ? 'Update Student' : 'Add Student'}</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default StudentForm;
