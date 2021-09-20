import React from "react";
import { Segment } from "semantic-ui-react";
import Area from "./Area";

function WestworldMap({hosts, areas, selectedHost, setSelectedHost}) {
  const renderAreas = areas.map(area => 
    <Area 
      key={area.id} 
      area={area} 
      hosts={hosts} 
      selectedHost={selectedHost} 
      setSelectedHost={setSelectedHost}  
    />
  )
  return <Segment id="map">{renderAreas}</Segment>;
}

export default WestworldMap;
