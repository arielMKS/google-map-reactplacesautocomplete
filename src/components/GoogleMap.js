import React from "react";

const google = window.google;

class GoogleMap extends React.Component {
  state = {
    lat: this.props.latLng.lat,
    lng: this.props.latLng.lng,
    zoom: 10,
  };

  containerRef = React.createRef();

  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    let myLatLng = { lat: this.state.lat, lng: this.state.lng };

    const myMap = {
      center: myLatLng,
      zoom: this.state.zoom,
    };

    const map = new google.maps.Map(this.containerRef.current, myMap);
    let marker = new google.maps.Marker({ position: myLatLng, map: map });
  };

  render() {
    const { street, city, state, zip, name } = this.state;
    console.log("Google map props", this.props);
    return (
      <div>
        <div
          style={{
            color: "white",
            marginBottom: "10px",
            padding: "10px",
            backgroundColor: "04b9b6",
          }}
        >
          <div>{name}</div>
          <div>{`${street}, ${city}, ${state}, ${zip}, USA`}</div>
        </div>
        <div
          style={{ width: "100%", height: "90vh" }}
          ref={this.containerRef}
        />
      </div>
    );
  }
}

export default GoogleMap;
