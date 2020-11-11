UPDATE
	reimbursements
SET
	_categoryId = ?,
	purpose = ?,
	totalCost = ?,
	plannedDate = ?,
	submittedDate = ?,
	updatedDate = NOW()
WHERE
	_reimbursementId = ?
    AND
    _userId = ?;