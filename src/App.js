
import { useEffect, useState } from 'react';
import './App.css';
import Nutrition from './Nutrition';
import LoaderPage from './Loader/LoaderPage';

function App() {
  const [mySearch, setMySearch] = useState();
  const [wordSubmitted, setWordSubmitted] = useState("");
  const [myNutrition, setMyNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);
 
  const getIngredients = async (ingr) => {
    setStateLoader(true);
    const response = await fetch (`https://api.edamam.com/api/nutrition-details?app_id=e41ff76f&app_key=%2060c0dd4b0898b19c944864c2f0ead68c%09`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify ({ingr:ingr})
    })
    if (response.ok) {
      setStateLoader (false);
    const data = await response.json()
    setMyNutrition(data);
  } else {
    setStateLoader (true);
    alert("Ingredients entered incorrectly");
  }
}
      useEffect(() => {
        if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/); 
      getIngredients(ingr);
        }
      }, [wordSubmitted]);

  const myRecipeSearch = (e) => {
    setMySearch(e.target.value)
  }
  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }
  return (
    <div className="App">

      <div className='container'>
        <h1>Nutrition Analysis</h1>
      </div>
<div className='container'>
  <form onSubmit={finalSearch}>
    <input className='search' onChange={myRecipeSearch} placeholder='✍🏻 Insert your ingredients...' value ={mySearch}/>
  </form>
</div>
<div className='container'>
  <button onClick={finalSearch}>🔍 Search</button>
</div>
{stateLoader && <LoaderPage/>}
<div className='frame'> 
{
          myNutrition && <p className='border'>{myNutrition.calories} kcal</p>
        }
  {
    myNutrition && Object.values(myNutrition.totalNutrients)
    .map(({ label, quantity, unit}, index) =>
      <Nutrition key = {index}
    label={label}
    quantity={quantity}
    unit={unit}
        />
            )  
  }

</div>
    </div>
  );
}

export default App;
