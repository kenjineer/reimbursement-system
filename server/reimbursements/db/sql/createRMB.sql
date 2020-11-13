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
        remarks,
        createdDate,
        updatedDate
    )
VALUES
(?, ?, ?, ?, ?, ?, NULL, NULL, NULL, NULL, ?, NOW(), NOW());