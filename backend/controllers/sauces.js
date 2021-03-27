const Sauce = require('../models/sauces');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject.id;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {
    Sauce.findById(res.req.params.id)
    .then((result) => {
        if(req.body.like >= 0){
            var likedArray = result.usersLiked;
            var liked = !result.likes ? 0 : result.likes;
            console.log(liked);
            console.log(likedArray);
            if(likedArray.includes(req.body.userId)){
                likedArray = likedArray.filter(value => value != req.body.userId);
                liked--;
            }else{
                likedArray.push(req.body.userId);
                liked++;
            }
            Sauce.updateOne({ _id: res.req.params.id }, { usersLiked: likedArray, likes: liked })
            .then(() => res.status(200).json({ message: 'Objet mis à jour !'}))
            .catch(error => res.status(400).json({ error }));
        }else if(req.body.like <= 0){
            var likedArray = result.usersDisliked;
            var disliked = !result.dislikes ? 0: result.dislikes;
            console.log(disliked);
            if(likedArray.includes(req.body.userId)){
                likedArray = likedArray.filter(value => value != req.body.userId);
                disliked--;
            }else{
                likedArray.push(req.body.userId);
                disliked++;
            }
            Sauce.updateOne({ _id: res.req.params.id }, { usersDisliked: likedArray, dislikes: disliked})
            .then(() => res.status(200).json({ message: 'Objet mis à jour !'}))
            .catch(error => res.status(400).json({ error }));
        }
    }) 
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            sauce.likes = !sauce.likes ? 0 : sauce.likes;
            sauce.dislikes = !sauce.dislikes ? 0 : sauce.dislikes;
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
        res.status(404).json({
            error: error
        });
        }
    );
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.deleteSauce = (req, res, next) => {
Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
    });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find().then(
        (sauces) => {
        res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
        res.status(400).json({
            error: error
        });
        }
    );
};