import React from 'react'
import { Text, View, TouchableOpacity,StyleSheet } from 'react-native'
import DeckSummary from './DeckSummary'
import {connect}  from 'react-redux'
import {deleteDeck} from '../actions'

class Deck extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  })

  deleteDeck = function(title){
    debugger;
    const {dispatch, navigation} = this.props
    dispatch(deleteDeck(title))
    navigation.navigate('DeckList')
  }

  render(){
    const { navigation, deck } = this.props;
    if(deck){
      return ( 
        <View style={{flex:1, alignItems:'center'}}>
          <DeckSummary deck={deck} navigation={navigation} />
          <View style={{flex:1, alignItems:'center'}}>
          <TouchableOpacity 
            style={styles.startQuiz}
            onPress={() => navigation.navigate('AddCard', {title: deck.title})}>
            <Text style={{textAlign:'center', color:'white',fontSize: 22}}>Add card</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.addNewCard}
              onPress={() => navigation.navigate('Quiz',{title: deck.title})}>
            <Text style={{textAlign:'center', color:'white', fontSize: 22}}>Start the quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.deleteDeck}
              onPress={() => this.deleteDeck(deck.title)}>
            <Text style={{textAlign:'center', color:'red', fontSize: 22}}>Delete deck</Text>
          </TouchableOpacity>
          </View>
        </View>)
      } else {
        return (<Text>No deck here</Text>) 
      }
  }
}

function mapStateToProps(state, {navigation}){
  const deckTitle = navigation.getParam('title')
  return {deck: state[deckTitle]}
}

export default connect(mapStateToProps)(Deck)

const styles = StyleSheet.create({
  deleteDeck :{

  },
  addNewCard:{
    backgroundColor: 'purple',
    borderRadius:3,
    padding: 10,
    height: 45,
    width:200,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 30
  },
  startQuiz:{
    backgroundColor: 'purple',
    borderRadius:3,
    padding: 10,
    height: 45,
    width:200,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 30
  },

  deckName :{ 
    paddingLeft: 15,
    flex:0.8,
    fontSize: 22,
    paddingRight: 15,
    height:60
  },
  deckNameContainer: {
    borderColor:'purple',
    borderRadius:3,
    borderWidth:3,
    flexDirection:'row',
    alignItems: 'stretch',
  }})

