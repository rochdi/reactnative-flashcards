import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

const DeckSummary = ({deck, navigation}) => 
    (
      <View style={{flex: 1, padding:10,alignItems: 'center'}}>
          <TouchableOpacity  onPress={() => navigation.navigate('Deck', {title:deck.title})}>
              <Text style={{color: 'purple', fontSize: 30}}>{deck.title}</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 12}}>
              {deck.questions.length} cards
          </Text>
      </View>
    )
    
export default DeckSummary;

