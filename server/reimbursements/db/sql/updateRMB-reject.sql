UPDATE
    reimbursements
SET
    status = 0,
    rejectionDate = NOW(),
    updatedDate = NOW()
WHERE
    _reimbursementId = ?