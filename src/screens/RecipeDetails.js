import {ScrollView, Linking, View, Text, StyleSheet} from 'react-native';

const Details = ({route}) => {
  const {recipe} = route.params;
  const capitalize = str => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };
  const handlePress = () => {
    Linking.openURL(`https://www.youtube.com/results?search_query=${recipe.label}`);
  };
  return (
    <ScrollView>
      <View style={styles.details}>
        <View style={styles.item}>
          <Text
            style={{
              fontSize: 18,
              color: '#008080',
              fontWeight: '800',
              marginBottom: 4,
              marginLeft: 5,
            }}>
            Label:
          </Text>
          <Text style={styles.ingredients}>{`${capitalize(
            recipe.label,
          )}`}</Text>
        </View>

        <View style={styles.item}>
          <Text
            style={{
              fontSize: 18,
              color: '#008080',
              fontWeight: '800',
              marginBottom: 4,
              marginLeft: 5,}}>
            Ingredients:
          </Text>
          <Text style={styles.ingredients}>{`${recipe.ingredientLines.join(
            '\n',
          )}`}</Text>
        </View>

        <View style={styles.item}>
          <Text style={{fontSize: 18, color: '#008080', fontWeight: '800'}}>
            Calories:
          </Text>
          <Text style={styles.ingredients}>{`${Math.round(
            recipe.calories,
          )}`}</Text>
        </View>

        <View style={styles.item}>
          <Text style={{fontSize: 18, color: '#008080', fontWeight: '800'}}>
            Number of Servings:
          </Text>
          <Text style={styles.ingredients}>{`${recipe.yield}`}</Text>
        </View>

        <View style={styles.item}>
          <Text
            style={{
              fontSize: 18,
              color: '#008080',
              fontWeight: '800',
              marginBottom: 4,
              marginLeft: 5,
            }}>
            Instructions:
          </Text>
          <Text style={styles.ingredients} onPress={handlePress}>Watch how to make this recipe on YouTube</Text>
        </View>

        <View style={styles.item}>
          <Text style={{fontSize: 18, color: '#008080', fontWeight: '800'}}>
            Diet Label:
          </Text>
          <Text style={styles.ingredients}>{`${recipe.dietLabels}`}</Text>
        </View>

        <View style={styles.item}>
          <Text style={{fontSize: 18, color: '#008080', fontWeight: '800'}}>
            Cuisine Type:
          </Text>
          <Text style={styles.ingredients}>{`${recipe.cuisineType}`}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  details: {
    marginBottom: 30,
    padding: 5,
  },
  ingredients: {
    fontSize: 17,
    color: '#5E5E5E',
    marginLeft: 5,
  },
  item: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
export default Details;
