import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './DragDrop.scss';

class DragDropItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDraggable: 0,

            originalX: 0,
            originalY: 0,

            translateX: 0,
            translateY: 0,

            lastTranslateX: 0,
            lastTranslateY: 0,
        };
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);

        this.setState({
            isDraggable: 0,
        });
    }

    handleMouseDown = (e) => {
        this.setState({
            isDraggable: 1,
            originalX: e.clientX,
            originalY: e.clientY,
        });
    };

    handleMouseMove = ({ clientX, clientY }) => {
        if (this.state.isDraggable) {
            this.setState((prevState) => ({
                translateX:
                    clientX - prevState.originalX + prevState.lastTranslateX,
                translateY:
                    clientY - prevState.originalY + prevState.lastTranslateY,
            }));
        }
    };

    handleMouseUp = ({ clientX, clientY }) => {
        console.log('mous up');
        this.setState({
            isDraggable: 0,
            lastTranslateX: clientX,
            lastTranslateY: clientY,
        });
    };

    render() {
        const { item } = this.props;
        const { translateX, translateY, isDraggable } = this.state;
        console.log('render -> isDraggable', isDraggable);
        const itemStyle = {
            transform: `translate(${translateX}px, ${translateY}px)`,
        };

        const itemClasses = classNames('draggable__item', {
            'draggable__item--drag': isDraggable === 1,
        });

        return (
            <li
                className={itemClasses}
                onMouseDown={this.handleMouseDown.bind(this)}
                onMouseMove={this.handleMouseMove.bind(this)}
                onMouseUp={this.handleMouseUp.bind(this)}
                style={itemStyle}
            >
                <a className="draggable__item-link">{item}</a>
            </li>
        );
    }
}

export default DragDropItem;
