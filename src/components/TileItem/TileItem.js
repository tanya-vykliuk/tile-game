import React from 'react';
import { connect } from 'react-redux';

import { store } from '../../index';
import { updateTileFlipped, setTileFlipped } from '../../redux/actions';
import ReactCardFlip from 'react-card-flip';
import './TileItem.scss';
const TileItem = (props) => {
    const tileStyle = { backgroundColor: '#' + props.color };
    return (
        <section
            className={
                'tile-item-container available-' +
                props.tilesList.find(
                    (item) => item.tileIndex === props.tileIndex
                ).available
            }
        >
            <ReactCardFlip
                isFlipped={
                    props.tilesList.find(
                        (item) => item.tileIndex === props.tileIndex
                    ).isFlipped
                }
            >
                <div
                    className={
                        'tile-item-front available-' +
                        props.tilesList.find(
                            (item) => item.tileIndex === props.tileIndex
                        ).available
                    }
                    isavailable={
                        props.tilesList.find(
                            (item) => item.tileIndex === props.tileIndex
                        ).available === true
                            ? 'available'
                            : 'stuck'
                    }
                    onClick={() => {
                        if (!props.firstOpened || !props.secondOpened) {
                            store.dispatch(
                                updateTileFlipped(props.tileIndex, true)
                            );
                            store.dispatch(setTileFlipped(props.tileIndex));
                        }
                    }}
                ></div>
                <div className="tile-item-back" style={tileStyle}></div>
            </ReactCardFlip>
        </section>
    );
};
const mapStateToProps = (state) => ({
    tilesList: state.tiles.tilesList,
    firstOpened: state.tiles.firstOpened,
    secondOpened: state.tiles.secondOpened,
});
export default connect(mapStateToProps, {})(TileItem);
