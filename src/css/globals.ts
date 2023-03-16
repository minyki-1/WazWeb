import { createGlobalStyle } from 'styled-components';
import { normalize } from './normalize';
import { reset } from './reset';
export const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${reset}
`;