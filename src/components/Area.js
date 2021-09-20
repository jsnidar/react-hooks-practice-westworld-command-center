import React from "react";
import "../stylesheets/Area.css";
import HostList from './HostList';

function Area({area, setSelectedHost, selectedHost, hosts}) {
  const areaHosts = hosts.filter(host => host.area === area.name & host.active === true)
  const cleanName= area.name.split('_').map(word => (word[0].toUpperCase() + word.slice(1))).join(' ')
  return (
    <div
      className="area"
      id={area.name}
    >
      <h3 className="labels">
        {cleanName}
      </h3>
      <HostList 
        hosts={areaHosts} 
        selectedHost={selectedHost} 
        setSelectedHost={setSelectedHost} 
      />
    </div>
  );
}

Area.propTypes = {
  hosts: function (props) {
    if (props.hosts.length > props.limit) {
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      );
    }
  },
};

export default Area;
