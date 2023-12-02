const express = require('express');
const Joi = require('joi');
const app = express()
const mongoose = require('mongoose');
const { Vote } = require('../vote_model');
const router = express.Router();
const role = require('../middleware/role')

router.get('/', async (req, res, next) => {
  let data = await Vote.find()
  res.status(200).send(data)
})

router.get('/:id', async (req, res, next) => {
  let data = await Vote.findById(req.params.id)
  res.status(200).send(data)
})


// router.post('/', async (req, res, next) => {
//     let data = new Vote({
//         name: req.body.name,
//         options: req.body.options,
//         votes: req.body.votes,
//         userVoted: req.body.userVoted,
//         createdAt: req.body.createdAt,
//     })
//     data = await Vote.save(); // save vote to db
//     res.status(201).send(data)
// })

//create vote in db
router.post('/', async (req, res, next) => {
  let voting = new Vote(req.body);

  voting.createdBy = req.user;
  voting.save((err) => {
    if (err) return res.status(500).send(err);
    res.send(voting);
  })
});



router.put('/:id', role, async (req, res, next) => {
  if (req.body.id) {
    delete req.body.id;
  }
  let data = await Vote.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    options: req.body.options,
    votes: req.body.votes,
    userVoted: req.body.userVoted,
    createdAt: req.body.createdAt
  }, { new: true })
  res.status(201).send(data)
})

router.delete('/:id', role, async (req, res) => {
  const data = await Vote.findByIdAndRemove(req.params.id);
  res.status(200).send(data)
})

//User Can Vote, if user has already voted, Message should appear that “You already voted”
router.post('/:id', async (req, res, next) => {
  var id = req.params.id;
  var optionIndex = req.body.options;
  var username = req.user.name;
  //increment vote number
  Vote.findById(id, function (err, vote) {
    if (err) {
      return err;
    }
    if (!vote) {
      return res.status(404).send('Not Found');
    }
    if (vote.usersVoted.indexOf(username) !== -1) {
      return res.status(400).send('You already voted');
    }
    vote.users_voted.push(username);
    vote.votes[optionIndex] = vote.votes[optionIndex] + 1;
    vote.markModified('votes');
    vote.save(function (err, newVote) {
      if (err) {
        return err;
      }
      return res.status(200).json(newVote);
    });
  });
  // };
})


module.exports = router
