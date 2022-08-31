import { buildStyles } from 'react-circular-progressbar';

const getColorRating = (voteAverage) => {
  if (voteAverage < 4) {
    return (
      buildStyles({
        pathColor: '#FF0000',
        textColor: '#FFFFFF',
      })
    )
  } else if (voteAverage <= 6) {
    return (
      buildStyles({
        pathColor: '#FFA500',
        textColor: '#FFFFFF',
      })
    )
  } else if (voteAverage < 8) {
    return (
      buildStyles({
        pathColor: '#9ACD32',
        textColor: '#FFFFFF',
      })
    )
  } else {
    return (
      buildStyles({
        pathColor: '#00FF00',
        textColor: '#FFFFFF',
      })
    )
  }
};

export default getColorRating;