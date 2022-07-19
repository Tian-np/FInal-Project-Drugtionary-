const Arrow = (props) => {
    if (props.isRight){
        return (
            <h1 className="m-2" onClick={props.action}>Next</h1>
        )
    }
    return (
        <h1 className="m-2" onClick={props.action}>Prev</h1>
    )
}

export default Arrow 