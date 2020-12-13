const express = require('express')
const router = express.Router()
const Course = require('../models/course.model')
const { isLoggedIn, isTeacher, isValidId } = require('../middleware/custom-middleware')


router.get('/getAllCourses', (req, res) => {
    Course
        .find()
        .populate('owner')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getTeacherCourses/:id', isValidId, (req, res) => {
    Course
        .find({ owner: req.params.id })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneCourse/:id', isValidId, (req, res) => {
    Course
        .findById(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/newCourse', /*isLoggedIn, isTeacher,*/ (req, res) => {
    const { imageUrl, title, catgory, difficultyLevel, description, whatYouWillLearn, price, requirements, _id, duration, owner } = req.body
    const mainTopicsArr = whatYouWillLearn.split(', ').map(elm => elm.charAt(0).toUpperCase() + elm.substring(1))
    const requirementsArr = requirements.split(', ').map(elm => elm.charAt(0).toUpperCase() + elm.substring(1))

    Course
        .create({
            imageUrl,
            title,
            catgory,
            difficultyLevel,
            description,
            whatYouWillLearn: mainTopicsArr,
            price,
            requirements: requirementsArr,
            _id,
            duration,
            owner
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editCourse/:id', isLoggedIn, isTeacher, isValidId, (req, res) => {
    const { imageUrl, title, catgory, difficultyLevel, description, whatYouWillLearn, price, requirements, _id, duration, owner } = req.body
    const mainTopicsArr = whatYouWillLearn.split(', ').map(elm => elm.charAt(0).toUpperCase() + elm.substring(1))
    const requirementsArr = requirements.split(', ').map(elm => elm.charAt(0).toUpperCase() + elm.substring(1))

    Course
        .findByIdAndUpdate(req.params.id, {
            imageUrl,
            title,
            catgory,
            difficultyLevel,
            description,
            whatYouWillLearn: mainTopicsArr,
            price,
            requirements: requirementsArr,
            _id,
            duration,
            owner
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteTeacherCourses/:id', isLoggedIn, isTeacher, isValidId, (req, res) => {
    Course
        .deleteMany({ owner: req.params.id })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteCourse/:id', isLoggedIn, isTeacher, isValidId, (req, res) => {
    Course
        .findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Course Deleted' }))
        .catch(err => res.status(500).json(err))
})


module.exports = router