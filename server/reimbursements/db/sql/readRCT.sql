SELECT
    _receiptId,
    _reimbursementId,
    fileName,
    image
FROM
    receipts
WHERE
    _reimbursementId = ?;
