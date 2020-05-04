import React, { useState, useEffect } from 'react';
import * as Yup from "yup";
import axios from 'axios';

function Pizza () {
    const [toppings, setToppings] = useState(["Pepperoni", "Sausage", "Canadian Bacon", "Spicy Italian Sausage", "Grilled Chicken", "Onions", "Green Pepper", "Diced Tomatoes", "Black Olives", "Roasted Garlic", "Artichoke Hearts", "Three Cheese", "Pineapple", "Extra Cheese"]);

    const [pizza, setPizza] = useState({
       name: "",
       size: "Small",
       sauce: "Original Ranch",
       toppings: [],
       substitute: true,
       special: "",
       quantity: "1",
    });

    // Validation

    const [errors, setErrors] = useState({
        name: ""
     });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    
    const formSchema = Yup.object().shape({
        name: Yup
            .string()
            .min(2, "Your name must be longer than 2 characters")
            .required("Name is required")
    });

    useEffect(() => {
        formSchema.isValid(pizza).then(valid => {
            setButtonDisabled(!valid);
        })
    }, [pizza])

    const validateChange = event => {
        Yup.reach(formSchema, event.target.name).validate(event.target.value).then(valid => {
             setErrors({
                 ...errors,
                 [event.target.name]: ""
             })
        }).catch(err => {
            setErrors({
                ...errors,
                [event.target.name]: err.errors[0]
            })
        })
    }


    // Axios Data

    const [post, setPost] = useState([]);



    // Form handlers
    const removeTopping = (arr, event) => {
       let newTop = [...arr].filter(item => item !== event.target.value);
       return newTop
    }

    const handleChange = event => {
        // If a checkbox item is checked add to state, if unchecked, remove from state.
        event.persist();

        if(event.target.type === "checkbox" && event.target.name !== "substitute") {      
            event.target.checked? setPizza({
                    ...pizza,
                    [event.target.name]:  [...pizza.toppings, event.target.value]
                }) : setPizza(prevState => {
                    return {
                        ...prevState,
                        [event.target.name]:  removeTopping(prevState.toppings, event)
                    }
                });
        } else if (event.target.type === "checkbox" && event.target.name === "substitute") {
            // Event is checkbox but not a topping

            event.target.checked? setPizza({
                ...pizza,
                [event.target.name]: true
            }): setPizza({
                ...pizza,
                [event.target.name]: false
            })

        } else {
            // Event is something else
            validateChange(event);
            setPizza({
                ...pizza,
                [event.target.name]: event.target.value
            });
        }
    };

    const formSubmit = event => {
        event.preventDefault();
        axios
            .post("https://reqres.in/api/users", pizza)
            .then(response => {
                setPost(response.data);
                console.log("success", response)
            })
    }

    return (
        <form>
             <label htmlFor="name">
                <div>
                    <p>Name</p>
                </div>
                <input type="text" placeholder="Full Name" name="name" onChange={event => handleChange(event)} value={pizza.name} />
                { errors.name.length > 0? (<p>{errors.name}</p>): null }
            </label>

            {/* Size */}
            <label htmlFor="size">
                <div>
                    <p>Choice of Size</p>
                    <small>required</small>
                </div>

                <select type="select" name="size" onChange={e => handleChange(e) }>
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
                    <input type="radio" value="Original Ranch" name="sauce" defaultChecked onChange={e => handleChange(e) }/>
                    Original Ranch
                </label>

                <label htmlFor="radio-labels" className="radio-labels">
                    <input type="radio" value="Garlic Ranch" name="sauce" onChange={e => handleChange(e) }/>
                    Garlic Ranch
                </label>

                <label htmlFor="radio-labels" className="radio-labels">
                    <input type="radio" value="BBQ Sauce" name="sauce" onChange={e => handleChange(e) }/>
                    BBQ Sauce
                </label>

                <label htmlFor="radio-labels" className="radio-labels">
                    <input type="radio" value="Spinach Alfredo" name="sauce" onChange={e => handleChange(e) }/>
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
                                <input type="checkbox" name="toppings" value={topping} onChange={e => handleChange(e) }/>
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
                    <input type="checkbox" name="substitute" value={pizza.substitute} checked={pizza.substitute}  onChange={event => handleChange(event)} />
                    Gluten Free Crust
                </label>
            </label>

            {/* Anything else input */}
            <label htmlFor="substitute">
                <div>
                    <p>Special Instructions</p>
                </div>
                <input type="text" placeholder="Anything else you'd like to add?" name="special" onChange={event => handleChange(event)} />
            </label>

            {/* Quantity and Amount */}

            <div className="amount-section">
                <input type="number" min="1" max="10" name="quantity" onChange={ event => handleChange(event) } value={pizza.quantity} />
                <button className="submit-btn" disabled={buttonDisabled} onClick={ event => formSubmit(event)} >
                    <span className="final-command">Add to order</span>
                    <span className="price">$17.99</span>
                </button>
            </div>
        </form>
    )
}

export default Pizza;