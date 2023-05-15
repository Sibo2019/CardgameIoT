import {EmojiFrown, EmojiSmile} from 'react-bootstrap-icons';
const cardValues = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'JACK',
  'QUEEN',
  'KING',
  'ACE'
];

const compareValues = ({ previousCardValue, currentCardValue}) => {
  const previousCardValueIndex = cardValues.indexOf(previousCardValue);
  const currentCardValueIndex = cardValues.indexOf(currentCardValue);

//if statements for the results 

  if (previousCardValueIndex > currentCardValueIndex) {
    return <h2>Sorry, you lost< EmojiFrown color="red" size={25}/></h2> ;
  }
  if (previousCardValueIndex === currentCardValueIndex) {
    return 'Its a tie';
  }

  if (previousCardValueIndex < currentCardValueIndex) {
    return <h2>You won< EmojiSmile color="blue" size={25}/></h2>;
  }
};

export default compareValues;
