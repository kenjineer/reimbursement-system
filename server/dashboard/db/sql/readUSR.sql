SELECT
    USR._userId,
    DEV.devName,
    OFC.officeCode,
    POS.positionName,
    USR.firstname,
    USR.middlename,
    USR.lastname,
    USR.suffix,
    USR.username,
    USR.email,
    USR.gender
FROM users AS USR
    INNER JOIN devs AS DEV
    ON USR._devId = DEV._devId
    INNER JOIN offices AS OFC
    ON USR._officeId = OFC._officeId
    INNER JOIN positions AS POS
    ON USR._positionId = POS._positionId
WHERE
    USR._userId = ?;