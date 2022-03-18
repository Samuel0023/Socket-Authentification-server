const usersGet = (req, res) => {
    res.json({
        msg: 'GET API - Controller'
    });
};

const usersPost = (req, res) => {
    //const body = req.body;
    const { nombre, edad } = req.body
    res.json({
        msg: 'POST API - Controller',
        nombre,
        edad
    });
};

const usersPut = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'PUT API - Controller',
        id
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