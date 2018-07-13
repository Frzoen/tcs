import { telemetry } from "../telemetry";

const actions = {
  setBootScreenState: value => state => ({ showBootScreen: value }),
  setMode: value => state => ({ mode: value }),

  settings: {
    setVisibility: value => state => ({ isVisible: !state.isVisible }),
    setVisibleCategory: value => state => ({ category: value })
  },

  telemetry: {
    setBatteryLevel: value => state => ({ batteryLevel: value }),
    setSignalLevel: value => state => ({ signalLevel: value }),
    setTemperature: value => state => ({ temperature: value }),
  }
}

export default actions