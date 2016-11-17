import React from 'react';
import {Table} from 'react-bootstrap';
import {IntervalTable} from './IntervalTable';


@IntervalTable
export default class TableEndItem extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    viewer: React.PropTypes.object.isRequired,
    redCard: React.PropTypes.func.isRequired,
    filtrTitle: React.PropTypes.func.isRequired,
    sortItems: React.PropTypes.func.isRequired,
    classTags: React.PropTypes.object.isRequired
  };

  componentDidUpdate() {
    this.props.sortItems();
    this.props.filtrTitle();
  }
  render() {
    let items = this.props.viewer;
    let redCard = this.props.redCard;
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
                    (res.timer == "Завершен" || res.timer == "Перенесен") ?
                      [
                        <tr><td colSpan="5" className="title"><b>{val.tournamentPart}</b></td></tr>,
                        <tr key={res._id}>
                          <td className={classTags.dateMatch}>{res.dateMatch}</td>
                          <td key={res._id+3} className={classTags.timer}>
                            <span>{res.timer}</span>
                          </td>
                          <td key={res._id+4} className={classTags.home}>
                            <span>{redCard(res.teamHome)}{res.teamHome.split("+")[0]}</span>
                          </td>
                          <td key={res._id+5} className={classTags.score}><span >{res.score}</span></td>
                          <td key={res._id+6} className={classTags.away}>
                            <span>{res.teamAway.split("+")[0]}{redCard(res.teamAway)}</span>
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
