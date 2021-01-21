SELECT
    USR._userId
FROM users AS USR
WHERE
    DEV._devId = ?
    AND
    USR.authority = 1;