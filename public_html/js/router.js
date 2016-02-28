define([
    'backbone',
    'models/session',
    'views/login'
], function(
    Backbone,
    Session,
    LoginView
){

    var session = new Session();

    window.xsession = session;

    session.fetch();

    var loginView = new LoginView({
        session: session
    });

    loginView.$el.hide().appendTo('#page');

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            '*default': 'defaultActions'
        },
        defaultActions: function () {
            // TODO
        },
        scoreboardAction: function () {
            // TODO
        },
        gameAction: function () {
            // TODO
        },
        loginAction: function () {
            loginView.show();
        }
    });

    return new Router();
});
