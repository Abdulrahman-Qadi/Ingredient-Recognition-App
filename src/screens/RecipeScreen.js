import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

const RecipesScreen = ({ route, navigation }) => {
  const { ingredients } = route.params;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiId = '65572f2a';
  const apiKey = '31978518698b287543db97d5887b1e07';
  const numberOfRecipes = 10;
  const apiUrl = `https://api.edamam.com/search?q=${ingredients.join(',')}&app_id=${apiId}&app_key=${apiKey}&from=0&to=${numberOfRecipes}&calories=591-722&health=alcohol-free`;

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      const response = await fetch(apiUrl);
      const data = await response.json();
      setRecipes(data.hits);
      setLoading(false);
    }

    fetchRecipes();
  }, [ingredients]);

  const capitalize = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <View style={styles.container}>
      {recipes && recipes.length > 0 ? (
        <FlatList
          style={styles.recipes}
          data={recipes}
          renderItem={({ item }) => (
            <View style={styles.recipe}>
              <Image style={styles.image} source={{ uri: `${item.recipe.image}` }} />
              <View style={{ padding: 20, flexDirection: 'row' }}>
                <Text style={styles.label}>{capitalize(item.recipe.label)}</Text>
                <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Details', {recipe: item.recipe});
                    }}>
                    <Text
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{
                        marginLeft: 40,
                        fontSize: 18,
                        color: '#008080',
                        fontWeight: '600',
                      }}>
                      Details
                    </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>No recipes found.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  label: {
    fontSize: 17,
    width: '60%',
    color: '#008080',
    fontWeight: '700',
  },
  recipe: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    margin: 10,
    marginBottom: 30,
  },
});

export default RecipesScreen;
