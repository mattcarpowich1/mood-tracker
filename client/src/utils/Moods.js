import axios from 'axios'
import moment from 'moment'

const fetchMoodsLastWeek = (_id, _this) => {
  axios.post('mood/fetch/week', {
    ID: _id
  })
  .then(response => {
    const weekSeconds = 3600 * 168
    let moods, times
    if (response.data.Values) {
      moods = response.data.Values.reverse()
      times = response.data.Times.reverse().map(t => {
        let rightNow = moment(Date.now())
        let weekAgo = moment(Date.now()).subtract(1, 'week')
        let tMoment = moment(t).add(8, 'hour')
        return weekSeconds - rightNow.diff(tMoment, 'second')
      })
      _this.setState({
        moodValues: moods,
        timeValues: times,
        submitted: true,
        week: true,
        show: true
      })
    } else {
      _this.setState({
        moodValues: [],
        timeValues: [],
        week: true,
        show: true
      })
    }
  })
  .catch(err => {
    console.log(err)
  })
}

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
            week: false,
            show: true
          })
        } else {
          _this.setState({
            submitted: false,
            show: true,
            week: false
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

const addMood = (_id, value, _this, week) => {
  axios.post('/mood/add', {
      Value: value,
      UserID: _id
    })
    .then(res => {
      setTimeout(() => {
        if (!week) { 
          fetchMoodsLastDay(_id, _this)
        } else {
          fetchMoodsLastWeek(_id, _this)
        }
      }, 300)
      
    })
    .catch(err => {
      console.log(err)
    })
}

export default {
  fetchMoodsLastWeek,
  fetchMoodsLastDay,
  addMood
}