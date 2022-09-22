
-- Run this file as $psql<giveback.sql
\echo 'Delete and recreate giveback db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE giveback;
CREATE DATABASE giveback;
\connect giveback

\i schema.sql
\i seed.sql

\echo 'Delete and recreate giveback_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE giveback_test;
CREATE DATABASE giveback_test;
\connect giveback_test

\i schema.sql
