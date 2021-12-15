INSERT into app_user(username) 
VALUES 
    ('jon'),
    ('jane'), 
    ('peter'), 
    ('trevor');
INSERT into artist(title) 
VALUES 
    ('Prince'),
    ('Tears for Fears'),
    ('Whitney Houston');
INSERT into track(artist_id, title) 
VALUES
    (1, 'Purple rain'),
    (1, 'Strawberry beret'),
    (1, 'Little red corvette'),
    (2, 'Everybody wants to rule the world'),
    (2, 'Mad world'),
    (3, 'I wanna dance with somebody'),
    (3, 'Thinking about you (Extended dance version)');
INSERT into day_item(user_id, track_id)
VALUES
    (1, 1),
    (1, 4),
    (1, 7),
    (2, 4),
    (2, 5),
    (3, 3),
    (3, 2),
    (3, 1);

