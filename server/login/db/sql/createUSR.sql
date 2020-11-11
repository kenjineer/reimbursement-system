INSERT INTO
    users (
		_userId,
        _devId,
		_officeId,
		_positionId,
        firstname,
        middlename,
		lastname,
		gender,
        username,
        email,
        password,
        authority,
        createdDate,
        updatedDate
    ) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW());