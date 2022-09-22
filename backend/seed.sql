
INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        TRUE);

COPY events(title,description,category,organization,recurrence,start_date,end_date,region,zip_code,owner)
FROM '/Users/sherinannasunny/Desktop/SPRINGBOARD/Capstone2/backend/raw_data.csv'
DELIMITER ','
CSV HEADER;

