const { validationResult } = require('express-validator/check');

const db = require('../util/database');

const getId = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ msg: errors.array()[0].msg });
    }
    try {
        const [result] = await db.execute('SELECT id FROM users WHERE username = ?', [req.body.username]);
        req.u_id = result[0].id;
        next();
    }
    catch (error) {
        new Error(error);
    }
}

module.exports = getId;