import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import GoogleMap from "./GoogleMap";

class LocationSearchInput extends React.Component {
  state = { address: "", latLng: { lat: 34.0522, lng: -118.2437 } };

  // handler for controlled element
  handleChange = (address) => {
    this.setState({ address });
  };

  // function to receive full address the user selected on dropdown
  handleSelect = (address) => {
    // convert address to latitude/longitude: {lat: 34.0277237, lng: -118.2729987}
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);
        this.setState({ latLng });
      })
      .catch((error) => console.error("Error", error));
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              Enter Address:{" "}
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input",
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        {this.state.latLng ? (
          <GoogleMap key={this.state.latLng.lat} latLng={this.state.latLng} />
        ) : null}
      </div>
    );
  }
}

export default LocationSearchInput;
