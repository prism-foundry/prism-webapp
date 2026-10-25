-- Persist the raw per-session CSRF token so the client can re-fetch it after a
-- full page reload (the value returned at login is otherwise lost from memory).
-- The raw value is only ever served to the holder of the httpOnly session cookie,
-- and verification still compares against the stored sha256 hash (csrf_hash).
ALTER TABLE sessions ADD COLUMN csrf_raw TEXT;
