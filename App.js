import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import SignUpScreen from './src/screens/SignUp';
import SearchScreen from './src/screens/SearchScreen';
import CameraScreen from './src/screens/CameraScreen';
import RecipesScreen from './src/screens/RecipeScreen';
import RecipeList from './src/screens/RecipeDetails';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen} options={{headerShown: false}} />
      <Stack.Screen name="Here Are Your Recipes" component={RecipesScreen} />
      <Stack.Screen name="Details" component={RecipeList} />
    </Stack.Navigator>
  );
};
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <Ionicons name="home-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Camera"
            component={CameraScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <Ionicons name="camera-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchStack}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <Ionicons name="search-outline" size={size} color={color} />
              ),
            }}
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
