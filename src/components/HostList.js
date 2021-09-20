import React from "react";
import { Card } from "semantic-ui-react";
import Host from './Host';

function HostList({hosts, selectedHost, setSelectedHost}) {
  const renderHosts = hosts.map(host => 
    <Host 
      key={host.id} 
      host={host} 
      selectedHost={selectedHost} 
      setSelectedHost={setSelectedHost} 
    />
  )
  
  return (
    <Card.Group itemsPerRow={6}>{renderHosts}</Card.Group>
  );
}

export default HostList;
