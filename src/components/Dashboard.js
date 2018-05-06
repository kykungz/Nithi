import React from 'react'
import styled from 'styled-components'
import firebase from '../firebase'

const Wrapper = styled.div`
  font-family: 'Josefin Sans', sans-serif;
`

const TitleWrapper = styled.div`
  background: #ecf0f1;
  padding: 2em;
`

const Title = styled.div`
  font-family: 'Kanit', sans-serif;
  font-size: 30px !important;
`
const Time = styled.span`
  float: right;
`

const Face = styled.img`
  animation: bounce-in 200ms ease-in-out 1;

  @keyframes bounce-in {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-gap: 1em;
  padding: 2em;
`

class DemoComponent extends React.Component {
  state = {
    images: {
      approved: [],
      declined: []
    }
  }

  componentDidMount = () => {
    firebase.database().ref('/siri/approved').on('value', snapshot => {
      const images = snapshot.val() || {}
      this.setState({
        images: {
          approved: Object.keys(images).map(key => ({ key, ...images[key] })),
          declined: this.state.images.declined
        }
      }, () => {
        console.log(this.state.images)
      })
    })
    firebase.database().ref('/siri/declined').on('value', snapshot => {
      const images = snapshot.val() || {}
      this.setState({
        images: {
          approved: this.state.images.approved,
          declined: Object.keys(images).map(key => ({ key, ...images[key] }))
        }
      }, () => {
        console.log(this.state.images)
      })
    })
  }

  componentWillUnmount = () => {
    firebase.database().ref('/siri/declined').off()
    firebase.database().ref('/siri/approved').off()
  }

  render() {
    return (
      <Wrapper>
        <TitleWrapper>
          <Title>
            Sunday 29<sup>th</sup> April 2018
            <Time>10:30 AM</Time>
          </Title>
        </TitleWrapper>
        <div className="p-2">
          <h3>Approved</h3>
          <Grid>
            {this.state.images.approved.sort((a, b) => a.date < b.date).map(image => (
              <Face
                className='img-fluid'
                src={'data:image/jpg;base64, ' + image.image}
                key={image.key}
                alt=""
              />
            ))}
          </Grid>
          <h3>Declined</h3>
          <Grid>
            {this.state.images.declined.sort((a, b) => a.date < b.date).map(image => (
              <Face
                className='img-fluid'
                src={'data:image/jpg;base64, ' + image.image}
                key={image.key}
                alt=""
              />
            ))}
          </Grid>
        </div>
      </Wrapper>
    )
  }
}

export default DemoComponent
