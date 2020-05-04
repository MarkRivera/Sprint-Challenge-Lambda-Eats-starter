import React, { useState } from 'react';

function Pizza () {
    const [toppings, setToppings] = useState(["Pepperoni", "Sausage", "Canadian Bacon", "Spicy Italian Sausage", "Grilled Chicken", "Onions", "Green Pepper", "Diced Tomatoes", "Black Olives", "Roasted Garlic", "Artichoke Hearts", "Three Cheese", "Pineapple", "Extra Cheese"]);

    const [pizza, setPizza] = useState({
       size: "Small",
       sauce: "Original Ranch",
       toppings: [],
       substitute: true,
       special: "",
       quantity: "1"
    });

    const removeTopping = (arr, event) => {
        console.log(arr);
       let newTop = [...arr].filter(item => item !== event.target.value);
       console.log(newTop)

       return newTop
    }

    const changeHandler = event => {
        // If a checkbox item is checked add to state, if unchecked, remove from state.
        event.persist();

        if(event.target.type === "checkbox") {      
            event.target.checked? setPizza({
                    ...pizza,
                    [event.target.name]:  [...pizza.toppings, event.target.value]
                }) : setPizza(prevState => {
                    return {
                        ...prevState,
                        [event.target.name]:  removeTopping(prevState.toppings, event)
                    }
                });
        }
    };

    const formSubmit = event => {
        event.preventDefault();
    }

    return (
        <form>
            {/* Size */}
            <label htmlFor="size">
                <div>
                    <p>Choice of Size</p>
                    <small>required</small>
                </div>

                <select type="select" name="size" onChange={e => changeHandler(e) }>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                </select>
            </label>

            {/* Sauce */}
            <label htmlFor="sauce">
                <div>
                    <p>Choice of Sauce</p>
                    <small>required</small>
                </div>
                <label htmlFor="radio-labels" className="radio-labels">
                    <input type="radio" value="Original Ranch" name="sauce" defaultChecked onChange={e => changeHandler(e) }/>
                    Original Ranch
                </label>

                <label htmlFor="radio-labels" className="radio-labels">
                    <input type="radio" value="Garlic Ranch" name="sauce" onChange={e => changeHandler(e) }/>
                    Garlic Ranch
                </label>

                <label htmlFor="radio-labels" className="radio-labels">
                    <input type="radio" value="BBQ Sauce" name="sauce" onChange={e => changeHandler(e) }/>
                    BBQ Sauce
                </label>

                <label htmlFor="radio-labels" className="radio-labels">
                    <input type="radio" value="Spinach Alfredo" name="sauce" onChange={e => changeHandler(e) }/>
                    Spinach Alfredo
                </label>
            </label>

            {/* Toppings */}
            <label htmlFor="toppings">
                <div>
                    <p>Add Toppings</p>
                    <small>Choose Any</small>
                </div>

                <label htmlFor="topping-labels" className="topping-labels">
                    {toppings.map(topping => {
                        return (
                            <label className="topping">
                                <input type="checkbox" name="toppings" value={topping} onChange={e => changeHandler(e) }/>
                                {topping}
                            </label>
                        )
                    })}
                </label>
            </label>

            {/* Substitute */}
            <label htmlFor="substitute">
                <div>
                    <p>Choice of Substitute</p>
                    <small>Choose Up To 1</small>
                </div>
                <label htmlFor="substitute-label">
                    <input type="checkbox" name="substitute" value="true" checked={true} />
                    Gluten Free Crust
                </label>
            </label>

            {/* Anything else input */}
            <label htmlFor="substitute">
                <div>
                    <p>Special Instructions</p>
                </div>
                <input type="text" placeholder="Anything else you'd like to add?" name="special" />
            </label>

            {/* Quantity and Amount */}

            <div className="amount-section">
                <input type="number" min="1" max="10" name="quantity" />
                <button className="submit-btn">
                    <span className="final-command">Add to order</span>
                    <span className="price">$17.99</span>
                </button>
            </div>

        </form>
    )
}

export default Pizza;