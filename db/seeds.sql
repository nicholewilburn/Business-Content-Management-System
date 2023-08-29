USE business_db;

INSERT INTO department (dept_name)
VALUES (
    "Front of House"
),
(
    "Back of House"
);

INSERT INTO role (role_title, salary, department_id)
VALUES (
    "FoH Manager",
    "200",
    "1"
),
(
    "Waiter",
    "100",
    "1"
),
(
    "BoH Manager",
    "200",
    "2"
),
(
    "Cook",
    "100",
    "2"
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (
    "BigMan",
    "Upstairs",
    "1",
    "1"
),
(
    "Julia",
    "TakesYourOrder",
    "2",
    "1"
),
(
    "Gordon",
    "Ramsey",
    "3",
    "3"
),
(
    "Idiot",
    "Sandwich",
    "4",
    "3"
);