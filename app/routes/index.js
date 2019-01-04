module.exports = (application) => {
    application.get('/', (req, res) => {
        application.app.controllers.index.home(application,res,res);
    });
}