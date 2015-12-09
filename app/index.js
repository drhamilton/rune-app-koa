import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render() {
        return (
            <div>
                <RecipeList />
            </div>
        );
    }
}

const RecipeList = React.createClass({
    getInitialState() {
        return {
            recipies: []
        };
    },
    componentWillMount() {

    },
    render() {
        return (
            <div>
                Apples
            </div>
        );
    }
});

ReactDOM.render( <App/>, document.getElementById('target'));
