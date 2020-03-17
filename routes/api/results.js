var express = require('express');
var router = express.Router();
const Result = require('../../models//Result');

/* POST result */
router.post('/', (req, res, next) => {
  Result.create({
    //player id
    playerOneId: req.body.player_one_id,
    playerTwoId: req.body.player_two_id,
    //player faction
    playerOneFaction: req.body.player_one_faction,
    playerTwoFaction: req.body.player_two_faction,
    //player character id
    playerOneCharacterOneId: req.body.player_one_character_one,
    playerTwoCharacterOneId: req.body.player_two_character_one,
    playerOneCharacterTwoId: req.body.player_one_character_two,
    playerTwoCharacterTwoId: req.body.player_two_character_two,
    playerOneCharacterThreeId: req.body.player_one_character_three,
    playerTwoCharacterThreeId: req.body.player_two_character_three,
    playerOneCharacterFourId: req.body.player_one_character_four,
    playerTwoCharacterFourId: req.body.player_two_character_four,
    playerOneCharacterFiveId: req.body.player_one_character_five,
    playerTwoCharacterFiveId: req.body.player_one_character_five,
    //character hp left
    playerOneCharacterOneHpLeft: req.body.player_one_character_one_hp_left,
    playerTwoCharacterOneHpLeft: req.body.player_two_character_one_hp_left,
    playerOneCharacterTwoHpLeft: req.body.player_one_character_two_hp_left,
    playerTwoCharacterTwoHpLeft: req.body.player_two_character_two_hp_left,
    playerOneCharacterThreeHpLeft: req.body.player_one_character_three_hp_left,
    playerTwoCharacterThreeHpLeft: req.body.player_two_character_three_hp_left,
    playerOneCharacterFourHpLeft: req.body.player_one_character_four_hp_left,
    playerTwoCharacterFourHpLeft: req.body.player_two_character_four_hp_left,
    playerOneCharacterFiveHpLeft: req.body.player_one_character_five_hp_left,
    playerTwoCharacterFiveHpLeft: req.body.player_two_character_five_hp_left,
    //character is elite
    playerOneCharacterOneIsElite: req.body.player_one_character_one_type,
    playerTwoCharacterOneIsElite: req.body.player_two_character_one_type,
    playerOneCharacterTwoIsElite: req.body.player_one_character_two_type,
    playerTwoCharacterTwoIsElite: req.body.player_two_character_two_type,
    playerOneCharacterThreeIsElite: req.body.player_one_character_three_type,
    playerTwoCharacterThreeIsElite: req.body.player_two_character_three_type,
    playerOneCharacterFourIsElite: req.body.player_one_character_four_type,
    playerTwoCharacterFourIsElite: req.body.player_two_character_four_type,
    playerOneCharacterFiveIsElite: req.body.player_one_character_five_type,
    playerTwoCharacterFiveIsElite: req.body.player_two_character_five_type,
    //cards left
    playerOneCardsLeft: req.body.player_one_cards_left,
    playerTwoCardsLeft: req.body.player_two_cards_left,
    //winner
    winnerId: req.body.winner_id,
    //battlefield
    battlefieldId: req.body.battlefield_id,
    //format
    formatId: req.body.format_id,
  }).then(result => {
    res.redirect('/results');
  }).catch(err => console.log(err));
});

module.exports = router;