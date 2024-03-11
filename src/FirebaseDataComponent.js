import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import dexs from "./99915600.png";
import { getDatabase, ref, onValue, off } from "firebase/database";
import "./FirebaseDataComponent.css";

const FirebaseDataComponent = () => {
<<<<<<< HEAD
  const [dataList, setDataList] = useState([]);
  const [renderedCount, setRenderedCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dailyRenderedCounts, setDailyRenderedCounts] = useState({});
=======
    const [dataList, setDataList] = useState([]);
    const [renderedCount, setRenderedCount] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [dailyRenderedCounts, setDailyRenderedCounts] = useState({});
>>>>>>> 15a2abc68d6e0a807db95675c2089821ae101c8f

  useEffect(() => {
    // Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyAaXnn8SpVsznGR9ReK2gRXtvf0QzRJWQY",
      authDomain: "tracking-9dd77.firebaseapp.com",
      databaseURL: "https://tracking-9dd77-default-rtdb.firebaseio.com",
      projectId: "tracking-9dd77",
      storageBucket: "tracking-9dd77.appspot.com",
      messagingSenderId: "413125705228",
      appId: "1:413125705228:web:189a72d6252c631f5ef829",
    };

    // Initialize Firebase app
    const app = initializeApp(firebaseConfig);

    // Get a reference to the database
    const db = getDatabase(app);
    const dataRef = ref(db, "tokenData");

<<<<<<< HEAD
    // Listen for changes in the database
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert data object to an array of key-value pairs
        const dataArray = Object.entries(data);
        // Prepend the new data to the existing array
        setDataList((prevDataList) => [...dataArray, ...prevDataList]);

        // Update the rendered count
        setRenderedCount((prevCount) => prevCount + dataArray.length);

        // Update daily rendered counts
        const newDailyCounts = { ...dailyRenderedCounts };
        dataArray.forEach(([_, value]) => {
          const dateKey = new Date(value.addedAt).toLocaleDateString();
          newDailyCounts[dateKey] = (newDailyCounts[dateKey] || 0) + 1;
=======
        // Listen for changes in the database
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert data object to an array of key-value pairs
                const dataArray = Object.entries(data);
                // Prepend the new data to the existing array
                setDataList((prevDataList) => [...dataArray, ...prevDataList]);

                // Update the rendered count
                setRenderedCount((prevCount) => prevCount + dataArray.length);

                // Update daily rendered counts
                const newDailyCounts = { ...dailyRenderedCounts };
                dataArray.forEach(([_, value]) => {
                    const dateKey = new Date(
                        value.addedAt
                    ).toLocaleDateString();
                    newDailyCounts[dateKey] =
                        (newDailyCounts[dateKey] || 0) + 1;
                });
                setDailyRenderedCounts(newDailyCounts);
            }
>>>>>>> 15a2abc68d6e0a807db95675c2089821ae101c8f
        });
        setDailyRenderedCounts(newDailyCounts);
      }
    });

    // Clean up listener when component unmounts
    return () => {
      off(dataRef);
    };
  }, []);

  // Filter dataList based on selectedDate
  const filteredDataList = selectedDate
    ? dataList.filter(
        ([_, value]) =>
          value.addedAt &&
          new Date(value.addedAt).toLocaleDateString() ===
            selectedDate.toLocaleDateString(),
      )
    : dataList;

  // Function to copy token address to clipboard
  const copyTokenAddress = (tokenAddress) => {
    navigator.clipboard.writeText(tokenAddress);
  };

<<<<<<< HEAD
  return (
    <div className="container">
      <h2 className="heading">Список данных из Firebase</h2>
      <p>Total Rendered Items: {renderedCount}</p>
      <div className="daily-rendered-counts">
        {Object.entries(dailyRenderedCounts).map(([date, count]) => (
          <p key={date}>
            {date}: {count}
          </p>
        ))}
      </div>
      <div className="filter">
        <label htmlFor="datePicker">Filter by Date:</label>
        <input
          type="date"
          id="datePicker"
          value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />
      </div>
      <ul className="list">
        {filteredDataList.map(([key, value]) => (
          <div key={key} className="token-box">
            <p className="token-name">Token Name</p>
            <h5 className="token-value">{value.tokenName}</h5>
            <ul className="mega-list">
              <li className="li-flex">
                <p className="token-name">Token Address:</p>
                <p className="project_text">{value.tokenAddress}</p>
                <button onClick={() => copyTokenAddress(value.tokenAddress)}>
                  Copy
                </button>
              </li>
              <li>
                <a
                  className="dex-link"
                  href={value.dexScreenerLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className="dex-img" src={dexs} alt="dexscreener" />
                </a>
              </li>
              <li>
                <strong>Pair Created:</strong>
                <p className="token-name"> {value.pairCreated}</p>
              </li>
              <li>
                <strong>Added At:</strong>{" "}
                {value.addedAt
                  ? new Date(value.addedAt).toLocaleString()
                  : "Unknown"}
              </li>
=======
    // Filter dataList based on selectedDate
    const filteredDataList = selectedDate
        ? dataList.filter(
              ([_, value]) =>
                  value.addedAt &&
                  new Date(value.addedAt).toLocaleDateString() ===
                      selectedDate.toLocaleDateString()
          )
        : dataList;

    // Function to copy token address to clipboard
    const copyTokenAddress = (tokenAddress) => {
        navigator.clipboard.writeText(tokenAddress);
    };

    return (
        <div className="container">
            <h2 className="heading">Список данных из Firebase</h2>
            <p>Total Tracking Items: {renderedCount}</p>
            <div className="daily-rendered-counts">
                {Object.entries(dailyRenderedCounts).map(([date, count]) => (
                    <p key={date}>
                        {date}: {count}
                    </p>
                ))}
            </div>
            <div className="filter">
                <label htmlFor="datePicker">Filter by Date:</label>
                <input
                    type="date"
                    id="datePicker"
                    value={
                        selectedDate
                            ? selectedDate.toISOString().split("T")[0]
                            : ""
                    }
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                />
            </div>
            <ul className="list">
                {filteredDataList.map(([key, value]) => (
                    <div key={key} className="token-box">
                        <p className="token-name">Token Name</p>
                        <h5 className="token-value">{value.tokenName}</h5>
                        <ul className="mega-list">
                            <li className="li-flex">
                                <p className="token-name">Token Addressssss:</p>
                                <p className="project_text">
                                    {value.tokenAddress}
                                </p>
                                <button
                                    onClick={() =>
                                        copyTokenAddress(value.tokenAddress)
                                    }
                                >
                                    Copy
                                </button>
                            </li>
                            <li>
                                <a
                                    className="dex-link"
                                    href={value.dexScreenerLink}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        className="dex-img"
                                        src={dexs}
                                        alt="dexscreener"
                                    />
                                </a>
                            </li>
                            <li>
                                <strong>Pair Created:</strong>
                                <p className="token-name">
                                    {" "}
                                    {value.pairCreated}
                                </p>
                            </li>
                            <li>
                                <strong>Added At:</strong>{" "}
                                {value.addedAt
                                    ? new Date(value.addedAt).toLocaleString()
                                    : "Unknown"}
                            </li>
                            <li>
                                <p>its telegram link</p>
                            </li>
                            <li className="li-flex">
                                <a
                                    className="telegram-bot-link"
                                    href="https://t.me/BananaGunSolana_bot?start=ref_vanyaway"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Banana Gun Solana Bot
                                </a>
                            </li>
                        </ul>
                    </div>
                ))}
>>>>>>> 15a2abc68d6e0a807db95675c2089821ae101c8f
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default FirebaseDataComponent;
