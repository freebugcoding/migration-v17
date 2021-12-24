import HooksVsClass from "./components/HooksVsClass";
import React from 'react'
import ColoredCounterWithHooks from "./examples/useState/ColoredCounterWithHooks";
import ColoredCounterClass from "./examples/useState/ColoredCounterClass";
import UsersListHooks from "./examples/useEffect/UsersListHooks";
import UsersListClass from "./examples/useEffect/UsersListClass";
const routes = [
    {
        id: 'useState',
        title: 'useState',
        path:'/useState',
        description: 'manage yout component stage within functional component',
        element: () => <HooksVsClass title="useState: stateful counter" hookComponent={ColoredCounterWithHooks} classComponent={ColoredCounterClass}/>
    },
    {
        id: 'useRef',
        title: 'useRef',
        path:'/useRef',
        description: 'refs are now available to use in functional component',
        element: () => <HooksVsClass title="useRef: display render time" hookComponent={ColoredCounterWithHooks} classComponent={ColoredCounterClass}/>
    },
    {
        id: 'useEffect',
        title: 'useEffect',
        path:'/useEffect',
        description: 'a new way to code lifecycle logic overcome class lifecycle overhead and write more flexible and readable code',
        element: () => <HooksVsClass title="useEffect: data fetching and event listener" hookComponent={UsersListHooks} classComponent={UsersListClass}/>
    }
]

export default routes;