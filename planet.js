let form = document.querySelector("#submitForm")
let favNum = document.querySelector("#num")
let radVal = document.getElementsByName("radio");
let result = document.getElementById("fact")
let btnCard = document.getElementById("btnCard")
let cardAwait = document.getElementById("cardAwait")
let btnCardAwait = document.getElementById("btnCardAwait")
let deckId = ""
let cardMargin = 5
let newCount = 1


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



//////////////////////////////////////////////////////////////////////////////////////////////////
//WITH ASYNC & AWAIT
//////////////////////////////////////////////////////////////////////////////////////////////////

let deck = {
  async init(){
    let res = await axios.get (`http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    this.currDeckId = res.data.deck_id;
  },
  async shuffleCard(){
    let res = await axios.get(`http://deckofcardsapi.com/api/deck/${this.currDeckId}/shuffle/?count=1`)
  },
  async getCard(){
    let res = await axios.get(`http://deckofcardsapi.com/api/deck/${this.currDeckId}/draw/?count=1`)
    
    
    let image = document.createElement("img")
    image.src = res.data.cards[0].image
    console.log(image.src)
    document.body.appendChild(image)
    image.style.position = "absolute"
    image.style.marginLeft = `${cardMargin}px`;
    cardMargin += 25  
    newCount++;
  }

}

deck.init()
cardMargin = 0

cardAwait.addEventListener("submit", (e) =>{
  e.preventDefault();
  if (newCount <= 52){
  deck.shuffleCard()
  deck.getCard()
  }
})