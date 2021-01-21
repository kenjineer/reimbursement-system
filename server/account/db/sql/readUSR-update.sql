SELECT
	USR.nickname,
    USR.username,
    USR.password
FROM users AS USR
WHERE
	USR._userId = ?;