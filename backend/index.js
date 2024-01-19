const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())
const {User} = require('./userModel')
const { JSON } = require('sequelize')
// Função para calcular a distância entre dois pontos
function calcularDistancia(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

function calcularRota(clientes) {
    let rota = [];
    let atual = { x: 0, y: 0 }; 
  
    while (clientes.length > 0) {
      let proximoIndex = 0;
      let distanciaMinima = calcularDistancia(atual, clientes[0]);
  
      for (let i = 1; i < clientes.length; i++) {
        let distancia = calcularDistancia(atual, clientes[i]);
        if (distancia < distanciaMinima) {
          distanciaMinima = distancia;
          proximoIndex = i;
        }
      }
  
      rota.push(clientes[proximoIndex]);
      atual = clientes[proximoIndex];
      clientes.splice(proximoIndex, 1);
    }
  
    return rota;
  }

app.get('/', (req, res) => res.json({status: true}))

app.get('/companies',async (req, res) => {
  let where = {
    where: {
      user_id: null
    }
  }
  const result = await User.findAll(where);
  return res.json({status:true,data: result})
})

app.get('/companies/:user_id/users',async (req, res) => {
  const {user_id} = req.params
  let where = {
    where: {
      user_id
    }
  }
  const result = await User.findAll(where);
  return res.json({status:true,data: result})
})

app.post('/test', async (req, res) => {
  try {
      const cord = JSON.stringify({x:14,y:10})
      const result = await User.create({ nome: "Odair",email: 'test@gmail.com',telefone:'0000000',cord  })
      return res.json({status:true,data: result})
    } catch (error) {
      return res.json({status:false,data: {}})
  }


})

app.post('/users', async (req, res) => {
  try {
      const {nome,email,telefone,cord,user_id,x,y} = req.body
    
    
      const data = await User.create({ nome ,email, telefone,user_id, x, y })
      return res.json({ status:true,data})
    } catch (error) {
      console.log('error: ', error);
      return res.json({status:false,data: {},error})
  }
});

app.get('/otimizar-rota/:user_id', async (req, res) => {
  const {user_id} = req.params
  let where = {
    where: {
      user_id
    }
  }
  const result = await User.findAll(where);
  let rota = calcularRota(result);


  return res.json({status:true,data: rota})
});

function parse(obj){
  return JSON.parse(obj)
}



app.listen(port, () => console.log(`Example app listening on port ${port}!`))