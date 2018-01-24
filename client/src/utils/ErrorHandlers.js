const handleError = (err, _this) => {
  switch (typeof(err)) {
    case "string":
      _this.setState({
        error: err
      })
      break;

    case "object":
      if (err.response) {
        _this.setState({
          error: err.response.data
        })
      }
      break;

    default:
      _this.setState({
        error: defaultErrorMessage
      })
  }
}

const defaultErrorMessage = 'Oops! Looks like there was an error.'

export { handleError }