const dateSince = (date) => {
  const duration = (Date.now() - new Date(date)) / 1000;
  if (duration < 60) {
    return `${duration.toFixed(0)} seconds ago`;
  } else if (duration < 60 * 60) {
    return `${(duration / 60).toFixed(0)} minutes ago`;
  } else if (duration < 60 * 60 * 24) {
    return `${(duration / (60 * 60)).toFixed(0)} hours ago`;
  } else if (duration < 60 * 60 * 24 * 365) {
    return `${(duration / (60 * 60 * 24)).toFixed(0)} days ago`;
  } else {
    return `${(duration / (60 * 60 * 24 * 365)).toFixed(0)} years ago`;
  }
}

export default dateSince;