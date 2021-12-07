SELECT date FROM day_item
WHERE user_id = 1
GROUP BY date
ORDER BY date ASC