/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res, next) {
        var device = req.param("device");
        if (device == "ios" || device == "android") {
            User.find().exec(function foundUsers(err, users) {
                if (err) next(err);
                return res.json(users);
            });
        } else {
            return res.json({"result":"Error! Device type is not compatible with this web service."})
        }
    },

    create: function (req, res, next) {
        var obj = req.allParams();
        User.findOne({
            Firstname: obj.Firstname,
            Lastname: obj.Lastname
        }).exec(function foundUser(err, user) {
            if (err) next(err);
            if (user) {
                return res.json({"result:":"User already exists in the system."});
                // return next("User already exists in the system.");
            }
            User.create(obj).exec(function createUser(err, user) {
                if (err) next(err);
                res.json(user);
            })
        });
	},

    deleteAll: function (req, res, next) {
        // User.destroy(categoryId, function(err) {
        //         if (err) next(err);
        //         res.ok();
        // })
    }
};

