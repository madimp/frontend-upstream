define(function (require) {
    QUnit.module("models/session");

    QUnit.test("Валидация", function (assert) {

        var SessionModel = require('./session'),
            session = new SessionModel();

        assert.expect( 10 );

        assert.equal(session.validate({}), undefined, 'Ничего не просили валидировать, все ок');
        assert.deepEqual(session.validate({email: ''}), {email: 'required'}, 'Почта нужна');
        assert.deepEqual(session.validate({password: ''}), {password: 'required'}, 'Пароль обязателен');

        assert.deepEqual(
            session.validate({email: '', password: ''}),
            {email: 'required', password: 'required'},
            'Оба поля обязательны'
        );

        assert.deepEqual(session.validate({email: 'aaa'}), {email: 'invalid'}, 'Неверный ящик');
        assert.deepEqual(session.validate({email: 'aaa@sss'}), {email: 'invalid'}, 'Неверный ящик');
        assert.deepEqual(session.validate({password: 'ss'}), {password: 'invalid'}, 'Пароль коротковат');

        assert.deepEqual(session.validate({email: 'aaa@sss.ru'}), undefined, 'Неверный ящик');
        assert.deepEqual(session.validate({password: 'ssssss'}), undefined, 'Пароль ok');

        assert.deepEqual(session.validate({email: 'aaa@sss.ru', password: 'ssssss'}), undefined, 'все ok');
    });

    QUnit.test("проверка авторизаци - отсутствует", function ( assert ) {
        var server = sinon.fakeServer.create();

        var SessionModel = require('./session'),
            Backbone = require('backbone'),
            session = new SessionModel();

        session.fetch({
            complete: function(){
                assert.equal(session.isAuth(), false, 'Юзер авторизован');
                server.restore();
                done();
            }
        });

        server.requests[0].respond(
            401,
            { "Content-Type": "application/json" },
            JSON.stringify({})
        );
    });

    QUnit.test("проверка авторизаци - присутствует", function ( assert ) {
        var server = sinon.fakeServer.create();

        var SessionModel = require('./session'),
            Backbone = require('backbone'),
            session = new SessionModel();

        session.fetch({
            complete: function(){
                assert.equal(session.isAuth(), true, 'Юзер не авторизован');
                server.restore();
                done();
            }
        });

        server.requests[0].respond(
            200,
            { "Content-Type": "application/json" },
            JSON.stringify({id: 7})
        );
    });

    QUnit.test("авторизация", function ( assert ) {
        var server = sinon.fakeServer.create();

        var SessionModel = require('./session'),
            Backbone = require('backbone'),
            session = new SessionModel();

        session.set({
           email: 'aaa@aaa.aa',
           password: 'aaaa'
        });

        session.save(null, {
            complete: function(){
                assert.equal(session.isAuth(), true, 'Юзер не авторизован');
                server.restore();
                done();
            }
        });

        server.requests[0].respond(
            200,
            { "Content-Type": "application/json" },
            JSON.stringify({id: 7})
        );
    });

    QUnit.test("авторизация", function ( assert ) {
        var server = sinon.fakeServer.create();

        var SessionModel = require('./session'),
            Backbone = require('backbone'),
            session = new SessionModel();

        session.set({
           email: 'aaa@aaa.aa',
           password: 'aaaa'
        });

        session.save(null, {
            complete: function(){
                assert.equal(session.isAuth(), false, 'Юзер не авторизован');
                server.restore();
                done();
            }
        });

        server.requests[0].respond(
            400,
            { "Content-Type": "application/json" },
            JSON.stringify({})
        );
    });
});
