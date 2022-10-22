/**
 * @file contains request handler of cars resource
 */
const postService = require('../../../services/postService');
const whoAmI = require('./authController');
module.exports = {
    async list(req, res) {
        try {
            const posts = await postService.list();
            res.status(200).json({
                status: "OK",
                data: {
                    post: posts.data,
                    count: posts.count
                },
            });
        } catch (err) {
            res.status(400).json({
                status: "FAIL",
                message: err.message,
            });
        }
    },

    async create(req, res) {
        try {
            const create = req.user.name
            const post = await postService.create({
                name: req.body.name,
                price: req.body.price,
                size: req.body.size,
                image: req.body.image,
                createdBy:create
            });
            res.status(201).json({
                status: "OK",
                data: post,
            });
        } catch (err) {
            res.status(201).json({
                status: "FAIL",
                message: err.message,
            });
        }
    },

    async update(req, res) {
        try {
            const user = req.user.name
            const post = await postService.update(
                req.params.id,
                req.body,
                req.body.updatedBy = user
            );
            res.status(200).json({
                status: "OK",
                data: post,
            });
        } catch (err) {
            res.status(422).json({
                status: "FAIL",
                message: err.message,
            });
        }
    },

    async destroy(req, res) {
        try {
            const post = await postService.delete(req.params.id);
            res.status(204).end();
        } catch (err) {
            res.status(422).json({
                status: "FAIL",
                message: err.message,
            });
        }
    },

    async deletedBy(req, res, next){
        try {
            const user = req.user.name
            const post = await postService.update(
                req.params.id,
                req.body,
                req.body.deletedBy = user
            );
            res.status(200).json({
                status: "OK",
                data: post,
            });
            next();
        } catch (err) {
            res.status(422).json({
                status: "FAIL",
                message: err.message,
            });
        }
    },

    async show(req, res) {
        try{
            const post = await postService.getDetail(req.params.id);
            res.status(200).json({
                    status: "OK",
                    data: post,
                });
        }catch(err){
            res.status(422).json({
                    status: "FAIL",
                    message: err.message,
                });
        }
    },

    async showSize(req, res){
        try{
            const post = await postService.getSize(req.params.size);
            console.log(post)
            res.status(200).json({
                status: "OK",
                data: post,
            });
        }catch(err){
            res.status(422).json({
                    status: "FAIL",
                    message: err.message,
                });
        }
    }

};