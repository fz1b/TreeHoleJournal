import MuiDialogContent from '@material-ui/core/DialogContent';
import {HiOutlineLocationMarker} from 'react-icons/hi';
import { IconContext } from "react-icons";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

const LocationContent = withStyles((theme) => ({
    root: {
        padding:"10px"
    },
}))(MuiDialogContent);
function JournalLocation(){
    const[showInput,setShowInput] = useState(false);
    const [location, setLocation] = useState("");

    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
      });
    const handleLocationAdd = ()=>{
        console.log("add")
        setShowInput(true);
    }
    const handleSelect = async (value)=>{
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setLocation(value);
        setCoordinates(latLng);
    }
return(
    <>
    <LocationContent dividers={true}>
    <PlacesAutocomplete
    value={location}
    onChange={setLocation}
    onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <>
          <Box display="flex">
          <Box mr={2}>
        <IconContext.Provider value={{ color: '#50A9C1'}}>
        <HiOutlineLocationMarker size={30}/>
         </IconContext.Provider>
        </Box>
        {!showInput&&<Button color="primary" size="small" style={{textTransform: 'none'}} onClick={handleLocationAdd}>Add a Location</Button>} 
        {showInput&&
        <TextField 
                        id='outlined-basic'
                        variant='outlined'
                        size='small'
                        fullWidth
                        value={""}
                        {...getInputProps({ placeholder: "Type location..." })}
                    />}
          </Box>
            <Box ml={8}>
            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#eceaea" : "#fff",
                  color:"grey"
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
            </Box>
          </>
        )}
    </PlacesAutocomplete>
    </LocationContent>
    </>
)

}
export default JournalLocation