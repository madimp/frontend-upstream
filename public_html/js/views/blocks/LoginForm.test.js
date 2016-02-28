define(function (require) {
    QUnit.module("views/blocks/LoginForm");

    QUnit.test("Проверяем отрисовку формы авторизации", function (assert) {

        var Backbone = require('backbone'),
            SessionModel = Backbone.Model.extend({
                url: '/'
            }),
            session = new SessionModel(),
            LoginForm = require('./LoginForm');

        var login = new LoginForm({
            session: session
        });

        assert.equal(login.$el.find('.js-form').length, 1, 'Присутствует форма');
        assert.equal(login.$el.find('.js-input-email, .js-input-password').length, 2, 'Присутствуют поля email и password');

        sinon.spy(session, 'save');
        login.$el.find('.js-form').submit();
        assert.ok(session.save.calledOnce, 'Форма вызывает save');

        session.trigger('invalid', 
            session,
            {
                email: 'reqired', 
                password: 'reqired'
            }
        );
        assert.notEqual(login.$el.find('.js-form-errors').html(), '', 'Показано сообщение об ошибке');

    });
});
