DELETE FROM
	reimbursementitems
WHERE
	_reimbursementId in (?);

DELETE FROM
	reimbursements
WHERE
	_reimbursementId in (?);