CREATE TABLE tasks (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(200) NOT NULL,
	"completed" BOOLEAN DEFAULT FALSE
	);
	
INSERT INTO tasks (task) VALUES
('Eat Breakfast');
