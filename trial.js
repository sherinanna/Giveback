Table events {
  
  title varchar
  description varchar
  category varchar
  start_date date
  end_date date
  recurrence varchar
  org_title varchar
  region varchar
  zip_code varchar
  owner 
  
 
}

// If schema name is omitted, it will default to "public" schema.
Table users as U {
  username varchar [pk]
  password varchar
  first_name varchar
  last_name varchar
  email varchar
  is_admin boolean
}

Table applications {
  
  username varchar [ref: < U.username]
  event_id int [ref: < events.id]
 }
