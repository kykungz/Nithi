import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import logo from './assets/logo.svg'
import RouterView from './router'
import Sidebar from 'react-sidebar'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  padding-top: 80px;
  padding-left: 1em;
  padding-right: 1em;
`

const SidebarItem = styled.div`
  background: #2c3e50;
  cursor: pointer;
  padding: .7em 1em;
  padding-left: 1.5em;
  padding-right: 0;
  ${'' /* padding-top: .5em; */}
  ${'' /* padding-top: 0; */}
  transition: all 300ms;
  text-decoration: none;
  color: white;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 15px;
  letter-spacing: 0.8px;

  &:hover {
    filter: brightness(2);
  }
`

const SidebarSubItem = styled.div`
  background: #2c3e50;
  cursor: pointer;
  padding: .5em 1em;
  padding-left: 3em;
  padding-right: 0;
  transition: all 300ms;
  text-decoration: none;
  color: white;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 18px;

  &:hover {
    filter: brightness(2);
  }
`
const SidebarTitle = styled.h6`
  padding: 1.5em 2em;
  padding-top: 1em;
  background: #2c3e50;
  color: white;
  text-align: center;
`

const Transition = styled.div`
  transition: all 100ms;
`

const Circle = styled.img`
  width: 150px;
  height: 150px;
  ${'' /* margin: 1.5em auto; */}
  ${'' /* padding: 20px; */}
  padding-bottom: 2em;
`

const Name = styled.div`
  font-size: 22px;
  font-family: 'Josefin Sans', sans-serif;
`

const mql = window.matchMedia(`(min-width: 800px)`);

class App extends React.Component {
  state = {
    isOpen: true
  }

  toggleSidebar = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }

  sidebarContent = (
    <div>
      <SidebarTitle>
        <Circle src={require('./assets/nithi.jpg')} alt=""/>
        <Name>
          P' Nithi
        </Name>
      </SidebarTitle>

      <Link style={{textDecoration: 'none'}} to='/'>
        <SidebarItem style={{ borderLeft: 'solid thick white', background: '#34495e' }}>
          <i className="pr-3 fa fa-th" aria-hidden="true"></i>
          ALL ACTIVITIES
        </SidebarItem>
      </Link>

      <Link style={{textDecoration: 'none'}} to='/checkin'>
        <SidebarItem>
          <i className="pr-3 fa fa-credit-card-alt" aria-hidden="true"></i>
          CHECK-INS
        </SidebarItem>
      </Link>

      <Link style={{textDecoration: 'none'}} to='/carstamp'>
        <SidebarItem>
          <i className="pr-3 fa fa-car" aria-hidden="true"></i>
          {' '}CAR STAMP
        </SidebarItem>
      </Link>

      <Link style={{textDecoration: 'none'}} to='/'>
        <SidebarItem>
          <i className="pr-4 fa fa-wrench" aria-hidden="true"></i>
          REPAIR
        </SidebarItem>
      </Link>

      <Link style={{textDecoration: 'none'}} to='/'>
        <SidebarItem>
          <i className="pr-4 fa fa-users" aria-hidden="true"></i>
          SERVICES
        </SidebarItem>
      </Link>
    </div>
  )

  render() {
    return (
      <Router>
        <div className="App">
            <Sidebar
              styles={{sidebar: {background: '#2c3e50'}}}
              sidebar={this.sidebarContent}
              docked={this.state.isOpen}
              open={this.state.isOpen}
            >
              <RouterView />
            </Sidebar>
        </div>
      </Router>
    )
  }
}

export default App
