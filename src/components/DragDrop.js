import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './DragDrop.scss';

class DragDrop extends Component {
    static propTypes = {
        items: PropTypes.instanceOf(Array),
    };

    static defaultProps = {
        items: [],
    };

    constructor(props) {
        super(props);

        this.state = {
            isDraggable: false,
            dragIndex: 0,

            originalX: 0,
            originalY: 0,

            translateX: 0,
            translateY: 0,

            lastTranslateX: 0,
            lastTranslateY: 0,
        };
    }

    handleMouseDown = (index, e) => {
        console.log(e.clientX);
        console.log(e.clientY);
        this.setState({
            isDraggable: true,
            dragIndex: index,
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
                    clientY - prevState.originalY + prevState.lastTranslateX,
            }));
        }
    };

    handleMouseUp = ({ clientX, clientY }) => {
        this.setState({
            isDraggable: false,
            dragIndex: 0,
            lastTranslateX: clientX,
            lastTranslateY: clientY,
        });
    };

    render() {
        const { items } = this.props;
        const { dragIndex, translateX, translateY, isDraggable } = this.state;
        console.log('DragDrop -> render -> translateY', translateY);
        console.log('DragDrop -> render -> translateX', translateX);

        const listItems = items.map((item, index) => {
            const newIndex = index + 1;
            const itemClasses = classNames('draggable__item', {
                'draggable__item--drag': dragIndex === newIndex,
            });
            let itemStyle;

            if (dragIndex === newIndex) {
                itemStyle = {
                    transform: `translate(${translateX}px, ${translateY}px)`,
                };
            }
            return (
                <li
                    className={itemClasses}
                    key={index}
                    onMouseDown={this.handleMouseDown.bind(this, newIndex)}
                    onMouseMove={this.handleMouseMove.bind(this)}
                    onMouseUp={this.handleMouseUp.bind(this)}
                    style={itemStyle}
                >
                    <a className="draggable__item-link">{item}</a>
                </li>
            );
        });

        return (
            <div className="draggable__container">
                <ul className="draggable__items">{listItems}</ul>
            </div>
        );
    }
}

export default DragDrop;
