SELECT
	RMB._userId AS _employeeId,
	CTG.categoryName,
	RMB.purpose,
	RMB.totalCost,
	RMB.plannedDate,
	RMB.status,
	RMB.approvalDate,
	RMB.createdDate
FROM
	reimbursements AS RMB
	INNER JOIN categories AS CTG
	ON RMB._categoryId = CTG._categoryId
WHERE
	RMB._reimbursementId = ?
	AND
	RMB.status = 3;