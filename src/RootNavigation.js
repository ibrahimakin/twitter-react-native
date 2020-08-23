import { StackActions } from '@react-navigation/native';

import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export function replace(...args) {
    navigationRef.current?.dispatch(StackActions.replace(...args));
}

export function pop(...args) {
    navigationRef.current?.dispatch(StackActions.pop());
}

// add other navigation functions that you need and export them