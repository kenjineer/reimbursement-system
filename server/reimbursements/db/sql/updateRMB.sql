UPDATE
	reimbursements
SET
	_categoryId = ?,
	purpose = ?,
	totalCost = ?,
	plannedDate = ?,
	remarks = ?,
	updatedDate = NOW()
WHERE
	_reimbursementId = ?
    AND
    _userId = ?;