import React from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import {connect} from 'react-redux'
import {addQuestion} from '../actions'
import {addCardToDeck} from '../utils/api'

class NewQuestion extends React.Component {
  state = {
    question: '',
    answer: ''
  }

  addCard = (title, question, answer) => {
    const {dispatchAddCard, navigation} = this.props
    dispatchAddCard(title, this.state)
    addCardToDeck(title, this.state)
    this.setState((state)=> ({
      question: '',
      answer: ''
    }))
    navigation.navigate('Deck')
  }

  render(){
    const { navigation } = this.props;
    const deckTitle = navigation.getParam('title')

    return (
      <View style={{flex:1, alignItems: 'center', marginTop:30}}>    
      <View   style={styles.questionInputContainer}>
        <TextInput 
          placeholder='Question' 
          placeholderTextColor='gray'
          style={styles.questionInput}
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
        /></View>   
        <View   style={styles.questionInputContainer}>
        <TextInput 
          placeholder='Answer' 
          placeholderTextColor='gray'
          style={styles.questionInput}
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
        />
        </View>
        
        <View style={{flex: 1,justifyContent: 'flex-end'}}>
          <TouchableOpacity style={styles.addNewQuestion} onPress={() => this.addCard(deckTitle, this.state)} >
            <Text style={{color: 'white',fontSize: 22}}>Add Card</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    dispatchAddCard : (title, card) => dispatch(addQuestion(title, card))
  }
}

export default connect(null, mapDispatchToProps)(NewQuestion)

const styles = StyleSheet.create({
  addNewQuestion:{
    backgroundColor: 'purple',
    borderRadius:3,
    padding: 10,
    height: 45,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 40
  },
  questionInput :{ 
    paddingLeft: 15,
    flex:0.8,
    fontSize: 22,
    paddingRight: 15,
    height:60
  },
  questionInputContainer: {
    borderColor:'purple',
    borderRadius:3,
    borderWidth:3,
    flexDirection:'row',
    alignItems: 'stretch',
    margin:10
  }
})