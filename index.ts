import express from 'express';

const app: express.Application = express();

const port: number = 8000;

app.get('/', (_req, _res) => {
	_res.send("TypeScript With Express");
});


app.listen(port, () => {
	console.log(`server is running on ${port}`);
});
