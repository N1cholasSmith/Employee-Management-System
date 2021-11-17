INSERT INTO departments (department_name)
VALUES
    ("Operations"),
    ("Maketing & Advertising"),
    ("Engineering"),
    ("Finance & Accounting"),
    ("Legal"),
    ("IT"),
    ("Sales")
;
    
INSERT INTO roles (id, title, salary, department_id)
VALUES 
    (10, "Operations Manager", 160000, 1),
    (20, "Operations Assistant", 95000, 1),
    (30, "Marketing Manager", 150000, 2),
    (40, "Marketing Analyist", 110000, 2),
    (50, "Marketing Assistant", 95000, 2),
    (60, "Software Engineer", 150000, 3),
    (70, "Junior Developer", 90000, 3),
    (80, "Finance Manager", 80000, 4),
    (90, "Junior Accountant", 60000, 4),
    (100, "Lawyer", 110000, 5),
    (110, "Paralegal", 85000, 5),
    (120, "Technical Support", 65000, 6),
    (130, "Head of Sales", 105000, 7),
    (140, "Sales Associate", 95000, 7)
;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    ("Kelvin", "Cracker", 10, NULL),
    ("Mitchel", "Trickey", 20, 1),
    ("Zac", "Collard", 30, NULL),
    ("Nick", "Niel", 40, 3),
    ("Steven", "Gibbs", 50, 3),
    ("Tiahna", "Hubbard", 60, NULL),
    ("Jerry", "Dilger", 70, 6),
    ("Dale", "Braniff", 80, NULL),
    ("Kyle", "Hope", 90, 8),
    ("Emma", "Walter", 100, 8),
    ("James", "Mikler", 110, NULL)
    ("Brodee", "Hoare", 120, 11)
    ("Darcy", "Lahey", 130, NULL)
    ("Michael", "Dun", 140, 13)
;
   