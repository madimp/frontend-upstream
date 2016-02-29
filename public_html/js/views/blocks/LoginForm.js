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
            'input .js-input-password': 'onPasswordInput'
        },
        template: tmpl,
        initialize: function (options) {
            _.bindAll(this, 'onValidateError', 'clear', '_success', '_error');

            this.session = options.session;
            this.listenTo(this.session, 'invalid', this.onValidateError);

            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.session.toJSON()));
            this.$email = this.$el.find('.js-input-email');
            this.$password = this.$el.find('.js-input-password');
            this.$errors = this.$el.find('.js-form-errors');
            this.$form = this.$el.find('.js-form');
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
            
            this.clear();

            this.session.save({
                email: this.getEmail(),
                password: this.getPassword()
            }, {
                success: this._success,
                error: this._error
            });
        },
        onValidateError: function(model, error) {
            var message = [];
            var errorMap = {
                email: {
                    required: 'Обязательно укажите email',
                    invalid: 'Неверный формат email-адреса'
                },
                password: {
                    required: 'Пароль не указан',
                    invalid: 'Слишком короткий пароль'
                }
            }
            for (var i in error) {
                if (errorMap[i]) {
                    message.push(errorMap[i][ error[i] ]);
                }
            }
            this.$errors.html(message.join('<br />'));
        },
        clear: function() {
            this.$errors.html('');
            this.$email.removeClass('invalid');
            this.$password.removeClass('invalid');
        },
        _success: function() {
            this.trigger('success');
        },
        _error: function() {
            this.$errors.html('На сервере произошла ошибка');
            this.trigger('error');
        },
        destroy: function() {
            this.$el.remove();
        }
    });

    return View;
});