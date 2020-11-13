UPDATE
	reimbursements
SET
	_categoryId = ?,
	purpose = ?,
	totalCost = ?,
	plannedDate = ?,
	submittedDate = ?,
	remarks = ?,
	updatedDate = NOW()
WHERE
	_reimbursementId = ?
    AND
    _userId = ?;