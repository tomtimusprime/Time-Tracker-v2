USE employee_db;

UPDATE account
SET wage = 25.25, time_worked = 40, total_time = 325, total_earnings = 8206.25 
WHERE id = 1;
 
UPDATE account
SET wage = 18.75, time_worked = 40, total_time = 220, total_earnings = 3487 
WHERE id = 2;
 
UPDATE account
SET wage = 32.15, time_worked = 40, total_time = 565, total_earnings = 18164.75 
WHERE id = 3;
 
UPDATE account
SET wage = 12.00, time_worked = 40, total_time = 150, total_earnings = 1800 
WHERE id = 4;