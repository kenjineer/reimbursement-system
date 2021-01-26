SELECT
    _userId,
    password,
    authority
FROM
    users
WHERE
    _userId = ?;