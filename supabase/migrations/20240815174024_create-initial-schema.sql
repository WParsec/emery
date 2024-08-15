CREATE TABLE users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  display_name TEXT
);


CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE,
  category TEXT NOT NULL,
  priority TEXT,
  completed BOOLEAN DEFAULT FALSE,
  completion_date DATE,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE  -- Using TEXT for user_id
);

CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  times_per_week INT,
  daily BOOLEAN DEFAULT FALSE,
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE,
  completed BOOLEAN DEFAULT FALSE,
  completion_date DATE,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,  -- Using TEXT for user_id
  goal_id UUID REFERENCES goals(id) ON DELETE SET NULL
);

CREATE TABLE habit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  UNIQUE (habit_id, date)
);
