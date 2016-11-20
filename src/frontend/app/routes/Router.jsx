import Relay from 'react-relay';

export default class extends Relay.Route {

  static path = '/';

  static queries = {
    viewer: () => Relay.QL`query{
        node(id: "TGl2ZXJlc3VsdDo1ODFhYTY2NzFiODk3MDFiOGI0N2QyM2U=")
    }`
  };

  static routeName = 'AppHomeRoute';

}

