import { createContext } from 'react';


const TurnContext = createContext();

export const TurnProvider = TurnContext.Provider;

export default TurnContext;