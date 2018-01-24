import axios from 'axios'
import moment from 'moment'

const fetchMoodsLastDay = (_id, _this) => {
  axios.post('/user/fetch', {
      ID: _id
    })
    .then(res => {
      const userData = res.data
      _this.setState({
        FirstName: userData.FirstName,
        userData: userData
      })
      axios.post('mood/fetch/hour', {
        ID: _id
      })
      .then(response => {
        const daySeconds = 60 * 60 * 24
        let submittedToday = false;
        let moods, times
        if (response.data.Values) {
          moods = response.data.Values.reverse()
          times = response.data.Times.reverse().map(t => {
            let rightNow = moment(Date.now())
            let dayAgo = moment(Date.now()).subtract(1, 'day')
            let tMoment = moment(t).add(8, 'hour')
            if (dayAgo.isBefore(tMoment)) {
              submittedToday = true
            }
            return daySeconds - rightNow.diff(tMoment, 'second')
          })
          _this.setState({
            moodValues: moods,
            timeValues: times,
            submitted: submittedToday,
            show: true
          })
        } else {
          _this.setState({
            submitted: false,
            show: true
          })
        }
        })
      .catch(err => {
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err) 
    })
}

const addMood = (_id, value, _this) => {
  axios.post('/mood/add', {
      Value: value,
      UserID: _id
    })
    .then(res => {
      setTimeout(() => {
        fetchMoodsLastDay(_id, _this)
      }, 300)
      
    })
    .catch(err => {
      console.log(err)
    })
}

export default {
  fetchMoodsLastDay,
  addMood
}