var fs = require('fs')

var dapth = './public/db.json';

exports.findAll = function(callback) {
    fs.readFile(dapth, 'utf-8', function(err, data) {
        if (err) {
            callback(err);
        }
        callback(null, JSON.parse(data).students)
    })
}


exports.save = function(student, callback) {
    fs.readFile(dapth, 'utf-8', function(err, data) {
        if (err) {
            callback(err);
        }
        var students = JSON.parse(data).students;

        student.id = students.length > 0 ? parseInt(students[students.length - 1].id) + 1 : 1;
        students.push(student);

        var fileData = JSON.stringify({
            students: students
        })

        fs.writeFile(dapth, fileData, function(err, data) {
            if (err) {
                return callback(err);
            }
            callback(null)
        })
    })
}

exports.find = function(id, callback) {
    fs.readFile(dapth, 'utf-8', function(err, data) {
        if (err) {
            callback(err);
        }
        var students = JSON.parse(data).students;
        var student = students.find((item) => {
            return item.id == id;
        })
        callback(null, student)
    })
}

exports.update = function(student, callback) {
    fs.readFile(dapth, 'utf-8', function(err, data) {
        if (err) {
            callback(err);
        }
        var students = JSON.parse(data).students;

        students.forEach((item) => {
            if (item.id == student.id) {
                Object.assign(item, student)
                return;
            }
        })

        var fileData = JSON.stringify({
            students: students
        })

        fs.writeFile(dapth, fileData, function(err, data) {
            if (err) {
                return callback(err);
            }
            callback(null)
        })
    })
}

exports.del = function(student, callback) {
    fs.readFile(dapth, 'utf-8', function(err, data) {
        if (err) {
            callback(err);
        }
        var students = JSON.parse(data).students;

        var ix = students.findIndex((item) => {
            return item.id == student.id;
        })

        students.splice(ix, 1);

        var fileData = JSON.stringify({
            students: students
        })

        fs.writeFile(dapth, fileData, function(err, data) {
            if (err) {
                return callback(err);
            }
            callback(null)
        })
    })
}