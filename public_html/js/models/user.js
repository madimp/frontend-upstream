define([
    'backbone',
    './session'
], function (
    Backbone,
    Session
) {

    var UserModel = Backbone.Model.extend({
        url: '/api/v1/user',
        idAttr: 'email',

        validate: Session.prototype.validate
    });

    return UserModel;

});
