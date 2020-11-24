import React, { useState } from "react"
import styled from "styled-components";

type Ingredient = {
  key: string;
  name: string;
  weight: number;
  isFlour: boolean;
  isPrimaryFlour: boolean;
}

type IngredientPartial = {
  name?: string;
  weight?: number;
  isFlour?: boolean;
  isPrimaryFlour?: boolean;
}

interface CalculatorProps {
  ingredients: Ingredient[];
}

interface RecipeEditorProps {
  ingredients: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (ingredientName: string) => void;
  editIngredient: (ingredientName: string) => (ingredient: IngredientPartial) => void;
}

const CalcWrapper = styled.div``;
const IngredientWrapper = styled.div``;

const EditorWrapper = styled.div``;
const IngredientInput = styled.input``;

const IngredientItem = ({name, weight, isFlour, isPrimaryFlour}:Ingredient) => (
  <IngredientWrapper>
    {name} - {weight}g
  </IngredientWrapper>
);

const Calculator = ({ingredients}: CalculatorProps) => (
    <CalcWrapper> 
      {ingredients.map(({...ingredient}: Ingredient) => <IngredientItem {...ingredient} />)}
    </CalcWrapper>
);

const RecipeEditor = ({ingredients, addIngredient, removeIngredient, editIngredient}: RecipeEditorProps) => (
  <EditorWrapper>
    {ingredients.map(({id, name, weight, isFlour, isPrimaryFlour}: Ingredient) => (
      <IngredientWrapper key={id}>
        <IngredientInput value={name} onChange={({target}) => editIngredient(name)({name: target.value})} />
        <IngredientInput value={weight} onChange={({target}) => editIngredient(name)({weight: parseInt(target.value)})} />
      </IngredientWrapper>
    ))}
  </EditorWrapper>
)

const defaultIngredients = [
  {key: 'ing00', name: "Plain flour", weight: 500, isFlour: true, isPrimaryFlour: true},
  {key: 'ing01', name: "Baker's flour", weight: 273, isFlour: true, isPrimaryFlour: false},
  {key: 'ing02', name: "Rye flour", weight: 130, isFlour: true, isPrimaryFlour: false},
  {key: 'ing03', name: "Spelt flour", weight: 90, isFlour: true, isPrimaryFlour: false},
  {key: 'ing04', name: "Water", weight: 750, isFlour: false, isPrimaryFlour: false},
  {key: 'ing05', name: "Levain", weight: 235, isFlour: false, isPrimaryFlour: false},
  {key: 'ing06', name: "Salt", weight: 18, isFlour: false, isPrimaryFlour: false},
];

export default function Home() {

  const [ingredients, setIngredients] = useState(defaultIngredients);

  const addFn = (ingredient: Ingredient) => {};
  const removeFn = (ingredientName: string) => {};
  const editFn = (ingredientName: string) => (ingredient: IngredientPartial) => setIngredients((_: Ingredient[]) => ingredients.map(prevIngredient => prevIngredient.name === ingredientName ? {...prevIngredient, ...ingredient} : prevIngredient));

  return (
    <>
    <RecipeEditor ingredients={ingredients} addIngredient={addFn} removeIngredient={removeFn} editIngredient={editFn} />
    <Calculator ingredients={ingredients} />
    </>)
}
