UPDATE
    reimbursements
SET
    status = 2,
    approvalDate = NOW(),
    updatedDate = NOW()
WHERE
    _reimbursementId = ?