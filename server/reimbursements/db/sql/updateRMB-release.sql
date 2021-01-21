UPDATE
    reimbursements
SET
    status = 3,
    releaseDate = NOW(),
    updatedDate = NOW()
WHERE
    _reimbursementId = ?