define([
    'backbone',
    './session'
], function (
    Backbone,
    Session
) {

    var UserModel = Backbone.Model.extend({
        url: '/api/v1/user',

        validate: Session.prototype.validate
    });

    return UserModel;

});
