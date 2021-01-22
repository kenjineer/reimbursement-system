INSERT INTO
    items
    (
        _reimbursementId,
        item,
        qty,
        cost,
        createdDate,
        updatedDate
    )
VALUES
    (?, ?, ?, ?, NOW(), NOW());
