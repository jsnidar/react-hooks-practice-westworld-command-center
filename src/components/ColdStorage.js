import React from "react";
import { Segment } from "semantic-ui-react";
import HostList from "./HostList";

function ColdStorage({hosts, selectedHost, setSelectedHost}) { 
  const coldStorageHosts = hosts.filter(host => host.active === false)
  return (
    <Segment.Group className="HQComps">
      <Segment compact>
        <h3 className="labels">ColdStorage</h3>
      </Segment>
      <Segment compact>
        <HostList 
          selectedHost={selectedHost} 
          setSelectedHost={setSelectedHost} 
          hosts={coldStorageHosts} />      
      </Segment>
    </Segment.Group>
  );
}

export default ColdStorage;
