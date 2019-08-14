import React from 'react'
import { connect } from 'react-redux'
import { Text, FlatList,View } from 'react-native'
import DeckSummary from './DeckSummary'

class DeckList extends React.Component {
  render(){
    let decksContent 
    if(!this.props.decks || this.props.decks.length ===0 ){
      decksContent = <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}><Text >No deck found, add new deck</Text></View>
    } else {
      decksContent = <FlatList 
                      data={this.props.decks}  
                      renderItem={({item}) => <DeckSummary deck={item} navigation={this.props.navigation} />}
                      keyExtractor={(item) => item.title}
                      />
    }

    return (
      <View style={{flex: 1}}>
        {decksContent}
      </View>
    )
  }
}

function mapStateToProps(state){
  return {decks: Object.keys(state).map(t => state[t]) };
}

export default connect(mapStateToProps)(DeckList)