export function reducer (state, action) {
    switch(action.type)
    {
        case 'ADD_PLANT':
            console.log('ADD_PLANT reducer');
            const newPlants1 = [...state.plants, action.payload];
            return {
                ...state, 
                plants: newPlants1
            }
        case 'REMOVE_PLANT':
            console.log('REMOVE_PLANT reducer');
            const newPlants2 = [...state.plants, action.payload];
            return {
                ...state, 
                plants: newPlants2
            }
    

        default:
            throw new Error('no matching action type');
    }

    // if (action.type === 'ADD_PLANT') {
    //     const newPlants = [...state.plants, action.payload];
    //     return {
    //         ...state, 
    //         plants: newPlants
    //     }
    // }
    // if (action.type === 'REMOVE_PLANT') {
    //     const newPlants = state.plants.filter((plant) => plant.id !== action.payload)
    //     return {
    //         ...state, 
    //         plants: newPlants
    //     }
    // }

    // throw new Error('no matching action type')
}