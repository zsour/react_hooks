import React,{useState, useEffect, useContext, useReducer, useRef, useLayoutEffect, useImperativeHandle, useMemo, useCallback} from "react";

function USE_EFFECT(){

    /*  

      useEffect() ----------------------------------------------------

        The useEffect hook accepts a function with imperative code. Code that has side effects that are not allowed in the main body of the component.
        That is becuase it would introduce bugs and inconsistencies in the UI.
        
        Side effects can be event handlers, timers, mutations and subscriptions for example. 

      ----------------------------------------------------------------

        The function passed to useEffect will run after the render is committed to the screen.
        This will happen after every render if you don't specify that is should not.
      
      ----------------------------------------------------------------

        Sometimes you want to manipulate views using the DOM, if so, the user can experience visual imperfections because the code will run
        after everything is painted on the screen. Then you should use the hook useLayoutEffect instead, it basiclly does the same thing as useEffect,
        but the difference is that useLayoutEffect will fire before everything is painted on the screen.

        However, what makes the useEffect hook great is that it will fire after everything is painted on the screen, because your app should not wait for
        side effects before being able to render/re-render the application.

      ----------------------------------------------------------------

        If you only want the effect function to fire when a varible has changed, pass the variable/variables in an array as the second parameter. (useEffect(() => {}, [var1, var2])).
        To run the effect only once, pass an empty array.

      ----------------------------------------------------------------

    */

    function logKeycode(e){
        console.log(e.keyCode);
    }

    useEffect(() => {
        console.log("Rendered USE_EFFECT component.");
        document.addEventListener('keypress', logKeycode);

        // The returned function will run before the component will re-render, to clean up the effects.
        return () => {
            document.removeEventListener('keypress', logKeycode);
        };
    });

    const [toggleButton, setToggleButton] = useState(0);

    return <div className="use-effect-container">
        <button onClick={()=>{
            toggleButton ? setToggleButton(0) : setToggleButton(1);
        }}>Re-render component without adding another eventlistener...</button>
    </div>;
}


    /*  

      useContext() ----------------------------------------------------

      A way to pass a variable/variable object down the tree of components.

      For example, if you want to change the theme of your application, you don't want to
      insert a parameter into every component for it to know what theme you want to render.

      Instead you create a context with const ThemeContext = React.createContext(defaultValue),
      and on the child components you do const theme = useContext(ThemeContext).
      The constant "theme" is now your variable/variable object.

      ----------------------------------------------------------------

      Obviously you dont always want to insert the default context to every child component.
      Then you use the tags: 
      
      <ThemeContext.Provider value="newContext">
        <ChildComponent>
      </ThemeContext.Provider>

      ----------------------------------------------------------------

      In some cases it's useful to create the context in a separate file.
      And from that file you export a function to use the context:
      
      const ThemeContext = React.createContext(defaultValue);

      export const UseThemeContext = () => {
        return useContext(ThemeContext);
      };

      export const ThemeContextProvider = (props) => {'

          var manipulatedValue = 0;
    
          return (
            <ThemeContext.Provider value= {manipulatedValue}>
                {props.children}
            </ThemeContext.Provider>
          );
      };

      ThemeContextProvider.propTypes = {
        children: PropTypes.element
      };


      Just wrap the ThemeContextProvider around a component or the entire application,
      then you can access the context by importing the UseThemeContext function.

       ----------------------------------------------------------------

    */



const themes = {
  light: {
    backgroundColor: "#ffffff",
    color: "#222222"
  },

  dark: {
    backgroundColor: "#212121",
    color: "#eeeeee"
  }
};


var ThemeContext = React.createContext(themes.light);


function USE_CONTEXT_CHILD(){

    var theme = useContext(ThemeContext);
    
    return <div className="use-context-container">
      <p>{theme.backgroundColor}</p>
    </div>;
}


function USE_CONTEXT_PARENT(){
    
  return <div className="use-context-container">

    <ThemeContext.Provider value={themes.dark}>
        <USE_CONTEXT_CHILD />
    </ThemeContext.Provider>
      
  
  </div>;
}




function App(){
    return (<div>
        <USE_EFFECT />
        <USE_CONTEXT_PARENT />


    </div>);
}


    

export default App;