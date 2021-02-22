DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league

CREATE TABLE league (
    id SERIAL PRIMARY KEY,    
    league_name TEXT NOT NULL,
    season_start DATE,
    season_end DATE
);

INSERT INTO league
    (league_name, season_start, season_end)
VALUES
    ('champions', '2021-04-05', '2021-12-05');

CREATE TABLE team (
    id SERIAL PRIMARY KEY,
    team_name TEXT NOT NULL,
    points INT,
    roster_id INT REFERENCES roster
);

CREATE TABLE roster (
    id SERIAL PRIMARY KEY,
    goalkeeper INT REFERENCES players,
    midfielder INT REFERENCES players,
    forward INT REFERENCES players
);

INSERT INTO roster
    (goalkeeper, midfielder, forward)
VALUES
    (1, 2, 3),
    (4, 5, 6),
    (7, 8, 9),
    (10, 11, 12);

INSERT INTO team
    (team_name, points, roster_id)
VALUES
    ('Barcelona FC', 0, 1),
    ('Real Madrid', 0, 2),
    ('Inter', 0, 3),
    ('Liverpool FC', 0, 4);

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    age INT,
    yellow_cards INT,
    red_cards INT
);

CREATE TABLE match (
    id SERIAL PRIMARY KEY,
    team_1_id INT REFERENCES team,
    team_2_id INT REFERENCES team,
    referee_id INT REFERENCES referees,
    date_of_match DATE,
    yellow_card_player_id INT REFERENCES players,
    red_card_player_id INT REFERENCES players
);

CREATE TABLE score (
    id SERIAL PRIMARY KEY,
    match_id INT REFERENCES match,
    goal_player_id INT REFERENCES players,
    goal_minute INT
);

CREATE TABLE referees (
    id SERIAL PRIMARY KEY,
    ref_first_name TEXT NOT NULL,
    ref_last_name TEXT NOT NULL
);

INSERT INTO players
    (first_name, last_name, age, yellow_cards, red_cards)
VALUES
    ('Diego', 'Maradona', 12, 0, 0),
    ('Cristiano', 'Ronaldo', 0, 0, 0),
    ('Sergio', 'Puyol', 0, 0, 0),
    ('Niño', 'Torres', 2, 0, 0),
    ('Anthony', 'Griezman', 2, 0, 0),
    ('Christian', 'Muller', 0, 1, 1),
    ('Sergio', 'Ramos', 0, 4, 2),
    ('Juan', 'Forini', 2, 0, 0),
    ('Robert', 'Jones', 1, 0, 0),
    ('Rene', 'Higuita', 0, 0, 2),
    ('Luc', 'Smith', 2, 0, 0),
    ('Mark', 'Anthony', 1, 0, 0);





INSERT INTO match
    (team_1_id, team_2_id, referee_id, date_of_match, yellow_card_player_id, red_card_player_id)
VALUES
    (21, 24, 1, '2021-04-05', NULL, NULL),
    (23, 22, 2, '2021-04-07', 3, 2),
    (22, 24, 2, '2021-04-09', 1, 1),
    (21, 23, 1, '2021-04-11', 3, 5);

INSERT INTO score 
    (match_id, goal_player_id, goal_minute)
VALUES
    (1, 1, 22),
    (1, 1, 25),
    (1, 1, 78),
    (2, , 22),
    (1, 1, 22),
    (1, 1, 22),
    (1, 1, 22),

INSERT INTO referees
    (ref_first_name, ref_last_name)
VALUES
    ('Jorge', 'Robledo'),
    ('John', 'Dunne'), 
    ('Mario', 'Converti');

-- QUERIES --
select team_name, goalkeeper, midfielder, forward FROM team JOIN                          
roster ON team.roster_id=roster.id JOIN players ON roster.goalkeeper = players.id;

select team.team_name, roster.goalkeeper, roster.midfielder, roster.forward, players.first_name, players.last_name FROM team
JOIN roster ON team.roster_id = roster.id
JOIN players ON roster.goalkeeper = players.id;

-- WEIRDNESS ALERT:--
SELECT team.team_name, roster.goalkeeper, players.first_name, players.last_name, 
roster.midfielder, players.first_name, players.last_name,
roster.forward, players.first_name, players.last_name FROM team JOIN roster ON team.roster_id=roster.id
JOIN players ON roster.goalkeeper=players.id;

-- CAN'T DISPLAY THE TEAM NAME AND THE NAMES OF ITS PLAYERS BY POSITION IN ROSTER
