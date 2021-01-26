const multer = require('multer');
const path = require('path');
const uploadDir = path.join(__dirname, 'assets', 'uploads');

// Filter file uploads to images only
const imageFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb('Please upload only images.', false);
	}
};

// Set upload storage and filename
const storage = multer.diskStorage({
	destination: uploadDir,
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}_rtsph_${file.originalname}`);
	},
	limits: {
		fileSize: 8000000,
	},
});

// Set up multer
const uploadFile = multer({
	storage: storage,
	fileFilter: imageFilter,
	limits: {
		fileSize: 8000000,
	},
});

module.exports = uploadFile;
