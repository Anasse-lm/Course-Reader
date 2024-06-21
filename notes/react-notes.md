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
```
6. **Updating objects in state:**

- Basically if i have an object to update it all i need is to use useState hook with the spreed syntax **...objName** ex: [...objName, attri: newvalue], and a onChange event handler
```jsx
    const [car, setCar] = useState({
        year: 2024,
        make:'Ford',
        model:'Mustang'
    })
    function handleYearChange(event)
    {
        // This is wrong, because your replacing the car object with prototype car(year, make, model) with car(year)
        setCar({year: event.target.value})

        // The right answer is: 
        setCar({...car, year: event.target.value})
    }
```
7. **UseEffect():**

-  **Def:** React Hook that tells React to **DO THIS CODE WHEN** :
    * This component re-renders

    * This component mounts (which means this component appended to the DOM usually the first time you open the page or when u refresh the page)

    * The state of a value changes

- **syntax:** **useEffect(function, [dependencies])**
    * So their is 3 prototypes of useEffect() hook:

        1. **useEffect(() => {})  // Runs after every re-render**

        2. **useEffect(() => {}, [])  //Runs only on mount**

        3. **useEffect(() => {}, [values])    //Runs on mount + when value changes**

- **Uses:** 

    1. **Event Listeners**

    2. **DOM manipulation**

    3. **Subscription (real-time updates)** // i don't understand this

    4. **Fetching Data from an API**

    5. **Clean up when a component unmounts**

8. **useContext():**

- **Def:** React Hook that allows you to share values between multiple levels of components without passing props through each level.

- It solves the problem of **Props drilling**.

- **PROVIDER COMPONENTS:**
    1. import {createContext} from 'react';
    
    2. export const MyContext = createContext();

    3.  <MyContext.Provider value={value}>
            <Child />
        </MyContext.Provider>

- **CONSUMER COMPONENTS:**
    1.  import React, {useContext} from 'react';
        import { MyContext } from './ComponentA';

    2. const value = useContext(MyContext);

- **Example:**
```
Structure of apps example:

my-app
    |
    |__ src
        |
        |__ components
                |
                |__ ComponentA
                |
                |__ ComponentB
                |
                |__ ComponentC
                |
                |__ ComponentD

            ************************************************************
i.e:    ComponentC is parent of ComponentD
        ComponentB is parent of ComponentC
        ComponentA is parent of ComponentB 
```
```jsx
    // This is the provider component

    import {useState, createContext} from 'react';
    import ComponentB from './ComponentB'
    // we named this var based on state variable (user + Context = UserContext)
    export const UserContext = createContext();

    function ComponentA()
    {
        const [user, setUser] = useState("Anasse")
        return (
            <div>
                <h1>ComponentA</h1>
                <!-- This is where the magic works-->
                <MyContext.Provider value={user}>
                    <!-- We only have to use props ones in ComponentB-->
                    <ComponentB user={user} />
                </MyContext.Provider>
                <h2>Hello {user}</h2>
            </div>
        )
    }
    export default ComponentA;
```
```jsx
    // This is the consumer component
    import {useContext} from 'react';
    import UserContext from './ComponentA';

    function ComponentD()
    {
        const user = userContext(UserContext);

        return (
            <div>
                <h1>ComponentD</h1>
                <h2>Bye {user}</h2>
            </div>
        )
    }
    export default ComponentD;
```

9. **useRef():** 
- **Def:** useState() re-renders the component when the state value changes.
**useRef**:"use reference" **does not cause re-renders when its value changes**.
   * Accessing/Interacting with DOM elements.

    * Handling Focus, Animations, and Transitions

    * Managing Timers and Intervals
