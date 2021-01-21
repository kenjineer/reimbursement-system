SELECT
	COUNT(*) AS cnt
FROM
	reimbursements AS RMB
WHERE
	RMB._userId = ?
    AND
    RMB.status = 0
ORDER BY
	RMB.createdDate;