import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Favorites from "./pages/Favorites.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";


const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <Routes>
              <Route index element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favorites" element={<Favorites />}/>
              <Route  />
              <Route  />
              <Route  />
              <Route  />
          </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
