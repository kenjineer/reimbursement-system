SELECT
	USR._userId,
    DEV.devName,
    OFC.officeName,
    POS.positionName,
    TRIM(CONCAT_WS(" ", USR.firstname, USR.middlename, USR.lastname, USR.suffix)) AS managerName,
    USR.email
FROM users AS USR
	INNER JOIN devs AS DEV
    ON USR._devId = DEV._devId
    INNER JOIN offices AS OFC
    ON USR._officeId = OFC._officeId
    INNER JOIN positions AS POS
    ON USR._positionId = POS._positionId
WHERE
	USR._userId = ?;