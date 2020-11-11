SELECT
	CTG.categoryName,
    COUNT(*) AS total
FROM
	reimbursements AS RMB
	INNER JOIN categories AS CTG
    ON RMB._categoryId = CTG._categoryId
WHERE
	RMB._userId = ?
    AND
    RMB._managerId = ?
    AND
    RMB.approved = 1
GROUP BY
	CTG.categoryName;