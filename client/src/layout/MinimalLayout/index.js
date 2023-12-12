import PropTypes from 'prop-types';
import React from 'react';


//-----------------------|| MINIMAL LAYOUT ||-----------------------//

const MinimalLayout = (props) => {
    return (
        <React.Fragment>
            {props.children}

        </React.Fragment>
    );
};

MinimalLayout.propTypes = {
    children: PropTypes.node
};

export default MinimalLayout;