import React, { Component } from 'react';
import './App.css';

//Place holder before implementing future feature
const word = "steven";

//Word of the game that users have to guess the correct letter to find the right answer
class Word extends Component{
  constructor(props){
    super(props);
    this.state = {
      wordScrambled:this.wordToGuess(),
    }
    this.clickEvent = this.clickEvent.bind(this);
  }

  wordToGuess() {
    let wordGuess = new Array(word.length);
    for(let i = 0; i < word.length; i++){
      wordGuess[i] = "_"
    }
    return wordGuess.join(' ');
  }
  
  clickEvent(letter){
    //Last point working on, button now has function that prints the buttons letter to console log.
    console.log(`state.wordScrambled ${this.state.wordScrambled}`)
    const x = this.state.wordScrambled.split(" ");
    console.log(` Variable x at Sart of Function ${x}`);
    if(word.indexOf(letter) > -1){
      x.map((i, y) => {
        if(word[y] === letter){
          x[y] = letter;
        }
      });
    }
    this.setState({
      wordScrambled: x.join(" "),
    })
    console.log(` Variable x at End of Function ${x}`);
  }

  render(){
    return(
      <div>
      <p>{this.state.wordScrambled}</p>
      <WordBank buttonPressed={this.clickEvent}/>  
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
