SELECT
    USR._userId,
    USR._devId
FROM users AS USR
WHERE
    USR._userId = ?;