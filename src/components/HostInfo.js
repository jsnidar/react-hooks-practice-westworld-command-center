import React, { useState } from "react";
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import "../stylesheets/HostInfo.css";

function HostInfo( {logTooManyHosts, selectedHost, areas, hosts, onAreaChange, onRadioClick}) {
  // This state is just to show how the dropdown component works.
  // Options have to be formatted in this way (array of objects with keys of: key, text, value)
  // Value has to match the value in the object to render the right text.
  // IMPORTANT: But whether it should be stateful or not is entirely up to you. Change this component however you like.
  const [options] = useState(areas.map(area => { 
    return {key: area.name, text: area.name, value: area.name}
  }));  

  const handleOptionChange = (e, { value }) => {
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger or console.log in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
    const hostsInSelectedArea = hosts.filter(host => host.area === value).length
    const limitInArea = areas.find(area => area.name === value).limit

    if(hostsInSelectedArea < limitInArea) {
      const updatedHost = {...selectedHost, area: value};
      onAreaChange(updatedHost) 
    }else{
      logTooManyHosts(selectedHost.firstName, value)
    }
  }

  const handleRadioChange = (e, {checked}) => {
    const updatedHost = { ...selectedHost, active: checked }
    
    onRadioClick(updatedHost)
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          src={selectedHost.imageUrl}
          floated="left"
          size="small"
          className="hostImg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {selectedHost.firstName} | {selectedHost.gender === 'Male' ? <Icon name="man" /> : <Icon name="woman" />}
              {/* Think about how the above should work to conditionally render the right First Name and the right gender Icon */}
            </Card.Header>
            <Card.Meta>
              {/* Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */}
              {/* Checked takes a boolean and determines what position the switch is in. Should it always be true? */}
              <Radio
                onChange={handleRadioChange}
                label={selectedHost.active ? "Active": 'Decommissioned'}
                checked={selectedHost.active}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area:
            <Dropdown
              onChange={handleOptionChange}
              value={selectedHost.area}
              options={options}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default HostInfo;
