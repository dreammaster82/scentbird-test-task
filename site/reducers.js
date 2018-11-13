/**
 * Created by Denis on 19.06.2017.
 */
import {ADD_2_QUEUE} from './actions';

export default (state = {}, action) => {
    switch (action.type){
        case ADD_2_QUEUE:
            if (!action.id in state) {
                return Object.assign({[action.id]: action.itemType}, state);
            }
        default:
            return state;
    };
};