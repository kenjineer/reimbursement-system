SELECT
	RMB._reimbursementId,
    RMB._userId,
    TRIM(CONCAT_WS(" ", USR.firstname, USR.middlename, USR.lastname, USR.postfix)) AS employeeName,
    RMB._managerId,
    TRIM(CONCAT_WS(" ", MGR.firstname, MGR.middlename, MGR.lastname, MGR.postfix)) AS managerName,
    CTG._categoryId,
    CTG.categoryName,
    RMB.purpose,
    RMB.totalCost,
    RMB.plannedDate,
    RMB.approved,
    RMB.submittedDate,
    RMB.approvalDate,
    RMB.rejectionDate,
    RMB.remarks,
    RMB.createdDate,
    RMB.updatedDate
FROM
	reimbursements AS RMB
    INNER JOIN users AS USR
    ON RMB._userId = USR._userId
    INNER JOIN users AS MGR
    ON RMB._managerId = MGR._userId
    INNER JOIN categories AS CTG
    ON RMB._categoryId = CTG._categoryId
WHERE
	RMB._userId = ?;