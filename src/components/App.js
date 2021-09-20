import React, {useEffect, useState} from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import Headquarters from "./Headquarters";
import WestworldMap from './WestworldMap';
import { Log } from "../services/Log";


function App() {

  const [logs, setLog] = useState([])
  const [hosts, setHosts] = useState([])
  const [areas, setAreas] = useState([])
  const [selectedHost, setSelectedHost] = useState(null)


  useEffect(() => {
    const hostsAPI = `http://localhost:3001/hosts`
    const areasAPI = `http://localhost:3001/areas`

    fetch(areasAPI)
    .then(r => r.json())
    .then(areas => setAreas(areas))

    fetch(hostsAPI)
    .then(r => r.json())
    .then(hosts => setHosts(hosts))
  }, [])

  const onAreaChange = (updatedHost) => {

    setSelectedHost(updatedHost)
    const updatedHosts = hosts.map((host) => {
      if(host.id === updatedHost.id){
        return updatedHost
      }else{
        return host;
      }
    })
    fetch(`http://localhost:3001/hosts/${updatedHost.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(updatedHost)
    })
    .then(r => r.json())
    .then(setHosts(updatedHosts))
    .then( data => {
      const cleanName= updatedHost.area.split('_').map(word => (word[0].toUpperCase() + word.slice(1))).join(' ')
      const updatedLog = Log.notify(`${updatedHost.firstName} set in area ${cleanName}`)
      return setLog([updatedLog, ...logs])
    })  
  }

  const logTooManyHosts = (firstName, area) => {
    const cleanArea= area.split('_').map(word => (word[0].toUpperCase() + word.slice(1))).join(' ')
    const log = Log.error(`Too many hosts. Cannot add ${firstName} to ${cleanArea}`)
    setLog([log, ...logs])
  }

  const onRadioClick = (updatedHost) => {
    setSelectedHost(updatedHost)
    const updatedHosts = hosts.map((host) => {
      if(host.id === updatedHost.id){
        return updatedHost
      }else{
        return host;
      }
    })

    fetch(`http://localhost:3001/hosts/${updatedHost.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedHost)
    })
    .then(setHosts(updatedHosts))
    .then(data => {
      let log
      if(updatedHost.active) {
        log = Log.warn(`Activated ${updatedHost.firstName}`)
      }else{
        log = Log.notify(`Decommissioned ${updatedHost.firstName}`)
      }
      return setLog([log, ...logs])
    })
  }

  const onAllActivated = (active) => {
    const activateAll = hosts.map((host) => { return { ...host, active }})
    // activateAll.forEach((host) => {
    //   // fetch(`http://localhost:3001/hosts/${host.id}`, {
    //   //       method: 'PATCH',
    //   //       headers: {
    //   //         'Content-Type': 'application/json'
    //   //       },
    //   //       body: JSON.stringify(host)
    //   //     })
    //   //     .then(r => r.json())
    //   //     .then(host => console.log(host))
    //   //   })
    setHosts(activateAll);
    let log
    if(active) {
      log = Log.warn('Activating all hosts!')
    }else{
      log = Log.notify('Decomissioning all hosts')
    }
    setLog([log, ...logs])
  }

  return (
    <Segment id="app">
      <WestworldMap 
        setSelectedHost={setSelectedHost} 
        selectedHost={selectedHost} 
        hosts={hosts} areas={areas} 
      />
      <Headquarters
        logTooManyHosts={logTooManyHosts}
        log={logs} 
        onAllActivated={onAllActivated} 
        areas={areas} 
        selectedHost={selectedHost} 
        setSelectedHost={setSelectedHost} 
        hosts={hosts} onAreaChange={onAreaChange} 
        onRadioClick={onRadioClick} 
      />
    </Segment>
  );
}

export default App;
