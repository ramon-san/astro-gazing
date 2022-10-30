// Return a function that accepts a function and executes that function while catching any errors which are passed to next.
export default func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}