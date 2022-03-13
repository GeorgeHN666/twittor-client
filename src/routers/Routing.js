import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {map} from 'lodash'
import Data from './ConfigRouting'
export default function Routing(props) {
  const {setRefresh} = props;

  return (
    <Router>
      <Routes>
        {map(Data, (route, index) => (
          <Route path={route.path} exact={route.exact} key={index} element={<route.page setRefresh={setRefresh} />} />
        ))}
      </Routes>
    </Router>
  );
}
