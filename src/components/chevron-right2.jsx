import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let NavigationChevronRight2 = (props) => (
    <SvgIcon {...props}>
        <path d="M7 6L5.59 7.41 10.17 12l-4.58 4.59L7 18l6-6zM13 6L11.59 7.41 16.17 12l-4.58 4.59L13 18l6-6z"/>
     {/*<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>*/}
    </SvgIcon>
);
NavigationChevronRight2 = pure(NavigationChevronRight2);
NavigationChevronRight2.displayName = 'NavigationChevronRight2';
NavigationChevronRight2.muiName = 'SvgIcon';

export default NavigationChevronRight2;