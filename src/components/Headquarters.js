import React from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import "../stylesheets/Headquarters.css";
import ColdStorage from "./ColdStorage";
import LogPanel from './LogPanel'

function Headquarters({logTooManyHosts, log, onAllActivated, areas, hosts, selectedHost, setSelectedHost, onAreaChange, onRadioClick}) {
  
  return (
    <Grid celled="internally">
      <Grid.Column width={8}>
        <ColdStorage 
          selectedHost={selectedHost} 
          setSelectedHost={setSelectedHost} 
          hosts={hosts} 
        />
      </Grid.Column>
      <Grid.Column width={5}>
        <Details 
          logTooManyHosts={logTooManyHosts} 
          selectedHost={selectedHost} 
          areas={areas} hosts={hosts} 
          onAreaChange={onAreaChange} 
          onRadioClick={onRadioClick} 
        />
      </Grid.Column>
      <Grid.Column width={3}>
        <LogPanel log={log} onAllActivated={onAllActivated} />
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
