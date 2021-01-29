SELECT
	RMB._reimbursementId,
	TRIM(CONCAT_WS(" ", USR.firstname, USR.middlename, USR.lastname, USR.suffix)) AS employeeName,
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
	INNER JOIN users AS USR
	ON RMB._userId = USR._userId
WHERE
	RMB._managerId = ?;