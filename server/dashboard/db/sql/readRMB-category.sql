SELECT
	CTG.categoryName,
    COUNT(*) AS total,
    CONCAT(ROUND(COUNT(*) * 100/(
    SELECT
		COUNT(*)
	FROM
		reimbursements AS RMB
		INNER JOIN categories AS CTG
		ON RMB._categoryId = CTG._categoryId
	WHERE
		RMB._userId = ?
		AND
		RMB._managerId = ?
		AND
		NOT ISNULL(RMB.approved)
	GROUP BY
		CTG.categoryName
    ), 2), "%") AS percentage
FROM
	reimbursements AS RMB
	INNER JOIN categories AS CTG
    ON RMB._categoryId = CTG._categoryId
WHERE
	RMB._userId = ?
    AND
    RMB._managerId = ?
    AND
    NOT ISNULL(RMB.approved)
GROUP BY
	CTG.categoryName;