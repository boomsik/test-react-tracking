import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import dexs from "./99915600.png";
import { getDatabase, ref, onValue, off } from "firebase/database";
import "./FirebaseDataComponent.css";

const FirebaseDataComponent = () => {
    const [dataList, setDataList] = useState([]);

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

        // Listen for changes in the database
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert data object to an array of key-value pairs
                const dataArray = Object.entries(data);
                // Prepend the new data to the existing array
                setDataList((prevDataList) => [...dataArray, ...prevDataList]);
            }
        });

        // Clean up listener when component unmounts
        return () => {
            off(dataRef);
        };
    }, []);

    return (
        <div className="container">
            <h2 className="heading">Список данных из Firebase</h2>
            <ul className="list">
                {dataList.map(([key, value]) => (
                    <div key={key} className="token-box">
                        <p className="token-name">Token Name</p>
                        <h5 className="token-value">{value.tokenName}</h5>
                        <ul className="mega-list">
                            <li className="li-flex">
                                <p className="token-name">Token Address:</p>
                                <p className="project_text">
                                    {value.tokenAddress}
                                </p>
                            </li>
                            <li>
                                <a
                                    className="dex-link"
                                    href={value.dexScreenerLink}
                                    target="_blank"
                                >
                                    <img
                                        className="dex-img"
                                        src={dexs}
                                        alt="dexscreener"
                                    />
                                </a>
                            </li>
                            <li>
                                <strong>Pair Created:</strong>{" "}
                                {value.pairCreated}
                            </li>
                        </ul>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default FirebaseDataComponent;
