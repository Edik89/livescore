import React from 'react';
import {Table} from 'react-bootstrap';
import {IntervalTable} from './IntervalTable';

@IntervalTable
export default class TableNextItem extends React.Component {

  static propTypes = {
    viewer: React.PropTypes.object.isRequired,
    filtrTitle: React.PropTypes.func.isRequired,
    classTags: React.PropTypes.object.isRequired
  };

  formatDate() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes <= 9) minutes = "0" + minutes;
    if (hours <= 9) hours = "0" + hours;

    return hours+':'+minutes;
  }

  componentDidUpdate() {
    this.props.filtrTitle();
  }

  render() {
    let items = this.props.viewer;
    let UserDate = this.formatDate();
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
                [
                  val.table.map((res, i) =>
                    (UserDate < res.dateMatch) ?
                      [
                        <tr><td colSpan="5" className="title next"><b>{val.tournamentPart}</b></td></tr>,
                        <tr key={res._id}>
                          <td className="col-sm-1 text-center">{res.dateMatch}</td>
                          <td key={res._id+4} className={classTags.home}>
                            <span>{res.teamHome}</span>
                          </td>
                          <td key={res._id+5} className={classTags.score}><span >{res.score}</span></td>
                          <td key={res._id+6} className={classTags.away}>
                            <span>{res.teamAway}</span>
                          </td>
                        </tr>
                      ]

                    : false

                  )
                ]
              )
            }
          </tbody>
        </Table>
      </div>
    );
  }
}
