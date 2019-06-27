var express = require('express')
var fs = require('fs')
var util = require('./util.js')

var router = express.Router()

router.get('/', function(req, res) {
    res.redirect('/students')
})

//render默认不能使用，但用模板引擎可以使用
router.get('/students', function(req, res) {
    util.findAll(function(err, students) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.render('boot.html', {
            fruits: [
                '苹果',
                '橘子',
                '石榴',
                '芒果'
            ],
            students: students,
            title: '首页'
        })
    })
})

router.get('/students/new', function(req, res) {
    res.render('new.html', {
        path: 'new'
    })
})

router.get('/students/edit', function(req, res) {
    util.find(req.query.id, function(err, student) {
        if (err) {
            return res.status(500).send('server error')
        }

        student.id = req.query.id;
        res.render('new.html', {
            student: student,
            path: 'edit'
        })
    })
})

router.get('/students/del', function(req, res) {
    util.del({ id: req.query.id }, function(err) {
        if (err) {
            return res.status(500).send('server error')
        }

        res.redirect('/students')
    })
})


router.post('/students/new', function(req, res) {
    util.save(req.body, function(err) {
        if (err) {
            return res.status(500).send('server on err')
        }
        res.redirect('/students')
    })
})

router.post('/students/edit', function(req, res) {
    util.update(req.body, function(err) {
        if (err) {
            return res.status(500).send('server on err')
        }
        res.redirect('/students')
    })
})


module.exports = router;