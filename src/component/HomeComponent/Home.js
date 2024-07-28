import React, { useEffect } from "react";
import { Container } from "./HomeStyle";
import ImageSlider from "../ImageSlider/ImageSlider";
import Viewers from "../Viewers/Viewers";
import Recomendation from "../SuggestionsComponent/RecomendationComponent/Recomendation";
import NewDisney from "../SuggestionsComponent/NewDisneyComponent/NewDisney";
import Originals from "../SuggestionsComponent/OriginalsComponent/Original";
import Trendings from "../SuggestionsComponent/TrendingComponent/Trending";
import { useDispatch, useSelector } from "react-redux";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { setMovie } from "../../features/movie/movieSlice";
import { selectUserName } from "../../features/user/userSlice";

function Home() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  useEffect(() => {
    const fetchMovies = async () => {
      const db = getFirestore();
      const moviesCollection = collection(db, "movies");
      const moviesSnapshot = await getDocs(moviesCollection);

      const recommends = [];
      const newDisneys = [];
      const originals = [];
      const trendings = [];

      moviesSnapshot.forEach((doc) => {
        const data = doc.data();

        const movie = { id: doc.id, ...data };
        switch (data.type) {
          case "recommend":
            recommends.push(movie);
            break;
          case "new":
            newDisneys.push(movie);
            break;
          case "trending":
            trendings.push(movie);
            break;
          case "original":
            originals.push(movie);
            break;
          default:
            break;
        }
      });

      dispatch(
        setMovie({
          recommend: recommends,
          newDisney: newDisneys,
          original: originals,
          trending: trendings,
        })
      );
    };

    fetchMovies();
  }, [dispatch, userName]);

  return (
    <Container>
      <ImageSlider />
      <Viewers />
      <Recomendation />
      <NewDisney />
      <Originals />
      <Trendings />
    </Container>
  );
}

export default Home;
