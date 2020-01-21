const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

//router.get('/', (req, res) => {
//    res.send('we are on posts');
//});

//substituido por
//ler todos os objetos do database
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch (err){
        res.json({message:err});
    }
});
//ler um objeto especifico
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
        console.log('deu certo');
    } catch (err){
        res.json({message: err});
        console.log('deu ruim');
    }
});

//inserir um objeto no database
//router.post('/', (req, res) => {
//    const post = new Post({
//        title: req.body.title,
//        description: req.body.description
//    });
//    //salvar no database
//    post.save()
//        .then(data => {
//            res.jdon(data);
//        })
//        .catch(err => {
//            res.json({message: err});
//        });
//    //console.log(req.body);
//});

//subtituido por 

router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }catch (err){
        res.json({message: err});
    }
});

//deletar um objeto do database
router.delete('/:postId', async (req, res) => {
    try {
        const removePost = await Post.remove({_id: req.params.postId});
        res.json(removePost);
    }catch (err){
        res.json({message: err});
    }
});

//modificar um objeto do database
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId}, 
            {$set: {title: req.body.title}}
        );
        res.json(updatedPost);
    }catch (err){
        res.json({message: err});
    }
});

module.exports = router;