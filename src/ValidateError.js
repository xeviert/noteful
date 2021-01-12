import React from 'react';

export default function ValidateError(props) {
    return props.message ? <div>{props.message}</div> : <></>
}

// ValidateError.propTypes = {
//     message: PropTypes.string
// }