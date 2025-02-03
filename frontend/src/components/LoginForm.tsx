import { useState } from 'react';

const LoginForm: React.FC = () => {
  // State for form data
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [submittedAge, setSubmittedAge] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    setSubmittedName(name);
    setSubmittedAge(age);
    setAge('');
    setName('');

    // TASK: Handle form submission
    // - Update the 'submitted' state to true here when the form is successfully submitted
    // - You can simulate the form submission with a state change
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Name</label>
        <input
          type="text"
          value={name}
          id='name'
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor='age'>Age</label>
        <input
          type="text"
          value={age}
          id='age'
          aria-label="Age"
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <button type="submit" disabled={!name || !age}>Submit</button>

      {submitted && (
        <div>
          <h3>Form Submitted!</h3>
          <p>Name: {submittedName}</p>
          <p>Age: {submittedAge}</p>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
