require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log("conectado"))
.catch(err => console.error("error:", err))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  age: {
    type: Number
  },
  favoriteFoods: [String]
})

let Person = new mongoose.model('Person', personSchema )


async function createAndSavePerson(done) {
  let juan = new Person({
    name: "Juan Andres",
    age: 33,
    favoriteFoods: ["rice", "lettuce"]
  });
  let createdperson = await juan.save();
  done(null, createdperson);
  /*juan.save(function(err, data){
    if(err){console.log(err)
    done(null,data);
      }
  } )*/
}
let People;
  People = [
  {
    name: "Maria Fernanda",
    age: 25,
    favoriteFoods: ["fries"]
  },
  {
    name: "Natalia Múnera",
    age: 27,
    favoriteFoods: ["pizza","beer", "meat"]
  }
]
const createManyPeople = async(People, done) => {
   await Person.create(People, (err, savePeople)=>{
    if(err)
      return console.log(err)
      done(null , savePeople);
      console.log(savePeople)
    }
  )
};

const findPeopleByName = (personName, done) => {
  
  Person.find({name: personName}, (err, personFound)=>{
    if(err)return console.log(err)
    done(null, personFound)
    console.log(personFound)
  } )
  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, foodFound)=>{
    if(err)
    return console.log(err)
    done(null , foodFound);
    console.log(foodFound)
  })
  
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, findId)=>{
    if(err)
    return console.log(err)
    done(null , findId);
    console.log(findId)
  } )
  
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  //Find a person
  Person.findById({_id: personId}, (err, person)=>{
    if(err)return (err)
  //push food into the array
  person.favoriteFoods.push(foodToAdd);
  // save person
  person.save((err, update)=>{
    if(err)return console.log(err)
    done(null , update);
  })
  })
  
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.createManyPeople = createManyPeople;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;

exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
