define([
    'backbone',
    'tmpl/login',
    'views/blocks/LoginForm'
], function(
    Backbone,
    tmpl,
    LoginForm
){

    var View = Backbone.View.extend({

        template: tmpl,
        initialize: function (options) {
            this.login = new LoginForm(options);
            this.render();
        },
        render: function () {
            this.$el.append(this.login.$el);
        },
        show: function () {
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        }

    });

    return View;
});