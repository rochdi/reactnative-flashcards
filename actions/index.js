export const REVEICE_DECKS = 'REVEICE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'
export const DELETE_DECK = 'DELETE_DECK'

export function receiveDecks(decks){
    return {
        type: REVEICE_DECKS,
        decks
    }
}

export function addDeck(deck){
    return {
        type: ADD_DECK,
        deck
    }
}

export function deleteDeck(title){
    return {
        type:DELETE_DECK,
        title
    }
}

export function addQuestion(title, question){
    return {
        type: ADD_QUESTION,
        title,
        question
    }
}