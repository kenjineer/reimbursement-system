SELECT
	COUNT(*) AS cnt
FROM
	reimbursements AS RMB
    INNER JOIN users AS USR
    ON RMB._userId = USR._userId
    INNER JOIN users AS MGR
    ON RMB._managerId = MGR._userId
    INNER JOIN categories AS CTG
    ON RMB._categoryId = CTG._categoryId
WHERE
	RMB._userId = ?
    AND
    RMB._managerId = ?
    AND
    RMB.approved = 0
ORDER BY
	RMB.createdDate;