/**
 * File containing project-wide shared constants
 */

export const SPXAPI_URL = 'https://spx-api-w4c9.onrender.com'

export const getFieldAverage = (data, field) => {
  const notNullData = data.filter((item) => item[field] !== null)
  const nnDataSum = notNullData.reduce((total, nnItem) => total + nnItem[field], 0)
  return nnDataSum / notNullData.length
}
