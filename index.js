const express = require("express");
const app = express()


app.get("/stats", async (req, res) => {
  try { const apiKey = "4ecc7208-ef8d-45af-8b6c-ceca0c88dcdb";

        const response = await fetch("https://hackatime.hackclub.com/api/v1/stats", {
                headers: { "Authorization": `Bearer ${apiKey}`} 
            });
            
            const text = await response.text(); // read raw text
            console.log("API returned:", text)

        if (!response.ok) {
            return res.status(response.status).send(text);
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
        res.status(500).json({ error: "Failed to fetch stats" });
        console.log(error);
    }
});

app.listen(3000, () => console.log("server running at localhost:3000"));