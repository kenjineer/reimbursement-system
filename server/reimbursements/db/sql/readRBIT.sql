SELECT
	_itemId,
    _reimbursementId,
    item,
    qty,
    cost,
    approved,
    createdDate,
    updatedDate
FROM
	reimbursementitems
WHERE
	_reimbursementId = ?;