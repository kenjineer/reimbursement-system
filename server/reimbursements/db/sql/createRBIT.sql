INSERT INTO
    reimbursementitems
    (
        _reimbursementId,
        item,
        qty,
        cost,
        approved,
        createdDate,
        updatedDate
    )
VALUES
    (?, ?, ?, ?, 0, NOW(), NOW());
