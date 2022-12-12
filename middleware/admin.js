module.exports = function (req, res, next) {
    console.log(`req.user id: ${req.user._id}`);
    if (!req.user.isAdmin) {
        return res.status(403).send("Access denied.");
    }
    next();
}