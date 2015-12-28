import React from 'react';
import RunePage from './RunePage';

class RunePageList extends React.Component {
    render() {
        let runes = this.props.runes;

        return (
            <ul>
                {runes.map((el) => {
                    return <RunePage rune={el} />
                })}
            </ul>
        )
    }
}

export default RunePageList;
