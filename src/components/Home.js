import React from 'react'
import styled from 'styled-components'
import firebase from '../firebase'
import FlipMove from 'react-flip-move'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'
import moment from 'moment'

const mockList = [
  {
    catagory: 'taxi',
    content: 'SCB Academy',
    done: false
  },
  {
    catagory: 'repair',
    content: 'Kasetsart University',
    done: false
  },
  {
    catagory: 'report',
    content: 'Kasetsart University',
    done: false
  },
  {
    catagory: 'report',
    content: 'Kasetsart University',
    done: false
  },
  {
    catagory: 'billing',
    content: 'Kasetsart University',
    done: false
  },
  {
    catagory: 'billing',
    content: 'Kasetsart University',
    done: false
  },
  {
    catagory: 'billing',
    content: 'Kasetsart University',
    done: false
  },
  {
    catagory: 'report',
    content: 'Mahidol University',
    done: true
  },
  {
    catagory: 'printing',
    content: 'Mahidol University',
    done: false
  },
  {
    catagory: 'printing',
    content: 'Mahidol University',
    done: false
  },
  {
    catagory: 'delivery',
    content: 'Mahidol University',
    done: false
  },
  {
    catagory: 'taxi',
    content: 'SCB Academy',
    done: false
  },
  {
    catagory: 'repair',
    content: 'Kasetsart University',
    done: true
  },
  {
    catagory: 'taxi',
    content: 'Mahidol University',
    done: false
  }
]

const getIcon = (item) => {
  switch (item.catagory) {
    case 'taxi': return <i className="py-3 fa fa-taxi" aria-hidden="true"></i>
    case 'repair': return <i className="py-3 fa fa-wrench" aria-hidden="true"></i>
    case 'report': return <i className="py-3 fa fa-flag" aria-hidden="true"></i>
    case 'billing': return <i className="py-3 fa fa-credit-card" aria-hidden="true"></i>
    case 'printing': return <i className="py-3 fa fa-print" aria-hidden="true"></i>
    case 'delivery': return <i className="py-3 fa fa-motorcycle" aria-hidden="true"></i>
  }
}

const getColor = (item, noDisable) => {
  if (noDisable) {
    switch (item.catagory) {
      case 'taxi': return '#2ecc71';
      case 'repair': return '#3498db';
      case 'report': return '#e74c3c';
      case 'billing': return '#9b59b6';
      case 'printing': return '#f39c12';
      case 'delivery': return '#f39c12';
    }
  }
  if (item == null) return 'white';
  if (item.done) return '#f8f8f8';
  switch (item.catagory) {
    case 'taxi': return '#2ecc71';
    case 'repair': return '#3498db';
    case 'report': return '#e74c3c';
    case 'billing': return '#9b59b6';
    case 'printing': return '#f39c12';
    case 'delivery': return '#f39c12';
  }
}

const Wrapper = styled.div`
  font-family: 'Josefin Sans', sans-serif;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-gap: 1em;
  padding: 2em;
`

const Activity = styled.div`
  background: ${props => getColor(props.item)};
  color: ${props => props.item.done ? 'black' : 'white'};
  padding: 10px;
  cursor: pointer;
  transition: all 300ms;
  text-align: center;
  animation: bounce-in 200ms ease-in-out 1;

  &:hover {
    filter: brightness(0.9);
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
  }

  @keyframes bounce-in {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
`

const Service = styled.div`
  display: block;
  font-size: 22px;
  padding-top: 2.2px;
  font-weight: 600;
`

const Room = styled.span`
  font-size: 18px;
  padding-top: 5px;
  font-weight: lighter;
`

const Time = styled.span`
  float: right;
`

const TitleWrapper = styled.div`
  background: #ecf0f1;
  padding: 2em;
`

const Title = styled.div`
  font-family: 'Kanit', sans-serif;
  font-size: 30px !important;
`
const RoomNumber = styled.div`
  font-size: 16px;
`

class DemoComponent extends React.Component {
  state = {
    list: [],
    visible: false,
    selected: {}
  }

  // fetch data here
  componentDidMount = () => {
    firebase.database().ref('/scb').on('value', snapshot => {
      let list = snapshot.val() || []
      if (Object.keys(list).length > 0) {
        list = Object.keys(list).map((key) => ({ ...list[key], key }))
      }
      console.log(list)
      this.setState({ list })
    })
    // setInterval(() => {
    //   this.setState({
    //     list: [{
    //       catagory: 'printing',
    //       content: 'Mahidol University',
    //       done: false,
    //       key: Math.random().toString(),
    //       roomNumber: 404
    //     }, ...this.state.list]
    //   })
    // }, 2000)
  }

  onClose = () => {
    this.setState({ visible: false })
  }

  select = (item) => () => {
    this.setState({
      visible: true,
      selected: item
    })
  }

  complete = (item) => () => {
    firebase.database().ref('/scb/' + item.key).update({ done: 'true' })
    this.setState({
      visible: false
    })
  }

  render() {
    return (
      <Wrapper>
        <Rodal height={325} onClose={() => { this.setState({ visible: false }) }} visible={this.state.visible}>
          <h5 className='px-3 text-white' style={{ margin: '0', background: getColor(this.state.selected, true) }}>
            {getIcon(this.state.selected)}{'  '}{this.state.selected.catagory && this.state.selected.catagory.toUpperCase()}</h5>
          <hr style={{ margin: '0' }}/>
          <div className="p-3">
            <RoomNumber className="row">
              <div className="col-6">
                Room
              </div>
              <div className="col-6 text-right">202</div>
            </RoomNumber>
            <RoomNumber className="row">
              <div className="col-3">
                Timestamp
              </div>
              <div className="col-9 text-right">{moment().format('HH:mm')}</div>
            </RoomNumber>
            <RoomNumber className="row">
              <div className="col-3">
                Name
              </div>
              <div className="col-9 text-right">KONGPON C.</div>
            </RoomNumber>
            <h6 className='pt-1'>Description</h6>
            <div className="form-group">
              <textarea value={this.state.selected.content} readOnly className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div className="row">
              <div className="col">
                <button onClick={this.complete(this.state.selected)} disabled={this.state.selected.done} className='btn btn-outline-danger'>
                  Cancel
                </button>
              </div>
              <div className="col">
                <button onClick={this.complete(this.state.selected)} disabled={this.state.selected.done} className='text-right float-right btn btn-primary'>
                  Done
                </button>
              </div>
            </div>
          </div>
        </Rodal>
        <TitleWrapper>
          <Title>
            Sunday 29<sup>th</sup> April 2018
            <Time>10:30 AM</Time>
          </Title>
        </TitleWrapper>
        <Grid>
          {this.state.list
            .filter(item => !item.done)
            .map((item) =>
              <Activity onClick={this.select(item)} item={item} key={item.key}>
                <Service>
                  <h2>
                    { getIcon(item) }
                  </h2>
                  <div>
                    {item.catagory.toUpperCase()}
                  </div>
                </Service>
                <Room>ROOM {item.roomNumber}</Room>
              </Activity>
          )}
          {this.state.list
            .filter(item => item.done)
            .map((item) =>
              <Activity onClick={this.select(item)} item={item} key={item.key}>
                <Service>
                  <h2>
                    { getIcon(item) }
                  </h2>
                  <div>
                    {item.catagory.toUpperCase()}
                  </div>
                </Service>
                <Room>ROOM {item.roomNumber}</Room>
              </Activity>
          )}
        </Grid>
      </Wrapper>
    )
  }
}

export default DemoComponent
