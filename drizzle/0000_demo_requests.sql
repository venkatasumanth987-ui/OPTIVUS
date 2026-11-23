CREATE TABLE demo_requests (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  hospital TEXT NOT NULL,
  email TEXT NOT NULL COLLATE NOCASE,
  received_on TEXT NOT NULL DEFAULT (date('now')),
  received_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(email, hospital, received_on)
);
