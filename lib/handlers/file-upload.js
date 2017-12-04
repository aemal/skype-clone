const multiparty = require('multiparty');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

function incomingForm(req, res, next) {
    var name = '';
    var form = new multiparty.Form();
    form.uploadDir = __dirname + '/../../public/avatars';
    form.maxFieldsSize = 1 * 1024 * 1024; // Memory size
    form.maxFilesSize = 1 * 1024 * 1024;

    form.on('error', (err) => {
        res.header('Connection', 'close');
        res.status(413).send(err.message);
        next(err);
    });

    //Parts are emitted when parsing the form
    form.on('part', function(part) {

        var type = part.headers['content-type'];
        var size = part.byteCount - part.byteOffset;

        if (part.filename && type === 'image/jpeg' || type === 'image/png' || type === 'image/gif') {

            name = uuidv1() + '_' + Date.now() + '-' + part.filename;
            var path = form.uploadDir + "/" + name;
            req.filename = name;
            req.files = part;
            part.pipe(fs.createWriteStream(path));

            if (size > form.maxFilesSize) {
                form.emit('error', new Error('File size is bigger than 1MB...'));
                part.pipe(fs.createWriteStream('/dev/null'));
                part.resume();
                return;
            }

        } else {
            form.emit('error', new Error('Only image files are allowed...'));
            part.pipe(fs.createWriteStream('/dev/null'));
            part.resume();
            return;
        }

        part.on('error', function(err) {
            form.emit(err)
        });

    }).on('progress', (bytesReceived, bytesExpected) => {

        if (bytesReceived === 44 && bytesExpected === 44) {
            form.emit('error', new Error('No file is chosen...'));
        }

        var percent = (bytesReceived / bytesExpected * 100) | 0;
        process.stdout.write('Uploading: %' + percent + '\r');
        console.log();
    }).on('close', () => {
        res.send('File Uploaded');
    });

    // form.parse(req);
    next();
};

module.exports = incomingForm;
