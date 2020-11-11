SELECT
    USR._userId,
    USR._devId,
    DEV.devName,
    DEV.devCode,
    USR._officeId,
    OFC.officeName,
    OFC.officeCode,
    USR._positionId,
    POS.positionName,
    USR.firstname,
    USR.middlename,
    USR.lastname,
    USR.gender,
    USR.authority
FROM users AS USR
    INNER JOIN devs AS DEV
    ON USR._devId = DEV._devId
    INNER JOIN offices AS OFC
    ON USR._officeId = OFC._officeId
    INNER JOIN positions AS POS
    ON USR._positionId = POS._positionId
WHERE
    USR._userId = ?;