import './Gym.css';
import Workout from '../../components/gym/Workout';
import Calendar from '../../components/calendar/Calendar';

const Gym = () => {
    return (
        <div className="gym-container">
            <div className="workout-container">
                <Workout />
            </div>
            <div className="workout-history-container">
                <h2>Workout History</h2>
            </div>
            <div className="calendar-container">
                <Calendar />
            </div>
        </div>
    );
};

export default Gym;