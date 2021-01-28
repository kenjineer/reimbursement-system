UPDATE
	items
SET
	item = ?,
	qty = ?,
	cost = ?,
	updatedDate = NOW()
WHERE
	_itemId = ?
	AND
	_reimbursementId = ?;