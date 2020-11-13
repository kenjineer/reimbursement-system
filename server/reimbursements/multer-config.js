const multer = require('multer');
const uploadDir = path.join(__dirname, 'assets', 'uploads');

const imageFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb('Please upload only images.', false);
	}
};

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadDir);
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}_arsys_${file.originalname}`);
	},
});

const uploadFile = multer({ storage: storage, fileFilter: imageFilter });

module.exports = uploadFile;
