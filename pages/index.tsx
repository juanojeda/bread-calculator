import React, { useState } from "react"
import styled from "styled-components";
import {nanoid} from "nanoid";

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
  addIngredient: () => void;
  removeIngredient: (ingredientName: string) => () => void;
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

const BoolToggle = ({isChecked, label, onChange}) => (<label>
  <input type="checkbox" checked={isChecked} onChange={onChange} />
  {label}
</label>)

const Calculator = ({ingredients}: CalculatorProps) => (
    <CalcWrapper> 
      {ingredients.map(({...ingredient}: Ingredient) => <IngredientItem {...ingredient} />)}
    </CalcWrapper>
);

const RecipeEditor = ({ingredients, addIngredient, removeIngredient, editIngredient}: RecipeEditorProps) => (
  <EditorWrapper>
    {ingredients.map(({key, name, weight, isFlour, isPrimaryFlour}: Ingredient) => (
      <IngredientWrapper key={key}>
        <IngredientInput value={name} onChange={({target}) => editIngredient(key)({name: target.value})} />
        <IngredientInput value={weight} onChange={({target}) => editIngredient(key)({weight: parseInt(target.value)})} />
        <BoolToggle label="flour?" isChecked={isFlour} onChange={({target}) => editIngredient(key)({isFlour: target.checked})} />
        <button onClick={removeIngredient(key)}>Remove</button>
      </IngredientWrapper>
    ))}
    <button onClick={addIngredient}>Add ingredient</button>
  </EditorWrapper>
)

const defaultIngredients = [
  {key: nanoid(), name: "Plain flour", weight: 500, isFlour: true, isPrimaryFlour: true},
  {key: nanoid(), name: "Baker's flour", weight: 273, isFlour: true, isPrimaryFlour: false},
  {key: nanoid(), name: "Rye flour", weight: 130, isFlour: true, isPrimaryFlour: false},
  {key: nanoid(), name: "Spelt flour", weight: 90, isFlour: true, isPrimaryFlour: false},
  {key: nanoid(), name: "Water", weight: 750, isFlour: false, isPrimaryFlour: false},
  {key: nanoid(), name: "Levain", weight: 235, isFlour: false, isPrimaryFlour: false},
  {key: nanoid(), name: "Salt", weight: 18, isFlour: false, isPrimaryFlour: false},
];

const createIngredient = key => ({key, name: '', weight: 0, isFlour: false, isPrimaryFlour: false});

export default function Home() {

  const [ingredients, setIngredients] = useState(defaultIngredients);

  const addFn = () => setIngredients(prevIngredients => ([...prevIngredients, createIngredient(nanoid())]));
  const removeFn = (ingredientKey: string) => () => setIngredients(prevIngredients => prevIngredients.filter(({key}) => key !== ingredientKey));
  const editFn = (ingredientKey: string) => (ingredient: IngredientPartial) => setIngredients((_: Ingredient[]) => ingredients.map(prevIngredient => prevIngredient.key === ingredientKey ? {...prevIngredient, ...ingredient} : prevIngredient));

  return (
    <>
    <RecipeEditor ingredients={ingredients} addIngredient={addFn} removeIngredient={removeFn} editIngredient={editFn} />
    <Calculator ingredients={ingredients} />
    </>)
}
