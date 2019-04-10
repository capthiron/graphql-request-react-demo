import React, { useState } from 'react';
import Request from 'graphql-request-react'
import './Demo.css';

const Demo = () => {
  const url = "https://graphql-pokemon.now.sh"

  const [pokemon, setPokemon] = useState("Charmeleon")

  const query = `query getPokemon($name: String!) {
    pokemon(name: $name) {
      name
      image
    }
  }`

  return (
    <div className="Demo">
      <input value={pokemon} onChange={e => setPokemon(e.target.value)}/>

      <Request url={url} query={query} variables={ {name: pokemon.length > 0 ? pokemon : " "} }

        render={data => {
          if (data.pokemon) return (

            <div>
              <h1 style={ {textTransform: "capitalize"} }>{data.pokemon.name}</h1>
              <img alt={"Pokemon"} src={data.pokemon.image}/>
            </div>

          )
          return <h1 style={ {color: "green"} }><span style={ {color: "orange" }}>{pokemon} could not be found.</span> Keep looking in the high grass!</h1>
        }}

        loading={() => <h2>Loading...</h2>}
        error={err => <h1 style={ {color: "red"} }>An error occured: {err.message}</h1>}
      />
    </div>
  )
}

export default Demo;
