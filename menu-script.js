import {characterData} from "./character.js";

// Populates the html needed for the 'sidebar' area with the character's stats
const renderStatsSidebar = function(character) {

    return `
          <div class="box">
              <h2>Money: $${character.money}</h2>
          </div>
          <div class="box">
              <h2>Smarts: ${character.smarts}</h2>
          </div>
          <div class="box">
              <h2>Body: ${character.body}</h2>
          </div>
          <div class="character">
          </div>
          `; 
  };
  
  // Render the content for the main area
  const renderMainArea = function() {
  
  
      // return html here that renders the page with the img & text areas from the scenes.js
      return `
      <div class="container">
          <div class="game"><a><img src="./images/panda.jpg" height="400px" width="100%"></a></div>
          <div class="game"><a><img src="./images/brain_logo.png" height="400px" width="100%"></a></div>
        </div>
        <div class="container">
            <div class="game"><a><img src="./images/moneygame.jpg" height="400px" width="100%"></a></div>
          <div class="date"><a><img src="./images/date.jpg" height="400px" width="100%"></a></div>
        </div>
      `
  };

  
const renderTextBox = function(scene) {

    return `<div class="textbox">
                <a class="text" data-id="">
                </a> 
                <div class="buttonContainer">
                    <a class="save" href="save.html">Save</a>
                    <a class="menu" href="menu.html">Menu</a>
                </div>
            </div>`
    
    };

    // implement listener for when the save button is pressed to change the content of the main area

    const handleSaveButton = function(event) {

    };



    // implement listener for when the cancel button is pressed to change the content of the main area
    const handleCancelButton = function(event) {

    };

    const loadStatsIntoDOM = function(character) {
        const $side = $('.side');
        var bar =  renderStatsSidebar(character);
        $side.append(bar); 
    
        const $root = $('#root');
    
        const $main = $('.main');
        const main = renderMainArea();
    //    const text = renderTextBox();
        $main.append(main);
        $main.append(text);
        
    //    $root.on("click", ".textbox", handleTextPress);
    
    
        // Listener for the save button
        $root.on("click", ".save", handleSaveButton);
    
        // Listener for the cancel button
        $root.on("click", ".cancel", handleCancelButton);
        
    
    };
    
    $(function() {
        loadStatsIntoDOM(characterData);
    });
    
    