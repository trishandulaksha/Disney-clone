import { promises as fs } from "fs";
import db from "./src/firebaseSetup/firebaseAdmin.js";

// Path to your JSON file
const filePath = "./src/disneyPlusMoviesData.json";

// Read the JSON file
const uploadMovies = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data);
    const movies = jsonData.movies;

    // Loop through each movie and add to Firestore
    for (const key of Object.keys(movies)) {
      const movie = movies[key];

      // Extract only the desired fields
      const {
        backgroundImg,
        cardImg,
        description,
        subTitle,
        title,
        titleImg,
        type,
      } = movie;
      const movieData = {
        backgroundImg,
        cardImg,
        description,
        subTitle,
        title,
        titleImg,
        type,
      };

      try {
        await db.collection("movies").add(movieData);
        console.log(`Movie ${title} added successfully`);
      } catch (error) {
        console.error("Error adding movie:", error);
      }
    }
  } catch (err) {
    console.error("Error reading or parsing file:", err);
  }
};

uploadMovies();
