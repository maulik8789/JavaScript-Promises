let form = document.querySelector("#submitForm")
let favNum = document.querySelector("#num")
let radVal = document.getElementsByName("radio");
let result = document.getElementById("fact")
let btnCard = document.getElementById("btnCard")
let deckId = ""
let cardMargin = 5

form.addEventListener("submit", (evt) => {
  evt.preventDefault()
  for(i = 0; i < radVal.length; i++) {
    let url = `http://numbersapi.com/${favNum.value}/${radVal[i].value}`
    if(radVal[i].checked){
      for(let j = 0; j < 4; j++){
        $.get(url ,() => {
          let ourFirstPromise = axios.get(url);
          
          ourFirstPromise
          .then(res => console.log("done..", res.data))
          .catch(err => console.log(err));
          
        });
      }
    }
  }  
})


console.log("Waiting!");
let formCard = document.querySelector("#card")
let cardCount = 0;


formCard.addEventListener("click", (evt) => {
  evt.preventDefault()
  
  btnCard.style.backgroundColor = "green"
  if (cardCount == 0){
    var baseURL = `http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
    $.get(baseURL ,() => {
      
      let cardPromise = axios.get(baseURL);
      
      cardPromise
      .then(res => {
        console.log("done..", res.data)
        deckId = res.data.deck_id;
      })
      .catch(err => console.log(err));
      
    })
    cardCount++;
    console.log(cardCount)
  }
  else{
    console.log(cardCount, "frm deck")

    baseURL = `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`

    $.get(baseURL ,() => {
      let cardPromise = axios.get(baseURL);
        
      if(cardCount != 27)
      {
        cardPromise
        .then(res => {
          console.log("done..", res.data.cards[0].image);
          let image = document.createElement("img")
          image.src = `${res.data.cards[0].image}`
          image.style.position = "absolute"
          image.style.marginLeft = `${cardMargin}px`;
          cardMargin += 25
          document.body.appendChild(image);
          
        })
        .catch(err => console.log(err));
        cardCount++;

      }

    });
  }
    
})
