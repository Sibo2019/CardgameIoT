import axios from 'axios';

const api = axios.create({
  baseURL: 'https://deckofcardsapi.com/api/deck/'
});

//  creates new deck and shuffles the cards 
const createDeckAndDraw = async () => {
  const { data } = await api.get('new/shuffle/', {
    params: {
      deck_count: 1
    }
  });

  //draw card 
  const {deck_id} = data;
  const { data: cardsResponse } =  await api.get(`${deck_id}/draw/`, {
    params: {
      count: 1
    }
  })

  return {...cardsResponse.cards[0], deck_id} ;

};

export { createDeckAndDraw };

