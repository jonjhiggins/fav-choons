SELECT username, count(username) FROM track
INNER JOIN day_item 
ON track.id = day_item.track_id 
AND track.id = 1
INNER JOIN app_user ON day_item.user_id = app_user.id
GROUP BY username