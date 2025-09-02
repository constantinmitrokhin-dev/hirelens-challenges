
require('dotenv').config();
const server = require("./src/app.js");
const { conn, ensureDatabase } = require("./src/db.js");
const PORT = process.env.PORT;

// Syncing all the models at once.

ensureDatabase()
	.then(() => conn.sync({ alter: true }))
	.then(() => {
		server.listen(PORT, () => {
			console.log(`🚀 Server listening at ${PORT}`);
		});
	})
	.catch(err => {
		console.error("❌ Error starting server:", err);
	});

//! For Testing Only!
// ensureDatabase()
// 	.then(() => conn.sync({ force: true }))
// 	.then(() => {
// 		server.listen(PORT, () => {
// 			console.log(`🚀 Server listening at ${PORT}`);
// 		});
// 	})
// 	.catch(err => {
// 		console.error("❌ Error starting server:", err);
// 	});

