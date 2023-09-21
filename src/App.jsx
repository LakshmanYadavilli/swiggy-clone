import { useState, useEffect } from "react";
import axios from "axios";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiFillStar,
} from "react-icons/ai";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // let top_resturent = [];
  const [top_page, setTop_page] = useState(0);
  const [top, setTop] = useState([]);
  const [obj, setObj] = useState({});
  useEffect(() => {
    api();
  }, []);
  async function api() {
    try {
      let response = await axios.get(
        "https://corsproxy.io/?" +
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5912716&lng=73.73890899999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      let res = await axios.get(
        "https://corsproxy.io/?" +
          "https://www.swiggy.com/restaurants/kaati-zone-rolls-and-wraps-bhujbal-wasti-wakad-pune-323668"
      );

      console.log(res);
      console.log({ response });

      setObj(response);
      setTop(
        response.data.data.cards[2].card.card.gridElements.infoWithStyle
          .restaurants
      );
      console.log({
        top_resturent:
          response.data.data.cards[2].card.card.gridElements.infoWithStyle
            .restaurants,
      });
    } catch (e) {
      console.log(e);
    }
  }

  function topResDec() {
    if (top_page > 0) {
      setTop_page((prev) => prev - 1);
    }
  }
  function topResInc() {
    if (top.length % 3 === 0 && top_page < top.length / 3 - 1) {
      setTop_page((prev) => prev + 1);
    } else {
      if (top_page < (top.length / 3).toFixed(0) - 1) {
        console.log({ top_page, len: top.length / 3 });
        setTop_page((prev) => prev + 1);
      }
    }
  }

  return (
    <>
      <h1>Swiggy Clone</h1>
      <div className="top-res">
        <h3 className="topResHeading">Top restuarants chains in Pune</h3>
        <div className="arrowsContainer">
          <div className="arrows" onClick={topResDec}>
            <AiOutlineArrowLeft />
          </div>
          <div className="arrows" onClick={topResInc}>
            <AiOutlineArrowRight />
          </div>
        </div>
      </div>
      <div className="topResMain">
        {top.length !== 0 &&
          3 * (top_page + 1) < top.length &&
          top.slice(3 * top_page, 3 * (top_page + 1)).map((item) => (
            <div className="topResCon">
              <div className="topResCard">
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.info.cloudinaryImageId}`}
                  alt="burger"
                  width="100%"
                  height="100%"
                />
                {item.info.aggregatedDiscountInfoV3 !== undefined ? (
                  <h4 className="offerText">
                    {item.info.aggregatedDiscountInfoV3?.header} {}
                    {item.info.aggregatedDiscountInfoV3?.subHeader}
                  </h4>
                ) : (
                  <h4 className="offerText">NO OFFER</h4>
                )}
              </div>
              <div className="topResDetails">
                <h4 className="overText">{item.info.name}</h4>
                <div className="ratingCon">
                  <div className="ratingIcon">
                    <AiFillStar color="white" />{" "}
                  </div>
                  <h5>{item.info.avgRating}</h5>
                </div>
                <p className="overText">{item.info.cuisines.join(",")}</p>
                <p>{item.info.areaName}</p>
              </div>
            </div>
          ))}
        {top.length !== 0 &&
          3 * (top_page + 1) > top.length &&
          top.slice(top.length - 3, top.length).map((item) => (
            <div className="topResCon">
              <div className="topResCard">
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.info.cloudinaryImageId}`}
                  alt="burger"
                  width="100%"
                  height="100%"
                />
                {item.info.aggregatedDiscountInfoV3 !== undefined ? (
                  <h4 className="offerText">
                    {item.info.aggregatedDiscountInfoV3?.header} {}
                    {item.info.aggregatedDiscountInfoV3?.subHeader}
                  </h4>
                ) : (
                  <h4 className="offerText">NO OFFER</h4>
                )}
              </div>
              <div className="topResDetails">
                <h4 className="overText">{item.info.name}</h4>
                <div className="ratingCon">
                  <div className="ratingIcon">
                    <AiFillStar color="white" />{" "}
                  </div>
                  <h5>{item.info.avgRating}</h5>
                </div>
                <p className="overText">{item.info.cuisines.join(",")}</p>
                <p>{item.info.areaName}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
