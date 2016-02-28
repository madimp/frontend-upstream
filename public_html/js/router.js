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

    session.fetch();

    var loginView = new LoginView({
        session: session
    });

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
