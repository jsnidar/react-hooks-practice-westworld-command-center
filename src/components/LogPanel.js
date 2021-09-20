import React, {useState} from "react";
import { Segment, Button } from "semantic-ui-react";

function LogPanel({log, onAllActivated}) {
  const [allActivated, setAllActivated] = useState(false)

  const handleActivateAll = () => {
    setAllActivated(!allActivated)
    onAllActivated(!allActivated)
  }

  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {log.map((log, i) => (
          <p key={i} className={log.type}>
            {log.msg}
          </p>
        ))}
      </pre>
      <Button 
        onClick={handleActivateAll} 
        fluid color={allActivated ? "green" : "red"} 
        content={allActivated ? 'DECOMMISSION ALL' : "ACTIVATE ALL"} 
      />
    </Segment>
  );
}

export default LogPanel;
