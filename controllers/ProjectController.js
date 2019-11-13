const fs = require('fs');
const scoreLevelList = JSON.parse(JSON.stringify(require('../models/score_level.json')));
const technologiesList = JSON.parse(JSON.stringify(require('../models/technologies.json')));
const backendTechnologyList = technologiesList.Web.Backend;
const frontendTechnologyList = technologiesList.Web.Frontend;
const mobileTechnologyList = technologiesList.Mobile;
const durationList = JSON.parse(JSON.stringify(require('../models/duration.json')));
const statusList = JSON.parse(JSON.stringify(require('../models/status.json')));
const pdfExporter = require('../helpers/project_pdf_exporter');

const Project = require('../models/Project');

// Показать список всех юзеров.
exports.project_list = function (req, res) {
    Project.find()
        // .sort([['updated_at', 'descending']])
        .sort([
            ['updated_at', -1]
        ])
        .exec(function (err, projects) {
            // if (err) return handleError(err);
            if (err) return res.send(err);

            res.render('projects/index.ejs', {
                user: req.user,
                models: projects,
            });
        });
};

// Показать подробную страницу для данного проекта.
exports.project_detail = function (req, res) {
    Project.findById(req.params.id)
        .exec(function (err, model) {
            // if (err) return handleError(err);
            if (!model) return res.sendStatus(404);
            if (err) return res.send(err);

            res.render('projects/view.ejs', {
                user: req.user,
                model: model,
            });
        });
};

// Показать форму создания проекта по запросу GET.
exports.project_create_get = function (req, res) {
    model = new Project();

    res.render('projects/create.ejs', {
        model: model,
        user: req.user,
        scoreLevelList: scoreLevelList,
        backendTechnologyList: backendTechnologyList,
        frontendTechnologyList: frontendTechnologyList,
        mobileTechnologyList: mobileTechnologyList,
        durationList: durationList,
        statusList: statusList,
    });
};

// Создать проект по запросу POST.
exports.project_create_post = function (req, res) {

    model = new Project(req.body);

    if (req.files) {
        model.addUploadFiles(req.files)
    }

    model.save(function (err, savedModel) {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        return res.redirect('/projects');
        return res.status(200).json(savedModel);
    });

    // console.log('Body:', req.body);
    // console.log('Files:', req.files);

    // return res.json(req.body);
};

// Показать форму удаления проекта по запросу GET.
exports.project_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Project delete GET Project detail: ' + req.params.id);
};

// Удалить проект по запросу POST.
exports.project_delete_post = function (req, res) {
    Project.findByIdAndRemove(req.params.id)
        .exec(function (err, model) {
            if (!model) return res.sendStatus(404);
            if (err) return res.send(err);

            res.redirect('/projects');
        });
};

// Показать форму обновления проекта по запросу GET.
exports.project_update_get = function (req, res) {

    Project.findById(req.params.id)
        .exec(function (err, model) {
            // if (err) return handleError(err);
            if (!model) return res.sendStatus(404);
            if (err) return res.send(err);

            res.render('projects/update.ejs', {
                model: model,
                user: req.user,
                scoreLevelList: scoreLevelList,
                backendTechnologyList: backendTechnologyList,
                frontendTechnologyList: frontendTechnologyList,
                mobileTechnologyList: mobileTechnologyList,
                durationList: durationList,
                statusList: statusList,
            });
        });
};

// Обновить проект по запросу POST.
exports.project_update_post = function (req, res) {

    Project.findByIdAndUpdate(req.params.id, req.body, function (err, model) {

        // if (err) return handleError(err);
        if (!model) return res.sendStatus(404);
        if (err) return res.send(err);

        // attach uploaded files
        if (req.files) {
            model.addUploadFiles(req.files)
        }

        model.save(function (err, savedModel) {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            return res.redirect('/projects');
        });
    });

};


// Показать PDF файл проекта.
exports.project_pdf_get = async function (req, res) {

    let model = await Project.findById(req.params.id);
    if (!model) return res.sendStatus(404);
    let pdf = await pdfExporter.getPdf(model);

    // download (save as file)
    // return res.download(pdf);

    // open pdf file in new window by browser`s tools
    let stat = fs.statSync(pdf);
    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Length': stat.size
    });
    var readStream = fs.createReadStream(pdf);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
};


// Показать PDF превью проекта.
exports.project_pdf_preview_get = async function (req, res) {

    let model = await Project.findById(req.params.id);
    if (!model) return res.sendStatus(404);
    html = await pdfExporter.getHtml(model);

    return res.end(html);
};


// Показать PDF файл всех проектов.
exports.project_pdf_all_get = async function (req, res) {

    let models = await Project.find().exec();
    let pdf = await pdfExporter.getPdfForModels(models);

    // download (save as file)
    // return res.download(pdf);

    // open pdf file in new window by browser`s tools
    let stat = fs.statSync(pdf);
    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Length': stat.size
    });
    var readStream = fs.createReadStream(pdf);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
};


// Показать PDF превью всех проектов.
exports.project_pdf_preview_all_get = async function (req, res) {

    let models = await Project.find().exec();
    html = await pdfExporter.getHtmlForAll(models);

    return res.end(html);
};


// Показать PDF файл для отфильтрованных проектов.
exports.project_pdf_customs_post = async function (req, res) {
    let modelIds = JSON.parse(req.body.models_ids);
    let models = [];

    try {
        // models = await Project.find({
        //     '_id': { $in: modelIds }
        // });
        models = await Project.find()
            .where('_id').in(modelIds)
            .exec()

    } catch (error) {
        console.error(error);
        return res.sendStatus(404);
    }

    if (!models || models.length == 0) return res.sendStatus(404);

    let pdf = await pdfExporter.getPdfForModels(models);

    // download (save as file)
    // return res.download(pdf);

    // open pdf file in new window by browser`s tools
    let stat = fs.statSync(pdf);
    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Length': stat.size
    });
    let readStream = fs.createReadStream(pdf);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
};