import React from 'react';
import runeData from '../../rune-info';

class RunePage extends React.Component {
    render() {
        let rune = this.props.rune;

        if ( typeof rune.slots === 'undefined' ){
          rune.slots = []; 
        }
        return (
          <li>
            <div>
              <h1>{rune.name}</h1>
              <ul>
                {rune.slots.map((el) => {
                 return (
                   <li>{runeData[el.runeId].name}</li>
                 )
                 })}
               </ul>
             </div>
            </li>
          );
    }
}

export default RunePage;
