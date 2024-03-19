"use client";
import React, { useState, useEffect } from 'react';
import SearchBox from "@/components/layout/SearchBox";

interface Recipe {
  image: string;
  name: string;
  type: string;
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // 레시피 데이터 랜덤
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const fetchInitialRecipes = async () => {
    try {
      const response = await fetch(`https://openapi.foodsafetykorea.go.kr/api/sample/COOKRCP01/json/1/7`);
      const data = await response.json();
      let recipesData: Recipe[] = data.COOKRCP01.row.map((recipe: any) => ({
        image: recipe.ATT_FILE_NO_MAIN,
        name: recipe.RCP_NM,
        type: recipe.RCP_PAT2,
      }));

      shuffleArray(recipesData); // 레시피 데이터 배열 랜덤하게 섞음
      setRecipes(recipesData);
    } catch (error) {
      console.error("Failed to fetch initial recipes:", error);
    }
  };

  useEffect(() => {
    fetchInitialRecipes(); // 마운트될 때, 초기 레시피 불러옴
  }, []);

  const fetchRecipe = async (recipeName: string) => {
    try {
      const response = await fetch(`https://openapi.foodsafetykorea.go.kr/api/sample/COOKRCP01/json/1/100/RCP_NM="${recipeName}"`);
      const data = await response.json();
      let recipesData: Recipe[] = data.COOKRCP01.row.map((recipe: any) => ({
        image: recipe.ATT_FILE_NO_MAIN,
        name: recipe.RCP_NM,
        type: recipe.RCP_PAT2,
      }));

      shuffleArray(recipesData); // 검색 결과도 랜덤하게 섞음
      setRecipes(recipesData);
    } catch (error) {
      console.error("Failed to fetch recipe:", error);
    }
  };

  return (
    <>
      <SearchBox onSearch={fetchRecipe} />
      <h1>스트랩 TOP 레시피</h1>
      <p>데이터 들어올자리</p>

      <h1>추천 레시피</h1>
      {recipes.length > 0 && (
        recipes.map((recipe, index) => (
          <div key={index}>
            <h3>{recipe.name}</h3>
            {recipe.image && <img src={recipe.image} alt="Recipe" />}
            <p>{recipe.type}</p>
          </div>
        ))
      )}
    </>
  )
}
