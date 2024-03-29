import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { porductModel,createProduct } from './model/product';
import {cartModel,createCartProduct} from './model/cart';



const app: express.Application = express();

const port: number = 8000;
const URI="mongodb+srv://sunitsarkar:LwP8bgRq3VOKlHWI@cluster0.gxschpx.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());
app.use(bodyParser.json());

mongoose.Promise=Promise;
mongoose.connect(URI).then(()=>{
    console.log('connedted to databse')
});
mongoose.connection.on('error',(error: Error)=> console.log(error))

app.listen(port, () => {
	console.log(`server is running on ${port}`);
});
// app.get('/', (_req, _res) => {
// 	_res.send("TypeScript With Express");
// });

app.post('/', async (req: express.Request,res: express.Response)=>{
    const {name,category,price}=req.body
    const product = await createProduct({
        name,
        category,
        price
      });
  
      return res.status(201).json(product).end();
});

app.get('/',async (req:express.Request, res:express.Response)=>{
    const product=await porductModel.find()
    return res.status(200).json(product).end();
});


//cart routers
app.post('/cart', async (req: express.Request,res: express.Response)=>{
    const {name,category,price,quantity,isBought}=req.body;
    const cartProduct = await createCartProduct({
        name,
        category,
        price,
        quantity,
        isBought
      });
      return res.status(201).json(cartProduct).end();
});

app.get('/cart',async (req:express.Request, res:express.Response)=>{
    const cartProduct=await cartModel.find()
    return res.status(200).json(cartProduct).end();
})

app.put('/cart', async (req: express.Request,res: express.Response)=>{
    const id = req.query.id;
    const {name,category,price,quantity,isBought}=req.body;

    const updatedPorduct= await cartModel.findByIdAndUpdate(id, { name,category,price,quantity,isBought }, { new: true })
    return res.status(200).json(updatedPorduct).end()
});