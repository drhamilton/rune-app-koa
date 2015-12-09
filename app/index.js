import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

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
            greeting: 'Sup'
        };
    },
    componentWillMount() {
        request
            .get('/api')
            .end((err, res) => {
                console.log(res)
                this.setState({ greeting: res.body.id });
            })
    },
    render() {
        return (
            <div>
                {this.state.greeting}
            </div>
        );
    }
});

ReactDOM.render( <App/>, document.getElementById('target'));
