import {characterData} from "./character.js";
import {scenes} from "./scenes.js"

// Populates the html needed for the 'sidebar' area with the character's stats
const renderStatsSidebar = function(character) {

    /*    const result = await axios({
            method: 'get',
            url: "https://jquery-and-restapi-default-rtdb.firebaseio.com/",
        }) */

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
  
          </div>
          `; 
  };
  
  // Render the content for the main area
  const renderMainArea = function() {
  
  
      // return html here that renders the page with the img & text areas from the scenes.js
      return `
      <div class="container">
          <div class="game" data-type="workout"><a><img src="./images/panda.jpg" height="400px" width="100%"></a></div>
          <div class="game" data-type="quiz"><a><img src="./images/brain_logo.png" height="400px" width="100%"></a></div>
        </div>
        <div class="container">
            <div class="game" data-type="money"><a><img src="./images/moneygame.jpg" height="400px" width="100%"></a></div>
          <div class="date" data-type="date"><a><img src="./images/date.jpg" height="400px" width="100%"></a></div>
        </div>
      `
  };

  
    const renderTextBox = function(scene) {

    return `<div class="textbox" data-id="${scene.id}">
                <a class="text" data-id="${scene.id}"><p class="textboxp">${scene.textbox}</p></a> 
            </div>`
    
    };

    const handleTextPress = function(event) {
        let sceneId = event.target.getAttribute("data-id");
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

    const handleGamePress = async function(event) {
        const type = event.getAttribute("data-type");
        if (type == "quiz") {

        }
    }

    const loadStatsIntoDOM = function(character, scenes) {
        const $side = $('.side');
        var bar =  renderStatsSidebar(character);
        $side.append(bar); 
    
        const $root = $('#root');
    
        const $main = $('.main');
        const main = renderMainArea();
        const text = renderTextBox(scenes[0]);
        $main.append(main);
        $main.append(text);
        
        $root.on("click", ".textbox", handleTextPress);
        $root.on("click", ".game", handleGamePress);
    
    
    
    };
    
    $(function() {
        loadStatsIntoDOM(characterData, scenes);
    });
    
    