INSERT INTO departments (department_name)
VALUES
    ("Operations"),
    ("Maketing & Advertising"),
    ("Finance & Accounting"),
    ("IT"),
    ("Sales") 
;
    
INSERT INTO roles (title, salary, department_id)
VALUES 
    ("Operations Manager", 160000, 1),
    ("Marketing Manager", 150000, 1),
    ("Full Stack Engineer", 150000, 1),
    ("Marketing Analyist", 110000, 2),
    ("Head of Sales", 105000, 2),
    ("Operations Assistant", 95000, 3),
    ("Sales Associate", 95000, 3),
    ("Marketing Assistant", 95000, 3),
    ("Junior Developer", 92000, 4)
;

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
    ("Kelvin", "Cracker", 1, 1 )
    
   