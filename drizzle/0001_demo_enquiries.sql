CREATE TABLE demo_enquiries (
  id TEXT PRIMARY KEY NOT NULL,
  details TEXT NOT NULL,
  provider_id TEXT,
  received_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
