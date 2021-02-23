import React, {useState, useEffect, useCallback} from 'react';
import { View, StyleSheet, Text, ImagePropTypes, Platform } from 'react-native';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Switch } from 'react-native-paper';
import Colors from '../constans/Colors';
import {useDispatch} from 'react-redux';
import {setFilters} from '../store/actions/meals';

const FilterSwitch = props=>{
  return( 
  <View style={styles.filterContainer}>
    <Text>{props.label}</Text>
    <Switch 
    trackColor={{ true:Colors.primaryColor}}
    thumbColor={Platform.OS === 'android' ? Colors.primaryColor :''}
    value={props.state} 
    onValueChange={props.onChange}
    />
  </View>)
};

const FiltersScreen = props => {
  const { navigation } = props;
  const [ isGlutenFree, setIsGltenFree] = useState(false); 
  const [ isLactoseFree, setIsLactoseFree] = useState(false); 
  const [ isVegan, setIsVegan] = useState(false); 
  const [ isVegetarian, setIsVegetarian] = useState(false); 

  const dispatch = useDispatch();

  const saveFilters = useCallback (() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian:isVegetarian
    };
   
    dispatch(setFilters(appliedFilters));

  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  useEffect(() =>{
    navigation.setParams({save:saveFilters});
  },  [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Reastriction</Text>
            <FilterSwitch 
            label='Gluten-free' 
            state={isGlutenFree} 
            onChange={newValue => setIsGltenFree(newValue)}
            />
            <FilterSwitch 
            label='Lactose-free' 
            state={isLactoseFree} 
            onChange={newValue => setIsLactoseFree(newValue)}
            />
            <FilterSwitch 
            label='Vegan' 
            state={isVegan} 
            onChange={newValue => setIsVegan(newValue)}
            />
            <FilterSwitch 
            label='Vegetarian' 
            state={isVegetarian} 
            onChange={newValue => setIsVegetarian(newValue)}
            />
            
        </View>
  );
};

FiltersScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Filter Meals',
      headerLeft: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName="ios-menu"
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
      headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName="ios-save"
            onPress= {
             navData.navigation.getParam('save')
            }
          />
        </HeaderButtons>
      ),
    };
};


const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems: 'center'
    },
    title:{
       fontFamily:'open-sans',
       fontSize:22,
       margin:20,
       textAlign: 'center'

    },
    filterContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems: 'center',
      width:'80%',
      marginVertical:10
    }

});

export default FiltersScreen; 