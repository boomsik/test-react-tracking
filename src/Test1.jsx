import React, { useState, useEffect, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, off } from "firebase/database";
import "./FirebaseDataComponent.css";
import dexs from "./99915600.png";

const FirebaseDataComponent = () => {
    const [dataList, setDataList] = useState([]);
    const [renderedCount, setRenderedCount] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [dailyRenderedCounts, setDailyRenderedCounts] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyAaXnn8SpVsznGR9ReK2gRXtvf0QzRJWQY",
            authDomain: "tracking-9dd77.firebaseapp.com",
            databaseURL: "https://tracking-9dd77-default-rtdb.firebaseio.com",
            projectId: "tracking-9dd77",
            storageBucket: "tracking-9dd77.appspot.com",
            messagingSenderId: "413125705228",
            appId: "1:413125705228:web:189a72d6252c631f5ef829",
        };

        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);
        const dataRef = ref(db, "tokenData");

        const unsubscribe = onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const newDataList = [];
                let totalCount = 0;
                const newDailyCounts = {};

                Object.entries(data).forEach(([key, value]) => {
                    const dateKey = new Date(
                        value.addedAt
                    ).toLocaleDateString();
                    if (
                        !selectedDate ||
                        dateKey === selectedDate.toLocaleDateString()
                    ) {
                        newDataList.unshift([key, value]);
                        totalCount++;
                        newDailyCounts[dateKey] =
                            (newDailyCounts[dateKey] || 0) + 1;
                    }
                });

                setDataList(newDataList);
                setRenderedCount(totalCount);
                setDailyRenderedCounts(newDailyCounts);
            }
        });

        return () => {
            off(dataRef);
            unsubscribe();
        };
    }, [selectedDate]);

    const filteredDataList = selectedDate
        ? dataList.filter(
              ([_, value]) =>
                  value.addedAt &&
                  new Date(value.addedAt).toLocaleDateString() ===
                      selectedDate.toLocaleDateString()
          )
        : dataList;

    const visibleDataList = filteredDataList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const copyTokenAddress = useCallback((tokenAddress) => {
        navigator.clipboard.writeText(tokenAddress);
    }, []);

    return (
        <div className="container">
            <h2 className="heading">Список данных из Firebase</h2>
            <p>Total Tracking Items: {renderedCount}</p>
            {selectedDate && (
                <div className="daily-rendered-counts">
                    {Object.entries(dailyRenderedCounts).map(
                        ([date, count]) => (
                            <p key={date}>
                                {date}: {count}
                            </p>
                        )
                    )}
                </div>
            )}
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
                {visibleDataList.map(([key, value]) => (
                    <div key={key} className="token-box">
                        <p className="token-name">Token Name</p>
                        <h5 className="token-value">{value.tokenName}</h5>
                        <ul className="mega-list">
                            <li className="li-flex">
                                <p className="token-name">Token Address:</p>
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
                            <li className="li-flex">
                                <a
                                    className="telegram-bot-link"
                                    href={`https://t.me/BananaGunSolana_bot?start=ref_vanyaway&address=${encodeURIComponent(
                                        value.tokenAddress
                                    )}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() =>
                                        copyTokenAddress(value.tokenAddress)
                                    }
                                >
                                    Banana Gun Solana Bot
                                </a>
                            </li>
                            <li className="li-flex">
                                <a
                                    className="telegram-bot-link"
                                    href="https://t.me/SolTradingBot?start=ref_vanyaway"
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() =>
                                        copyTokenAddress(value.tokenAddress)
                                    }
                                >
                                    Sol Trade Bot
                                </a>
                            </li>
                        </ul>
                    </div>
                ))}
            </ul>
            <div className="pagination">
                {Array.from({
                    length: Math.ceil(filteredDataList.length / itemsPerPage),
                }).map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FirebaseDataComponent;
