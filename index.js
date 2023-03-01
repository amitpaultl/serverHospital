const express = require('express');
const cors = require('cors');
const prot = process.env.PROT || 5000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://firebase:9vrdUu7o5m2mm0NF@cluster0.acij04d.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// mongodb connect  
const dbConnent = async () => {
    try {
        await client.connect();


    }
    catch (error) {
        console.log(error);

    }

}
dbConnent()


// data collection

const present = client.db('firebase').collection('present');

// post user collection
app.put('/present', async (req, res) => {
    try {
        const presentdata = req.body;
        const result = await present.insertOne(presentdata);
        res.send({
            success: true,
            data: result,
            message: 'Successfully get data'
        })
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        })
    }
})

// Get user collection
app.get('/getpresent', async (req, res) => {
    try {
        const query = {}

        const result = await present.find(query).toArray()

        res.send({
            success: true,
            data: result,
            message: 'Successfully get data'
        })
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        })
    }
})

// single product item
app.get('/getpresent/:id', async (req, res) => {
    try {
        const id = req.params.id
        const query = { _id: new ObjectId(id) }

        const resust = await present.findOne(query)

        res.send(resust)

    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        })
    }
})

// delete user id
app.delete('/getpresent/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) }
        const query = await present.deleteOne(filter);
        res.send({
            success: true,
            data: query,
            message: 'Successfully get data'
        })

    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        })
    }
})

// put advidser
app.put('/getpresent/:id', async (req, res) => {
    try {
        const product = req.body;
        console.log(product);
        const id = req.params.id;

        const filter = { _id: new ObjectId(id) };

        const option = { upsert: true };
        const updateId = {
            $set: {
                name: product.name,
                contact: product.contact,
                address: product.address,
                pincode: product.pincode
            }
        }
        console.log(updateId);
        const result = await present.updateOne(filter, updateId, option)
        console.log(result);
        res.send({
            success: true,
            data: result,
            message: 'Successfully get data'

        })
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        })

    }
})


app.get('/', (req, res) => {
    res.send('REPLIQ  server running')
})

app.listen(prot, () => {
    console.log('REPLIQ server log');
})