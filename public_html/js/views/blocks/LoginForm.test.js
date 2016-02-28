define(function (require) {
    QUnit.module("views/blocks/LoginForm");

    var testValidValue = 'test@mail.ru';
    var testInvalidValue = 'test2@mail.ru';
    var loginView = function() {
        var Backbone = require('backbone');
        var LoginForm = require('./LoginForm');
        var SessionModel = Backbone.Model.extend({
            url: '/',
            sync: function(method, model, options) {
                setTimeout(function(){
                    if (
                        model.get('email') === testValidValue &&
                        model.get('password') === testValidValue
                    ) {
                        options.success({
                            id: 1
                        });
                    } else {
                        options.error();
                    }
                }, 0);
            },
            validate: function() {

            }
        });

        var session = new SessionModel();

        return new LoginForm({
            session: session
        });
    };

    QUnit.test("Проверяем отрисовку формы авторизации", function (assert) {
        var login = loginView();

        assert.equal(login.$el.find('.js-form').length, 1, 'Присутствует форма');
        assert.equal(login.$el.find('.js-input-email, .js-input-password').length, 2, 'Присутствуют поля email и password');
    });

    QUnit.test("Валидация формы", function (assert) {
        var login = loginView();

        login.session.trigger('invalid', 
            login.session,
            {
                email: 'reqired', 
                password: 'reqired'
            }
        );
        assert.notEqual(login.$el.find('.js-form-errors').html(), '', 'Показано сообщение об ошибке');

        login.clear();

        assert.equal(login.$el.find('.js-form-errors').html(), '', 'Скрыто сообщение об ошибке');
    });

    QUnit.test("Успешная авторизация", function (assert) {
        var login = loginView();

        sinon.spy(login.session, 'save');

        // Вводим корректные email + password
        login.$el.find('.js-input-email, .js-input-password').val(testValidValue);
        login.$el.find('.js-form').submit();
        assert.ok(login.session.save.calledOnce, 'Вызван метод save');

        var done = assert.async();
        login.on('success', function(){
            assert.ok( true, "Сработало событие success" );
            done();
        });
        login.on('error', function(){
            assert.ok( false, "Сработало событие error" );
            done();
        });
    });

    QUnit.test("Ошибочная авторизация", function (assert) {
        var login = loginView();

        sinon.spy(login.session, 'save');

        // Вводим корректные email + password
        login.$el.find('.js-input-email, .js-input-password').val(testInvalidValue);
        login.$el.find('.js-form').submit();
        assert.ok(login.session.save.calledOnce, 'Вызван метод save');

        var done = assert.async();
        login.on('success', function(){
            assert.ok( false, "Сработало событие success" );
            done();
        });
        login.on('error', function(){
            assert.ok( true, "Сработало событие error" );
            done();
        });
    });
});
