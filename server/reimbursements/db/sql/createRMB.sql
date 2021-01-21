INSERT INTO
    reimbursements
    (
        _userId,
        _managerId,
        _categoryId,
        purpose,
        totalCost,
        plannedDate,
        status,
        approvalDate,
        rejectionDate,
        releaseDate,
        remarks,
        createdDate,
        updatedDate
    )
VALUES
(?, ?, ?, ?, ?, ?, 1, NULL, NULL, NULL, ?, NOW(), NOW());