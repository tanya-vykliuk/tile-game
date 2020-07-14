import * as actionTypes from '../../constants/reduxActions';
const tilesReducer = (
    state = {
        tilesList: [],
        firstOpened: null,
        secondOpened: null,
        win: null,
    },
    action
) => {
    switch (action.type) {
        case actionTypes.SET_TILES_LIST:
            return {
                ...state,
                tilesList: [...action.tilesList],
            };
        case actionTypes.UPDATE_TILE_FLIPPED:
            const updated = state.tilesList.map((item) => {
                if (item.tileIndex === action.tileIndex) {
                    item.isFlipped = action.flag;
                }
                return item;
            });
            return {
                ...state,
                tilesList: [...updated],
            };
        case actionTypes.SET_TILE_FLIPPED:
            if (state.firstOpened !== null && state.secondOpened === null) {
                state.secondOpened = action.tileIndex;
            }
            if (state.firstOpened === null) {
                state.firstOpened = action.tileIndex;
            }
            return {
                ...state,
                firstOpened: state.firstOpened,
                secondOpened: state.secondOpened,
            };

        case actionTypes.CLEAR_FLIPPED:
            const cleared = state.tilesList.map((item) => {
                if (item.available) {
                    item.isFlipped = false;
                }
                return item;
            });
            return {
                ...state,
                tilesList: [...cleared],
                firstOpened: null,
                secondOpened: null,
            };
        case actionTypes.SAVE_FLIPPED:
            let done = 0;
            const saved = state.tilesList.map((item) => {
                if (
                    item.tileIndex === state.firstOpened ||
                    item.tileIndex === state.secondOpened
                ) {
                    item.available = false;
                }
                if (item.isFlipped && !item.available) {
                    done++;
                }
                return item;
            });
            return {
                ...state,
                tilesList: [...saved],
                firstOpened: null,
                secondOpened: null,
                win: done === state.tilesList.length ? 1 : null,
            };
        case actionTypes.RESET_GAME:
            return {
                tilesList: [],
                firstOpened: null,
                secondOpened: null,
            };
        default:
            return state;
    }
};
export default tilesReducer;
