import { useState } from 'react';

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert('Please add a task');
      return;
    }

    onAdd({ text, day, reminder });
    setText('');
    setDay('');
    setReminder(false);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="taskName">Task</label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          name="task"
          id="taskName"
          placeholder="Add Task"
        />
      </div>

      <div className="form-control">
        <label htmlFor="dayAndTime">Day &amp; Time</label>
        <input
          value={day}
          onChange={(e) => setDay(e.target.value)}
          type="text"
          name="dayAndTime"
          id="dayAndTime"
          placeholder="Add Day &amp; Time"
        />
      </div>

      <div className="form-control form-control-check">
        <label htmlFor="reminder">Set Reminder</label>
        <input
          type="checkbox"
          name="reminder"
          id="reminder"
          value={reminder}
          checked={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <button type="submit" className="btn btn-block">
        Save Task
      </button>
    </form>
  );
};

export default AddTask;
