import { AsyncStorage } from 'react-native'

const FLASHCARD_STORAGE_KEY = 'RchFlashCards:decks'

export function getDecks () {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
                     .then(JSON.parse)
}

export function getDeck ({ id }) {
    getDecks()[id];
}

export function createDeck (title) {
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
    [title]: {title: title, questions: []}
  }))
}

export function deleteDeck(title){
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
          .then((results) => {
            const data = JSON.parse(result)
            data[title] = undefined
            delete data[title]
            AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
          })
}

export function addCardToDeck(title, card){
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      if(data[title]) {
        data[title].questions.push(card)
      }  else {
        data[title] = {title: title, questions: [card]}
      } 
      AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
    })
}
