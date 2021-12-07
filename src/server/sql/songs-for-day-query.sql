SELECT 
	track.title,
	artist.title
FROM day_item
INNER JOIN track ON track.id = track_id
INNER JOIN artist ON artist.id = artist_id
WHERE day_item.user_id = 1
AND date = '2021-12-06'
