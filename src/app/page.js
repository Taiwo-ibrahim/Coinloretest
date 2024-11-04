"use client"

import "./globals.css"
import React, { useEffect, useState } from "react"
import pagination from 'react-js-pagination'
import axios from "axios"
import Load from "@/Components/Load/Load"
import { Button } from "@/Components/ui/button"

export default function Home() {
  const [coinPrices, setCoinPrices] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  // const [totalPages, setTotalPages] = useState(
  //   Math.ceil(coinPrices.length / itemsPerPage)
  // ) 

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = coinPrices.slice(startIndex, endIndex);


  const totalPages = Math.ceil(coinPrices.length / itemsPerPage)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coinlore.net/api/tickers/"
        )
        setCoinPrices(response.data.data)
      } catch (error) {
        console.error("Error fetching coin prices:", error)
      }
    }

    fetchData()
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1)
      console.log(currentPage)
    }
    // else {
    //   return (currentPage == 1)
    // }
  };

  return (
    <div className="table__page">
      <div className="table__container">
        <div className="table__container-header">
          <p>💰Coin Name</p>
          <p>📄code</p>
          <p>🤑Price</p>
          <p>📉Total Supply</p>
        </div>

        <div className="table__container-prices">
          {coinPrices.length > 0 ? (
            paginatedData.map((coinPrice) => (
              <div
                key={coinPrice.id}
                className="table__container-prices_description"
              >
                <p>{coinPrice.name}</p>
                <p>{coinPrice.symbol}</p>
                <p>${coinPrice.price_usd}</p>
                <p>
                  {coinPrice.tsupply} {coinPrice.symbol}
                </p>
              </div>
            ))
          ) : (
            <Load />
          )}
        </div>

        <div className="table__container-prices_responsive">
          {coinPrices.length > 0 ? (
            paginatedData.map((coinPrice) => (
              <div
                key={coinPrice.id}
                className="table__container-prices_responsive-description"
              >
                <div className="table__item">
                  <h1>💰Coin</h1>
                  <p>{coinPrice.name}</p>
                </div>
                <div className="table__item">
                  <h1>📄code</h1>
                  <p>{coinPrice.symbol}</p>
                </div>
                <div className="table__item">
                  <h1>🤑Price</h1>
                  <p>${coinPrice.price_usd}</p>
                </div>
                <div className="table__item">
                  <h1>📉Total Supply</h1>
                  <p>
                    {coinPrice.tsupply} {coinPrice.symbol}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <Load />
          )}
        </div>
      </div>

      <div className="table__container-paginate_btn">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          ⬅️previous page
        </Button>

        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next page➡️
        </Button>
      </div>
    </div>
  )
}