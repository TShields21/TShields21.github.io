import { blackjack } from "./blackjack.js";
import {characterData} from "./character.js";
import {scenes} from "./scenes.js"

// Populates the html needed for the 'sidebar' area with the character's stats
const renderStatsSidebar = function(character) {

    return `
          <div class="box">
              <h2>Money: ${character.money}</h2>
          </div>
          <div class="box">
              <h2>Smarts: ${character.smarts}</h2>
          </div>
          <div class="box">
              <h2>Body: ${character.body}</h2>
          </div>
          <div class="character">
                <h2>Stress: ${character.stress}</h2>
          </div>
          `; 
  };
  
  // Render the content for the main area
  const renderMainArea = function() {
  
  
      // return html here that renders the page with the img & text areas from the scenes.js
      return `
      <div class="container">
          <div class="game" data-type="workout"><a><img data-type="workout"src="./images/panda.jpg" height="400px" width="100%"></a></div>
          <div class="game" data-type="quiz"><a><img data-type="quiz" src="./images/brain_logo.png" height="400px" width="100%"></a></div>
        </div>
        <div class="container">
            <div class="game" data-type="money"><a><img data-type="money" src="./images/moneygame.jpg" height="400px" width="100%"></a></div>
          <div class="game" data-type="date"><a><img data-type="date" src="./images/date.jpg" height="400px" width="100%"></a></div>
        </div>
      `
  };

  
    const renderTextBox = function(scene) {

    return `<div class="textbox" data-id="${scene.id}">
                <a class="text" data-id="${scene.id}"><p class="textboxp">${scene.textbox}</p></a> 
            </div>`
    
    };

    const renderQuizArea = function(quiz) {
        if (characterData.stress >= 50) {
            $('.main').append(`<div><h2>Are you too stressed to do this? Let me help you out-- TRUE.</h2></div>
            <button class="continue"><p>Continue</p></button>`);
            return;
        }

        let text = `
        <div class="quizBox">
            <button class="true"><p class="textboxp">True</p></button>
            <button class="false"><p class="textboxp">False</p></button>
        </div>`
        const $main = $('.main');
        $main.append(text);
        text = `<div class="textbox" data-id="11">
        <a class="text" data-id="11"><p class="textboxp">TRUE OR FALSE: ${quiz.question}</p></a> 
        </div>`;
        $main.append(text);
        
        $('.true').on("click",  function() {
            $main.empty();
            if (quiz.correct_answer == "True") {
                characterData.smarts += 5;
                characterData.stress += 5;
                text = `<div class="textbox" data-id="11">
                <a class="text" data-id="11"><p class="textboxp">The correct answer was: ${quiz.correct_answer}.
                Your stats and stress has increased.</p></a> 
                </div>`;
            } else {
                characterData.stress += 10;
                text = `<div class="textbox" data-id="11">
                <a class="text" data-id="11"><p class="textboxp">WRONG! The correct answer was: ${quiz.correct_answer}.
                Only your stress has increased.</p></a> 
                </div>`;
            }
            const $side = $('.side');
            $side.empty();
            var bar =  renderStatsSidebar(characterData);
            $side.append(bar); 
            const main = renderMainArea();
            $main.append(main);
            $main.append(text);


        });

        $('.false').on("click", function() {
            $main.empty();

            if (quiz.correct_answer == "False") {
                characterData.smarts += 5;
                characterData.stress += 5;
                text = `<div class="textbox" data-id="11">
                <a class="text" data-id="11"><p class="textboxp">The correct answer was: ${quiz.correct_answer}.
                Your stats and stress has increased.</p></a> 
                </div>`;
            } else {
                characterData.stress += 10;
                text = `<div class="textbox" data-id="11">
                <a class="text" data-id="11"><p class="textboxp">WRONG! The correct answer was: ${quiz.correct_answer}.
                Only your stress has increased.</p></a> 
                </div>`;
            }            
            const $side = $('.side');
            $side.empty();
            var bar =  renderStatsSidebar(characterData);
            $side.append(bar); 
            const main = renderMainArea();
            $main.append(main);
            $main.append(text);

        });

    }

    const handleTextPress = function(event) {
        let sceneId = event.target.getAttribute("data-id");
        if (sceneId == 11) {
            return;
        }
        sceneId++;
        let scene = [];
        scenes.forEach(el => {
            if (el.id == sceneId) {
                scene.push(el);
            }
        });

        const $main = $('.main');
        $main.empty();
    
        const mainContent = renderMainArea();
        $main.append(mainContent);
    
        const text = renderTextBox(scene[0]);
        $main.append(text);
      
    } 

    const renderBlackjack = function() {
        if (characterData.stress >= 50) {
            $('.main').append(`<div><h2>You thought because you were gambling, you could do this while stressed? No, sis, you cannot.
            Pass GO, but do NOT collect $200.</h2></div><button class="continue"><p>Continue</p></button>`);
            return;
        }
        let text = `
        <div>
        <form>
         <label><h2>Set bet:</h2></label>
         <input class="bet" value="10.0">
         <button class="saveBet"><p>Bet</p></button><button class="blackjack"><p>Blackjack</p></button>
        </form>
        </div>
        `;

        const $main = $('.main');
        $main.append(text);

        const firstcard = Math.floor(Math.random() * 10) + 1;
        const secondcard = Math.floor(Math.random() * 10) + 1;
        blackjack.yourCards.push(firstcard);
        blackjack.yourCards.push(secondcard);
        const dealerF = Math.floor(Math.random() * 10) + 1;
        const dealerS = Math.floor(Math.random() * 10) + 1;
        blackjack.dealerCards.push(dealerF);
        blackjack.dealerCards.push(dealerS);
        blackjack.bet = $('.bet').val();

        $('.saveBet').on("click", function(event) {
            event.preventDefault();
            blackjack.bet = $('.bet').val();
            $main.append(`<p>Bet of ${blackjack.bet} set.</p>`)
        })

        $('.blackjack').on("click", function() {
            $main.empty();
            text = `
            <h2 class="your-cards">Your cards: <br>${firstcard}, ${secondcard}</h2>>
            <br><br>
            <h2 class="dealer">Dealer: ${dealerF}, #</h2>
            <br>
            <button class="hit"><p class="hit">Hit</p></button><button class="stay"><p class="stay">Stay</p></button>
            <h2>The 2nd card of the dealer is hidden and will only show after your turn.<br>Choose 'hit' to add another card to your pile, or choose 'stay'
            to stay where you are.<br><br>
            You win if you get 21 or score higher than the dealer.<br>Remember, dealer stands at 16.</h2>
            `
            $main.append(text);

        });

    }



    const handleGamePress = async function(event) {
        event.preventDefault();
        const type = event.target.getAttribute("data-type");
        const $main = $('.main');
        $main.empty();
      
        if (type == "quiz") {
            const rand = Math.floor(Math.random() * 10);
            const quiz = Math.floor(Math.random() * 5);

            // Generating different quiz sets
            if (quiz == 0) {
                const result0 = await axios({
                    method: 'get',
                    url: 'https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=boolean'
                }).then(function(result) {
                    return result.data.results;
                });


                renderQuizArea(result0[rand]);

            } else if (quiz == 1) {
                const result1 = await axios({
                    method: 'get',
                    url: 'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=boolean'
                }).then(function(result) {
                    return result.data.results;
                });
                renderQuizArea(result1[rand]);
            ;
            } else if (quiz == 2) {
                const result2 = await axios({
                    method: 'get',
                    url: 'https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=boolean'
                }).then(function(result) {
                    return result.data.results;
                });
                renderQuizArea(result2[rand]);
            } else if (quiz == 3) {
                const result3 = await axios({
                    method: 'get',
                    url: 'https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=boolean'
                }).then(function(result) {
                    return result.data.results;
                });;
                renderQuizArea(result3[rand]);

            } else if (quiz == 4) {
                const result4 = await axios({
                    method: 'get',
                    url: 'https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=boolean'
                }).then(function(result) {
                    return result.data.results;
                });
                 renderQuizArea(result4[rand]);
            
            } 

        } else if (type == "workout") {
            const quotes = await axios({
                method: 'get',
                url: 'https://type.fit/api/quotes'
            }).then(function(results) {
                return results.data;;
            });
            const q = Math.floor(Math.random() * quotes.length);
            // Write code to generate a random quote & message text here
            if (characterData.body == 0) {
                $main.append(`<div><h2>In the Dateboy program, we supply you with inspirational quotes to help your workout go smoother.<br>
                <br>You're welcome, Dateboy.</h2></div>`);
            }
            $main.append(`<div><h2>${quotes[q].text}<br>--- ${quotes[q].author}<br><br>The words permeate your mind... <br><br>
            You hear a faint voice say: "You're welcome..."<br>You feel less stressed and improved your body a bit.</h2></div>
            <button class="continue">Continue</button>`);
            if (characterData.stress == 0) {
                characterData.body++;
                return;
            }
            characterData.body++;
            characterData.stress -= 5;

        } else if (type == "money") {
            renderBlackjack();

        } else if (type == "date") {
            if (characterData.smarts >= 40 && characterData.money >= 200 && characterData.body >= 10) {
                $main.append(`<div><h2>Congratulations, Dateboy! Your intelligence, money, and body has found you your first date. Here is the first candidate:</h2>
                <img src="./images/date.webp" height="600px" width="200px"><h2>Your date is set for tomorrow.</h2></div><button class="continue">
                Continue</button>`)
            } else {
                $main.append(`<div><h2>The Dateboy program takes into consideration your money, intelligence, and <br>
                physical fitness to better determine a match that is good for you. Unfortunately, you are lacking in 1 or more
                areas and no one wants to date you yet. Work on yourself and try again later.</h2><br><p>Pro tip: 
                Make sure you have at least $200.</p></div><button class="continue">
                Continue</button>`);
            }
        }
    }

    const loadStatsIntoDOM = function(character, scenes) {
        const $side = $('.side');
        var bar =  renderStatsSidebar(character);
        $side.append(bar); 
    
        const $root = $('#root');
    
        const $main = $('.main');
        let main = renderMainArea();
        let text = renderTextBox(scenes[0]);
        $main.append(main);
        $main.append(text);
        
        $root.on("click", ".textbox", handleTextPress);
        $main.on("click", ".game", handleGamePress);

        $main.on("click", ".hit", function() {
            let total = 0;
            blackjack.yourCards.forEach(card => {
                total += card;
            });
            let rand = Math.floor(Math.random() * 10) + 1;
            blackjack.yourCards.push(rand);
            total += rand;
            $('.your-cards').append(`, ` + rand);

            if (total == 21) {
                // Resetting the blackjack game
                text = `<button class="continue"><p>Continue</p></button><div class="textbox" data-id="11">
                <a class="text" data-id="11"><p class="textboxp">Nice! You won $${blackjack.bet}!</p></a> 
                </div>`;
                $('.hit').remove();
                $('.stay').remove();
                characterData.money += parseInt(blackjack.bet);
                blackjack.bet = 0.0;
                blackjack.dealerCards = [];
                blackjack.yourCards = [];
                $main.append(text);
                
            } 

            if (total > 21) {
               text = `<button class="continue"><p>Continue</p></button><div class="textbox" data-id="11">
                <a class="text" data-id="11"><p class="textboxp">BUST! Damn. You lost $${blackjack.bet}! That stings. Stress +10.</p></a> 
                </div>`;
                $('.hit').remove();
                $('.stay').remove();
                characterData.money -= parseInt(blackjack.bet);
                blackjack.bet = 0.0;
                blackjack.dealerCards = [];
                blackjack.yourCards = [];
                characterData.stress += 10;
                $main.append(text);
            }
        });

        $main.on("click", ".stay", function() {
            let total = 0;
            blackjack.yourCards.forEach(card => {
                total += card;
            });
            let dealerTotal = 0;
            blackjack.dealerCards.forEach(card => {
                dealerTotal += parseInt(card);
            });


            $('.dealer').append(blackjack.dealerCards[1]);
            if (dealerTotal < 16) {

                for (var i = 0; i < 5; i++) {
                    const rand = Math.floor(Math.random() * 10) + 1;
                    dealerTotal += rand;
                    $('.dealer').append(`, ` + rand);
                    if (dealerTotal >= 16) {
                        i = 6;
                    }
                }
            }
                            
    
                if (total > 21 || (dealerTotal == 21 && total != 21) || ((total < 21) && (dealerTotal < 21) && (dealerTotal > total)) ) {
                    $('.hit').remove();
                    $('.stay').remove();
                    text = `<button class="continue"><p>Continue</p></button><div class="textbox" data-id="11">
                    <a class="text" data-id="11"><p class="textboxp">Damn. You lost $${blackjack.bet}! Stress +10. Try harder.</p></a> 
                    </div>`;
                    characterData.money -= parseInt(blackjack.bet);
                    blackjack.bet = 0.0;
                    blackjack.dealerCards = [];
                    blackjack.yourCards = [];
                    characterData.stress += 10;
                    $main.append(text);

                } else if (total > dealerTotal && total != 21) {
                    $('.hit').remove();
                    $('.stay').remove();
                    text = `<button class="continue"><p>Continue</p></button><div class="textbox" data-id="11">
                    <a class="text" data-id="11"><p class="textboxp">You won $${blackjack.bet}!! </p></a> 
                    </div>`;
                    characterData.money += parseInt(blackjack.bet);
                    blackjack.bet = 0.0;
                    blackjack.dealerCards = [];
                    blackjack.yourCards = [];
                    $main.append(text);
                    
                } else if (total == dealerTotal) {
                    $('.hit').remove();
                    $('.stay').remove();
                    text = `<button class="continue"><p>Continue</p></button><div class="textbox" data-id="11">
                    <a class="text" data-id="11"><p class="textboxp">Tie! You didn't win or lose anything... Stress +5.</p></a> 
                    </div>`;
                    blackjack.bet = 0.0;
                    blackjack.dealerCards = [];
                    blackjack.yourCards = [];
                    characterData.stress += 5;
                    $main.append(text);

                    
                } else if (dealerTotal > total) {
                    $('.hit').remove();
                    $('.stay').remove();
                    text = `<button class="continue"><p>Continue</p></button><div class="textbox" data-id="11">
                    <a class="text" data-id="11"><p class="textboxp">The dealer busted! You won $${blackjack.bet}!</p></a> 
                    </div>`;
                    characterData.money += parseInt(blackjack.bet)
                    blackjack.bet = 0.0;
                    blackjack.dealerCards = [];
                    blackjack.yourCards = [];
                    $main.append(text);
                }


        });

        $main.on("click", ".continue", function() {
            $side.empty();
            bar =  renderStatsSidebar(characterData);
            $side.append(bar); 
            $main.empty();
            main = renderMainArea()
            $main.append(main);
        });
        
        
    
    
    
    };
    
    $(function() {
        loadStatsIntoDOM(characterData, scenes, blackjack);
    });
    
    