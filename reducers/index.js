import { REVEICE_DECKS, ADD_DECK, ADD_QUESTION, DELETE_DECK } from '../actions'

function decks(state={}, action){
    switch (action.type) {
        case REVEICE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                [action.deck.title]:action.deck
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.title]: {
                    title: action.title,
                    questions:  state[action.title].questions.concat([action.question]) }
            } 
        case DELETE_DECK:{
            return Object.fromEntries(Object.entries(state).filter(([k,v]) => k !==action.title));
        }

        default :
            return state
    }
} 

export default decks