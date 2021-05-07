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
          <div class="date" data-type="date"><a><img data-type="date" src="./images/date.jpg" height="400px" width="100%"></a></div>
        </div>
      `
  };

  
    const renderTextBox = function(scene) {

    return `<div class="textbox" data-id="${scene.id}">
                <a class="text" data-id="${scene.id}"><p class="textboxp">${scene.textbox}</p></a> 
            </div>`
    
    };

    const renderQuizArea = function(quiz) {

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
        let text = `
        <div>
        <form>
         <label><h2>Amount to bet:</h2></label>
         <input class="bet" value="10.0">
         <button class="saveBet"><p>Bet</p></button>
        </form>
        </div>
        `;
        const $main = $('.main');
        $main.append(text);

        const firstcard = Math.floor(Math.random() * 12) + 1;
        const secondcard = Math.floor(Math.random() * 12) + 1;
        blackjack.yourCards.push(firstcard);
        blackjack.yourCards.push(secondcard);
        const dealerF = Math.floor(Math.random() * 12) + 1;
        const dealerS = Math.floor(Math.random() * 12) + 1;
        blackjack.dealerCards.push(dealerF);
        blackjack.dealerCards.push(dealerS);

        $('.saveBet').on("click", function() {
            $main.empty();
            const bet = $('.bet').val();
            blackjack.bet = bet;
            text = `
            <h2 class="your-cards">Your cards: <br>${firstcard}, ${secondcard}</h2>>
            <br><br>
            <h2 class="dealer">Dealer: ${dealerF}, #</h2>
            <br>
            <button class="hit"><p class="hit">Hit</p></button><button class="stay"><p class="stay">Stay</p></button>
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

        } else if (type == "money") {
            renderBlackjack();

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

            if (total == 21) {
                // Resetting the blackjack game
                const text = `<div class="textbox" data-id="11">
                <a class="text" data-id="11"><p class="textboxp">Nice! You won ${blackjack.bet}!</p></a> 
                </div>`;
                characterData.money += blackjack.bet;
                blackjack.bet = 0;
                blackjack.dealerCards = [];
                blackjack.yourCards = [];

                // Put a win message underneath.
                const $side = $('.side');
                $side.empty();
                var bar =  renderStatsSidebar(characterData);
                $side.append(bar); 
                const main = renderMainArea();
                $main.append(main);
                
                $main.append(text);
                
            } 
            let rand = Math.floor(Math.random() * 12) + 1;
            blackjack.yourCards.push(rand);
            total += rand;
            $('.your-cards').append(`, ` + rand);
            if (total > 21) {
                const text = `<div class="textbox" data-id="11">
                <a class="text" data-id="11"><p class="textboxp">Damn. You lost ${blackjack.bet}!</p></a> 
                </div>`;
                characterData.money -= blackjack.bet;
                blackjack.bet = 0;
                blackjack.dealerCards = [];
                blackjack.yourCards = [];
                const $side = $('.side');
                $side.empty();
                var bar =  renderStatsSidebar(characterData);
                $side.append(bar); 
                const main = renderMainArea();
                $main.append(main);
                
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
                dealerTotal += card;
            });

            if (total == 21) {
                // Resetting the blackjack game
                text = `<div class="textbox" data-id="11">
                <a class="text" data-id="11"><p class="textboxp">Nice! You won ${blackjack.bet}!</p></a> 
                </div>`;
                characterData.money += blackjack.bet;
                blackjack.bet = 0;
                blackjack.dealerCards = [];
                blackjack.yourCards = [];

                // Put a win message underneath.
                $side.empty();
                bar =  renderStatsSidebar(characterData);
                $side.append(bar); 
                $main.empty();
                main = renderMainArea();
                $main.append(main);
                
                $main.append(text);
                
            }
            $('.dealer').append(blackjack.dealerCards[1]);
            
            const loop = function() {
                setTimeout(function() {
                    const rand = Math.floor(Math.random() * 12) + 1;
                    dealerTotal += rand;
                    $('.dealer').append(rand);
             })
            }
                while (dealerTotal < 16 || dealerTotal < total) {
                        loop();
                        dealerTotal = dealerTotal;
                        
            }
 
            if (total > 21 || dealerTotal == 21 || (total < 21 && dealerTotal < 21 && dealerTotal > total) ) {
                text = `<div class="textbox" data-id="11">
                <a class="text" data-id="11"><p class="textboxp">Damn. You lost ${blackjack.bet}!</p></a> 
                </div>`;
                characterData.money -= blackjack.bet;
                blackjack.bet = 0;
                blackjack.dealerCards = [];
                blackjack.yourCards = [];
                $side.empty();
                bar =  renderStatsSidebar(characterData);
                $side.append(bar); 
                $main.empty();
                main = renderMainArea()
                $main.append(main);
                
                $main.append(text);
            } else {
                text = `<div class="textbox" data-id="11">
                <a class="text" data-id="11"><p class="textboxp">You didn't win or lose anything.</p></a> 
                </div>`;
                blackjack.bet = 0;
                blackjack.dealerCards = [];
                blackjack.yourCards = [];
                $side.empty();
                bar =  renderStatsSidebar(characterData);
                $side.append(bar); 
                $main.empty();
                main = renderMainArea()
                $main.append(main);
                
                $main.append(text);
            }


        });
        
    
    
    
    };
    
    $(function() {
        loadStatsIntoDOM(characterData, scenes, blackjack);
    });
    
    