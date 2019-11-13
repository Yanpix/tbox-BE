const User = require('../models/User');
const Project = require('../models/Project');
const util = require('util');
const userRole = require('../auth/userRole');
const appPaths = require('../helpers/app_paths');
const technologiesList = JSON.parse(JSON.stringify(require('../models/technologies.json')));
const backendTechnologyList = technologiesList.Web.Backend;
const frontendTechnologyList = technologiesList.Web.Frontend;
const mobileTechnologyList = technologiesList.Mobile;
const durationList = JSON.parse(JSON.stringify(require('../models/duration.json')));


exports.index_get = async function (req, res, next) {
  let models = await Project.find()
    .where('status').equals('Published')
    .exec();

  let modelsIdsArray = models.map((model) => {
    return model._id
  });
  let modelsIds = JSON.stringify(modelsIdsArray);

  res.render('site/index.ejs', {
    title: '',
    user: req.user,
    models: models,
    models_ids: modelsIds,
    backend_technology: null,
    frontend_technology: null,
    mobile_technology: null,
    duration: null,
    backendTechnologyList: backendTechnologyList,
    frontendTechnologyList: frontendTechnologyList,
    mobileTechnologyList: mobileTechnologyList,
    durationList: durationList,
    uploaded_images_path: appPaths.getUploadedImagesUrl(),
    static_images_path: appPaths.getStaticImagesUrl(),
    userRole: userRole.ADMIN,
    session_string: util.inspect(req.session),
    user_string: util.inspect(req.user),
  });
}

exports.index_post = async function (req, res, next) {
  console.log('req.body.duration', req.body.duration);
  console.log('req.body.backend_technology', req.body.backend_technology);
  console.log('req.body.frontend_technology', req.body.frontend_technology);
  console.log('req.body.mobile_technology', req.body.mobile_technology);

  let models = await Project.find()
    .where('status').equals('Published')
    .where('backend_technology').in(req.body.backend_technology)
    .where('frontend_technology').in(req.body.frontend_technology)
    .where('mobile_technology').in(req.body.mobile_technology)
    .where('duration').in(req.body.duration)
    .exec();

  console.log('models n', models.length);

  let modelsIdsArray = models.map((model) => {
    return model._id
  });
  let modelsIds = JSON.stringify(modelsIdsArray);

  res.render('site/index.ejs', {
    title: '',
    user: req.user,
    models: models,
    models_ids: modelsIds,
    backend_technology: req.body.backend_technology,
    frontend_technology: req.body.frontend_technology,
    mobile_technology: req.body.mobile_technology,
    duration: req.body.duration,
    backendTechnologyList: backendTechnologyList,
    frontendTechnologyList: frontendTechnologyList,
    mobileTechnologyList: mobileTechnologyList,
    durationList: durationList,
    uploaded_images_path: appPaths.getUploadedImagesUrl(),
    static_images_path: appPaths.getStaticImagesUrl(),
    userRole: userRole.ADMIN,
    session_string: util.inspect(req.session),
    user_string: util.inspect(req.user),
  });
}

exports.login = function (req, res, next) {
  res.render('site/login.ejs');
}

exports.logout = function (req, res, next) {
  req.logOut();
  res.redirect('/site/login');
}