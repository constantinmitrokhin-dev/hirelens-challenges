
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { User } = require('../db').conn.models;

const authenticateJWT = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) return res.status(401).json({ error: "No token provided" });

	const token = authHeader.split(' ')[1];
	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(403).json({ error: "Your session has expired." });
	}
};

const authorizeUserAccess = async (req, res, next) => {
	try {
		const { id } = req.user; // from JWT
		const user = await User.findByPk(id);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (req.params.userId && parseInt(req.params.userId) !== user.id) {
			return res.status(403).json({ error: "Not authorized to access this resource" });
		}

		next();
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
}

module.exports = {
	authorizeUserAccess,
	authenticateJWT
}
