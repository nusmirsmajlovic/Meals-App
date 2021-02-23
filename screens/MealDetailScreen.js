import React, {  useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Button, ScrollView, Image } from 'react-native';
import {  HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux'
//import { MEALS } from '../data/dummy-data';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import {toggleFavorite} from '../store/actions/meals';

const ListItem = props => {
    return <View style={styles.listItem}>
        <DefaultText>{props.children}</DefaultText>
    </View>
};

const MealDetailScreen = props => {
    const availebleMeals = useSelector(state => state.meals.meals);
   // const cuurrentMealIsFavorite = useSelector(state.meals.favoriteMeals.some(meal => meal.id === mealId));
    const mealId = props.navigation.getParam('mealId');
    const currentMealIsFavorite = useSelector(state => 
        state.meals.favoriteMeals.some(meal=>meal.id===mealId));

    const selectedMeal = availebleMeals.find(meal => meal.id === mealId);

    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);

    useEffect (() => {
       //props.navigation.setParams({ mealTitle: selectedMeal.title });
        props.navigation.setParams({toggleFav:toggleFavoriteHandler});
    }, [toggleFavoriteHandler]);

    useEffect (() =>{
        props.navigation.setParams({isFav: currentMealIsFavorite});
    }, [currentMealIsFavorite]);


    return (
        <ScrollView>
        <Image source={{uri:selectedMeal.imageUrl}} style={styles.image}/>
        <View style={styles.details}>
                    <DefaultText>{selectedMeal.duration}m</DefaultText>
                    <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                    <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
         </View>
         <Text style={styles.title}>Igredients</Text>
         {selectedMeal.ingredients.map(ingredient => (
         <ListItem key={ingredient}>{ingredient}</ListItem>))}
         
         <Text style={styles.title}>Steps</Text>
         {selectedMeal.steps.map(step => (
         <ListItem key={step}>{step}</ListItem>
         ))}
          
    
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = navigationData => {
    //const mealId=navigationData.navigation.getParam('mealId');
    const mealTitle=navigationData.navigation.getParam('mealTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');

    //const selectedMeal = MEALS.find(meal => meal.id === mealId);
    return{
        headerTitle: mealTitle,
        headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}> 
        <Item 
        title= 'Favorite' 
        iconName={isFavorite ? 'ios-star': 'ios-star-outline'} 
        onPress={toggleFavorite}
        />
        </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    image:{
         width:'100%',
         height:100
    },
    details:{
        flexDirection:'row',
        padding:15,
        justifyContent:'space-around'    
    },
    title:{
        fontFamily: 'open-sans',
        fontSize:22,
        textAlign: 'center',
        padding:10

    },
    listItem:{
        marginVertical:10,
        marginHorizontal:20,
        borderColor: '#ccc',
        borderWidth:1
    }
});

export default MealDetailScreen;