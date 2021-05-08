import {characterData} from "./character.js";


const handleSaveButton = async function(event) {
    const lname = $('.lname');
    const fname = $('.fname');
    characterData.fname = fname.val();
    characterData.lname = lname.val();

}


// loadintoDom
// When save is clicked, it should update your name & such in your dating profile, & show it in the stats sidebar
const loadIntoDom = function(character) {
    const $profile = $('.profile');
    const $cont = $('.continue');
    $profile.on("click", ".submit", handleSaveButton);
    
}









$( function() {
    loadIntoDom(characterData);
})