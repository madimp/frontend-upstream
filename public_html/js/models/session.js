define([
    'backbone'
], function (
    Backbone
) {

    var SessionModel = Backbone.Model.extend({
        url: '/api/v1/session',

        isAuth: function(){
            return !!this.id;
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

    return new SessionModel;

});
