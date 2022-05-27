import React from 'react'

import Skan  from './Skan'

const AlcideSkanViewer = ({ data }) => {
  console.log("InsightCloudSec Resource Scanner data", data);
  return <Skan data={data} />
}

export default AlcideSkanViewer;