//import some components required for the project 
import React from "react";
import {Link} from 'react-router-dom';
import './cardsDeck.css';
import Button from 'react-bootstrap/Button';
import {Whatsapp,PersonAdd} from 'react-bootstrap-icons';
import { createDeckAndDraw} from './api';
import QRCode from "qrcode.react";
import compareValues  from './utils';

class CardsDeck extends React.Component {
  
  //empty state values 
  state = {
    cardImageUrl: null,
    cardValue: null,
    deckId: null,
    result: null
  };

  //network request 
  componentDidMount = async () => {
    const { deck_id, value, image } = await createDeckAndDraw();
    this.setState({
      cardValue: value,
      cardImageUrl: image,
      deckId: deck_id
    });
  };
   
// state prop
  constructor(props) {
    super(props);
    this.state = {
      player: 0,
      count:0
    };
  }

  // Envent handler for handling/adding players 
  handlePlayer = () => {
    this.setState({
      player: this.state.player + 1
    });
  }

  //count handler 
  handleCount = () => {
    this.setState({
      count: this.state.count + 1
    });
  }

  // run all 3 functions at the same time 
  clickHandler = ()=> {
    this.componentDidMount();
      this.onButtonClick();
      // this.handleCount();
  };

  onButtonClick = async () => {
    this.setState({
      cardImageUrl: null
        })
    const { cardValue } = this.state;
    const { value, image } = await createDeckAndDraw();
    const result = compareValues({
      previousCardValue: cardValue,
      currentCardValue: cardValue,

    });

    this.setState({
      result,
      cardValue: value,
      cardImageUrl: image
    });
  };

  // render output
  render() {
    const {result, cardImageUrl}=this.state;

    //return messegage while waiting for response 
    if (!cardImageUrl){

      return <h4>Shuffling..</h4>

    }
  
    let currentPlayer = this.state.count;
    let numOfPlayers = this.state.player;
    let count = this.state.count;
    const gameNotStarted = numOfPlayers === 0;
    let gameStart = numOfPlayers >=1;
    let gameResults = (numOfPlayers === count);
    let gameState;
  
    
      // If statement- logic ..game start and results.
      if (gameNotStarted) {
        gameState = <h3>Add players to start the Game</h3> 
      }
      if (gameStart) {
       gameState = <img src={cardImageUrl} alt ="Playing card"/>
       currentPlayer = count + 1;
     }

      // if (gameResults){

      //   gameState = <img src={cardImageUrl} alt ="Playing card"/>
      //   {result }
       
      // }
    
    return (

      <div className="CardContainer">

      <div>
        <div className="text-center" > <span style={{fontWeight: 'bold'}}>
          Number of Players: {this.state.player}</span></div>
        <br/>
        <div style={{display: 'flex',  justifyContent:'center', height: '10vh'}}>  
        <div>
        <Button onClick={this.handlePlayer}><PersonAdd color="Black"
         size={48} /></Button>&nbsp;&nbsp;&nbsp;&nbsp;
        <br/>
        <p>Add players</p>

        </div>
        <div>

         {/* Whatsapp icon: to send link-player invitation   */}
         <Link to="/SendMessage"><Whatsapp color="green" size={60}></Whatsapp></Link>
         <br/>
            <p>Share link</p>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <br/>
            <div>
          {/* QR-code image: for now it points to local host:port 3000 */}
            <QRCode
               value="http://localhost:3000/" size={60} style={{ marginRight: 20 }}/>
               <br/>
            <p>Scan to Join </p>
            </div>
            <br/>
          </div>

      </div>
      <br/><br/>
          <div className="text-center" >
            <h4 className='text-center'>Deck of Cards</h4>
            <br/>

            <div className="text-center">{gameState}</div>
  
            {/* Current player */}
            <div className="text-center">
            <p>Player turn: player {currentPlayer}</p></div>

            {/* calls componentDidMout(Shuffles and draws a card) Function */}
           <div> <Button onClick={this.clickHandler}>Shuffle and draw card</Button></div>
            <br/>
          </div>

      </div>
    )
  }
}

export default CardsDeck;
