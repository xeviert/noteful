import React from 'react';
import PropTypes from 'prop-types';

export default function ValidateError(props) {
    return props.message ? <div>{props.message}</div> : <></>
}

ValidateError.propTypes = {
    message: PropTypes.string
}