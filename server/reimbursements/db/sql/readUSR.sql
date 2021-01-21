SELECT
    USR._devId,
FROM users AS USR
WHERE
    USR._userId = ?;