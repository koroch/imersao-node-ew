// docker ps
// docker exec -it 47d0c57359e7 mongo -u koroch -p 00000000 --authenticationDatabase heroes 

show dbs
use heroes

show collections

for (let index = 0; index < 10; index++) {
    db.heroes.insert({
        nome: `Clone-${index}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
}

db.heroes.count()

//find
db.heroes.find().pretty()
db.heroes.findOne({ _id: ObjectId('6588a59fe6d52f205732ad99') })
db.heroes.find().limit(100).sort({ nome: -1 })
db.heroes.find({}, { poder: 1, _id: 0 })

//create 
db.heroes.insert({
    nome: `Flash`,
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

//read
db.heroes.find()

//update
db.heroes.update({ _id: ObjectId("6588a59fe6d52f205732ad99") }, { $set: { nome: "noely" } })
db.heroes.update({ poder: 'Velocidade' }, { $set: { nome: "noely" } }) //modifica 1

//delete
db.heroes.remove({}) //todos
db.heroes.remove({ nome: 'noely' })