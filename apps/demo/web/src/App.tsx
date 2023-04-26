import React from 'react';
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web';
/*
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo';

import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { SurfaceTheme } from '@surfacedata/sd-components';

import FatalErrorPage from 'src/pages/FatalErrorPage';
import Routes from 'src/Routes';

import './index.css';

const extendedTheme = extendTheme({ ...SurfaceTheme });
 */
const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle"></RedwoodProvider>
  </FatalErrorBoundary>
);
/*
const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <ColorModeScript />
      <ChakraProvider theme={extendedTheme}>
        <RedwoodApolloProvider>
          <Routes />
        </RedwoodApolloProvider>
      </ChakraProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
);
 */

export default App;
