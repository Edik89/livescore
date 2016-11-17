import React from 'react';

const classTags = {

  container: "container col-lg-6 col-md-6 col-sm-6",
  table: "table table-striped table-condensed table-hover",
  playing: "col-sm-1 text-center timer",
  timer:"col-sm-1 text-center status",
  home:"col-sm-5 text-right home",
  score:"col-sm-1 text-center score",
  away:"col-sm-5 text-left away",
  dateMatch:"col-sm-1 text-center dm"
};

export const IntervalTable = ComposedComponent => class extends React.Component {

  static displayName = 'ComponentEnhancedWithIntervalHOC';

  constructor(props) {
    super(props);
    this.state = {
      sortItems: () =>  this.sortItems(),
      redCard: this.ReturnRedCard,
      filtrTitle: () => this.filtrTitle(),
      classTags: classTags
    };
  }

  sortItems() {
    let tbody = $("div.active table tbody");
    if(tbody.children().length !== 0) {

      tbody.children().each(function() {
        let th = $(this);
        let timer = th.find("td.timer");
        let status = th.find("td.status");
        let score = th.find("td.score");
        let home = th.find("td.home");
        let away = th.find("td.away");
        let date = th.find("td.dm");

        let sr = status.text().replace(/\s/g, '');

        if (sr == "Завершен") {

          score.addClass("bold");
          let s = score.text().replace(/\s/g, '').split("-");
          (s[0] > s[1]) ? home.addClass("bold")
          : (s[0] < s[1]) ? away.addClass("bold")
          : (s[0] == s[1]) ? th.find(".col-sm-5").addClass("bold") : false;

        } else if (timer.text().replace(/\s/g, '') == "Перерыв") {
          date.addClass("end");
          timer.children().children().removeClass("blink");
          score.addClass("timer bold");

        } else if ( sr == "Перенесен" || sr == "Отменен"  ) {

          date.addClass("over");

        } else if(th.find("td").hasClass("timer")) {

          date.addClass("end");
          score.addClass("timer bold");

        }

      });

    } else {

        tbody.html("<b>Сейчас нет матчей.</b>");

    }

  }

  ReturnRedCard(r) {
    let teamCard = r.split("+");
    switch(teamCard[1]) {
      case 'red':
        return <span className="racard racard1">&nbsp;</span>;
      case 'red1':
        return <span className="racard racard2">&nbsp;</span>;
    }
  }

  filtrTitle() {
    let supervise = {};
    $('div.active td.title').each(function() {
        let txt = $(this).text();
        if (supervise[txt]){
          $(this).remove();
        }
        else {
          supervise[txt] = true;
        }
    });
  }

  render() {
    return <ComposedComponent {...this.state} {...this.props} />;
  }

};
