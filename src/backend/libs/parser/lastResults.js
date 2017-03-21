export default async function lastResults(page) {

	const LastResultJQ = await page.evaluate(function () {

		let keyValue = [];

		$("div#fs .table-main").children().slice(0, -2).each(function(i) {

			let value = [];

			$(this).each(function() {

				let td = $(this);

				let country_part = td.find("span.country_part").text();
				let tournament_part = td.find("span.tournament_part").text();

				value.push(country_part + tournament_part);

					td.children("tbody").children().each(function(i) {

						let td_m = $(this);

						let match_time = td_m.find("td.time").text();

						let mtimer = td_m.find("td.timer");

						if( mtimer.hasClass('playing') ) {

							let playing = mtimer.text();

							let team_home;
							let span1 = td_m.find("span.padr");

							if(span1.children().length > 0) {

								(span1.children().attr('rhcard2')) ? team_home = span1.text()+'+red2'
								:  team_home = span1.text()+'+red';

							} else {

								team_home = span1.text();
							}

							let team_score = td_m.find("td.score").text();

							let team_away;
							let span2 = td_m.find("span.padl");

							if(span2.children().length > 0) {

								(span2.children().attr('racard2')) ? team_away = span2.text()+'+red2'
								:  team_away = span2.text()+'+red';

							} else {

								team_away = span2.text();
							}

							value.push({
								dateMatch:match_time,
								playing:playing,
								teamHome:team_home,
								score:team_score,
								teamAway:team_away
							});

						} else {

							let timer = td_m.find("td.timer").text();
							let team_home;
							let span1 = td_m.find("span.padr");

							if(span1.children().length > 0) {

								(span1.children().attr('racard2')) ? team_home = span1.text()+'+red2'
								:  team_home = span1.text()+'+red';

							} else {

								team_home = span1.text();
							}

							let team_score = td_m.find("td.score").text();

							let team_away;
							let span2 = td_m.find("span.padl");

							if(span2.children().length > 0) {

								(span2.children().attr('racard2')) ? team_away = span2.text()+'+red2'
								:  team_away = span2.text()+'+red';

							} else {

								team_away = span2.text();
							}

							value.push({
								dateMatch:match_time,
								timer:timer,
								teamHome:team_home,
								score:team_score,
								teamAway:team_away
							});
						}

					});

						keyValue.push( { tournamentPart: value[0], table: value.splice(1) } );

				});

			});

			return { gameParts: keyValue };

	});

	return LastResultJQ;

}
