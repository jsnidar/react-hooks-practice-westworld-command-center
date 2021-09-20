import React from "react";
import { Card } from "semantic-ui-react";
import "../stylesheets/Host.css";

function Host({host, selectedHost, setSelectedHost}) {

  const hostClass = host === selectedHost ? 'host selected' : 'host'
  /* NOTE: The className "host selected" renders a different style than simply "host". */
  return (
    <Card
      className={hostClass}
      onClick={() => setSelectedHost(host)}
      image={host.imageUrl}
      raised
      link
    />
  );
}

export default Host;
