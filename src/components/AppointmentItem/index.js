// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {appointmentsList, onChangeFavorite} = props
  const {title, date, id, isFavorite} = appointmentsList
  const image = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    onChangeFavorite(id)
  }

  return (
    <li className="container">
      <div className="flex-row">
        <p>{title}</p>
        <button type="button" data-testid="star" onClick={onClickStar}>
          <img src={image} alt="star" />
        </button>
      </div>
      <p>{date}</p>
    </li>
  )
}

export default AppointmentItem
