import React from "react"

const TIMEOUT = 150000;
class Homecoming extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timerId: setTimeout(this.homecoming, TIMEOUT)
    };
	}

  componentWillUnmount() {
    clearTimeout(this.state.timerId);
    // clean form state
  }

  homecoming = () => {
    this.props.navigation.navigate("LandingScreen")
  }

  render() {
    return null;
  }
}

export default Homecoming
