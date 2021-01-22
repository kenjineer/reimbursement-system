SELECT
    USR._userId
FROM users AS USR
WHERE
    USR._devId = ?
    AND
    USR.authority = 1;