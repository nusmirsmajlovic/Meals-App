class Meals {

     constructor (
        id, 
        categoryIds, 
        title, 
        affordability, 
        complexity, 
        imageUrl, 
        duration, 
        ingredients, 
        steps, 
        isGluetnFree, 
        isVegan, 
        isVegetarian, 
        isLactosFree
        ) {
            this.id=id;
            this.title=title;
            this.categoryIds=categoryIds;
            this.affordability=affordability;
            this.complexity=complexity;
            this.imageUrl=imageUrl;
            this.duration=duration;
            this.ingredients=ingredients;
            this.steps=steps;
            this.isGluetnFree=isGluetnFree;
            this.isVegan=isVegan;
            this.isVegetarian=isVegetarian;
            this.isLactosFree=isLactosFree;
        }

}

export default Meals