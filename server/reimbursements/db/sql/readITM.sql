SELECT
	ITM._itemId,
    ITM.item,
    ITM.qty,
    ITM.cost,
FROM
	items AS ITM
WHERE
	ITM._reimbursementId = ?;