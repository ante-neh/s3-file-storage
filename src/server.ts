import { createServer } from "http"; 
import { app } from "./app"; 
import { connectToDatabase } from "./config/db"; 
import { PORT } from "./config/env"; 

const server = createServer(app);

server.listen(PORT, async ()=> {
    console.log(`Server is running on port ${PORT}`);
    await connectToDatabase();
})