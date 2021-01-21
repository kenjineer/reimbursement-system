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
    (?, ?, ?, ?, 0, NOW(), NOW());
