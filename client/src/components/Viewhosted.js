import React, { Fragment, useEffect, useState } from 'react';

const Viewhosted = (props) => {
    const [type, setType] = useState("")
    useEffect(() => {
        setType(props.match.params.type)
    },[])
    return ( 
        <Fragment>
            {
                type === "place" ? <h1>place</h1> : <h1>experience</h1>
            }
        </Fragment>
    );
}
 
export default Viewhosted;