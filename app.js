const express = require('express');

//instance variable from express
const app = express();
app.use(express.json());


//route from user
const user = require('./routes/user')

const voitures = [{id:1,name:"clio"},
                    {id:2,name:"megane"},
                        {id:3,name:"range"}
];

// -creer un api pour ajouter une voiture au tableau voiture 
app.post('/voitures', (req, res) => {
    const { id, name } = req.body;
    if (!id || !name) {
        return res.status(400).json({ message: "het name w id ." });
    }
    voitures.push({ id, name });
    res.status(201).json({ message: "Voiture added successfully." });
});
// -creer un api pour lister tous les voitues 

app.get('/voitures', (req, res) => {
    res.json(voitures);
});
// -creer un api pour lister une voiture a traveres le parametre passer et un message not found s'il existe pas dans le tableau 

app.get('/voitures/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const voiture = voitures.find(v => v.id === id);
    if (voiture) {
        res.json(voiture);
    } else {
        res.status(404).json({ message: 'Voiture non trouvée' });
    }
});
//-creer un api pour modifier une voiture avec un id specifique avec une verification (existe ou non )
app.post('/voiture/:id' , (req , res) => {

});

app.delete('/voitures/:id', (req, res)=> {
    const id = parseInt(req.params.id);
    const i = voitures.findIndex (v => v.id == id);
    if (i !== -1){
        voitures.splice(i,1)
        res.json({ message: 'Voiture supprimée avec succès' });
    }else {
        res.status(404).json({ message: 'Voiture non trouvée' });
    }
})

app.use('/user',user);


app.get('/',(req , res)=> {
    res.send('<h1>welcome!</h1>');
})
app.get('/health' , (req , res) => {
    res.json({status:200,message:'server working fine '});
})
app.get('/test' , (req , res) => {
    res.sendFile(__dirname + '/index.html');
})
//create new server instance with the default
app.listen(5000,()=>{
    console.log('listening on port 5000')
});
