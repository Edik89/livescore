import React from 'react';
import {IntervalTable} from './IntervalTable';
import {Table} from 'react-bootstrap';


@IntervalTable
export default class TableLiveItem extends React.Component {

  static propTypes = {
    viewer: React.PropTypes.object.isRequired,
    sortItems: React.PropTypes.func.isRequired,
    redCard: React.PropTypes.func.isRequired,
    filtrTitle: React.PropTypes.func.isRequired,
    classTags: React.PropTypes.object.isRequired
  };


  componentDidUpdate() {
    this.props.sortItems();
    this.props.filtrTitle();
  }
  render() {
    let items = this.props.viewer;
    let card = this.props.redCard;
    let classTags = this.props.classTags;
    return (
      <div>
        <Table className={classTags.table}>
          <thead>
            <tr>
              <td colSpan="5" className="separator"></td>
            </tr>
          </thead>
          <tbody>
            {
              items.gameParts.map((val, r) =>

                (val) ?

                  [

                    val.table.map((res, i) =>
                      (res.playing) ?
                        [
                          <tr><td colSpan="5" className="title live"><b>{val.tournamentPart}</b></td></tr>,
                          <tr key={res._id} className="playing">
                            <td className={classTags.dateMatch}>{res.dateMatch}</td>
                            <td key={res._id+3} className={classTags.playing}>
                              <span>{res.playing.replace(/\s/g, '')}<span className="blink">&nbsp;</span></span>
                            </td>
                            <td key={res._id+4} className={classTags.home}>
                              <span>{card(res.teamHome)}{res.teamHome.split("+")[0]}</span>
                            </td>
                            <td key={res._id+5} className={classTags.score}><span>{res.score}</span></td>
                            <td key={res._id+6} className={classTags.away}>
                              <span>{res.teamAway.split("+")[0]}{card(res.teamAway)}</span>
                            </td>
                          </tr>
                        ]

                      : false

                    )
                  ]

                  : false
              )
            }
          </tbody>
        </Table>
      </div>
    );
  }
}
