import { useEffect, useRef, useState } from 'react';

// REVIEW: What makes hooks so special?
// they are functions that can be used inside functional components
// adding state to functional components -> when the state changes, the component re-renders
// THE COMPONENT, NOT THE HOOK, RE-RENDERS.
// the hook is just a function that can be used inside the component
// So we are adding state (logic) to functional components,
// logic that can be reused in other components



// version 1
// const useDebounce = (fn, miliseconds) => {

//  // the component that USES THIS HOOK will re-render everytime the timer changes
//  // because the timer is part of the state of the component
//  // 
//     const [timer, setTimer] = useState(null);

//     useEffect(() => {
//         return () => {
//             if (timer) {
//                 clearTimeout(timer);
//             }
//         };
//     }, [timer]);

//     return useCallback(
//         (...args) => {
//             if (timer) {
//                 clearTimeout(timer);
//             }
//             setTimer(setTimeout(() => fn(...args), miliseconds));
//         },
//         [fn, miliseconds]
//     );
// }


// version 2
// for search debounce: https://usehooks.com/usedebounce
function useDebounce(fn, delay) {
    // useRef returns a mutable ref object whose .current property 
    // is initialized to the passed argument (initialValue).
    // The returned object will persist for the full lifetime of the component and
    // will not be recreated on re-renders or make the component re-render when mutated.
    const timeoutRef = useRef();

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current); // Clean up function
    }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

    return (...args) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => fn(...args), delay);
    };
}

export default useDebounce;


// The difference between the two versions lies mainly in the use of React's useState and useRef hooks, and also the usage of useCallback.

// Version 1:

// This version uses the useState hook to keep track of the timer. useState is typically used for state that will trigger a re-render when it changes. Because of this, the component will re-render every time the timer is cleared or set, which could potentially be unnecessary in this case as the timer's state doesn't affect the rendered output.

// Additionally, this version uses useCallback to return a memoized version of the debounce function. This means that the debounce function will not change between renders unless its dependencies (fn, miliseconds) change. If this function is being used as a dependency for other effects or memoizations, this could be useful.

// The cleanup function in the useEffect is dependent on timer, so it will run every time the timer changes (i.e., on every call to the debounced function), not just when the component is unmounted.

// Version 2:

// This version uses the useRef hook to keep track of the timer. useRef is used for mutable variables that persist across re-renders and don't trigger a re-render when they change. This is more efficient than the first version because it avoids unnecessary re-renders.

// The cleanup function in the useEffect runs once when the component is unmounted, as its dependency array is empty.

// The debounce function in this version is not memoized, so it will be a new function on each render.

// In conclusion, while both versions will achieve the same effect in terms of debouncing the function, Version 2 is likely to be more efficient because it avoids unnecessary re-renders. The choice between the two would depend on your specific requirements, for example if you need to memoize the debounce function or not.
