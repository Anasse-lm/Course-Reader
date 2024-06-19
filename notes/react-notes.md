# Learning Notes:
## React Notes:
1. **Props**:
- **Props** are **read-only** properties that are shared between components. A parent component can send data to a child component. 
    ```jsx
        <Component key=value />
- after creating a component with props it's a good practice to add a propTypes config to it for a debugging purpose.

    ```jsx
        import propTypes from 'prop-types'
        function Component(props)
        {
            .....
        }
        
        Component.propTypes = {
            attr1: propTypes.string
            ....
        }
        export default Component

- We can use also defaultProps: default values for props in case they are not passed from the parent component.
        
    ```jsx
        import propTypes from 'prop-types'
        function Component(props)
        {
            .....
        }
        
        Component.defaultProps = {
            attr1: value
            ....
        }
        export default Component
2. **Conditional Rendering**:
- It allows you to control what gets rendered in your application based on certain conditions **(show, hide or change components)**

    **Basically what we use to render elements in our component are:** 

        - If else statement
        - Tenary operators

3. **React Hooks:**
- Special functions that allows functional components to use React features without writing class components **(useState, useEffect, useContext, useReducer, useCallback, and more ...)**
    * **useState:** A react hook that allows the creation of a stateful variable AND a setter function to update its value in the virtual DOM: 
        
        ```jsx
            const [name, setName] = useState(0)
    * **Example: Counter Program**
        ```jsx
            //Counter component
            import {useState} from 'react'

            export default function Counter()
            {
                let [count, setCount] = useState(0)
                let [color,setColor] = useState({color: "white"})
                const incrementCount = () => {
                    setColor({color: "green"}) 
                    setCount(count + 1)
                }
                const decrementCount = () => {
                    setColor({color: "red"}) 
                    setCount(count - 1)
                }
                return (
                    <div>
                        <h1 style={color}>{count}</h1>
                        <button onClick={incrementCount}> + </button>
                        <button onClick={decrementCount}> - </button>
                    </div>
                )
            }
4. **Onchange event handler:**
* Event handler used primarily with form elements ex. input, textarea, select, radio. **Triggers a function every time the value of the input changes.**

5. **Updater function:**
- A function passed as an argument to setState() usually **ex.** setYear(prevYear => prevYear + 1).<br> 
**-Allow for safe updates based on the previous state**<br>
**-Used with multiple state updates and asynchronous functions**<br>
**-Good practice to use updater functions**
```jsx
    //Counter component
    import {useState} from 'react'

    export default function Counter()
    {
        let [count, setCount] = useState(0)
        let [color,setColor] = useState({color: "white"})
        const incrementCount = () => {
            setColor({color: "green"}) 
            // multiple state updates
            setCount(c => c + 1)
            setCount(c => c + 1)
        }
        const decrementCount = () => {
            setColor({color: "red"}) 
            // multiple state updates
            setCount(c => c - 1)
            setCount(c => c - 1)
        }
        const reset = () => {
            //no need for a updater function here
            setCount(0)
        }
        return (
            <div>
                <h1 style={color}>{count}</h1>
                <button onClick={incrementCount}> + </button>
                <button onClick={reset}> reset </button>
                <button onClick={decrementCount}> - </button>
            </div>
        )
    }

