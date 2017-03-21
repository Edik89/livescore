import React from 'react';
import Relay from 'react-relay';
import {Tabs, Tab} from 'react-bootstrap';
import TableEndGames from './TableEndGames';
import TableAllGames from './TableAllGames';
//import TableLiveGames from './TableLiveGames';
import TableNextGames from './TableNextGames';
import poll from 'relay-decorators/lib/poll';
import './css/app';

@poll(60000)
class App extends React.Component {

  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      comp: null
    };

  }

  render() {
    let val = this.props.viewer;
    return (
      <div className="container col-lg-4 col-md-5 col-sm-9 col-sm-offset-3">
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Все"><TableAllGames viewer={val} /></Tab>
          <Tab eventKey={2} title="Live" className="tab_container"></Tab>
          <Tab eventKey={3} title="Расписание"><TableNextGames viewer={val} /></Tab>
          <Tab eventKey={4} title="Завершенные"><TableEndGames viewer={val} /></Tab>
        </Tabs>
      </div>
    );
  }

}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Liveresult {
        _id
        gameParts {
          _id
          tournamentPart
          table {
            _id
            dateMatch
            timer
            playing
            teamHome
            score
            teamAway
          }
        }
      },
    `,
  },
});
