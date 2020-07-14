import * as actionTypes from '../../constants/reduxActions';

export const setTilesList = (tilesList) => ({
    type: actionTypes.SET_TILES_LIST,
    tilesList,
});

export const setTileFlipped = (tileIndex) => ({
    type: actionTypes.SET_TILE_FLIPPED,
    tileIndex,
});

export const updateTileFlipped = (tileIndex, flag) => ({
    type: actionTypes.UPDATE_TILE_FLIPPED,
    tileIndex,
    flag,
});

export const clearFlipped = () => ({
    type: actionTypes.CLEAR_FLIPPED,
});

export const saveFlipped = () => ({
    type: actionTypes.SAVE_FLIPPED,
});

export const resetGame = () => ({
    type: actionTypes.RESET_GAME,
});
