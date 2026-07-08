const TASKS_KEY = "nexus-tasks";
const GOALS_KEY = "nexus-goals";

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error("Failed to save tasks:", e);
  }
};

export const loadTasks = () => {
  try {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load tasks:", e);
    return [];
  }
};

export const addTask = (title) => {
  const tasks = loadTasks();
  const newTask = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    title,
    completed: false,
    priority: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  return tasks;
};

export const toggleTask = (id) => {
  const tasks = loadTasks();
  const updated = tasks.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  saveTasks(updated);
  return updated;
};

export const toggleTaskPriority = (id) => {
  const tasks = loadTasks();
  const updated = tasks.map((t) =>
    t.id === id ? { ...t, priority: !t.priority } : t
  );
  saveTasks(updated);
  return updated;
};

export const deleteTask = (id) => {
  const tasks = loadTasks();
  const filtered = tasks.filter((t) => t.id !== id);
  saveTasks(filtered);
  return filtered;
};

// ---------- GOALS ----------

export const saveGoals = (goals) => {
  try {
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
  } catch (e) {
    console.error("Failed to save goals:", e);
  }
};

export const loadGoals = () => {
  try {
    const data = localStorage.getItem(GOALS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load goals:", e);
    return [];
  }
};

export const addGoal = (title) => {
  const goals = loadGoals();
  const newGoal = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    title,
    completed: false,
    priority: false,
    createdAt: new Date().toISOString(),
  };
  goals.push(newGoal);
  saveGoals(goals);
  return goals;
};

export const toggleGoal = (id) => {
  const goals = loadGoals();
  const updated = goals.map((g) =>
    g.id === id ? { ...g, completed: !g.completed } : g
  );
  saveGoals(updated);
  return updated;
};

export const toggleGoalPriority = (id) => {
  const goals = loadGoals();
  const updated = goals.map((g) =>
    g.id === id ? { ...g, priority: !g.priority } : g
  );
  saveGoals(updated);
  return updated;
};

export const deleteGoal = (id) => {
  const goals = loadGoals();
  const filtered = goals.filter((g) => g.id !== id);
  saveGoals(filtered);
  return filtered;
};
