  import React, { Component } from 'react';
  import './App.css'
  import hangman_0 from './hangman-images/Hangman-0.png';
  import hangman_1 from './hangman-images/Hangman-1.png';
  import hangman_2 from './hangman-images/Hangman-2.png';
  import hangman_3 from './hangman-images/Hangman-3.png';
  import hangman_4 from './hangman-images/Hangman-4.png';
  import hangman_5 from './hangman-images/Hangman-5.png';
  import hangman_6 from './hangman-images/Hangman-6.png';

  //Place holder before implementing future feature
  const wordOfTheGame = "ab cd";

  //Word of the game that users have to guess the correct letter to find the right answer
  class Word extends Component{
    constructor(props){
      super(props);
      this.state = {
        wordScrambled:this.wordToGuess(),
        wordIsGuessed: false,
        numOfGuess: 0,
        hangman: hangman_0
      }
      this.clickEvent = this.clickEvent.bind(this);
      this.restartGame = this.restartGame.bind(this);
    }

    restartGame(){
      this.setState({
        wordScrambled:this.wordToGuess(),
        wordIsGuessed: false,
        numOfGuess: 0,
        hangman: hangman_0
      })
      return;
    }


    //Scrambling word is causing underscore to replace spaces, which cause the user not to win the game.
    wordToGuess() {
      let wordToArray = wordOfTheGame.split("").map((letter) => (letter === " " ? "" : "_"));
      console.log(`${wordToArray.join(" ")} hey`);
      console.log(wordToArray);
      return wordToArray.join(" ")
      /*for(let i = 0; i < wordOfTheGame.length; i++){
        if(wordGuess[i] === ' '){
          wordGuess[i] = "4";
          console.log(wordGuess[i])
        }else{
          console.log(`${wordGuess} what is this`)
          wordGuess[i] = "_";
        }
      }
      return wordGuess.join(' ');*/
    }
    
    checkWord(){
      console.log(`${this.state.wordScrambled} test test`)  
      if(this.state.wordScrambled.split(" ").join("") === wordOfTheGame){
        this.setState({wordIsGuessed: true})
      }else{
        console.log("checkword function: false")
      }
    }

    updateHangman(){
      if(this.state.numOfGuess == 1){
        console.log(`True: ${this.state.hangman}`);
        this.setState({hangman:hangman_1});
      }else if(this.state.numOfGuess == 2){
        this.setState({hangman:hangman_2});
      }else if(this.state.numOfGuess == 3){
        this.setState({hangman:hangman_3});
      }else if(this.state.numOfGuess == 4){
        this.setState({hangman:hangman_4});
      }else if(this.state.numOfGuess == 5){
        this.setState({hangman:hangman_5});
      }else if(this.state.numOfGuess == 6){
        this.setState({hangman:hangman_6});
      }
    }

    clickEvent(letter){
      //Checks if the word has been solved each time user pressses a button.
      this.checkWord();
      if(this.state.wordIsGuessed === true){  
        //Add logic when game is finshed
        console.log("You figured the right word");
        return;
      }else if(this.state.numOfGuess === 6){
        console.log("You ran out of guess");
        return;
      }

      //Check if the button press is a valid answer if yes, then update this.state.wordScrambled.
      const wordCopy = this.state.wordScrambled.split(" ");
      console.log(`${wordOfTheGame} hey this is wordCOpy`)
      if(wordOfTheGame.indexOf(letter) > -1){
        wordCopy.map((i, y) => {
          if(wordOfTheGame[y] === letter){
            console.log(`${wordCopy} test`)
            wordCopy[y] = letter;
            console.log(`Num of Guess: ${this.state.numOfGuess}`);
          }
        });
      }else{
        //updates the number of guesses
        this.setState({
          count: this.state.numOfGuess++,
        })  
        this.updateHangman();      
      }
    
      //update hidden word state after user guess
      this.setState({
        wordScrambled: wordCopy.join(" "),
      })
      console.log(`Num of Guess: ${this.state.numOfGuess}`);
    }

    render(){
      return(
        <div className="MainGame">
        <div className="GameInfo">
          <img  src={this.state.hangman} alt="hangman_0"/>
          <p>Hey this is stuff</p>
        </div>
        <p className="GameWord">{this.state.wordScrambled}</p>
        <WordBank buttonPressed={this.clickEvent}/>
        <p>{this.state.numOfGuess === 6 ? "You lost" : console.log(this.state.wordIsGuessed)}</p>
        <p>{
          //This appears after game is finished, needs to be shown after user figures out the answer.
          this.state.wordIsGuessed ? "You won the game" : console.log(this.state.wordIsGuessed)
          }</p>
        {(this.state.numOfGuess === 6 || this.state.wordIsGuessed ? <button onClick={this.restartGame}>Play Again</button> : console.log("restartGame not working"))}
        </div>
      );
    }
  }

  //Creates buttons labeled a-z to allow users to guess what the word could be.
  const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
  class WordBank extends Component{
    render(){
      return(
        <div>
          {alphabets.map((letter, i) => <button key={i} onClick={() => this.props.buttonPressed(letter)}>{letter}</button>)}
        </div>
      )
    }
  }

  class App extends Component {
    render() {
      return (
        <div>
        <Word /> 
        </div>
      );
    }
  }

  export default App;
