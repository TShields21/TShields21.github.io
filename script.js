import axios from "axios";
import {characterData} from "./character.js";


const handleSaveButton = async function(event) {
    event.preventDefault();
    const lname = $('.lname');
    const fname = $('.fname');
    const password = $('.password');
    characterData.fname = fname.val();
    characterData.lname = lname.val();

   /* await axios({
        method: 'post',
        url: "https://console.firebase.google.com/project/undefined/firestore/data/",
        data: {
            "first": fname,
            "last": lname,
        },
    }); */

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