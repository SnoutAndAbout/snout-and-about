const client = require('./client.js');

const stateDict = [
  { name: "Alabama", aliases: ["Alabama", "AL", "Ala."] },
  { name: "Alaska", aliases: ["Alaska", "AK", "Alas."] },
  { name: "Arizona", aliases: ["Arizona", "AZ", "Ariz."] },
  { name: "Arkansas", aliases: ["Arkansas", "AR", "Ark."] },
  { name: "California", aliases: ["California", "CA", "Calif."] },
  { name: "Colorado", aliases: ["Colorado", "CO", "Colo."] },
  { name: "Connecticut", aliases: ["Connecticut", "CT", "Conn."] },
  { name: "Delaware", aliases: ["Delaware", "DE", "Del."] },
  { name: "Florida", aliases: ["Florida", "FL", "Fla."] },
  { name: "Georgia", aliases: ["Georgia", "GA", "Ga."] },
  { name: "Hawaii", aliases: ["Hawaii", "HI", "Haw."] },
  { name: "Idaho", aliases: ["Idaho", "ID", "Id."] },
  { name: "Illinois", aliases: ["Illinois", "IL", "Ill."] },
  { name: "Indiana", aliases: ["Indiana", "IN", "Ind."] },
  { name: "Iowa", aliases: ["Iowa", "IA"] },
  { name: "Kansas", aliases: ["Kansas", "KS"] },
  { name: "Kentucky", aliases: ["Kentucky", "KY", "Ky."] },
  { name: "Louisiana", aliases: ["Louisiana", "LA", "La."] },
  { name: "Maine", aliases: ["Maine", "ME"] },
  { name: "Maryland", aliases: ["Maryland", "MD", "Md."] },
  { name: "Massachusetts", aliases: ["Massachusetts", "MA", "Mass."] },
  { name: "Michigan", aliases: ["Michigan", "MI", "Mich."] },
  { name: "Minnesota", aliases: ["Minnesota", "MN", "Minn."] },
  { name: "Mississippi", aliases: ["Mississippi", "MS", "Miss."] },
  { name: "Missouri", aliases: ["Missouri", "MO", "Mo."] },
  { name: "Montana", aliases: ["Montana", "MT", "Mont."] },
  { name: "Nebraska", aliases: ["Nebraska", "NE", "Nebr."] },
  { name: "Nevada", aliases: ["Nevada", "NV", "Nev."] },
  { name: "New Hampshire", aliases: ["New Hampshire", "NH", "N.H."] },
  { name: "New Jersey", aliases: ["New Jersey", "NJ", "N.J."] },
  { name: "New Mexico", aliases: ["New Mexico", "NM", "N.M."] },
  { name: "New York", aliases: ["New York", "NY", "N.Y.", "New York City", "NYC"] },
  { name: "North Carolina", aliases: ["North Carolina", "NC", "N.C."] },
  { name: "North Dakota", aliases: ["North Dakota", "ND", "N.D."] },
  { name: "Ohio", aliases: ["Ohio", "OH"] },
  { name: "Oklahoma", aliases: ["Oklahoma", "OK", "Okla."] },
  { name: "Oregon", aliases: ["Oregon", "OR", "Ore."] },
  { name: "Pennsylvania", aliases: ["Pennsylvania", "PA", "Pa."] },
  { name: "Rhode Island", aliases: ["Rhode Island", "RI", "R.I."] },
  { name: "South Carolina", aliases: ["South Carolina", "SC", "S.C."] },
  { name: "South Dakota", aliases: ["South Dakota", "SD", "S.D."] },
  { name: "Tennessee", aliases: ["Tennessee", "TN", "Tenn."] },
  { name: "Texas", aliases: ["Texas", "TX", "Tex."] },
  { name: "Utah", aliases: ["Utah", "UT"] },
  { name: "Vermont", aliases: ["Vermont", "VT"] },
  { name: "Virginia", aliases: ["Virginia", "VA", "Va."] },
  { name: "Washington", aliases: ["Washington", "WA", "Wash."] },
  { name: "West Virginia", aliases: ["West Virginia", "WV", "W.Va."] },
  { name: "Wisconsin", aliases: ["Wisconsin", "WI", "Wis."] },
  { name: "Wyoming", aliases: ["Wyoming", "WY", "Wyo."] }
];

const cityCheck = async( cityName ) => {
  try {
    const [city,stateN] = cityName.split(',').map((word)=>word.trim());
    let stateName = stateN;
    //PARSING THE STATE NAME TO THE PROPER VALUE
    for (state in stateDict){
      if(stateDict[state].aliases.map((x)=>x.toLowerCase()).includes(stateName.toLowerCase())){
        stateName = stateDict[state].name
      }
    }
    if(!(Object.keys(stateDict).includes(stateName))){
      throw new Error('Bad State Specification');
    }
    const {rows} = await client.query(`
      SELECT * FROM cities;
    `);
    //CHECKING TO SEE IF OUR CITY IS ALREADY IN THE TABLE
    for (row in rows) {
      if((rows[row].name.replace(/ /g,'').toLowerCase()==city.replace(/ /g,'').toLowerCase()) && (rows[row].state==stateName)){
        return rows[row].id;
      }
    }
    //CREATES A NEW CITY ENTRY AND RETURNS ITS ID
    const newCityId = await addCity(city,stateName);
    return newCityId;
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}


//ADDS A NEW CITY TO THE CITY TABLE
const addCity = async( cityName, stateName ) => {
  //MAKES SURE THE CITY NAME IS FORTMATTED WELL WITH SPACES AND CAPITAL LETTERS
  const parsedName = cityName.split(' ').map((word) => word[0].toUpperCase()+word.slice(1).toLowerCase()).join(' ');
  try {
    const {rows} = await client.query(`
      INSERT INTO cities ( name, state )
      VALUES ('${parsedName}', '${stateName}')
      RETURNING *;
    `);
      return rows[0].id;
  } catch (error) {
    throw new Error(error);
  }
}

//RETURNS ALL THE CITIES 
const fetchCities = async() => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM cities;
    `);
    return rows;
  } catch (error) {
    throw new Error(error);
  }
}

//FETCHES THE NAME OF A CITY WITH A GIVEN ID
const cityName = async(id) => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM cities WHERE id=${id};
    `);
    return rows[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

module.exports = {
  cityCheck,
  fetchCities,
  cityName,
  addCity
}