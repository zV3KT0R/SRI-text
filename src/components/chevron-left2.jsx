import React    from 'react';
import pure     from 'recompose/pure';
import SvgIcon  from 'material-ui/SvgIcon';

let NavigationChevronLeft2 = (props) => (
    <SvgIcon {...props}>
        <path d="M12.41 7.41L11 6l-6 6 6 6 1.41-1.41L7.83 12zM18.41 7.41L17 6l-6 6 6 6 1.41-1.41L13.83 12z"/>
        {/* <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/> */}
    </SvgIcon>
);
NavigationChevronLeft2 = pure(NavigationChevronLeft2);
NavigationChevronLeft2.displayName = 'NavigationChevronLeft2';
NavigationChevronLeft2.muiName = 'SvgIcon';

export default NavigationChevronLeft2;