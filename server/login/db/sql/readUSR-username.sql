SELECT
    _userId,
    password,
    authority
FROM
    users
WHERE
    username = ?;