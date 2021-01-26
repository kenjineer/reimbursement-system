SELECT
    USR._userId,
    USR._devId,
    USR.authority
FROM users AS USR
WHERE
    USR._userId = ?;