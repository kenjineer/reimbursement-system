SELECT
	RMB._reimbursementId,
    CTG.categoryName,
    RMB.purpose,
	RMB.totalCost,
    RMB.plannedDate,
	RMB.status,
    RMB.approvalDate,
    RMB.rejectionDate,
    RMB.releaseDate,
    RMB.createdDate
FROM
	reimbursements AS RMB
	INNER JOIN categories AS CTG
	ON RMB._categoryId = CTG._categoryId
WHERE
	RMB._userId = ?
    AND
    NOT RMB.status = 1
    AND
    MONTH(RMB.updatedDate) = MONTH(CURRENT_DATE())
    AND
    YEAR(RMB.updatedDate) = YEAR(CURRENT_DATE())
ORDER BY
	RMB.createdDate;