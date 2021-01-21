UPDATE
    users
SET
    nickname = ?,
    username = ?,
    password = ?,
    updatedDate = NOW()
WHERE
    _userId = ?;