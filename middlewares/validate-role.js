const isAdminRole = async(req, res, next) => {
    if (!req.userAuth) {
        return res.status(500).json({
            msg: 'you want to validate the role before the token'
        });
    }

    let { name, role } = req.userAuth;

    if (role != "ADMIN_ROLE") {
        return res.status(401).json({
            msg: `The user: ${name} is'nt an Admin`
        });
    }

    next();
};

const hasARole = (...roles) => {

    return (req, res, next) => {
        if (!req.userAuth) {
            return res.status(500).json({
                msg: 'you want to validate the role before the token'
            });
        }

        let { name, role } = req.userAuth;

        if (!roles.includes(role)) {
            return res.status(401).json({
                msg: `The user: ${name} does'nt have the permissions`
            });
        }
        next();
    }
}
module.exports = { isAdminRole, hasARole };