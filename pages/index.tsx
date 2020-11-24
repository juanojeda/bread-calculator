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
  removeIngredient: (ingredientKey: string) => () => void;
  editIngredient: (ingredientKey: string) => (ingredient: IngredientPartial) => void;
  setPrimaryFlour: (ingredientKey: string) => () => void;
}

type ReactEvent = React.ChangeEvent<HTMLInputElement>;

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

const RecipeEditor = ({ingredients, addIngredient, removeIngredient, editIngredient, setPrimaryFlour}: RecipeEditorProps) => (
  <EditorWrapper>
    {ingredients.map(({key, name, weight, isFlour, isPrimaryFlour}: Ingredient) => (
      <IngredientWrapper key={key}>
        <IngredientInput value={name} onChange={({target}: ReactEvent) => editIngredient(key)({name: target.value})} />
        <IngredientInput value={weight} onChange={({target}: ReactEvent) => editIngredient(key)({weight: parseInt(target.value)})} />
        <BoolToggle label="flour?" isChecked={isFlour} onChange={({target}: ReactEvent) => editIngredient(key)({isFlour: target.checked})} />
        {isFlour && <BoolToggle label="Main flour?" isChecked={isPrimaryFlour} onChange={setPrimaryFlour(key)} />}
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

const createIngredient = (key: string) => ({key, name: '', weight: 0, isFlour: false, isPrimaryFlour: false});

export default function Home() {

  const [ingredients, setIngredients] = useState(defaultIngredients);

  const addFn = () => setIngredients(prevIngredients => ([...prevIngredients, createIngredient(nanoid())]));
  const removeFn = (ingredientKey: string) => () => setIngredients(prevIngredients => prevIngredients.filter(({key}) => key !== ingredientKey));
  const editFn = (ingredientKey: string) => (ingredient: IngredientPartial) => setIngredients((_: Ingredient[]) => ingredients.map(prevIngredient => prevIngredient.key === ingredientKey ? {...prevIngredient, ...ingredient} : prevIngredient));
  const setPrimaryFlourFn = (ingredientKey: string) => () => setIngredients((_:Ingredient[]) => ingredients.map(prevIngredient => ({...prevIngredient, isPrimaryFlour: prevIngredient.key === ingredientKey})));

  return (
    <>
    <RecipeEditor ingredients={ingredients} addIngredient={addFn} removeIngredient={removeFn} editIngredient={editFn} setPrimaryFlour={setPrimaryFlourFn} />
    <Calculator ingredients={ingredients} />
    </>)
}
