import { useState, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Animated,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');
const panelHeight = height * 0.5;

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [listHeight] = useState(new Animated.Value(0));

  const getCartoonImage = ingredient => {
    // Logic to get the cartoon images
    // Based on the ingredient
    switch (ingredient) {
      case 'Apple':
        return 'https://i.postimg.cc/LXhvv9My/apple-icon.png';
      case 'Banana':
        return 'https://i.postimg.cc/HWcBykzn/banana-icon.png';
      case 'Orange':
        return 'https://i.postimg.cc/YqQRdDJw/orange-icon.png';
      case 'Carrot':
        return 'https://i.postimg.cc/wMm28wML/carrot-icon.png';
      case 'Lemon':
        return 'https://i.postimg.cc/hjws5kDK/lemon-icon.png';
      case 'Milk':
        return 'https://i.postimg.cc/8k2wBgXH/milk-icon.png';
      case 'Eggs':
        return 'https://i.postimg.cc/y8PPHg1Q/eggs-icon.png';
      case 'Pineapple':
        return 'https://i.postimg.cc/KvvbmgFs/pineapple.png';
      case 'Garlic':
        return 'https://i.postimg.cc/FzNkp8mS/garlic-icon.png';
      case 'Lettuce':
        return 'https://i.postimg.cc/qqwh5wM5/lettuce-icon.png';
      case 'Mint':
        return 'https://i.postimg.cc/fLh1HjPX/mint-icon.png';
      case 'Onion':
        return 'https://i.postimg.cc/d0GxTZ00/onion-icon.webp';
      case 'Peach':
        return 'https://i.postimg.cc/FRg96ZzH/peach-icon.png';
      case 'Pear':
        return 'https://i.postimg.cc/QxxgQ9fM/pear-icon.png';
      case 'Potato':
        return 'https://i.postimg.cc/zGynMmZZ/potato-icon.webp';
      case 'Raspberry':
        return 'https://i.postimg.cc/BQYTMSzB/raspberry-icon.png';
      case 'Tomato':
        return 'https://i.postimg.cc/DZ69N4Lz/tomato-icon.png';
      case 'Watermelon':
        return 'https://i.postimg.cc/hGP6dPHW/watermelon-icon.png';
      case 'Coriander':
        return 'https://i.postimg.cc/FKBWkby3/coriander-icon.png';
      default:
        return 'https://i.postimg.cc/NfQxZfJs/mystery-box.png';
    }
  };

  function addIngredient() {
    const ingredient = searchQuery.trim();
    if (ingredient.length > 0 && !ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
      setSearchQuery('');
      setButtonDisabled(false);
      Animated.timing(listHeight, {
        toValue: (ingredients.length + 1) * 40,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }

  function removeIngredient(index) {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
    if (newIngredients.length === 0) {
      setButtonDisabled(true);
    }
    Animated.timing(listHeight, {
      toValue: newIngredients.length * 40,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }

  const slideUpValue = useRef(new Animated.Value(panelHeight)).current;

  const toggleIngredientsPanel = () => {
    const isPanelOpen = slideUpValue.__getValue() === 0;
    Animated.timing(slideUpValue, {
      toValue: isPanelOpen ? panelHeight : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Type an ingredient..."
          placeholderTextColor="#999"
          style={styles.inputField}
          onChangeText={text => setSearchQuery(text)}
          onSubmitEditing={addIngredient}
          value={searchQuery}
        />
        <TouchableOpacity
          style={
            searchQuery.length === 0
              ? styles.disabledAddButton
              : styles.addButton
          }
          onPress={addIngredient}
          disabled={searchQuery.length === 0}>
          <Ionicons name="add-circle" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.panelToggleButton}
        onPress={toggleIngredientsPanel}>
        <Ionicons name="chevron-up" size={30} color="#555" />
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.ingredientsContainer,
          {
            transform: [{ translateY: slideUpValue }],
          },
        ]}>
        <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}>
        {ingredients.map((ingredient, index) => (
          <View style={styles.ingredient} key={ingredient}>
            <Image
              style={styles.cartoonImage}
              source={{ uri: getCartoonImage(ingredient) }}
            />
            <Text style={styles.ingredientText}>{ingredient}</Text>
            <TouchableOpacity
              onPress={() => removeIngredient(index)}>
              <Text style={{ color: '#008080' }}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      </Animated.View>
      <TouchableOpacity
        style={buttonDisabled ? styles.disabledButton : styles.button}
        onPress={() => {
          navigation.navigate('Here Are Your Recipes', { ingredients: ingredients });
        }}
        disabled={buttonDisabled}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.buttonText}>Search Recipes</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 60,
    marginBottom: 10,
  },
  inputField: {
    height: 40,
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#333',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  disabledAddButton: {
    backgroundColor: 'gray',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  panelToggleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 5,
  },
  ingredientsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ingredient: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 10,
    marginVertical: 4,
  },
  ingredientText: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#008080',
    borderRadius: 35,
    padding: 10,
    width: '100%',
    bottom: 560,
    alignItems: 'center',
    marginBottom: 30,
  },
  disabledButton: {
    backgroundColor: 'gray',
    borderRadius: 35,
    padding: 10,
    width: '100%',
    bottom: 590,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartoonImage: {
    width: 30,
    height: 30,
    borderRadius: 0,
    marginRight: 5,
  },
});

export default SearchScreen;
