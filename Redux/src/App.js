/**
 * Created by 0easy-23 on 2018/1/30
 */
import {StackNavigator} from 'react-navigation';
import HomeScreen from './containers/Home';
import ProfileScreen from './components/Profile';
const App = StackNavigator({
    Home: {screen: HomeScreen},
    Profile: {screen: ProfileScreen},
});
export default App;