SELECT
	USR._userId,
    TRIM(CONCAT_WS(" ", USR.firstname, USR.middlename, USR.lastname, USR.suffix)) AS employeeName,
    USR.email,
    USR.gender
FROM users AS USR
WHERE
	USR._userId = ?;