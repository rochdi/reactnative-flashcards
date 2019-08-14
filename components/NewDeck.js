import React from 'react'
import { connect } from 'react-redux'
import { Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import {addDeck} from '../actions'
import {createDeck} from '../utils/api'

class NewDeck extends React.Component {
  state = {
    deckTitle: ''
  }

  addDeck = (title) => {
    const {dispatchAddDeck, navigation} = this.props
    dispatchAddDeck(title)
    createDeck(title)
    this.setState( (state) => ({
      deckTitle: ''
    }))
    navigation.navigate('Decks')
  }

  render(){
    
    return (
      <View style={{flex:1, alignItems: 'center'}}>
        <Text style={{fontSize:25, padding:30, textAlign:'center'}}>What is the title of your new deck</Text>
        <View   style={styles.deckNameContainer}>
          <TextInput 
            placeholder='Deck Name' 
            placeholderTextColor='gray'
            style={styles.deckName}
            onChangeText={(deckTitle) => this.setState({deckTitle})}
            value={this.state.deckTitle}
          />
        </View>
        <View style={{flex: 1,justifyContent: 'flex-end'}}>
          <TouchableOpacity style={styles.addNewDeck} onPress={() => this.addDeck(this.state.deckTitle)} >
            <Text style={{color: 'white',fontSize: 22}}>Create Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    dispatchAddDeck : (title) => dispatch(addDeck({title,  questions: []}))
  }
}

const styles = StyleSheet.create({
  addNewDeck:{
    backgroundColor: 'purple',
    borderRadius:3,
    padding: 10,
    height: 45,
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
  }
})


export default connect(null,mapDispatchToProps)(NewDeck)