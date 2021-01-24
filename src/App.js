import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:8080/tasks');
    const data = await res.json();

    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:8080/tasks/${id}`);
    const task = await res.json();

    return task;
  };

  const addTask = async (task) => {
    const res = await fetch('http://localhost:8080/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:8080/tasks/${id}`, {
      method: 'DELETE',
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);

    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:8080/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, reminder: data.reminder };
        }

        return task;
      })
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          title="Task Tracker"
          onAdd={() => setShowAdd(!showAdd)}
          showAddTask={showAdd}
        />

        <Route
          path="/"
          exact
          render={() => (
            <>
              {showAdd && <AddTask onAdd={addTask} />}

              {tasks.length ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No tasks to show'
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
