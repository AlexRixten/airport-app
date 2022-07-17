import React, { useEffect, useRef, useState } from "react";
import { Card } from "../components/Card";
import { Filter } from "../components/Filter";
import { Search } from "../components/Search";
import { useAppDispatch, useAppSelector } from "../hook/redux";
import { fetchAirports } from "../store/actions/airportActions";
import ReactPaginate from "react-paginate";

const ITEMS_PER_PAGE = 50;

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const { error, loading, airports, count } = useAppSelector(
    (state) => state.airport
  );

  const page = useRef(1)

  const pageCount = Math.ceil(count / ITEMS_PER_PAGE);

  const pageChangeHandler = ({ selected }: { selected: number }) => { 
    page.current = selected + 1
    dispatch(fetchAirports(page.current, ITEMS_PER_PAGE));
  };

  return (
    <div className="container mx-auto max-w-[1140px] pt-5">
      <Search />
      <Filter />
      {loading && <p className="text-center text-lg">Loading...</p>}
      {error && <p className="text-center text-lg text-red-600">{error}</p>}
      {airports.map((airport) => (
        <Card key={airport.id} airport={airport} />
      ))}

      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={pageChangeHandler}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        forcePage={page.current - 1}
        previousLabel="<"
        containerClassName="flex"
        pageClassName="border py-1 px-3 mr-2"
        activeClassName="bg-gray-500 text-white"
        previousClassName="border py-1 px-3 mr-2"
        nextClassName="border py-1 px-3"
      />
    </div>
  );
};
