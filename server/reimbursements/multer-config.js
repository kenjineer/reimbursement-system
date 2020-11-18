const multer = require('multer');
const path = require('path');
const uploadDir = path.join(__dirname, 'assets', 'uploads');

const imageFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb('Please upload only images.', false);
	}
};

const storage = multer.diskStorage({
	destination: uploadDir,
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}_arsys_${file.originalname}`);
	},
	limits: {
		fileSize: 8000000,
	},
});

const uploadFile = multer({
	storage: storage,
	fileFilter: imageFilter,
	limits: {
		fileSize: 8000000,
	},
});

module.exports = uploadFile;
