import express from 'express';
import cors from 'cors';
import router from './routes/clientRoute.js';


const app = express();
const port = 3000;
const clientRoute = router;

app.use(cors());
app.use(express.json());

app.use('/api', clientRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

