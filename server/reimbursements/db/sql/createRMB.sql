INSERT INTO
    reimbursements
    (
        _userId,
        _managerId,
        _categoryId,
        purpose,
        totalCost,
        plannedDate,
        approved,
        submittedDate,
        approvalDate,
        rejectionDate,
        createdDate,
        updatedDate
    )
VALUES
(?, ?, ?, ?, ?, ?, NULL, NULL, NULL, NULL, NOW(), NOW());