import React from 'react';
import { View } from 'react-native';
import { createStore }  from 'redux'
import {Provider} from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'

import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import NewQuestion from './components/NewQuestion'
import AppStatusBar from './components/AppStatusBar'
import Quiz from './components/Quiz'

import {setLocalNotification} from './utils/helpers'
import { getDecks } from './utils/api'
import reducer from './reducers'
import {receiveDecks} from './actions'


import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';



const MainScreenTab = createBottomTabNavigator({
  Decks: {
    screen : DeckList,
    navigationOptions : {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='inbox' size={30} color={tintColor} />,
      tabBarOptions : {
        activeTintColor :"purple",
      }
    }
  },
  AddDeck: {
    screen :NewDeck,
    navigationOptions : {
      tabBarLabel: 'Add Deck',
      title: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />,
      tabBarOptions : {
        activeTintColor :"purple",
      }
    }
  }
});

const MainScreenStack = createStackNavigator({
  DeckList: {
    screen: MainScreenTab,
    navigationOptions : {
      headerStyle: {
        backgroundColor: 'purple',
      }
    }
  },
  Deck: { 
    screen: Deck,
    navigationOptions : {
      headerTintColor:'white',
      headerStyle: {
        backgroundColor: 'purple',
      }
    }
  },
  AddCard : {
    screen: NewQuestion,
    navigationOptions : {
      title: 'Add Card',
      headerTintColor:'white',
      headerStyle: {
        backgroundColor: 'purple',
      }
    }
  },
  Quiz : {
    screen: Quiz,
    navigationOptions : {
      headerTintColor:'white',
      headerStyle: {
        backgroundColor: 'purple',
      }
    } 
  }
});

const NavigationContainer = createAppContainer(MainScreenStack);

const store = createStore(reducer)

export default class App extends React.Component {

  componentDidMount(){
    getDecks()
      .then((decks) => {
        debugger;
        store.dispatch(receiveDecks(decks))
      })
    setLocalNotification()
  }

  render(){
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <AppStatusBar backgroundColor="purple" barStyle="light-content" />
          <NavigationContainer />
        </View>
      </Provider>
    )
  }
}