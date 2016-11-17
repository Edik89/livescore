import mongoose from './moongoseConnect';

mongoose.Promise = global.Promise;

const LiveResultSchema = new mongoose.Schema({
  gameParts:[{
    tournamentPart: String,
    table:[
    {
      dateMatch: String,
      timer:String,
      playing:String,
      teamHome: String,
      score:String,
      teamAway: String
    }]
  }]
});

const LiveResultModel = mongoose.model('Liveresult', LiveResultSchema);

export default LiveResultModel;
