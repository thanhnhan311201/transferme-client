import { BrowserRouter as Router } from "react-router-dom";

import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
  return (
    <div>
      <Router>
        <PublicRoutes />
        {/* <ProtectedRoutes /> */}
      </Router>
    </div>
  );
}

export default App;
