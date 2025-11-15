const express = require("express");
const app = express()

app.get("/stats", async (req, res) => {
    try { 
        const email = req.query.email;
        const apiKey = `4ecc7208-ef8d-45af-8b6c-ceca0c88dcdb`;
        console.log("recieved email: ", email)

        const response = await fetch(`https://hackatime.hackclub.com/api/v1/users/lookup_email/${email}`, {
            headers: { "Authorization": `Bearer ${apiKey}`} 
        });
            const text = await response.text(); // read raw text
            console.log("API returned:", text);

        if (!response.ok) {
            return res.send("error: invalid email!");
        }

        let data;
        
        try {
            data = JSON.parse(text);
        } catch (err) {
            return res.status(500).send("API did not return valid JSON");
        }

        res.json(data); 
    }
        
    catch (error) {
        console.error(error);
        console.log(error); // log full error
        res.status(500).json({ error: "Failed to fetch stats" });
    }
});

app.listen(3000, () => console.log("server running at localhost:3000"));