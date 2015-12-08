import React from 'react';
import ReactDOM from 'react-dom';
const $ref = falcor.Model.ref;

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
                    $ref("ingredientsById[1]"),
                    $ref("ingredientsById[2]")
                ]
            },
            {
                name: "brownies",
                instructions: "dsfdsfa",
                ingredients: [
                    $ref("ingredientsById[1]")
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

model.get('recipes[0..1].ingredients[0..9]["name", "description"]')
    .then(data => {
        console.log(data);
    });

class App extends React.Component {
    render() {
        return (
            <div>
                <RecipeList recipes={
                    [
                        {
                            name:"Brownies",
                            instructions:"bake",
                            ingredients:['flour','choc']
                        }
                    ]
                } />
            </div>
        );
    }
}

class RecipeList extends React.Component {
    render() {
        return (
            <div>
                {this.props.recipes.map( recipe => {
                    return (
                        <Recipe {...recipe}/>
                    )
                })}
            </div>
        );
    }
}

class Recipe extends React.Component {
    render() {
        return (
            <div>
                <Name name={this.props.name} />
                <Instructions instructions={this.props.instructions} />
                <Ingredients ingredients={this.props.ingredients} />
            </div>
        );
    }
}

class Name extends React.Component {
    render() {
        return (
            <h1>{this.props.name}</h1>
        )
    }
}

class Instructions extends React.Component {
    render() {
        return (
            <h1>{this.props.instructions}</h1>
        )
    }
}

class Ingredients extends React.Component {
    render() {
        return (
            <h1>{JSON.stringify(this.props.ingredients)}</h1>
        )
    }
}

ReactDOM.render( <App/>, document.getElementById('target'));
