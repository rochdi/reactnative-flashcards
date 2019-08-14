import React from 'react'
import { Text , View, Button, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from 'react-redux'

class Quiz extends React.Component {


  state = {
    currentQuestionIdx: 0,
    score : 0,
    showAnswer :false,
    showResult: false
  }

  reset = () => {
    this.setState({
      currentQuestionIdx: 0,
      score : 0,
      showAnswer :false,
      showResult: false
    })
  }

  renderQuestion = (deck)=> {
    if(this.state.showAnswer){
        return (<Text style={{color: 'purple', fontSize: 30}}>{deck.questions[this.state.currentQuestionIdx].question}</Text>)
    } else {
      return (<Text style={{color: 'purple', fontSize: 30}}>{deck.questions[this.state.currentQuestionIdx].answer}</Text>)
    }
  }

  askQuestion = (deck) => {
    debugger;
    if(this.state.showResult){
      return (
      <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
        <Text style={{color:'purple', fontSize:15, textAlign:"center"}}>{`${this.state.currentQuestionIdx+1} / ${deck.questions.length}`}</Text>
        <Text style={{color:'purple', fontSize:20, textAlign:"center"}}>{`Score:  ${this.state.score} / ${deck.questions.length}`}</Text>
        <TouchableOpacity
            onPress={() => this.reset()}
            style={getBtnStyle('purple').btnStyle}>
            <Text style={{color:'white', fontSize:20, textAlign:"center"}}>Restart</Text>
          </TouchableOpacity>
      </View>)
    }else {
      return (
      <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
        <Text style={{color:'purple', fontSize:15, textAlign:"center"}}>{`${this.state.currentQuestionIdx+1} / ${deck.questions.length}`}</Text>
        {this.renderQuestion(deck)}
        <Button title={this.state.showAnswer ? 'Question' : 'Answer'} 
                onPress={()=>{ this.setState({showAnswer: !this.state.showAnswer})}}/>  

        <TouchableOpacity
          onPress={() => {
                          this.state.currentQuestionIdx === (deck.questions.length-1) ? 
                            this.setState({showResult:true,  score: this.state.score+1 })
                          : this.setState({ currentQuestionIdx :this.state.currentQuestionIdx+1,
                                         score: this.state.score+1,
                                         showAnswer: false  })
                         } }
          style={getBtnStyle('green').btnStyle}>
          <Text style={{color:'white', fontSize:20, textAlign:"center"}}>Correct</Text>
        </TouchableOpacity>

        <TouchableOpacity   
          onPress={() => {
                          this.state.currentQuestionIdx === (deck.questions.length-1) ? 
                          this.setState({showResult:true})
                          : this.setState({ currentQuestionIdx :this.state.currentQuestionIdx+1,
                                         showAnswer: false  })
                         } }          
          style={getBtnStyle('red').btnStyle}>
          <Text style={{color:'white', fontSize:20, textAlign:"center"}}>Incorrect</Text>
        </TouchableOpacity>
      </View>)
    }
  }


  render() {
    const {deck} = this.props;
    if(!deck.questions || deck.questions.length === 0 ){
      return (
      <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
        <Text style={{textAlign:"center", fontSize:20, padding:30}}>
          Sorry you cannot take a quiz because there are no cards n the deck.
        </Text>
      </View>)
    } else {
      return (
        this.askQuestion(deck)
      )  
    }
  }
}

function mapStateToProps(state, {navigation}){
  const deckTitle = navigation.getParam('title')
  return {deck: state[deckTitle]}
}

const getBtnStyle =  (color) => (
  StyleSheet.create({
    btnStyle: {
      backgroundColor: color,
      borderRadius:3,
      padding: 10,
      height: 45,
      width:150,
      paddingLeft: 30,
      paddingRight: 30,
      margin:10
    }
  })
)

export default connect(mapStateToProps)(Quiz)