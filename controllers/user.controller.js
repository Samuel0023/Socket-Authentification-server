const usersGet = (req, res) => {
    res.json({
        msg: 'GET API - Controller'
    });
};

const usersPost = (req, res) => {
    res.json({
        msg: 'POST API - Controller'
    });
};

const usersPut = (req, res) => {
    res.json({
        msg: 'PUT API - Controller'
    });
};

const usersPatch = (req, res) => {
    res.json({
        msg: 'PATCH API - Controller'
    });
};

const usersDelete = (req, res) => {
    res.json({
        msg: 'DELETE API - Controller'
    });
};




module.exports = { usersGet, usersPost, usersPut, usersPatch, usersDelete };