import { forIn, startsWith, zipObjectDeep, merge } from 'lodash';

const save = (prefix, state) => {
    const key = Object.keys(state);
    if (prefix) { prefix += '.'; }
    localStorage.setItem(prefix + key, JSON.stringify(state[key]));
    return state;
};

const actions = {
    restoreState: v => state => {
        const props = Object.keys(localStorage);
        props.forEach((prop) => {
            const zipped = zipObjectDeep([prop], [JSON.parse(localStorage[prop])]);
            merge(state, zipped);
            console.log('Restore', prop, zipped);
        });
        console.log('State after restore', state);
    },

    setSystemInfo: value => state => ({ system_info: value }),

    setSplashScreenState: value => state => ({ showSplashScreen: value }),
    setMode: value => state => save('', { mode: value }),

    settings: {
        setVisibility: value => state => save('settings', { isVisible: !state.isVisible }),
        setVisibleCategory: value => state => save('settings', {category: value }),
    },

    telemetry: {
        setBatteryLevel: value => state => ({ batteryLevel: value }),
        setSignalLevel: value => state => ({ signalLevel: value }),
        setTemperature: value => state => ({ temperature: value }),
    },

    motors: null,
    joystick: null,
    stream: null,
    manipulator: {
        m: null,
        axis1: {
            setValue: val => state => save('manipulator.axis1', {value: val}),
            incMax: step => state => save('manipulator.axis1', {max: state.max + step}),
            decMax: step => state => save('manipulator.axis1', {max: state.max - step}),
            incMin: step => state => save('manipulator.axis1', {min: state.min + step}),
            decMin: step => state => save('manipulator.axis1', {min: state.min - step})
        },
        axis2: {
            setValue: val => state => save('manipulator.axis2', {value: val}),
            incMax: step => state => save('manipulator.axis2', {max: state.max + step}),
            decMax: step => state => save('manipulator.axis2', {max: state.max - step}),
            incMin: step => state => save('manipulator.axis2', {min: state.min + step}),
            decMin: step => state => save('manipulator.axis2', {min: state.min - step})
        },
        gripper: {
            setValue: val => state => save('manipulator.gripper', {value: val}),
            incMax: step => state => save('manipulator.gripper', {max: state.max + step}),
            decMax: step => state => save('manipulator.gripper', {max: state.max - step}),
            incMin: step => state => save('manipulator.gripper', {min: state.min + step}),
            decMin: step => state => save('manipulator.gripper', {min: state.min - step})
        },
        reset: (defaultState) => state => {
            forIn(window.localStorage, (value, objKey) => {
                if (true === startsWith(objKey, 'manipulator')) {
                    window.localStorage.removeItem(objKey);
                }
            });
            return defaultState;
        },
    },

    log: (value) => console.log(value),

    system: null,
};

export default actions;
