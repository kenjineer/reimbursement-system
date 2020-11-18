SELECT
	RBIT._itemId,
    RMB._reimbursementId,
    RBIT.item,
    RBIT.qty,
    RBIT.cost,
    RBIT.approved,
    RBIT.createdDate,
    RBIT.updatedDate
FROM
	reimbursementitems AS RBIT
    INNER JOIN reimbursements AS RMB
    ON RBIT._reimbursementId = RMB._reimbursementId
WHERE
	RMB._reimbursementId = ?
    AND
    RMB._userId = ?;