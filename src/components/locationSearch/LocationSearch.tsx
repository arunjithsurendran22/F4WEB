"use client";
import React, { useState, useEffect, useRef } from "react";
import InputBoxCloseButton from "../ui/inputbox/InputBoxCloseButton";
import { useLoadScript, Libraries } from "@react-google-maps/api";
import SpinnerLoader from "../ui/SpinnerLoader/SpinnerLoader";
import { useDispatch } from "react-redux";
import { setLatLong } from "../../store/locationSlice";
import { setCoordinates } from "../../store/addressSlice";

const libraries: Libraries = ["places"];

// Fetch place predictions based on the user's input
const fetchSuggestions = (
  input: string,
  autocompleteService: any
): Promise<any[]> => {
  return new Promise((resolve) => {
    if (!input || !autocompleteService) {
      resolve([]);
      return;
    }

    const request = {
      input,
      //types: ["(cities)"],
    };

    autocompleteService.getPlacePredictions(
      request,
      (predictions: any[], status: string) => {
        if (status !== "OK" || !predictions) {
          resolve([]);
          return;
        }
        resolve(predictions);
      }
    );
  });
};

interface LocationSearchProps {
  close?: () => void; // Optional close callback
}

const LocationSearch: React.FC<LocationSearchProps> = ({ close }) => {
  const dispatch = useDispatch();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries, // Load places library for autocomplete
  });

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const [clearInput, setClearInput] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autocompleteService = useRef<any>(null);
  const placesServiceRef = useRef<any>(null); // Ref for PlacesService

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsSuggestionsVisible(false);
      }
    };

    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  // Initialize AutocompleteService and PlacesService after the map is loaded
  useEffect(() => {
    if (isLoaded) {
      autocompleteService.current =
        new google.maps.places.AutocompleteService();
      if (typeof window !== "undefined") {
        placesServiceRef.current = new google.maps.places.PlacesService(
          document.createElement("div")
        );
      }
    }
  }, [isLoaded]);

  const handleInputChange = (value: string) => {
    setClearInput(false);
    if (value && autocompleteService.current) {
      fetchSuggestions(value, autocompleteService.current).then((results) =>
        setSuggestions(results)
      );
      setIsSuggestionsVisible(true);
    } else {
      setSuggestions([]);
      setIsSuggestionsVisible(false);
    }
  };

  // Function to handle when a suggestion is clicked
  const handleSuggestionClick = (suggestion: any) => {
    const placeId = suggestion.place_id;

    // Fetch place details using the placeId
    if (placesServiceRef.current) {
      const request = {
        placeId: placeId,
        fields: ["geometry"],
      };

      placesServiceRef.current.getDetails(
        request,
        (place: any, status: any) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            const { lat, lng } = place.geometry.location;
            dispatch(setLatLong({ lat: lat(), lng: lng() }));
            dispatch(setCoordinates({ latitude: lat(), longitude: lng() }));
            if (close) {
              close();
            }
          }
        }
      );
    }

    setSuggestions([]);
    setIsSuggestionsVisible(false);
    setClearInput(true);
  };

  return (
    <div ref={containerRef} className=" relative items-center w-54 md:w-64">
      {!isLoaded && <SpinnerLoader />}
      <InputBoxCloseButton
        onChange={(e) => handleInputChange(e.target.value)}
        onButtonClick={() => {
          setIsSuggestionsVisible(false);
          if (close) {
            close();
          }
        }}
        clearInput={clearInput}
      />
      {isSuggestionsVisible && (
        <ul className="absolute top-full left-0 mt-1  max-h-60 overflow-auto bg-white" >
          {suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id} // Use place_id as the key
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 cursor-pointer flex justify-between font-medium bg-white"
              >
                {suggestion.description}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
