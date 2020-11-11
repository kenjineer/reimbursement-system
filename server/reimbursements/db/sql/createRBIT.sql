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
    (?, ?, ?, ?, NULL, NOW(), NOW());
