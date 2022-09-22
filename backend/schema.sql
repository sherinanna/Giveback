CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE events
 (
  id SERIAL PRIMARY KEY ,
  title TEXT  NOT NULL,
  description TEXT NOT NULL,
  category TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  recurrence TEXT,
  organization TEXT,
  region TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  owner  VARCHAR(25)  REFERENCES users ON DELETE CASCADE
);





CREATE TABLE applications (
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  event_id INTEGER
    REFERENCES events ON DELETE CASCADE,
  PRIMARY KEY (username, event_id)
);
