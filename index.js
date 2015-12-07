import React from 'react';
import ReactDOM from 'react-dom';

const model = new falcor.Model({
    cache: {
        ingredientsById: {
            1: {
                name: 'flour',
                description: 'white'
            },
            2: {
                name: 'chocolate',
                description: 'good'
            }
        },
        recipes: [
            {
                name: "cookies",
                instructions: "bakem",
                ingredients: [
                    {
                        $type:"ref",
                        value:"ingredientsById[1]"
                    },
                    {
                        $type:"ref",
                        value:"ingredientsById[2]"
                    }
                ]
            },
            {
                name: "brownies",
                instructions: "dsfdsfa",
                ingredients: [
                    {
                        $type:"ref",
                        value:"ingredientsById[1]"
                    }
                ]
            }
        ]
    }
});

const model2 = [
    {
        name: "cookies",
        instructions: "bakem"
    },
    {
        name: "brownies",
        instructions: "dsfdsfa"
    }
];

model.get('recipes[0..1].ingredients[0..9]')
    .then(data => {
        console.log(data);
    });

class App extends React.Component {
    render() {
        return (
            <h1>Works!</h1>
        );
    }
}

ReactDOM.render( <App/>, document.getElementById('target'));
