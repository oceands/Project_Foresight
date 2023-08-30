--SELECT ALL THE TABLES
SELECT * FROM roles;
SELECT * FROM tokenblocklist;
SELECT * FROM user_roles;
SELECT * FROM users;

--DROP ALL TABLES
Drop TABLE roles, tokenblocklist, user_roles,users;
Drop TABLE roles, tokenblocklist, user_roles,users;
Drop TABLE roles, tokenblocklist, user_roles,users; --Saim making pull request here
Drop TABLE roles, tokenblocklist, user_roles,users; --sims first commit
--MANUALLY LINK USERS AND ROLES
INSERT INTO user_roles (user_id, role_id) VALUES (1, 1); -- Admin user
INSERT INTO user_roles (user_id, role_id) VALUES (2, 2); -- Regular user