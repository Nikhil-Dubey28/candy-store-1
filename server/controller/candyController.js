const Candy = require('../model/Candy')


// create/post candy api
const createCandy = async (req,res) => {
try {
    const {name,description,price,quantity} = req.body 
    const newCandy = await Candy.create({name,description,price,quantity})
    res.status(201).json(newCandy)
}catch (err) {
    console.log(err)
    res.status(500).json({message: 'internal server error'})
}
    
}


// get  api
const getCandy = async(req,res) => {
    try {
        const candy = await Candy.findAll()
        res.status(200).json(candy)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'internal server error'})
    }
}

//get  by id;
const getCandyById = async (req, res) => {
    try {
      const { id } = req.params;
      const candy = await Candy.findByPk(id);
  
      if (!candy) {
        return res.status(404).json({ message: 'candy not found' });
      }
  
      res.status(200).json(candy);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

//delete candy
const deleteCandy = async (req,res) => {
    try {
        const{id} =req.params 
        await Candy.destroy({where: {id}})
        res.status(204).end()
     }catch (err) {
        console.log(err)
        res.status(500).json({message: 'internal server error'})
    }
}


// edit api
const editCandy = async (req,res) => {
    try {
        const { id } = req.params;
        const { name,description,price,quantity} = req.body;
    
        const candy = await Candy.findOne({ where: { id } });
    
        if (!candy) {
          return res.status(404).json({ message: 'candy not found' });
        }
    
        candy.name = name;
        candy.description = description;
        candy.price = price;
        candy.quantity = quantity
        await candy.save();
    
        res.status(200).json(candy);
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
      }
}

// buy candies
const buyCandy = async(req,res) => {
  try {
    const { id } = req.params;
    const { quantity = 1 } = req.body; 

   
    const candy = await Candy.findByPk(id);

    if (!candy) {
      return res.status(404).json({ message: 'Candy not found' });
    }

   
    if (candy.quantity > 0 && candy.quantity >= quantity) {
      
      candy.quantity -= quantity;

      
      await candy.save();

      
      res.status(200).json(candy);

      
    } else {
      res.status(400).json({ message: 'Insufficient candy quantity' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
    createCandy,
    getCandy,
    deleteCandy,
    editCandy,
    getCandyById,
    buyCandy
}