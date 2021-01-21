SELECT
    RCT._receiptId,
    RCT.type,
    RCT.fileName,
    RCT.image
FROM
	receipts AS RCT
WHERE
	RCT._reimbursementId = ?;
