define([
    'backbone'
], function (
    Backbone
) {

    var SessionModel = Backbone.Model.extend({
        url: 'http://private-4133d4-technopark.apiary-mock.com/api/session',

        initialize: function(){
            this.on('destroy', _.bind(function(){
                this.clear();
            }, this));
        },

        isAuth: function(){
            return this.id !== undefined;
        },

        validate: function(attrs, options){
            var keys = ['email', 'password'];
            var rules = {
                email: /^[^@]+@[^@]+\.[^@.]+$/,
                password: /^[a-zA-Z0-9]{3,}$/
            };

            var ok = true;
            var status = {};

            for (var i = 0; i < keys.length; i++){
                var key = keys[i];
                if (key in attrs && typeof attrs[key] === 'string'){
                    if (attrs[key] === ''){
                        status[key] = 'required';
                        ok = false;
                    } else if (rules[key] && !rules[key].test(attrs[key])){
                        status[key] = 'invalid';
                        ok = false;
                    }
                }
            }

            if (!ok){
                return status;
            }
        }
    });

    return SessionModel;

});
