const controller = {
    list: function(req, res, next) {
        res.render('./admin/admin');
    },
    create: function(req, res, next) {
        res.render('./admin/create');
    },
    edit: function(req, res, next) {
        res.render('./admin/edit');
    },
};

module.exports = controller;