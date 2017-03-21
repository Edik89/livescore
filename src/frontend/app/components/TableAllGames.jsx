import React from 'react';
import {Table} from 'react-bootstrap';
import {IntervalTable} from './IntervalTable';


@IntervalTable
export default class TableAllItem extends React.Component {

  static propTypes = {
    viewer: React.PropTypes.object.isRequired,
    sortItems: React.PropTypes.func.isRequired,
    redCard: React.PropTypes.func.isRequired,
    classTags: React.PropTypes.object.isRequired
  };

  componentDidUpdate() {
    this.props.sortItems();
  }
  render() {
    let val = this.props.viewer;
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

              val.gameParts.map((val, i) =>
              [<tr><td colSpan="5" className="title"><b>{val.tournamentPart}</b></td></tr>,
                val.table.map((res, i) =>

                  <tr key={res._id}>

                    {
                      (res.playing) ?
                        [<td key={res._id+9} className={classTags.dateMatch}>{res.dateMatch}</td>,
                        <td key={res._id+3} className={classTags.playing}>
                          <span>{res.playing.replace(/\s/g, '')}<span className="blink">&nbsp;</span></span>
                        </td>]

                       :

                       [<td key={res._id+8} className="col-sm-1 text-center">{res.dateMatch}</td>,
                        <td key={res._id+7} className={classTags.timer}>
                           <span>{res.timer}<span>&nbsp;</span></span>
                         </td>]
                    }
                    <td key={res._id+4} className={classTags.home}>
                    <span>{redCard(res.teamHome)}{res.teamHome.split("+")[0]}</span>
                    </td>
                    <td key={res._id+5} className={classTags.score}><span >{res.score}</span></td>
                    <td key={res._id+6} className={classTags.away}>
                      <span>{res.teamAway.split("+")[0]}{redCard(res.teamAway)}</span>
                    </td>
                  </tr>
                )

              ])

            }
          </tbody>
        </Table>
      </div>
    );
  }
}
