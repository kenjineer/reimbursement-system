SELECT
	RMB._reimbursementId,
	CTG._categoryId,
	CTG.categoryName,
	RMB.purpose,
	RMB.totalCost,
	RMB.plannedDate,
	RMB.status,
	RMB.approvalDate,
	RMB.rejectionDate,
	RMB.releaseDate,
	RMB.remarks,
	RMB.createdDate
FROM
	reimbursements AS RMB
	INNER JOIN categories AS CTG
	ON RMB._categoryId = CTG._categoryId
WHERE
	RMB._userId = ?;