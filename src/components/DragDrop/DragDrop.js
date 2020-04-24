import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DragDropItem from './DragDropItem';

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
    }

    render() {
        const { items } = this.props;

        const listItems = items.map((item, index) => (
            <DragDropItem item={item} key={index} />
        ));

        return (
            <div className="draggable__container">
                <ul className="draggable__items">{listItems}</ul>
            </div>
        );
    }
}

export default DragDrop;
