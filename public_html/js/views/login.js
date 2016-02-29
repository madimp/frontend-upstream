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
            this.session = options.session;
        },
        render: function () {
            this.login = new LoginForm({
                session: this.session
            });
            this.$el.append(this.login.$el);
        },
        show: function () {
            this.render();
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
            if (this.login) {
                this.login.destroy();
            }
        }

    });

    return View;
});