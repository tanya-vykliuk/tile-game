import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { store } from '../../index';
import {
    setTilesList,
    clearFlipped,
    saveFlipped,
    resetGame,
} from '../../redux/actions';
import TileItem from '../../components/TileItem/TileItem';
import { tileColors } from '../../constants/tilesColors';
import { shuffle } from '../../helpers/math';

import './HomePage.scss';

const HomePage = (props) => {
    const initialTiles = () => {
        const initialTilesList = [];
        const shufledColors = shuffle(tileColors);
        for (let tileIndex = 0; tileIndex < 16; tileIndex++) {
            initialTilesList.push({
                tileIndex,
                isFlipped: false,
                available: true,
                color: shufledColors[tileIndex],
            });
        }

        store.dispatch(setTilesList(initialTilesList));
    };

    useEffect(() => {
        if (props.tilesList.length === 0) {
            initialTiles();
        }
    });

    const checkSquash = () => {
        if (props.firstOpened !== null && props.secondOpened !== null) {
            if (
                props.tilesList.find(
                    (item) => item.tileIndex === props.firstOpened
                ).color ===
                props.tilesList.find(
                    (item) => item.tileIndex === props.secondOpened
                ).color
            ) {
                store.dispatch(saveFlipped());
            } else {
                store.dispatch(clearFlipped());
            }
        }
    };

    const checkFinish = () => {
        return props.win === 1 ? 'Congratulations! You win!' : '';
    };

    useEffect(() => {
        setTimeout(() => {
            checkSquash();
        }, 1500);
        //eslint-disable-next-line
    }, [props.firstOpened, props.secondOpened]);

    useEffect(() => {
        checkFinish();
        //eslint-disable-next-line
    }, [props.win]);

    const renderTiles = () => {
        if (props.tilesList.length > 0) {
            return props.tilesList.map((tileItem) => {
                return (
                    <TileItem
                        key={tileItem.tileIndex}
                        tileIndex={tileItem.tileIndex}
                        isFlipped={tileItem.isFlipped}
                        available={tileItem.available}
                        color={tileItem.color}
                    />
                );
            });
        }
    };
    const resetGameHandler = () => store.dispatch(resetGame());

    return (
        <>
            <h2>Welcome to Tile Game!</h2>
            <h3>
                Flip the tiles, find all tiles with same color by pairs and win!
                Have fun.
            </h3>
            <h2>{checkFinish()}</h2>
            <section className="tiles-container">{renderTiles()}</section>
            <button onClick={() => resetGameHandler()}>Restart Game</button>
        </>
    );
};
const mapStateToProps = (state) => ({
    tilesList: state.tiles.tilesList,
    firstOpened: state.tiles.firstOpened,
    secondOpened: state.tiles.secondOpened,
    win: state.tiles.win,
});
export default connect(mapStateToProps, {})(HomePage);
