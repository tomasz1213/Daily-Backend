CREATE TABLE water_history
 ( id SERIAL PRIMARY KEY,
value VARCHAR ( 4 ),
time VARCHAR ( 5 ),
date DATE,
user_id VARCHAR ( 500 ) REFERENCES users ( user_uid ) );