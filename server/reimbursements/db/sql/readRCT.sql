SELECT
    RCT._receiptId,
    RMB._reimbursementId,
    RCT.fileName,
    RCT.image
FROM
	receipts AS RCT
    INNER JOIN reimbursements AS RMB
    ON RCT._reimbursementId = RMB._reimbursementId
WHERE
	RMB._reimbursementId = ?
    AND
    RMB._userId = ?;
