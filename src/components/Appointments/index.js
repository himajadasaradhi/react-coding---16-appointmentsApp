// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    searchInput: '',
    dateInput: '',
    appointmentsList: [],
    starredButton: false,
  }

  onChangeTitle = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onClickAddButton = event => {
    event.preventDefault()
    const {searchInput, dateInput} = this.state
    if (searchInput !== '' && dateInput !== '') {
      const dateTime = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      const newAppointment = {
        title: searchInput,
        date: dateTime,
        id: uuidv4(),
        isFavorite: false,
      }
      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        searchInput: '',
        dateInput: '',
      }))
    } else if (searchInput === '') {
      alert('please fill title')
    } else if (dateInput === '') {
      alert('please fill date')
    } else {
      alert('please enter both the details')
    }
  }

  onChangeFavorite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachList => {
        if (eachList.id === id) {
          return {...eachList, isFavorite: !eachList.isFavorite}
        }
        return eachList
      }),
    }))
  }

  onClickStarredButton = () => {
    this.setState(prevState => ({starredButton: !prevState.starredButton}))
  }

  render() {
    const {searchInput, dateInput, appointmentsList, starredButton} = this.state
    const filteredList = starredButton
      ? appointmentsList.filter(eachList => eachList.isFavorite)
      : appointmentsList

    const starredButtonClassName = starredButton ? 'starred' : 'non-starred'
    return (
      <div className="bg-container">
        <div className="content-bg">
          <h1 className="heading">Add Appointment</h1>
          <div className="flex-row">
            <div>
              <form onSubmit={this.onClickAddButton}>
                <label htmlFor="input">TITLE</label>
                <br />
                <input
                  type="text"
                  id="input"
                  placeholder="title"
                  onChange={this.onChangeTitle}
                  value={searchInput}
                />
                <br />
                <label htmlFor="date">DATE</label>
                <br />
                <input
                  type="date"
                  id="date"
                  onChange={this.onChangeDate}
                  value={dateInput}
                />
                <br />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr />
          <div className="starred-row">
            <div>
              <h1 className="appointments">Appointments</h1>
            </div>
            <button
              type="button"
              className={starredButtonClassName}
              onClick={this.onClickStarredButton}
            >
              starred
            </button>
          </div>
          <div>
            <ul>
              {filteredList.map(eachList => (
                <AppointmentItem
                  appointmentsList={eachList}
                  key={eachList.id}
                  onChangeFavorite={this.onChangeFavorite}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
