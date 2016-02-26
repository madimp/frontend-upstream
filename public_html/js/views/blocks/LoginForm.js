define([
    'backbone',
    'tmpl/loginForm'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        events: {
            'submit .js-form': 'onSubmit',
            'input .js-input-email': 'onEmailInput',
            'input .js-input-password': 'onPasswordInput',
        },
        template: tmpl,
        initialize: function (options) {
            _.bindAll(this, 'onValidateError');

            this.session = options.session;
            this.session.on('invalid', this.onValidateError);

            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.session.toJSON()));
            this.$email = this.$el.find('.js-input-email');
            this.$password = this.$el.find('.js-input-password');
            this.$errors = this.$el.find('.js-form-errors');
        },
        getEmail: function() {
            return this.$email.val();
        },
        getPassword: function() {
            return this.$password.val();
        },
        onEmailInput: function() {
            var isValid = !this.session.validate({
                email: this.getEmail()
            });
            this.$email[isValid?'removeClass':'addClass']('invalid');
        },
        onPasswordInput: function() {
            var isValid = !this.session.validate({
                password: this.getPassword()
            });
            this.$password[isValid?'removeClass':'addClass']('invalid');
        },
        onSubmit: function(e) {
            /** 
             У модели не задан id, будет вызван POST
            */
            
            e.preventDefault();
            
            var _this = this;
            this.$errors.html();
            this.$email.removeClass('invalid');
            this.$password.removeClass('invalid');

            this.session.save({
                email: this.getEmail(),
                password: this.getPassword()
            }); // Save по умолчанию вызовет validate
        },
        onValidateError: function(model, error) {
            // Показываем ошибку ввода
            this.$errors.html(error);
        }
    });

    return View;
});