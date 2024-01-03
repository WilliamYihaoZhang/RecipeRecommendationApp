//import logo from './logo.svg';
import './App.css';
import React, {useEffect,useState} from 'react';
import Recipe from './recipe';

function App () {

  //const APP_ID = "<dummy_appID"
  //const APP_KEY = "<dummy_appKey"

  
  const [recipes, setRecipes] = useState([]); //used to store recipes
  //Here, recipes is the state variable that will hold the current state, and setRecipes is a function that can be used to update the recipes state. The state variable recipes is initialized as an empty array, but it can be updated to hold any type of data, not just arrays. React will re-render the component whenever setRecipes is called, causing the component to reflect the updated state.


//This code snippet uses an array data structure for managing state, specifically initializing the state as an empty array.

  const [search,setSearch] = useState(''); //state for the input bar
  const [query,setQuery] = useState('chicken')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( ()=>{ //when our apps refreshes/rerenders, the effect runs
    const APP_ID = process.env.REACT_APP_EDAMAM_APP_ID;
    const APP_KEY = process.env.REACT_APP_EDAMAM_APP_KEY;
  

    const getRecipes = async () =>{
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`); //wait for response and fetch the data from this url-request
      const data = await response.json();
      setRecipes(data.hits)
      console.log(data.hits)
      //alternative fetch(https....).then(response => {
      // response.json
      //})
    };

    getRecipes();
  },[query])//specify that useeffect is run only when query is submitted


  
  
  const updateSearch = e=>{
    setSearch(e.target.value) //using this function to change the value of value
    console.log(search)
  }
  
  const getSearch = e =>{
    e.preventDefault(); //prevent page refresh on submit
    setQuery(search); //set the query to our input in "search"
    setSearch("") //empty input bar after submitting

  }
  //


  return(
    <div className ="App">
      <div className="header">
        <h1>Search recipes by entering a keyword:</h1>
      </div>
        <form onSubmit = {getSearch}className = "search-form">
          <input className = "search-bar" type="text" value={search} onChange={updateSearch}/>
          <button  className = "search-button" type="submit">
            Search
          </button> 
        </form>
      <div className = "recipes">
      {recipes.map(recipe =>( //passing down recipe from state component to recipe componentn
        <Recipe 
        key = {recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={Math.round(recipe.recipe.calories)} 
        image={recipe.recipe.image}
        ingredients = {recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  )
}


export default App;
